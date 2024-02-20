import useFetchDashboardData from "../fetchingData/useFetchDashboardData";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "../components/Modal";
import AllUsersListModalContent from "./AllUsersListModalContent";

const ClientsInformation = ({ currUser }) => {
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

  const handleAllUsersButtonClick = () => {
    setModalContent(<AllUsersListModalContent {...{ dashboardData }} />);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setModalContent(null);
  };

  return (
    <div className="d-flex flex-column flex-start">
      <Modal {...{ modal, setModal: closeModal, content: modalContent }} />
      <h3 className="display-4 text-center">Your clients</h3>
      <div className="p-3 overflow-y-auto">
        {dashboardData.clientsCurrentInstructor && (
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
                  <th scope="col" className="bg-transparent text-white">
                    #
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    First name
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    Last name
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    Username
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.clientsCurrentInstructor.map((u, index) => (
                  <tr key={u.id}>
                    <th scope="row" className="bg-transparent text-white text-center">
                      {index + 1}
                    </th>
                    <td className="bg-transparent text-white text-center">
                      {u.first_name}
                    </td>
                    <td className="bg-transparent text-white text-center">{u.last_name}</td>
                    <td className="bg-transparent text-white text-center">{u.username}</td>
                    <td className="bg-transparent text-white text-center">{u.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
      <div className="d-flex align-items-center">
        <p className="text-muted my-3">Have a look to the full list of users:</p>
        <button
          className="btn btn-lg my-3"
          onClick={handleAllUsersButtonClick}>
          {modal ? "X" : svgModal}
        </button>
      </div>
    </div>
  );
};

export default ClientsInformation;
