import styled from "styled-components";

export const ProfilePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    gap: 40px;
    min-height: 100vh;
    background-color: var(--main);
`;

export const ProfileInfo = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-bottom: 15px;
    }

    h2 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.8rem;
        color: var(--accent);
        margin-bottom: 10px;
    }

    p {
        font-family: "Montserrat", sans-serif;
        font-size: 1rem;
        color: var(--grey);
        margin-bottom: 5px;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

export const ActionButton = styled.button<{ variant?: string }>`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-family: "Montserrat", sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({ variant }) =>
    variant === "danger" ? "var(--red)" : "var(--secondary)"};
    color: #fff;

    &:hover {
        background-color: ${({ variant }) =>
    variant === "danger" ? "#A82301" : "var(--secondary-accent)"};
    }
`;

export const AppointmentsContainer = styled.div`
    width: 100%;
    text-align: center;

    h2 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.8rem;
        color: var(--accent);
        margin-bottom: 20px;
    }

    div {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
    }
`;

export const AppointmentCard = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        margin-bottom: 10px;
    }

    h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.2rem;
        color: var(--accent);
        margin-bottom: 10px;
    }

    p {
        font-family: "Montserrat", sans-serif;
        font-size: 0.9rem;
        color: var(--grey);
        margin-bottom: 5px;
    }
`;
