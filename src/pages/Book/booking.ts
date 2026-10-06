import { site } from "../../data/site";
import {
  addDays,
  formatInZone,
  formatLocal,
  locale,
  todayInZone,
  visitorInZone,
  weekday,
  zonedInstant,
  type CalendarDate,
} from "../../data/locale";

export { formatInZone, zonedInstant };

/** Start times on Kathmandu's clock. */
export const TIMES = ["10:00", "13:00", "16:00", "19:00"];

/** The next six weekdays on the Kathmandu calendar, starting tomorrow there. */
export function nextWeekdays(count = 6, now = new Date()): CalendarDate[] {
  const out: CalendarDate[] = [];
  let d = todayInZone(now);
  while (out.length < count) {
    d = addDays(d, 1);
    const w = weekday(d);
    if (w !== 0 && w !== 6) out.push(d);
  }
  return out;
}

/** Noon in Kathmandu on `date` — a safe instant for formatting the date itself. */
export const dayInstant = (date: CalendarDate) => zonedInstant(date, "12:00");

const hm: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hourCycle: "h23" };

/** "Thursday, October 8 · 10:00 NPT" */
export const formatSlot = (slot: Date) =>
  `${formatInZone(slot, { weekday: "long", month: "long", day: "numeric" })} · ${formatInZone(slot, hm)} ${locale.tzLabel}`;

/** The same slot on the visitor's clock, or "" when they're already on Kathmandu time. */
export const formatSlotLocal = (slot: Date) =>
  visitorInZone(slot)
    ? ""
    : formatLocal(slot, { weekday: "short", month: "short", day: "numeric", ...hm, timeZoneName: "short" });

export type Booking = {
  ref: string;
  name: string;
  email: string;
  when: string;
  total: string;
  lines: { name: string; price: string }[];
  mailto: string;
};

type Draft = {
  name: string;
  email: string;
  store: string;
  notes: string;
  day: CalendarDate;
  time: string;
  total: string;
  lines: { name: string; detail: string; price: string }[];
};

/**
 * There's no booking backend: confirming composes an email request to Parth with
 * everything filled in. The confirmation page says so plainly.
 */
export function createBooking(d: Draft): Booking {
  const ref = "PP-" + Math.floor(1000 + Math.random() * 9000);
  const slot = zonedInstant(d.day, d.time);
  const when = formatSlot(slot);
  const local = formatSlotLocal(slot);
  const details = [`Name: ${d.name.trim()}`, `Email: ${d.email.trim()}`, d.store.trim() && `Store: ${d.store.trim()}`];
  const body = [
    "Hi Parth,",
    "I'd like to book a 30-minute consultation.",
    [`Preferred slot: ${when}`, local && `(my time: ${local})`, `UTC: ${slot.toISOString()}`].filter(Boolean).join("\n"),
    details.filter(Boolean).join("\n"),
    ["Services I'm interested in:", ...d.lines.map((l) => `- ${l.name} (${l.detail}) — ${l.price}`), `Estimated scope: ${d.total}`].join("\n"),
    `The problem:\n${d.notes.trim() || "(I'll explain on the call.)"}`,
    `Ref ${ref}`,
  ].join("\n\n");

  const subject = `Consultation request — ${d.name.trim()} (${ref})`;
  return {
    ref,
    name: d.name.trim().split(" ")[0],
    email: d.email.trim(),
    when,
    total: d.total,
    lines: d.lines.map((l) => ({ name: l.name, price: l.price })),
    mailto: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
