import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import User from "../User/User";
import { useReactToPrint } from "react-to-print";
import "../UserDetails/Users.css";
import "./Users.css";

const URL = "http://localhost:5000/api/users";

// Function to fetch users from the API
const fetchUsers = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.users || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  // Function to load users
  const loadUsers = () => {
    fetchUsers().then((data) => {
      setUsers(data);
      setNoResults(data.length === 0);
    });
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Users Report",
    onAfterPrint: () => console.log("Users Report Successfully Downloaded !"),
  });

  const handleSearch = () => {
    fetchUsers().then((data) => {
      const filteredUsers = data.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  };

  const handleSendReport = () => {
    const phonenumber = "+94714153371";
    const message = "Selected User Report";
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phonenumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(WhatsAppUrl, "_blank");
  };

  return (
    <div className="my-2">
    <div className="ful_detail_box">
        <h1 className="topic_auth">
            User <span className="sub_auth">Details</span>
        </h1>
        <div className="d-flex">
            <button
                onClick={() => (window.location.href = "/Adduser")}
                className="btn btn-primary btn_dash_admin"
                style={{fontSize:''}}
            >
                Add User
            </button>
            <div className="input-group">
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    className="form-control "
                    name="Search"
                   
                    placeholder="Search User Details"
                />
                <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <button
                className="btn btn-primary btn_dash_admin"
                onClick={handlePrint}
            >
                Download Report
            </button>
        </div>
        {noResults ? (
            <div className="no-results">
                <h1>No users available</h1>
            </div>
        ) : (
            <div ref={ComponentsRef}>
                <table className="table table-striped table_details_admin">
                    <thead>
                        <tr>
                            <th className="admin_tbl_th">id</th>
                            <th className="admin_tbl_th">First Name</th>
                            <th className="admin_tbl_th">Last Name</th>
                            <th className="admin_tbl_th">Age</th>
                            <th className="admin_tbl_th">Country</th>
                            <th className="admin_tbl_th">Email</th>
                            <th className="admin_tbl_th">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <User key={i} user={user} />
                        ))}
                    </tbody>
                </table>
                <br />
                <button
                    className="btn btn-primary btn_dash_admin"
                    onClick={handleSendReport}
                >
                    Send Message
                </button>
            </div>
        )}
    </div>
</div>

  );
}

export default Users;
