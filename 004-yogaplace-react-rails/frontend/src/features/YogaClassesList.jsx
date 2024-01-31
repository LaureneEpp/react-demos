import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function YogaClassesList({ currUser }) {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [yoga_classes, setYogaClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function loadYogaClasses() {
      try {
        const baseURL = "http://localhost:3000";
        const apiURL = `${baseURL}/api/v1/yoga_classes`;
        const response = await fetch(apiURL);
        console.log("API response:", response);
        console.log("Yoga classes have been loaded successfully.");

        if (response.ok) {
          const json = await response.json();
          // console.log("Yoga classes data:", json);
          setYogaClasses(json);
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } catch (e) {
        setError(`An error occurred while loading yoga classes: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadYogaClasses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const API_URL = "http://localhost:3000/api/v1";
      const response = await fetch(`${API_URL}/yoga_classes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setYogaClasses(
          yoga_classes.filter((yoga_class) => yoga_class.id !== id)
        );
      } else {
        throw response;
      }
    } catch (e) {
      console.error(
        `An error occurred while deleting the yoga class: ${e.message}`
      );
    }
  };

  // Group yoga classes by date
  const yogaClassesByDate = yoga_classes.reduce((result, yoga_class) => {
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
              <button
                onClick={() => handleDelete(yoga_class.id)}
                className="btn btn-lg position-absolute top-0 start-100 translate-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-trash3-fill white-color"
                  viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
              </button>
            </>
          )}
          <Link
            to={`/yoga_classes/${yoga_class.id}`}
            className="text-decoration-none text-reset">
            <h5 className="mb-1">{yoga_class.yoga_lesson.title}</h5>
            <div className="d-flex flex-column">
              <p className="">{yoga_class.location}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );

  const noYogaClass = (
    <div className="my-4">
      <p className="lead ">
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
    </div>
  );

  return (
    <div className="container py-5">
      <div>
        <h2 className="display-4">All the yoga classes you wish</h2>
        <p className="lead text-muted">
          We pulled together a great agenda for you!
        </p>
        {currUser && currUser.role === "instructor" && (
          <>
            <Link
              to="/yoga_classes/new"
              className="btn btn-lg my-3"
              role="button">
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
      <div className="py-3">
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center">
            <Calendar
              onChange={setDate}
              value={date}
              onClickDay={(value) => {
                setSelectedDate(value.toDateString());
              }}
              className="vw-100"
            />
          </div>
          <div className="d-flex justify-content-center my-2">
            {filteredYogaClasses.length > 0 ? allYogaClasses : noYogaClass}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YogaClassesList;
