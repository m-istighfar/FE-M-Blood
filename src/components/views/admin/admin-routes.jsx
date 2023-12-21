/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("userRole") === "admin";

  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
