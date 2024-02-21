const ProfileSidebar = ({ onButtonClick, currUser }) => {
  if (currUser.role === "instructor") {
    return (
      <div className="fixed-sidebar bg_secondary-color flex-shrink-1">
        <button
          onClick={() => onButtonClick("adminDashboard")}
          className="d-block fs-5 fw-bold uppercase primary-color bg-transparent btn btn-lg">
          Dashboard
        </button>
        <button
          onClick={() => onButtonClick("clientsInformation")}
          className="d-block fs-5 fw-bold uppercase primary-color bg-transparent btn btn-lg">
          Your clients
        </button>
        <button
          onClick={() => onButtonClick("clientsBookings")}
          className="d-block fs-5 fw-bold uppercase primary-color bg-transparent btn btn-lg">
          Your bookings
        </button>
      </div>
    );
  } else {
    return (
      <div className="fixed-sidebar bg_secondary-color flex-shrink-1">
        <button
          onClick={() => onButtonClick("userInformation")}
          className="d-block fs-5 fw-bold uppercase primary-color bg-transparent btn btn-lg">
          Your Information
        </button>
        <button
          onClick={() => onButtonClick("userBookings")}
          className="d-block fs-5 fw-bold uppercase primary-color bg-transparent btn btn-lg">
          Your Bookings
        </button>
      </div>
    );
  }
};

export default ProfileSidebar;
