import { useCallback } from "react";
import { useLanguage } from "../hooks/useLanguage";
import dictionary, { Dictionary } from "../library/dictionary";

export const useTranslation = () => {
  const { language } = useLanguage();

  const translate = useCallback(
    (page: Dictionary, element: string) => {
      return dictionary[page]?.[element]?.[language] || "";
    },
    [language] // Add dictionary and language as dependencies
  );

  return { translate };
};
