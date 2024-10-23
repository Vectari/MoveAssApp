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


// WERSJA NIZEJ NAPRAWA TLUMACZENIE W USERPANEL -> jak jest pl to po refreshu jest pl

// import { useCallback, useState, useEffect } from "react";
// import dictionary, { Dictionary } from "../library/dictionary";

// export const useTranslation = () => {
//   const [language, setLanguage] = useState<string | null>(null);

//   useEffect(() => {
//     const storedLanguage = localStorage.getItem("language") || "en"; // Default to "en" if not found
//     setLanguage(storedLanguage);
//   }, []);

//   const translate = useCallback(
//     (page: Dictionary, element: string) => {
//       return dictionary[page]?.[element]?.[language!] || "";
//     },
//     [language] // language as dependency
//   );

//   return { translate };
// };
