import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./Main";
import NavBar from "./components/NavBar";

import Fabrics from "./features/Fabrics/Fabrics";
import FabricShowPage from "./features/Fabrics/FabricShowPage";
import { useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/fabrics/:type/:id" element={<FabricShowPage />}></Route>
          <Route path="/fabrics/:type" element={<Fabrics />}></Route>
          <Route path="/fabrics" element={<Fabrics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
