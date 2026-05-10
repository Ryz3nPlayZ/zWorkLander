import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ALLOWED_EMAIL = "zemuliubobby3651@gmail.com";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (email !== ALLOWED_EMAIL) {
        setError("This email is not authorized for admin access");
        setLoading(false);
        return;
      }

      // Generate a simple 6-digit code
      const generatedCode = Math.random().toString().slice(2, 8);
      
      // Store it temporarily (in a real app, you'd send this via email)
      sessionStorage.setItem("admin_code", generatedCode);
      sessionStorage.setItem("admin_email_temp", email);
      
      // For development: show the code
      alert(`Your verification code is: ${generatedCode}\n\n(This is shown for development purposes)`);
      
      setStep("code");
    } catch (err: any) {
      setError("Failed to generate code");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const storedCode = sessionStorage.getItem("admin_code");
      const tempEmail = sessionStorage.getItem("admin_email_temp");

      if (code !== storedCode) {
        setError("Invalid verification code");
        setLoading(false);
        return;
      }

      if (tempEmail !== ALLOWED_EMAIL) {
        setError("Email mismatch");
        setLoading(false);
        return;
      }

      // Set session token
      const token = btoa(`${tempEmail}:verified:${Date.now()}`);
      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_email", tempEmail);
      
      // Clear temporary data
      sessionStorage.removeItem("admin_code");
      sessionStorage.removeItem("admin_email_temp");

      navigate("/admin");
    } catch (err: any) {
      setError("Verification failed");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem("admin_token");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-2xl border border-slate-700 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Owner access required</p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={ALLOWED_EMAIL}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition"
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Verification Code
                </label>
                <p className="text-slate-400 text-sm mb-3">Code sent to {email}</p>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="000000"
                  maxLength={6}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest disabled:opacity-50"
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setError(null);
                }}
                className="w-full text-slate-400 hover:text-slate-300 text-sm py-2"
              >
                Back
              </button>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-slate-700 text-center">
            <p className="text-slate-400 text-sm">
              Access restricted to owner email only.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Authorized: {ALLOWED_EMAIL}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
