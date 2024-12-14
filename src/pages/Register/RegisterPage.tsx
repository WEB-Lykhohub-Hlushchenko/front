import React, { useState, useEffect } from "react";
import { RegisterFormContainer, LinkText } from "./RegisterPage.styles";
import Button from "../../components/Button/Button";
import CustomInput from "../../components/Input/CustomInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import api from "../../api";
import { useNavigate } from "react-router-dom";

interface FormData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    date_of_birth: string;
    role: string;
}

interface Errors {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    date_of_birth: string;
    role: string;
    global?: string;
}

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        date_of_birth: "",
        role: "",
    });

    const [errors, setErrors] = useState<Errors>({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        date_of_birth: "",
        role: "",
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const navigate = useNavigate();

    const validateField = (name: string, value: string) => {
        let error = "";

        switch (name) {
            case "email":
                if (!/\S+@\S+\.\S+/.test(value)) {
                    error = "Invalid email format";
                }
                break;
            case "password":
                if (value.length < 6) {
                    error = "Password must be at least 6 characters";
                }
                break;
            case "first_name":
            case "last_name":
                if (value.trim() === "") {
                    error = "This field is required";
                }
                break;
            case "phone":
                if (!/^\d{10,15}$/.test(value)) {
                    error = "Invalid phone number";
                }
                break;
            case "date_of_birth":
                if (new Date(value) >= new Date()) {
                    error = "Invalid date of birth";
                }
                break;
            case "role":
                if (value === "") {
                    error = "Please select a role";
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        validateField(name, value);
    };

    const handleDropdownChange = (selected: string) => {
        setFormData((prevData) => ({ ...prevData, role: selected }));
        validateField("role", selected);
    };

    const handleRegister = async () => {
        if (!isFormValid) return;

        try {
            const response = await api.post("/auth/register", formData);
            console.log("Registration successful:", response.data);

            // Очищення полів після успішної реєстрації
            setFormData({
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                phone: "",
                date_of_birth: "",
                role: "",
            });

            setErrors({
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                phone: "",
                date_of_birth: "",
                role: "",
            });

            // Перенаправлення на головну сторінку
            navigate("/");
        } catch (error: any) {
            console.error("Registration error:", error.response?.data);
            setErrors((prevErrors) => ({
                ...prevErrors,
                global: error.response?.data?.error || "Registration failed",
            }));
        }
    };

    useEffect(() => {
        const hasErrors = Object.values(errors).some((error) => error !== "");
        const hasEmptyFields = Object.values(formData).some((value) => value === "");
        setIsFormValid(!hasErrors && !hasEmptyFields);
    }, [formData, errors]);

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
                error={errors.email}
            />
            <CustomInput
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                width="100%"
                error={errors.password}
            />
            <CustomInput
                placeholder="First name"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                width="100%"
                error={errors.first_name}
            />
            <CustomInput
                placeholder="Last name"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                width="100%"
                error={errors.last_name}
            />
            <CustomInput
                placeholder="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                width="100%"
                error={errors.phone}
            />
            <CustomInput
                placeholder="Date of birth"
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                width="100%"
                error={errors.date_of_birth}
            />
            <Dropdown
                options={["Master", "Client"]}
                value={formData.role}
                onChange={handleDropdownChange}
            />
            {errors.global && <p style={{ color: "red" }}>{errors.global}</p>}
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
                disabled={!isFormValid}
            >
                Sign up
            </Button>
        </RegisterFormContainer>
    );
};

export default RegisterPage;
