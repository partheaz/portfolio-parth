import type { CSSProperties } from "react";
import b from "./base.module.css";
import s from "./MasiendaLoop.module.css";

const at = (n: number) => ({ "--at": n }) as CSSProperties;

/** Masa harina bag. */
function Bag({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 60 80" aria-hidden="true">
      <path fill="#2b3d8f" d="M8 10 Q8 4 14 4 H46 Q52 4 52 10 L56 74 Q56 78 52 78 H8 Q4 78 4 74 Z" />
      <rect x="8" y="4" width="44" height="5" fill="#23337a" />
      <text x="30" y="34" textAnchor="middle" fill="#f4efe7" fontSize="6.5" fontWeight="700" letterSpacing="0.6">
        MASIENDA
      </text>
      <text x="30" y="50" textAnchor="middle" fill="#7fd3d0" fontSize="6" fontWeight="700">
        MASA
      </text>
      <text x="30" y="58" textAnchor="middle" fill="#7fd3d0" fontSize="6" fontWeight="700">
        HARINA
      </text>
    </svg>
  );
}

/**
 * Masienda, 8 s: the old Shopify 1.0 theme crawls, Horizon wipes in, and each rebuilt feature shows up
 * in turn — sticky add to cart, header search across products and recipes, the Rebuy cart with an
 * upsell — then the conversion lift counts up. Timing lives in the keyframes (% of --loop-t).
 */
export default function MasiendaLoop() {
  return (
    <div className={`${b.scene} ${s.scene}`}>
      <div className={s.page}>
        <div className={s.urlBar}>
          <span className={s.url}>masienda.com</span>
          <span className={`${b.swap} ${s.theme}`}>
            <b className={s.themeOld}>Shopify 1.0 theme</b>
            <b className={s.themeNew}>Horizon</b>
          </span>
        </div>

        <div className={s.body}>
          {/* Before: the legacy theme */}
          <div className={s.old}>
            <span className={s.loadBar} />
            <p className={s.oldLogo}>Masienda</p>
            <p className={s.oldNav}>
              <u>Shop</u> | <u>Recipes</u> | <u>About</u> | <u>Cart (1)</u>
            </p>
            <div className={s.oldHero}>
              <span className={s.spinner} />
              <span className={s.oldLoading}>Loading…</span>
            </div>
            <div className={s.oldGrid}>
              <i />
              <i />
              <i />
            </div>
          </div>

          {/* After: Horizon */}
          <div className={s.new}>
            <div className={s.header}>
              <span className={s.logo}>MASIENDA</span>
              <span className={s.nav}>
                <i />
                <i />
                <i />
              </span>
              <span className={s.searchIcon} data-tap style={at(38)} />
              <span className={`${b.swap} ${s.badge}`}>
                <b className={s.count1}>1</b>
                <b className={s.count2}>2</b>
              </span>
            </div>

            <div className={s.search}>
              <span className={s.query}>
                <span className={s.typed}>tamales</span>
              </span>
              <div className={s.results}>
                <div>
                  <p className={s.resultsHead}>Products</p>
                  <p>Heirloom Masa Harina</p>
                  <p>Tortilla Press</p>
                </div>
                <div>
                  <p className={s.resultsHead}>Recipes</p>
                  <p>Classic Pork Tamales</p>
                  <p>Sweet Corn Tamales</p>
                </div>
              </div>
            </div>

            <div className={s.product}>
              <div className={s.media}>
                <Bag className={s.bag} />
              </div>
              <div className={s.info}>
                <p className={s.kicker}>Heirloom corn</p>
                <p className={s.title}>Masa Harina</p>
                <p className={s.price}>$12.00</p>
                <span className={s.button}>Add to cart</span>
                <p className={s.lines}>
                  <i />
                  <i />
                  <i data-short />
                </p>
              </div>
            </div>

            <div className={s.sticky}>
              <Bag className={s.stickyBag} />
              <span className={s.stickyName}>Masa Harina · $12.00</span>
              <span className={s.button}>Add to cart</span>
            </div>

            <div className={s.cart}>
              <p className={s.cartTitle}>Your cart</p>
              <span className={s.shipTrack}>
                <span className={s.shipFill} />
              </span>
              <p className={`${b.swap} ${s.shipText}`}>
                <span className={s.before}>You are $60.00 away from FREE SHIPPING!</span>
                <span className={s.after}>You are $52.50 away from FREE SHIPPING!</span>
              </p>
              <div className={s.item}>
                <span className={s.stone} />
                <span>
                  <b>Molcajete</b>
                  <br />
                  <small>7-inch, Chico</small>
                </span>
                <b>$65.00</b>
              </div>
              <div className={`${s.item} ${s.itemNew}`}>
                <span className={s.liner} />
                <span>
                  <b>Tortilla Press Liners</b>
                </span>
                <b>$7.50</b>
              </div>
              <p className={s.bestsellers}>Bestsellers</p>
              <div className={s.upsell}>
                <span className={s.liner} />
                <span>
                  Tortilla Press Liners
                  <br />
                  <small>$7.50</small>
                </span>
                <span className={`${b.swap} ${s.add}`} data-tap style={at(64)}>
                  <b className={s.before}>Add</b>
                  <b className={s.after}>Added</b>
                </span>
              </div>
              <p className={s.subtotal}>
                <span>Subtotal</span>
                <span className={b.swap}>
                  <b className={s.before}>$65.00</b>
                  <b className={s.after}>$72.50</b>
                </span>
              </p>
              <span className={s.checkout}>Checkout</span>
            </div>
          </div>

          <span className={s.wipe} />
        </div>
      </div>

      <div className={s.lift}>
        <p className={s.liftLabel}>Conversion rate after the retheme</p>
        <p className={s.liftValue}>
          +<span className={s.counter} />%
        </p>
        <p className={s.liftNote}>approx. · revenue up alongside it</p>
      </div>
    </div>
  );
}
