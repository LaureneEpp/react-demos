import { useState } from "react";
import ProfileSidebar from "../features/profile/ProfileSidebar";
import AdminDashboard from "../features/profile/AdminDashboard";
import ClientsInformation from "../features/profile/ClientsInformation";
import ClientsBookings from "../features/profile/ClientsBookings";

const InstructorProfile = ({ currUser }) => {
  const [selectedContent, setSelectedContent] = useState("adminDashboard");

  const handleSidebarButtonClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="container-profile d-flex h-100 w-100">
      <ProfileSidebar
        onButtonClick={handleSidebarButtonClick}
        currUser={currUser}
      />
      <div className=" flex-grow-1 d-flex flex-column  h-100 overflow-y-scroll">
        {selectedContent === "adminDashboard" && (
          <AdminDashboard currUser={currUser} />
        )}
        {selectedContent === "clientsInformation" && (
          <ClientsInformation currUser={currUser} />
        )}
        {selectedContent === "clientsBookings" && (
          <ClientsBookings currUser={currUser} />
        )}
      </div>
    </div>
  );
};

export default InstructorProfile;
