import { Link } from "react-router-dom";
import LoadingAnimation from "../../features/LoadingAnimation";
import { motion } from "framer-motion";
import useFetchYogaLessonData from "../../fetchingData/useFetchYogaLessonData";
import PlusIcon from "../../assets/icons/PlusIcon"

function YogaLessonsList({ currUser }) {
  const { yogaLessonsList } = useFetchYogaLessonData(null);

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
              <PlusIcon/>
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
