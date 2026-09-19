# Unschool

Trilingual (HE / RU / EN) website for Unschool: maths, English and Hebrew for school students in
Israel. Static HTML for SEO, with Firebase Functions behind the diagnostic form, the digital
product checkout and secure delivery.

- `site/` — Astro project, built to static HTML in `site/dist`
- `functions/` — Cloud Functions (Express API + root language redirect)
- `firebase.json`, `firestore.rules`, `storage.rules` — hosting, rules and emulator ports

## Requirements

Node 20, Java 17 (for the Firestore emulator). Everything else installs with `npm install` at the
repository root, which covers both workspaces.

## Running locally

```bash
npm install
npm run demo
```

`npm run demo` builds the functions and the site in demo mode, then starts the emulator suite on
deliberately uncommon ports:

| Service        | URL                   |
| -------------- | --------------------- |
| Site (hosting) | http://127.0.0.1:5321 |
| Functions      | http://127.0.0.1:5322 |
| Firestore      | http://127.0.0.1:5323 |
| Auth           | http://127.0.0.1:5324 |
| Storage        | http://127.0.0.1:5325 |
| Emulator UI    | http://127.0.0.1:5326 |

Open http://127.0.0.1:5321 — `/` redirects by `Accept-Language` with Russian as the fallback.

For fast front-end iteration run `npm run dev` instead: the emulators plus the Astro dev server on
http://127.0.0.1:4977, which proxies `/api` to the hosting emulator. Open `/ru/` directly there,
since `/` and the order pages rely on hosting rewrites.

### What works in a local run

- The diagnostic form writes to Firestore and queues both emails; the email bodies are printed in
  the emulator log.
- The shop uses the mock payment provider: the Buy button leads to a simulated payment page, and
  the order only becomes `paid` through a server-to-server notification.
- Demo products are purchasable **only** locally (`ALLOW_DEMO_ORDERS` in
  `functions/.env.demo-unschool` and `PUBLIC_DEMO_CHECKOUT` in `site/.env.development`). Both must
  stay off in production.
- `/admin/` needs a Google sign-in through the Auth emulator with an address listed in
  `ADMIN_EMAILS` (`admin@example.test` by default).
- Downloads need a file in the Storage emulator at the product's `storagePath`.

## Editing content

All copy lives in markdown under `site/src/content`, one file per language and slug:

```
subjects/{lang}/{math|english|hebrew}.md
stages/{lang}/{elementary|middle|high}.md
programs/{lang}/{slug}.md      # one canonical page, listed from both subject and stage
teachers/{lang}/{slug}.md
products/{lang}/{slug}.md      # status: demo | published
pages/{lang}/{slug}.md         # about, how-it-works, formats-prices, contact, join, legal pages
faq.yaml                       # all languages in one file
```

Interface strings (navigation, buttons, form labels) are in `site/src/i18n/locales/*.json`.

Notes for editors:

- Quote any frontmatter value that contains a colon followed by a space.
- A slug that exists in one language but not another still gets a page: it shows the available
  language with an honest notice, and that page is excluded from the sitemap and hreflang.
- `status: demo` products are visible but never purchasable and carry no Product schema.
- `priceFrom: null` renders "price confirmed after the assessment" instead of a number.

## Configuration

Copy the example files and fill them in:

- `site/.env.example` → `site/.env` — public values baked into the HTML (GA4 id, Firebase web
  config for the admin sign-in).
- `functions/.env.example` → `functions/.env` — school email, payment provider, admin allow-list.

## Payments

`PAYMENT_PROVIDER` selects the implementation behind a single interface
(`functions/src/payments/provider.ts`):

- `mock` — the local simulator, the default until Grow is live.
- `grow` — Grow (Meshulam) light server API, refusing to start without credentials.

Switching to live payments means setting `GROW_USER_ID`, `GROW_PAGE_CODE`, `GROW_API_KEY`,
`GROW_SANDBOX=false` and `PAYMENT_PROVIDER=grow`. No other code changes are needed. An order is
only marked paid by a verified server notification, duplicate notifications are ignored, and the
amount is checked against the price stored on the order.

## Deployment

The site lives in the existing `unschool-cool` Firebase project, alongside the current
unschool.cool app. It is deployed to a **second hosting site** so nothing about the live site
changes until cutover.

|                |                                                  |
| -------------- | ------------------------------------------------ |
| Preview URL    | https://unschool-v2.web.app                      |
| Hosting target | `site` → `unschool-v2` (mapped in `.firebaserc`) |
| Functions      | `api` and `rootRedirect` in `europe-west3`       |

```bash
npm run deploy          # site + both functions
npm run deploy:hosting  # site only, faster
```

### Safety rules for this project

The project still serves the old app, so a deploy must never be run unscoped:

- **Never run bare `firebase deploy`.** `firestore.rules` and `storage.rules` in this repo deny all
  client access, which is correct for this codebase but would break the old app that reads
  Firestore from the browser. The npm scripts always pass `--only`.
- The old app's functions are named `*Function` and run in `europe-west3`; ours are `api` and
  `rootRedirect`, so there is no collision. Always deploy them by name.
- The preview site sends `X-Robots-Tag: noindex, nofollow` on every response so it cannot compete
  with unschool.cool in search.

### Cutover to production

1. Point the target at the live site in `.firebaserc`: `"site": ["unschool-cool"]`.
2. Remove the `X-Robots-Tag: noindex` header block from `firebase.json`.
3. Set `PUBLIC_SITE_URL=https://unschool.cool` in the deploy scripts and `PUBLIC_GA4_ID=G-C2V9VG57QF`
   in `site/.env.production`.
4. Deploy the Firestore and Storage rules from this repo only once the old app is retired.
5. Delete the `unschool-v2` site: `firebase hosting:sites:delete unschool-v2`.

Email delivery expects the Firebase "Trigger Email" extension watching the `mail` collection; until
it is installed, messages queue in Firestore without being sent.

## Before going live

- `ADMIN_EMAILS` is unset in the deployed functions, so `/admin/` lets nobody in. Set it with
  `firebase functions:config` replacements via `functions/.env` and redeploy the `api` function.
- Real logo files and brand assets; the header currently uses a text wordmark.
- Teacher names, photos and confirmed profiles (the current entries are labelled placeholders).
- Confirmed prices per program, and real digital products with files uploaded to Storage.
- Grow credentials, invoicing and the refund policy; approve the privacy, terms and accessibility
  texts, which are drafts.
- A real Open Graph image (`site/public/images/og-default.svg` is a placeholder, and social
  networks need a PNG or JPEG).
- Pull the old unschool.cool URL list from Search Console and extend the redirects in
  `firebase.json`.
- Set `PUBLIC_GA4_ID` and verify the events: `view_subject`, `view_stage`, `view_program`,
  `view_product`, `lead_start`, `lead_submitted`, `checkout_start`, `purchase_confirmed`,
  `payment_failed`.
