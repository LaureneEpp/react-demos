import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useFetchYogaLessonData = () => {
  const [yogaLessonData, setYogaLessonData] = useState();
  const [yogaLessonsList, setYogaLessonsList] = useState([]);
  const [error, setError] = useState();
  const [, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const API_URL = "http://localhost:3000/api/v1";

    async function fetchYogaLessonsList() {
      try {
        const response = await fetch(`${API_URL}/yoga_lessons`);
        if (response.ok) {
          const json = await response.json();
          setYogaLessonsList(json);
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } catch (error) {
        setError(
          `An error occurred while loading yoga lessons: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    }

    async function fetchYogaLessonData() {
      try {
        const lessonResponse = await fetch(`${API_URL}/yoga_lessons/${id}`);
        if (lessonResponse.ok) {
          const lessonData = await lessonResponse.json();
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
      } catch (error) {
        setError(`An error occurred: ${error.message}`);
      }
    }
    fetchYogaLessonsList();
    fetchYogaLessonData();
  }, [id, error]);

  const updateYogaLessonData = (updatedData) => {
    setYogaLessonData((prevYogaLesson) => ({
      ...prevYogaLesson,
      ...updatedData,
    }));
  };

  return { yogaLessonData, yogaLessonsList, updateYogaLessonData, error };
};

export default useFetchYogaLessonData;
