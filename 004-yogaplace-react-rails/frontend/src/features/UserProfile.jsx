import { useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import UserInformation from "./UserInformation";
import UserBookingsList from "./UserBookingsList";

const UserProfile = ({ currUser }) => {
  const [selectedContent, setSelectedContent] = useState("userInformation");

  const handleSidebarButtonClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="container-profile vw-100 vh-100 d-flex">
      <ProfileSidebar onButtonClick={handleSidebarButtonClick} currUser={currUser}/>
      <div className="d-flex flex-column align-items-center justify-content-center vw-100 vh-100">
        {selectedContent === "userInformation" && (
          <UserInformation currUser={currUser} />
        )}
        {selectedContent === "userBookings" && (
          <UserBookingsList currUser={currUser} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
