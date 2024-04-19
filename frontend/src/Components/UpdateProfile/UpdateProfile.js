import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Register/regi.css";
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
        Firstname: String(input.Firstname),
        Lastname: String(input.Lastname),
        Age: String(input.Age),
        Country: String(input.Country),
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
    try {
      await sendRequest();
      // Show success message
      window.alert("Update successful!");
      // Navigate to the profile page
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      // Handle error if needed
      // You can show an error message or take other actions
    }
  };
  

  return (
    <div>
      <h1 className="topic_auth">
        Update User <span className="sub_auth">Account</span>
      </h1>
      <div className="form_main_box">
      <form className="form_user_details" onSubmit={handleSubmit}>
        <label className="auth_lable">Firstname</label>
        <br></br>
        <input
          className="auth_input"
          type="text"
          value={input.Firstname}
          onChange={handleChange}
          name="Firstname"
          required
        ></input>
        <br></br>
        <br></br>
        <label className="auth_lable">Lastname</label>
        <br></br>
        <input
          className="auth_input"
          type="text"
          value={input.Lastname}
          onChange={handleChange}
          name="Lastname"
          required
        ></input>
        <br></br>
        <br></br>
        <label className="auth_lable">Age</label>
        <br></br>
        <input
          className="auth_input"
          type="text"
          value={input.Age}
          onChange={handleChange}
          name="Age"
          required
        ></input>
        <br></br>
        <br></br>
        <label className="auth_lable">Country</label>
        <br></br>
        <input
          className="auth_input"
          type="text"
          value={input.Country}
          onChange={handleChange}
          name="Country"
          required
        ></input>
        <br></br>
        <br></br>
        <label className="auth_lable">Email</label>
        <br></br>
        <input
          className="auth_input"
          type="text"
          value={input.Email}
          onChange={handleChange}
          name="Email"
          required
        ></input>
        <br></br>

        <br></br>
        <button className="admin_form_cneter_btn">Update</button>
      </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
