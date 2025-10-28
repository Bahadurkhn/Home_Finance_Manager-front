import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin } = useAuth()
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  // CHANGE THIS LINE: isAdmin is a boolean, not a function
  if (adminOnly && !isAdmin) {  // Remove the parentheses ()
    return <Navigate to="/dashboard" />
  }
  
  return children
}

export default ProtectedRoute;