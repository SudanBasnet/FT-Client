import { Navigate } from "react-router-dom";

export const Auth = ({ children }) => {
  const isLoggedin = false; // Replace with actual authentication logic
  return isLoggedin ? children : <Navigate to="/" replace />;
};
