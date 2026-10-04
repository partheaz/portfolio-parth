import { lazy, Suspense, useCallback, useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Drawer } from "./components/Drawer/Drawer";
import { CartDrawer } from "./components/CartDrawer/CartDrawer";
import { Footer } from "./components/Footer/Footer";
import { MobileActionBar } from "./components/MobileActionBar/MobileActionBar";
import { PointerFollower } from "./components/PointerFollower/PointerFollower";
import { useHashScroll } from "./hooks/useHashScroll";
import { DESKTOP, FINE_POINTER, REDUCED_MOTION, useMediaQuery } from "./hooks/useMediaQuery";
import { CartProvider } from "./state/cart";
import { useCart } from "./state/useCart";
import { CurtainProvider } from "./state/curtain";
import Home from "./pages/Home";
import styles from "./App.module.css";

const WorkIndex = lazy(() => import("./pages/WorkIndex/WorkIndex"));
const CaseStudy = lazy(() => import("./pages/CaseStudy/CaseStudy"));
const Services = lazy(() => import("./pages/Services/Services"));
const Book = lazy(() => import("./pages/Book/Book"));
const BookSent = lazy(() => import("./pages/Book/BookSent"));

const lazyPage = (page: JSX.Element) => <Suspense fallback={<div className={styles.fallback} />}>{page}</Suspense>;

export default function App() {
  return (
    <CurtainProvider>
      <CartProvider>
        <Shell />
      </CartProvider>
    </CurtainProvider>
  );
}

function Shell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cart = useCart();
  const menuRef = useRef<HTMLButtonElement>(null);
  const cartRef = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery(DESKTOP);
  const finePointer = useMediaQuery(FINE_POINTER);
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useHashScroll();

  return (
    <>
      <div ref={pageRef}>
        <a href="#main" className={styles.skip}>
          Skip to content
        </a>
        <Header drawerOpen={drawerOpen} onMenu={() => setDrawerOpen(true)} menuRef={menuRef} cartRef={cartRef} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={lazyPage(<WorkIndex />)} />
          <Route path="/work/:slug" element={lazyPage(<CaseStudy />)} />
          <Route path="/services" element={lazyPage(<Services />)} />
          <Route path="/book" element={lazyPage(<Book />)} />
          <Route path="/book/sent" element={lazyPage(<BookSent />)} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        {!isDesktop && <MobileActionBar drawerOpen={drawerOpen || cart.isOpen} />}
      </div>
      <Drawer open={drawerOpen} onClose={closeDrawer} returnFocusRef={menuRef} pageRef={pageRef} />
      <CartDrawer returnFocusRef={cartRef} pageRef={pageRef} />
      {isDesktop && finePointer && !reducedMotion && <PointerFollower />}
    </>
  );
}
