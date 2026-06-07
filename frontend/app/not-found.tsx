import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80svh] flex items-center justify-center text-center px-6 pt-32">
      <div>
        <p className="subtitle">Page not found</p>
        <h1 className="mt-4 font-display text-7xl text-ink" style={{ fontWeight: 700 }}>404</h1>
        <p className="mt-4 max-w-md text-ink/70">
          We could not find that page. Perhaps you'd like to return home?
        </p>
        <Link href="/" className="btn-primary mt-8">Return home</Link>
      </div>
    </main>
  );
}
