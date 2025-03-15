
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store';

// ProtectedRoute Component
const ProtectedRoute = ({ allowedRoles }:any) => {
    const { user } = useSelector((state: RootState) => state.auth);
  

  if (!user) {
    // Not logged in — redirect to login
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but doesn't have permission — redirect to unauthorized page or dashboard
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has the right role — allow access
  return <Outlet />;
};

export default ProtectedRoute;
