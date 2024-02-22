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
        console.log("Lesson API response:", lessonResponse);


        if (lessonResponse.ok) {
          const lessonData = await lessonResponse.json();
          console.log("Yoga lessons data:", lessonData);


          setYogaLessonData(lessonData);
        } else {
          if (lessonResponse.status === 404) {
            setError("Yoga lesson not found");
          } else {
            throw new Error(
              `Failed to fetch yoga lesson data with status ${lessonResponse.status}`
            );
          }
        }
      } catch (e) {
        setError(`An error occurred: ${e.message}`);
      }
    }
    fetchData();
  }, [id]);

  const updateYogaLessonData = (updatedData) => {
    setYogaLessonData((prevYogaLesson) => ({
      ...prevYogaLesson,
      ...updatedData,
    }));
  };

  return { yogaLessonData, error, updateYogaLessonData };
};

export default useFetchYogaLessonData;
