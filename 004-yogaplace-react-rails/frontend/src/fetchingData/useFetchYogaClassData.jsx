import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchYogaLessonData from "./useFetchYogaLessonData";

const useFetchYogaClassData = () => {
  const [yogaClassData, setYogaClassData] = useState(null);
  const { id } = useParams();
  const { yogaLessonData } = useFetchYogaLessonData();

  useEffect(() => {
    async function fetchData() {
      try {
        const API_URL = "http://localhost:3000/api/v1";

        // Fetch both yoga class and yoga lesson data in parallel
        const [yogaClassResponse, yogaLessonResponse] = await Promise.all([
          fetch(`${API_URL}/yoga_classes/${id}`),
          fetch(`${API_URL}/yoga_lessons/${yogaClassData.yoga_lesson_id}`)
        ]);

        if (yogaClassResponse.ok && yogaLessonResponse.ok) {
          const yogaClassData = await yogaClassResponse.json();
          const yogaLessonData = await yogaLessonResponse.json();

          setYogaClassData(yogaClassData);
          setYogaLessonData(yogaLessonData);
        } else {
          throw new Error(
            `Failed to fetch data with status ${yogaClassResponse.status}`
          );
        }
      } catch (e) {
        console.error(`An error occurred: ${e.message}`);
      }
    }

    fetchData();
  }, [id]);

  return { yogaClassData, yogaLessonData };
};

export default useFetchYogaClassData;
