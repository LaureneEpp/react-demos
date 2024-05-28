import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./Main";
import NavBar from "./components/NavBar";
import Fabrics from "./features/Fabrics/Fabrics";
import FabricShowPage from "./features/Fabrics/FabricShowPage";
import Login from "./features/Login/Login";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state)=> state.user.user);
  const {authUser } = user;
  console.log("user", user);
  console.log("authUser", authUser);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={authUser ? <Main /> : <Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/fabrics/:type/:id" element={<FabricShowPage />}></Route>
          <Route path="/fabrics/:type" element={<Fabrics />}></Route>
          <Route path="/fabrics" element={<Fabrics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
