import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useFetchYogaLessonData = () => {
  const [yogaLessonData, setYogaLessonData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const API_URL = "http://localhost:3000/api/v1";
        const lessonResponse = await fetch(`${API_URL}/yoga_lessons/${id}`);

        if (lessonResponse.ok) {
          const lessonData = await lessonResponse.json();
          setYogaLessonData(lessonData);
        } else {
          throw new Error(
            `Failed to fetch yoga class data with status ${lessonResponse.status}`
          );
        }
      } catch (e) {
        setError(`An error occurred: ${e.message}`);
      }
    }
    fetchData();
  }, [id]);

  return { yogaLessonData, error };
};

export default useFetchYogaLessonData;
