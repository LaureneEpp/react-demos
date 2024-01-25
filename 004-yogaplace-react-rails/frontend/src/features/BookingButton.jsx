import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

const BookingButton = ({ currUser, yogaClassId }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [booking, setBooking] = useState(null);
  // const { id } = useParams();

  console.log(currUser);
  console.log(yogaClassId);

  useEffect(() => {
    // Check if the user has already booked this yoga class
    async function checkBookingStatus() {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/bookings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const bookings = await response.json();
          // console.log(bookings);
          const userBooking = bookings.find(
            (booking) =>
              booking.user_id === currUser.id &&
              booking.yoga_class_id === yogaClassId
          );

          if (userBooking) {
            setBooking(userBooking);
            setIsBooked(true);
          }
        } else {
          console.error("Failed to check booking status");
        }
      } catch (error) {
        console.error("Error during booking:", error.message);
      }
    }
    checkBookingStatus();
  }, [currUser, yogaClassId]);

  const handleBooking = async () => {
    try {
      if (isBooked) {
        // If already booked, cancel the booking
        if (!booking) {
          console.error("Booking details not available");
          return;
        }

        const API_URL = "http://localhost:3000/api/v1";
        const response = await fetch(`${API_URL}/bookings/${booking.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Booking canceled");
          setIsBooked(false);
          setBooking(null);
        } else {
          console.error("Failed to cancel booking");
          throw response;
        }
      } else {
        // If not booked, make a new booking
        const response = await fetch("http://localhost:3000/api/v1/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking: {
              user_id: currUser.id,
              yoga_class_id: yogaClassId,
            },
          }),
        });

        if (response.ok) {
          console.log("Booking successful");
          setIsBooked(true);
          // Update the booking state with the newly created booking
          const newBooking = await response.json();
          setBooking(newBooking);
        } else {
          console.error("Booking failed");
        }
      }
    } catch (error) {
      console.error("Error during booking:", error.message);
    }
  };

  return (
    <button onClick={handleBooking} className="btn btn-lg ms-4 p-2 booking-button text-muted">
      {isBooked ? "Cancel" : "Book now!"}
    </button>
  );
};

export default BookingButton;
