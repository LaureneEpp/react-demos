import { useParams, useNavigate, Link } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation";
import BookingButton from "./BookingButton";
import useFetchYogaLessonData from "../../fetchingData/useFetchYogaLessonData";
import useFetchYogaClassData from "../../fetchingData/useFetchYogaClassData";
import DeleteYogaClass from "./DeleteYogaClass";
import HomeIcon from "../../assets/icons/homeIcon";
import EditIcon from "../../assets/icons/EditIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import IdentityIcon from "../../assets/icons/IdentityIcon";
import CalendarIcon from "../../assets/icons/CalendarIcon";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function YogaClassDetails({ currUser }) {
  const { yogaClassData } = useFetchYogaClassData();

  const { id } = useParams();

  if (!yogaClassData) {
    return <LoadingAnimation />;
  }

  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent px-4 margin-top-8">
        <div className="m-5">
          <h3 className="display-4">{yogaClassData.yoga_lesson.title}</h3>
          <p className="lead text-muted">
            {yogaClassData.yoga_lesson.description}
          </p>

          <hr className="my-4" />
          <div className="card-info d-flex mb-3">
            <div className="card-info-icon d-flex align-items-center">
              <LocationIcon width={25} height={25}/>
              <h5 className="fw-light m-2">{yogaClassData.location}</h5>
            </div>
            <div className="card-info-icon d-flex align-items-center">
            <IdentityIcon width={25} height={25}/>

              <Link to={`/users/${yogaClassData.user.username}`}
              className="text-decoration-none text-white"
              >
                <h5 className="fw-light m-2">
                  {yogaClassData.user.username}
                </h5>
              </Link>
            </div>
            <div className="card-info-icon d-flex align-items-center">
              <CalendarIcon/>
              <h5 className="fw-light m-2">{formatDate(yogaClassData.date)}</h5>
            </div>
          </div>
          <hr className="my-4" />
          <div className="yoga-class-buttons d-flex justify-content-between">
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
                    to={`/yoga_classes/${id}/edit`}
                    className="btn btn-lg terracota-color my-3 p-2"
                    role="button">
                      <EditIcon/>
                  </Link>
                  <p className="align-self-center my-3 p-2">|</p>
                  <DeleteYogaClass yogaClassId={yogaClassData.id} />
                </>
              )}
            </div>
            <div className="d-flex align-items-center">
              {currUser && (
                <BookingButton
                  currUser={currUser}
                  yogaClassId={yogaClassData.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YogaClassDetails;
