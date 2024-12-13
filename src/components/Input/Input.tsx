import React, { useState } from "react";
import { InputContainer, StyledInput, Placeholder } from "./Input.styles";

interface InputProps {
    label: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({ label, type = "text" }) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");

    return (
        <InputContainer>
            <Placeholder isFocused={focused || value.length > 0}>{label}</Placeholder>
            <StyledInput
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </InputContainer>
    );
};

export default Input;
