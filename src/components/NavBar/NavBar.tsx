import { NavLink, useLocation } from "react-router-dom";
import { StyledNavBar } from "./NavBar.styled";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../library/firebaseConfig";
import { useTranslation } from "../../hooks/useTranslation";

export function NavBar() {
  const navigate = useNavigate();
  const { translate } = useTranslation();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Function to check if LanguageSelect should be rendered
  const shouldRenderLanguageSelect = () => {
    const allowedPaths = ["/", "/login", "/signup"];
    return allowedPaths.includes(location.pathname);
  };

  return (
    <StyledNavBar>
      {auth.currentUser !== null ? (
        <>
          <NavLink to="/panel">{translate("NavBar", "home")}</NavLink>
          <NavLink to="/settings">{translate("NavBar", "settings")}</NavLink>
          <button onClick={handleLogout}>
            {translate("NavBar", "logout")}
          </button>
        </>
      ) : (
        <>
          <NavLink to="/">{translate("NavBar", "home")}</NavLink>
          <NavLink to="/login">{translate("NavBar", "login")}</NavLink>
          <NavLink to="/signup">{translate("NavBar", "signup")}</NavLink>
          {shouldRenderLanguageSelect() && <LanguageSelect />}
        </>
      )}
    </StyledNavBar>
  );
}
