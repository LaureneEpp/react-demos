import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useFetchYogaLessonData = () => {
  const [yogaCategoriesList, setYogaCategoriesList] = useState([]);
  const [yogaLessonData, setYogaLessonData] = useState();
  const [yogaLessonsList, setYogaLessonsList] = useState([]);
  const [error, setError] = useState();
  const [, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const API_URL = "http://localhost:3000/api/v1";

    const fetchYogaCategoriesList = async () => {
      try {
        const yogaCategoriesResponse = await fetch(`${API_URL}/yoga_categories`);
        if (yogaCategoriesResponse.ok) {
          const json = await yogaCategoriesResponse.json();
          setYogaCategoriesList(json);
        } else {
          throw new Error(
            `API request failed with status ${yogaCategoriesResponse.status}`
          );
        }
      } catch (error) {
        setError(`An error occurred: ${error.message}`);
      }
    };

    const fetchYogaLessonsList = async () => {
      try {
        const yogaLessonsResponse = await fetch(`${API_URL}/yoga_lessons`);
        if (yogaLessonsResponse.ok) {
          const json = await yogaLessonsResponse.json();
          setYogaLessonsList(json);
        } else {
          throw new Error(
            `API request failed with status ${yogaLessonsResponse.status}`
          );
        }
      } catch (error) {
        setError(
          `An error occurred while loading yoga lessons: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchYogaLessonData = async () => {
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
    };
    fetchYogaCategoriesList();
    fetchYogaLessonsList();
    fetchYogaLessonData();
  }, [id, error]);

  const updateYogaLessonData = (updatedData) => {
    setYogaLessonData((prevYogaLesson) => ({
      ...prevYogaLesson,
      ...updatedData,
    }));
  };

  return {
    yogaCategoriesList,
    yogaLessonsList,
    yogaLessonData,
    updateYogaLessonData,
    error,
  };
};

export default useFetchYogaLessonData;
