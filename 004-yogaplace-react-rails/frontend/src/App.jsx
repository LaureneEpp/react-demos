import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [currUser, setCurrUser] = useState(() => {
    const storedUser = localStorage.getItem("currUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("currUser", JSON.stringify(currUser));
  }, [currUser]);

  return (
    <Router>
      <Navbar currUser={currUser} setCurrUser={setCurrUser} />
      <div className="body-content">
        <AppRoutes currUser={currUser} setCurrUser={setCurrUser} />
      </div>
    </Router>
  );
}

export default App;
