import React from "react";
import { Link } from "react-router-dom";

function CategoryLessons(category, yoga_lessons) {

  return (
    <div
      className="shadow-lg bg_terracota-color p-3 my-4 rounded-top">
      <h3 className="m-2 py-3">{category}</h3>
      <div className="row">
        {yoga_lessons.map((yoga_lesson) => (
          <div key={yoga_lesson.id} className="col-md-6 col-lg-4">
            <div className="card mb-4 custom-card">
              <div className="card-body">
                <h5 className="card-title mb-2">{yoga_lesson.title}</h5>
                <p className="card-text">{yoga_lesson.description}</p>
                {/* <button
                    onClick={() => handleDelete(yoga_lesson.id)}
                    className="btn btn-lg my-3 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      className="bi bi-trash3-fill orange-light-color"
                      viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                  </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryLessons;
