import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';

import store from './store';

import Navbar from './components/Layout/Navbar';

import SecondNavbar from './components/Layout/SecondNavbar';

import Landing from './components/Layout/Landing';

// Auth
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';



// check to see if there is a token stored
if (localStorage.jwtToken) {
  // set token to setAuthToken Auth
  setAuthToken(localStorage.jwtToken)
  // decode token to get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));


  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());

    // Redirect to login page
    window.location.href = '/login';
  }

}


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Route exact path="/" components={ Landing } />
            <div className="containerr">
              <Navbar />
              <Route path='/register' component={ Register } />
              <Route path='/login' component={ Login }/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
