import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AUTH_BASE = "https://api.tryzwork.app/api/auth";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // Use Better Auth email sign-in
      const response = await axios.post(
        `${AUTH_BASE}/signIn/email`,
        { email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setMessage("Check your email for a sign-in link");
        // The user should be redirected back here after clicking the link
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to send sign-in email";
      setError(errorMsg);
      console.error("Sign in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectFromEmail = async () => {
    try {
      // Check if we're being redirected from email verification
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
    handleRedirectFromEmail();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-2xl border border-slate-700 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Owner access required</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                required
                disabled={loading || !!message}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded p-3">
                {error}
              </div>
            )}

            {message && (
              <div className="text-green-400 text-sm bg-green-500/10 border border-green-500/30 rounded p-3">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !!message}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition"
            >
              {loading ? "Sending..." : "Send Sign-In Link"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              We'll send a secure link to your email. Click it to sign in to the admin dashboard.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Only the owner email address can access the admin dashboard.</p>
        </div>
      </div>
    </div>
  );
}
