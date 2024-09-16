import { useLanguage } from "../contexts/LanguageContext";
import dictionary from "../library/dictionary";

export const useTranslation = () => {
  const { language } = useLanguage();

  const translate = (page: string, element: string) => {
    return dictionary[page]?.[element]?.[language] || "";
  };

  return { translate };
};
