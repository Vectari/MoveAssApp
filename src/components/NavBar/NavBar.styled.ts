import styled from "styled-components";

export const StyledNavBar = styled.div`
  padding: 1rem;

  a {
    text-decoration: none;
    padding: 1rem;
    font-size: 1.5rem;
    color: ${(props) => props.theme.text.primary};
  }

  .active {
    color: ${(props) => props.theme.navbar.active};
  }
`;
