export type GalleryCategory = "rooms" | "restaurant" | "lobby" | "exterior" | "city";

export type GalleryItem = {
  id: string;
  url: string;
  alt: string;
  category: GalleryCategory;
  span?: "tall" | "wide" | "square";
};

/**
 * Helper — build gallery items from explicit filenames.
 * Each entry maps to /public/images/gallery/<category>/<file>
 * `span` controls the masonry tile size on the gallery page.
 */
type GalleryEntry = { file: string; alt: string; span?: GalleryItem["span"] };

function build(category: GalleryCategory, items: GalleryEntry[]): GalleryItem[] {
  return items.map(({ file, alt, span }) => ({
    id: `${category}-${file.replace(/\.[^.]+$/, "")}`,
    url: `/images/gallery/${category}/${file}`,
    alt,
    category,
    span,
  }));
}

// ─── Curated gallery — actual files in /public/images/gallery/ ──────────────
export const galleryImages: GalleryItem[] = [
  ...build("rooms", [
    { file: "01.jpg", alt: "Double Room king bed",           span: "tall" },
    { file: "02.jpg", alt: "Double Room turn-down" },
    { file: "03.jpg", alt: "Double Room balcony view" },
    { file: "04.jpg", alt: "Double Room curtain light",      span: "tall" },
    { file: "05.jpg", alt: "Twin Room" },
    { file: "06.jpg", alt: "Twin Room mirrored",             span: "tall" },
    { file: "07.jpg", alt: "Twin Room curtain" },
    { file: "08.jpg", alt: "Twin Room workspace" },
    { file: "09.jpg", alt: "Suite balcony breakfast",        span: "tall" },
    { file: "10.jpg", alt: "Suite balcony tea service" },
    { file: "11.jpg", alt: "Suite workspace" },
    { file: "12.jpg", alt: "Bathroom — towels",              span: "tall" },
    { file: "13.jpg", alt: "Bathroom — vanity" },
  ]),

  ...build("restaurant", [
    { file: "01.png", alt: "Beef tagine, almonds & figs",    span: "tall" },
    { file: "02.jpg", alt: "Slow-cooked kefta tagine" },
    { file: "03.png", alt: "Couscous Royal" },
    { file: "04.jpg", alt: "Lamb tagine, preserved lemon",   span: "tall" },
    { file: "05.jpg", alt: "Atlantic sea bream" },
    { file: "06.jpg", alt: "Pan-seared salmon" },
    { file: "07.jpg", alt: "Filet of beef" },
    { file: "08.jpg", alt: "Beef stroganoff" },
    { file: "09.jpg", alt: "Crispy schnitzel" },
    { file: "10.jpg", alt: "Garden bowl" },
    { file: "11.jpg", alt: "Almond ghoriba" },
    { file: "12.jpg", alt: "Pain au chocolat",               span: "tall" },
    { file: "13.jpg", alt: "Breakfast salon",                span: "wide" },
  ]),

  ...build("lobby", [
    { file: "01.jpg", alt: "Lobby with golden chandelier",   span: "tall" },
    { file: "02.png", alt: "Chandelier bar" },
    { file: "03.jpg", alt: "Marble corridor" },
    { file: "04.jpg", alt: "Welcome at reception",           span: "tall" },
    { file: "05.jpg", alt: "Reception desk" },
  ]),

  ...build("exterior", [
    { file: "01.jpg", alt: "AZ Hôtel des Arts facade",       span: "tall" },
    { file: "02.jpg", alt: "Facade detail" },
  ]),

  ...build("city", [
    { file: "01.jpg", alt: "Rabat skyline",                  span: "wide" },
    { file: "02.jpg", alt: "Rabat from the upper floors" },
  ]),
];
