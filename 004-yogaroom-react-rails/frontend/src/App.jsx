import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import * as bootstrap from "bootstrap";
import AppRoutes from "./components/AppRoutes";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="vw-100 vh-100 p-3">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
