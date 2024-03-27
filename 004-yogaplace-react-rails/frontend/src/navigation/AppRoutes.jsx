import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import YogaLessonsIndex from "../features/yogaLesson/YogaLessonsIndex";
import YogaLessonShow from "../features/yogaLesson/YogaLessonShow";
import YogaLessonCreate from "../features/yogaLesson/YogaLessonCreate";
import YogaLessonEdit from "../features/yogaLesson/YogaLessonEdit";
import YogaClassesIndex from "../features/yogaClass/YogaClassesIndex";
import YogaClassShow from "../features/yogaClass/YogaClassShow";
import YogaClassCreate from "../features/yogaClass/YogaClassCreate";
import YogaClassEdit from "../features/yogaClass/YogaClassEdit";
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
        element={<YogaLessonsIndex currUser={currUser} />}
      />
      <Route
        path="/yoga_lessons/:id"
        element={<YogaLessonShow currUser={currUser} />}
      />
      <Route path="/yoga_lessons/:id/edit" element={<YogaLessonEdit />} />

      <Route
        path="/yoga_classes"
        element={<YogaClassesIndex currUser={currUser} />}
      />
      <Route
        path="/yoga_classes/:id"
        element={<YogaClassShow currUser={currUser} />}
      />
      <Route path="/yoga_classes/:id/edit" element={<YogaClassEdit />} />

      <Route
        path="/yoga_classes/new"
        element={<YogaClassCreate currUser={currUser} />}
      />
      <Route path="/yoga_lessons/new" element={<YogaLessonCreate />} />
    </Routes>
  );
}

export default AppRoutes;
