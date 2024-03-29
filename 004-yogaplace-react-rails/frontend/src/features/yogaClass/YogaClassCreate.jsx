import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/Button/BackButton";
import SubmitButton from "../../components/Button/SubmitButton";
import useFetchYogaLessonData from "../../services/useFetchYogaLessonData";

function YogaClassCreate({ currUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      date: "",
      yoga_lesson_id: "",
      user_id: "",
    },
  });
  const { yogaLessonsList, setYogaClassData, API_URL } =
    useFetchYogaLessonData();
  useFetchYogaLessonData();
  const navigate = useNavigate();
  const [, setError] = useState(null);

  const onSubmit = async (yogaClassData) => {
    const formData = new FormData();
    formData.append("yoga_class[location]", yogaClassData.location);
    formData.append("yoga_class[date]", yogaClassData.date);
    formData.append("yoga_class[yoga_lesson_id]", yogaClassData.yoga_lesson_id);
    formData.append("yoga_class[user_id]", currUser.id);

    try {
      const yogaClassResponse = await fetch(`${API_URL}/yoga_classes`, {
        method: "POST",
        body: formData,
      });

      if (!yogaClassResponse.ok) {
        throw new Error(
          `Failed to fetch yoga class data with status ${yogaClassResponse.status}`
        );
      }
      const json = await yogaClassResponse.json();
      setYogaClassData(json);
    } catch (error) {
      setError(
        `An error occurred while fetching lesson data: ${error.message}`
      );
    }
    navigate(`/yoga_classes`);
  };

  return (
    <div className="h-100 m-4">
      <div className="h-100 d-flex flex-column align-items-center justify-content-center">
        <div className="text-center px-4 margin-top-8">
          <h3 className="display-4 text-uppercase fw-semibold">
            Add a new class
          </h3>
        </div>
        <form
          className=" border border-2 p-4 my-5"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group my-2">
            <select
              {...register("yoga_lesson_id", { required: true })}
              className="form-control form-control-lg">
              <option value="">Select a lesson</option>
              {yogaLessonsList.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
            {errors.yoga_lesson_id && <p>This field is required!</p>}
          </div>
          <div className="form-group my-2">
            <input
              {...register("location", { required: true })}
              placeholder="Location"
              className="form-control form-control-lg"
            />
            {errors.location && <p>This field is required!</p>}
          </div>
          <div className="form-group my-2">
            <input
              {...register("date", { required: true })}
              type="date"
              placeholder="Date"
              className="form-control form-control-lg"
            />
            {errors.date && <p>This field is required!</p>}
          </div>
          <div className="d-flex">
            <BackButton path={"/yoga_classes"} />
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default YogaClassCreate;
