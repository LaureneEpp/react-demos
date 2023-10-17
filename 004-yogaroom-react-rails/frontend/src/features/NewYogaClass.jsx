import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NewYogaClass() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseURL = "http://localhost:3000";
      const apiUrl = `${baseURL}/api/v1/yoga_classes`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ yoga_class: formData }),
      });

      if (response.status === 201) {
        const yoga_class = await response.json();
        console.log("Yoga class has been created successfully.");
        navigate(`/yoga_classes/${yoga_class.id}`);
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while creating the yoga class:", error);
    }
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
            <div className="form-group my-2">
              <label className="my-2" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                id="location"
                className="form-control form-control-lg"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group my-2">
              <label className="my-2" htmlFor="date">
                Date
              </label>
              <input
                id="date"
                className="form-control form-control-lg"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-lg custom-button my-3">
              New yoga class
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewYogaClass;
