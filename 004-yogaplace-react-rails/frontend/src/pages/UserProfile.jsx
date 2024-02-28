import { useState } from "react";
import ProfileSidebar from "../features/profile/ProfileSidebar";
import UserInformation from "../features/profile/UserInformation";
import UserBookingsList from "../features/profile/UserBookingsList";

const UserProfile = ({ currUser }) => {
  const [selectedContent, setSelectedContent] = useState("userInformation");

  const handleSidebarButtonClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="container-profile h-100 w-100 d-flex justify-content-center align-items-center">
      <ProfileSidebar onButtonClick={handleSidebarButtonClick} currUser={currUser}/>
      <div className="h-100 w-100 overflow-y-scroll">
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
