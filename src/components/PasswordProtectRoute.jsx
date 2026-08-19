import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const PasswordProtectRoute = ({ children }) => {
	const [searchParams] = useSearchParams();

	const email = searchParams.get("email");
	const expires = searchParams.get("expires");

	// Email missing
	if (!email) {
		return <Navigate to="/home" replace />;
	}

	// Expiry missing
	if (!expires) {
		return <Navigate to="/home" replace />;
	}

	// Current time > expiry time
	if (Date.now() > Number(expires)) {
		return <Navigate to="/home" replace />;
	}

	return children;
};

export default PasswordProtectRoute;
