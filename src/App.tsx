import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Main,
  Expertise,
  Experience,
  FeaturedWork,
  Education,
  Navigation,
  Footer,
} from "./components";
import { MeadowEdge, Sprig } from "./components/Scenery";
import "./index.scss";

// Below-the-fold sections that pull in extra dependencies load on demand.
const Project = lazy(() => import("./components/Project"));
const Contact = lazy(() => import("./components/Contact"));

type Mode = "light" | "dark";

function initialMode(): Mode {
  try {
    const saved = localStorage.getItem("theme-mode");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    /* storage blocked: fall through to system preference */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [mode, setMode] = useState<Mode>(initialMode);

  const handleModeChange = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  useEffect(() => {
    try {
      localStorage.setItem("theme-mode", mode);
    } catch {
      /* ignore */
    }
    document.documentElement.style.colorScheme = mode;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", mode === "dark" ? "#18211c" : "#f6f1e6");
  }, [mode]);

  return (
    <div className={`main-container ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation parentToChild={{ mode }} modeChange={handleModeChange} />
      <main id="main-content">
        <Main />
        <Experience />
        <Sprig />
        <FeaturedWork />
        <div className="meadow-band">
          <MeadowEdge />
          <div className="meadow">
            <Expertise />
          </div>
          <MeadowEdge flip />
        </div>
        <Education />
        <Suspense fallback={<div className="section" aria-busy="true" />}>
          <div className="meadow-band">
            <MeadowEdge />
            <div className="meadow">
              <Project />
            </div>
            <MeadowEdge flip />
          </div>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
