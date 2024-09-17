import { useLanguage } from "../hooks/useLanguage";
import dictionary, { Dictionary } from "../library/dictionary";

export const useTranslation = () => {
  const { language } = useLanguage();

  const translate = (page: Dictionary, element: string) => {
    return dictionary[page]?.[element]?.[language] || "";
  };

  return { translate };
};
