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

// Storage { token: "{\"username\":\"jessica\",\"id\":\"60f4693bb257e62f88d26033\"}", length: 1 }
// -> Login
// Object { authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiamVzc2ljYSIsImlkIjoiNjBmNDY5M2JiMjU3ZTYyZjg4ZDI2MDMzIn0sImlhdCI6MTYyNjYzMDU2NCwiZXhwIjoxNjI3MjM1MzY0LCJzdWIiOiJqZXNzaWNhIn0.-xjABq7_b92kRe9GqUxp3-JwDInkhaiMptBy8f63lJU" }


