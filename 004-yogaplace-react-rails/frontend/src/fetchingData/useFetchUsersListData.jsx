import { useState, useEffect } from 'react';

const useFetchUsersListData = () => {
  const [usersList, setUsersList] = useState(null)
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users');
        if (!response.ok) {
          throw new Error(`Failed to fetch user data with status ${response.status}`);
        }

        const usersList = await response.json();
        console.log(usersList)
        setUsersList(usersList)
      } catch (error) {
        setError(`An error occurred while fetching user data: ${error.message}`);
      }
    }
    fetchUsers()
  }, []);


  return { usersList, error };
};

export default useFetchUsersListData;
