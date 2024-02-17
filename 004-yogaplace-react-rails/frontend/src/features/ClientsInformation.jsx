import useFetchDashboardData from "../fetchingData/useFetchDashboardData";

const ClientsInformation = ({ currUser }) => {
  const dashboardData = useFetchDashboardData({ currUser });

  return (
    <div className="d-flex flex-column align-items-center">
      <h3>Your clients</h3>
      <div className="p-3 overflow-y-auto">
        {dashboardData.clientsCurrentInstructor && (
          <div className="table-responsive">
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
                    <th scope="row" className="bg-transparent text-white">
                      {index + 1}
                    </th>
                    <td className="bg-transparent text-white">{u.first_name}</td>
                    <td className="bg-transparent text-white">{u.last_name}</td>
                    <td className="bg-transparent text-white">{u.username}</td>
                    <td className="bg-transparent text-white">{u.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsInformation;
