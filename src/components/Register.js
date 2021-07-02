import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export default function Register({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  async function signupUser(user) {
    return fetch('http://localhost:3000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(data => data.json())
   }

   const handleSubmit = async e => {
    e.preventDefault();
    const token = await signupUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <div className="register-wrapper">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}


Register.propTypes = {
  setToken: PropTypes.func.isRequired
}