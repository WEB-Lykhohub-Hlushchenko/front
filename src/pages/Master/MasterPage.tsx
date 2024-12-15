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
    const { masterId } = useParams<{ masterId: string }>();
    const [master, setMaster] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [freeTimes, setFreeTimes] = useState<string[]>([]);

    const today = new Date().toISOString().split("T")[0];

    // Fetch master data and free times
    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                // Отримуємо інформацію про майстра
                const masterResponse = await fetch(`http://127.0.0.1:5000/masters/${masterId}`);
                const masterData = await masterResponse.json();
                setMaster(masterData);

                // Отримуємо доступний вільний час
                const freeTimeResponse = await fetch(`http://127.0.0.1:5000/masters/${masterId}/free-times`);
                const freeTimeData = await freeTimeResponse.json();
                setFreeTimes(freeTimeData.free_times || []); // Витягуємо free_times з об'єкта
            } catch (error) {
                console.error("Error fetching data:", error);
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
        if (!isAuthenticated || !userId) {
            alert("You must be logged in to make an appointment.");
            return;
        }

        if (!selectedDate || !selectedTime) {
            alert("Please select a valid date and time for your appointment.");
            return;
        }
        const masterIdResponse = await api.get(`/masters/${userId}`)


        const bookingData = {
            user_id: userId,
            master_id: masterIdResponse.data.master_id,
            service_id: masterIdResponse.data.service_id,
            booking_datetime: `${selectedDate} ${selectedTime}`,
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
            } else {
                const errorData = await response.json();
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

    const availableTimes = freeTimes.filter((time) =>
        time.startsWith(selectedDate)
    );

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
                                        const displayTime = time.split(" ")[1]; // Відображаємо тільки час
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
