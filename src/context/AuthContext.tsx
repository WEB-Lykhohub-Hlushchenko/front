import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
    role: string; // Роль користувача
    setRole: (role: string) => void; // Функція для зміни ролі
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
    role: "guest",
    setRole: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRole] = useState<string>("guest");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ role, setRole, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);