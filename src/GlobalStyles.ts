import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Roboto', system-ui;
    src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
  }

  body {
    margin: 0;
    display: flex;
    justify-content: center;
    font-family: 'Roboto', system-ui;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text.primary};
  }
`;
