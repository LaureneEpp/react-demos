import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "../components/Modal";
import useFetchDashboardData from "../fetchingData/useFetchDashboardData";
import YogaClassesInstructorModalContent from "./YogaClassesInstructorModalContent";
import UsersYogaClassListModalContent from "./UsersYogaClassListModalContent";
import InstructorsListModalContent from "./InstructorsListModalContent";
import NoBookingClassListModalContent from "./noBookingClassListModalContent";

const AdminDashboard = ({ currUser }) => {
  const dashboardData = useFetchDashboardData({ currUser });
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const svgModal = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      fill="white"
      className="bi bi-eye-fill me-1"
      viewBox="0 0 16 16">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
    </svg>
  );

  const yogaClassCount = (
    <>
      <p className="fs-3 text-white uppercase px-4 my-3">
        <strong>{dashboardData.yogaClassesCount}</strong> classes
      </p>
    </>
  );
  const bookingsCount = (
    <>
      <p className="fs-3 text-white uppercase px-4 my-3">
        <strong>{dashboardData.bookingsCount}</strong> clients
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
            {y.first_name} {y.last_name}
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

  const closeModal = () => {
    setModal(false);
    setModalContent(null);
  };

  return (
    <>
      <div className="container text-center">
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
            className="col-md-auto bg_terracota-color shadow-lg m-2 p-2 rounded-1 d-flex flex-column justify-content-center align-items-center">
            <h5 className="fs-2 fw-light mt-2 p-1 word-wrap ">
              Who are your clients ?
            </h5>
            <div className="d-flex align-items-center">
              {bookingsCount}
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
            className="col-md-auto bg_terracota-color shadow-lg m-2 p-2 rounded-1">
            <h5 className="fs-4 fw-light mt-2 p-1 word-wrap ">You have</h5>
            <p>{dashboardData.bookingsCount} bookings</p>
          </motion.div>
          <motion.div
            animate={{
              scale: modal ? 0.8 : 1,
              opacity: modal ? 0.5 : 1,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="col col-lg-2 bg_terracota-color shadow-lg m-2 p-2 rounded-1"></motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;