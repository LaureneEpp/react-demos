import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "../../components/Modal";
import EyeIcon from "../../assets/icons/EyeIcon";
import LoadingAnimation from "../LoadingAnimation";
import formatDate from "../../config/formatDate";
import useFetchDashboardData from "../../services/useFetchDashboardData";
import AllBookingsListModalContent from "../modalContent/AllBookingsListModalContent";

const ClientsBookings = ({ currUser }) => {
  const dashboardData = useFetchDashboardData({ currUser });
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleAllBookingsButtonClick = () => {
    setModalContent(<AllBookingsListModalContent {...{ dashboardData }} />);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setModalContent(null);
  };

  if (!dashboardData) return <LoadingAnimation />;

  return (
    <div className="mt-5 p-5 d-flex flex-column justify-content-center align-items-center overflow-auto">
      <Modal {...{ modal, setModal: closeModal, content: modalContent }} />

      <h3 className="display-4 text-center">Your bookings</h3>
      <div className=" overflow-y-scroll my-3 w-75">
        {dashboardData.bookingsInstructorData && (
          <motion.div
            animate={{
              scale: modal ? 0.8 : 1,
              opacity: modal ? 0.5 : 1,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="bg-transparent text-white text-center">
                    #
                  </th>
                  <th
                    scope="col"
                    className="bg-transparent text-white text-center">
                    Date
                  </th>
                  <th
                    scope="col"
                    className="bg-transparent text-white text-center">
                    Title
                  </th>
                  <th
                    scope="col"
                    className="bg-transparent text-white text-center">
                    Location
                  </th>
                  <th
                    scope="col"
                    className="bg-transparent text-white text-center">
                    First name
                  </th>
                  <th
                    scope="col"
                    className="bg-transparent text-white text-center">
                    Last name
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.bookingsInstructorData.map((b, index) => (
                  <tr key={b.id}>
                    <th
                      scope="row"
                      className="bg-transparent text-white text-center">
                      {index + 1}
                    </th>
                    <td className="bg-transparent text-white text-center">
                      <Link
                        to={`/yoga_classes/${b.yoga_class_id}`}
                        className="text-decoration-none text-white">
                        {formatDate(b.yoga_class.date)}
                      </Link>
                    </td>
                    <td className="bg-transparent text-white text-center">
                      <Link
                        to={`/yoga_lessons/${b.yoga_class.yoga_lesson_id}`}
                        className="text-decoration-none text-white">
                        {b.yoga_class.yoga_lesson.title}
                      </Link>
                    </td>
                    <td className="bg-transparent text-white text-center">
                      {b.yoga_class.location}
                    </td>
                    <td className="bg-transparent text-white text-center">
                      <Link
                        to={`/users/${b.user.username}`}
                        className="text-decoration-none text-white">
                        {b.user.first_name}
                      </Link>
                    </td>
                    <td className="bg-transparent text-white text-center">
                      <Link
                        to={`/users/${b.user.username}`}
                        className="text-decoration-none text-white">
                        {b.user.last_name}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
      <div className="d-flex align-items-center">
        <p className="text-muted my-3">
          Have a look to the full list of bookings:
        </p>
        <button
          className="btn btn-lg my-3"
          onClick={handleAllBookingsButtonClick}>
          {modal ? "X" : <EyeIcon />}
        </button>
      </div>
    </div>
  );
};

export default ClientsBookings;
