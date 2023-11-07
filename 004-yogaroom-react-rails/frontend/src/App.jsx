import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container-fluid p-3">
        <Navbar />
        <div className="mt-5">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
