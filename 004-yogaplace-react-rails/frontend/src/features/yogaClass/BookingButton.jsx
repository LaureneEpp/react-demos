import useFetchBookingData from "../../services/useFetchBookingData";

const BookingButton = ({ currUser, yogaClassId }) => {
  const { isBooked, handleBooking } = useFetchBookingData({
    currUser,
    yogaClassId,
  });  

  return (
    <button onClick={handleBooking} className="btn btn-lg p-2 booking-button text-muted">
      {isBooked ? "Cancel" : "Book now!"}
    </button>
  );
};

export default BookingButton;
