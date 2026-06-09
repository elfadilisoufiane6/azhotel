// Brand identity stripped for the template skeleton.
// Fill these fields back in when the site is rebranded.
export const site = {
  name: "",
  shortName: "",
  tagline: "",
  description: "",
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
  api: process.env.NEXT_PUBLIC_API_URL || "",
  email: "",
  phone: "",
  phoneTel: "",
  whatsapp: "",
  address: {
    street: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
  },
  geo: { lat: 0, lng: 0 },
  rating: { score: 0, count: 0, max: 10 },
  languages: [
    { code: "FR", flag: "/flags/fr.svg", label: "Français" },
    { code: "GB", flag: "/flags/gb.svg", label: "English"  },
    { code: "ES", flag: "/flags/es.svg", label: "Español"  },
  ],
  social: {
    instagram:   "",
    facebook:    "",
    tripadvisor: "",
    booking:     "",
  },
  policies: {
    checkIn:  "",
    checkOut: "",
  },
} as const;

export type Site = typeof site;
