import React, {useState} from "react";
import { RegisterFormContainer, LinkText } from "./RegisterPage.styles";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Dropdown from "../../components/Dropdown/Dropdown";

const RegisterPage: React.FC = () => {
    const [role, setRole] = useState("");

    return (
        <RegisterFormContainer>
            <h2>Register</h2>
            <Input placeholder="Email" type="email" width="100%"/>
            <Input placeholder="Password" type="password" width="100%"/>
            <Input placeholder="First name" type="text" width="100%"/>
            <Input placeholder="Last name" type="text" width="100%"/>
            <Input placeholder="Phone" type="tel" width="100%"/>
            <Input placeholder="Date of birth" type="date" width="100%"/>
            <Dropdown options={["Master", "Client"]} value={role} onChange={(selected) => setRole(selected)}/>
            <p>
                Have an account? <LinkText href="/login">Log in here.</LinkText>
            </p>
            <Button variant="filled" color="accent" width="100%" borderRadius="6" height="50">Sign up</Button>
        </RegisterFormContainer>
    );
};

export default RegisterPage;