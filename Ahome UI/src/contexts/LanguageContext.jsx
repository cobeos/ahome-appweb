"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages } from "../i18n/messages";

function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    const saved = window.localStorage.getItem("ahome.language");
    if (saved === "es" || saved === "en") setLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("ahome.language", language);
  }, [language]);

  const value = useMemo(() => {
    const dict = messages[language] || messages.es;

    const t = (key, ...args) => {
      const v = getByPath(dict, key);
      if (typeof v === "function") return v(...args);
      return v ?? key;
    };

    const toggleLanguage = () => setLanguage((prev) => (prev === "es" ? "en" : "es"));

    return { language, setLanguage, toggleLanguage, t };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}


