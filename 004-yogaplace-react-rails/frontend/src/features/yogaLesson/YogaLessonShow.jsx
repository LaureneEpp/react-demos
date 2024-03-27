import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingAnimation from "../LoadingAnimation";
import useFetchYogaLessonData from "../../fetchingData/useFetchYogaLessonData";
import DeleteYogaLesson from "./YogaLessonDelete";
import HomeIcon from "../../assets/icons/homeIcon";
import EditIcon from "../../assets/icons/EditIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import CalendarIcon from "../../assets/icons/CalendarIcon";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function YogaLessonShow({ currUser }) {
  const { yogaLessonData, error } = useFetchYogaLessonData();

  const { id } = useParams();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!yogaLessonData) {
    return <LoadingAnimation />;
  }

  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent px-4 margin-top-8">
        <div className="m-3">
          <h3 className="display-4">{yogaLessonData.title}</h3>
          <p className="lead text-muted">{yogaLessonData.description}</p>
          <hr className="my-4" />
          <div className="d-flex">
            <Link
              to="/"
              className="btn btn-lg secondary-color my-3 p-2"
              role="button">
              <HomeIcon />
            </Link>
            {currUser && currUser.role === "instructor" && (
              <>
                <p className="align-self-center my-3 p-2">|</p>
                <Link
                  to={`/yoga_lessons/${id}/edit`}
                  className="btn btn-lg terracota-color my-3 p-2"
                  role="button">
                  <EditIcon />
                </Link>
                <p className="align-self-center my-3 p-2">|</p>
                <DeleteYogaLesson yogaLessonId={yogaLessonData.id} />
              </>
            )}
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div className="container overflow-auto align-self-center px-5">
        <div className="text-center">
          <h3>When & Where to practice?</h3>
          <div className="d-flex align-items-center justify-content-center align-content-center my-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {yogaLessonData.yoga_classes.map((yoga_class) => (
              <Link
                to={`/yoga_classes/${yoga_class.id}`}
                key={yoga_class.id}
                className="text-decoration-none white-color">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="col border border-light m-2 p-3">
                  <div className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-row w-100">
                      <LocationIcon width={25} height={25}/>
                      <p>{yoga_class.location}</p>
                    </div>
                    <div className="d-flex flex-row w-100">
                      <CalendarIcon/>
                      <p>{formatDate(yoga_class.date)}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YogaLessonShow;
