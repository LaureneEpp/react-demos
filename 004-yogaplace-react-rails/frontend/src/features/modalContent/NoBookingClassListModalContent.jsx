function NoBookingClassListModalContent({dashboardData}) {
  return (
    <>
      <h2 className=" display-6">List of your classes without booking</h2>
      <div className="overflow-y-scroll my-3 w-75">
        <ul className="list-unstyled text-muted text-start">
          {dashboardData.noBookingYogaClasses &&
            dashboardData.noBookingYogaClasses.map((y) => (
              <>
                <li key={y.id} className="fw-normal p-1">
                  {y.yoga_lesson.title}
                </li>
              </>
            ))}
        </ul>
      </div>
    </>
  );
}

export default NoBookingClassListModalContent;
