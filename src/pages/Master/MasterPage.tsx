import React, { useState, useEffect } from "react";
import {
    MasterPageContainer,
    MasterInfo,
    AppointmentSection,
    TimeSlot,
    ConfirmButton,
} from "./MasterPage.styles";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import api from "../../api";

const MasterPage: React.FC = () => {
    const { isAuthenticated, userId } = useAuth();
    const { masterId } = useParams<{ masterId: string }>(); // Тут ід з URL (master_id)
    const [master, setMaster] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [freeTimes, setFreeTimes] = useState<string[]>([]);

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                setLoading(true);

                // Отримуємо user_id через masterId
                const masterMappingResponse = await api.get(`/masters`);
                const masterMapping = masterMappingResponse.data;

                const masterEntry = masterMapping.find((m: any) => m.id === parseInt(masterId || "0"));
                if (!masterEntry) {
                    throw new Error("Master not found");
                }
                const userIdFromMaster = masterEntry.user_id;

                // Отримуємо інформацію про майстра
                const masterResponse = await api.get(`/masters/${userIdFromMaster}`);
                setMaster(masterResponse.data);

                // Отримуємо доступний вільний час (фільтрований)
                const freeTimeResponse = await api.get(`/masters/${masterId}/free-times/filtered`);
                setFreeTimes(freeTimeResponse.data.free_times || []);
            } catch (error) {
                console.error("Error fetching master data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMasterData();
    }, [masterId]);


    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value || ""); // Гарантуємо, що значення не буде undefined
        setSelectedTime("");
    };

    const handleTimeSelect = (time: string | undefined) => {
        if (!time) return; // Перевіряємо, щоб time не був undefined
        setSelectedTime(time);
    };

    const handleAppointment = async () => {
        if (!isAuthenticated || !userId) {
            alert("You must be logged in to make an appointment.");
            return;
        }

        if (!selectedDate || !selectedTime) {
            alert("Please select a valid date and time for your appointment.");
            return;
        }

        const bookingData = {
            user_id: userId,
            master_id: master.master_id, // Використовуємо master_id з бекенду
            service_id: master.service_id,
            booking_datetime: `${selectedDate} ${selectedTime}`,
        };

        try {
            const response = await api.post("/bookings/", bookingData);
            if (response.status === 201) {
                alert(`Appointment confirmed for ${selectedDate} at ${selectedTime}`);
            } else {
                // Використовуємо response.data для обробки відповіді
                alert("Failed to make an appointment: " + response.data.error);
            }
        } catch (error: any) {
            console.error("Error making appointment:", error);
            if (error.response) {
                alert("Error: " + error.response.data.error);
            } else {
                alert("An error occurred while making the appointment.");
            }
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    if (!master) {
        return <p>Master not found.</p>;
    }

    const availableTimes = freeTimes.filter((time) => time.startsWith(selectedDate));


    return (
        <>
            <Header isAuthenticated={isAuthenticated} />
            <MasterPageContainer>
                <h1>Specialist Page</h1>
                <MasterInfo>
                    <div>
                        <h2>{master.first_name} {master.last_name}</h2>
                        <p><strong>Phone:</strong> {master.phone_number || "Not provided"}</p>
                        <p><strong>Email:</strong> {master.email || "Not provided"}</p>
                        <p><strong>Bio:</strong> {master.bio || "No bio available"}</p>
                    </div>
                </MasterInfo>

                {isAuthenticated ? (
                    <AppointmentSection>
                        <h3>Choose Date and Time for Appointment</h3>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            min={today}
                        />
                        {selectedDate && (
                            <div>
                                <h4>Available Timeslots:</h4>
                                {availableTimes.length > 0 ? (
                                    availableTimes.map((time) => {
                                        const displayTime = time.split(" ")[1]; // Витягуємо годину
                                        return (
                                            <TimeSlot
                                                key={time}
                                                isSelected={selectedTime === displayTime}
                                                onClick={() => handleTimeSelect(displayTime)}
                                            >
                                                {displayTime}
                                            </TimeSlot>
                                        );
                                    })
                                ) : (
                                    <p>No available times for this date.</p>
                                )}
                            </div>
                        )}

                        <ConfirmButton onClick={handleAppointment}>Make an Appointment</ConfirmButton>
                    </AppointmentSection>
                ) : (
                    <p style={{ textAlign: "center", color: "red" }}>
                        Please log in or sign up to make an appointment.
                    </p>
                )}
            </MasterPageContainer>
        </>
    );
};

export default MasterPage;
