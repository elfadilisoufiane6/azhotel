import bcrypt from "bcryptjs";
import { pool, withTransaction } from "../config/db.js";

async function seed() {
  await withTransaction(async (db) => {
    // Wipe in dev only
    await db.query(`TRUNCATE
      reviews, payments, bookings, rate_plans, room_amenities, room_images, rooms,
      amenities, blog_posts, categories, contacts, newsletter_subscribers,
      gallery_images, staff, users
      RESTART IDENTITY CASCADE;`);

    // ─── admin user ─────────────────────────────────────────────────────
    const password = await bcrypt.hash("ChangeMe!23", 12);
    await db.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5)`,
      ["admin@azhoteldesarts.com", password, "Hotel", "Admin", "admin"],
    );

    // ─── amenities ──────────────────────────────────────────────────────
    const amenities = [
      ["wifi",    "High-speed Wi-Fi",     "Wifi"],
      ["ac",      "Climate control",      "Snowflake"],
      ["tv",      "Smart flat-screen TV", "Tv"],
      ["bath",    "Private bathroom",     "Bath"],
      ["robe",    "Bathrobes & slippers", "Shirt"],
      ["minibar", "Curated mini-bar",     "Wine"],
      ["desk",    "Writing desk",         "PenLine"],
      ["safe",    "In-room safe",         "Lock"],
      ["view",    "Inner-courtyard view", "Trees"],
      ["parquet", "Parquet flooring",     "Square"],
    ];
    for (const [slug, name, icon] of amenities) {
      await db.query("INSERT INTO amenities (slug, name, icon) VALUES ($1, $2, $3)", [slug, name, icon]);
    }

    // ─── rooms ──────────────────────────────────────────────────────────
    const roomsData = [
      ["twin-room-courtyard", "Twin Room — Courtyard", "twin",   "Two single beds, parquet floors, and quiet courtyard views on a high floor.", 883,  22, 2, "2 single beds",      "Inner courtyard", 2, [
        ["/images/rooms/twin-1.jpg", "Twin room with parquet floors", true],
        ["/images/rooms/twin-2.jpg", "Twin room bathroom",            false],
      ], [
        ["Non-Refundable", "Save 15% — pay in advance, no changes or refunds.",                 883,  false, true,  true],
        ["Flexible Rate",  "Free cancellation up to 48 hours before arrival. Pay at property.", 1122, true,  false, true],
      ]],
      ["double-room-deluxe", "Deluxe Double Room", "double", "A king-size bed, sitting nook, and the city's most photographed parquet floors.", 1050, 26, 2, "1 king-size bed", "Courtyard or garden", 6, [
        ["/images/rooms/double-1.jpg", "Deluxe Double Room king bed",  true],
        ["/images/rooms/double-2.jpg", "Deluxe Double sitting area",  false],
      ], [
        ["Non-Refundable", "Best available rate — pay in advance, breakfast included.",        1050, false, true,  true],
        ["Flexible Rate",  "Free cancellation up to 48h before arrival. Pay at property.",     1290, true,  false, true],
      ]],
      ["single-room-classic", "Classic Single Room", "single", "A thoughtful single retreat for the solo traveller.", 1051, 16, 1, "1 single bed", "Courtyard", 3, [
        ["/images/rooms/single-1.jpg", "Classic Single Room bed", true],
      ], [
        ["Flexible Rate",  "Free cancellation up to 48h before arrival. Pay at property.", 1051, true, false, true],
      ]],
      ["des-arts-suite", "Des Arts Suite", "suite", "Our signature suite — separate sitting room, terrace, and bespoke Moroccan artworks.", 2450, 48, 3, "1 king + 1 day bed", "Courtyard terrace", 1, [
        ["/images/rooms/suite-1.jpg", "Des Arts Suite living room", true],
        ["/images/rooms/suite-2.jpg", "Des Arts Suite bedroom",     false],
      ], [
        ["Non-Refundable", "Save 20% — pay in advance.",                                       2450, false, true,  true],
        ["Flexible Rate",  "Free cancellation up to 48h before arrival.",                      2890, true,  false, true],
      ]],
    ] as const;

    for (const [slug, name, category, shortDesc, basePrice, sqm, maxGuests, beds, view, inventory, images, rates] of roomsData) {
      const r = await db.query(
        `INSERT INTO rooms (slug, name, category, short_description, description, base_price, size_sqm, max_guests, beds, view, total_inventory)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
        [slug, name, category, shortDesc, shortDesc, basePrice, sqm, maxGuests, beds, view, inventory],
      );
      const roomId = r.rows[0].id;
      for (const [url, alt, isCover] of images) {
        await db.query("INSERT INTO room_images (room_id, url, alt, is_cover) VALUES ($1,$2,$3,$4)", [roomId, url, alt, isCover]);
      }
      for (const [name, desc, price, refund, prepay, brk] of rates) {
        await db.query(
          `INSERT INTO rate_plans (room_id, name, description, price, refundable, prepayment_required, breakfast_included)
           VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [roomId, name, desc, price, refund, prepay, brk],
        );
      }
      // Attach all amenities to every room for now
      await db.query(
        `INSERT INTO room_amenities (room_id, amenity_id)
         SELECT $1, id FROM amenities`,
        [roomId],
      );
    }

    // ─── reviews (a curated subset) ─────────────────────────────────────
    const reviews = [
      ["Hussain", "United Kingdom", "GB", 9.4, "Far above its category", "Not a 3 star hotel — more on the side of a 4 star.", "Couple", "March 2025"],
      ["Natasha", "United Kingdom", "GB", 9.6, "Perfectly placed in Rabat", "Central and near restaurants. Breakfast was excellent.", "Couple", "February 2025"],
      ["Laura",   "Colombia",       "CO", 10.0, "Would stay every time I visit", "Everything works perfectly.", "Solo", "January 2025"],
    ];
    for (const [name, country, code, score, title, body, type, when] of reviews) {
      await db.query(
        `INSERT INTO reviews (author_name, country, country_code, score, title, body, travel_type, stay_date, is_published)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,true)`,
        [name, country, code, score, title, body, type, when],
      );
    }

    // ─── categories & blog ──────────────────────────────────────────────
    for (const c of ["Travel Guide", "Gastronomy", "Wellness", "Culture", "Press"]) {
      await db.query("INSERT INTO categories (slug, name) VALUES ($1, $2)", [c.toLowerCase().replace(/\s/g, "-"), c]);
    }
    await db.query(
      `INSERT INTO blog_posts (slug, title, excerpt, body, cover_image, author, read_time, is_published, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,true,now())`,
      ["48-hours-in-rabat", "48 Hours in Rabat: An Insider's Itinerary",
       "From the ramparts of the Kasbah of the Udayas to freshly roasted coffee on Avenue Mohammed V — our concierge maps a perfect weekend.",
       "Long-form article body.", "/images/blog/rabat-medina.jpg", "Alae Bennani", 7],
    );

    // ─── gallery ────────────────────────────────────────────────────────
    for (let i = 1; i <= 12; i++) {
      await db.query(
        `INSERT INTO gallery_images (url, alt, category, width, height, display_order)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [`/images/gallery/${String(i).padStart(2,"0")}.jpg`, `Gallery image ${i}`,
         ["rooms","restaurant","spa","gardens","art","exterior"][i % 6], 1600, 1067, i],
      );
    }

    console.log("✅ Seed complete");
  });
  await pool.end();
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
