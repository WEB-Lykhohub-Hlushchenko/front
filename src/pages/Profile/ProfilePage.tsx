import React from "react";
import {
    ProfilePageContainer,
    ProfileInfo,
    AppointmentsContainer,
    AppointmentCard,
    ButtonContainer,
    ActionButton,
} from "./ProfilePage.styles";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";

const ProfilePage: React.FC = () => {
    const { isAuthenticated } = useAuth();

    // Тимчасові дані для профілю та записів
    const profileData = {
        name: "Anna Bennet",
        age: 26,
        phone: "+38 (093) 287-25-80",
        email: "Anna.bennet@gmail.com",
    };

    const appointments = Array(6).fill({
        service: "Nails",
        specialist: "Anna Bennet",
        date: "27 November, 13:00",
        image: require("../../assets/images/face-specialist1.jpg"),
    });

    const handleCancel = (index: number) => {
        console.log(`Appointment ${index} cancelled`);
        // Тут можна реалізувати функцію видалення запису
    };

    const handleDeleteAccount = () => {
        console.log("Account deleted");
        // Тут можна реалізувати функцію видалення облікового запису
    };

    const handleLogout = () => {
        console.log("Logged out");
        // Тут можна реалізувати функцію виходу з акаунту
    };

    return (
        <>
            <Header isAuthenticated={isAuthenticated} />
            <ProfilePageContainer>
                {/* Інформація про клієнта */}
                <ProfileInfo>
                    <img src={require("../../assets/images/face-specialist1.jpg")} alt="Profile" />
                    <h2>{profileData.name}</h2>
                    <p>{profileData.age} years</p>
                    <p>{profileData.phone}</p>
                    <p>{profileData.email}</p>
                    <ButtonContainer>
                        <ActionButton onClick={handleDeleteAccount} variant="danger">
                            Delete
                        </ActionButton>
                        <ActionButton onClick={handleLogout} variant="neutral">
                            Exit
                        </ActionButton>
                    </ButtonContainer>
                </ProfileInfo>

                {/* Список записів */}
                <AppointmentsContainer>
                    <h2>Your appointments</h2>
                    <div>
                        {appointments.map((appointment, index) => (
                            <AppointmentCard key={index}>
                                <img src={appointment.image} alt={appointment.specialist} />
                                <h3>{appointment.service}</h3>
                                <p>{appointment.specialist}</p>
                                <p>{appointment.date}</p>
                                <ActionButton
                                    onClick={() => handleCancel(index)}
                                    variant="danger"
                                >
                                    Cancel
                                </ActionButton>
                            </AppointmentCard>
                        ))}
                    </div>
                </AppointmentsContainer>
            </ProfilePageContainer>
            <Footer />
        </>
    );
};

export default ProfilePage;
