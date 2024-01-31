const UserProfileSidebar = ({ onButtonClick }) => {
  return (
    <div className="fixed-sidebar bg_secondary-color d-flex p-2">
      <button onClick={() => onButtonClick("userInformation")} className="d-block fs-5 fw-bold uppercase primary-color p-3 mb-3 bg-transparent btn">
        Your Information
      </button>
      <button onClick={() => onButtonClick("userBookings")} className="d-block fs-5 fw-bold uppercase primary-color p-3 mb-3 bg-transparent btn">
        Your Bookings
      </button>
    </div>
  );
};

export default UserProfileSidebar;
