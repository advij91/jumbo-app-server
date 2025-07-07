import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ requiredRoles = [], requiredAccess = [] }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <span className="loader" /> {/* Or your spinner component */}
      </div>
    );
  }

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