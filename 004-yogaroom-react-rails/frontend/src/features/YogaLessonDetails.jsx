/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function YogaLessonDetails() {
  const [yoga_lesson, setYogaLesson] = useState(null);
  // const [yoga_classes, setYogaClasses] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const API_URL = "http://localhost:3000/api/v1";

        // Fetch the yoga lesson details
        const lessonResponse = await fetch(`${API_URL}/yoga_lessons/${id}`);

        if (lessonResponse.ok) {
          const lessonData = await lessonResponse.json();
          setYogaLesson(lessonData);
        } else {
          throw new Error(
            `Failed to fetch yoga class data with status ${lessonResponse.status}`
          );
        }
      } catch (e) {
        setError(`An error occurred: ${e.message}`);
      }
    }
    fetchData();
  }, [id]);

  const deleteYogaLesson = async () => {
    try {
      const API_URL = "http://localhost:3000/api/v1";
      const response = await fetch(`${API_URL}/yoga_lessons/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/yoga_lessons");
      } else {
        throw response;
      }
    } catch (error) {
      console.error(
        `An error occurred while deleting the yoga lesson: ${error.message}`
      );
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!yoga_lesson) {
    return <h3>...Loading...</h3>;
  }

  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="m-5">
          <h2 className="display-4">{yoga_lesson.title}</h2>
          <p className="lead text-muted">{yoga_lesson.description}</p>
          <hr className="my-4" />
          <div className="d-flex">
            <Link
              to="/"
              className="btn btn-lg secondary-color my-3 p-2"
              role="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-house-door-fill"
                viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
              </svg>
            </Link>
            <p className="align-self-center my-3 p-2">|</p>
            <Link
              to={`/yoga_lessons/${id}/edit`}
              className="btn btn-lg terracota-color my-3 p-2"
              role="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </Link>
            <p className="align-self-center my-3 p-2">|</p>
            <button onClick={deleteYogaLesson} className="btn btn-lg my-3 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-trash3-fill orange-light-color"
                viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
              </svg>
            </button>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <h3>When & Where to practice?</h3>
            <div className="d-flex align-items-center justify-content-center align-content-center my-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {yoga_lesson.yoga_classes.map((yoga_class) => (
                <Link to={`/yoga_classes/${yoga_class.id}`}
                className="text-decoration-none white-color"
                >
                <div
                  key={yoga_class.id} 
                  className="col border border-light m-2 p-3">
                  <div className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-row">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-geo-alt mx-2"
                        viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>
                      <p>{yoga_class.location}</p>
                    </div>
                    <div className="d-flex flex-row">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-calendar-event mx-2"
                        viewBox="0 0 16 16">
                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                      </svg>
                      <p>{formatDate(yoga_class.date)}</p>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YogaLessonDetails;
