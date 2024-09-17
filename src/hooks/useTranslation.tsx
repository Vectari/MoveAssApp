import { useLanguage } from "../contexts/LanguageContext";
import dictionary, { Dictionary } from "../library/dictionary";

export const useTranslation = () => {
  const { language } = useLanguage();

  const translate = (page: Dictionary, element: string) => {
    return dictionary[page]?.[element]?.[language] || "";
  };

  return { translate };
};
