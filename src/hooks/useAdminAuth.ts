import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = (import.meta as any).env.VITE_API_URL || "https://api.tryzwork.app";

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
      const response = await axios.get(`${API_BASE}/api/session`, {
        withCredentials: true,
      });
      const user = response.data;

      // Try to call an admin endpoint to verify access
      await axios.get(`${API_BASE}/api/admin/metrics/overview`, {
        withCredentials: true,
      });

      setIsAdmin(true);
      setAdminUser(user);
    } catch (err) {
      setIsAdmin(false);
      setError("Access denied. Admin access required.");
    } finally {
      setLoading(false);
    }
  };

  return { isAdmin, loading, adminUser, error };
}
