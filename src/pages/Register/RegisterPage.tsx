import React from "react";
import { RegisterFormContainer, LinkText } from "./RegisterPage.styles";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const RegisterPage: React.FC = () => {
    return (
        <RegisterFormContainer>
            <h2>Register</h2>
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
            <Input label="First name" type="text" />
            <Input label="Last name" type="text" />
            <Input label="Phone" type="tel" />
            <Input label="Date of birth" type="date" />
            <Input label="Role" type="text" />
            <p>
                Have an account? <LinkText href="/login">Log in here.</LinkText>
            </p>
            <Button variant="filled" color="accent" width="100%" borderRadius="6" height="50">Sign up</Button>
        </RegisterFormContainer>
    );
};

export default RegisterPage;
