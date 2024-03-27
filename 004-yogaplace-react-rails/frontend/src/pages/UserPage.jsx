import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useFetchUserData from "../services/useFetchUserData";
import LoadingAnimation from "../features/LoadingAnimation";
import HomeIcon from "../assets/icons/homeIcon";
import LocationIcon from "../assets/icons/LocationIcon";
import EmailIcon from "../assets/icons/EmailIcon";
import CalendarIcon from "../assets/icons/CalendarIcon";


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
              <LocationIcon width={25} height={25}/>
              <h5 className="fw-light m-2">{user.city}</h5>
            </div>
            <div className="card-info-icon d-flex align-items-center">
            <EmailIcon/>
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
                <HomeIcon />
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
                  <div className="d-flex flex-row w-100">
                    <LocationIcon width={25} height={25}/>
                    <p>{userBooking.yoga_class.location}</p>
                  </div>
                  <div className="d-flex flex-row w-100">
                    <CalendarIcon/>
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
