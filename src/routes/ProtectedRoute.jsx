import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  return <Outlet />;
};

export default ProtectedRoute;
