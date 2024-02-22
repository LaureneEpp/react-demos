import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useFetchYogaClassData = () => {
  const [yogaClassData, setYogaClassData] = useState(null);
  const [, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const API_URL = "http://localhost:3000/api/v1";
        const yogaClassResponse = await fetch(`${API_URL}/yoga_classes/${id}`);
        // console.log("API response:", yogaClassResponse);

        if (yogaClassResponse.ok) {
          const yogaClassData = await yogaClassResponse.json();
          // console.log("Yoga classes data:", yogaClassData);
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

    fetchData();
  }, [id]);

  const updateYogaClassData = (updatedData) => {
    setYogaClassData((prevYogaClass) => ({
      ...prevYogaClass,
      ...updatedData,
    }));
  };

  return { yogaClassData, updateYogaClassData };
};

export default useFetchYogaClassData;
