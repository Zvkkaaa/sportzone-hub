import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "mn" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (mn: string | undefined, en: string | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem("lang") as Language) || "mn";
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const t = (mn: string | undefined, en: string | undefined) => {
    return (lang === "mn" ? mn : en) || mn || en || "";
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
