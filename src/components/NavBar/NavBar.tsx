import { NavLink } from "react-router-dom";
import { StyledNavBar } from "./NavBar.styled";
import { useLanguage } from "../../hooks/useLanguage";
import { Dictionary } from "../../library/dictionary";

export function NavBar() {
  const { language, setLanguage } = useLanguage();

  setLanguage((localStorage.getItem("language") as Dictionary) || "en");

  return (
    <StyledNavBar>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Log In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <button
        onClick={() => {
          setLanguage("en");
          localStorage.setItem("language", "en");
        }}
        disabled={language === "en"}
      >
        English
      </button>
      <button
        onClick={() => {
          setLanguage("pl");
          localStorage.setItem("language", "pl");
        }}
        disabled={language === "pl"}
      >
        Polish
      </button>
    </StyledNavBar>
  );
}
