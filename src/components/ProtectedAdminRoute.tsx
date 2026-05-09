import { useAdminAuth } from "../hooks/useAdminAuth";

interface ProtectedAdminRouteProps {
  element: React.ReactElement;
}

export default function ProtectedAdminRoute({ element }: ProtectedAdminRouteProps) {
  const { isAdmin, loading, error } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">{error || "Admin access required"}</p>
          <a href="/" className="text-blue-400 hover:text-blue-300">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return element;
}
