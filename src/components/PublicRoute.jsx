import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // wait until auth check completes
  if (loading) return null; // or spinner

  // if already logged in → redirect
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;