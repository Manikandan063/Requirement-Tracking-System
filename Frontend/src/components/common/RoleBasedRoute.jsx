import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default RoleBasedRoute;
