import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewUserForm.css";

const NewUserForm = ({ registerUser }) => {
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();

 

    const handleSubmit = async (evt) => {
        evt.preventDefault();


        try {
            await registerUser(formData);
            setFormData(INITIAL_STATE);
            navigate(`/`);
        } catch(error) {
            alert(error);
            setFormData(INITIAL_STATE);
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
            
            <form className="SignupForm" onSubmit={handleSubmit}>
            <h1> Sign Up </h1>
                <div className="input-group">
                    
                    <label htmlFor="username" className="label" >
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="input"
                        placeholder="Username"
                    />
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
                        placeholder="Password"
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
                        placeholder="First Name"
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
                        placeholder="Last Name"
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
                        placeholder="Email"
                    />
                </div>

              

                <button>Submit</button>
            </form>
        </div>
    );
};

export default NewUserForm;
