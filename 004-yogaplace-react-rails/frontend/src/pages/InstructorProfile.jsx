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
    <div className="container-profile w-100 h-100 d-flex overflow-auto">
      <ProfileSidebar
        onButtonClick={handleSidebarButtonClick}
        currUser={currUser}
      />
      <div className="h-100 w-100 overflow-y-scroll">
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
