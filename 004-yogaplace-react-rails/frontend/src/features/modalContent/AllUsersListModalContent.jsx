function AllUsersListModalContent({ dashboardData }) {
  return (
    <>
      <h2 className=" display-6">List of all users</h2>
      <div className="overflow-y-scroll my-3 w-75">
        <ul className="list-unstyled text-muted text-start">
          {dashboardData.usersList &&
            dashboardData.usersList.map((u) => (
              <>
                <li key={u.id} className="fw-normal p-1">
                  {u.first_name} {u.last_name}
                </li>
              </>
            ))}
        </ul>
      </div>
    </>
  );
}

export default AllUsersListModalContent;
