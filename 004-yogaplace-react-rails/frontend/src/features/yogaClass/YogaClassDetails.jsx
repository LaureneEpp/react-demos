import { useParams, useNavigate, Link } from "react-router-dom";
import LoadingAnimation from "../../features/LoadingAnimation";
import BookingButton from "./BookingButton";
import useFetchYogaLessonData from "../../fetchingData/useFetchYogaLessonData";
import useFetchYogaClassData from "../../fetchingData/useFetchYogaClassData";
import DeleteYogaClass from "./DeleteYogaClass";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function YogaClassDetails({currUser}) {
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
          <p className="lead text-muted">{yogaClassData.yoga_lesson.description}</p>

          <hr className="my-4" />
          <div className="card-info d-flex mb-3">
            <div className="card-info-icon d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-geo-alt"
                viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <h5 className="fw-light m-2">{yogaClassData.location}</h5>
            </div>
            <div className="card-info-icon d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
              <h5 className="fw-light m-2">{yogaClassData.user.username}</h5>
            </div>
            <div className="card-info-icon d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-calendar-event"
                viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-house-door-fill"
                  viewBox="0 0 16 16">
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                </svg>
              </Link>
              {currUser && currUser.role === "instructor" && (
                <>
                  <p className="align-self-center my-3 p-2">|</p>
                  <Link
                    to={`/yoga_classes/${id}/edit`}
                    className="btn btn-lg terracota-color my-3 p-2"
                    role="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
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
