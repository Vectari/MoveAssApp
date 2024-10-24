import styled from "styled-components";

export const StyledNavBar = styled.div`
  width: 640px;

  a {
    text-decoration: none;
    padding: 1rem;
    font-size: 1.5rem;
    vertical-align: middle;
    color: ${(props) => props.theme.text.primary};
  }

  .active {
    color: ${(props) => props.theme.navbar.active};
  }
`;

export const Button = styled.button`
  /* color: ${(props) => props.theme.text.primary}; */
  background-color: ${(props) => props.theme.secondaryButton};
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
`;
