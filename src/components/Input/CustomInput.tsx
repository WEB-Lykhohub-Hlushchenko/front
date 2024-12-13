import React from "react";
import Input from "./Input";

interface CustomInputProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type: string;
    width?: string;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
    return <Input {...props} />;
};

export default CustomInput;
