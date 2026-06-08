# Gallery — Fitness category

Numbered files used by the masonry gallery filter "Fitness".

Drop `01.jpg`, `02.jpg`, … `05.jpg` (≤ 100 KB each after optimisation).

After adding, register them in:

```
lib/content/gallery.ts → build("fitness", [...])
```

And add `"fitness"` to the `GalleryCategory` union + the `CATEGORIES` list
on the gallery page.
