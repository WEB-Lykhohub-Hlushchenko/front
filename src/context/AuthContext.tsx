import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
    role: string; // Роль користувача
    setRole: (role: string) => void;
    isAuthenticated: boolean; // Стан авторизації
    setIsAuthenticated: (value: boolean) => void;
    userId: number | null; // ID користувача
    setUserId: (id: number | null) => void; // Функція для оновлення userId
}

const AuthContext = createContext<AuthContextProps>({
    role: "guest",
    setRole: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    userId: null, // Початкове значення userId
    setUserId: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRole] = useState<string>("guest"); // Початкове значення ролі
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Початкове значення авторизації
    const [userId, setUserId] = useState<number | null>(null); // Початкове значення userId

    return (
        <AuthContext.Provider value={{ role, setRole, isAuthenticated, setIsAuthenticated, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
