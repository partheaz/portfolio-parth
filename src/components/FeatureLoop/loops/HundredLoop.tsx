import type { CSSProperties } from "react";
import b from "./base.module.css";
import s from "./HundredLoop.module.css";

const at = (n: number) => ({ "--at": n }) as CSSProperties;

/** Shield sunglasses; the lens takes its colour from `color`. */
function Shades({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 50" aria-hidden="true">
      <path fill="currentColor" d="M10 18 Q60 6 110 18 L106 34 Q96 44 74 40 Q66 38 60 30 Q54 38 46 40 Q24 44 14 34 Z" />
      <path fill="rgba(255,255,255,0.28)" d="M16 20 Q40 13 58 13 L50 22 Q32 22 18 28 Z" />
      <path fill="#111" d="M8 15 Q60 1 112 15 L112 19 Q60 7 8 19 Z" />
      <path fill="#111" d="M58 26 L62 26 L61 31 L59 31 Z" />
    </svg>
  );
}

type Card = { name: string; price: string; swatches: string[]; lens: string };

const cards: Card[] = [
  { name: "S3", price: "$159.95", swatches: ["#e0412f", "#7b5cd6", "#2f7de0"], lens: "lensA" },
  { name: "S2", price: "$149.95", swatches: ["#26282b", "#e6a82f"], lens: "lensB" },
  { name: "Speedcraft SL", price: "$95.40", swatches: ["#e79ab0"], lens: "lensC" },
];

/**
 * 100 Percent, 8 s: colourways switch in place on the collection grid (the URL never changes — no reload),
 * quick add from the grid, then the custom cart offers the next item. Timing lives in the keyframes.
 */
export default function HundredLoop() {
  return (
    <div className={`${b.scene} ${s.scene}`}>
      <div className={s.page}>
        <div className={s.urlBar}>
          <span className={s.url}>100percent.com/collections/sunglasses</span>
          <span className={s.noReload}>No page reload</span>
        </div>
        <div className={s.header}>
          <span className={s.logo}>100%</span>
          <span className={s.nav}>
            <i />
            <i />
            <i />
          </span>
          <span className={`${b.swap} ${s.badge}`}>
            <b className={s.count0}>0</b>
            <b className={s.count1}>1</b>
          </span>
        </div>

        <div className={s.collection}>
          <p className={s.heading}>Sunglasses</p>
          <span className={s.filters}>
            <span>Lens: Mirror</span>
            <span>Sort: Featured</span>
          </span>
        </div>

        <div className={s.grid}>
          {cards.map((c, i) => (
            <div key={c.name} className={s.card}>
              <div className={s.image}>
                <Shades className={s[c.lens]} />
              </div>
              <span className={s.swatches}>
                {c.swatches.map((sw, j) => (
                  <span
                    key={sw}
                    style={{ background: sw, ...at([0, 8, 16][j] + (i === 1 ? 14 : 0)) }}
                    data-tap={(i === 0 && j > 0) || (i === 1 && j === 1) || undefined}
                  />
                ))}
                {c.swatches.length > 1 && <span className={s[`ring${i}`]} />}
              </span>
              <span className={s.name}>{c.name}</span>
              <span className={s.price}>{c.price}</span>
              {i === 0 && (
                <span className={`${b.swap} ${s.quick}`} data-tap style={at(32)}>
                  <b className={s.quickBefore}>Quick add</b>
                  <b className={s.quickAfter}>Added ✓</b>
                </span>
              )}
            </div>
          ))}
        </div>

        <div className={s.cart}>
          <p className={s.cartHead}>
            Your cart
            <span>×</span>
          </p>
          <div className={s.row}>
            <span className={s.thumb}>
              <Shades className={s.lensFinal} />
            </span>
            <span>
              <b>S3</b>
              <small>Blue mirror lens</small>
            </span>
            <b>$159.95</b>
          </div>
          <div className={`${s.row} ${s.rowNew}`}>
            <span className={s.thumb}>
              <Shades className={s.lensSpare} />
            </span>
            <span>
              <b>S3 Replacement Lens</b>
              <small>Clear</small>
            </span>
            <b>$69.95</b>
          </div>
          <p className={s.recsHead}>Complete the look</p>
          <div className={s.rec}>
            <span className={s.thumb}>
              <Shades className={s.lensSpare} />
            </span>
            <span>
              <b>S3 Replacement Lens</b>
              <small>$69.95</small>
            </span>
            <span className={`${b.swap} ${s.add}`} data-tap style={at(56)}>
              <b className={s.addBefore}>Add</b>
              <b className={s.addAfter}>Added</b>
            </span>
          </div>
          <p className={s.subtotal}>
            <span>Subtotal</span>
            <span className={b.swap}>
              <b className={s.addBefore}>$159.95</b>
              <b className={s.addAfter}>$229.90</b>
            </span>
          </p>
          <span className={s.checkout}>Checkout</span>
        </div>
      </div>
    </div>
  );
}
