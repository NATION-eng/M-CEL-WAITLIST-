# M-CEL TECH — Bootcamp Waitlist

A premium, standalone waitlist landing page for M-CEL TECH's **AI Productivity & Digital Innovation Bootcamp**. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Prisma, and PostgreSQL.

This is **not** the main company site — its only job is to collect waitlist signups.

---

## 1. Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- A PostgreSQL database (local, or a free hosted one like [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app))

## 2. Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure your database
cp .env.example .env
# then open .env and set DATABASE_URL to your real Postgres connection string

# 3. Push the Prisma schema to your database (creates the `waitlist` table)
npx prisma db push

# 4. Run the dev server
npm run dev
```

Visit **http://localhost:3000**.

## 3. Viewing signups

No admin dashboard is included by design — use Prisma Studio, a visual database browser:

```bash
npm run db:studio
```

This opens a local UI at `http://localhost:5555` where you can view, filter, and export waitlist entries.

## 4. Project structure

```
src/
  app/
    layout.tsx          # Root layout, fonts (Space Grotesk + Inter), SEO metadata
    page.tsx             # Composes all landing page sections
    globals.css          # Tailwind base styles + brand utilities
    api/waitlist/route.ts # POST endpoint: validates, sanitizes, dedupes, persists
  components/
    Navbar.tsx
    Hero.tsx
    WhyJoin.tsx
    Highlights.tsx
    WaitlistForm.tsx      # react-hook-form + zod, loading + success states
    Footer.tsx
    ui/
      Container.tsx
      FadeIn.tsx          # Shared scroll-triggered Framer Motion wrapper
  lib/
    prisma.ts             # Prisma client singleton
    utils.ts              # cn(), sanitizeText(), sanitizePhone()
  validations/
    waitlist.ts            # Shared Zod schema + Nigerian states list (client + server)
prisma/
  schema.prisma            # Waitlist model
```

## 5. API

**POST `/api/waitlist`**

Body:

```json
{
  "fullName": "Jane Okafor",
  "email": "jane@example.com",
  "phone": "08012345678",
  "state": "Lagos",
  "occupation": "Product Designer",
  "consent": true
}
```

- Validates all fields server-side with Zod (independent of the client).
- Trims and sanitizes text input; normalizes phone numbers.
- Rejects duplicate emails (`409 Conflict`) via a unique constraint on `email`.
- Returns `201` with the created record's `id`, `fullName`, `email`, `createdAt` on success.

## 6. Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add environment variables in the Vercel dashboard: `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`.
4. Deploy. The `postinstall` script runs `prisma generate` automatically; the `build` script also runs `prisma generate` before `next build`.

If your database is not yet reachable at build time, make sure `prisma db push` (or a migration) has already been run against it once — the build only generates the Prisma Client, it does not modify your schema.

## 7. Brand tokens

| Token | Value |
|---|---|
| Primary — Royal Blue | `#2563EB` |
| Secondary — Midnight Navy | `#0F172A` |
| Accent — Electric Cyan | `#22D3EE` |
| Background | White |
| Headings | Space Grotesk |
| Body | Inter |
