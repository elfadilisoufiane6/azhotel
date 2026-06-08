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
    eyebrow:  "Rabat · Maroc",
    title1:   "Ralentissez.",
    title2:   "Vous êtes arrivé.",
    body:     "Une parenthèse boutique au cœur de Rabat. Le temps y ralentit. Tout le reste, c'est nous.",
    trust:    "Wi-Fi gratuit · Parking gratuit · Petit-déjeuner inclus",
  },
  rooms: {
    eyebrow:  "Chambres & Suites",
    title1:   "Dormez bien.",
    title2:   "Réveillez-vous à Rabat.",
    lede:     "Vingt-quatre chambres finies à la main dans quatre catégories. Parquet, salles de bains en marbre, rideaux occultants et la ligne d'amenities à l'argan AZ — à partir de 883 MAD la nuit, petit-déjeuner pour deux inclus.",
    seeAll:   "Voir toutes les chambres",
  },
  address: {
    eyebrow:  "La terrasse · Plein soleil",
    title1:   "Posez-vous.",
    title2:   "Le soleil fait le reste.",
    body:     "Une banquette qui garde la chaleur, un café à portée de main, le soleil de Rabat qui s'étire jusqu'au crépuscule. C'est notre invitation.",
  },
  marquee: {
    eyebrow: "Restaurant · The Atelier",
    title1:  "Le Maroc à table.",
    title2:  "Le monde au menu.",
  },
  dining: {
    eyebrow:  "Restaurant · The Atelier",
    title1:   "Un goût",
    title2:   "du Maroc.",
    lede:     "D'un généreux petit-déjeuner marocain-continental au dîner à la carte plus intime. Tajines mijotés, poissons de l'Atlantique pêchés à la ligne, et un chariot de pâtisseries à la fleur d'oranger et aux amandes — ouvert aux résidents comme à la ville.",
    breakfast:"Petit-déjeuner 07:00 — 10:30",
    dinner:   "Dîner 19:30 — 22:30",
    galleryEyebrow: "Galerie culinaire",
    galleryTitle:   "Ce que notre chef sert aujourd'hui.",
  },
  booking: {
    eyebrow:  "Réservation directe · Meilleur tarif garanti",
    title1:   "Une réservation.",
    title2:   "Tout votre séjour.",
    lede:     "Des voyageurs de plus de 80 pays font confiance à AZ Hôtel des Arts. Réservez directement sur notre site pour bénéficier de notre meilleur tarif, d'une annulation gratuite et d'un accueil personnel par l'équipe.",
    reassure: [
      { title: "Meilleur tarif garanti",       body: "Le prix le plus bas en ligne — réservez en direct, économisez 15%." },
      { title: "Annulation gratuite",           body: "Tarif flexible annulable jusqu'à 48h avant l'arrivée." },
      { title: "Petit-déjeuner pour deux",      body: "Buffet marocain-continental généreux inclus." },
      { title: "Cadeau d'accueil à l'arrivée",  body: "Une petite attention de notre équipe dans chaque chambre." },
    ],
    contactTitle1: "Parlez à une vraie personne,",
    contactTitle2: "jour et nuit.",
    langTitle1:    "D'où que vous veniez,",
    langTitle2:    "nous parlons votre langue.",
    reception24:   "Réception ouverte 24h/24, 7j/7",
  },
  gallery: {
    eyebrow:  "Galerie photo",
    title1:   "La maison",
    title2:   "en lumière naturelle.",
    lede:     "Les chambres, le restaurant, le lobby illuminé par le lustre et la ville qui nous entoure — photographiés aux heures que nous préférons.",
    filters:  { all: "Tout", rooms: "Chambres", restaurant: "Restaurant", lobby: "Lobby", exterior: "Extérieur", city: "Ville" },
  },
  footer: {
    explore:     "Explorer",
    reception:   "Réception 24h/24",
    description: "L'adresse boutique la plus prisée de Rabat — vingt-quatre chambres, une cuisine marocaine authentique, et une équipe multilingue 24h/24 notée 9.0/10.",
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
