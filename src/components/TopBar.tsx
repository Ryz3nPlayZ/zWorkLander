import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

export function TopBar({ visible }: { visible: boolean }) {
  const loc = useLocation();
  const page = loc.pathname;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] border-b border-[#2d2d31] bg-[#171716] px-6 py-4 md:px-10 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={20} fill="#f7f6f3" />
          <span className="text-[13px] font-semibold tracking-tight text-[#f7f6f3]">
            <span className="lowercase">z</span>Work
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#a09e98]">
          <Link to="/download" className={`hover:text-[#f7f6f3] transition-colors ${page === "/download" ? "text-[#f7f6f3]" : ""}`}>Download</Link>
          <Link to="/pricing" className={`hover:text-[#f7f6f3] transition-colors ${page === "/pricing" ? "text-[#f7f6f3]" : ""}`}>Pricing</Link>
        </nav>
        <Link
          to="/download"
          className="inline-flex items-center px-4 py-2 text-[12px] font-semibold bg-[#f7f6f3] text-[#171716] hover:bg-white transition-colors rounded-full"
        >
          Get zWork
        </Link>
      </div>
    </header>
  );
}
