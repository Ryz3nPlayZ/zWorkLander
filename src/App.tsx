import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MotionPage from "./pages/MotionPage";
import DownloadPage from "./pages/DownloadPage";
import PricingPage from "./pages/PricingPage";
import FeaturesPage from "./pages/FeaturesPage";
import ChangelogPage from "./pages/ChangelogPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminMetricsPage from "./pages/admin/AdminMetricsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminUsagePage from "./pages/admin/AdminUsagePage";
import AdminBillingPage from "./pages/admin/AdminBillingPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import RefundPage from "./pages/RefundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/motion" element={<MotionPage />} />
      <Route path="/download" element={<DownloadPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/changelog" element={<ChangelogPage />} />
      {/* Admin Dashboard Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<ProtectedAdminRoute element={<AdminMetricsPage />} />} />
      <Route path="/admin/metrics" element={<ProtectedAdminRoute element={<AdminMetricsPage />} />} />
      <Route path="/admin/users" element={<ProtectedAdminRoute element={<AdminUsersPage />} />} />
      <Route path="/admin/usage" element={<ProtectedAdminRoute element={<AdminUsagePage />} />} />
      <Route path="/admin/billing" element={<ProtectedAdminRoute element={<AdminBillingPage />} />} />
      {/* Legal Pages */}
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/refund" element={<RefundPage />} />
    </Routes>
  );
}
