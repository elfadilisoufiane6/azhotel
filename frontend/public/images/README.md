# 📸 Image folders — guide

> **The structure is modular: each section / page / service has its own folder. Drop your images in the right folder and the website picks them up automatically.**

```
public/images/
├── home/                        ← Home-page sections
│   ├── hero/         main.jpg + mobile.jpg
│   ├── marquee/      01.jpg → 10.jpg
│   ├── stay/         main.jpg + mobile.jpg
│   ├── dining/       main.jpg + mobile.jpg
│   ├── address/      main.jpg + mobile.jpg
│   ├── booking/      main.jpg + mobile.jpg
│   └── fitness/      main.jpg + mobile.jpg   (slot ready — Showcase opt-in)
│
├── pages/                       ← Individual page heroes
│   ├── rooms/            hero.jpg + mobile.jpg
│   ├── gallery/          hero.jpg + mobile.jpg
│   ├── booking/          main.jpg + mobile.jpg
│   ├── booking-contact/  main.jpg + mobile.jpg
│   └── fitness/          hero.jpg + mobile.jpg  (slot ready — /fitness route opt-in)
│
├── rooms/                       ← Room photographs (room detail pages)
│   ├── twin/         01.jpg → 04.jpg
│   ├── double/       01.jpg → 04.jpg
│   ├── single/       01.jpg → 02.jpg
│   └── suite/        01.jpg → 04.jpg
│
└── gallery/                     ← Filtered photo-gallery on /gallery
    ├── rooms/        01.jpg → 13.jpg
    ├── restaurant/   01.jpg → 13.jpg
    ├── lobby/        01.jpg → 05.jpg
    ├── exterior/     01.jpg → 02.jpg
    ├── city/         01.jpg → 02.jpg
    └── fitness/      01.jpg → 05.jpg        (slot ready)
```

## How to replace an image
1. Open the matching folder (e.g. `home/hero/`).
2. Replace the file (keep the same filename and extension).
3. Hard refresh the browser — done.

## How to add a brand new service folder
Follow the same modular pattern. Example — adding "Spa":

1. Create `public/images/home/spa/` → `main.jpg` + `mobile.jpg`
2. Create `public/images/pages/spa/` → `hero.jpg` + `mobile.jpg`
3. Create `public/images/gallery/spa/` → `01.jpg` … `NN.jpg`
4. Add a Showcase to `app/HomeClient.tsx`:
   ```tsx
   <Showcase
     id="spa"
     desktop="/images/home/spa/main.jpg"
     mobile="/images/home/spa/mobile.jpg"
     ...
   />
   ```
5. (Optional) wire the gallery filter in `lib/content/gallery.ts` and
   add `"spa"` to the `GalleryCategory` union.

## Image guidelines
- **Format**: JPG for photographs, PNG only for transparency.
- **Sizes**: 1920–2400 px on the long edge for hero / showcase images;
  1200–1600 px for grid / gallery images.
- **Optimisation**: run `npm run optimize-images` after dropping a fresh
  batch — script lives at `scripts/optimize-images.mjs` (max-width 1280,
  quality 60, mozjpeg + progressive + 4:2:0 chroma).
- **Crop**: hero images are full-bleed — keep the subject centred and
  avoid important content near the bottom (text overlay sits there).
