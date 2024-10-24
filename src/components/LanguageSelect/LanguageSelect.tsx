import PL_FLG from "/pl_flag.svg";
import UK_FLAG from "/uk_flag.svg";
import { useEffect } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { Dictionary } from "../../library/dictionary";
import { StyledLanguageSelectWrapper } from "./LanguageSelect.styled";

interface LanguageSelectProps {
  display: boolean;
}

export function LanguageSelect({ display }: LanguageSelectProps) {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const storedLanguage =
      (localStorage.getItem("language") as Dictionary) || "en";
    setLanguage(storedLanguage);
  }, [setLanguage]);

  return (
    <StyledLanguageSelectWrapper style={{ display: display ? "" : "none" }}>
      {language === "pl" ? (
        <img
          src={UK_FLAG}
          onClick={() => {
            setLanguage("en");
            localStorage.setItem("language", "en");
          }}
          alt="uk flag icon"
        />
      ) : (
        <img
          src={PL_FLG}
          onClick={() => {
            setLanguage("pl");
            localStorage.setItem("language", "pl");
          }}
          alt="pl flag icon"
        />
      )}
    </StyledLanguageSelectWrapper>
  );
}
