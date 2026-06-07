import pg from "pg";
import { env, isProd } from "./env.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: isProd ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30_000,
});

pool.on("error", (err) => {
  console.error("❌ Unexpected database error:", err);
});

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  sql: string,
  params: unknown[] = []
): Promise<pg.QueryResult<T>> {
  const start = Date.now();
  const res = await pool.query<T>(sql, params as never);
  if (env.NODE_ENV === "development") {
    const ms = Date.now() - start;
    if (ms > 80) console.log(`[db ${ms}ms] ${sql.slice(0, 120)}`);
  }
  return res;
}

export async function withTransaction<T>(work: (client: pg.PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
