import { Link } from "react-router-dom";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}
function NoBookingClassListModalContent({ dashboardData }) {
  return (
    <>
      <h2 className=" display-6">List of your classes without booking</h2>
      <div className="overflow-y-scroll my-3 w-75">
      <ol className="text-muted text-start">
          {dashboardData.noBookingYogaClasses &&
            dashboardData.noBookingYogaClasses.map((y) => (
              <>
                <Link
                  to={`/yoga_classes/${y.id}`}
                  className="text-decoration-none text-reset">
                  <li key={y.id} className="fw-normal p-1">
                    <strong>{y.yoga_lesson.title}</strong> <i className="bi bi-geo-alt-fill"></i> taking place in{" "}
                    {y.location} on {formatDate(y.date)}
                  </li>
                </Link>
              </>
            ))}
        </ol>
      </div>
    </>
  );
}

export default NoBookingClassListModalContent;
