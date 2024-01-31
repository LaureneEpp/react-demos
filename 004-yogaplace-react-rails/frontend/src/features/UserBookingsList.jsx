import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { motion } from "framer-motion";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

const UserBookingsList = ({ currUser }) => {
  const [userBookings, setUserBookings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }
    fetchBookingData();
  }, [currUser]);

  if (loading) {
    return <LoadingAnimation />;
  }

  console.log(userBookings);
  return (
    <div className="text-center">
      <h3 className="text-uppercase">Your bookings</h3>
      <Link to="/yoga_classes" role="button">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          className="bi bi-plus-lg orange-light-color fw-bold"
          viewBox="0 0 16 16"
          whileHover={{ scale: [null, 1.5, 1.4] }}
          transition={{ duration: 0.3 }}>
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </motion.svg>
      </Link>

      <div className="m-4">
        {userBookings && userBookings.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="bg-transparent text-white">
                    #
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    Date
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    Category
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    Lesson
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {userBookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <th scope="row" className="bg-transparent text-white">
                      {index + 1}
                    </th>
                    <td className="bg-transparent text-white">
                      {formatDate(booking.yoga_class.date)}
                    </td>
                    <td className="bg-transparent text-white">
                      {booking.yoga_class.yoga_lesson.yoga_category.title}
                    </td>
                    <td className="bg-transparent text-white">
                      {booking.yoga_class.yoga_lesson.title}
                    </td>
                    <td className="bg-transparent text-white">
                      {booking.yoga_class.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default UserBookingsList;
