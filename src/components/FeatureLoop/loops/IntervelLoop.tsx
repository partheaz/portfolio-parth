import type { CSSProperties } from "react";
import b from "./base.module.css";
import s from "./IntervelLoop.module.css";

const at = (n: number) => ({ "--at": n }) as CSSProperties;

const flavours = [
  { name: "Cool Mint", ring: "#a9c4e6" },
  { name: "Orange Guava", ring: "#f08a4b" },
  { name: "Lemon Lime", ring: "#9fd067" },
];

/** A pouch tin seen from above, ring in the flavour colour. */
function Tin({ ring, className, style }: { ring: string; className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill={ring} />
      <circle cx="50" cy="50" r="38" fill="#f6f6f4" />
      <text x="50" y="47" textAnchor="middle" fontSize="11" fontWeight="800" fill="#111" letterSpacing="0.5">
        SIDEKICK
      </text>
      <text x="50" y="60" textAnchor="middle" fontSize="5.5" fill="#555" letterSpacing="0.4">
        NICOTINE&apos;S BEST FRIEND
      </text>
    </svg>
  );
}

/** One button that flips to "Join waitlist" when waitlist mode turns on. */
function WaitlistButton({ className, flip }: { className: string; flip: string }) {
  return (
    <span className={`${b.swap} ${className}`}>
      <b className={s[`buy${flip}`]}>Add to cart</b>
      <b className={s[`wait${flip}`]}>Join waitlist</b>
    </span>
  );
}

/**
 * Intervel, 8 s: the buy box (flavour, subscribe-and-save, quantity tiers), then one theme setting turns
 * waitlist mode on and every buy button flips to "Join waitlist", and the Klaviyo signup goes through.
 * Timing lives in the keyframes (% of --loop-t).
 */
export default function IntervelLoop() {
  return (
    <div className={`${b.scene} ${s.scene}`}>
      <div className={s.page}>
        <div className={s.urlBar}>
          <span className={s.url}>intervel.co/products/sidekick-3-pack</span>
        </div>
        <div className={s.header}>
          <span className={s.logo}>INT≡RV≡L</span>
          <span className={s.nav}>Shop ⌄ &nbsp; FAQ</span>
        </div>

        <div className={s.pdp}>
          <div className={s.media}>
            <Tin ring="#f08a4b" className={s.tinBack} />
            <Tin ring="#9fd067" className={s.tinMid} />
            <span className={s.heroTin}>
              {flavours.map((f, i) => (
                <Tin key={f.name} ring={f.ring} className={s[`hero${i}`]} />
              ))}
            </span>
          </div>

          <div className={s.box}>
            <p className={s.title}>Sidekick 3-Pack</p>

            <div className={s.flavours}>
              {flavours.map((f, i) => (
                <span key={f.name} className={s.flavour} data-tap={i === 1 || undefined} style={at(8)}>
                  <Tin ring={f.ring} className={s.flavourTin} />
                  {f.name}
                </span>
              ))}
              <span className={s.flavourRing} />
            </div>

            <div className={s.plans}>
              <span>One-time</span>
              <span data-tap style={at(16)}>
                Subscribe &amp; save
              </span>
              <span className={s.planPill} />
            </div>

            <div className={s.qtyRow}>
              <span className={s.qty}>
                <span>−</span>
                <span className={b.swap}>
                  <b className={s.q1}>1</b>
                  <b className={s.q2}>2</b>
                  <b className={s.q3}>3</b>
                </span>
                <span data-tap style={at(22)}>
                  +
                </span>
              </span>
              <span className={`${b.swap} ${s.tier}`}>
                <b className={s.q1}>Add 2 more for tier pricing</b>
                <b className={s.q2}>Add 1 more for tier pricing</b>
                <b className={`${s.q3} ${s.tierOn}`}>Tier pricing unlocked ✓</b>
              </span>
            </div>

            <WaitlistButton className={s.cta} flip="A" />
          </div>
        </div>

        <div className={s.strip}>
          {["Performance", "Bliss", "Variety"].map((name, i) => (
            <div key={name} className={s.mini}>
              <Tin ring={flavours[i].ring} className={s.miniTin} />
              <span className={s.miniName}>{name}</span>
              <WaitlistButton className={s.miniButton} flip={"BCD"[i]} />
            </div>
          ))}
        </div>
      </div>

      {/* Theme editor: one setting */}
      <div className={s.settings}>
        <p className={s.settingsHead}>Theme settings</p>
        <p className={s.settingsGroup}>Product launch</p>
        <div className={s.setting}>
          <span>
            Waitlist mode
            <small>Every add to cart becomes “Join waitlist”</small>
          </span>
          <span className={s.toggle} data-tap style={at(47)}>
            <span className={s.knob} />
          </span>
        </div>
        <div className={s.setting}>
          <span>
            Klaviyo form
            <small>Fallback: theme form if blocked</small>
          </span>
          <span className={s.field}>W7xQ2a</span>
        </div>
      </div>

      {/* Klaviyo signup */}
      <div className={s.modalLayer}>
        <div className={s.modal}>
          <p className={s.modalTitle}>Be first to try it</p>
          <p className={s.modalText}>Join the waitlist and we’ll email you the moment it launches.</p>
          <span className={s.email}>
            <span className={s.typed}>alex@email.com</span>
          </span>
          <span className={`${b.swap} ${s.join}`} data-tap style={at(76)}>
            <b className={s.joinBefore}>Join the waitlist</b>
            <b className={s.joinAfter}>You’re on the list ✓</b>
          </span>
        </div>
      </div>
    </div>
  );
}
