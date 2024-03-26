import { useState, useEffect } from "react";

const useFetchUserData = ({ currUser }) => {
  const [usersList, setUsersList] = useState([]);
  const [userData, setUserData] = useState({ ...currUser });
  const [, setError] = useState(null);

  useEffect(() => {
    const API_URL = "http://localhost:3000/api/v1";

    const fetchUsers = async () => {
      try {
        const usersListResponse = await fetch(`${API_URL}/users`);
        if (usersListResponse.ok) {
          const usersList = await usersListResponse.json();
          setUsersList(usersList);
        } else {
          throw new Error(
            `Failed to fetch user data with status ${usersListResponse.status}`
          );
        }
      } catch (error) {
        setError(
          `An error occurred while fetching user data: ${error.message}`
        );
      }
    };

    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`${API_URL}/users/${currUser.id}`);
        if (!userResponse.ok) {
          const userData = await userResponse.json();
          setUserData(userData);
        } else {
          throw new Error(
            `Failed to fetch user data with status ${userResponse.status}`
          );
        }
      } catch (error) {
        setError(
          `An error occurred while fetching user data: ${error.message}`
        );
      }
    };
    fetchUsers();
    fetchUserData();
  }, []);

  const updateUserData = (updatedData) => {
    setUserData((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  return { userData, usersList, updateUserData };
};

export default useFetchUserData;
