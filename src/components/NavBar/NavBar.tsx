import { NavLink, useLocation } from "react-router-dom";
import { Button, StyledNavBar } from "./NavBar.styled";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../library/firebaseConfig";
import { useTranslation } from "../../hooks/useTranslation";
import { useAtom } from "jotai";
import { atomIsDarkMode } from "../../atoms/atoms";

export function NavBar() {
  const [isDarkMode, setIsDarkMode] = useAtom(atomIsDarkMode);
  const navigate = useNavigate();
  const { translate } = useTranslation();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Function to check if LanguageSelect should be rendered
  const shouldRenderLanguageSelect = () => {
    const allowedPaths = ["/", "/login", "/signup", "/settings"];
    return allowedPaths.includes(location.pathname);
  };

  const onRefreshLogenInUser = () => {
    const allowedPaths = ["/panel", "/settings"];
    return allowedPaths.includes(location.pathname);
  };

  return (
    <StyledNavBar>
      {onRefreshLogenInUser() && (
        <>
          <NavLink to="/panel">{translate("NavBar", "home")}</NavLink>
          <NavLink to="/settings">{translate("NavBar", "settings")}</NavLink>
          <LanguageSelect display={false} />
          <Button onClick={handleLogout}>
            {translate("NavBar", "logout")}
          </Button>
          <Button onClick={() => setIsDarkMode(!isDarkMode)}>L/D Mode</Button>
          {shouldRenderLanguageSelect() && <LanguageSelect display={true} />}
        </>
      )}

      {!onRefreshLogenInUser() && (
        <>
          <NavLink to="/">{translate("NavBar", "home")}</NavLink>
          <NavLink to="/login">{translate("NavBar", "login")}</NavLink>
          <NavLink to="/signup">{translate("NavBar", "signup")}</NavLink>
          <Button onClick={() => setIsDarkMode(!isDarkMode)}>L/D Mode</Button>
          {shouldRenderLanguageSelect() && <LanguageSelect display={true} />}
        </>
      )}
    </StyledNavBar>
  );
}
