import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectUser } from "../../features/authSlice";

const ProtectedRoute = ({ requiredRoles = [], requiredAccess = [] }) => {
  const user = useSelector(selectUser); // Get user from Redux state
  const location = useLocation(); // Get the current location

  if (!user)
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  if (requiredRoles.length && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  if (
    requiredAccess.length &&
    (!user.access || !requiredAccess.every((a) => user.access.includes(a)))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
