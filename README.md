# 🛒 বাজার দর (BazarDor)

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**
A Bangla-first grocery price tracker for Bangladesh. Browse today's prices for rice, lentils, oil, vegetables, fish, meat, dairy and spices, see how they moved since yesterday, and drill into division-wise market prices.

- **Live link:** _add your Vercel URL here_
- **GitHub:** _add your repository URL here_

## ✨ Key features

1. **Live price ticker** – an infinite marquee under the navbar with emoji, name, price per unit and ▲/▼ change.
2. **Daily movers** – top 6 price risers and top 6 fallers, plus the full product grid, with Bengali numerals.
3. **Category pages with sorting** – skeleton loading, empty/404 states and a sort dropdown (default / low→high / high→low) that sorts by the numeric value.
4. **Protected product details** – min / max / average price and a division-wise market price table (login required, with redirect + toast).
5. **BetterAuth authentication** – email + password, Google and GitHub social login, toast notifications, and a profile page with an **Update Name** form.
6. Fully responsive (mobile → desktop), custom 404 page, and reload-safe dynamic routes.

## 🧰 Technologies

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · DaisyUI 5 · BetterAuth · MongoDB · react-hot-toast

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
```

Without `MONGODB_URI` the app uses an in-memory auth store (great for trying it out; users reset on restart). Social login buttons work once the Google/GitHub keys are set.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `BETTER_AUTH_SECRET` | Session signing secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | Your site URL (e.g. the Vercel domain) |
| `MONGODB_URI`, `MONGODB_DB` | MongoDB Atlas connection for persistent users |
| `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET` | Optional social login |

OAuth callback URLs: `<site>/api/auth/callback/google` and `<site>/api/auth/callback/github`.

### Deploying to Vercel
Import the repo, add the variables above (MongoDB Atlas must allow Vercel's IPs, i.e. `0.0.0.0/0`), and deploy. Dynamic routes (`/product/[slug]`, `/category/[slug]`) are server-rendered, so refreshing never causes a hard 404.

## 🗂 Routes

`/` · `/category/[slug]` · `/product/[slug]` 🔒 · `/signin` · `/signup` · `/profile` 🔒 · `/profile/update` 🔒 · custom 404

## 📡 Data

Prices come from the BazarDor API (`/products`, `/categories`), with the alternate base URL as a retry and a bundled snapshot in `data/` as a safety net if both are unreachable.

> Email verification and forgot-password are intentionally left off; see the comment in `src/lib/auth.ts` for how to enable them.
