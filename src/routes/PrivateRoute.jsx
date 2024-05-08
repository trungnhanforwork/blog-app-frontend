import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getToken } from "../utils/authUtils";

const PrivateRoute = () => {
  const auth = isAuthenticated();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;