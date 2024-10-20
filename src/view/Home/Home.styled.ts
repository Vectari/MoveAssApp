import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: 2 1fr;
`;

export const Logo = styled.svg`
  width: 256px;
  height: 256px;
  grid-column: 1;
  color: ${(props) => props.theme.text.primary};
`;

export const Header = styled.h1`
  grid-column: 2;

  p {
    margin-left: 10rem;
    font-size: 1.2rem;
  }
`;

export const SubHeaderInfo = styled.article`
  grid-column: 2;
  max-width: 500px;
  font-size: 1rem;
  font-weight: 300;
`;
