import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
    const [input, setInputs] = useState({});
    const navigate = useNavigate(); // Changed from history to navigate
    const id = useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:5000/users/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.user));
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios
            .put(`http://localhost:5000/users/${id}`, {
                Firstname: String(input.Firstname),
                Lastname: String(input.Lastname),
                age: Number(input.age),
                country: String(input.country),
                Email: String(input.Email),
            })
            .then((res) => res.data);
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input);
        await sendRequest().then(() =>
            navigate('/userdetails')
        ); // Changed from history to navigate
    };

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <label>Firstname:</label>
                <br />
                <input
                    type="text"
                    name="Firstname"
                    onChange={handleChange}
                    value={input.Firstname || ''}
                    required
                />
                <br />
                <br />
                <label>Lastname:</label>
                <br />
                <input
                    type="text"
                    name="Lastname"
                    onChange={handleChange}
                    value={input.Lastname || ''}
                    required
                />
                <br />
                <br />
                <label>Age:</label>
                <br />
                <input
                    type="text"
                    name="age"
                    onChange={handleChange}
                    value={input.age || ''}
                    required
                />
                <br />
                <br />
                <label>Country:</label>
                <br />
                <input
                    type="text"
                    name="country"
                    onChange={handleChange}
                    value={input.country || ''}
                    required
                />
                <br />
                <br />
                <label>Email:</label>
                <br />
                <input
                    type="email"
                    name="Email"
                    onChange={handleChange}
                    value={input.Email || ''}
                    required
                />
                <br />
                <br />
                <button type="submit">Submit</button>
                {/* Added type attribute */}
            </form>
        </div>
    );
}

export default UpdateUser;
