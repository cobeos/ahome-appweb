"use client";

import { useLanguage } from "../src/contexts/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contacto" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>{t("contact.title")}</h2>
          <p>{t("contact.subtitle")}</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3>{t("contact.addressTitle")}</h3>
              <p>{t("contact.address")}</p>
            </div>
            <div className="contact-item">
              <h3>{t("contact.phoneTitle")}</h3>
              <p>+52 (984) XXX XXXX</p>
            </div>
            <div className="contact-item">
              <h3>{t("contact.emailTitle")}</h3>
              <p>contacto@ahomeqroo.com</p>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert(t("contact.success"));
              e.currentTarget.reset();
            }}
          >
            <div className="form-group">
              <input type="text" placeholder={t("contact.namePlaceholder")} required />
            </div>
            <div className="form-group">
              <input type="email" placeholder={t("contact.emailPlaceholder")} required />
            </div>
            <div className="form-group">
              <input type="tel" placeholder={t("contact.phonePlaceholder")} />
            </div>
            <div className="form-group">
              <textarea placeholder={t("contact.messagePlaceholder")} rows={5} required />
            </div>
            <button type="submit" className="btn btn-primary">
              {t("contact.send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

