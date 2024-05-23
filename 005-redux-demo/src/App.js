import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./Main";
import NavBar from "./components/NavBar";

import Fabrics from "./features/Fabrics/Fabrics";
import FabricShowPage from "./features/Fabrics/FabricShowPage";
import { useSelector } from "react-redux";

function App() {
  // const cart = useSelector((state) => state.cart.cart);
  // const totalAmount = useSelector((state) => state.cart.totalAmount);
  // const totalPrice = useSelector((state) => state.cart.totalPrice);

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
