import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation";
import useFetchYogaClassData from "../../fetchingData/useFetchYogaClassData";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import CheckIcon from "../../assets/icons/CheckIcon";

function YogaClassEdit() {
  const { yogaClassData, updateYogaClassData } = useFetchYogaClassData();
  const [, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

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
                      <ArrowLeftIcon/>
                    </Link>

                    <button type="submit" className="btn my-3">
                      <CheckIcon/>
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

export default YogaClassEdit;
