import { Link } from "react-router-dom";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function AllBookingsListModalContent({ dashboardData }) {
  return (
    <>
      <h2 className=" display-6">List of all bookings</h2>
      <div className="overflow-y-scroll my-3 w-75">
        {dashboardData.bookingsList && (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="bg-transparent text-white text-center">
                    #
                  </th>
                  <th scope="col" className="bg-transparent text-white text-center">
                    Date
                  </th>
                  <th scope="col" className="bg-transparent text-white text-center">
                    Title
                  </th>
                  <th scope="col" className="bg-transparent text-white text-center">
                    Location
                  </th>
                  <th scope="col" className="bg-transparent text-white text-center">
                    First name
                  </th>
                  <th scope="col" className="bg-transparent text-white text-center">
                    Last name
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.bookingsList.map((b, index) => (
                  <tr key={b.id}>
                    <th scope="row" className="bg-transparent text-white text-center">
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
                      {b.user.first_name}
                    </td>
                    <td className="bg-transparent text-white text-center">
                      {b.user.last_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default AllBookingsListModalContent;
