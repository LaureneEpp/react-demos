import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "./components/AppRoutes.jsx";
// import Home from "./features/Home.jsx"
// import YogaClassesList from"./features/YogaClassesList.jsx"
// import YogaClassDetails from"./features/YogaClassesList.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
