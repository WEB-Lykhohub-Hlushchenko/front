import styled from "styled-components";

export const InputContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 20px 0;
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 16px;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    border: 1px solid var(--accent);
    border-radius: 16px;
    outline: none;
    background-color: var(--main);
    color: var(--grey);

    &:focus {
        border-color: var(--secondary-accent);
    }
`;

export const Placeholder = styled.label<{ isFocused: boolean }>`
    position: absolute;
    left: 16px;
    top: ${({ isFocused }) => (isFocused ? "4px" : "50%")};
    font-size: ${({ isFocused }) => (isFocused ? "12px" : "16px")};
    font-weight: 400;
    font-family: "Montserrat", sans-serif;
    color: var(--accent);
    pointer-events: none;
    transform: translateY(-50%);
    transition: all 0.3s ease;
`;
