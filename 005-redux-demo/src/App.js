import React from "react";
import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
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

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar authUser={authUser} />
        <Routes>
          <Route path="/" element={authUser ? <Main /> : <Navigate to={"/login"} />}/>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<UserProfile authUser={authUser} />}/>
          <Route path="/fabrics/:type/:id" element={<FabricShowPage/>}/>
          <Route path="/fabrics/:type" element={<FilteredFabrics />}/>
          <Route path="/fabrics" element={<FabricsIndexPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
