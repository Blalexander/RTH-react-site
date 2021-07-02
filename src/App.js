import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Estimates from './components/Estimates';
import CreateEstimate from './components/CreateEstimate';
import Routes from './components/Routes';
import Billing from './components/Billing';
import Schedules from './components/Schedules';
import Catalog from './components/Catalog';
import Error from './components/Error';
import Navigation from './components/Navigation';
import useToken from './components/useToken';
import user from './components/User';


function App() {
  const { token, setToken } = useToken();
  const { username, setUser} = user();
  const [ isLoggedOut, setIsLoggedOut ] = useState('');

  if(!token) {
    return (
      <div className="login-register-container">
        <Login setToken={setToken} setUser={setUser} />
        {/* <Register setToken={setToken} /> */}
      </div>
    )
  }

  useEffect(() => {
    console.log(token)
  }, [token])

  // const [initialData, setInitialData] = useState('')
  let bodyFiller = {name: 'blake', borough: 'yesmaam', cuisine: 'yeehaw'}
  // let bodyFiller = 'blake'
  // console.log(JSON.stringify(bodyFiller))
  // const result = fetch('http://localhost:8080/test', {
  //   method: "POST",
  //   body: JSON.stringify(bodyFiller),
  //   // body: bodyFiller,
  //   headers: {
	// 		'Content-Type': 'application/json',
  //   }
  // })
  // setInitialData(result)


  function submitForm(ev) {
    ev.preventDefault()
    console.log(ev)
    // const result = fetch('http://localhost:8080/test', {
    //   method: "POST",
    //   body: JSON.stringify(bodyFiller),
    //   // body: bodyFiller,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // })
  }

  function logOut() {
		localStorage.clear();
    setIsLoggedOut(2)
    // setUser(null)
    // return (
    //   <div className="login-register-container">
    //     <Login setToken={setToken} />
    //     <Register setToken={setToken} />
    //   </div>
    // )
  }

  return (
    <BrowserRouter>
      <div> 
        <button onClick={logOut} className="logout-button">Logout</button>
        {/* <User username={setUser} /> */}
        <Navigation />
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/Orders" component={Orders}/>
            <Route path="/Estimates" component={Estimates}/>
            <Route path="/CreateEstimate" component={CreateEstimate}/>
            <Route path="/Routes" component={Routes}/>
            <Route path="/Billing" component={Billing}/>
            <Route path="/Schedules" component={Schedules}/>
            <Route path="/Catalog" component={Catalog}/>
            <Route component={Error}/>
          </Switch>
      </div> 
    </BrowserRouter>
  );
}

export default App;
