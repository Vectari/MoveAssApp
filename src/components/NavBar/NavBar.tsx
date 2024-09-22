import { NavLink } from "react-router-dom";
import { StyledNavBar } from "./NavBar.styled";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../library/firebaseConfig";

interface NavBar {
  hideHomeButton?: boolean;
}

export function NavBar({ hideHomeButton }: NavBar) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    console.log(auth.currentUser);
    navigate("/login");
  };

  return (
    <StyledNavBar>
      {hideHomeButton ?? <NavLink to="/">Home</NavLink>}
      {auth.currentUser === null ? (
        <>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <LanguageSelect />
    </StyledNavBar>
  );
}
