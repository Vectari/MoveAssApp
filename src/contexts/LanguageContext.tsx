import { createContext, useState, ReactNode } from "react";
import dictionary from "../library/dictionary";

interface LanguageContectType {
  language: keyof typeof dictionary;
  setLanguage: (lang: keyof typeof dictionary) => void;
}

export const LanguageContext = createContext<LanguageContectType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<keyof typeof dictionary>("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
