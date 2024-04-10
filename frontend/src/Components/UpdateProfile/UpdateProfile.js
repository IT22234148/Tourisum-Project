import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function UpdateProfile() {

    const [input, setInputs] = useState({});
    const navigate = useNavigate(); // Changed from history to navigate
    const id = useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:5000/regi/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.regi));
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios
            .put(`http://localhost:5000/regi/${id}`, {
            Firstname:String(input.Firstname),
            Lastname:String(input.Lastname),
            Age:String(input.Age),
            Country:String(input.Country),
            Email:String(input.Email),
            Password:String(input.Password),
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
            navigate('/profile')
        ); // Changed from history to navigate
    };



  return (
    <div>
      <h1>Update Details</h1>
      <form onSubmit={handleSubmit}>
        <label>Firstname</label><br></br>
        <input type ='text' value={input.Firstname} onChange={handleChange} name='Firstname' required></input><br></br><br></br>
        <label>Lastname</label><br></br>
        <input type ='text'  value={input.Lastname}  onChange={handleChange} name='Lastname' required></input><br></br><br></br>
        <label>Age</label><br></br>
        <input type ='text'  value={input.Age}  onChange={handleChange} name='Age' required></input><br></br><br></br>
        <label>Country</label><br></br>
        <input type ='text'  value={input.Country} onChange={handleChange} name='Country' required></input><br></br><br></br>
        <label>Email</label><br></br>
        <input type ='text'  value={input.Email}  onChange={handleChange} name='Email' required></input><br></br><br></br>
        <label>Password</label><br></br>
        <input type ='text'  value={input.Password}  onChange={handleChange} name='Password' required></input><br></br><br></br>
        <button>Update</button>
      </form>
    </div>
  )
}

export default UpdateProfile
