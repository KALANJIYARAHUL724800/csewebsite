import { Navigate } from "react-router-dom";

const PrivateCeritificateUrl = ({ children, allowedUserType }) => {
	const userType = localStorage.getItem("userType");

	console.log("userType:", userType);
	console.log("allowedUserType:", allowedUserType);

	if (userType === allowedUserType) {
		return children;
	}

	return <Navigate to="/home" replace />;
};

export default PrivateCeritificateUrl;
