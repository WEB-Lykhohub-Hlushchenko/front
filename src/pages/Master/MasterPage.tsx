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

const MasterPage: React.FC = () => {
    const { isAuthenticated, userId } = useAuth(); // Додаємо userId з контексту
    const { masterId } = useParams<{ masterId: string }>();
    const [master, setMaster] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [timeslots] = useState([
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    ]);

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                const masterResponse = await fetch(`http://127.0.0.1:5000/masters/${masterId}`);
                const masterData = await masterResponse.json();
                setMaster(masterData);
            } catch (error) {
                console.error("Error fetching master data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMasterData();
    }, [masterId]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        setSelectedTime("");
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleAppointment = async () => {
        if (!isAuthenticated) {
            alert("You must be logged in to make an appointment.");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDateObj = new Date(selectedDate);

        if (!selectedDate || selectedDateObj < today) {
            alert("Please select a valid future date.");
            return;
        }

        if (!selectedTime) {
            alert("Please select a time for your appointment.");
            return;
        }

        // Формуємо `service_id` з даних майстра
        const bookingData = {
            user_id: 19, // Отримайте з AuthContext або глобального стейту
            master_id: master.id,
            service_id: master.service_id, // Додаємо service_id
            booking_datetime: `${selectedDate} ${selectedTime}`,
            status: "pending",
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/bookings/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                alert(`Appointment confirmed for ${selectedDate} at ${selectedTime}`);
                console.log("Booking successful:", await response.json());
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert("Failed to make an appointment: " + errorData.error);
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("An error occurred while making the appointment.");
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    if (!master) {
        return <p>Master not found.</p>;
    }

    return (
        <>
            <Header isAuthenticated={isAuthenticated} />
            <MasterPageContainer>
                <h1>Specialist Page</h1>
                <MasterInfo>
                    <div>
                        <h2>{master.first_name} {master.last_name}</h2>
                        <p><strong>Phone:</strong> {master.phone_number}</p>
                        <p><strong>Email:</strong> {master.email}</p>
                        <p><strong>Bio:</strong> {master.bio || "No bio available"}</p>
                    </div>
                </MasterInfo>

                {/* Перевірка авторизації перед відображенням секції */}
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
                                {timeslots.map((time) => (
                                    <TimeSlot
                                        key={time}
                                        isSelected={selectedTime === time}
                                        onClick={() => handleTimeSelect(time)}
                                    >
                                        {time}
                                    </TimeSlot>
                                ))}
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
