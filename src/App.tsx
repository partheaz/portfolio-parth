import { lazy, Suspense, useCallback, useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Drawer } from "./components/Drawer/Drawer";
import { Footer } from "./components/Footer/Footer";
import { MobileActionBar } from "./components/MobileActionBar/MobileActionBar";
import { useHashScroll } from "./hooks/useHashScroll";
import { DESKTOP, useMediaQuery } from "./hooks/useMediaQuery";
import Home from "./pages/Home";
import styles from "./App.module.css";

const CaseStudy = lazy(() => import("./pages/CaseStudy/CaseStudy"));

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery(DESKTOP);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useHashScroll();

  return (
    <>
      <div ref={pageRef}>
        <a href="#main" className={styles.skip}>
          Skip to content
        </a>
        <Header drawerOpen={drawerOpen} onMenu={() => setDrawerOpen(true)} menuRef={menuRef} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/work/:slug"
            element={
              <Suspense fallback={<div className={styles.fallback} />}>
                <CaseStudy />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        {!isDesktop && <MobileActionBar drawerOpen={drawerOpen} />}
      </div>
      <Drawer open={drawerOpen} onClose={closeDrawer} returnFocusRef={menuRef} pageRef={pageRef} />
    </>
  );
}
