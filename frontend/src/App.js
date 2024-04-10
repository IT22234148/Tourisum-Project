import React from 'react';
import { Route,Routes } from "react-router";
import './App.css';
import Home from "./Components/Home/Home";
import  AddUser from "./Components/AddUser/AddUser";
import Users from "./Components/UserDetails/Users";
import UpdateUsers from "./Components/UpdateUser/UpdateUser";
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';

function App() {
  return (
    <div>
 
    <React.Fragment>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path ="/mainhome" element={<Home/>}/>
        <Route path ="/Adduser" element={<AddUser/>}/>
        <Route path ="/userdetails" element={<Users/>}/>
        <Route path ="/regi" element={<Register/>}/>
        <Route path ="/log" element={<Login/>}/>
        <Route path ="/profile" element={<Profile/>}/>
        <Route path ="/profile/:id" element={<UpdateProfile/>}/>
        <Route path ="/userdetails/:id" element={<UpdateUsers/>}/>
      </Routes>
    </React.Fragment>
    </div>
  );
}

export default App;
