import { useRef } from "react";
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
          <h3 className="d-flex justify-content-center text-uppercase fs-2">Login</h3>
          <form ref={formRef} onSubmit={handleSubmit} className="m-4">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                {" "}
                We will never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password" name="password" placeholder="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" value="Login" className="btn validate-button mt-3">Submit</button>
            <div className="mb-3">
              <div className="form-text white-color py-4">
            Not registered yet:{" "}
            <a href="#signup" onClick={handleClick} className="white-color fw-semibold">
              signup
            </a>{" "}
          </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
