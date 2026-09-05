# Unica

Private concierge matchmaking. Members do not message each other. Every introduction is facilitated.

## What is built now

The **screens** are real. Sign-in, apply, member desk, matchmaker desk, and admin all run in the browser.

The **backend is not live yet**. Apply, introductions, and concierge save to `localStorage` (`lib/demo-store.ts`). That is why it still feels like frontend-only.

We did not invent a second Node/Express app. Next.js is the frontend. Supabase is the backend. That is the intended split.

## Folder structure — and why

```
app/
  page.tsx              landing + login
  (marketing)/          apply, approach, membership, stories, safety…
  (auth)/               /login, /forgot
  (member)/             /home, discover, introductions, concierge
  (desk)/               matchmaker
  (admin)/              administration
components/
  ui/                   Button, Field, Card, Kicker, PageIntro
  brand/ shell/ login/ forms/
  app/ desk/ admin/
styles/                 tokens.css · motion.css
lib/                    brand, status, demo store, supabase
supabase/migrations/    backend schema
public/images/
_docs/                  private, gitignored
```

Why not `frontend/` + `backend/` as two servers?

- The product is one Next.js app with four surfaces, not a SPA talking to Express.
- Auth, row security, files, and the introduction table belong in **Postgres (Supabase)**, not in a custom API you have to lock by hand.
- `app/api` is only for webhooks (Stripe, Calendly). Member pages talk to Supabase through `lib/supabase` once keys exist.

## Design system

| File | Job |
|---|---|
| `styles/tokens.css` | Ivory, limestone, oxblood, brass, radii |
| `styles/motion.css` | Ken Burns, rise, page-enter, reveal. Reduced-motion is respected |
| `components/icons.tsx` | Check, lock, Google, Apple |
| `components/app/NavIcons.tsx` | Home, Discover, Concierge… |

Motion is hotel-door, not startup-bounce. No hearts. No match percentages.

## Start

```bash
npm install
copy .env.example .env.local
npm run dev
```

Until Supabase keys are in `.env.local`, the app uses the demo store. The SQL in `supabase/migrations` is the backend waiting to be applied.

## Law

- No member-to-member messaging
- No profile release before mutual interest
- AI never introduces anyone
- Do not commit `_docs/`, `.env*`, or identity files

