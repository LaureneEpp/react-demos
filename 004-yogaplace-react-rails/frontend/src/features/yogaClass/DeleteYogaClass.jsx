import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/icons/DeleteIcon";

function DeleteYogaClass({ yogaClassId, className }) {
  const navigate = useNavigate();

  const deleteYogaClass = async () => {
    try {
      const API_URL = "http://localhost:3000/api/v1";
      const response = await fetch(
        `${API_URL}/yoga_classes/${yogaClassId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        navigate("/yoga_classes");
      } else {
        throw response;
      }
    } catch (error) {
      console.error(
        `An error occurred while deleting the yoga class: ${error.message}`
      );
    }
  };

  return (
    <button onClick={deleteYogaClass}
    className={`btn btn-lg my-3 p-2 ${className}`}
    >
      <DeleteIcon/>
    </button>
  );
}
export default DeleteYogaClass;
