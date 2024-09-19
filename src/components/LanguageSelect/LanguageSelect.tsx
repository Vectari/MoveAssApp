import PL_FLG from "/pl_flag.svg";
import UK_FLAG from "/uk_flag.svg";
import { useLanguage } from "../../hooks/useLanguage";
import { Dictionary } from "../../library/dictionary";
import { StyledLanguageSelectWrapper } from "./LanguageSelect.style";

export function LanguageSelect() {
  const { language, setLanguage } = useLanguage();

  setLanguage((localStorage.getItem("language") as Dictionary) || "en");

  return (
    <StyledLanguageSelectWrapper>
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
