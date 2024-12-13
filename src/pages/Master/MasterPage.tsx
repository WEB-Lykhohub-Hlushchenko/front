import React, { useState } from "react";
import {
    MasterPageContainer,
    MasterInfo,
    AppointmentSection,
    TimeSlot,
    ConfirmButton,
    AppointmentDetails,
} from "./MasterPage.styles";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";

const MasterPage: React.FC = () => {
    const { isAuthenticated } = useAuth();

    // Дані про майстра
    const master = {
        name: "Anna Bennett",
        age: 26,
        specialty: "Nails",
        about: "With over 8 years of experience, Anna specializes in nail art and creative designs. She's known for her attention to detail and uses high-quality products to ensure nails are both beautiful and healthy.",
        rating: 4.8,
        availableTimes: [
            "08:00", "09:00", "10:00", "11:00", "12:00",
            "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
        ],
    };

    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleAppointment = () => {
        if (selectedTime) {
            console.log(`Appointment confirmed at ${selectedTime}`);
            alert(`You are successfully booked at ${selectedTime}`);
        }
    };

    return (
        <>
            <Header isAuthenticated={isAuthenticated} />
            <MasterPageContainer>
                {/* Інформація про майстра */}
                <MasterInfo>
                    <div>
                        <h2>{master.name}</h2>
                        <p><strong>Age:</strong> {master.age}</p>
                        <p><strong>Speciality:</strong> {master.specialty}</p>
                        <p><strong>Rating:</strong> {master.rating} ❤️</p>
                        <p>{master.about}</p>
                    </div>
                </MasterInfo>

                {/* Секція запису */}
                <AppointmentSection>
                    <h3>Select appointment time</h3>
                    <div>
                        {master.availableTimes.map((time, index) => (
                            <TimeSlot
                                key={index}
                                onClick={() => handleTimeSelect(time)}
                                isSelected={selectedTime === time}
                            >
                                {time}
                            </TimeSlot>
                        ))}
                    </div>
                    <ConfirmButton onClick={handleAppointment}>
                        Make an Appointment
                    </ConfirmButton>
                </AppointmentSection>

                {/* Деталі запису */}
                {selectedTime && (
                    <AppointmentDetails>
                        <h3>Information about appointment:</h3>
                        <p><strong>Address:</strong> 123 Maple Street</p>
                        <p><strong>Date and time:</strong> 27 November, {selectedTime}</p>
                        <p>
                            By clicking "Make an Appointment," you agree to Harmony Studio's
                            <a href="/terms"> terms and policies</a>.
                        </p>
                    </AppointmentDetails>
                )}
            </MasterPageContainer>
        </>
    );
};

export default MasterPage;
