import { useState, useEffect } from 'react';

const useFetchUserData = ({ currUser }) => {
  const [usersList, setUsersList] = useState(null)
  const [userData, setUserData] = useState({...currUser});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/users/${currUser.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data with status ${response.status}`);
        }

        const userData = await response.json();
        console.log(userData)
        setUserData(userData);
      } catch (error) {
        setError(`An error occurred while fetching user data: ${error.message}`);
      }
    };

    // const fetchUsers = async () => {
    //   try {
    //     const response = await fetch('http://localhost:3000/api/v1/users');
    //     if (!response.ok) {
    //       throw new Error(`Failed to fetch user data with status ${response.status}`);
    //     }

    //     const usersList = await response.json();
    //     console.log(usersList)
    //     setUsersList(usersList)
    //   } catch (error) {
    //     setError(`An error occurred while fetching user data: ${error.message}`);
    //   }
    // }
    fetchUserData();
    // fetchUsers()
  }, [currUser]);


  return { userData, error };
};

export default useFetchUserData;
