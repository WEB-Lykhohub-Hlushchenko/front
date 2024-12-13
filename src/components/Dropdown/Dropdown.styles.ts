import styled from "styled-components";

export const DropdownContainer = styled.div<{ width?: string }>`
    position: relative;
    width: ${({ width }) => (width ? width : "100%")};
    max-width: 100%;
    margin: 20px 0;
`;

export const SelectedValue = styled.div`
    width: 100%;
    padding: 16px;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    border: 2px solid var(--accent);
    border-radius: 16px;
    background-color: var(--main);
    color: var(--grey);
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &:hover {
        border-color: var(--secondary-accent);
    }
`;

export const InputField = styled.input`
    width: 100%;
    padding: 16px;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    border: 2px solid var(--accent);
    border-radius: 16px;
    background-color: var(--main);
    color: var(--grey);
    outline: none;

    &:focus {
        border-color: var(--secondary-accent);
    }
`;

export const OptionsList = styled.ul<{ isOpen: boolean }>`
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? "150px" : "0")};
    overflow: hidden;
    padding: 0;
    margin: 0;
    border: 2px solid var(--accent);
    border-radius: 16px;
    background-color: var(--main);
    list-style: none;
    transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
    transform: ${({ isOpen }) => (isOpen ? "scaleY(1)" : "scaleY(0)")};
    z-index: 1000;
`;

export const Option = styled.li`
    padding: 10px 16px;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    color: var(--grey);
    cursor: pointer;

    &:hover {
        background-color: var(--secondary-accent);
        color: var(--main);
    }
`;

export const Icon = styled.div`
    font-size: 16px;
    color: var(--accent);
    cursor: pointer;
    transition: transform 0.3s;

    &.rotate {
        transform: rotate(180deg);
    }
`;
