
// src/components/App/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { selectUser } from "../../store/selectors";

const ProtectedRoute = ({ children }) => {
  const user = useAppSelector(selectUser);
  return user ? children : <Navigate to="/" replace />; 
};

export default ProtectedRoute;
