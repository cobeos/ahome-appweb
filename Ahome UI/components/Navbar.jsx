"use client";

import { useEffect, useState } from "react";
import { FiGlobe } from "react-icons/fi";
import { useLanguage } from "../src/contexts/LanguageContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleLinkClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
        setMenuOpen(false);
      }
    };

    const links = document.querySelectorAll(".nav-menu a[href^='#']");
    links.forEach((link) => link.addEventListener("click", handleLinkClick));

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleLinkClick));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si estamos en la parte superior, siempre mostrar la navbar
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        // Si scrolleamos hacia abajo, ocultar
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } 
        // Si scrolleamos hacia arriba, mostrar
        else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div 
        className={`nav-overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <nav className={`navbar ${isVisible ? "navbar-visible" : "navbar-hidden"}`}>
        <div className="container">
          <div className="nav-wrapper">
          <a className="nav-brand" href="#inicio" aria-label="A•home">
            <div className="nav-brand-row">
              <img
                src="/logo.svg"
                alt="A•home Logo"
                className="nav-brand-icon"
                aria-hidden="true"
              />
              <div className="nav-brand-text">
                <div className="nav-brand-title">A•home</div>
                <div className="nav-brand-subtitle">{t("hero.brandSubtitle")}</div>
              </div>
            </div>
          </a>
          <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
            <li className="nav-menu-close-wrapper">
              <button
                className="nav-menu-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                type="button"
              >
                ✕
              </button>
            </li>
            <li>
              <a href="#inicio" onClick={() => setMenuOpen(false)}>{t("nav.home")}</a>
            </li>
            <li>
              <a href="#nosotros" onClick={() => setMenuOpen(false)}>{t("nav.about")}</a>
            </li>
            <li>
              <a href="#servicios" onClick={() => setMenuOpen(false)}>{t("nav.services")}</a>
            </li>
            <li>
              <a href="#propiedades" onClick={() => setMenuOpen(false)}>{t("nav.properties")}</a>
            </li>
            <li>
              <a href="#invertir" onClick={() => setMenuOpen(false)}>{t("nav.invest")}</a>
            </li>
            <li>
              <a href="#enfoque" onClick={() => setMenuOpen(false)}>{t("nav.integrated")}</a>
            </li>
            <li>
              <a href="#contacto" onClick={() => setMenuOpen(false)}>{t("nav.contact")}</a>
            </li>
          </ul>
          <div className="nav-actions">
            <button
              className="nav-lang"
              type="button"
              aria-label={t("nav.languageAria")}
              onClick={toggleLanguage}
            >
              <FiGlobe aria-hidden="true" />
              <span className="nav-lang-text">{language.toUpperCase()}</span>
            </button>
          </div>
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
          </div>
        </div>
      </nav>
    </>
  );
}



