import UIKit
import Capacitor
import StoreKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = MainViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}

/// Bridge view controller that registers the app's own in-app purchase plugin.
class MainViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(StorePlugin())
    }
}

/// One non-consumable in-app purchase ("all stories"), using StoreKit 2.
/// Called from JavaScript as Capacitor.nativePromise('Store', <method>, {}).
@objc(StorePlugin)
public class StorePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "StorePlugin"
    public let jsName = "Store"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isUnlocked", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getProduct", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "restore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestReview", returnType: CAPPluginReturnPromise)
    ]

    static let productId = "ee.silgrowth.riddleruckus.allstories"
    private var updatesTask: Task<Void, Never>?

    override public func load() {
        // Purchases that complete outside the app flow (Ask to Buy, refunds, other devices).
        updatesTask = Task.detached { [weak self] in
            for await result in Transaction.updates {
                guard case .verified(let transaction) = result else { continue }
                await transaction.finish()
                if transaction.productID == StorePlugin.productId {
                    let unlocked = transaction.revocationDate == nil
                    self?.notifyListeners("entitlement", data: ["unlocked": unlocked])
                }
            }
        }
    }

    deinit { updatesTask?.cancel() }

    private static func hasEntitlement() async -> Bool {
        for await result in Transaction.currentEntitlements {
            if case .verified(let transaction) = result,
               transaction.productID == productId,
               transaction.revocationDate == nil {
                return true
            }
        }
        return false
    }

    private static func loadProduct() async throws -> Product? {
        try await Product.products(for: [productId]).first
    }

    @objc func isUnlocked(_ call: CAPPluginCall) {
        Task {
            let unlocked = await StorePlugin.hasEntitlement()
            call.resolve(["unlocked": unlocked])
        }
    }

    @objc func getProduct(_ call: CAPPluginCall) {
        Task {
            do {
                guard let product = try await StorePlugin.loadProduct() else {
                    call.reject("Product not found")
                    return
                }
                call.resolve(["id": product.id, "title": product.displayName, "price": product.displayPrice])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func purchase(_ call: CAPPluginCall) {
        Task {
            do {
                guard let product = try await StorePlugin.loadProduct() else {
                    call.reject("Product not found")
                    return
                }
                let result = try await product.purchase()
                switch result {
                case .success(let verification):
                    if case .verified(let transaction) = verification {
                        await transaction.finish()
                        call.resolve(["unlocked": true])
                    } else {
                        call.reject("Purchase could not be verified")
                    }
                case .pending:
                    call.resolve(["unlocked": false, "pending": true])
                case .userCancelled:
                    call.resolve(["unlocked": false, "cancelled": true])
                @unknown default:
                    call.resolve(["unlocked": false])
                }
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func restore(_ call: CAPPluginCall) {
        Task {
            try? await AppStore.sync()
            let unlocked = await StorePlugin.hasEntitlement()
            call.resolve(["unlocked": unlocked])
        }
    }

    @objc func requestReview(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if let scene = UIApplication.shared.connectedScenes
                .first(where: { $0.activationState == .foregroundActive }) as? UIWindowScene {
                SKStoreReviewController.requestReview(in: scene)
            }
            call.resolve()
        }
    }
}
