import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import HomePage from "./pages/HomePage";
import DownloadPage from "./pages/DownloadPage";
import PricingPage from "./pages/PricingPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
      <Analytics />
    </>
  );
}
