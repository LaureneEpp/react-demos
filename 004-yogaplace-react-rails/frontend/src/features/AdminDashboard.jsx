import { useState } from "react";
// import UserProfileSidebar from "./UserProfileSidebar";
// import UserInformation from "./UserInformation";
// import UserBookingsList from "./UserBookingsList";

const AdminDashboard = ({ currUser }) => {
  const [selectedContent, setSelectedContent] = useState("userInformation");

  const handleSidebarButtonClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="container-profile vw-100 vh-100 d-flex">
      <div className="fixed-sidebar bg_secondary-color d-flex">
      <button
          onClick={() => onButtonClick("userInformation")}
          className="d-block fs-5 fw-bold uppercase primary-color bg-transparent btn btn-lg">
          Main
        </button>
        <button
          onClick={() => onButtonClick("userInformation")}
          className="d-block fs-5 fw-bold uppercase primary-color bg-transparent btn btn-lg">
          Users
        </button>
        <button
          onClick={() => onButtonClick("userBookings")}
          className="d-block fs-5 fw-bold uppercase primary-color bg-transparent btn btn-lg">
          Bookings
        </button>
      </div>{" "}
      <div className="d-flex flex-column align-items-center justify-content-center vw-100 vh-100">
        {/* {selectedContent === "userInformation" && (
          <UserInformation currUser={currUser} />
        )}
        {selectedContent === "userBookings" && (
          <UserBookingsList currUser={currUser} />
        )} */}
      </div>
    </div>
  );
};

export default AdminDashboard;
