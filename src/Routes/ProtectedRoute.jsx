import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/Auth/useAuth";

function ProtectedRoute({ children }) {
  const { auth } = useAuth();
  console.log(auth);
  const location = useLocation();

  // If no accessToken → user is not authenticated
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
