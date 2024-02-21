function InstructorsListModalContent({ dashboardData }) {
  return (
    <>
      <h2 className=" display-6">List of your teammates</h2>
      <div className="overflow-y-scroll my-3 w-75">
        {dashboardData.instructorsList && (
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
                    City
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.instructorsList.map((i, index) => (
                  <tr key={i.id}>
                    <th scope="row" className="bg-transparent text-white">
                      {index + 1}
                    </th>
                    <td className="bg-transparent text-white">
                      {i.first_name}
                    </td>
                    <td className="bg-transparent text-white">
                      {i.last_name}
                    </td>
                    <td className="bg-transparent text-white">
                      {i.city}
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

export default InstructorsListModalContent;
