import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function YogaClassDetails() {
  const [yoga_class, setYogaClass] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    async function fetchYogaClass() {
      try {
        const API_URL = "http://localhost:3000/api/v1";
        const response = await fetch(`${API_URL}/yoga_classes/${id}`);
        console.log("API response:", response);
        console.log(`Yoga class with ID ${id} has been loaded successfully.`);
        if (response.ok) {
          const json = await response.json();
          console.log("Yoga classes data:", json);
          setYogaClass(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError(`An error occurred while loading yoga classes: ${e.message}`);
      }
    }
    fetchYogaClass();
  }, [id]);

  const deleteYogaClass = async () => {
    try {
      const API_URL = "http://localhost:3000/api/v1";
      const response = await fetch(`${API_URL}/yoga_classes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/yoga_classes");
      } else {
        throw response;
      }
    } catch (error) {
      console.error(
        `An error occurred while deleting the yoga class: ${e.message}`
      );
    }
  };

  if (!yoga_class) return <h3>...Loading...</h3>;

  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="m-5">
          <h1 className="display-4">{yoga_class.title}</h1>
          <p className="lead">{yoga_class.description}</p>
          <hr className="my-4" />
          <div className="card-info d-flex justify-content-around mb-3">
            <div className="card-info-icon d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-geo-alt"
                viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <h5 className="fw-light m-2">{yoga_class.location}</h5>
            </div>
            <div className="card-info-icon d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-calendar-event"
                viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
              <h5 className="fw-light m-2">{formatDate(yoga_class.date)}</h5>
            </div>
          </div>
          <hr className="my-4" />
          <div className="d-flex">
            <Link to="/" className="btn btn-lg custom-button my-3 p-2" role="button">
              Back home
            </Link>
            <p className="align-self-center my-3 p-2">|</p>
            <Link to={`/yoga_classes/${id}/edit`} className="btn btn-lg edit-button my-3 p-2" role="button">
              Edit
            </Link>
            <p className="align-self-center my-3 p-2">|</p>
            <button
              onClick={deleteYogaClass}
              className="btn btn-lg delete-button my-3 p-2">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YogaClassDetails;
