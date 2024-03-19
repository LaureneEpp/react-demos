import { Link } from "react-router-dom";

function UsersYogaClassListModalContent({ dashboardData }) {
  return (
    <>
      <h2 className=" display-6">Your clients</h2>
      <div className="overflow-y-scroll my-3 w-75">
        {dashboardData.yogaClassUsersHash &&
          Object.entries(dashboardData.yogaClassUsersHash).map(
            ([title, users]) => (
              <>
                <ul className="list-unstyled text-muted text-start">
                  <li className="fw-bold">
                    Link
                    {title}
                    <ol className="text-start">
                      {users.map((user) => (
                        <li key={user.id} className="fw-normal p-1">
                          {user.first_name} {user.last_name}
                        </li>
                      ))}
                    </ol>
                  </li>
                </ul>
              </>
            )
          )}
      </div>
    </>
  );
}

export default UsersYogaClassListModalContent;
