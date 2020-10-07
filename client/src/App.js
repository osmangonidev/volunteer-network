import React, { createContext, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Events from './Components/Events/Events';
import Admin from './Components/Admin/Admin';
import Header from './Components/Header/Header';
import RegistationEvent from './Components/RegistationEvent/RegistationEvent';
export const UserContext = createContext()
function App() {
  const [user,setUser]=useState({isSignedUp:true})

  return (
    <UserContext.Provider value={[user,setUser]}>
      <Router>
      <div><Header></Header> </div>
      <Switch>
        <Route exact path='/'>
          <Home></Home>
        </Route>

        <Route exact path='/signIn'>
          <SignIn></SignIn>
        </Route>

        <Route exact path='/registation-event'>
          <RegistationEvent></RegistationEvent>
        </Route>

        <Route exact path='/events'>
          <Events></Events>
        </Route>

        <Route exact path='/admin'>
          <Admin></Admin>
        </Route>

        <Route path='*'>
            <h1>Page is not found: 404</h1>
        </Route>

      </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
