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
    const [masterId, setMasterId] = useState<number | null>(null); // Додаємо masterId
    const [appointments, setAppointments] = useState<any[]>([]);
    const [freeTimes, setFreeTimes] = useState<string[]>([]);
    const [bio, setBio] = useState<string>("");
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
                const response = await api.get(`/users/${userId}`);
                const data = response.data;

                setUserInfo({
                    ...data,
                    age: data.date_of_birth ? calculateAge(data.date_of_birth) : "N/A",
                });

                if (role === "master") {
                    // Fetch the masterId
                    const masterResponse = await api.get(`/masters/${userId}`);
                    setMasterId(masterResponse.data.master_id);

                    // Fetch free times and clients only after masterId is set
                    if (masterResponse.data.master_id) {
                        const freeTimeResponse = await api.get(`/masters/${masterResponse.data.master_id}/free-times`);
                        setFreeTimes(Array.isArray(freeTimeResponse.data) ? freeTimeResponse.data : []); // Гарантуємо масив

                        const clientsResponse = await api.get(`/masters/${masterResponse.data.master_id}/appointments`);

                        setClients(clientsResponse.data);
                        setBio(data.bio || "");
                    }
                } else if (role === "client") {
                    const appointmentsResponse = await api.get(`/clients/${userId}/appointments`);
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
            setFreeTimes([...freeTimes, newFreeTime]);
            setNewFreeTime("");
            alert("Free time added successfully.");
        } catch (error) {
            console.error("Error adding free time:", error);
        }
    };

    const handleCancelClientAppointment = async (appointmentId: number) => {
        try {
            await api.delete(`/bookings/${appointmentId}`);
            setClients(clients.filter((appt) => appt.id !== appointmentId));
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
                                    />
                                    <button onClick={handleBioUpdate} style={{ marginTop: "10px" }}>
                                        OK
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
                            <ul>
                                {Array.isArray(freeTimes) && freeTimes.map((time, index) => (
                                    <li key={index}>{time}</li>
                                ))}
                            </ul>

                            <input
                                type="text"
                                value={newFreeTime}
                                onChange={(e) => setNewFreeTime(e.target.value)}
                                placeholder="Add free time (e.g., 12.12.2024 09:00)"
                            />
                            <button onClick={handleAddFreeTime}>Add</button>
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
                                        <button onClick={() => handleCancelClientAppointment(appt.id)}>
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
            </ProfileContainer>
        </>
    );
};

export default ProfilePage;
