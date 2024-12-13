import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/globals.css";
import { AppContainer, MainContent } from "./App.styles";
import AppRouter from "./routes/AppRouter"; // Підключення AppRouter
import { AuthProvider } from "./context/AuthContext"; // Контекст авторизації

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContainer>
                    <MainContent>
                        <AppRouter /> {/* Роутер для обробки всіх сторінок */}
                    </MainContent>
                </AppContainer>
            </Router>
        </AuthProvider>
    );
};

export default App;
