import { useAdminAuth } from "../hooks/useAdminAuth";
import { Navigate } from "react-router-dom";

interface ProtectedAdminRouteProps {
  element: React.ReactElement;
}

export default function ProtectedAdminRoute({ element }: ProtectedAdminRouteProps) {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return element;
}
