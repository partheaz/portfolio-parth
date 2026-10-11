import s from "./CriquetLoop.module.css";

const colours = [
  { name: "Dark Knight", handle: "range-polo-dark-knight" },
  { name: "Sand", handle: "range-polo-sand" },
  { name: "Maroon", handle: "range-polo-maroon" },
  { name: "Slate", handle: "range-polo-slate" },
];

/** Long-sleeve polo; takes its colour from `color`. */
function Polo({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path
        fill="currentColor"
        d="M30 16 L42 10 Q50 16 58 10 L70 16 Q80 20 84 34 L92 80 L82 82 L74 44 L74 92 L26 92 L26 44 L18 82 L8 80 L16 34 Q20 20 30 16 Z"
      />
      <path fill="rgba(255,255,255,0.16)" d="M42 10 L50 24 L58 10 L55 9 L50 16 L45 9 Z" />
      <path stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" d="M50 18 V36" />
      <circle cx="50" cy="24" r="1" fill="rgba(255,255,255,0.4)" />
      <circle cx="50" cy="31" r="1" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

/**
 * Criquet, 8 s: every colour is its own product, yet the swatches switch between them like variants
 * (watch the URL); a Pairs Well With card picks a colour and size and adds to cart in place; then the
 * A/B test resolves in favour of the new product page. Timing lives in the keyframes (% of --loop-t).
 */
export default function CriquetLoop() {
  return (
    <div className={s.scene}>
      <div className={s.page}>
        <div className={s.urlBar}>
          <span className={s.url}>
            criquetshirts.com/products/
            <span className={s.swap}>
              {colours.map((c, i) => (
                <b key={c.handle} className={s[`s${i}`]}>
                  {c.handle}
                </b>
              ))}
            </span>
          </span>
        </div>

        <div className={s.header}>
          <span className={s.logo}>CRIQUET</span>
          <span className={s.nav}>
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className={`${s.badge} ${s.swap}`}>
            <b className={s.count0}>0</b>
            <b className={s.count1}>1</b>
          </span>
        </div>

        <div className={s.pdp}>
          <div className={s.media}>
            <Polo className={s.polo} />
          </div>

          <div className={s.info}>
            <p className={s.title}>Long Sleeve Range Polo</p>
            <p className={s.meta}>
              <span className={s.swap}>
                {colours.map((c, i) => (
                  <b key={c.name} className={s[`s${i}`]}>
                    {c.name}
                  </b>
                ))}
              </span>
              <span>$128</span>
            </p>

            <p className={s.label}>Available colours</p>
            <div className={s.swatches}>
              {["#2f3a35", "#e6dcc6", "#4a1c22", "#5d6670", "#1d2333"].map((c, i) => (
                <span key={c} className={s.swatch} style={{ background: c }} data-tap={i > 0 && i < 4 ? i : undefined} />
              ))}
              <span className={s.ring} />
            </div>

            <div className={s.sizes}>
              {["S", "M", "L", "XL", "XXL"].map((z) => (
                <span key={z}>{z}</span>
              ))}
            </div>
            <span className={s.cta}>Select size</span>

            <p className={s.label}>Pairs well with</p>
            <div className={s.card}>
              <svg className={s.shorts} viewBox="0 0 100 100" aria-hidden="true">
                <path fill="currentColor" d="M18 18 H82 L88 84 H58 L50 46 L42 84 H12 Z" />
              </svg>
              <div className={s.cardBody}>
                <span className={s.cardName}>Range Shorts · $78</span>
                <span className={s.miniSwatches}>
                  <span style={{ background: "#b9a27a" }} />
                  <span style={{ background: "#26304a" }} data-tap="4" />
                  <span style={{ background: "#6b7a5a" }} />
                  <span className={s.miniRing} />
                </span>
                <span className={s.cardRow}>
                  <span className={s.chips}>
                    <span>S</span>
                    <span className={s.chipPick} data-tap="5">
                      M
                    </span>
                    <span>L</span>
                  </span>
                  <span className={`${s.add} ${s.swap}`} data-tap="6">
                    <b className={s.addBefore}>Add</b>
                    <b className={s.addAfter}>Added ✓</b>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The A/B test */}
      <div className={s.ab}>
        <p className={s.abTitle}>A/B test · product page</p>
        <div className={s.variants}>
          <div className={`${s.variant} ${s.variantA}`}>
            <span className={s.variantLabel}>A · Old page</span>
            <span className={s.wireImage} />
            <span className={s.wireLine} />
            <span className={s.wireLine} data-short />
            <span className={s.wireButton} />
          </div>
          <div className={`${s.variant} ${s.variantB}`}>
            <span className={s.winner}>Winner</span>
            <span className={s.variantLabel}>B · New page</span>
            <span className={s.wireImage} />
            <span className={s.wireLine} />
            <span className={s.wireDots}>
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className={s.wireCard} />
            <span className={s.wireButton} />
          </div>
        </div>
      </div>
    </div>
  );
}
