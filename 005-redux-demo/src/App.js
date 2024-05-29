import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./Main";
import NavBar from "./components/NavBar";
import FilteredFabrics from "./features/Fabrics/FilteredFabrics";
import FabricsIndexPage from "./features/Fabrics/FabricsIndexPage";
import FabricShowPage from "./features/Fabrics/FabricShowPage";
import Login from "./features/Login/Login";
import UserProfile from "./features/User/UserProfile";
import { useSelector } from "react-redux";

function App() {
  const authUser = useSelector((state) => state.auth.user);
  // const { authUser } = user;

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={authUser ? <Main /> : <Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<UserProfile authUser={authUser} />}></Route>
          <Route path="/fabrics/:type/:id" element={<FabricShowPage />}></Route>
          <Route path="/fabrics/:type" element={<FilteredFabrics />}></Route>
          <Route path="/fabrics" element={<FabricsIndexPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
