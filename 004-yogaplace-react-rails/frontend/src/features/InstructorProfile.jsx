import { useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import AdminDashboard from "./AdminDashboard";
import ClientsInformation from "./ClientsInformation";
import ClientsBookings from "./ClientsBookings";

const InstructorProfile = ({ currUser }) => {
  const [selectedContent, setSelectedContent] = useState("adminDashboard");

  const handleSidebarButtonClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="container-profile vw-100 vh-100 d-flex">
      <ProfileSidebar
        onButtonClick={handleSidebarButtonClick}
        currUser={currUser}
      />
      <div className="d-flex flex-column align-items-center justify-content-center vw-100 vh-100">
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
