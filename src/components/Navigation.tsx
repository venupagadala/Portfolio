import React, { useEffect, useState } from "react";
import { CloseIcon, DarkModeIcon, LightModeIcon, MenuIcon } from "./Icons";
import "../assets/styles/Navigation.scss";

const navItems: [label: string, id: string][] = [
  ["Experience", "experience"],
  ["Work", "work"],
  ["Skills", "expertise"],
  ["Education", "education"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

type Props = {
  parentToChild: { mode: "light" | "dark" };
  modeChange: () => void;
};

function Navigation({ parentToChild, modeChange }: Props) {
  const { mode } = parentToChild;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Highlight the section currently in view.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    // Lazy sections mount later, so re-scan once after load.
    const observeAll = () =>
      navItems.forEach(([, id]) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    observeAll();
    const t = setTimeout(observeAll, 1500);
    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id);
    setOpen(false);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`site-nav${open ? " is-open" : ""}`}>
      <nav className="site-nav__bar" aria-label="Main">
        <a className="site-nav__brand" href="#about" onClick={go("about")}>
          Venu Pagadala
        </a>

        <ul className="site-nav__links" id="site-nav-links">
          {navItems.map(([label, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={go(id)}
                aria-current={active === id ? "location" : undefined}
                className={active === id ? "is-active" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="site-nav__icon"
          onClick={modeChange}
          aria-label={mode === "dark" ? "Switch to morning (light) theme" : "Switch to evening (dark) theme"}
          title={mode === "dark" ? "Morning" : "Evening"}
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </button>

        <button
          type="button"
          className="site-nav__icon site-nav__toggle"
          aria-expanded={open}
          aria-controls="site-nav-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>
    </header>
  );
}

export default Navigation;
