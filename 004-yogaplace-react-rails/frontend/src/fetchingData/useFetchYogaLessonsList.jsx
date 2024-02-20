import { useState, useEffect } from "react";

const useFetchYogaLessonsList = () => {
  const [yogaLessonsList, setYogaLessonsList] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadYogaLessons() {
      try {
        const API_URL = "http://localhost:3000/api/v1";
        const response = await fetch(`${API_URL}/yoga_lessons`);
        console.log("API response:", response);

        if (response.ok) {
          const json = await response.json();
          console.log("Yoga lessons data:", json);
          setYogaLessonsList(json);
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } catch (e) {
        setError(`An error occurred while loading yoga lessons: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadYogaLessons();
  }, []);

  return { yogaLessonsList };
};

export default useFetchYogaLessonsList;
