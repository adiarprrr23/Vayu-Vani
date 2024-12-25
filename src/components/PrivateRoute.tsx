import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function PrivateRoute({ children, adminOnly = false }: PrivateRouteProps) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (adminOnly && !isAdmin)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}