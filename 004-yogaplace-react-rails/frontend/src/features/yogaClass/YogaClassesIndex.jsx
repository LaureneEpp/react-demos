import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import IdentityIcon from "../../assets/icons/IdentityIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import useFetchYogaClassData from "../../services/useFetchYogaClassData";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function YogaClassesIndex({ currUser }) {
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
                <IdentityIcon width={20} height={20}  />
                <p className="m-auto ps-2">{yoga_class.user.username}</p>
              </div>
              <div className="d-flex align-items-center">
                <LocationIcon width={20} height={20} />
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
            <PlusIcon />
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
              <PlusIcon/>
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

export default YogaClassesIndex;
