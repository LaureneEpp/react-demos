import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchYogaLessonData from "./useFetchYogaLessonData";

const useFetchYogaClassData = () => {
  const [yogaClassData, setYogaClassData] = useState(null);
  const { yogaLessonData } = useFetchYogaLessonData(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const API_URL = "http://localhost:3000/api/v1";
        const yogaClassResponse = await fetch(`${API_URL}/yoga_classes/${id}`);

        if (yogaClassResponse.ok) {
          const yogaClassData = await yogaClassResponse.json();
          setYogaClassData(yogaClassData);
        } else {
          throw new Error(
            `Failed to fetch yoga class data with status ${yogaClassResponse.status}`
          );
        }
      } catch (e) {
        setError(`An error occurred: ${e.message}`);
      }
    }

    if (yogaLessonData) {
      fetchData();
    }

    fetchData();
  }, [yogaLessonData, id]);

  return { yogaClassData, error };
};

export default useFetchYogaClassData;
