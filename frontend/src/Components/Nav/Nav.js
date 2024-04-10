import React from 'react'
import '../Nav/nav.css';
import {Link} from "react-router-dom";

function Nav() {
  return (
    <div>
    <ul  className='home-ul'>
        <li className="home-li">
          <Link to ="/mainhome">
            <h1>Home</h1>
            </Link>
        </li>
        <li className="home-li">
        <Link to ="/Adduser">
           <h1>Add User</h1>
            </Link>
        </li>
        <li className="home-li">
        <Link to ="/userdetails">
            <h1>user details</h1>
        </Link>
        </li>   
        <li className="home-li">
        <Link to ="/profile">
            <h1>Dashboard</h1>
        </Link>
        </li>   
        <li className="home-li">
        <Link to ="/regi">
            <button>Register</button>
        </Link>
        </li>   
        <li className="home-li">
        <Link to ="/log">
            <button>Login</button>
        </Link>
        </li>   
    </ul>
    </div>
  )
}

export default Nav
