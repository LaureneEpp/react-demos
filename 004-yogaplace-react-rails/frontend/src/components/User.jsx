import SignUp from "./SignUp";
import Login from './Login';
import Logout from './Logout';
import PrivateText from './PrivateText';
import { useState } from "react";

const User = ({ currUser, setCurrUser }) => {
    const [showLogin, setShowLogin] = useState(true);

    if (currUser) {
        return (
            <div>
                Hello {currUser.email}
                <PrivateText currUser={currUser} />
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
