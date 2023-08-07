import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "./LoginForm.css";



const LoginForm = ({ loginUser }) => {

    const INITIAL_STATE = { username: "", password: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        try{
            await loginUser(formData);
            setFormData(INITIAL_STATE);
            console.log(`login successful`)
            navigate('/');
        
        }catch(e){
            alert(e)
            setFormData(INITIAL_STATE);
        } 
    }

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    return (
        <div className="page-container">
            <form className="LoginForm" onSubmit={handleSubmit}>
            <h1> Login </h1>
                <div className="input-container">
                    <label htmlFor="username" className="label">Username</label>
                    <input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="input"
                        placeholder="Username"
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password" className="label">Password</label>
                    <input
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        className="input"
                        placeholder="Password"
                    />
                </div>

                 <button>Submit</button>
            </form>
        </div>
     );
 };

export default LoginForm;

