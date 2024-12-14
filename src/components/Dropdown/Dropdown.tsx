import React, { useState } from "react";
import {
    DropdownContainer,
    InputField,
    OptionsList,
    Option,
    Icon,
} from "./Dropdown.styles";
import { FaChevronDown, FaTimes } from "react-icons/fa";

interface DropdownProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    width?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, width }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleSelect = (option: string) => {
        setInputValue(option);
        onChange(option);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <DropdownContainer width={width}>
            <InputField
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />
            <Icon onClick={toggleDropdown} className={isOpen ? "rotate" : ""}>
                {isOpen ? <FaTimes /> : <FaChevronDown />}
            </Icon>
            <OptionsList isOpen={isOpen}>
                {options
                    .filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))
                    .map((option, index) => (
                        <Option key={index} onClick={() => handleSelect(option)}>
                            {option}
                        </Option>
                    ))}
            </OptionsList>
        </DropdownContainer>
    );
};

export default Dropdown;
