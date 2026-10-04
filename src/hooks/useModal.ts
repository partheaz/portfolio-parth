import { useEffect, useRef, type RefObject } from "react";
import { useLockBody } from "./useLockBody";

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])';

type Options = {
  open: boolean;
  onClose: () => void;
  /** The dialog panel — Tab is trapped inside it. */
  panelRef: RefObject<HTMLElement>;
  /** Receives focus when the dialog opens. */
  initialFocusRef: RefObject<HTMLElement>;
  /** Receives focus back when the dialog closes. */
  returnFocusRef: RefObject<HTMLElement>;
  /** Everything behind the dialog — made inert while it's open. */
  pageRef: RefObject<HTMLElement>;
};

/** Modal side-sheet behaviour: scroll lock, inert background, focus trap, Esc, focus restore. */
export function useModal({ open, onClose, panelRef, initialFocusRef, returnFocusRef, pageRef }: Options) {
  const wasOpen = useRef(false);

  useLockBody(open);

  useEffect(() => {
    const page = pageRef.current;
    if (open) {
      if (page) page.inert = true;
      wasOpen.current = true;
      initialFocusRef.current?.focus();
    } else if (wasOpen.current) {
      if (page) page.inert = false;
      wasOpen.current = false;
      // Only reclaim focus if it was inside the dialog (a nav link may have moved it on purpose).
      const active = document.activeElement;
      if (!active || active === document.body || panelRef.current?.contains(active)) {
        returnFocusRef.current?.focus({ preventScroll: true });
      }
    }
  }, [open, pageRef, panelRef, initialFocusRef, returnFocusRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, panelRef]);
}
