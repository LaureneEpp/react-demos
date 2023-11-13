import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import { motion } from "framer-motion";


function YogaLessonsList() {
  const [yoga_lessons, setYogaLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);

  const { id  } = useParams();


  useEffect(() => {
    async function loadYogaLessons() {
      try {
        const API_URL = "http://localhost:3000/api/v1";
        const response = await fetch(`${API_URL}/yoga_lessons`);
        console.log("API response:", response);
        console.log("Yoga lessons have been loaded successfully.");

        if (response.ok) {
          const json = await response.json();
          console.log("Yoga lessons data:", json);
          setYogaLessons(json);
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } catch (e) {
        setError(`An error occurred while loading yoga lessons: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadYogaLessons();
  }, []);

  const lessonsByCategory = {};
  yoga_lessons.forEach((yoga_lesson) => {
    const category = yoga_lesson.yoga_category.title;
    if (!lessonsByCategory[category]) {
      lessonsByCategory[category] = [];
    }
    lessonsByCategory[category].push(yoga_lesson);
  });

  if (loading) {
    return (
      <LoadingAnimation/>
    )
  }

  return (
    <div className="container py-5">
      <h2 className="display-4">All the yoga lessons you wish</h2>
      <p className="lead text-muted">
        We pulled together a great plan for you!
      </p>
      <Link to="/yoga_lessons/new" className="btn btn-lg my-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-plus-circle-fill secondary-color"
          viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>
      </Link>

      <div className="py-3">
        {Object.keys(lessonsByCategory).map((category) => (
          <div
            key={category.id}
            className="shadow-lg bg_terracota-color p-3 my-4 rounded-top">
            <h3 className="m-2 py-3">{category}</h3>
            <div className="row">
              {lessonsByCategory[category].map((yoga_lesson) => (
                <div key={yoga_lesson.id} className="col-md-6 col-lg-4">
                  <div className="card mb-4 custom-card">
                    <Link
                      to={`/yoga_lessons/${yoga_lesson.id}`}
                      className="text-decoration-none text-reset">
                      <div className="card-body">
                        <h5 className="card-title mb-2">{yoga_lesson.title}</h5>
                        <p className="card-text">{yoga_lesson.description}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YogaLessonsList;
