import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer.jsx";
import Landing from "./components/layout/Landing.jsx";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login.jsx";


import "./App.css";

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
