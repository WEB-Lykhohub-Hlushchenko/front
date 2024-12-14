import React, { useState } from "react";
import { RegisterFormContainer, LinkText } from "./RegisterPage.styles";
import Button from "../../components/Button/Button";
import CustomInput from "../../components/Input/CustomInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import api from "../../api";

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        date_of_birth: "",
        role: "",
    });

    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDropdownChange = (selected: string) => {
        setFormData({ ...formData, role: selected });
    };

    const handleRegister = async () => {
        try {
            const response = await api.post("/auth/register", formData);
            console.log("Registration successful:", response.data);
            setError(null);
            // Перенаправити користувача на сторінку входу
            window.location.href = "/login";
        } catch (error: any) {
            console.error("Registration error:", error.response?.data);
            setError(error.response?.data?.error || "Registration failed");
        }
    };

    return (
        <RegisterFormContainer>
            <h2>Register</h2>
            <CustomInput
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                width="100%"
            />
            <CustomInput
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                width="100%"
            />
            <CustomInput
                placeholder="First name"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                width="100%"
            />
            <CustomInput
                placeholder="Last name"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                width="100%"
            />
            <CustomInput
                placeholder="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                width="100%"
            />
            <CustomInput
                placeholder="Date of birth"
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                width="100%"
            />
            <Dropdown
                options={["Master", "Client"]}
                value={formData.role}
                onChange={handleDropdownChange}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>
                Have an account? <LinkText href="/login">Log in here.</LinkText>
            </p>
            <Button
                variant="filled"
                color="accent"
                width="100%"
                borderRadius="16"
                height="50"
                onClick={handleRegister}
            >
                Sign up
            </Button>
        </RegisterFormContainer>
    );
};

export default RegisterPage;
