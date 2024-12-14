import React from "react";
import { StyledInput, InputContainer, ErrorText } from "./CustomInput.styles";

interface CustomInputProps {
    placeholder: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    error?: string; // Додаємо цю властивість
}

const CustomInput: React.FC<CustomInputProps> = ({
                                                     placeholder,
                                                     type,
                                                     name,
                                                     value,
                                                     onChange,
                                                     width,
                                                     error,
                                                 }) => {
    return (
        <InputContainer width={width}>
            <StyledInput
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <ErrorText>{error}</ErrorText>}
        </InputContainer>
    );
};

export default CustomInput;
