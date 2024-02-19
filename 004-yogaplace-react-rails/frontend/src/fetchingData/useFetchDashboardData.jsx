import { useState, useEffect } from 'react';
import useFetchUserData from './useFetchUserData';

const useFetchDashboardData = ({ currUser }) => {
  const { userData } = useFetchUserData({ currUser });
  const [dashboardData, setDashboardData] = useState({
    usersList: null,
    instructorsList: null,
    yogaClassesInstructorData: null,
    yogaClassesCount: null,
    noBookingYogaClasses: null,
    noBookingYogaClassesCount: null,
    bookingsInstructorData: [],
    bookingsCount: null,
    yogaClassUsersHash: null,
    bookingsList: null,
    clientsCurrentInstructor: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const API_URL = "http://localhost:3000/api/v1";
        const dashboardResponse = await fetch(
          `${API_URL}/dashboard/${currUser.id}`
        );

        if (!dashboardResponse.ok) {
          throw new Error(
            `Failed to fetch dashboard data with status ${dashboardResponse.status}`
          );
        }

        const data = await dashboardResponse.json();
        setDashboardData({
          usersList: data.all_users,
          instructorsList: data.all_instructors,
          bookingsList: data.all_bookings,
          bookingsCount: data.bookings_count,
          yogaClassesInstructorData: data.yoga_classes_current_instructor,
          yogaClassesCount: data.yoga_classes_count,
          noBookingYogaClasses: data.no_booking_yoga_classes_current_instructor,
          noBookingYogaClassesCount: data.no_booking_yoga_classes_current_instructor_count,
          bookingsInstructorData: data.bookings_current_instructor,
          yogaClassUsersHash: data.yoga_class_users_hash,
          clientsCurrentInstructor: data.clients_current_instructor
        });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (userData) {
      fetchDashboardData();
    }
  }, [userData, currUser]);

  return dashboardData;
};

export default useFetchDashboardData;
