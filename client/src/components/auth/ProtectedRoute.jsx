import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if the browser has our secure token saved
  const token = localStorage.getItem("adminToken");

  // If no token exists, boot them back to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If a token exists, allow them to see the admin page
  return children;
};

export default ProtectedRoute;