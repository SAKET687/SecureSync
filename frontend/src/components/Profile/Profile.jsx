import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";
import api from "../../utils/api.utils";

const Profile = () => {
    const { user, token, logout } = useAuth();
    const [profile, setProfile] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({
        name: user ? user.data.name : "",
        email: user ? user.data.email : "",
        phone: user ? user.data.phone : "",
        address: user ? user.data.address : "",
        newPassword: "",
        currentPassword: "",
    });

    useEffect(() => {
        if (user) {
            setProfile(user);
            setUpdatedProfile({
                name: user.data.name,
                email: user.data.email,
                phone: user.data.phone,
                address: user.data.address,
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handleProfileUpdate = async () => {
        try {
            await api.put(
                "/user/profile-updation",
                {
                    name: updatedProfile.name,
                    email: updatedProfile.email,
                    phone: updatedProfile.phone,
                    address: updatedProfile.address,
                    newPassword: updatedProfile.newPassword,
                    currentPassword: updatedProfile.currentPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedUser = await api.get("/user/fetch-profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProfile(updatedUser.data);
            setIsEditing(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                logout();
            }
        }
    };

    return (
        <div className="profile-container">
            {profile ? (
                <>
                    <h2 className="profile-title">
                        Welcome to SecureSync, {profile.data.name}!
                    </h2>
                    <div className="profile-info">
                        <p>
                            <strong>Name:</strong> {profile.data.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {profile.data.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {profile.data.phone}
                        </p>
                        <p>
                            <strong>Address:</strong> {profile.data.address}
                        </p>
                        <p>
                            <strong>User ID:</strong> {profile.data._id}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="profile-edit-btn"
                    >
                        Edit Profile
                    </button>
                    <button onClick={logout} className="profile-logout-btn">
                        Logout
                    </button>
                </>
            ) : (
                <h2>Please log in to view your profile.</h2>
            )}

            {isEditing && (
                <div className="profile-edit-popup">
                    <div className="popup-content">
                        <h3>Edit Profile</h3>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={updatedProfile.name || ""}
                            onChange={handleInputChange}
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={updatedProfile.email || ""}
                            onChange={handleInputChange}
                        />
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={updatedProfile.phone || ""}
                            onChange={handleInputChange}
                        />
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={updatedProfile.address || ""}
                            onChange={handleInputChange}
                        />
                        <label>Current Password:</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={updatedProfile.currentPassword || ""}
                            placeholder="Enter current password to set new password"
                            onChange={handleInputChange}
                        />
                        <label>New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={updatedProfile.newPassword || ""}
                            onChange={handleInputChange}
                        />
                        <button
                            onClick={handleProfileUpdate}
                            className="profile-update-btn"
                        >
                            Update Profile
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="profile-cancel-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
