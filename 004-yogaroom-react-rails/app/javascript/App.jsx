import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import * as bootstrap from "bootstrap";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
