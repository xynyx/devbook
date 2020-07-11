import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt_decode";
import { setCurrentUser } from "./actions/authActions";
import setAuthToken from "./helpers/setAuthToken";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer.jsx";
import Landing from "./components/layout/Landing.jsx";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

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
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
