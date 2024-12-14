import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

interface Master {
    id: string;
    name: string;
    age: number;
    specialty: string;
    about: string;
    rating: number;
    availableTimes: string[];
    address: string;
}

const MasterPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const { masterId } = useParams<{ masterId: string }>();
    const [master, setMaster] = useState<Master | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    useEffect(() => {
        // Запит даних майстра з API
        const fetchMaster = async () => {
            try {
                const response = await fetch(`/api/masters/${masterId}`);
                const data = await response.json();
                setMaster(data);
            } catch (error) {
                console.error("Error fetching master data:", error);
            }
        };

        fetchMaster();
    }, [masterId]);

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleAppointment = () => {
        if (selectedTime) {
            alert(`You are successfully booked at ${selectedTime}`);
            console.log(`Appointment confirmed at ${selectedTime}`);
        }
    };

    if (!master) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header isAuthenticated={isAuthenticated} />
            <MasterPageContainer>
                {/* Інформація про майстра */}
                <MasterInfo>
                    <div>
                        <h2>{master.name}</h2>
                        <p><strong>Age:</strong> {master.age}</p>
                        <p><strong>Specialty:</strong> {master.specialty}</p>
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
                        <p><strong>Address:</strong> {master.address}</p>
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
