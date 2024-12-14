import styled from "styled-components";

export const InputContainer = styled.div<{ width?: string }>`
    position: relative;
    width: ${({ width }) => width || "100%"};
    margin: 20px 0;
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 16px;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    border: 2px solid var(--accent);
    border-radius: 16px;
    outline: none;
    background-color: var(--main);
    color: var(--accent);
`;

export const ErrorText = styled.p`
    font-size: 12px;
    color: red;
    margin-top: 5px;
    font-family: "Montserrat", sans-serif;
`;
