# next.js-internship-app

Minimal Next.js app (App Router) with i18n and auth samples — configured for development.

Quick overview
- Next.js 16 + App Router
- next-intl for translations (locales/en.json, locales/hi.json)
- next-auth (Credentials provider) — dummy auth backed by env vars
- Material UI + Tailwind for UI

Local setup
1. Install dependencies:

```powershell
npm install
```

2. Add dev secrets in `.env` (do NOT commit):

```powershell
DUMMY_EMAIL=test@example.com
DUMMY_PASSWORD=dummyPassword123
```

3. Run dev server:

```powershell
npm run dev
```

Localization
- Edit translations in `locales/en.json` and `locales/hi.json` under the `Landing` namespace.
- Language switching is client-side: selecting a language updates a `locale` cookie/localStorage and the app reloads messages without a full page refresh.

Auth
- Credentials provider is configured in `app/api/auth/[...nextauth]/route.ts`.
- The authorize logic reads `DUMMY_EMAIL` / `DUMMY_PASSWORD` from environment variables so secrets are not committed.

UX details
- Buttons (Get Started, Login, Sign out) show inline loaders and keep their width while loading.
- Profile avatar opens a preview modal.

Where to look first
- `app/layout.tsx` — root layout & providers
- `app/Providers.tsx` — next-intl client provider and dynamic message loading
- `app/page.tsx`, `app/login/page.tsx`, `app/service/page.tsx` — main pages
- `locales/*.json` — translations