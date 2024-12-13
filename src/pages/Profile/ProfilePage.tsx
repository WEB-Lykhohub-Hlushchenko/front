import React from "react";

interface ProfilePageProps {
    role: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ role }) => {
    return (
        <div>
            <h1>Profile Page</h1>
            <p>Role: {role}</p>
            <p>This is the profile page. Add your user or master profile information here.</p>
        </div>
    );
};

export default ProfilePage;
