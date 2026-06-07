-- AZ Hôtel des Arts — initial schema
-- All tables use UUID primary keys and parameterised SQL throughout the app
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS citext;

-- ─── USERS ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           CITEXT UNIQUE NOT NULL,
  password_hash   TEXT NOT NULL,
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL,
  phone           TEXT,
  role            TEXT NOT NULL DEFAULT 'guest' CHECK (role IN ('guest', 'staff', 'manager', 'admin')),
  newsletter_opt  BOOLEAN NOT NULL DEFAULT false,
  loyalty_tier    TEXT DEFAULT 'standard' CHECK (loyalty_tier IN ('standard', 'silver', 'gold', 'platinum')),
  last_login_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ─── AMENITIES ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS amenities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  icon        TEXT NOT NULL,
  description TEXT,
  category    TEXT
);

-- ─── ROOMS ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rooms (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug               TEXT UNIQUE NOT NULL,
  name               TEXT NOT NULL,
  category           TEXT NOT NULL CHECK (category IN ('single', 'twin', 'double', 'suite')),
  short_description  TEXT NOT NULL,
  description        TEXT NOT NULL,
  base_price         NUMERIC(10,2) NOT NULL,
  currency           CHAR(3) NOT NULL DEFAULT 'MAD',
  size_sqm           INT NOT NULL,
  max_guests         INT NOT NULL,
  beds               TEXT NOT NULL,
  view               TEXT,
  total_inventory    INT NOT NULL DEFAULT 1,
  is_active          BOOLEAN NOT NULL DEFAULT true,
  display_order      INT DEFAULT 0,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_rooms_active ON rooms(is_active);

-- ─── ROOM IMAGES ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS room_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id       UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  url           TEXT NOT NULL,
  alt           TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_cover      BOOLEAN NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS idx_room_images_room ON room_images(room_id);

-- ─── ROOM ↔ AMENITY ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS room_amenities (
  room_id     UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  amenity_id  UUID NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (room_id, amenity_id)
);

-- ─── RATE PLANS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rate_plans (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id             UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  description         TEXT,
  price               NUMERIC(10,2) NOT NULL,
  refundable          BOOLEAN NOT NULL DEFAULT true,
  prepayment_required BOOLEAN NOT NULL DEFAULT false,
  breakfast_included  BOOLEAN NOT NULL DEFAULT true,
  display_order       INT DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_rate_plans_room ON rate_plans(room_id);

-- ─── BOOKINGS ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference           TEXT UNIQUE NOT NULL,
  user_id             UUID REFERENCES users(id) ON DELETE SET NULL,
  room_id             UUID NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
  rate_plan_id        UUID REFERENCES rate_plans(id) ON DELETE SET NULL,
  check_in            DATE NOT NULL,
  check_out           DATE NOT NULL,
  guests_adults       INT NOT NULL DEFAULT 2,
  guests_children     INT NOT NULL DEFAULT 0,
  guest_first_name    TEXT NOT NULL,
  guest_last_name     TEXT NOT NULL,
  guest_email         TEXT NOT NULL,
  guest_phone         TEXT NOT NULL,
  arrival_time        TEXT,
  special_requests    TEXT,
  total_amount        NUMERIC(10,2) NOT NULL,
  currency            CHAR(3) NOT NULL DEFAULT 'MAD',
  status              TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show')),
  source              TEXT NOT NULL DEFAULT 'web',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (check_out > check_in)
);
CREATE INDEX IF NOT EXISTS idx_bookings_dates  ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_email  ON bookings(guest_email);

-- ─── PAYMENTS ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id        UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  provider          TEXT NOT NULL CHECK (provider IN ('stripe', 'cmi', 'manual')),
  provider_intent   TEXT,
  amount            NUMERIC(10,2) NOT NULL,
  currency          CHAR(3) NOT NULL DEFAULT 'MAD',
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'authorized', 'captured', 'refunded', 'failed')),
  paid_at           TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── REVIEWS ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  UUID REFERENCES bookings(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  country     TEXT,
  country_code CHAR(2),
  score       NUMERIC(3,1) NOT NULL CHECK (score >= 0 AND score <= 10),
  title       TEXT,
  body        TEXT NOT NULL,
  travel_type TEXT,
  stay_date   TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_reviews_published ON reviews(is_published);

-- ─── BLOG POSTS & CATEGORIES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug  TEXT UNIQUE NOT NULL,
  name  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  excerpt       TEXT NOT NULL,
  body          TEXT NOT NULL,
  cover_image   TEXT NOT NULL,
  author        TEXT NOT NULL,
  category_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  tags          TEXT[] DEFAULT '{}',
  read_time     INT NOT NULL DEFAULT 5,
  is_published  BOOLEAN NOT NULL DEFAULT false,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at);

-- ─── CONTACTS & NEWSLETTER ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  subject    TEXT,
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      CITEXT UNIQUE NOT NULL,
  is_active  BOOLEAN NOT NULL DEFAULT true,
  source     TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── STAFF ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS staff (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  position    TEXT NOT NULL,
  department  TEXT NOT NULL,
  start_date  DATE NOT NULL DEFAULT CURRENT_DATE,
  is_active   BOOLEAN NOT NULL DEFAULT true
);

-- ─── GALLERY ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url           TEXT NOT NULL,
  alt           TEXT NOT NULL,
  category      TEXT NOT NULL,
  width         INT NOT NULL,
  height        INT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_published  BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── updated_at trigger ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END $$ LANGUAGE plpgsql;

DO $$ DECLARE t text; BEGIN
  FOR t IN SELECT unnest(ARRAY['users','rooms','bookings','blog_posts']) LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS trg_%I_touch ON %I;
      CREATE TRIGGER trg_%I_touch BEFORE UPDATE ON %I
        FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
    ', t, t, t, t);
  END LOOP;
END $$;
