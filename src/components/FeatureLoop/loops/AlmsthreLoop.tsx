import type { CSSProperties } from "react";
import b from "./base.module.css";
import s from "./AlmsthreLoop.module.css";

const at = (n: number) => ({ "--at": n }) as CSSProperties;

/** Frame bag, side view; body takes its colour from `color`. */
function Bag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 80" aria-hidden="true">
      <path fill="currentColor" d="M12 12 Q12 8 16 8 H104 Q109 8 106 13 L72 70 Q70 74 66 74 H44 Q40 74 38 70 L10 16 Q9 12 12 12 Z" />
      <path stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeDasharray="3 2" fill="none" d="M20 16 H98 L67 66 H44 Z" />
      <rect x="14" y="4" width="8" height="8" rx="1.5" fill="#2a2a2a" />
      <rect x="96" y="4" width="8" height="8" rx="1.5" fill="#2a2a2a" />
      <path stroke="#a8642a" strokeWidth="2" d="M48 30 H72" />
    </svg>
  );
}

const tabs = ["Bags", "Gloves", "Accessories", "Bundles", "Field Notes", "Sale"];
const bagTypes = ["All Bags", "Handlebar Bags", "Saddle Bags", "Frame Bags", "Top Tube Bags", "Stem Bags", "Ride Wallet", "Hip Packs"];

/** Field Notes in the drawer: category filters, and the Events posts they load (real titles from the journal). */
const categories = ["All Articles", "Ambassadors", "Events", "Partnerships", "Products"];
const eventPosts = [
  { date: "June 30, 2026", title: "Belgian Waffle Ride Montana 2026", tone: 0 },
  { date: "April 8, 2026", title: "Sagebrush Safari 2026", tone: 1 },
];
const homeTiles = ["Bar Bags", "Saddle Bags", "Frame Bags", "Top Tube Bags"];

/** The mountain mark from Almsthre's logo. */
function Mark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 60 34" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" d="M2 32 L20 6 L30 20 L38 10 L58 32 Z M14 32 L24 18" />
    </svg>
  );
}

/**
 * Almsthre, 10 s: from the homepage, "Bags" opens the desktop drawer (tabs across the top, as on the live
 * store). Its Field Notes tab swaps the panel to the journal's categories; picking Events widens the drawer
 * to show those posts. Back on the Bags tab, Frame Bags opens the collection, where a swatch changes colour in
 * place and quick add puts it in the cart; on the product page the sticky add-to-cart bar follows the
 * selected colour. Timing lives in the keyframes (% of --loop-t).
 */
export default function AlmsthreLoop() {
  return (
    <div className={`${b.scene} ${s.scene}`}>
      <div className={s.page}>
        <div className={s.urlBar}>
          <span className={s.url}>
            almsthre.com/
            <span className={b.swap}>
              <b className={s.u0}></b>
              <b className={s.u1}>collections/frame-bags</b>
              <b className={s.u2}>products/frame-bag-m</b>
            </span>
          </span>
        </div>
        <p className={s.announce}>Premium cycling gear</p>
        <div className={s.header}>
          <span className={s.logo}>
            <Mark className={s.mark} />
            ALMSTHRE
          </span>
          <span className={s.nav}>
            {tabs.map((t, i) => (
              <span
                key={t}
                className={i === 0 ? s.navBags : i === 4 ? s.navNotes : undefined}
                data-tap={i === 0 || undefined}
                style={at(3)}
              >
                {t}
              </span>
            ))}
          </span>
          <span className={s.icons}>
            <i className={s.searchIcon} />
            <span className={s.cart}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" d="M4 8h16l-1.5 12h-13L4 8Z M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span className={`${b.swap} ${s.count}`}>
                <b className={s.c0}>0</b>
                <b className={s.c1}>1</b>
                <b className={s.c2}>2</b>
              </span>
            </span>
          </span>
        </div>

        <div className={s.body}>
          {/* Homepage behind the drawer */}
          <div className={s.home}>
            <p className={s.hero}>Your personal domestique</p>
            <div className={s.homeTiles}>
              {homeTiles.map((t, i) => (
                <span key={t} data-tone={i}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Collection */}
          <div className={s.collection}>
            <p className={s.heading}>Frame Bags</p>
            <span className={s.dash} />
            <div className={s.grid}>
              <div className={s.card}>
                <div className={s.tile}>
                  <Bag className={s.bagA} />
                </div>
                <span className={s.name}>Frame Bag M</span>
                <span className={s.swatches}>
                  <span style={{ background: "#5b6340" }} />
                  <span style={{ background: "#1e1e1e", ...at(47) }} data-tap />
                  <span style={{ background: "#c8b48e" }} />
                  <span className={s.ringA} />
                </span>
                <span className={`${b.swap} ${s.quick}`} data-tap style={at(54)}>
                  <b className={s.quickBefore}>Quick add</b>
                  <b className={s.quickAfter}>Added ✓</b>
                </span>
              </div>
              <div className={s.card}>
                <div className={s.tile}>
                  <Bag className={s.bagSand} />
                </div>
                <span className={s.name}>Frame Bag S</span>
                <span className={s.swatches}>
                  <span style={{ background: "#c8b48e" }} />
                  <span style={{ background: "#5b6340" }} />
                </span>
                <span className={s.quickIdle}>Quick add</span>
              </div>
              <div className={s.card}>
                <div className={s.tile}>
                  <Bag className={s.bagBlack} />
                </div>
                <span className={s.name}>Half Frame Bag</span>
                <span className={s.swatches}>
                  <span style={{ background: "#1e1e1e" }} />
                  <span style={{ background: "#5b6340" }} />
                </span>
                <span className={s.quickIdle}>Quick add</span>
              </div>
            </div>
          </div>

          {/* Product page */}
          <div className={s.product}>
            <div className={s.media}>
              <Bag className={s.bagPdp} />
            </div>
            <div className={s.info}>
              <p className={s.title}>Frame Bag M</p>
              <p className={s.colour}>
                Colour:{" "}
                <span className={b.swap}>
                  <b className={s.olive}>Olive</b>
                  <b className={s.sand}>Sand</b>
                </span>
              </p>
              <span className={s.swatches}>
                <span style={{ background: "#5b6340" }} />
                <span style={{ background: "#1e1e1e" }} />
                <span style={{ background: "#c8b48e", ...at(72) }} data-tap />
                <span className={s.ringPdp} />
              </span>
              <p className={s.lines}>
                <i />
                <i />
                <i data-short />
              </p>
            </div>
            <div className={s.sticky}>
              <span className={s.stickyThumb}>
                <Bag className={s.bagPdp} />
              </span>
              <span className={s.stickyName}>
                Frame Bag M ·{" "}
                <span className={b.swap}>
                  <b className={s.olive}>Olive</b>
                  <b className={s.sand}>Sand</b>
                </span>
              </span>
              <span className={`${b.swap} ${s.stickyAdd}`} data-tap style={at(84)}>
                <b className={s.stickyBefore}>Add to cart</b>
                <b className={s.stickyAfter}>Added ✓</b>
              </span>
            </div>
          </div>
        </div>

        {/* Desktop drawer menu, built from blocks in the theme editor */}
        <div className={s.scrim} />
        <div className={s.drawer}>
          <div className={s.drawerLeft}>
            <p className={s.drawerTabs}>
              {tabs.map((t, i) => (
                <span
                  key={t}
                  className={i === 0 ? s.tabBags : i === 4 ? s.tabNotes : undefined}
                  data-tap={i === 0 || i === 4 || undefined}
                  style={at(i === 4 ? 11 : 29)}
                >
                  {t}
                </span>
              ))}
            </p>
            <div className={s.panels}>
              <div className={`${s.pills} ${s.bagsPanel}`}>
                {bagTypes.map((t) => (
                  <span key={t} data-tap={t === "Frame Bags" || undefined} style={at(34)}>
                    {t}
                  </span>
                ))}
              </div>
              <div className={`${s.pills} ${s.notesPanel}`}>
                {categories.map((c, i) => (
                  <span
                    key={c}
                    className={i === 0 ? s.catAll : i === 2 ? s.catEvents : undefined}
                    data-tap={i === 2 || undefined}
                    style={at(18)}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <span className={s.drawerSearch}>
              <span>Search</span>
            </span>
          </div>

          {/* Field Notes posts for the picked category */}
          <div className={s.posts}>
            <u className={s.viewAll}>View All Blogs</u>
            <div className={s.postGrid}>
              {eventPosts.map((p) => (
                <span key={p.title} className={s.post}>
                  <span className={s.postImage} data-tone={p.tone} />
                  <small>{p.date}</small>
                  <b>{p.title}</b>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
