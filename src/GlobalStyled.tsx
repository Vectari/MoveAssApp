import { ThemeProvider } from "styled-components";
import { useAtom } from "jotai";
import { atomIsDarkMode } from "./atoms/atoms"; // Ensure this atom is defined
import { GlobalStyles } from "./GlobalStyles";
import { theme } from "./theme";

interface GlobalStyledProps {
  children: React.ReactNode;
}

export function GlobalStyled({ children }: GlobalStyledProps) {
  const [isDarkMode] = useAtom(atomIsDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? theme.darkMode : theme.lightMode}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
