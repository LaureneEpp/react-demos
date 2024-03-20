import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import YogaLessonsList from "../features/yogaLesson/YogaLessonsList";
import YogaLessonDetails from "../features/yogaLesson/YogaLessonDetails";
import NewYogaLesson from "../features/yogaLesson/NewYogaLesson";
import EditYogaLesson from "../features/yogaLesson/EditYogaLesson";
import YogaClassesList from "../features/yogaClass/YogaClassesList";
import YogaClassDetails from "../features/yogaClass/YogaClassDetails";
import NewYogaClass from "../features/yogaClass/NewYogaClass";
import EditYogaClass from "../features/yogaClass/EditYogaClass";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import UserProfile from "../pages/UserProfile";
import EditUserInformation from "../features/profile/EditUserInformation";
import InstructorProfile from "../pages/InstructorProfile";
import UserPage from "../pages/UserPage"

function AppRoutes({ currUser, setCurrUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<Login setCurrUser={setCurrUser} />} />
      <Route path="/signup" element={<SignUp setCurrUser={setCurrUser} />} />
      <Route
        path="/:username/*"
        element={<UserProfile currUser={currUser} />}
      />
      <Route
        path="/:username/edit"
        element={<EditUserInformation currUser={currUser} />}
      />
      <Route
        path="/dashboard"
        element={<InstructorProfile currUser={currUser} />}
      />
      <Route
        path="/users/:username"
        element={<UserPage currUser={currUser}/>}
      />
      <Route
        path="/yoga_lessons"
        element={<YogaLessonsList currUser={currUser} />}
      />
      <Route
        path="/yoga_lessons/:id"
        element={<YogaLessonDetails currUser={currUser} />}
      />
      <Route path="/yoga_lessons/:id/edit" element={<EditYogaLesson />} />

      <Route
        path="/yoga_classes"
        element={<YogaClassesList currUser={currUser} />}
      />
      <Route
        path="/yoga_classes/:id"
        element={<YogaClassDetails currUser={currUser} />}
      />
      <Route path="/yoga_classes/:id/edit" element={<EditYogaClass />} />

      <Route
        path="/yoga_classes/new"
        element={<NewYogaClass currUser={currUser} />}
      />
      <Route path="/yoga_lessons/new" element={<NewYogaLesson />} />
    </Routes>
  );
}

export default AppRoutes;
