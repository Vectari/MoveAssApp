import { NavLink } from "react-router-dom";
import { StyledNavBar } from "./NavBar.styled";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../library/firebaseConfig";
import { useTranslation } from "../../hooks/useTranslation";

export function NavBar() {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  const handleLogout = async () => {
    await signOut(auth);
    console.log(auth.currentUser);
    navigate("/login");
  };

  return (
    <StyledNavBar>
      {auth.currentUser === null ? (
        <>
          <NavLink to="/">{translate("NavBar", "home")}</NavLink>
          <NavLink to="/login">{translate("NavBar", "login")}</NavLink>
          <NavLink to="/signup">{translate("NavBar", "signup")}</NavLink>
          <LanguageSelect />
        </>
      ) : (
        <>
          <NavLink to="/panel">{translate("NavBar", "home")}</NavLink>
          <NavLink to="/settings">{translate("NavBar", "settings")}</NavLink>
          <button onClick={handleLogout}>
            {translate("NavBar", "logout")}
          </button>
        </>
      )}
    </StyledNavBar>
  );
}
