import { useRef, type CSSProperties, type RefObject } from "react";
import { useModal } from "../../hooks/useModal";
import { useCart } from "../../state/useCart";
import { useCurtain } from "../../state/useCurtain";
import styles from "./CartDrawer.module.css";

type Props = {
  returnFocusRef: RefObject<HTMLElement>;
  pageRef: RefObject<HTMLElement>;
};

/** Services "cart": what you'd like to discuss on the free call, with a rough scope. */
export function CartDrawer({ returnFocusRef, pageRef }: Props) {
  const cart = useCart();
  const go = useCurtain();
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useModal({ open: cart.isOpen, onClose: cart.close, panelRef, initialFocusRef: closeRef, returnFocusRef, pageRef });

  const goTo = (to: string, label: string) => {
    cart.close();
    go(to, label);
  };

  const services = cart.lines.length - 1;

  return (
    <div className={styles.layer} data-open={cart.isOpen}>
      <div className={styles.scrim} onClick={cart.close} aria-hidden="true" />
      <aside
        ref={panelRef}
        id="cart"
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className={styles.head}>
          <h2 id="cart-title" className={styles.title}>
            Your cart · {services}
          </h2>
          <button ref={closeRef} type="button" className={styles.close} onClick={cart.close}>
            Close <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className={styles.body}>
          <ul className={styles.lines}>
            {cart.lines.map((l, i) => (
              <li key={l.id ?? "call"} className={styles.line} style={{ "--i": i } as CSSProperties}>
                <span className={styles.name}>{l.name}</span>
                <span className={styles.price}>{l.price}</span>
                <span className={styles.detail}>{l.detail}</span>
                {l.id && (
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => cart.remove(l.id!)}
                    aria-label={`Remove ${l.name}`}
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
          {services === 0 && (
            <p className={styles.empty}>
              Just the call so far. Add services for a scoped quote — or book it as is and we'll figure out scope
              together.
            </p>
          )}
        </div>

        <div className={styles.foot}>
          <div className={styles.total}>
            <span className={styles.totalLabel}>Estimated scope</span>
            <span className={styles.totalValue}>{cart.total}</span>
          </div>
          <p className={styles.note}>Nothing is charged. Fixed quote after the call.</p>
          <button type="button" className={styles.primary} onClick={() => goTo("/book", "Book a call")}>
            Book consultation →
          </button>
          <button type="button" className={styles.secondary} onClick={() => goTo("/services", "Services")}>
            Browse services
          </button>
        </div>
      </aside>
    </div>
  );
}
