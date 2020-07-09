import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer.jsx";
import Landing from "./components/layout/Landing.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
