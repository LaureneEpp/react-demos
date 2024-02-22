import { useNavigate } from "react-router-dom";

import useFetchYogaClassData from "../../fetchingData/useFetchYogaClassData";

function DeleteYogaClass() {
  const { yogaClassData } = useFetchYogaClassData();
  const navigate = useNavigate();

  const deleteYogaClass = async () => {
    try {
      const API_URL = "http://localhost:3000/api/v1";
      const response = await fetch(
        `${API_URL}/yoga_classes/${yogaClassData.id}`,
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
    <button onClick={deleteYogaClass} className="btn btn-lg my-3 p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="currentColor"
        className="bi bi-trash3-fill orange-light-color"
        viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
      </svg>
    </button>
  );
}
export default DeleteYogaClass;
