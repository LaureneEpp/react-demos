import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "../../components/Modal";
import EyeIcon from "../../assets/icons/EyeIcon";
import useFetchDashboardData from "../../services/useFetchDashboardData";
import YogaClassesInstructorModalContent from "../modalContent/YogaClassesInstructorModalContent";
import UsersYogaClassListModalContent from "../modalContent/UsersYogaClassListModalContent";
import InstructorsListModalContent from "../modalContent/InstructorsListModalContent";
import NoBookingClassListModalContent from "../modalContent/NoBookingClassListModalContent";
import LocationsListModalContent from "../modalContent/LocationsListModalContent"

const AdminDashboard = ({ currUser, onBookingsRedirect }) => {
  const dashboardData = useFetchDashboardData({ currUser });
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const svgModal = (
    <EyeIcon/>
  );

  const yogaClassCount = (
    <>
      <p className="fs-3 text-white uppercase px-4 my-3">
        <strong>{dashboardData.yogaClassesCount}</strong> classes
      </p>
    </>
  );
  const clientsCount = (
    <>
      <p className="fs-3 text-white uppercase px-4 my-3">
        <strong>{dashboardData.clientsCurrentInstructorCount}</strong> clients
      </p>
    </>
  );
  const bookingsCount = (
    <>
      <p className="fs-3 text-white uppercase px-4 my-3">
        <strong>{dashboardData.bookingsCount}</strong> bookings
      </p>
    </>
  );

  const noBookingClass = (
    <>
      <p className="fs-3 text-white uppercase px-4 my-3">
        <strong>{dashboardData.noBookingYogaClassesCount}</strong> classes
      </p>
    </>
  );

  const teamListContent = dashboardData.instructorsList && (
    <>
      {dashboardData.instructorsList.length > 2 ? (
        <>
          <button
            className="btn btn-lg text-white mt-3"
            onClick={() => {
              setModalContent(
                <InstructorsListModalContent {...{ dashboardData }} />
              );
              setModal(true);
            }}>
            {svgModal}
          </button>
        </>
      ) : (
          dashboardData.instructorsList.map((y) => (
          <p key={y.id}>
              <Link to={`/users/${y.username}`}
              className="text-decoration-none text-white"
              >
            {y.first_name} {y.last_name}
          </Link>
          </p>
        ))
      )}
    </>
  );

  const handleYogaClassesButtonClick = () => {
    setModalContent(
      <YogaClassesInstructorModalContent {...{ dashboardData }} />
    );
    setModal(true);
  };

  const handleUsersYogaClassListButtonClick = () => {
    setModalContent(<UsersYogaClassListModalContent {...{ dashboardData }} />);
    setModal(true);
  };

  const handleNoBookingButtonClick = () => {
    setModalContent(<NoBookingClassListModalContent {...{ dashboardData }} />);
    setModal(true);
  };

  const handleBookingsButtonClick = () => {
    onBookingsRedirect();
  };

  const handleLocationsgButtonClick = () => {
    setModalContent(<LocationsListModalContent {...{ dashboardData }} />);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setModalContent(null);
  };

  return (
    <>
      <div className="container-admin text-center m-2 p-2 mt-5">
        <Modal {...{ modal, setModal: closeModal, content: modalContent }} />
        <div className="row justify-content-md-center">
          <motion.div
            animate={{
              scale: modal ? 0.8 : 1,
              opacity: modal ? 0.5 : 1,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="col col-lg-2m-1 bg_terracota-color shadow-lg m-2 p-2 rounded-1 d-flex flex-column justify-content-center align-items-center">
            <h5 className="fs-2 fw-light mt-2 p-1 word-wrap">
              What are your classes ?
            </h5>
            <div className="d-flex align-items-center">
              {yogaClassCount}
              <button
                className="btn btn-lg my-3"
                onClick={handleYogaClassesButtonClick}>
                {modal ? "X" : svgModal}
              </button>
            </div>
          </motion.div>
          <motion.div
            animate={{
              scale: modal ? 0.8 : 1,
              opacity: modal ? 0.5 : 1,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="col col-md-auto bg_terracota-color shadow-lg m-2 p-2 rounded-1 d-flex flex-column justify-content-center align-items-center">
            <h5 className="fs-2 fw-light mt-2 p-1 word-wrap ">
              Who are your clients ?
            </h5>
            <div className="d-flex align-items-center">
              {clientsCount}
              <button
                className="btn btn-lg my-3"
                onClick={handleUsersYogaClassListButtonClick}>
                {modal ? "X" : svgModal}
              </button>
            </div>
          </motion.div>
          <motion.div
            animate={{
              scale: modal ? 0.8 : 1,
              opacity: modal ? 0.5 : 1,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="col col-lg-2 bg_terracota-color shadow-lg m-2 p-2 rounded-1 d-flex flex-column justify-content-center align-items-center">
            <h5 className="fs-2 fw-light mt-2 p-1 word-wrap ">
              Who are your teammates ?
            </h5>
            {teamListContent}
          </motion.div>
        </div>
        <div className="row">
          <motion.div
            animate={{
              scale: modal ? 0.8 : 1,
              opacity: modal ? 0.5 : 1,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="col bg_terracota-color shadow-lg m-2 p-2 rounded-1 d-flex flex-column justify-content-center align-items-center">
            <h5 className="fs-2 fw-light mt-2 p-1 word-wrap ">
              Any class with no booking ?
            </h5>
            <div className="d-flex align-items-center">
              {noBookingClass}
              <button
                className="btn btn-lg my-3"
                onClick={handleNoBookingButtonClick}>
                {svgModal}
              </button>
            </div>
          </motion.div>
          <motion.div
            animate={{
              scale: modal ? 0.8 : 1,
              opacity: modal ? 0.5 : 1,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="col bg_terracota-color shadow-lg m-2 p-2 rounded-1 d-flex flex-column justify-content-center align-items-center">
            <h5 className="fs-2 fw-light mt-2 p-1 word-wrap ">You have</h5>
            <div className="d-flex align-items-center">
              {bookingsCount}
              <button
                className="btn btn-lg my-3"
                onClick={handleBookingsButtonClick}>
                {svgModal}
              </button>
            </div>
          </motion.div>
          <motion.div
            animate={{
              scale: modal ? 0.8 : 1,
              opacity: modal ? 0.5 : 1,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="col bg_terracota-color shadow-lg m-2 p-2 rounded-1 d-flex flex-column justify-content-center align-items-center">
            <h5 className="fs-2 fw-light mt-2 p-1 word-wrap ">Where are your classes?</h5>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-lg my-3"
                onClick={handleLocationsgButtonClick}>
                {svgModal}
              </button>
            </div>

            </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
