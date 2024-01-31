import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserBookingsList = ({ currUser }) => {
  const [userBookings, setUserBookings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookingData() {
      try {
        const API_URL = "http://localhost:3000/api/v1";
        const userBookingsResponse = await fetch(`${API_URL}/bookings`);

        if (userBookingsResponse.ok) {
          const userBookingsData = await userBookingsResponse.json();
          const userBookings = userBookingsData.filter(
            (booking) => booking.user_id === currUser.id
          );
          console.log(userBookings);
          setUserBookings(userBookings);
        } else {
          throw new Error(
            `Failed to fetch yoga class data with status ${userBookingsResponse.status}`
          );
        }
      } catch (error) {
        setError(`An error occurred: ${error.message}`);
      }
    }
    fetchBookingData();
  }, [currUser]);

  if (!userBookings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container overflow-auto align-self-center">
    <div className="text-center">
      <h3>Your bookings</h3>
      <div className="d-flex align-items-center justify-content-center align-content-center my-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {userBookings && userBookings.length > 0 ? (
          <div className="d-flex flex-column align-items-center">
            {userBookings.map((booking) => (
              <div
                key={booking.id}
                className="col border border-light m-2 p-3">
                <div className="d-flex flex-column align-items-center">
                  <p>Yoga Class: {booking.yoga_class.location}</p>
                  <p>Date: {booking.yoga_class.date}</p>
                  <p>
                    Lesson Title:{" "}
                    {booking.yoga_class.yoga_lesson.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default UserBookingsList;
