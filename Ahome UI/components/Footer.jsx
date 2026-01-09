"use client";

import { useLanguage } from "../src/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>A•HOME</h3>
            <p>{t("footer.tagline")}</p>
          </div>
          <div className="footer-section">
            <h4>{t("footer.linksTitle")}</h4>
            <ul>
              <li>
                <a href="#inicio">{t("nav.home")}</a>
              </li>
              <li>
                <a href="#propiedades">{t("nav.properties")}</a>
              </li>
              <li>
                <a href="#nosotros">{t("nav.about")}</a>
              </li>
              <li>
                <a href="#contacto">{t("nav.contact")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>{t("footer.followTitle")}</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" aria-label="Twitter">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} A•HOME Riviera Maya. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}



