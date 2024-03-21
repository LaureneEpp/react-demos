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
          <label>
            First Name:
            <input
              name="first_name"
              type="text"
              value={userData.first_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              name="last_name"
              type="text"
              value={userData.last_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={userData.username}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              type="text"
              value={userData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            City:
            <input
              name="city"
              type="text"
              value={userData.city}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Role:
            <input
              name="role"
              type="text"
              value={userData.role}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="text"
              value={userData.password}
              onChange={handleChange}
            />
          </label>
          <br />
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
                  <Link
                    to={`/login`}
                    className="white-color fw-semibold">
                    Login
                  </Link>
                </p>
              </div>
            </div>
      </div>
    </div>
  );
};

export default Signup;
