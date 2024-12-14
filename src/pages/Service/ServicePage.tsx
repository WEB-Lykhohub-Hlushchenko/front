import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    ServicePageContainer,
    BackgroundImage,
    ServiceHeader,
    ServiceDescriptionBox,
    SpecialistContainer,
    SpecialistCard,
    SeeMoreButton,
} from "./ServicePage.styles";
import api from "../../api"; // axios instance for API requests
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";

interface Specialist {
    id: number;
    name: string;
    age: number;
    bio: string;
    image: string;
}

interface Service {
    id: number;
    name: string;
    description: string;
    specialists: Specialist[];
}

const ServicePage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const [service, setService] = useState<Service | null>(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await api.get(`/services/${serviceId}`);
                setService(response.data);
            } catch (error) {
                console.error("Failed to fetch service:", error);
            }
        };

        fetchService();
    }, [serviceId]);

    if (!service) {
        return <p>Service not found</p>;
    }

    return (
        <>
            <Header isAuthenticated={isAuthenticated} />
            <ServicePageContainer>
                <BackgroundImage src={require("../../assets/images/services-background.jpg")} />
                <ServiceHeader>
                    <h1>{service.name}</h1>
                </ServiceHeader>
                <ServiceDescriptionBox>
                    <p>{service.description}</p>
                </ServiceDescriptionBox>
                <SpecialistContainer>
                    {service.specialists.map((specialist) => (
                        <SpecialistCard key={specialist.id}>
                            <img src={specialist.image} alt={specialist.name} />
                            <h3>{specialist.name}</h3>
                            <p>Age: {specialist.age}</p>
                            <p>{specialist.bio}</p>
                            <SeeMoreButton onClick={() => console.log(`View specialist ${specialist.id}`)}>
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
