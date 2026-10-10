/**
 * Where Parth works from, and the one place the site's timezone lives. Every
 * time shown on the site is an instant rendered in `timeZone` through Intl —
 * offsets are never hardcoded, so Nepal's +05:45 (or any future change to it)
 * comes from the browser's timezone database.
 *
 * The structured data in src/data/seo.ts reads the city and country code from here.
 */
export const locale = {
  city: "Kathmandu",
  country: "Nepal",
  countryCode: "NP",
  timeZone: "Asia/Kathmandu",
  /** Display label only. Intl has no "NPT" abbreviation (it prints "GMT+5:45"). */
  tzLabel: "NPT",
  lang: "en-NP",
  /** Local currency. Service prices stay in USD for international clients. */
  currency: "NPR",
  priceCurrency: "USD",
} as const;

export type CalendarDate = { year: number; month: number; day: number };

const partsFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: locale.timeZone,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

/** The wall-clock reading in Kathmandu at `instant`. */
function wallClock(instant: Date) {
  const p = Object.fromEntries(partsFormat.formatToParts(instant).map((x) => [x.type, Number(x.value)]));
  return { year: p.year, month: p.month, day: p.day, hour: p.hour, minute: p.minute };
}

/** Minutes Kathmandu is ahead of UTC at `instant` (345 today). */
export function offsetMinutes(instant: Date = new Date()): number {
  const w = wallClock(instant);
  const asUtc = Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute);
  return Math.round((asUtc - Math.floor(instant.getTime() / 60000) * 60000) / 60000);
}

/** "UTC+5:45", read from the timezone database rather than typed in. */
export function utcOffsetLabel(instant: Date = new Date()): string {
  const off = offsetMinutes(instant);
  const abs = Math.abs(off);
  const mins = abs % 60;
  return `UTC${off < 0 ? "−" : "+"}${Math.floor(abs / 60)}${mins ? `:${String(mins).padStart(2, "0")}` : ""}`;
}

/** Today's date on the Kathmandu calendar, whatever the visitor's own timezone. */
export function todayInZone(now: Date = new Date()): CalendarDate {
  const { year, month, day } = wallClock(now);
  return { year, month, day };
}

/** `date` + `days`, as pure calendar arithmetic (no timezone involved). */
export function addDays(date: CalendarDate, days: number): CalendarDate {
  const d = new Date(Date.UTC(date.year, date.month - 1, date.day + days));
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

/** 0 = Sunday … 6 = Saturday, for a calendar date. */
export const weekday = (date: CalendarDate) => new Date(Date.UTC(date.year, date.month - 1, date.day)).getUTCDay();

/**
 * The instant at which Kathmandu's clocks read `time` ("HH:MM") on `date`.
 * Re-checks the offset at the result so it stays right across any offset change.
 */
export function zonedInstant(date: CalendarDate, time: string): Date {
  const [h, m] = time.split(":").map(Number);
  const wall = Date.UTC(date.year, date.month - 1, date.day, h, m);
  let t = wall - offsetMinutes(new Date(wall)) * 60000;
  t = wall - offsetMinutes(new Date(t)) * 60000;
  return new Date(t);
}

/** Format an instant as Kathmandu time. */
export const formatInZone = (instant: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale.lang, { timeZone: locale.timeZone, ...opts }).format(instant);

/** Format an instant in the visitor's own timezone. */
export const formatLocal = (instant: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale.lang, opts).format(instant);

/**
 * True when the visitor's clock reads the same as Kathmandu's at `instant`. Compares
 * offsets, not names: some browsers report the legacy ID "Asia/Katmandu".
 */
export const visitorInZone = (instant: Date = new Date()) => -instant.getTimezoneOffset() === offsetMinutes(instant);
