import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const history = useNavigate();
    const [user, setUser] = useState({
        Email: "",
        Password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest();
            if (response.token) {
                localStorage.setItem('token', response.token); // Store token in localStorage
                alert("Login Success");
                history.push("/userdetails");
            } else {
                alert("Invalid credentials. Please try again.");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const sendRequest = async () => {
        return axios
            .post("http://localhost:5000/login", {
                Email: user.Email,
                Password: user.Password,
            })
            .then((res) => res.data);
    };

    return (
        <div>
            <Nav />
            <h1>User Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input type='text' value={user.Email} onChange={handleInputChange} name='Email' required /><br /><br />
                <label>Password</label><br />
                <input type='password' value={user.Password} onChange={handleInputChange} name='Password' required /><br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
