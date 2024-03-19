// import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = ({ setCurrUser, setShow }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [image_url, setImageUrl] = useState(null);
  // const [submittedData, setSubmittedData] = useState([]);
  const navigate = useNavigate();
  // const formRef = useRef();

  const handleFirstNameChange = (event) => setFirstName(event.target.value);

  const handleLastNameChange = (event) => setLastName(event.target.value);

  const handleUserNameChange = (event) => setUserName(event.target.value);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleCityChange = (event) => setCity(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleRoleChange = (event) => setRole(event.target.value);

  const handleImageChange = (event) => setImageUrl(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user[first_name]", first_name);
    formData.append("user[last_name]", last_name);
    formData.append("user[username]", username);
    formData.append("user[email]", email);
    formData.append("user[city]", city);
    formData.append("user[role]", role);
    formData.append("user[password]", password);
    formData.append("image_url", image_url);

    try {
      const url = "http://localhost:3000/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          // "content-type": "application/json",
          accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", response.headers.get("Authorization"));
        setCurrUser(data);
        // setSubmittedData([...submittedData, data]);
        setFirstName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setCity("");
        setPassword("");
        setRole("");
        setImageUrl(null);
        navigate("/");
      } else {
        console.log("Failed to save record.");
      }
    } catch (error) {
      console.log("Error occurred while saving the record:", error);
    }
  };

  // const signup = async (userInfo) => {
  //   const url = "http://localhost:3000/signup";
  //   try {
  //     const response = await fetch(url, {
  //       method: "post",
  //       headers: {
  //         "content-type": "application/json",
  //         accept: "application/json",
  //       },
  //       body: JSON.stringify(userInfo),
  //     });

  //     const data = await response.json();
  //     if (!response.ok) throw data.error;

  //     localStorage.setItem("token", response.headers.get("Authorization"));
  //     setCurrUser(data);
  //     navigate("/");
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(formRef.current);
  //   const data = Object.fromEntries(formData);
  //   const userInfo = {
  //     user: {
  //       email: data.email,
  //       password: data.password,
  //       first_name: data.first_name,
  //       last_name: data.last_name,
  //       username: data.username,
  //       city: data.city,
  //       role: data.role,
  //       image: data.image,
  //     },
  //   };
  //   signup(userInfo);
  //   e.target.reset();
  // };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(true);
  };

  // return (
  //   <div className="h-100 d-flex flex-column align-items-center justify-content-center">
  //     <div className="px-4 margin-top-8">
  //       <h3 className="display-4 text-start">Signup</h3>
  //     </div>
  //     <div className="p-5 overflow-y-auto">
  //       <form
  //         ref={formRef}
  //         onSubmit={handleSubmit}
  //         className="
  //         ">
  //         <div className="mb-3">
  //           <label htmlFor="image" className="form-label">
  //             Image
  //           </label>
  //           <input
  //             type="file"
  //             name="image"
  //             className="form-control"
  //             m
  //             id="image"
  //             aria-describedby="imageHelp"
  //             accept="image/*"
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="inputFirstName" className="form-label">
  //             Your first name
  //           </label>
  //           <input
  //             type="first_name"
  //             name="first_name"
  //             placeholder="What is your first name?"
  //             className="form-control"
  //             id="inputFirstName"
  //             aria-describedby="firstNameHelp"
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="inputLastName" className="form-label">
  //             Your last name
  //           </label>
  //           <input
  //             type="last_name"
  //             name="last_name"
  //             placeholder="What is your last name?"
  //             className="form-control"
  //             id="inputLastName"
  //             aria-describedby="lastNameHelp"
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="inputUsername" className="form-label">
  //             Your username
  //           </label>
  //           <input
  //             type="username"
  //             name="username"
  //             placeholder="What is your username?"
  //             className="form-control"
  //             id="inputUsername"
  //             aria-describedby="usernameHelp"
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="inputCity" className="form-label">
  //             Your city
  //           </label>
  //           <input
  //             type="city"
  //             name="city"
  //             placeholder="Where do you live?"
  //             className="form-control"
  //             id="inputFirstName"
  //             aria-describedby="firstNameHelp"
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="inputRole" className="form-label">
  //             Select your role:
  //           </label>
  //           <select
  //             name="role"
  //             className="form-select"
  //             id="inputRole"
  //             aria-describedby="roleHelp">
  //             <option value="student">Student</option>
  //             <option value="instructor">Instructor</option>
  //           </select>
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="inputEmail" className="form-label">
  //             Email address
  //           </label>
  //           <input
  //             type="email"
  //             name="email"
  //             placeholder="email"
  //             className="form-control"
  //             id="inputEmail"
  //             aria-describedby="emailHelp"
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="inputPassword" className="form-label">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             name="password"
  //             placeholder="password"
  //             className="form-control"
  //             id="inputPassword"
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           value="Signup"
  //           className="btn validate-button mt-3">
  //           Submit
  //         </button>
  // <div className="mb-3">
  //   <div className="form-text white-color py-4">
  //     Already registered:{" "}
  //     <a
  //       href="#login"
  //       onClick={handleClick}
  //       className="white-color fw-semibold">
  //       login
  //     </a>{" "}
  //   </div>
  // </div>
  //       </form>
  //     </div>
  //   </div>
  // );

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
              type="text"
              value={first_name}
              onChange={handleFirstNameChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              value={last_name}
              onChange={handleLastNameChange}
            />
          </label>
          <br />
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUserNameChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input type="text" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            City:
            <input type="text" value={city} onChange={handleCityChange} />
          </label>
          <br />
          <label>
            Role:
            <input type="text" value={role} onChange={handleRoleChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="text"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
 
           <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <br /> 
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
  );
};

export default Signup;
