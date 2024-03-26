import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useFetchYogaClassData from "../../fetchingData/useFetchYogaClassData";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function YogaClassesList({ currUser }) {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const { yogaClassesList } = useFetchYogaClassData();
  const { id } = useParams();


  // const handleDelete = async (id) => {
  //   try {
  //     const API_URL = "http://localhost:3000/api/v1";
  //     const response = await fetch(`${API_URL}/yoga_classes/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (response.ok) {
  //       // setYogaClasses(
  //       //   yogaClassesList.filter((yoga_class) => yoga_class.id !== id)
  //       // );
  //     } else {
  //       throw response;
  //     }
  //   } catch (e) {
  //     console.error(
  //       `An error occurred while deleting the yoga class: ${e.message}`
  //     );
  //   }
  // };

  // Group yoga classes by date
  const yogaClassesByDate = yogaClassesList.reduce((result, yoga_class) => {
    const classDate = new Date(yoga_class.date).toDateString();
    if (!result[classDate]) {
      result[classDate] = [];
    }
    result[classDate].push(yoga_class);
    return result;
  }, {});

  // Filter yoga classes for the selected date
  const filteredYogaClasses = selectedDate
    ? yogaClassesByDate[selectedDate]
    : [];

  const allYogaClasses = (
    <div className="d-flex align-items-center justify-content-center align-content-center my-4 mx-2 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
      {filteredYogaClasses.map((yoga_class) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          key={yoga_class.id}
          className="border border-0 shadow m-3 p-3 bg_orange-light-color position-relative custom-yoga-class">
          {currUser && currUser.role === "instructor" && (
            <>
              {/* <DeleteYogaClass yogaClassId={yoga_class.id}  className="position-absolute top-0 start-100 translate-middle z-3"/> */}
            </>
          )}
          <Link
            to={`/yoga_classes/${yoga_class.id}`}
            className="text-decoration-none text-reset">
            <h5 className="mb-1 text-center">{yoga_class.yoga_lesson.title}</h5>
            <div className="d-flex flex-column align-items-start ms-4 ps-4">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
                <p className="m-auto ps-2">{yoga_class.user.username}</p>
              </div>
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16">
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                <p className="m-auto ps-2">{yoga_class.location}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );

  const noYogaClass = (
    <p className="lead text-muted">
      No yoga class scheduled yet.
      {currUser && currUser.role === "instructor" && (
        <>
          Why not add one :{" "}
          <Link to="/yoga_classes/new" className="btn btn-lg" role="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-plus-circle-fill secondary-color"
              viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </Link>
        </>
      )}
    </p>
  );

  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center px-4 margin-top-8">
        <h2 className="display-4">All the yoga classes you wish</h2>
        <p className="lead text-muted">
          We pulled together a great agenda for you!
        </p>
        {currUser && currUser.role === "instructor" && (
          <>
            <Link to="/yoga_classes/new" className="btn btn-lg" role="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-plus-circle-fill secondary-color"
                viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </Link>
          </>
        )}
      </div>
      <div className="p-3 overflow-y-auto">
        <div className="d-flex justify-content-center">
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={(value) => {
              setSelectedDate(value.toDateString());
            }}
          />
        </div>
        <div className="my-4 text-center">
          {filteredYogaClasses.length > 0 ? allYogaClasses : noYogaClass}
        </div>
      </div>
    </div>
  );
}

export default YogaClassesList;
