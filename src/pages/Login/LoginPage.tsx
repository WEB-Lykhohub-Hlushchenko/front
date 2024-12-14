import React, { useState } from "react";
import { LoginFormContainer, LinkText } from "./LoginPage.styles";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface LoginFormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Додаємо стан завантаження
    const navigate = useNavigate();
    const { setIsAuthenticated, setRole } = useAuth(); // Оновлення AuthContext

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        // Перевірка на порожні поля
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true); // Увімкнути лоадер
        try {
            const response = await api.post("/auth/login", formData);

            console.log("Login successful:", response.data);
            setError(null); // Очищення помилок після успішного логіну

            // Оновлення контексту авторизації
            setIsAuthenticated(true);
            setRole(response.data.user.role); // Припускаємо, що бекенд повертає роль у `user.role`

            // Залежно від ролі перенаправляємо на відповідну сторінку
            if (response.data.redirect) {
                navigate(response.data.redirect);
            } else {
                navigate("/"); // За замовчуванням на головну сторінку
            }
        } catch (error: any) {
            console.error("Login error:", error.response?.data);
            setError(error.response?.data?.error || "Login failed");
        } finally {
            setLoading(false); // Вимкнути лоадер
        }
    };

    return (
        <LoginFormContainer>
            <h2>Log in</h2>
            <Input
                type="email"
                width="100%"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <Input
                type="password"
                width="100%"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>
                Don’t have an account?{" "}
                <LinkText href="/register">Register here.</LinkText>
            </p>
            <Button
                variant="filled"
                color="accent"
                width="100%"
                borderRadius="16"
                height="50"
                onClick={handleLogin}
                disabled={loading} // Деактивуємо кнопку, якщо триває запит
            >
                {loading ? "Signing in..." : "Sign in"} {/* Текст кнопки залежно від стану */}
            </Button>
        </LoginFormContainer>
    );
};

export default LoginPage;
