import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

import { AuthLayout } from "../pages/layouts";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import SurveyCreation from "@/pages/SurveyCreation";
import Inbox from "@/pages/Inbox";
import Report from "@/pages/Report";
import Survey from "@/redux/features/survey_creation/survey";
import Surveys from "@/pages/Surveys";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      // { index: true, element: <Navigate to="/login" replace /> },

      {
        path: "home",
        element: <Home />,
      },
      { path: "report", element: <Report /> },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "survey-creation",
        element: <SurveyCreation />,
      },
      {
        path: "inbox",
        element: <Inbox />,
      },
      { path: "surveys", element: <Surveys /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);
