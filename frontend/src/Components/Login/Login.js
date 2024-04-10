import React, { useState } from 'react'
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const history =useNavigate();
    const [user ,setUser] =useState({
       
        Email:"",
        Password:"",
    });
    const handleInputChange =(e) => {
        const{name,value} =e.target;
        setUser((prevUser) => ({...prevUser,[name]:value}));
    };
    const handleSubmit =async (e) => {
        e.preventDefault();
       try{
        const response = await sendRequest();
        if(response.status === "ok"){
            alert("Login Success");
            history("/userdetails");
        }else{
            alert("Login Error")
        }
       }catch(err){
        alert("error"+ err.message);
       }
    };

    const sendRequest =async()=>{
        return axios
        .post("http://localhost:5000/login",{
            Email:user.Email,
            Password:user.Password,
        })
        .then((res)=> res.data);
    };

  return (
    <div><Nav/>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label><br></br>
        <input type ='text'  value={user.Email}  onChange={handleInputChange} name='Email' required></input><br></br><br></br>
        <label>Password</label><br></br>
        <input type ='text'  value={user.Password}  onChange={handleInputChange} name='Password' required></input><br></br><br></br>
        <button>Login</button>

      </form>
    </div>
  )
}

export default Login
