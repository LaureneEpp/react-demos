import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const EditUserProfile = ({ currUser, onUpdate }) => {
  const [userProfile, setUserProfile] = useState({
    email: currUser.email,
    first_name: currUser.first_name,
    last_name: currUser.last_name,
    username: currUser.username,
    city: currUser.city,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform update action using userProfile state
    console.log("Updated Profile:", userProfile);
    // Call a function to update the profile (e.g., passed via props)
    onUpdate(userProfile);
    navigate("/user-profile");
  };

  return (
    <div className="container my-5">
      <h2>Edit User Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form inputs for editing user profile */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userProfile.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

EditUserProfile.propTypes = {
  currUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditUserProfile;
