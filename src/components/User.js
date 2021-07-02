import { useState } from 'react';

export default function user() {

  const getUser = () => {
    const userString = localStorage.getItem('username');
    let userToken = JSON.parse(userString);
    // userToken = userToken.authToken
    // console.log(userToken)
    return userToken
  };

  // const [token, setToken] = useState(getToken());
  const [ user, setUser] = useState(getUser());

  const saveUser = userName => {
    localStorage.setItem('username', JSON.stringify(userName));
    setUser(userName);
  };

  return {
    setUser: saveUser,
    user
  }
}