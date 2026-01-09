"use client";

import { useLanguage } from "../src/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>{t("about.title")}</h2>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <div className="stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">{t("about.stats.properties")}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">{t("about.stats.clients")}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">{t("about.stats.years")}</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
              alt="Riviera Maya"
            />
          </div>
        </div>
      </div>
    </section>
  );
}



