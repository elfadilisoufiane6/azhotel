export function formatCurrency(amount: number, currency = "MAD", locale = "en-MA") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string, locale = "en-GB") {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function nightsBetween(checkIn: Date | string, checkOut: Date | string) {
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86_400_000));
}
