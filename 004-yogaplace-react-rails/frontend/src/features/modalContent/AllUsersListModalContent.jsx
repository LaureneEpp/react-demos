import { Link } from "react-router-dom";

function AllUsersListModalContent({ dashboardData }) {
  return (
    <>
      <h2 className=" display-6">List of all users</h2>

      <div className="p-3 h-100 overflow-y-auto">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {dashboardData.usersList &&
            dashboardData.usersList.map((u) => (
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
    </>
  );
}

export default AllUsersListModalContent;
