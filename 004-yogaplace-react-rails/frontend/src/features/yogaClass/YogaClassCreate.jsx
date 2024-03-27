import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchYogaLessonData from "../../fetchingData/useFetchYogaLessonData";
import CheckIcon from "../../assets/icons/CheckIcon";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";

function NewYogaClass({ currUser }) {
  const { yogaLessonsList, API_URL } = useFetchYogaLessonData();
  const [error, setError] = useState(null);
  const [yogaClassData, setYogaClassData] = useState({
    location: "",
    date: "",
    yoga_lesson_id: "",
    user_id: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("yoga_class[location]", yogaClassData.location);
    formData.append("yoga_class[date]", yogaClassData.date);
    formData.append("yoga_class[yoga_lesson_id]", yogaClassData.yoga_lesson_id);
    formData.append("yoga_class[user_id]", currUser.id);

    try {
      const yogaClassResponse = await fetch(`${API_URL}/yoga_classes`, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });

      if (yogaClassResponse.ok) {
        const json = await yogaClassResponse.json();
        setYogaClassData(json);
        navigate(`/yoga_classes`);
      } else {
        throw new Error(
          `Failed to create yoga class (${yogaClassResponse.status}): ${error.message}`
        );
      }
    } catch (error) {
      setError(
        `An error occurred while creating the yoga class: ${error.message}`
      );
    }
  };

  const handleLessonSelect = (e) => {
    const selectedLessonId = e.target.value;
    setYogaClassData((prevFormData) => ({
      ...prevFormData,
      yoga_lesson_id: selectedLessonId,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setYogaClassData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className="vh-100 m-4">
      <div className="new-form">
        <div className="new-form-title col-3">
          <h2 className="text-uppercase fw-semibold">N</h2>
          <h2 className="text-uppercase fw-semibold">E</h2>
          <h2 className="text-uppercase fw-semibold">W</h2>
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
          <form className=" border border-2 p-4" onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <label className="my-2" htmlFor="lesson">
                Choose a Yoga Lesson
              </label>
              <select
                id="yoga_lesson"
                className="form-control form-control-lg"
                name="yoga_lesson_id"
                value={yogaClassData.yoga_lesson_id}
                onChange={handleLessonSelect}
                required>
                <option value="">Select a lesson</option>
                {yogaLessonsList.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
              </select>
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
                to="/yoga_classes"
                className="btn btn-lg secondary-color my-3 p-2"
                role="button">
                <ArrowLeftIcon />
              </Link>
              <button type="submit" className="btn my-3">
                <CheckIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewYogaClass;
