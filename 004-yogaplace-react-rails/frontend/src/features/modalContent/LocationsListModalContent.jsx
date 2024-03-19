import { Link } from "react-router-dom";

function LocationListModalContent({ dashboardData }) {
  return (
    <>
      <h2 className=" display-6">List of locations</h2>
      <div className="overflow-y-scroll my-3 w-75">
        <ol className="text-muted text-start">
          {dashboardData.yogaClassesInstructorData &&
            dashboardData.yogaClassesInstructorData.map((l) => (
              <>
                <li key={l.id} className="fw-normal p-1">
                  <strong>{l.location}</strong>
                </li>
              </>
            ))}
        </ol>
      </div>
    </>
  );
}
export default LocationListModalContent;
