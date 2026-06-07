const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const fetcher = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${base}${path}`, { credentials: "include" });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
};

export async function api<T = unknown>(path: string, init?: RequestInit) {
  const res = await fetch(`${base}${path}`, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
