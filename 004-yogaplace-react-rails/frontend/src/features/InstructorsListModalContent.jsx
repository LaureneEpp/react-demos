function InstructorsListModalContent({ dashboardData }) {
  return (
    <>
      <h2 className=" display-6">List of your teammates</h2>
      <div className="overflow-y-scroll my-3 w-75">
        <ul className="list-unstyled text-muted text-start">
          {dashboardData.instructorsList &&
            dashboardData.instructorsList.map((y) => (
              <>
                <li key={y.id} className="fw-normal p-1">
                  {y.first_name} {y.last_name}
                </li>
              </>
            ))}
        </ul>
      </div>
    </>
  );
}

export default InstructorsListModalContent;
