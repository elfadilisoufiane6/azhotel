# AZ Hôtel des Arts — Luxury Hotel Platform

A complete production-ready hotel website and booking platform for **AZ Hôtel des Arts**, a luxury boutique hotel in Rabat, Morocco.

## Stack

- **Frontend** — Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion
- **Backend** — Node.js · Express.js · TypeScript
- **Database** — PostgreSQL (with raw SQL migrations + a thin `pg` query layer)
- **Auth** — JWT in HTTP-only secure cookies, bcrypt password hashing
- **Admin** — Next.js dashboard with charts, tables, CRUD forms

## Project layout

```
project/
├── frontend/           # Public-facing Next.js site
├── backend/            # Express REST API
├── admin-dashboard/    # Operator dashboard (Next.js)
├── docker-compose.yml




└── README.md
```

## Quick start (development)

```bash
# 1. Start Postgres
docker compose up -d postgres

# 2. Backend
cd backend
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev          # http://localhost:4000

# 3. Frontend
cd ../frontend
cp .env.example .env.local
npm install
npm run dev          # http://localhost:3000

# 4. Admin dashboard
cd ../admin-dashboard
cp .env.example .env.local
npm install
npm run dev          # http://localhost:3001
```

## Branding

| Asset             | Value                                                        |
|-------------------|--------------------------------------------------------------|
| Hotel name        | AZ Hôtel des Arts                                            |
| Tagline           | _Where Moroccan elegance meets contemporary art_             |
| Primary           | `#0A2540` — Midnight Indigo                                  |
| Accent (gold)     | `#C9A14A` — Atlas Gold                                       |
| Sand              | `#F4ECDD` — Warm Sand                                        |
| Ink               | `#111111` — Ink Black                                        |
| Display font      | _Cormorant Garamond_ (serif)                                 |
| Body font         | _Inter_ (sans)                                               |
| Logo              | `frontend/public/brand/logo.svg`                             |

## Features

- 15-section single-page home built from modular React Server Components
- Real-time room availability checker with date-range search
- Stripe-ready booking flow with non-refundable / refundable rate options
- Full admin dashboard: bookings, rooms, pricing, reviews, blog, media, staff
- Multilingual-ready (next-intl scaffolding)
- SEO: dynamic metadata, sitemap.xml, robots.txt, JSON-LD `Hotel` schema
- Security: helmet, rate-limit, CORS allowlist, JWT with HTTP-only cookies, parameterised SQL
- Mobile-first responsive, image optimisation via `next/image`, lazy section loading

See individual `README.md` files in each sub-project for service-specific docs.
