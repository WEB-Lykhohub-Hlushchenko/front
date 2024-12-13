import React, { useState } from "react";
import { InputContainer, StyledInput, Placeholder } from "./Input.styles";

interface InputProps {
    placeholder: string;
    width?: string;
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, width, type = "text", value, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <InputContainer width={width}>
            <StyledInput
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(value ? true : false)}
            />
            <Placeholder isFocused={isFocused || Boolean(value)}>
                {placeholder}
            </Placeholder>
        </InputContainer>
    );
};

export default Input;