import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUserAfterHour } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/Navbar';
import UsersManagement from './components/UsersManagement';
import Login from './components/Login';

import './App.css';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUserAfterHour());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Route exact path="/" component={Navbar} />
            <Route exact path="/" component={UsersManagement} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;