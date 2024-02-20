import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation";
import useFetchYogaClassData from "../../fetchingData/useFetchYogaClassData";

function EditYogaClass() {
  const { yogaClassData, updateYogaClassData } = useFetchYogaClassData();
  const [, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateYogaClassData({ [name]: value });
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
        body: JSON.stringify(yogaClassData),
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

  if (!yogaClassData) {
    return <LoadingAnimation />;
  }

  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card bg-transparent border border-2 p-2">
              <div className="card-header p-3 d-flex flex-row">
                <h2 className="card-title white-color display-4">
                  Edit this class
                </h2>
              </div>
              <div className="card-body">
                <form className="" onSubmit={handleSubmit}>
                  <div className="form-group my-2">
                    <label className="my-2" htmlFor="title">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="form-control form-control-lg"
                      name="title"
                      value={yogaClassData.yoga_lesson.title}
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
                      value={yogaClassData.yoga_lesson.description}
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
                      value={yogaClassData.location}
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
                      value={yogaClassData.date}
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
                        className="bi bi-arrow-left-circle"
                        viewBox="0 0 16 16">
                        <path
                          fillRule="evenodd"
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
        </div>
      </div>
    </div>
  );
}

export default EditYogaClass;
