import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setCurrUser, setShow }) => {
  const navigate = useNavigate();
  const formRef = useRef();

  const signup = async (userInfo) => {
    const url = "http://localhost:3000/signup";
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();
      if (!response.ok) throw data.error;

      localStorage.setItem("token", response.headers.get("Authorization"));
      setCurrUser(data);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    signup(userInfo);
    e.target.reset();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container">
          <h3>Signup</h3>
          <form ref={formRef} onSubmit={handleSubmit}>
            Email: <input type="email" name="email" placeholder="email" />
            <br />
            Password: <input type="password" name="password" placeholder="password" />
            <br />
            <input type="submit" value="Signup" />
          </form>
          <br />
          <div>
            Already registered,{" "}
            <a href="#login" onClick={handleClick}>
              Login
            </a>{" "}
            here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
