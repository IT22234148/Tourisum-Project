import React, { useState } from 'react';

function Loginscreen() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  function login(e) {
    e.preventDefault();
    const user = {
      Email,
      Password,
    };
    console.log(user);
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label>Email</label><br />
        <input type='text' value={Email} onChange={(e) => { setEmail(e.target.value) }} name='Email' required /><br /><br />
        <label>Password</label><br />
        <input type='password' value={Password} onChange={(e) => { setPassword(e.target.value) }} name='Password' required /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Loginscreen;
