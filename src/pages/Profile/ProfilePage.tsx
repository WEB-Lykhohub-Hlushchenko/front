import React, { useEffect, useState } from "react";
import {
    ProfileContainer,
    InfoSection,
    AppointmentSection,
    ButtonGroup,
    AppointmentCard,
    FreeTimeSection,
} from "./ProfilePage.styles";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";

const ProfilePage: React.FC = () => {
    const { role, userId, setIsAuthenticated, setRole, setUserId } = useAuth();
    const [userInfo, setUserInfo] = useState<any>(null);
    const [masterId, setMasterId] = useState<number | null>(null);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [freeTimes, setFreeTimes] = useState<string[]>([]);
    const [bio, setBio] = useState<string>(""); // Додано біографію
    const [clients, setClients] = useState<any[]>([]);
    const [newFreeTime, setNewFreeTime] = useState<string>("");

    const calculateAge = (birthDate: string): number => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        return age;
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Отримання загальної інформації користувача
                const response = await api.get(`/users/${userId}`);
                const data = response.data;

                setUserInfo({
                    ...data,
                    age: data.date_of_birth ? calculateAge(data.date_of_birth) : "N/A",
                });

                if (role === "master") {
                    // Отримуємо Master ID
                    const masterResponse = await api.get(`/masters/${userId}`);
                    const masterData = masterResponse.data;

                    setMasterId(masterData.master_id);
                    setBio(masterData.bio || ""); // Завантажуємо біографію

                    // Завантажуємо вільний час
                    const freeTimeResponse = await api.get(`/masters/${masterData.master_id}/free-times`);
                    setFreeTimes(Array.isArray(freeTimeResponse.data) ? freeTimeResponse.data : []);

                    // Завантажуємо клієнтів
                    const clientsResponse = await api.get(`/masters/${masterData.master_id}/appointments`);
                    setClients(clientsResponse.data);
                } else if (role === "client") {
                    const appointmentsResponse = await api.get(`/bookings/client/${userId}/appointments`);
                    setAppointments(appointmentsResponse.data);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, [role, userId]);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setRole("guest");
        setUserId(null);
        window.location.href = "/";
    };

    const handleDeleteAccount = async () => {
        try {
            await api.delete(`/users/${userId}`);
            alert("Account deleted successfully.");
            handleLogout();
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    const handleBioUpdate = async () => {
        if (!masterId) return;

        try {
            await api.put(`/masters/${masterId}/bio`, { bio });
            alert("Bio updated successfully.");
        } catch (error) {
            console.error("Error updating bio:", error);
        }
    };

    const handleAddFreeTime = async () => {
        if (!newFreeTime || !masterId) return;

        try {
            await api.post(`/masters/${masterId}/free-times`, { free_time: newFreeTime });
            const updatedFreeTimes = await api.get(`/masters/${masterId}/free-times`);
            setFreeTimes(updatedFreeTimes.data.free_times || []); // Оновлюємо список

            setNewFreeTime(""); // Очищаємо інпут
            alert("Free time added/updated successfully.");
        } catch (error) {
            console.error("Error updating free time:", error);
        }
    };


    const handleCancelAppointment = async (appointmentId: number) => {
        try {
            await api.delete(`/bookings/${appointmentId}`);
            if (role === "master") {
                setClients(clients.filter((appt) => appt.id !== appointmentId));
            } else if (role === "client") {
                setAppointments(appointments.filter((appt) => appt.id !== appointmentId));
            }
            alert("Appointment cancelled successfully.");
        } catch (error) {
            console.error("Error cancelling appointment:", error);
        }
    };

    return (
        <>
            <Header isAuthenticated={true} />
            <ProfileContainer>
                <InfoSection>
                    <h2>Your profile</h2>
                    {userInfo && (
                        <>
                            <p>
                                {userInfo.first_name} {userInfo.last_name},{" "}
                                {userInfo.age !== "N/A" ? `${userInfo.age} years` : "Age not specified"}
                            </p>
                            <p>Phone: {userInfo.phone_number}</p>
                            <p>Email: {userInfo.email}</p>
                            {role === "master" && (
                                <>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Write your bio here"
                                        style={{ width: "100%", marginTop: "10px" }}
                                    />
                                    <button onClick={handleBioUpdate} style={{ marginTop: "10px" }}>
                                        Update Bio
                                    </button>
                                </>
                            )}
                        </>
                    )}
                    <ButtonGroup>
                        <button onClick={handleDeleteAccount}>Delete</button>
                        <button onClick={handleLogout}>Exit</button>
                    </ButtonGroup>
                </InfoSection>

                {role === "master" && (
                    <>
                        <FreeTimeSection>
                            <h2>Your Free Time</h2>
                            <p>Enter free times separated by commas (e.g., 2025-02-02 08:00, 09:00, 10:00)</p>
                            <ul>
                                {Array.isArray(freeTimes) && freeTimes.map((time, index) => (
                                    <li key={index}>{time}</li>
                                ))}
                            </ul>

                            <input
                                type="text"
                                value={newFreeTime}
                                onChange={(e) => setNewFreeTime(e.target.value)}
                                placeholder="Enter free times separated by commas"
                            />
                            <button onClick={handleAddFreeTime}>Add Free Time</button>
                        </FreeTimeSection>


                        <AppointmentSection>
                            <h2>Your Clients</h2>
                            {clients.length > 0 ? (
                                clients.map((appt) => (
                                    <AppointmentCard key={appt.id}>
                                        <p>
                                            <strong>Client Name:</strong> {appt.client_name}
                                        </p>
                                        <p>
                                            <strong>Date & Time:</strong>{" "}
                                            {new Date(appt.booking_datetime).toLocaleString()}
                                        </p>
                                        <button onClick={() => handleCancelAppointment(appt.id)}>
                                            Cancel Appointment
                                        </button>
                                    </AppointmentCard>
                                ))
                            ) : (
                                <p>No clients have booked yet.</p>
                            )}
                        </AppointmentSection>
                    </>
                )}

                {role === "client" && (
                    <AppointmentSection>
                        <h2>Your Appointments</h2>
                        {appointments.length > 0 ? (
                            appointments.map((appt) => (
                                <AppointmentCard key={appt.id}>
                                    <p>
                                        <strong>Master Name:</strong> {appt.master_name}
                                    </p>
                                    <p>
                                        <strong>Date & Time:</strong>{" "}
                                        {new Date(appt.booking_datetime).toLocaleString()}
                                    </p>
                                    <button onClick={() => handleCancelAppointment(appt.id)}>
                                        Cancel Appointment
                                    </button>
                                </AppointmentCard>
                            ))
                        ) : (
                            <p>You have no appointments yet.</p>
                        )}
                    </AppointmentSection>
                )}
            </ProfileContainer>
        </>
    );
};

export default ProfilePage;
