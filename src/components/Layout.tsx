import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, Sun, Moon, ArrowUp } from "lucide-react";
import LinkArrow from "./LinkArrow";
export function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
function Header() {
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("noma-theme") === "dark";
    } catch {
      return false;
    }
  });
  const location = useLocation();
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("noma-theme", dark ? "dark" : "light");
    } catch {
      /* Theme works even without storage. */
    }
  }, [dark]);
  useEffect(() => {
    setMenu(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="STUDIO NOMA home">
        <Mark />
        <span>
          STUDIO NOMA<span className="brand-sub">ARCHITECTURE & INTERIORS</span>
        </span>
      </Link>
      <nav
        id="mobile-navigation"
        className={`main-nav ${menu ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/studio">Studio</NavLink>
        <NavLink to="/contact" className="nav-contact">
          Let’s talk <ArrowUpRight aria-hidden="true" size={15} />
        </NavLink>
      </nav>
      <div className="header-actions">
        <button
          className="icon-button theme-toggle"
          onClick={() => setDark(!dark)}
          aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
        >
          {dark ? (
            <Sun aria-hidden="true" size={18} />
          ) : (
            <Moon aria-hidden="true" size={18} />
          )}
        </button>
        <button
          className="icon-button menu-toggle"
          ref={menuButton}
          aria-expanded={menu}
          aria-controls="mobile-navigation"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          onClick={() => setMenu(!menu)}
        >
          {menu ? (
            <X aria-hidden="true" size={23} />
          ) : (
            <Menu aria-hidden="true" size={23} />
          )}
        </button>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="eyebrow">LET’S MAKE SOMETHING MEANINGFUL.</span>
          <Link to="/contact" className="footer-cta">
            Your next chapter.
            <ArrowUpRight aria-hidden="true" strokeWidth={1} />
          </Link>
        </div>
        <div className="footer-location">
          <span className="status-dot" />
          Based in Cape Town.
          <br />
          <span>Working wherever life takes us.</span>
          <LinkArrow to="/contact">Start a conversation</LinkArrow>
        </div>
      </div>
      <div className="footer-bottom">
        <Link className="footer-brand" to="/">
          STUDIO NOMA<span>Thoughtfully made. Built to last.</span>
        </Link>
        <div className="footer-links">
          <Link to="/projects">Projects</Link>
          <Link to="/studio">Studio</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p>
          © {new Date().getFullYear()} Studio Noma{" "}
          <span>Concept portfolio</span>
        </p>
        <button
          className="back-top icon-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <ArrowUp aria-hidden="true" size={18} />
        </button>
      </div>
    </footer>
  );
}
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "smooth" }),
      );
    } else window.scrollTo({ top: 0, behavior: "instant" });
    const names: Record<string, string> = {
      "/": "Architecture & interiors",
      "/projects": "Selected projects",
      "/studio": "Our studio",
      "/contact": "Start a conversation",
    };
    document.title = `${names[pathname] || "Project story"} — STUDIO NOMA`;
  }, [pathname, hash]);
  return null;
}
export default function Layout() {
  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
