"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { fr, type Dict } from "./dict.fr";
import { en } from "./dict.en";
import { es } from "./dict.es";

export type Locale = "fr" | "en" | "es";

export const dictionaries: Record<Locale, Dict> = { fr, en, es };

export const LOCALES = [
  { code: "fr" as Locale, label: "Français", flag: "/flags/fr.svg" },
  { code: "en" as Locale, label: "English",  flag: "/flags/gb.svg" },
  { code: "es" as Locale, label: "Español",  flag: "/flags/es.svg" },
];

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: Dict };

const I18nCtx = createContext<Ctx>({ locale: "fr", setLocale: () => {}, t: fr });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("az-locale")) as Locale | null;
    if (saved && saved in dictionaries) setLocaleState(saved);
  }, []);

  // Reflect locale on the <html lang> attribute
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") localStorage.setItem("az-locale", l);
  };

  return (
    <I18nCtx.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useT() {
  return useContext(I18nCtx);
}
