import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedUserType }) => {
  const userType = sessionStorage.getItem("userType"); 
  const email = sessionStorage.getItem("email");
  if (!userType) {
    return <Navigate to="/home" replace />;
  }
  if (userType !== allowedUserType) {
    return <Navigate to={userType === "true" ? "/dashboard" : "/student-dashboard"} replace />;
  }

  return children;
};
export default PrivateRoute;
