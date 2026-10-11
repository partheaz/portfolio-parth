import s from "./SlideLoop.module.css";

/**
 * Slide AI, 8 s: the panel slides out, a shopper asks the assistant what goes with their tee,
 * the recommended socks are added from the chat, and the cart unlocks free shipping.
 * Timing lives in the keyframes (percentages of --loop-t).
 */
export default function SlideLoop() {
  return (
    <div className={s.scene}>
      {/* The store behind the panel */}
      <div className={s.store}>
        <div className={s.storeBar}>
          <span className={s.storeLogo}>Field&nbsp;Co.</span>
          <span className={s.storeNav}>
            <i />
            <i />
            <i />
          </span>
          <span className={s.storeCart}>
            Cart
            <span className={`${s.storeBadge} ${s.swap}`}>
              <b className={s.countBefore}>1</b>
              <b className={s.countAfter}>2</b>
            </span>
          </span>
        </div>
        <div className={s.grid}>
          {[
            ["Everyday Tee", "$38"],
            ["Field Cap", "$32"],
            ["Canvas Tote", "$24"],
          ].map(([name, price], i) => (
            <div key={name} className={s.card}>
              <div className={s.cardImage} data-tone={i} />
              <span className={s.cardName}>{name}</span>
              <span className={s.cardPrice}>{price}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={s.scrim} />

      {/* The Slide panel */}
      <div className={s.panel}>
        <div className={s.brand}>
          <span className={s.brandMark} />
          Slide
        </div>
        <div className={s.tabs}>
          <span>Ask AI</span>
          <span>
            Cart (
            <span className={s.swap}>
              <b className={s.countBefore}>1</b>
              <b className={s.countAfter}>2</b>
            </span>
            )
          </span>
          <span className={s.tabLine} />
        </div>

        <div className={s.views}>
          <div className={s.chat}>
            <p className={s.ask}>What goes with the Everyday Tee?</p>
            <div className={s.swap}>
              <p className={s.typing}>
                <i />
                <i />
                <i />
              </p>
              <p className={s.answer}>Crew Socks pair well — breathable, and they unlock free shipping.</p>
            </div>
            <div className={s.product}>
              <div className={s.thumb} data-tone="socks" />
              <div className={s.productText}>
                <span className={s.name}>Crew Socks</span>
                <span className={s.price}>$14</span>
              </div>
              <span className={`${s.add} ${s.swap}`}>
                <span className={s.addLabel}>Add to cart</span>
                <span className={s.addedLabel}>Added ✓</span>
              </span>
            </div>
          </div>

          <div className={s.cart}>
            <div className={s.ship}>
              <span className={s.swap}>
                <span className={s.shipBefore}>$12 away from free shipping</span>
                <span className={s.shipAfter}>Free shipping unlocked</span>
              </span>
              <span className={s.shipTrack}>
                <span className={s.shipFill} />
              </span>
            </div>
            <div className={s.row}>
              <div className={s.thumb} data-tone="0" />
              <span className={s.name}>Everyday Tee</span>
              <span className={s.price}>$38</span>
            </div>
            <div className={`${s.row} ${s.rowNew}`}>
              <div className={s.thumb} data-tone="socks" />
              <span className={s.name}>Crew Socks</span>
              <span className={s.price}>$14</span>
            </div>
            <div className={s.total}>
              <span>Subtotal</span>
              <span className={s.swap}>
                <b className={s.subBefore}>$38</b>
                <b className={s.subAfter}>$52</b>
              </span>
            </div>
            <span className={s.checkout}>Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
