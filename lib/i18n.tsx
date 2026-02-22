"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { locales, type Translations } from "@/locales";

type I18nContextType = {
  lang:    string;
  setLang: (code: string) => void;
  t:       Translations;
};

const I18nContext = createContext<I18nContextType>({
  lang:    "en",
  setLang: () => {},
  t:       locales.en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState("en");

  // Restore persisted language on first mount
  useEffect(() => {
    const saved = localStorage.getItem("jopalesi-lang");
    if (saved && locales[saved]) setLangState(saved);
  }, []);

  function setLang(code: string) {
    setLangState(code);
    localStorage.setItem("jopalesi-lang", code);
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t: locales[lang] ?? locales.en }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
