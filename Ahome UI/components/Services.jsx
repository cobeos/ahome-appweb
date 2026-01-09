"use client";

import { useLanguage } from "../src/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const services = t("services.items") || [];

  return (
    <section id="servicios" className="services">
      <div className="container">
        <div className="section-header">
          <h2>{t("services.title")}</h2>
          <p>{t("services.subtitle")}</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



