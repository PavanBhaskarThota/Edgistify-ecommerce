import { Navigate } from "react-router";

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/auth" />;
};
