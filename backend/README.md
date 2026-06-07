# AZ Hôtel des Arts — Backend (Express + PostgreSQL)

A typed REST API for the public site, the booking flow, and the admin dashboard.

## Stack

- **Node.js 20 +** · **Express 4** · **TypeScript** (ESM)
- **PostgreSQL** via raw SQL through `pg`
- **JWT** sessions in HTTP-only cookies, **bcrypt** password hashing
- **zod** for request validation
- **helmet**, **cors**, **express-rate-limit** for security
- **nodemailer** for transactional email

## Project structure

```
src/
  index.ts            App bootstrap, middleware chain, route mounting
  config/             env loading (zod-validated), pg pool
  database/           migrations/, seed.ts, migrate.ts
  middleware/         auth, validate, errorHandler
  controllers/        thin request handlers
  routes/             Router definitions per resource
  services/           Business logic (availability, email)
  utils/              Shared helpers
uploads/              User-uploaded media (gitignored)
Dockerfile
```

## Routes

| Method | Path                          | Purpose                                |
|--------|-------------------------------|----------------------------------------|
| POST   | `/api/auth/register`          | Create user account                    |
| POST   | `/api/auth/login`             | Issue HTTP-only session cookie         |
| POST   | `/api/auth/logout`            | Clear session cookie                   |
| GET    | `/api/auth/me`                | Current user (requires auth)           |
| GET    | `/api/rooms`                  | List active rooms (+ images, rates)    |
| GET    | `/api/rooms/:slug`            | Single room                            |
| GET    | `/api/rooms/availability`     | Room availability for a window         |
| POST   | `/api/bookings`               | Create booking (transactional, locked) |
| GET    | `/api/bookings`               | List bookings (staff/admin)            |
| GET    | `/api/bookings/:reference`    | Single booking                         |
| PATCH  | `/api/bookings/:id/status`    | Update status (staff/admin)            |
| GET    | `/api/reviews`                | Published reviews                      |
| POST   | `/api/reviews`                | Submit a review (moderated)            |
| GET    | `/api/blog?category=&q=`      | List blog posts                        |
| GET    | `/api/blog/:slug`             | Single article                         |
| GET    | `/api/gallery`                | Published images                       |
| POST   | `/api/contact`                | Contact form                           |
| POST   | `/api/newsletter`             | Subscribe                              |
| GET    | `/api/dashboard/overview`     | Admin KPIs (manager/admin)             |
| POST   | `/api/payments/intent`        | Create payment intent                  |
| POST   | `/api/payments/webhook`       | Provider webhook                       |
| GET    | `/api/health`                 | Liveness probe                         |

## Develop

```bash
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev    # http://localhost:4000
```

## Seed admin credentials

After `npm run db:seed`:

| Email                          | Password      | Role  |
|--------------------------------|---------------|-------|
| admin@azhoteldesarts.com       | `ChangeMe!23` | admin |

## Security

- Helmet sets a strict set of HTTP headers
- CORS strictly allow-lists the frontend and admin origins (with `credentials: true`)
- `/api/auth/*` is throttled to 10 requests / minute / IP
- All routes share a 300 r/m global rate limit
- All SQL is parameterised — no string concatenation
- JWT secret must be ≥ 16 characters; rotate via `JWT_SECRET` env var
- Cookies are HTTP-only, `SameSite=Lax` in development, `Secure + None` in prod
- Passwords are stored using `bcrypt` with cost 12
- Request bodies are validated with `zod` before handlers see them
