import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../profile/UserContext";
import "./EditUserForm.css"; // Import the CSS file

const EditUserForm = ({ updateUser }) => {
    const navigate = useNavigate();
    const { currentUser, token, userInfoLoaded } = useContext(UserContext);

    let INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token && currentUser) {
            INITIAL_STATE = {
                password: "",
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email
            };
            setFormData(INITIAL_STATE);
        }
    }, [currentUser]);

    if (!currentUser && userInfoLoaded) {
        return <Navigate replace to="/login" />;
    }

    const handleSubmit = async evt => {
        evt.preventDefault();

        const profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        };

        // updateUser(profileData);
        // setFormData(INITIAL_STATE);
        // navigate("/");

        try {
            await updateUser(profileData);
            setError(null); // Clear error if update is successful
            setFormData(INITIAL_STATE);
            navigate("/");
        } catch (error) {
            setError("Incorrect username or password."); // Set error message
        }
    };

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    return (
        <div className="page-container">
            <form className="EditForm"onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username" className="label">
                        Username
                    </label>
                    <p className="form-control-plaintext">{currentUser ? currentUser.username : ""}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="password" className="label">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input"
                        type="password"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="firstName" className="label">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="lastName" className="label">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email" className="label">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                    />
                </div>

                {error && <div className="error-message">{error}</div>} {/* Display error message */}
                
                <button>Submit</button>
            </form>
        </div>
    );
};

export default EditUserForm;
