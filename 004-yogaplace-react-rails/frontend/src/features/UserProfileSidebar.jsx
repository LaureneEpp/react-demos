const UserProfileSidebar = ({ onButtonClick }) => {
  return (
    <div className="fixed-sidebar bg_secondary-color d-flex">
      <button onClick={() => onButtonClick("userInformation")} className="d-block fs-5 fw-bold uppercase primary-color bg-transparent btn btn-lg">
        Your Information
      </button>
      <button onClick={() => onButtonClick("userBookings")} className="d-block fs-5 fw-bold uppercase primary-color bg-transparent btn btn-lg">
        Your Bookings
      </button>
    </div>
  );
};

export default UserProfileSidebar;
