import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Login = ({ setCurrUser }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("user[email]", userData.email);
    formData.append("user[password]", userData.password);

    try {
      const API_URL = "http://localhost:3000/login";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          accept: "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", response.headers.get("Authorization"));
        setCurrUser(data);
        e.target.reset();

        navigate("/");
      } else {
        console.log("Failed to save record.");
      }
    } catch (error) {
      console.log("Error occurred while saving the record:", error);
    }

    if (!userData) {
      alert("Please fill in both fields.");
      return;
    }
  };

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <div className="p-3 mb-2 rounded-3 bg-transparent">
        <h3 className="d-flex justify-content-center text-uppercase fs-2">
          Login
        </h3>
      </div>
      <div className="overflow-y-scroll w-50">
        <div className="container-fluid">
          <form onSubmit={handleSubmit} className="m-4">
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="form-control"
                id="InputEmail"
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error bg_secondary-color shadow-sm fw-semibold p-2 m-2">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="form-control"
                id="InputPassword"
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
              value="Login"
              className="btn validate-button mt-3">
              Submit
            </button>
            <div className="mb-3">
              <div className="form-text white-color py-4">
                <p>
                  {" "}
                  Not registered yet:{" "}
                  <Link to={`/signup`} className="white-color fw-semibold">
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
