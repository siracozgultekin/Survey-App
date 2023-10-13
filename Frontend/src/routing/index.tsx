import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

import { AuthLayout } from "../pages/layouts";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import SurveyCreation from "@/pages/SurveyCreation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/x",
    element: <div>Test</div>,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/survey-creation",
    element: <SurveyCreation />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <div className="w-[60%] bg-slate-700">login</div>,
      },
      {
        path: "sign-up",
        element: <div>signup</div>,
      },
    ],
  },
]);
