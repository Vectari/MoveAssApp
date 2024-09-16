import { createContext, useState, useContext, ReactNode } from "react";
import dictionary from "../library/dictionary";

interface LanguageContectType {
  language: keyof typeof dictionary;
  setLanguage: (lang: keyof typeof dictionary) => void;
}

const LanguageContext = createContext<LanguageContectType | undefined>(
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
