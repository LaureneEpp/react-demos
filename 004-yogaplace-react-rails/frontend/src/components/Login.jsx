import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setCurrUser, setShow }) => {
  const navigate = useNavigate();
  const formRef = useRef();

  const login = async (userInfo) => {
    const url = "http://localhost:3000/login";
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
    login(userInfo);
    e.target.reset();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container">
          <h3>Login</h3>
          <form ref={formRef} onSubmit={handleSubmit}>
            Email: <input type="email" name="email" placeholder="email" />
            <br />
            Password:{" "}
            <input type="password" name="password" placeholder="password" />
            <br />
            <input type="submit" value="Login" />
          </form>
          <br />
          <div>
            Not registered yet,{" "}
            <a href="#signup" onClick={handleClick}>
              Signup
            </a>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
