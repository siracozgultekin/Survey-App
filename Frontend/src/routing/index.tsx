import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

import { AuthLayout } from "../pages/layouts";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import SurveyCreation from "@/pages/SurveyCreation";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "survey-creation",
        element: <SurveyCreation />,
      },
    ],
  },
]);
