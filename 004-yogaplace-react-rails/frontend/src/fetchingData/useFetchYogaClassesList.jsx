import { useState, useEffect } from "react";

const useFetchYogaClassesList = () => {
  const [yogaClassesList, setYogaClassesList] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadYogaClasses() {
      try {
        const baseURL = "http://localhost:3000";
        const apiURL = `${baseURL}/api/v1/yoga_classes`;
        const response = await fetch(apiURL);
        if (response.ok) {
          const json = await response.json();
          setYogaClassesList(json);
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } catch (e) {
        setError(`An error occurred while loading yoga classes: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadYogaClasses();
  }, []);

  return { yogaClassesList };
};

export default useFetchYogaClassesList;
