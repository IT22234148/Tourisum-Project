import React, { useState } from 'react';
import axios from "axios";

function RegisterScreen() {
    const [user, setUser] = useState({
        Firstname: '',
        Lastname: '',
        Age: '',
        Country: '',
        Email: '',
        Password: '',
        ConfirmPassword: ''
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.Password === user.ConfirmPassword) {
            try {
                const response = await axios.post("http://localhost:5000/users");
                console.log(response.data);
                alert('User Registered Successfully');
            } catch (error) {
                console.error(error);
                alert('Registration Failed');
            }
        } else {
            alert('Passwords do not match');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Firstname</label><br />
                <input type='text' name='Firstname' value={user.Firstname} onChange={handleChange} required /><br /><br />
                <label>Lastname</label><br />
                <input type='text' name='Lastname' value={user.Lastname} onChange={handleChange} required /><br /><br />
                <label>Age</label><br />
                <input type='number' name='Age' value={user.Age} onChange={handleChange} required /><br /><br />
                <label>Country</label><br />
                <input type='text' name='Country' value={user.Country} onChange={handleChange} required /><br /><br />
                <label>Email</label><br />
                <input type='email' name='Email' value={user.Email} onChange={handleChange} required /><br /><br />
                <label>Password</label><br />
                <input type='password' name='Password' value={user.Password} onChange={handleChange} required /><br /><br />
                <label>Confirm Password</label><br />
                <input type='password' name='ConfirmPassword' value={user.ConfirmPassword} onChange={handleChange} required /><br /><br />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
}

export default RegisterScreen;
