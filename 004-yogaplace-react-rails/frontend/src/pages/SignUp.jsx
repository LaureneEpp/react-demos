import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ setCurrUser, setShow }) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    city: "",
    role: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <div className="px-4 margin-top-8">
        <h3 className="display-4 text-start">Signup</h3>
      </div>
      <div className="p-5 overflow-y-auto">
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
              value={userData.last_name}
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
              value={userData.username}
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
              value={userData.city}
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
              value={userData.role}>
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
              value={userData.email}
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
              value={userData.password}
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
              <p>
                Already registered:{" "}
                <Link to={`/login`} className="white-color fw-semibold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
