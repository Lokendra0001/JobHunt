// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../customHooks/useAuth";
import { UnauthorizedRoute } from "../components/common/Index";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, role } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <UnauthorizedRoute />;

  return <>{children}</>;
};

export default ProtectedRoute;
