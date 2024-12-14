import React from "react";
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
import { servicesData } from "../../data/servicesData";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";

const ServicePage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const service = servicesData[serviceId as keyof typeof servicesData];

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
                <BackgroundImage>
                    <img src={require("../../assets/images/services-background.jpg")}/>
                </BackgroundImage>

                <ServiceHeader>
                    <h1>{service.title}</h1>
                </ServiceHeader>

                <ServiceDescriptionBox>
                    <p>{service.description}</p>
                    <ul>
                        {service.details.map((detail: string, index: number) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </ServiceDescriptionBox>

                <SpecialistContainer>
                    {service.specialists.map((specialist, index) => (
                        <SpecialistCard key={index}>
                            <img src={specialist.image} alt={specialist.name} />
                            <h3>{specialist.name}</h3>
                            <p>{specialist.age} years</p>
                            {/*<p>Rating: {specialist.rating} ❤️</p>*/}
                            <SeeMoreButton onClick={() => handleSeeMoreClick(specialist.name)}>
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
