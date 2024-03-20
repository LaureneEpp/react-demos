import { useState } from "react";
import { Link } from "react-router-dom";
import useFetchDashboardData from "../../fetchingData/useFetchDashboardData";
import Modal from "../../components/Modal";
import AllUsersListModalContent from "../modalContent/AllUsersListModalContent";
import LoadingAnimation from "../LoadingAnimation";

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

  if (!dashboardData) {
    return <LoadingAnimation />;
  }

  return (
    <div className="h-100 p-2">
      <Modal {...{ modal, setModal: closeModal, content: modalContent }} />
      <h3 className="display-4 text-center my-3">Your clients</h3>
      <div className="p-3 h-100 overflow-y-auto">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {dashboardData.clientsCurrentInstructor &&
            dashboardData.clientsCurrentInstructor.map((u) => (
              <div key={u.id} className="col">
                <div
                  className="card bg_terracota-color shadow-lg text-white m-3"
                  style={{ width: "15rem" }}>
                  <img
                    src={`/profile_default.jpeg`}
                    alt="profileDefault"
                    width={150}
                    height={150}
                    className="card-img-top object-fit-cover"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {u.first_name}
                      {u.last_name}
                    </h5>
                    <p className="card-text">
                      {u.city}
                      {u.email}
                    </p>
                    <Link
                      to={`/users/${u.username}`}
                      className="text-decoration-none text-white">
                      + info
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="d-flex align-items-center ms-5 w-100">
        <p className="text-muted my-3">
          Have a look to the full list of users:
        </p>
        <button className="btn btn-lg my-3" onClick={handleAllUsersButtonClick}>
          {modal ? "X" : svgModal}
        </button>
      </div>
    </div>
  );
};

export default ClientsInformation;
