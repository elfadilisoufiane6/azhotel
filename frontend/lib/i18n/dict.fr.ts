// French — primary language
export const fr = {
  langName: "Français",
  nav: {
    rooms:    "Chambres",
    gallery:  "Galerie",
    booking:  "Réservation",
    bookNow:  "Réserver",
  },
  common: {
    discover:        "Découvrir",
    learnMore:       "En savoir plus",
    reserveNow:      "Réserver maintenant",
    checkAvail:      "Vérifier les disponibilités",
    bookDirect:      "Réservez en direct",
    from:            "À partir de",
    perNight:        "/ nuit",
    nights:          "nuits",
    guests:          "invités",
    adults:          "Adultes",
    children:        "Enfants",
    rooms:           "Chambres",
    checkIn:         "Arrivée",
    checkOut:        "Départ",
    wifi:            "Wi-Fi gratuit",
    parking:         "Parking gratuit",
    breakfast:       "Petit-déjeuner buffet inclus",
    reviewsCount:    "avis vérifiés",
    rated:           "Noté",
    weSpeak:         "Nous parlons",
    address:         "Adresse",
    phone:           "Téléphone",
    email:           "E-mail",
    languagesSpoken: "Langues parlées",
    backToHome:      "Retour à l'accueil",
    seeAll:          "Voir toutes",
    inTheRoom:       "Dans la chambre",
    photographs:     "Photographies",
    size:            "Surface",
    beds:            "Lits",
    upTo:            "jusqu'à",
  },
  hero: {
    eyebrow:  "",
    title1:   "",
    title2:   "",
    body:     "",
    trust:    "",
  },
  rooms: {
    eyebrow:  "",
    title1:   "",
    title2:   "",
    lede:     "",
    seeAll:   "Voir toutes les chambres",
  },
  address: {
    eyebrow:  "",
    title1:   "",
    title2:   "",
    body:     "",
  },
  marquee: {
    eyebrow: "",
    title1:  "",
    title2:  "",
  },
  dining: {
    eyebrow:  "",
    title1:   "",
    title2:   "",
    lede:     "",
    breakfast:"",
    dinner:   "",
    galleryEyebrow: "",
    galleryTitle:   "",
  },
  booking: {
    eyebrow:  "",
    title1:   "",
    title2:   "",
    lede:     "",
    reassure: [
      { title: "", body: "" },
      { title: "", body: "" },
      { title: "", body: "" },
      { title: "", body: "" },
    ],
    contactTitle1: "",
    contactTitle2: "",
    langTitle1:    "",
    langTitle2:    "",
    reception24:   "",
  },
  gallery: {
    eyebrow:  "",
    title1:   "",
    title2:   "",
    lede:     "",
    filters:  { all: "Tout", rooms: "Chambres", restaurant: "Restaurant", lobby: "Lobby", exterior: "Extérieur", city: "Ville" },
  },
  footer: {
    explore:     "Explorer",
    reception:   "",
    description: "",
  },
} as const;

// Widen the `as const` literal types into plain strings so other dictionaries
// (en, es) can supply their own values without TS rejecting them.
type Widen<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends ReadonlyArray<infer U> ? ReadonlyArray<Widen<U>> :
  T extends object ? { -readonly [K in keyof T]: Widen<T[K]> } :
  T;

export type Dict = Widen<typeof fr>;
