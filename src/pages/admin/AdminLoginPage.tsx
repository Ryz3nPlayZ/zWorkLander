import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AUTH_BASE = "https://api.tryzwork.app/api/auth";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      // Redirect to Google OAuth
      window.location.href = `${AUTH_BASE}/signin/google`;
    } catch (err: any) {
      setError("Failed to redirect to Google sign-in");
      setLoading(false);
      console.error("Sign in error:", err);
    }
  };

  const handleRedirectFromAuth = async () => {
    try {
      // Check if we're being redirected from OAuth
      const response = await axios.get(`${AUTH_BASE}/session`, {
        withCredentials: true,
      });

      if (response.data && response.data.user) {
        navigate("/admin");
      }
    } catch (err) {
      // Not authenticated yet
    }
  };

  // Check on mount if user is already authenticated
  React.useEffect(() => {
    handleRedirectFromAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-2xl border border-slate-700 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Owner access required</p>
          </div>

          <div className="space-y-4">
            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded p-3">
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed text-gray-900 font-medium py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-700 text-center">
            <p className="text-slate-400 text-sm mb-2">
              Sign in with your Google account. Your email must be registered as an owner to access this dashboard.
            </p>
            <p className="text-slate-500 text-xs">
              Only: zemuliubobby3651@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
