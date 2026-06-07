import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { pool } from "../config/db.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir  = path.join(here, "migrations");

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name        TEXT PRIMARY KEY,
      executed_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();
  for (const file of files) {
    const exists = await pool.query("SELECT 1 FROM _migrations WHERE name = $1", [file]);
    if (exists.rowCount) {
      console.log(`✓ ${file} (already applied)`);
      continue;
    }
    const sql = await readFile(path.join(dir, file), "utf8");
    console.log(`→ applying ${file}…`);
    await pool.query(sql);
    await pool.query("INSERT INTO _migrations(name) VALUES ($1)", [file]);
    console.log(`✓ ${file} applied`);
  }
  await pool.end();
  console.log("✅ Migrations complete");
}

migrate().catch((e) => {
  console.error("❌ Migration failed:", e);
  process.exit(1);
});
