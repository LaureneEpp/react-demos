
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"

function NewYogaLesson() {


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    yoga_category_id: "",
  });

  const [yoga_categories, setYogaCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLessons() {
      try {
        const baseURL = "http://localhost:3000";
        const apiUrl = `${baseURL}/api/v1/yoga_categories`;
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setYogaCategories(data);
        } else {
          console.log("Failed to fetch categories");
        }
      } catch (error) {
        console.error("An error occurred while fetching categories:", error);
      }
    }
    fetchLessons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseURL = "http://localhost:3000";
      const apiUrl = `${baseURL}/api/v1/yoga_lessons`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ yoga_lesson: formData }),
      });

      if (response.status === 201) {
        const yoga_lesson = await response.json();
        console.log("Yoga lesson has been created successfully.");
        navigate(`/yoga_lessons`);
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while creating the yoga lesson:", error);
    }
  };

  const handleCategorySelect = (e) => {
    const selectedCategoryId = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      yoga_category_id: selectedCategoryId,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
                value={formData.yoga_category_id}
                onChange={handleCategorySelect}
                required>
                <option value="">Select a category</option>
                {yoga_categories.map((category) => (
                  <option key={yoga_categories.id} value={category.id}>
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
                value={formData.title}
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
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex">
              <Link
                to="/yoga_lessons"
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
                  className="bi bi-plus-circle-fill secondary-color"
                  viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewYogaLesson;
