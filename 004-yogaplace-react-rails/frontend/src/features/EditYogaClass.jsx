import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";


function EditYogaClass() {
  const [yoga_class, setYogaClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } finally {
        setLoading(false);
      }
    }
    fetchYogaClass();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setYogaClass((prevYogaClass) => ({ ...prevYogaClass, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = "http://localhost:3000/api/v1";
      const response = await fetch(`${API_URL}/yoga_classes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(yoga_class),
      });
      if (response.ok) {
        const json = await response.json();
        console.log("success", json);
        navigate(`/yoga_classes/${id}`);
      } else {
        throw response;
      }
    } catch (e) {
      console.error("An error occurred while editing the yoga class:", e);
    } finally {
      setLoading(false);
    }
  };


  if (!yoga_class) {
    return (
      <LoadingAnimation/>
    )
  }

  return (
    <div className="vh-100 m-4">
      <div className="new-form">
        <div className="new-form-title col-3">
          <h2 className="text-uppercase fw-semibold">E</h2>
          <h2 className="text-uppercase fw-semibold">D</h2>
          <h2 className="text-uppercase fw-semibold">I</h2>
          <h2 className="text-uppercase fw-semibold">T</h2>
          <h2 className="text-uppercase fw-semibold">*</h2>
          <h2 className="text-uppercase fw-semibold">Y</h2>
          <h2 className="text-uppercase fw-semibold">O</h2>
          <h2 className="text-uppercase fw-semibold">G</h2>
          <h2 className="text-uppercase fw-semibold">A</h2>
          <h2 className="text-uppercase fw-semibold">*</h2>
          <h2 className="text-uppercase fw-semibold">C</h2>
          <h2 className="text-uppercase fw-semibold">L</h2>
          <h2 className="text-uppercase fw-semibold">A</h2>
          <h2 className="text-uppercase fw-semibold">S</h2>
          <h2 className="text-uppercase fw-semibold">S</h2>
        </div>
        <div className="col-9 d-flex flex-column align-items-center justify-content-center">
          <form className=" border border-2 p-4 w-75" onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <label className="my-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control form-control-lg"
                name="title"
                value={yoga_class.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-2">
              <label className="my-2" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                id="description"
                className="form-control form-control-lg"
                name="description"
                value={yoga_class.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-2">
              <label className="my-2" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                className="form-control form-control-lg"
                name="location"
                value={yoga_class.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-2">
              <label className="my-2" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="form-control form-control-lg"
                name="date"
                value={yoga_class.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex">
              <Link
                to={`/yoga_classes/${id}`}
                className="btn btn-lg secondary-color my-3 p-2"
                role="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-arrow-left-circle"
                  viewBox="0 0 16 16">
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
              </Link>

              <button type="submit" className="btn my-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-check-lg secondary-color"
                  viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditYogaClass;
