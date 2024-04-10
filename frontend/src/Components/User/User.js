import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './user.css'; // Importing the CSS file

function User(props) {
  const {_id, Firstname, Lastname, age, country, Email} = props.user || {};

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/users/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history("/userdetails"));
  }

  return (
    <div className="user-container">
      <h1>User Display</h1>
      <div className="user-details">
        <div>
          <h1>Id:</h1>
          <p>{_id}</p>
          <h1>Name:</h1>
          <p>{Firstname}</p>
          <h1>Last:</h1>
          <p>{Lastname}</p>
        </div>
        <div>
          <h1>Age:</h1>
          <p>{age}</p>
          <h1>Country:</h1>
          <p>{country}</p>
          <h1>Email:</h1>
          <p>{Email}</p>
        </div>
      </div>
      <div className="user-actions">
        <Link to={`/userdetails/${_id}`}>Update</Link>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default User;
