import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    Firstname: '',
    Lastname: '',
    age: '',
    country: '',
    Email: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected spelling
    console.log(inputs);
    await sendRequest().then(() => history('/userdetails')); // Corrected typo in route
  };

  const sendRequest = async () => {
    await axios.post('http://localhost:5000/users', {
      Firstname: String(inputs.Firstname),
      Lastname: String(inputs.Lastname),
      age: Number(inputs.age),
      country: String(inputs.country),
      Email: String(inputs.Email),
    }).then(res => res.data);
  };

  return (
    <div>
      <Nav />
      <h1>Add user</h1>
      <form onSubmit={handleSubmit}>
        <label>Firstname:</label>
        <br />
        <input type="text" name="Firstname" onChange={handleChange} value={inputs.Firstname} required />
        <br /><br />
        <label>Lastname:</label>
        <br />
        <input type="text" name="Lastname" onChange={handleChange} value={inputs.Lastname} required />
        <br /><br />
        <label>Age:</label>
        <br />
        <input type="text" name="age" onChange={handleChange} value={inputs.age} required />
        <br /><br />
        <label>Country:</label>
        <br />
        <input type="text" name="country" onChange={handleChange} value={inputs.country} required />
        <br /><br />
        <label>Email:</label>
        <br />
        <input type="email" name="Email" onChange={handleChange} value={inputs.Email} required />
        <br /><br />
        <button type="submit">Submit</button> {/* Added type attribute */}
      </form>
    </div>
  );
}

export default AddUser;
