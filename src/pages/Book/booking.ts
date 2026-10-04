import { site } from "../../data/site";

export const TIMES = ["10:00", "13:00", "16:00", "19:00"];

/** The next six weekdays, starting tomorrow. */
export function nextWeekdays(count = 6): Date[] {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    const w = d.getDay();
    if (w !== 0 && w !== 6) out.push(new Date(d));
  }
  return out;
}

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
  day: Date;
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
  const when = `${d.day.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })} · ${d.time} IST`;
  const details = [`Name: ${d.name.trim()}`, `Email: ${d.email.trim()}`, d.store.trim() && `Store: ${d.store.trim()}`];
  const body = [
    "Hi Parth,",
    "I'd like to book a 30-minute consultation.",
    `Preferred slot: ${when}`,
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
