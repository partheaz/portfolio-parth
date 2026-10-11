import type { CSSProperties } from "react";
import b from "./base.module.css";
import s from "./AeroSprayLoop.module.css";

const at = (n: number) => ({ "--at": n }) as CSSProperties;

const OLD = "Precision spraying for every acre";
const NEW = "Spray smarter. Cover more.";

/** Spray drone, front view, with mist under the nozzles. */
function Drone({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 160 100" aria-hidden="true">
      <defs>
        <linearGradient id="aero-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0b25a" stopOpacity="0.7" />
          <stop offset="1" stopColor="#f0b25a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className={s.mist} fill="url(#aero-mist)" d="M26 48 L10 98 H46 Z M134 48 L114 98 H150 Z" />
      <ellipse className={s.rotor} cx="20" cy="30" rx="19" ry="2.6" fill="rgba(255,255,255,0.35)" />
      <ellipse className={s.rotor} cx="140" cy="30" rx="19" ry="2.6" fill="rgba(255,255,255,0.35)" />
      <path stroke="#3a3a3a" strokeWidth="4" strokeLinecap="round" d="M20 36 H140" />
      <path stroke="#3a3a3a" strokeWidth="3" d="M20 30 V36 M140 30 V36 M26 36 V46 M134 36 V46" />
      <rect x="60" y="26" width="40" height="22" rx="5" fill="#2b2b2b" />
      <rect x="66" y="46" width="28" height="14" rx="3" fill="#444" />
      <path stroke="#3a3a3a" strokeWidth="2.5" d="M64 48 L56 66 M96 48 L104 66 M50 66 H62 M98 66 H110" />
      <circle cx="26" cy="47" r="2.4" fill="#f0b25a" />
      <circle cx="134" cy="47" r="2.4" fill="#f0b25a" />
      <circle cx="68" cy="33" r="1.4" fill="#4ade80" />
      <circle cx="92" cy="33" r="1.4" fill="#ef4444" />
    </svg>
  );
}

/**
 * AeroSpray, 8 s: on the old React app the heading lives in Hero.jsx; on Horizon the team types it in the
 * theme editor and the page updates live. Then the drone line-up opens from the mega menu and goes into
 * the one cart. Timing lives in the keyframes (% of --loop-t).
 */
export default function AeroSprayLoop() {
  return (
    <div className={`${b.scene} ${s.scene}`}>
      {/* Before: React on Replit */}
      <div className={s.code}>
        <p className={s.codeBar}>
          <i />
          <i />
          <i />
          <span>src/components/Hero.jsx</span>
        </p>
        <pre className={s.codeBody}>
          <span className={s.k}>export default function</span> <span className={s.f}>Hero</span>() {"{"}
          {"\n  "}
          <span className={s.k}>return</span> (
          {"\n    "}&lt;<span className={s.t}>section</span> <span className={s.a}>className</span>=
          <span className={s.v}>&quot;hero&quot;</span>&gt;
          {"\n      "}
          <span className={s.hl}>
            &lt;<span className={s.t}>h1</span>&gt;{OLD}&lt;/<span className={s.t}>h1</span>&gt;
          </span>
          {"\n      "}&lt;<span className={s.t}>BuyButton</span> <span className={s.a}>store</span>=
          <span className={s.v}>&quot;second-store&quot;</span> /&gt;
          {"\n    "}&lt;/<span className={s.t}>section</span>&gt;
          {"\n  "});{"\n"}
          {"}"}
        </pre>
        <p className={s.codeNote}>Before · every word lives in code</p>
      </div>

      {/* After: Shopify theme editor on Horizon */}
      <div className={s.editor}>
        <div className={s.sidebar}>
          <p className={s.sideHead}>Home page</p>
          <ul className={s.sections}>
            <li>Header</li>
            <li className={s.active} data-tap style={at(30)}>
              Hero
            </li>
            <li>Services</li>
            <li>Industries</li>
            <li>FAQ</li>
          </ul>
          <p className={s.fieldLabel}>Heading</p>
          <span className={s.input} data-tap style={at(36)}>
            <span className={s.old}>{OLD}</span>
            <span className={s.typed}>{NEW}</span>
          </span>
        </div>

        <div className={s.preview}>
          <div className={s.nav}>
            <span className={s.logo}>AEROSPRAY</span>
            <span className={s.links}>
              <span data-tap style={at(52)}>
                Drones ⌄
              </span>
              <span>Services</span>
              <span>Industries</span>
              <span>Contact</span>
            </span>
            <span className={s.cartLink}>
              Cart (
              <span className={b.swap}>
                <b className={s.before}>0</b>
                <b className={s.after}>1</b>
              </span>
              )
            </span>
          </div>

          <div className={s.hero}>
            <h3 className={s.heading}>
              <span className={s.old}>{OLD}</span>
              <span className={s.typed}>{NEW}</span>
            </h3>
            <p className={s.sub}>DJI Agras spray drones, sales and service.</p>
            <Drone className={s.drone} />
          </div>

          <div className={s.product}>
            <Drone className={s.productDrone} />
            <div className={s.productInfo}>
              <p className={s.productName}>Agras T50</p>
              <p className={s.productType}>Agricultural spray drone</p>
              <span className={`${b.swap} ${s.addButton}`} data-tap style={at(70)}>
                <b className={s.before}>Add to cart</b>
                <b className={s.after}>Added ✓</b>
              </span>
            </div>
          </div>

          <div className={s.mega}>
            <div>
              <p className={s.megaHead}>Agriculture</p>
              <div className={s.megaCards}>
                <span className={s.megaCard} data-tap style={at(62)}>
                  <Drone className={s.megaDrone} />
                  Agras T50
                </span>
                <span className={s.megaCard}>
                  <Drone className={s.megaDrone} />
                  Agras T25
                </span>
              </div>
            </div>
            <p className={s.megaAll}>All 13 drones →</p>
          </div>

          <span className={s.oneCart}>One cart · one checkout</span>
        </div>
      </div>
    </div>
  );
}
