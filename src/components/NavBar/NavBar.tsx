import { NavLink } from "react-router-dom";
import { StyledNavBar } from "./NavBar.styled";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";

export function NavBar() {
  return (
    <StyledNavBar>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Log In</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <LanguageSelect />
    </StyledNavBar>
  );
}
