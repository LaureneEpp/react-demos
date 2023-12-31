// import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/Home";
import AboutPage from "../features/AboutPage";
import YogaLessonsList from "../features/YogaLessonsList";
import YogaLessonDetails from "../features/YogaLessonDetails";
import NewYogaLesson from "../features/NewYogaLesson";
import EditYogaLesson from "../features/EditYogaLesson";
import YogaClassesList from "../features/YogaClassesList";
import YogaClassDetails from "../features/YogaClassDetails";
import NewYogaClass from "../features/NewYogaClass";
import EditYogaClass from "../features/EditYogaClass";
import Login from "./Login";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
import EditUserProfile from "../features/EditUserProfile";



function AppRoutes({ currUser, setCurrUser }) {

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<Login setCurrUser={setCurrUser} />} />
      <Route path="/signup" element={<SignUp setCurrUser={setCurrUser} />} />
      <Route path="/:username" element={<UserProfile currUser={currUser} />} />
      <Route path="/:username/edit" element={<EditUserProfile currUser={currUser}/>} />

      <Route path="/yoga_lessons" element={<YogaLessonsList />} />
      <Route path="/yoga_lessons/:id" element={<YogaLessonDetails />} />
      <Route path="/yoga_lessons/:id/edit" element={<EditYogaLesson />} />

      <Route path="/yoga_classes" element={<YogaClassesList />} />
      <Route path="/yoga_classes/:id" element={<YogaClassDetails />} />
      <Route path="/yoga_classes/:id/edit" element={<EditYogaClass />} />

      <Route path="/yoga_classes/new" element={<NewYogaClass />} />
      <Route path="/yoga_lessons/new" element={<NewYogaLesson />} />
    </Routes>
  );
}

export default AppRoutes;
