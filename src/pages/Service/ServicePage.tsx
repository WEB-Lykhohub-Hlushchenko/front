import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ServicePageContainer,
    BackgroundImage,
    ServiceHeader,
    ServiceDescriptionBox,
    SpecialistContainer,
    SpecialistCard,
    SeeMoreButton,
} from "./ServicePage.styles";
import axios from "axios";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";

interface Specialist {
    id: string;
    name: string;
    age: number;
    image: string;
    // rating?: number; // Додайте, якщо необхідно
}

interface Service {
    id: string;
    title: string;
    description: string;
    details: string[];
    specialists: Specialist[];
}

const ServicePage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Завантаження даних про конкретну послугу з бекенду
        axios
            .get(`http://127.0.0.1:5000/api/services/${serviceId}`) // API-ендпоінт
            .then((response) => {
                setService(response.data); // Передбачається, що бекенд повертає один об'єкт послуги
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching service data:", error);
                setLoading(false);
            });
    }, [serviceId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!service) {
        return <p>Service not found</p>;
    }

    const handleSeeMoreClick = (specialistId: string) => {
        navigate(`/specialist/${specialistId}`);
    };

    return (
        <>
            <Header isAuthenticated={isAuthenticated} />

            <ServicePageContainer>
                <BackgroundImage
                    src={require("../../assets/images/services-background.jpg")}
                    alt="Background"
                />

                <ServiceHeader>
                    <h1>{service.title}</h1>
                </ServiceHeader>

                <ServiceDescriptionBox>
                    <p>{service.description}</p>
                    <ul>
                        {service.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </ServiceDescriptionBox>

                <SpecialistContainer>
                    {service.specialists.map((specialist) => (
                        <SpecialistCard key={specialist.id}>
                            <img src={specialist.image} alt={specialist.name} />
                            <h3>{specialist.name}</h3>
                            <p>{specialist.age} years</p>
                            {/*<p>Rating: {specialist.rating} ❤️</p>*/}
                            <SeeMoreButton onClick={() => handleSeeMoreClick(specialist.id)}>
                                See more
                            </SeeMoreButton>
                        </SpecialistCard>
                    ))}
                </SpecialistContainer>
            </ServicePageContainer>
        </>
    );
};

export default ServicePage;
