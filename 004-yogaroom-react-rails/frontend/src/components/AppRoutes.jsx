import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../features/Home";
import YogaLessonsList from "../features/YogaLessonsList";
import YogaLessonDetails from "../features/YogaLessonDetails";
import NewYogaLesson from "../features/NewYogaLesson";
import EditYogaLesson from "../features/EditYogaLesson";
import YogaClassesList from "../features/YogaClassesList";
import YogaClassDetails from "../features/YogaClassDetails";
import NewYogaClass from "../features/NewYogaClass";
import EditYogaClass from "../features/EditYogaClass";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
