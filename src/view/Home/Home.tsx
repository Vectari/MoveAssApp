import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { useState } from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.primary};
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.primary};
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.hover.primary};
  }
`;

export function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
