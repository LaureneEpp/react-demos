import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../features/Home";
import YogaClassesList from "../features/YogaClassesList";
import YogaClassDetails from "../features/YogaClassDetails";
import NewYogaClass from "../features/NewYogaClass";
import EditYogaClass from "../features/EditYogaClass";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/yoga_classes" element={<YogaClassesList />} />
      <Route path="/yoga_classes/:id" element={<YogaClassDetails />} />
      <Route path="/yoga_classes/:id/edit" element={<EditYogaClass />} />
      <Route path="/new" element={<NewYogaClass />} />
    </Routes>
  );
}

export default AppRoutes;
