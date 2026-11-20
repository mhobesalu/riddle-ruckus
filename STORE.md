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

## Listing text
**Name:** Decoded: True Stories (21)
**Subtitle (iOS, 30):** Learn by cracking codes (23)
**Short description (Play, 80):** Crack coded true stories of founders, rebels and the brain. No ads.

**Description:**
Crack the code, learn the story.

Decoded turns real history and real science into cryptogram puzzles. Every story is told in five coded chapters. Swap the letters back, and each solved chapter reveals the next part of the story, until you reach the life lesson at the end.

• Builders & inventors: Benjamin Franklin, the Wright brothers, Marie Curie, Walt Disney and more
• Female founders: from Madam C. J. Walker to Sara Blakely
• People power: the Singing Revolution, the Salt March, the Montgomery Bus Boycott, Iceland's day off
• Your brain & ADHD: dopamine, sleep, and what neuroscience has found

Who is the story about? You find out when you crack the first chapter.

• Tap a letter, type your guess, and every matching letter fills in
• Hints and a mistake check when you are stuck
• No timer, no pressure, no ads
• 5 stories free. Unlock every story, including new ones, with one payment. No subscription.

From the makers of Mischief & Motive.

**Keywords (iOS, 100):** cryptogram,cipher,word puzzle,history,biography,brain,adhd,founders,quotes,decode,logic,trivia

**Category:** Games → Word (secondary: Puzzle)
