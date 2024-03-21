import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ setCurrUser }) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    city: "",
    role: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    city: "",
    role: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    const requiredFields = ["first_name", "last_name", "username", "city"];
    requiredFields.forEach((field) => {
      if (userData[field].trim() === "") {
        newErrors[field] = `Your ${field.split("_").join(" ")} is required`;
        isValid = false;
      } else {
        newErrors[field] = "";
      }
    });

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!userData.email.match(emailPattern)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("user[first_name]", userData.first_name);
    formData.append("user[last_name]", userData.last_name);
    formData.append("user[username]", userData.username);
    formData.append("user[email]", userData.email);
    formData.append("user[city]", userData.city);
    formData.append("user[role]", userData.role);
    formData.append("user[password]", userData.password);

    try {
      const API_URL = "http://localhost:3000/signup";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", response.headers.get("Authorization"));
        setCurrUser(data);
        navigate("/");
      } else {
        console.log("Failed to save record.");
      }
    } catch (error) {
      console.log("Error occurred while saving the record:", error);
    }
  };

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <div className="p-3 mb-2 rounded-3 bg-transparent">
        <h3 className="d-flex justify-content-center text-uppercase fs-2">
          Signup
        </h3>
      </div>
      <div className="overflow-y-scroll w-50">
        <div className="container-fluid">
          <form onSubmit={handleSubmit}>
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
                value={userData.first_name}
                onChange={handleChange}
              />
              {errors.first_name && (
                <span className="error bg_secondary-color shadow-sm fw-semibold p-2 m-2">
                  {errors.first_name}
                </span>
              )}
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
                value={userData.last_name}
                onChange={handleChange}
              />
              {errors.last_name && (
                <span className="error bg_secondary-color shadow-sm fw-semibold p-2 m-2">
                  {errors.last_name}
                </span>
              )}
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
                value={userData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <span className="error bg_secondary-color shadow-sm fw-semibold p-2 m-2">
                  {errors.username}
                </span>
              )}
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
                value={userData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <span className="error bg_secondary-color shadow-sm fw-semibold p-2 m-2">
                  {errors.city}
                </span>
              )}
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
                value={userData.role}
                onChange={handleChange}>
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
                placeholder="What is your email?"
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error bg_secondary-color shadow-sm fw-semibold p-2 m-2">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Choose a password"
                className="form-control"
                id="inputPassword"
                value={userData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error bg_secondary-color shadow-sm fw-semibold p-2 m-2">
                  {errors.password}
                </span>
              )}
            </div>
            <button
              type="submit"
              value="Signup"
              className="btn validate-button mt-3">
              Submit
            </button>
          </form>
          <div className="mb-3">
            <div className="form-text white-color py-4">
              <p>
                Already registered:{" "}
                <Link to={`/login`} className="white-color fw-semibold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
