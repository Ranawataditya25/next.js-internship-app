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

Deploy to Vercel
-----------------

1. Connect your GitHub/GitLab/Bitbucket repository to Vercel and import the project.

2. In Vercel Project Settings → General → Build & Development Settings, use the defaults (Vercel will detect Next.js):

	- **Framework Preset:** Next.js
	- **Install Command:** `npm install`
	- **Build Command:** `npm run build`
	- **Output Directory:** (leave blank)

3. Add the required environment variables (Settings → Environment Variables). Add them for `Production` and `Preview` as needed:

	- `DUMMY_EMAIL` = `test@example.com`
	- `DUMMY_PASSWORD` = `dummyPassword123`
	- `NEXTAUTH_URL` = `https://<your-vercel-domain>` (replace with the domain Vercel assigns, e.g. `https://next-js-internship-app.vercel.app`)
	- `NEXTAUTH_SECRET` = `<long-random-secret>` (generate a 32-byte hex or base64 secret)

	Note: Do NOT commit `NEXTAUTH_SECRET` or any secrets to the repository. Use Vercel's Environment Variables UI or the CLI to keep them secret.

4. Verify the deployment:

	- Visit your Vercel URL (e.g. `https://your-project.vercel.app`).
	- Click `Get Started` → `Login` and sign in with `test@example.com` / `dummyPassword123`.
	- After successful sign-in you should be redirected to `/service` and see the Service 1 card.

Security reminder: keep secrets in Vercel's Environment Variables (not in the repo). Rotate `NEXTAUTH_SECRET` carefully — rotating invalidates existing sessions.