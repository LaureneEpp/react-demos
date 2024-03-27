import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/icons/DeleteIcon";

function YogaLessonDelete({ yogaLessonId, className }) {
  const navigate = useNavigate();

  const deleteYogaLesson = async () => {
    try {
      const API_URL = "http://localhost:3000/api/v1";
      const response = await fetch(`${API_URL}/yoga_lessons/${yogaLessonId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/yoga_lessons");
      } else {
        throw response;
      }
    } catch (error) {
      console.error(
        `An error occurred while deleting the yoga lesson: ${error.message}`
      );
    }
  };

  return (
    <button onClick={deleteYogaLesson} className="btn btn-lg my-3 p-2">
      <DeleteIcon />
    </button>
  );
}
export default YogaLessonDelete;
