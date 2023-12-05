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
      <div className="container-fluid p-3">
        <Navbar currUser={currUser} setCurrUser={setCurrUser} />
        <div className="mt-5">
          <AppRoutes currUser={currUser} setCurrUser={setCurrUser} />
        </div>
      </div>
    </Router>
  );
}

export default App;
