import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Logout from "../features/Logout";
import InstructorProfile from "../pages/InstructorProfile";
import UserProfile from "../pages/UserProfile";
import { useState } from "react";

const User = ({ currUser, setCurrUser }) => {
  const [showLogin, setShowLogin] = useState(true);

  if (currUser) {
    return (
      <div>
        {currUser.role === "instructor" ? (
          <InstructorProfile currUser={currUser} />
        ) : (
          <UserProfile currUser={currUser} />
        )}
        <Logout setCurrUser={setCurrUser} />
      </div>
    );
  } else {
    return (
      <div>
        {showLogin ? (
          <Login setCurrUser={setCurrUser} setShow={setShowLogin} />
        ) : (
          <SignUp setCurrUser={setCurrUser} setShow={setShowLogin} />
        )}
      </div>
    );
  }
};

export default User;
