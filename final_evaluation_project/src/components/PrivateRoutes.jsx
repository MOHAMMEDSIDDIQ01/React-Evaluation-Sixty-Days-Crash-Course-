import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate } from "react-router-dom";

export default function PrivateRouter({ children }) {
  const { authDetails } = useContext(AuthContext);

  if (!authDetails.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}
