import React, { useState, useEffect} from 'react';
import axios from "axios";
import Addprofile from '../Addprofile/Addprofile';


const URL = "http://localhost:5000/regi";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function Profile() {

  const [regi, setUsers] = useState();

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.regi));
  }, []);


  return (
    <div>
      <h1>Profile Dashboard</h1>
      <div>
      {regi && regi.map((regi, i) => (
            <div key={i} className="user">
              <Addprofile regi={regi} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Profile
