import { useCallback, useMemo, useState, type FormEvent } from "react";
import { currency, serviceItem, track } from "../../analytics";
import { locale } from "../../data/locale";
import { formatPrice } from "../../data/services";
import { site } from "../../data/site";
import { CurtainLink } from "../../components/CurtainLink/CurtainLink";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useCart } from "../../state/useCart";
import { useCurtain } from "../../state/useCurtain";
import { createBooking, dayInstant, formatInZone, formatSlotLocal, nextWeekdays, TIMES, zonedInstant } from "./booking";
import { CalendlyEmbed } from "./CalendlyEmbed";
import styles from "./Book.module.css";

export default function Book() {
  useDocumentMeta(`Book a consultation · ${site.name}`, "Book a free 30-minute call about your Shopify store.");
  const cart = useCart();
  const go = useCurtain();
  const days = useMemo(() => nextWeekdays(), []);
  const [form, setForm] = useState({ name: "", email: "", store: "", notes: "" });
  const [day, setDay] = useState(-1);
  const [time, setTime] = useState(-1);

  const localSlot = day >= 0 && time >= 0 ? formatSlotLocal(zonedInstant(days[day], TIMES[time])) : "";

  /** GA4 "generate_lead": a booking was made, with the services that were in the cart. */
  const trackLead = useCallback(
    (method: "calendly" | "email") => {
      const items = cart.items.flatMap((c) => serviceItem(c.id, c.tier) ?? []);
      track("generate_lead", { method, currency, value: items.reduce((a, i) => a + i.price, 0), items });
    },
    [cart.items],
  );
  const onScheduled = useCallback(() => {
    trackLead("calendly");
    cart.clear();
  }, [trackLead, cart]);

  const canBook = !!(form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && day >= 0 && time >= 0);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!canBook) return;
    const booking = createBooking({ ...form, day: days[day], time: TIMES[time], total: cart.total, lines: cart.lines });
    trackLead("email");
    window.location.href = booking.mailto;
    cart.clear();
    go("/book/sent", "Almost there", { state: booking });
  };

  return (
    <main id="main" tabIndex={-1} className={styles.page}>
      <CurtainLink to="/services" curtainLabel="Services" className={styles.back}>
        ← Services
      </CurtainLink>
      <h1 className={styles.title}>
        Book your
        <br />
        consultation
      </h1>

      <div className={styles.layout}>
        {site.calendly ? (
          <CalendlyEmbed lines={cart.lines} onScheduled={onScheduled} />
        ) : (
          <form className={styles.form} onSubmit={submit} noValidate>
            <fieldset className={styles.group}>
              <legend className={styles.legend}>
                <span className={styles.legendNum}>01</span>
                <span>Your details</span>
              </legend>
              <div className={styles.fields}>
                <label className={styles.field}>
                  <span className="visually-hidden">Your name</span>
                  <input
                    className={styles.input}
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span className="visually-hidden">Work email</span>
                  <input
                    className={styles.input}
                    value={form.email}
                    onChange={set("email")}
                    type="email"
                    placeholder="Work email"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span className="visually-hidden">Store URL (optional)</span>
                  <input
                    className={styles.input}
                    value={form.store}
                    onChange={set("store")}
                    placeholder="Store URL (optional)"
                    inputMode="url"
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className={styles.group}>
              <legend className={styles.legend}>
                <span className={styles.legendNum}>02</span>
                <span>Pick a slot</span>
                <span className={styles.legendMeta}>30 min · {locale.tzLabel}</span>
              </legend>
              <div className={styles.days} role="group" aria-label="Day">
                {days.map((d, j) => {
                  const at = dayInstant(d);
                  return (
                    <button
                      key={`${d.year}-${d.month}-${d.day}`}
                      type="button"
                      className={styles.day}
                      aria-pressed={j === day}
                      onClick={() => setDay(j)}
                      aria-label={formatInZone(at, { weekday: "long", day: "numeric", month: "long" })}
                    >
                      <span className={styles.dayMeta}>
                        {formatInZone(at, { weekday: "short" })} · {formatInZone(at, { month: "short" })}
                      </span>
                      <span className={styles.dayDate}>{String(d.day).padStart(2, "0")}</span>
                    </button>
                  );
                })}
              </div>
              <div className={styles.times} role="group" aria-label="Time">
                {TIMES.map((t, j) => (
                  <button key={t} type="button" className={styles.time} aria-pressed={j === time} onClick={() => setTime(j)}>
                    {t} {locale.tzLabel}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.group}>
              <legend className={styles.legend}>
                <span className={styles.legendNum}>03</span>
                <span>What's the problem?</span>
              </legend>
              <label>
                <span className="visually-hidden">What's the problem?</span>
                <textarea
                  className={styles.textarea}
                  value={form.notes}
                  onChange={set("notes")}
                  placeholder="A few lines on the store, what's broken or missing, and any deadline."
                  rows={5}
                />
              </label>
            </fieldset>

            <button type="submit" className={styles.confirm} aria-disabled={!canBook}>
              {canBook ? "Confirm booking →" : "Add your details and a slot"}
            </button>
            <p className={styles.fine}>
              Confirming opens your email app with the request addressed to me — send it and I'll reply with a calendar
              invite.
              {localSlot && <> Your time: {localSlot}.</>}
            </p>
          </form>
        )}

        <aside className={styles.summary} aria-labelledby="summary-title">
          <h2 id="summary-title" className={styles.summaryHead}>
            Order summary
          </h2>
          <ul className={styles.summaryLines}>
            {cart.lines.map((l) => (
              <li key={l.id ?? "call"} className={styles.summaryLine}>
                <span className={styles.summaryName}>{l.name}</span>
                <span className={styles.summaryPrice}>{l.price}</span>
                <span className={styles.summaryDetail}>{l.detail}</span>
              </li>
            ))}
          </ul>
          <div className={styles.summaryTotal}>
            <span>Estimated scope</span>
            <span className={styles.summaryTotalValue}>{cart.total}</span>
          </div>
          <p className={styles.summaryNote}>Due today: {formatPrice(0)} · Fixed quote follows the call</p>
        </aside>
      </div>
    </main>
  );
}
