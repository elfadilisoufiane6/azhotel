# 📸 Image folders — guide

> **The structure is simple: each section / page has its own folder. Drop your images in the right folder and the website picks them up automatically.**

```
public/images/
├── home/                        ← Home-page sections
│   ├── hero/         main.jpg          (1 image — full-screen hero)
│   ├── marquee/      01.jpg → 10.jpg   (10 images — scrolling band)
│   ├── stay/         main.jpg          (1 image — "Sleep well" section)
│   ├── dining/       main.jpg          (1 image — "A taste of Morocco")
│   ├── address/      main.jpg          (1 image — "Rabat à portée de pas")
│   └── booking/      main.jpg          (1 image — booking form background)
│
├── pages/                       ← Individual page heroes
│   ├── rooms/            hero.jpg      (1 image — /rooms hero)
│   ├── gallery/          hero.jpg      (1 image — /gallery hero)
│   ├── booking/          hero.jpg      (1 image — /booking hero)
│   └── booking-contact/  main.jpg      (1 image — /booking contact band)
│
├── rooms/                       ← Room photographs
│   ├── twin/         01..04.jpg        (4 images for the Twin Room)
│   ├── double/       01..04.jpg        (4 images for the Double Room)
│   ├── single/       01..02.jpg        (2 images for the Classic Single)
│   └── suite/        01..04.jpg        (4 images for the Suite)
│
└── gallery/                     ← Filtered photo-gallery on /gallery
    ├── rooms/        01..13.jpg
    ├── restaurant/   01..13.jpg
    ├── lobby/        01..06.jpg
    ├── exterior/     01..02.jpg
    └── city/         01..02.jpg
```

## How to replace an image
1. Open the matching folder (e.g. `home/hero/`).
2. Replace the file (keep the same filename and extension) — that's it.
3. If you want to **add** images to the gallery, just drop them in the right
   `gallery/<category>/` folder using the next number (`14.jpg`, `15.jpg`…)
   and add a one-line entry to `lib/content/gallery.ts`.

## Image guidelines
- **Format**: JPG for photographs, PNG when you really need transparency.
- **Sizes**: aim for 1920–2400 px on the long edge for hero / showcase images;
  1200–1600 px for grid / gallery images.
- **Crop**: hero images are full-bleed — keep the subject centred and avoid
  important content near the bottom (text overlay sits there).
