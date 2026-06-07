# AZ Hôtel des Arts — Admin Dashboard

Operator dashboard for managing bookings, rooms, reviews, blog, media and settings.

## Stack

- **Next.js 15** (App Router)
- **SWR** for live API data
- **Recharts** for charts
- **Tailwind CSS**

## Pages

- `/`          — Overview (KPIs, revenue chart, status breakdown, recent bookings)
- `/bookings`  — Reservation management with status filters
- `/rooms`     — Room inventory and pricing
- `/users`     — Customer accounts (stub)
- `/reviews`   — Moderation
- `/blog`      — Blog manager
- `/gallery`   — Media library
- `/settings`  — Hotel profile and policies
- `/login`     — Admin sign-in

The dashboard talks to the same backend at `NEXT_PUBLIC_API_URL`. Roles `manager` and
`admin` see operational endpoints; the seed user `admin@azhoteldesarts.com` works out
of the box.

## Develop

```bash
cp .env.example .env.local
npm install
npm run dev    # http://localhost:3001
```
