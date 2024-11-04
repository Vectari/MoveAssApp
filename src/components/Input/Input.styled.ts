import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  margin-top: 1.5rem;

  /* Chrome, Safari, Edge, Opera */
  /* input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  } */

  /* Firefox */
  /* input[type="number"] {
    appearance: textfield;
  } */

  label {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(8px, -30%);
    background-color: grey; /* Match input background or set as transparent */
    padding: 0 5px;
    font-size: 1rem;
    font-weight: bold;
    color: white; /* Label color */
  }

  input {
    width: 100%;
    padding: 10px;
    padding-top: 18px; /* Add space for the label */
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    background-color: grey;
  }

  input:focus {
    border-color: #007bff; /* Border color on focus */
  }
`;
