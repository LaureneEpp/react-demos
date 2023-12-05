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
      user: { email: data.email, password: data.password, first_name: data.first_name, last_name: data.last_name, username: data.username, city: data.city, role: data.role },
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
        <div className="container overflow-scroll">
          <h3 className="d-flex justify-content-center text-uppercase fs-2">
            Signup
          </h3>
          <form ref={formRef} onSubmit={handleSubmit} className="m-4">
          <div className="mb-3">
              <label htmlFor="inputFirstName" className="form-label">
                Your first name
              </label>
              <input
                type="first_name"
                name="first_name"
                placeholder="What is your first name?"
                className="form-control"
                id="inputFirstName"
                aria-describedby="firstNameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputLastName" className="form-label">
                Your last name
              </label>
              <input
                type="last_name"
                name="last_name"
                placeholder="What is your last name?"
                className="form-control"
                id="inputLastName"
                aria-describedby="lastNameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputUsername" className="form-label">
                Your username
              </label>
              <input
                type="username"
                name="username"
                placeholder="What is your username?"
                className="form-control"
                id="inputUsername"
                aria-describedby="usernameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputCity" className="form-label">
                Your city
              </label>
              <input
                type="city"
                name="city"
                placeholder="Where do you live?"
                className="form-control"
                id="inputFirstName"
                aria-describedby="firstNameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputRole" className="form-label">
                Select your role:
              </label>
              <select
                name="role"
                className="form-select"
                id="inputRole"
                aria-describedby="roleHelp"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="form-control"
                id="inputPassword"
              />
            </div>
            <button
              type="submit"
              value="Signup"
              className="btn validate-button mt-3">
              Submit
            </button>
            <div className="mb-3">
              <div className="form-text white-color py-4">
                Already registered:{" "}
                <a
                  href="#login"
                  onClick={handleClick}
                  className="white-color fw-semibold">
                  login
                </a>{" "}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
