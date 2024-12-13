import styled from "styled-components";
export const InputContainer = styled.div<{ width?: string }>`    position: relative;
  width: ${({ width }) => width || "100%"};    margin: 20px 0;
`;
export const StyledInput = styled.input`    width: 100%;
  padding: 16px;    font-size: 16px;
  font-family: "Montserrat", sans-serif;    font-weight: 400;
  border: 2px solid var(--accent);    border-radius: 16px;
  outline: none;    background-color: var(--main);
  color: var(--accent);    z-index: 1;
  &:focus + label {
    color: var(--accent); /* Колір плейсхолдера змінюється при фокусі */        top: 0;
    font-size: 12px;    }
`;
export const Placeholder = styled.label<{ isFocused: boolean }>`    position: absolute;
  left: 16px;    top: ${({ isFocused }) => (isFocused ? "0" : "50%")};
  font-size: ${({ isFocused }) => (isFocused ? "12px" : "16px")};    font-weight: 400;
  font-family: "Montserrat", sans-serif;    color: var(--accent);
  background-color: var(--main);    pointer-events: none;
  transform: translateY(-50%);    z-index: 0;
  padding: 0 4px;    transition: all 0.3s ease;
`;
export const ErrorText = styled.p`    font-size: 12px;
    color: red;    margin-top: 5px;
    font-family: "Montserrat", sans-serif;`;