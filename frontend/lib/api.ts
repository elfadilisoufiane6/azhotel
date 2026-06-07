import { site } from "./site";

type FetchOpts = RequestInit & { revalidate?: number | false };

export async function api<T = unknown>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { revalidate, ...init } = opts;
  const url = `${site.api}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    credentials: "include",
    next: revalidate === false ? { revalidate: 0 } : { revalidate: revalidate ?? 60 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText} — ${body || path}`);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const apiClient = {
  get:    <T>(p: string, o?: FetchOpts) => api<T>(p, { ...o, method: "GET" }),
  post:   <T>(p: string, body?: unknown, o?: FetchOpts) => api<T>(p, { ...o, method: "POST", body: JSON.stringify(body) }),
  put:    <T>(p: string, body?: unknown, o?: FetchOpts) => api<T>(p, { ...o, method: "PUT", body: JSON.stringify(body) }),
  patch:  <T>(p: string, body?: unknown, o?: FetchOpts) => api<T>(p, { ...o, method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(p: string, o?: FetchOpts) => api<T>(p, { ...o, method: "DELETE" }),
};
