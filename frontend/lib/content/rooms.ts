import type { Room } from "@/types";

const baseAmenities = [
  { id: "wifi",    name: "Complimentary high-speed Wi-Fi", icon: "Wifi" },
  { id: "ac",      name: "Individual climate control",     icon: "Snowflake" },
  { id: "tv",      name: "Flat-screen smart TV",           icon: "Tv" },
  { id: "bath",    name: "Marble private bathroom",        icon: "Bath" },
  { id: "robe",    name: "Plush bathrobes & slippers",     icon: "Shirt" },
  { id: "minibar", name: "Curated mini-bar",               icon: "Wine" },
  { id: "desk",    name: "Generous writing desk",          icon: "PenLine" },
  { id: "safe",    name: "In-room safe",                   icon: "Lock" },
  { id: "view",    name: "Courtyard or city view",         icon: "Trees" },
  { id: "parquet", name: "Engineered parquet flooring",    icon: "Square" },
  { id: "argan",   name: "AZ argan-oil amenities",         icon: "Droplets" },
  { id: "kettle",  name: "Kettle & tea service",           icon: "Coffee" },
];

export const rooms: Room[] = [
  {
    id: "rm-twin",
    slug: "twin-room",
    name: "Twin Room",
    category: "twin",
    shortDescription:
      "Two single beds, soft-gold velvet headboards, and an artisan brass pendant — set on a high, quiet floor.",
    description:
      "Designed for friends, colleagues and siblings, our Twin Rooms balance hospitality with restraint. Two identical single beds dressed in crisp linen sit beneath a panelled headboard; an artisan brass pendant casts a warm, low light. Each room opens onto either the inner courtyard or the leafy avenue beyond, and is finished with engineered parquet, a marble bathroom, and AZ-signature argan toiletries.",
    basePrice: 883,
    currency: "MAD",
    size: 22,
    maxGuests: 2,
    beds: "2 single beds",
    view: "Inner courtyard or avenue",
    // Images live in /public/images/rooms/twin/
    images: [
      { url: "/images/rooms/twin/01.jpg", alt: "Twin Room with green velvet headboards" },
      { url: "/images/rooms/twin/02.jpg", alt: "Twin Room mirrored detail" },
      { url: "/images/rooms/twin/03.jpg", alt: "Twin Room with curtain light" },
      { url: "/images/rooms/twin/04.jpg", alt: "Twin Room with workspace and television" },
    ],
    amenities: baseAmenities,
    rateOptions: [
      { id: "twin-nrf",  name: "Non-Refundable", price: 883,  refundable: false, prepayment: true,  breakfastIncluded: true, description: "Save 15% — pre-paid, breakfast included, no changes or refunds." },
      { id: "twin-flex", name: "Flexible Rate",  price: 1122, refundable: true,  prepayment: false, breakfastIncluded: true, description: "Free cancellation up to 48 hours before arrival. Pay at the property." },
    ],
  },
  {
    id: "rm-double",
    slug: "double-room",
    name: "Double Room",
    category: "double",
    shortDescription:
      "A king-size bed, sitting nook, French balcony, and the most photographed parquet in Rabat.",
    description:
      "Our most popular room — a refined king-size retreat with French balcony, panelled wood feature wall and a generous marble bathroom. Velvet cushions in olive and stone, an engineered parquet floor, and a sound-insulated facade make this room the choice for couples and long-stay travellers alike.",
    basePrice: 1050,
    currency: "MAD",
    size: 26,
    maxGuests: 2,
    beds: "1 king-size bed",
    view: "City or courtyard",
    // Images live in /public/images/rooms/double/
    images: [
      { url: "/images/rooms/double/01.jpg", alt: "Double Room king bed with French balcony" },
      { url: "/images/rooms/double/02.jpg", alt: "Double Room turn-down service" },
      { url: "/images/rooms/double/03.jpg", alt: "Double Room with terrace view" },
      { url: "/images/rooms/double/04.jpg", alt: "Double Room curtain-light cityscape" },
    ],
    amenities: baseAmenities,
    rateOptions: [
      { id: "double-nrf",  name: "Non-Refundable", price: 1050, refundable: false, prepayment: true,  breakfastIncluded: true, description: "Best available rate — pay in advance, breakfast for two included." },
      { id: "double-flex", name: "Flexible Rate",  price: 1290, refundable: true,  prepayment: false, breakfastIncluded: true, description: "Free cancellation up to 48h before arrival. Pay at the property." },
    ],
  },
  {
    id: "rm-single",
    slug: "single-room",
    name: "Classic Single",
    category: "single",
    shortDescription:
      "A thoughtful retreat for the solo traveller — bright, quiet, and impeccably appointed.",
    description:
      "A single room engineered for one — restorative sleep, an executive writing desk, fast Wi-Fi, and a marble shower room. Quiet by design, with blackout curtaining and triple-glazed glazing onto the avenue.",
    basePrice: 1051,
    currency: "MAD",
    size: 16,
    maxGuests: 1,
    beds: "1 queen bed",
    view: "Avenue or courtyard",
    // Images live in /public/images/rooms/single/
    images: [
      { url: "/images/rooms/single/01.png", alt: "Classic Single bed and side table" },
      { url: "/images/rooms/single/02.jpg", alt: "Classic Single workspace nook" },
    ],
    amenities: baseAmenities,
    rateOptions: [
      { id: "single-flex", name: "Flexible Rate", price: 1051, refundable: true, prepayment: false, breakfastIncluded: true, description: "Free cancellation up to 48h before arrival. Pay at the property." },
    ],
  },
  {
    id: "rm-suite",
    slug: "suite-balcony",
    name: "Suite with Private Balcony",
    category: "suite",
    shortDescription:
      "Our signature room — a king-size bedroom paired with a private timber balcony for breakfast in the sun.",
    description:
      "The Suite with Private Balcony is the house at its most expansive — a calm bedroom that opens onto a fully private deck shaded by climbing jasmine. Take breakfast outside, write at the desk, and end the day with mint tea on the balcony. Includes premium amenities, complimentary pressing on arrival, and priority restaurant reservations.",
    basePrice: 1690,
    currency: "MAD",
    size: 32,
    maxGuests: 2,
    beds: "1 king-size bed",
    view: "Private balcony · courtyard",
    // Images live in /public/images/rooms/suite/
    images: [
      { url: "/images/rooms/suite/01.png", alt: "Suite balcony with breakfast for two" },
      { url: "/images/rooms/suite/02.jpg", alt: "Suite balcony tea service" },
      { url: "/images/rooms/suite/03.jpg", alt: "Suite in-room workspace with kettle" },
      { url: "/images/rooms/suite/04.jpg", alt: "Suite open balcony doors" },
    ],
    amenities: baseAmenities,
    rateOptions: [
      { id: "suite-nrf",  name: "Non-Refundable", price: 1690, refundable: false, prepayment: true,  breakfastIncluded: true, description: "Save 18% — pre-paid, premium breakfast and pressing included." },
      { id: "suite-flex", name: "Flexible Rate",  price: 1980, refundable: true,  prepayment: false, breakfastIncluded: true, description: "Free cancellation up to 48h before arrival. Pay at the property." },
    ],
  },
];
