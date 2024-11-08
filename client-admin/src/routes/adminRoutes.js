// src/routes/adminRoutes.js
import Login from "../pages/Login";
import Register from "../pages/Register";
import Homepage from "../pages/Homepage";
import { Navigate } from "react-router-dom";

const adminRoutes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
];

export default adminRoutes;
