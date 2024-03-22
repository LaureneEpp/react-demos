import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useFetchYogaClassData = () => {
  const [yogaClassesList, setYogaClassesList] = useState([]);
  const [yogaClassData, setYogaClassData] = useState(null);
  const [error, setError] = useState(null);
  const [, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const API_URL = "http://localhost:3000/api/v1";

    async function loadYogaClasses() {
      try {
        const yogaClassesResponse = await fetch(`${API_URL}/yoga_classes`);
        if (yogaClassesResponse.ok) {
          const json = await yogaClassesResponse.json();
          setYogaClassesList(json);
        } else {
          throw new Error(`API request failed with status ${yogaClassesResponse.status}`);
        }
      } catch (e) {
        setError(`An error occurred while loading yoga classes: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }
    async function fetchYogaData() {
      try {
        const yogaClassResponse = await fetch(`${API_URL}/yoga_classes/${id}`);
        if (yogaClassResponse.ok) {
          const yogaClassData = await yogaClassResponse.json();
          setYogaClassData(yogaClassData);
        } else {
          throw new Error(
            `Failed to fetch yoga class data with status ${yogaClassResponse.status}`
          );
        }
      } catch (error) {
        setError(`An error occurred: ${error.message}`);
      }
    }
    loadYogaClasses();
    fetchYogaData();
  }, [id, error]);

  const updateYogaClassData = (updatedData) => {
    setYogaClassData((prevYogaClass) => ({
      ...prevYogaClass,
      ...updatedData,
    }));
  };

  return { yogaClassData, yogaClassesList, updateYogaClassData, error };
};

export default useFetchYogaClassData;
