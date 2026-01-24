import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn, redirectPath = "/" }) {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

export default ProtectedRoute;
