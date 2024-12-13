import React from "react";
import { LoginFormContainer, LinkText } from "./LoginPage.styles";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const LoginPage: React.FC = () => {
    return (
        <LoginFormContainer>
            <h2>Log in</h2>
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
            <p>
                Don’t have an account? <LinkText href="/register">Register here.</LinkText>
            </p>
            <Button variant="filled" color="accent" width="100%" borderRadius="6" height="50">Sign in</Button>
        </LoginFormContainer>
    );
};

export default LoginPage;
