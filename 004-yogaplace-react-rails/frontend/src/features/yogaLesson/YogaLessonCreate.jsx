import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/Button/BackButton";
import SubmitButton from "../../components/Button/SubmitButton";
import useFetchYogaLessonData from "../../services/useFetchYogaLessonData";

function YogaLessonCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      yoga_category_id: "",
      description: "",
      title: "",
    },
  });
  const { yogaCategoriesList, setYogaLessonData, API_URL } =
    useFetchYogaLessonData();
  const navigate = useNavigate();
  const [, setError] = useState(null);

  const onSubmit = async (yogaLessonData) => {
    const formData = new FormData();
    formData.append("yoga_lesson[title]", yogaLessonData.title);
    formData.append("yoga_lesson[description]", yogaLessonData.description);
    formData.append(
      "yoga_lesson[yoga_category_id]",
      yogaLessonData.yoga_category_id
    );

    try {
      const yogaLessonsResponse = await fetch(`${API_URL}/yoga_lessons`, {
        method: "POST",
        body: formData,
      });

      if (!yogaLessonsResponse.ok) {
        throw new Error(
          `Failed to fetch yoga lesson data with status ${yogaLessonsResponse.status}`
        );
      }

      const json = await yogaLessonsResponse.json();
      setYogaLessonData(json);
      navigate(`/yoga_lessons`);
    } catch (error) {
      setError(
        `An error occurred while fetching lesson data: ${error.message}`
      );
    }
  };

  return (
    <div className="h-100 m-4">
      <div className="h-100 d-flex flex-column align-items-center justify-content-center">
        <div className="text-center px-4 margin-top-8">
          <h3 className="display-4 text-uppercase fw-semibold">Add a new lesson</h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" border border-2 p-4 my-5">
          <div className="form-group my-2">
            <select
              {...register("yoga_category_id", { required: true })}
              className="form-control form-control-lg">
              <option value="">Select a category</option>
              {yogaCategoriesList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            {errors.yoga_category_id && <p>This field is required!</p>}
          </div>
          <div className="form-group my-2">
            <input
              {...register("title", { required: true })}
              placeholder="Title"
              className="form-control form-control-lg"
            />
            {errors.title && <p>This field is required!</p>}
          </div>
          <div className="form-group my-2">
            <input
              {...register("description", { required: true })}
              placeholder="Description"
              className="form-control form-control-lg"
            />
            {errors.description && <p>This field is required!</p>}
          </div>
          <div className="d-flex">
            <BackButton path={"/yoga_lessons"} />
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
export default YogaLessonCreate;
