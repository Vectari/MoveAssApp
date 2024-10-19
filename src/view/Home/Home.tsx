import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../library/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { atomIsDarkMode } from "../../atoms/atoms";
import { useAtom } from "jotai";

const Container = styled.div`
  background-color: ${(props) => props.theme.navbar.active};
  border: 1px solid ${(props) => props.theme.border};
  color: white;
  padding: 2rem;
`;

export function Home() {
  const [isDarkMode] = useAtom(atomIsDarkMode);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (auth.currentUser !== null) {
        navigate("/panel");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <h1>Home page</h1>
      <ThemeProvider theme={isDarkMode ? theme.darkMode : theme.lightMode}>
        <Container></Container>
      </ThemeProvider>
    </>
  );
}
