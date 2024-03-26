import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetchUserData from "../fetchingData/useFetchUserData";
import LoadingAnimation from "../features/LoadingAnimation";
import { motion } from "framer-motion";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function UserPage({ currUser }) {
  const { usersList } = useFetchUserData({currUser});
  const [userBookingsList, setUserBookingsList] = useState([]);
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      if (usersList) {
        const user = usersList.find((user) => user.username === username);
        setUser(user);
      }
    };

    const fetchBookings = async () => {
      if (!user) return;
      try {
        const API_URL = "http://localhost:3000/api/v1";
        const response = await fetch(`${API_URL}/bookings`);
        console.log(response);
        if (response.ok) {
          const bookingsList = await response.json();
          console.log(bookingsList);
          const userBookingsList = bookingsList.filter(
            (booking) => booking.user_id === user.id
          );
          setUserBookingsList(userBookingsList);
        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };
    getUser();
    fetchBookings();
  }, [usersList, username, user]);

  if (!currUser) {
    navigate("/login");
  }

  if (!user) {
    return <LoadingAnimation />;
  }

  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center px-4 mt-2">
        {" "}
        <div className="m-2">
          <h3 className="display-4">
            {user.first_name} {user.last_name}
          </h3>
          <p className="lead text-muted">
            {user.username} is{" "}
            <strong style={{ background: "white" }}>{user.role}</strong>.
          </p>
          <hr className="my-4" />
          <div className="card-info d-flex mb-3">
            <div className="card-info-icon d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-geo-alt"
                viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <h5 className="fw-light m-2">{user.city}</h5>
            </div>
            <div className="card-info-icon d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-envelope-at"
                viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
              </svg>
              <h5 className="fw-light m-2">{user.email}</h5>
            </div>
          </div>
          <hr className="my-4" />
          <div className="yoga-class-buttons d-flex justify-content-between">
            <div className="d-flex">
              <Link
                to="/"
                className="btn btn-lg secondary-color my-3 p-2"
                role="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-house-door-fill"
                  viewBox="0 0 16 16">
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {currUser && currUser.role === "instructor" && (
        <div className="p-3 overflow-y-auto d-flex row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {userBookingsList.map((userBooking) => (
            <Link
              to={`/yoga_classes/${userBooking.yoga_class_id}`}
              key={userBooking.id}
              className="text-decoration-none white-color">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="col border border-light m-2 p-3">
                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-geo-alt mx-2"
                      viewBox="0 0 16 16">
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    <p>{userBooking.yoga_class.location}</p>
                  </div>
                  <div className="d-flex flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-calendar-event mx-2"
                      viewBox="0 0 16 16">
                      <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                    <p>{formatDate(userBooking.yoga_class.date)}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPage;
