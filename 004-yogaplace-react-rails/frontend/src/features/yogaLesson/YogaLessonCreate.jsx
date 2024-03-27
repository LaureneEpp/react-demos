import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckIcon from "../../assets/icons/CheckIcon";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import useFetchYogaLessonData from "../../services/useFetchYogaLessonData";

function YogaLessonCreate() {

  const { yogaCategoriesList } = useFetchYogaLessonData();
  const [yogaLessonData, setYogaLessonData] = useState({
    title: "",
    description: "",
    yoga_category_id: "",
  });
  const [, setError] = useState(null);
  const navigate = useNavigate();

  console.log(yogaCategoriesList);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("yoga_lesson[title]", yogaLessonData.title);
    formData.append("yoga_lesson[description]", yogaLessonData.description);
    formData.append(
      "yoga_lesson[yoga_category_id]",
      yogaLessonData.yoga_category_id
    );

    try {
      const API_URL = "http://localhost:3000/api/v1";
      const yogaLessonsResponse = await fetch(`${API_URL}/yoga_lessons`, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });

      if (yogaLessonsResponse.ok) {
        const json = await yogaLessonsResponse.json();
        setYogaLessonData(json);
        navigate(`/yoga_lessons`);
      } else {
        throw new Error(
          `Failed to fetch yoga lesson data with status ${yogaLessonsResponse.status}`
        );
      }
    } catch (error) {
      setError(
        `An error occurred while fetching lesson data: ${error.message}`
      );
    }
  };

  const handleCategorySelect = (e) => {
    const selectedCategoryId = e.target.value;
    setYogaLessonData((prevFormData) => ({
      ...prevFormData,
      yoga_category_id: selectedCategoryId,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setYogaLessonData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
          <h2 className="text-uppercase fw-semibold">L</h2>
          <h2 className="text-uppercase fw-semibold">E</h2>
          <h2 className="text-uppercase fw-semibold">S</h2>
          <h2 className="text-uppercase fw-semibold">S</h2>
          <h2 className="text-uppercase fw-semibold">O</h2>
          <h2 className="text-uppercase fw-semibold">N</h2>
        </div>
        <div className="col-9 d-flex flex-column align-items-center justify-content-center">
          <form className=" border border-2 p-4" onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <label className="my-2" htmlFor="category">
                Choose a Yoga Category
              </label>
              <select
                id="yoga_category"
                className="form-control form-control-lg"
                name="yoga_category_id"
                value={yogaLessonData.yoga_category_id}
                onChange={handleCategorySelect}
                required>
                <option value="">Select a category</option>
                {yogaCategoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group my-2">
              <label className="my-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control form-control-lg"
                name="title"
                value={yogaLessonData.title}
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
                value={yogaLessonData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex">
              <Link
                to="/yoga_lessons"
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
  );
}

export default YogaLessonCreate;
