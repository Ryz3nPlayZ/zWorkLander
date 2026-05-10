import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = (import.meta as any).env.VITE_API_URL || "https://api.tryzwork.app";
const AUTH_BASE = "https://api.tryzwork.app/api/auth";

interface AdminUser {
  email: string;
  name: string;
  tier: string;
}

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      // Check if user has an active session via Better Auth
      const sessionRes = await axios.get(`${AUTH_BASE}/session`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (sessionRes.data && sessionRes.data.user) {
        const user = sessionRes.data.user;
        setAdminUser({
          email: user.email,
          name: user.name || user.email,
          tier: "admin",
        });

        // Try to verify they can access admin endpoints
        try {
          await axios.get(`${API_BASE}/api/admin/metrics/overview`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          });
          setIsAdmin(true);
        } catch (err: any) {
          if (err.response?.status === 401 || err.response?.status === 403) {
            setIsAdmin(false);
            setError("Unauthorized: You don't have admin access");
          } else {
            // Network error but authenticated - allow access
            setIsAdmin(true);
          }
        }
      } else {
        setIsAdmin(false);
        setError("Not authenticated");
      }
    } catch (err: any) {
      setIsAdmin(false);
      if (err.response?.status === 401) {
        setError("Not authenticated");
      } else {
        setError("Failed to check authentication");
      }
    } finally {
      setLoading(false);
    }
  };

  return { isAdmin, loading, adminUser, error, checkAdminAuth };
}
