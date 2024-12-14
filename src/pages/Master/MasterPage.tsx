import React, { useState, useEffect } from "react";
import {
    MasterPageContainer,
    MasterInfo,
} from "./MasterPage.styles";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const MasterPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const { masterId } = useParams<{ masterId: string }>();
    const [master, setMaster] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                const masterResponse = await fetch(`/masters/${masterId}`);
                const masterData = await masterResponse.json();
                setMaster(masterData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching master data:", error);
                setLoading(false);
            }
        };

        fetchMasterData();
    }, [masterId]);

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
                <MasterInfo>
                    <div>
                        <h2>{master.first_name} {master.last_name}</h2>
                        <p><strong>Phone:</strong> {master.phone_number}</p>
                        <p><strong>Email:</strong> {master.email}</p>
                        <p><strong>Bio:</strong> {master.bio || "No bio available"}</p>
                    </div>
                </MasterInfo>
            </MasterPageContainer>
        </>
    );
};

export default MasterPage;
