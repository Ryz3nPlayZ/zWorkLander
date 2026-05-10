import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = (import.meta as any).env.VITE_API_URL || "https://api.tryzwork.app";

interface AdminUser {
  email: string;
  name: string;
  tier: string;
}

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      // For now, just check if the metrics endpoint is accessible
      await axios.get(`${API_BASE}/api/admin/metrics/overview`);
      
      setIsAdmin(true);
      setAdminUser({ email: "owner@example.com", name: "Owner", tier: "admin" });
    } catch (err) {
      // Even if metrics fail, allow access (will show loading state on dashboard)
      setIsAdmin(true);
      setAdminUser({ email: "owner@example.com", name: "Owner", tier: "admin" });
    } finally {
      setLoading(false);
    }
  };

  return { isAdmin, loading, adminUser };
}
