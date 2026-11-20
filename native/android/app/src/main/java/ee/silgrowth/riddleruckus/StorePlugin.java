package ee.silgrowth.riddleruckus;

import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * One one-time in-app product ("all stories") through Google Play Billing.
 * Same JavaScript interface as the iOS plugin: Capacitor.nativePromise('Store', method, {}).
 */
@CapacitorPlugin(name = "Store")
public class StorePlugin extends Plugin {
    static final String PRODUCT_ID = "allstories";

    private BillingClient billing;
    private PluginCall purchaseCall;
    private final List<Runnable> waiting = new ArrayList<>();
    private boolean connecting = false;

    @Override
    public void load() {
        billing = BillingClient.newBuilder(getContext())
            .setListener(this::onPurchasesUpdated)
            .enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build())
            .build();
    }

    /** Runs the task once Google Play Billing is connected; failTask runs if it cannot connect. */
    private void whenReady(Runnable task, Runnable failTask) {
        if (billing.isReady()) { task.run(); return; }
        synchronized (waiting) {
            waiting.add(task);
            if (connecting) return;
            connecting = true;
        }
        billing.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult result) {
                List<Runnable> tasks;
                synchronized (waiting) { tasks = new ArrayList<>(waiting); waiting.clear(); connecting = false; }
                if (result.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    for (Runnable t : tasks) t.run();
                } else {
                    failTask.run();
                }
            }
            @Override
            public void onBillingServiceDisconnected() {
                synchronized (waiting) { connecting = false; }
            }
        });
    }

    private boolean ownsUnlock(List<Purchase> purchases) {
        boolean owned = false;
        for (Purchase p : purchases) {
            if (p.getProducts().contains(PRODUCT_ID) && p.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
                owned = true;
                acknowledge(p);
            }
        }
        return owned;
    }

    private void acknowledge(Purchase p) {
        if (p.isAcknowledged()) return;
        billing.acknowledgePurchase(
            AcknowledgePurchaseParams.newBuilder().setPurchaseToken(p.getPurchaseToken()).build(),
            r -> {}
        );
    }

    private void checkOwned(PluginCall call) {
        whenReady(() -> billing.queryPurchasesAsync(
            QueryPurchasesParams.newBuilder().setProductType(BillingClient.ProductType.INAPP).build(),
            (result, purchases) -> {
                if (result.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                    call.reject("Could not check purchases");
                    return;
                }
                JSObject ret = new JSObject();
                ret.put("unlocked", ownsUnlock(purchases));
                call.resolve(ret);
            }), () -> call.reject("Google Play is not available"));
    }

    private interface DetailsCallback { void got(ProductDetails details); }

    private void loadProduct(PluginCall call, DetailsCallback cb) {
        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
            .setProductList(Collections.singletonList(
                QueryProductDetailsParams.Product.newBuilder()
                    .setProductId(PRODUCT_ID)
                    .setProductType(BillingClient.ProductType.INAPP)
                    .build()))
            .build();
        whenReady(() -> billing.queryProductDetailsAsync(params, (result, detailsResult) -> {
            List<ProductDetails> list = detailsResult.getProductDetailsList();
            if (result.getResponseCode() != BillingClient.BillingResponseCode.OK || list == null || list.isEmpty()) {
                call.reject("Product not found");
                return;
            }
            cb.got(list.get(0));
        }), () -> call.reject("Google Play is not available"));
    }

    @PluginMethod
    public void isUnlocked(PluginCall call) { checkOwned(call); }

    @PluginMethod
    public void restore(PluginCall call) { checkOwned(call); }

    @PluginMethod
    public void getProduct(PluginCall call) {
        loadProduct(call, details -> {
            JSObject ret = new JSObject();
            ret.put("id", details.getProductId());
            ret.put("title", details.getName());
            ProductDetails.OneTimePurchaseOfferDetails offer = details.getOneTimePurchaseOfferDetails();
            ret.put("price", offer != null ? offer.getFormattedPrice() : "");
            call.resolve(ret);
        });
    }

    @PluginMethod
    public void purchase(PluginCall call) {
        loadProduct(call, details -> getActivity().runOnUiThread(() -> {
            if (purchaseCall != null) {
                call.reject("A purchase is already in progress");
                return;
            }
            purchaseCall = call;
            BillingFlowParams flow = BillingFlowParams.newBuilder()
                .setProductDetailsParamsList(Collections.singletonList(
                    BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(details).build()))
                .build();
            BillingResult result = billing.launchBillingFlow(getActivity(), flow);
            if (result.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                purchaseCall = null;
                if (result.getResponseCode() == BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED) {
                    JSObject ret = new JSObject();
                    ret.put("unlocked", true);
                    call.resolve(ret);
                } else {
                    call.reject("The purchase could not start");
                }
            }
        }));
    }

    private void onPurchasesUpdated(BillingResult result, List<Purchase> purchases) {
        PluginCall call = purchaseCall;
        purchaseCall = null;
        int code = result.getResponseCode();
        JSObject ret = new JSObject();
        if (code == BillingClient.BillingResponseCode.OK && purchases != null) {
            boolean pending = false;
            for (Purchase p : purchases) {
                if (p.getProducts().contains(PRODUCT_ID) && p.getPurchaseState() == Purchase.PurchaseState.PENDING) pending = true;
            }
            boolean owned = ownsUnlock(purchases);
            ret.put("unlocked", owned);
            if (!owned && pending) ret.put("pending", true);
            if (owned) notifyListeners("entitlement", ret);
        } else if (code == BillingClient.BillingResponseCode.USER_CANCELED) {
            ret.put("unlocked", false);
            ret.put("cancelled", true);
        } else if (code == BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED) {
            ret.put("unlocked", true);
        } else {
            if (call != null) call.reject("The purchase did not go through");
            return;
        }
        if (call != null) call.resolve(ret);
    }

    @PluginMethod
    public void requestReview(PluginCall call) {
        ReviewManager manager = ReviewManagerFactory.create(getContext());
        manager.requestReviewFlow().addOnCompleteListener(task -> {
            if (task.isSuccessful() && getActivity() != null) {
                ReviewInfo info = task.getResult();
                manager.launchReviewFlow(getActivity(), info).addOnCompleteListener(t -> call.resolve());
            } else {
                call.resolve();
            }
        });
    }
}
