# Unschool

Trilingual (HE / RU / EN) website for Unschool: maths, English and Hebrew for school students in
Israel. Static HTML for SEO, with Firebase Functions behind the diagnostic form, the digital
product checkout and secure delivery.

- `site/` — Astro project, built to static HTML in `site/dist`
- `functions/` — Cloud Functions (Express API + root language redirect)
- `firebase.json`, `firestore.rules`, `storage.rules` — hosting, rules and emulator ports

## Requirements

Node 24 (`.nvmrc`), Java 21 (for the Firestore emulator). Everything else installs with `npm install` at the
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
- The shop and lead forwarding need a CRM: set `CRM_URL` in `functions/.env.demo-unschool` (for
  example the staging CRM, `https://unschool-crm-staging.web.app`) and its intake key as
  `CRM_INTAKE_KEY` in `functions/.secret.local`. Without them the checkout shows "not available
  right now".
- `/admin/` needs a Google sign-in through the Auth emulator with an address listed in
  `ADMIN_EMAILS` (`admin@example.test` by default).

## Editing content

All copy lives in markdown under `site/src/content`, one file per language and slug:

```
subjects/{lang}/{math|english|hebrew}.md
stages/{lang}/{elementary|middle|high}.md
programs/{lang}/{slug}.md      # one canonical page, listed from both subject and stage
teachers/{lang}/{slug}.md
products/{lang}/{slug}.md      # slug must match the CRM product id
pages/{lang}/{slug}.md         # about, how-it-works, formats-prices, contact, join, legal pages
faq.yaml                       # all languages in one file
```

Interface strings (navigation, buttons, form labels) are in `site/src/i18n/locales/*.json`.

Notes for editors:

- Quote any frontmatter value that contains a colon followed by a space.
- A slug that exists in one language but not another still gets a page: it shows the available
  language with an honest notice, and that page is excluded from the sitemap and hreflang.
- A product's `price` and `listPrice` are what the page shows. What an order costs, the file and
  whether marketing consent is required live on the CRM product with the same slug (Settings,
  Products). Keep both in step. `price: 0` makes the product a free download; `sample` and `full`
  link a free sample and its full product to each other.
- `priceFrom: null` renders "price confirmed after the assessment" instead of a number.

## Configuration

Copy the example files and fill them in:

- `site/.env.example` → `site/.env` — public values baked into the HTML (GA4 id, Firebase web
  config for the admin sign-in).
- `functions/.env.example` → `functions/.env` — school email, admin allow-list, CRM URL.

## Shop

The CRM runs the shop: products, coupons, orders, payment (Morning) and delivery of the file by
email. The site's `api` function only proxies `/api/shop/*` to
`${CRM_URL}/api/shop/${CRM_SCHOOL_ID}/*` with the `CRM_INTAKE_KEY` bearer:

| Site route                            | Purpose                                         |
| ------------------------------------- | ----------------------------------------------- |
| `POST /api/shop/quote`                | Price for a product and an optional coupon      |
| `POST /api/shop/coupons/check`        | Is a coupon valid (used by the diagnostic form) |
| `POST /api/shop/orders`               | Place an order: payment link, or a free file    |
| `GET /api/shop/orders/:token`         | Order status for the success page               |
| `POST /api/shop/orders/:token/resend` | Email the download link again                   |

Every order also creates or updates the lead in the CRM. Coupons are typed in any case and sent in
upper case. The CRM docs (`docs/integrations/shop.md` there) describe the API in full.

## Deployment

The site is the default hosting site of the `unschool-cool` Firebase project and serves
https://unschool.cool. The previous app's paths (login, chats, personal area, admin panel) redirect
to the new pages in `firebase.json`; its earlier releases stay in the Hosting release history for a
rollback.

|                |                                                      |
| -------------- | ---------------------------------------------------- |
| URL            | https://unschool.cool                                |
| Hosting target | `site` → `unschool-cool` (mapped in `.firebaserc`)   |
| Functions      | `api` and `rootRedirect` in `europe-west3`           |
| Analytics      | `G-H3B9T59E1G`, the property of the previous version |

```bash
npm run deploy          # site + both functions
npm run deploy:hosting  # site only, faster
```

### Safety rules for this project

The project still holds the previous app's data and functions, so a deploy must never be run
unscoped:

- **Never run bare `firebase deploy`.** `firestore.rules` and `storage.rules` in this repo deny all
  client access, which would cut off the previous app's data. The npm scripts always pass `--only`.
  Deploy the rules from this repo only once that data is retired.
- The previous app's functions are named `*Function` and run in `europe-west3`; ours are `api` and
  `rootRedirect`, so there is no collision. Always deploy them by name.
- The CRM's hosting sites (`unschool-crm`, `unschool-crm-staging`) live in the same project and are
  deployed from the CRM repository.

Diagnostic requests are stored in Firestore and posted to the team's Telegram chat. The bot token
and the chat ID are Secret Manager secrets bound to the `api` function, so they must exist before
the function deploys:

```bash
firebase functions:secrets:set TELEGRAM_BOT_TOKEN --project unschool-cool
firebase functions:secrets:set TELEGRAM_CHAT_ID --project unschool-cool
```

To find the chat ID, message the bot (or add it to the team group), then open
`https://api.telegram.org/bot<token>/getUpdates` and copy `chat.id`. Group IDs are negative.

Each request is also forwarded to the CRM intake API (coupon, UTM tags and both consents
included). Create the key in the CRM (Settings, Leads, "Create key"), store it as a secret and set
the CRM URL in `functions/.env`. The secret is bound to the `api` function, so it must exist before
the next deploy; while the URL is empty nothing is forwarded and the shop is unavailable:

```bash
firebase functions:secrets:set CRM_INTAKE_KEY --project unschool-cool
# functions/.env
CRM_URL=https://crm.unschool.cool
CRM_SCHOOL_ID=unschool
```

A request the CRM rejects or cannot reach is still stored and posted to Telegram; the failure is
logged and the lead document keeps `crmSent: false`.

Order emails (download links) are sent by the CRM. The parent's copy of a request expects the
Firebase "Trigger Email" extension watching the `mail` collection; until it is installed, those
messages queue in Firestore without being sent.

## Before going live

- `ADMIN_EMAILS` is unset in the deployed functions, so `/admin/` lets nobody in. Set it with
  `firebase functions:config` replacements via `functions/.env` and redeploy the `api` function.
- Real logo files and brand assets; the header currently uses a text wordmark.
- Teacher names, photos and confirmed profiles (the current entries are labelled placeholders).
- Confirmed prices per program.
- The refund policy; approve the privacy, terms and accessibility texts, which are drafts.
- A real Open Graph image (`site/public/images/og-default.svg` is a placeholder, and social
  networks need a PNG or JPEG).
- Pull the old unschool.cool URL list from Search Console and extend the redirects in
  `firebase.json`.
- Set `PUBLIC_GA4_ID` and verify the events: `view_subject`, `view_stage`, `view_program`,
  `view_product`, `lead_start`, `lead_submitted`, `checkout_start`, `checkout_error`,
  `free_download`, `purchase_confirmed`.
