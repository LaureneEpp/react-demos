import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useFetchUserData from "../../fetchingData/useFetchUserData";
import EditIcon from "../../assets/icons/EditIcon";
import IdentityIcon from "../../assets/icons/IdentityIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import EmailIcon from "../../assets/icons/EmailIcon";


const UserInformation = ({ currUser }) => {
  const { userData, error } = useFetchUserData({ currUser });

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-3 h-100">
      <div className="card bg_primary-color border border-white mt-5 ">
        <div className="card-header p-3 d-flex flex-row align-items-center">
          <h2 className="card-title white-color display-4">About you</h2>
          <Link
            to={`/${currUser.username}/edit`}
            className="btn btn-lg terracota-color ms-3"
            role="button">
            <EditIcon />
          </Link>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center">
            <img
              src={`/profile_default.jpeg`}
              alt="profileDefault"
              width={150}
              height={150}
              className="rounded-circle"
            />
          </div>
          <div className="mb-3 lead white-color">
          <IdentityIcon width={25} height={25}/>

            {userData.first_name} {userData.last_name}
            <hr className="my-2 bg-secondary" />
          </div>
          <div className="mb-3 lead white-color">
          <IdentityIcon width={25} height={25}/>

            {userData.username}
            <hr className="my-2 bg-secondary" />
          </div>
          <div className="mb-3 lead white-color">
            <LocationIcon width={20} height={20}/>
            {userData.city}
            <hr className="my-2 bg-secondary" />
          </div>
          <div className="mb-3 lead white-color">
            <EmailIcon/>
            {userData.email}
            <hr className="my-2 bg-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

UserInformation.propTypes = {
  currUser: PropTypes.shape({
    // id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserInformation;
