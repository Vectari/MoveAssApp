import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../library/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: grey;
  border: 1px solid ${(props) => props.theme.border};
  color: white;
`;

const Button = styled.button`
  background-color: grey;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: pink;
  }
`;

export function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
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
        <Container>
          <Button onClick={() => setIsDarkMode(!isDarkMode)}>
            Toggle Mode
          </Button>
        </Container>
      </ThemeProvider>
    </>
  );
}
