export const site = {
  name: "AZ Hôtel des Arts",
  shortName: "AZ Hôtel",
  tagline: "Boutique luxury in the heart of Rabat.",
  description:
    "Discover Rabat's most celebrated boutique hotel — twenty-four refined rooms, an authentic Moroccan kitchen, and a multilingual 24-hour team rated 9.0/10 by 1,325 guests.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://azhoteldesarts.com",
  api: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  email: "reservations@azhoteldesarts.com",
  phone: "+212 537 26 22 02",
  phoneTel: "+212537262202",
  whatsapp: "+212600000000",
  address: {
    street: "Avenue Mohammed V",
    city: "Rabat",
    region: "Rabat-Salé-Kénitra",
    postalCode: "10000",
    country: "Morocco",
  },
  geo: { lat: 34.0209, lng: -6.8416 },
  rating: { score: 8.3, count: 1325, max: 10 },
  // ─── Languages spoken by the front-desk team
  languages: [
    { code: "FR", flag: "/flags/fr.svg", label: "Français" },
    { code: "GB", flag: "/flags/gb.svg", label: "English"  },
    { code: "ES", flag: "/flags/es.svg", label: "Español"  },
  ],
  social: {
    instagram: "https://www.instagram.com/azhotelrabatcentre/",
    facebook:  "https://facebook.com/azhoteldesarts",
    tripadvisor: "https://tripadvisor.com",
    booking:   "https://booking.com",
  },
  policies: {
    checkIn:  "15:00",
    checkOut: "12:00",
  },
} as const;

export type Site = typeof site;
