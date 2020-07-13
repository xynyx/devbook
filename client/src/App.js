import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearProfileOnLogout } from "./actions/profileActions";
import setAuthToken from "./helpers/setAuthToken";

import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/profile/CreateProfile"

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

// To persist JWT authentication if user refreshes or goes to another page, check to see if user is logged in and
// Check if Token is in Local Storage
// ! localStorage is NOT the most secure way to do this - vulnerable to XSS and CSRF attacks
// ? Security can be greatly improved here by using something like Auth0
const token = localStorage.jwtToken;
if (token) {
  // Set Authorization header to token
  setAuthToken(token);
  // Decode token and get user data
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated to true
  store.dispatch(setCurrentUser(decoded));

  store.dispatch(clearProfileOnLogout());

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "login";
  }
}

function App() {
  return (
    // Provider makes Redux store available to all nested components (wraps entire app)
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
