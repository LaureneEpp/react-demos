import { Link } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";
import { motion } from "framer-motion";
import useFetchYogaLessonsList from "../../fetchingData/useFetchYogaLessonsList";

function YogaLessonsList({ currUser }) {
  const { yogaLessonsList } = useFetchYogaLessonsList(null);

  const lessonsByCategory = {};
  yogaLessonsList.forEach((yoga_lesson) => {
    const category = yoga_lesson.yoga_category.title;
    if (!lessonsByCategory[category]) {
      lessonsByCategory[category] = [];
    }
    lessonsByCategory[category].push(yoga_lesson);
  });

  if (!yogaLessonsList) {
    return <LoadingAnimation />;
  }

  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center px-4 margin-top-8">
        <h2 className="display-4">All the yoga lessons you wish</h2>
        <p className="lead text-muted">
          We pulled together a great plan for you!
        </p>
        {currUser && currUser.role === "instructor" && (
          <>
            <Link to="/yoga_lessons/new" className="btn btn-lg">
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
          </>
        )}
      </div>

      <div className="p-5 overflow-y-auto">
        {Object.keys(lessonsByCategory).map((category) => (
          <div
            key={category.id}
            className="shadow-lg bg_terracota-color my-3 p-3 rounded-top">
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
