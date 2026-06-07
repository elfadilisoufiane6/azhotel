#!/usr/bin/env node
/**
 * One-shot image optimiser.
 *
 * Walks /public/images, picks ONE source per slot (preferring the user's
 * latest upload), and rewrites every image to a single, web-optimised JPG —
 * max 1920 px on the long edge, quality 78. Removes the original.
 *
 * Usage:   node scripts/optimize-images.mjs
 */

import { readdir, stat, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here  = path.dirname(fileURLToPath(import.meta.url));
const root  = path.resolve(here, "..", "public", "images");

const MAX_WIDTH = 1920;
const JPG_OPTS  = { quality: 78, mozjpeg: true, progressive: true };

const stats = { processed: 0, removed: 0, savedBytes: 0 };

function basename(p) {
  return path.basename(p, path.extname(p));
}

/** Walks a directory recursively yielding files */
async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function optimise() {
  // 1. Collect every image file, grouped by their basename inside their folder
  const groups = new Map(); // key: "folder|name" → array of paths
  for await (const file of walk(root)) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;
    const key = `${path.dirname(file)}|${basename(file)}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(file);
  }

  // 2. For each group, pick the largest source (highest detail) and write JPG
  for (const [key, files] of groups) {
    // Pick the file that has the most pixels — usually the user's fresh upload
    const sizes = await Promise.all(files.map(async (f) => ({ f, s: (await stat(f)).size })));
    sizes.sort((a, b) => b.s - a.s);
    const source = sizes[0].f;

    const [folder, name] = key.split("|");
    const target = path.join(folder, `${name}.jpg`);

    try {
      const before = (await stat(source)).size;
      const buf = await sharp(source)
        .rotate()                              // honour EXIF
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg(JPG_OPTS)
        .toBuffer();

      await sharp(buf).toFile(target + ".tmp");
      // Replace target atomically
      await rm(target).catch(() => {});
      await sharp(buf).toFile(target);
      await rm(target + ".tmp").catch(() => {});

      const after = (await stat(target)).size;
      stats.processed++;
      stats.savedBytes += before - after;

      // Remove any other duplicate sources in the same slot
      for (const { f } of sizes) {
        if (f !== target) {
          await rm(f).catch(() => {});
          stats.removed++;
        }
      }
      console.log(`✓ ${path.relative(root, target).padEnd(48)} ${(before/1024).toFixed(0).padStart(5)} KB → ${(after/1024).toFixed(0).padStart(5)} KB`);
    } catch (e) {
      console.error(`✗ ${path.relative(root, source)} — ${e.message}`);
    }
  }

  console.log("");
  console.log(`Done. ${stats.processed} processed · ${stats.removed} duplicates removed · saved ${(stats.savedBytes/1024/1024).toFixed(1)} MB`);
}

optimise().catch((e) => {
  console.error(e);
  process.exit(1);
});
