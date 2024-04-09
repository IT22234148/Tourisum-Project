import React, { useState } from 'react'
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const history =useNavigate();
    const [user ,setUser] =useState({
        Firstname:"",
        Lastname:"",
        Age:"",
        Country:"",
        Email:"",
        Password:"",
    });
    const handleInputChange =(e) => {
        const{name,value} =e.target;
        setUser((prevUser) => ({...prevUser,[name]:value}));
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        sendRequest()
        .then(()=>{
            alert("Regisration Success");
            history("/profile")
        })
        .catch((err) =>{
            alert(err.message);
        });
    };

    const sendRequest =async()=>{
        await axios.post("http://localhost:5000/register",{
            Firstname:String(user.Firstname),
            Lastname:String(user.Lastname),
            Age:String(user.Age),
            Country:String(user.Country),
            Email:String(user.Email),
            Password:String(user.Password),
        })
        .then((res)=> res.data);
    };

  return (
    <div>
        <Nav/>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>Firstname</label><br></br>
        <input type ='text' value={user.Firstname} onChange={handleInputChange} name='Firstname' required></input><br></br><br></br>
        <label>Lastname</label><br></br>
        <input type ='text'  value={user.Lastname}  onChange={handleInputChange} name='Lastname' required></input><br></br><br></br>
        <label>Age</label><br></br>
        <input type ='text'  value={user.Age}  onChange={handleInputChange} name='Age' required></input><br></br><br></br>
        <label>Country</label><br></br>
        <input type ='text'  value={user.Country} onChange={handleInputChange} name='Country' required></input><br></br><br></br>
        <label>Email</label><br></br>
        <input type ='text'  value={user.Email}  onChange={handleInputChange} name='Email' required></input><br></br><br></br>
        <label>Password</label><br></br>
        <input type ='text'  value={user.Password}  onChange={handleInputChange} name='Password' required></input><br></br><br></br>
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register
