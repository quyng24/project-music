import { Navigate } from "react-router-dom";
import { lazy } from "react";
import ProtectedRouter from "./ProtectedRouter";
const Login = lazy(() => import("../pages/Login"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const UserDashboard = lazy(() => import("../pages/user/UserDashboard"));

export const routes = (roleName) => [
  { path: "/login", element: <Login /> },
  {
    path: "/admin",
    element: (
      <ProtectedRouter role="admin">
        <AdminDashboard />
      </ProtectedRouter>
    )
  },
  {
    path: "/user",
    element: (
      <ProtectedRouter role="user">
        <UserDashboard />
      </ProtectedRouter>
    )
  },
  {
    path: "*",
    element:
      roleName === "admin" ? (
        <Navigate to="/admin" />
      ) : roleName === "user" ? (
        <Navigate to="/user" />
      ) : (
        <Navigate to="/login" />
      )
  }
];
