# Decoded: True Stories: store launch kit (renamed from Riddle & Ruckus on 2026-11-20)

## IDs (already set in the code)
| What | iOS | Android |
|---|---|---|
| Bundle / package ID | `ee.silgrowth.riddleruckus` | `ee.silgrowth.riddleruckus` |
| One-time unlock | Non-consumable `ee.silgrowth.riddleruckus.allstories` | One-time product `allstories` |
| Price | $4.99 (Apple shows €5.99 in the euro zone), Family Sharing on, all 175 countries. Created in App Store Connect 2026-11-20 | €4.99 |
| Name on the home screen | Decoded | Decoded |
| Seller | Sild Growth OÜ | Sild Growth OÜ (Play org account "TASA Plan") |

## Maria's to-dos
### Apple
1. developer.apple.com → Identifiers → **+** → App IDs → App → Bundle ID `ee.silgrowth.riddleruckus`, description "Riddle and Ruckus". In-App Purchase is on by default.
2. App Store Connect → Apps → **+ New App**: iOS, name **Riddle & Ruckus: Cryptograms**, primary language English (U.S.), bundle ID above, SKU `riddleruckus`.
3. In the new app → Monetization → In-App Purchases → **+** → Non-Consumable, reference name "All stories", product ID `ee.silgrowth.riddleruckus.allstories`, price $4.99, turn Family Sharing on, add display name "All stories" and description "Unlock every story, including new ones."
4. GitHub repo riddle-ruckus → Settings → Secrets and variables → Actions → add the same four secrets as Mischief & Motive: `APPLE_TEAM_ID`, `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_PRIVATE_KEY` (the .p8 text). Then Actions → "iOS release to TestFlight" → Run workflow.

### Google Play
1. Play Console → Create app: "Riddle & Ruckus: Cryptograms", game, free (with in-app purchase).
2. Monetize → In-app products → create `allstories`, €4.99, active.
3. GitHub secrets: `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD` (the same upload key as Mischief & Motive is fine; values in project files mischief-motive-appstore/android-upload-key/README.txt). Then Actions → "Android release" → Run workflow, download the .aab and upload it to Internal testing.

### Both
- Support URL: https://sildpartners.com/apps/riddle-ruckus/ and Privacy: https://sildpartners.com/apps/riddle-ruckus/privacy.html (Claude can add these pages to the sildpartners repo).
- App Privacy: **Data Not Collected** (no analytics, no accounts, progress stays on the phone).
- Age rating: no objectionable content. Stories mention historical events (arrests, a shipwreck) only in plain words → 4+ / Everyone. Medical/health info: none (the brain stories are general science, not advice).

## Listing text (updated 2026-11-26: 114 stories, 9 categories; no living people's names in the listing)
**Name:** Decoded: True Stories (21)
**Subtitle (iOS, 30):** Learn by cracking codes (23)
**Promotional text (iOS, 170):** New stories are on the way. Crack five coded chapters, learn a true story, and keep the life lesson at the end.
**Short description (Play, 80):** True stories of inventors, explorers and heroes, told in secret code. No ads. (79)

**Description:**
Crack the code, learn the story.

Decoded turns real history and real science into cryptogram puzzles. Every story is told in five short coded chapters. Swap the letters back, and each solved chapter reveals what happened next, until you reach the life lesson at the end.

Who is the story about? You find out when you crack the first chapter.

114 true stories in 9 collections, with more on the way:
• Builders & inventors: from Benjamin Franklin to the Wright brothers
• Female founders who started with almost nothing
• People power: the Singing Revolution, the Salt March and more
• Your brain & ADHD: what neuroscience has found
• Science & discovery, explorers & survival, music & art, sport & grit, everyday heroes

How it plays:
• Tap a letter, type your guess, and every matching letter fills in
• Easy, Normal or Hard: from a relaxed read to a real code-breaking challenge
• Hints and a mistake check when you are stuck
• No timer, no pressure, no ads, no account, no data collected

Free stories to start. Unlock every story, including new ones, with one payment. No subscription.

From the makers of Mischief & Motive.

**Keywords (iOS, 100):** cryptogram,cipher,word puzzle,history,biography,brain,adhd,inventors,explorers,decode,logic,trivia

**Category:** Games → Word (secondary: Puzzle). Play: Game → Word.
**Age rating:** 4+ / Everyone (no objectionable content; historical events in plain words).
**App Privacy:** Data Not Collected.
**Support URL:** https://sildpartners.com/apps/riddle-ruckus/
**Privacy URL:** https://sildpartners.com/apps/riddle-ruckus/privacy.html
**Copyright:** 2026 Sild Growth OÜ

## Screenshots (made 2026-11-22)
- iPhone 6.9": screenshots/iphone-6.9-1..5.png (1320x2868)
- Google Play phone: google-play/phone-1..5.png (1080x2160), icon google-play/icon-512.png, feature graphic google-play/feature-graphic.png (1024x500)

## App Review notes (paste into App Store Connect → App Review Information → Notes)
Decoded is a cryptogram word puzzle game. Each true story has five chapters, and each chapter is a letter-substitution cipher. Tap a letter in the puzzle, then type the letter you think it stands for.

How to test:
1. Open the app and tap the "Start here" card. Benjamin Franklin is free.
2. Solve a chapter, or tap Hint several times to fill letters. The next chapter opens when a chapter is solved.
3. Five stories are free. All other stories show a lock.
4. In-app purchase: tap any locked story, then "Unlock all stories" and "Unlock all". This is a one-time non-consumable purchase (ee.silgrowth.riddleruckus.allstories). "Restore purchase" is on the same screen.

The app has no accounts, no ads, no analytics and no network calls besides the App Store purchase. Progress is saved only on the device.
