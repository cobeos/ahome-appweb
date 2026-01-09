"use client";

import { IoChevronDownOutline } from "react-icons/io5";
import { useLanguage } from "../src/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const handleScrollToProperties = (e) => {
    e.preventDefault();
    const propertiesSection = document.querySelector("#propiedades");
    if (propertiesSection) {
      const offsetTop = propertiesSection.offsetTop - 80;
      window.scrollTo({ 
        top: offsetTop, 
        behavior: "smooth" 
      });
    }
  };

  return (
    <section id="inicio" className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">{t("hero.title")}</h1>
        <p className="hero-subtitle">{t("hero.subtitle")}</p>
        <div className="hero-buttons">
          <div className="hero-buttons-segment">
            <a href="#invertir" className="btn btn-primary">
              {t("hero.invest")}
            </a>
            <a href="#propiedades" className="btn btn-secondary">
              {t("hero.sell")}
            </a>
          </div>
          <a href="#propiedades" className="btn btn-primary">
            {t("hero.rent")}
          </a>
          <a href="#servicios" className="btn btn-secondary">
            {t("hero.management")}
          </a>
        </div>
      </div>
      <button 
        className="scroll-indicator"
        onClick={handleScrollToProperties}
        aria-label="Ir a propiedades"
      >
        <IoChevronDownOutline aria-hidden="true" />
      </button>
    </section>
  );
}



