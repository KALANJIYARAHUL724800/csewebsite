import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const PublicRoute = ({ children }) => {

    const token = sessionStorage.getItem("token");

    const [searchParams] = useSearchParams();

    const email = searchParams.get("email");
    const expires = searchParams.get("expires");

    // Already logged-in user
    if (token) {
        return <Navigate to="/home" replace />;
    }

    // Password reset page validation
    if (window.location.pathname === "/update-password") {

        // Email not available in URL
        if (!email) {
            return <Navigate to="/home" replace />;
        }

        // Expiry time not available
        if (!expires) {
            return <Navigate to="/home" replace />;
        }

        // Invalid expiry value
        if (isNaN(Number(expires))) {
            return <Navigate to="/home" replace />;
        }

        // Link expired
        if (Date.now() > Number(expires)) {
            return <Navigate to="/home" replace />;
        }
    }

    return children;
};

export default PublicRoute;