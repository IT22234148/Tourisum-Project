import React, { useState, useEffect, useRef } from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import User from "../User/User";
import { useReactToPrint } from "react-to-print";
import "../UserDetails/users.css"; // Importing the CSS file

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function Users() {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Users Report",
    onafterprint: () => ("Users Report Sucessfully Downloaded !")
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        ))
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);

    });
  }

  return (
    <div>
      <Nav />
      <h1>User Details Display Page</h1>
      <input onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="Search"
        placeholder="Search User Details"
      ></input>

      <button onClick={handleSearch}>Search</button>

      {noResults ? (
        <div className="no-results">
          <p>No User Found</p>
        </div>
      ) : (

        <div className="user-list" ref={ComponentsRef}>
          {users && users.map((user, i) => (
            <div key={i} className="user">
              <User user={user} />
            </div>
          ))}
        </div>
      )}
      <button className="download-button" onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default Users;
