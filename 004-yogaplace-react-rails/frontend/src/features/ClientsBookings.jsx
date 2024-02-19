import useFetchDashboardData from "../fetchingData/useFetchDashboardData";


function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

const ClientsBookings = ({ currUser }) => {
  const dashboardData = useFetchDashboardData({ currUser });

  return (
    <div className="mt-5 p-5 d-flex flex-column justify-content-center align-items-center overflow-auto">
      <h3>Your bookings</h3>
      <div className=" overflow-y-scroll my-3 w-75">
        {dashboardData.bookingsInstructorData && (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="bg-transparent text-white">
                    #
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    Title
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    Location
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    Date
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    First name
                  </th>
                  <th scope="col" className="bg-transparent text-white">
                    Last name
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.bookingsInstructorData.map((b, index) => (
                  <tr key={b.id}>
                    <th scope="row" className="bg-transparent text-white">
                      {index + 1}
                    </th>
                    <td className="bg-transparent text-white">
                      {b.yoga_class.yoga_lesson.title}
                    </td>
                    <td className="bg-transparent text-white">
                      {b.yoga_class.location}
                    </td>
                    <td className="bg-transparent text-white">
                      {formatDate(b.yoga_class.date)}
                    </td>
                    <td className="bg-transparent text-white">
                      {b.user.first_name}
                    </td>
                    <td className="bg-transparent text-white">
                      {b.user.last_name}
                    </td>
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

export default ClientsBookings;
