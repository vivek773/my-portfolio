// Protected Route

// Default
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth?.webAccessToken) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
