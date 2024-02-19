import SignUp from "./SignUp";
import Login from "./Login";
import Logout from "./Logout";
import InstructorProfile from "../features/InstructorProfile";
import UserProfile from "../features/UserProfile";
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
