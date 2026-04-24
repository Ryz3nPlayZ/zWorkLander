import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PricingSection } from "../components/PricingSection";
import { Logo } from "../components/Logo";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#171716]">
      {/* Nav */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#a09e98] hover:text-[#f7f6f3] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back
        </Link>
        <div className="flex items-center gap-2">
          <Logo size={22} fill="#f7f6f3" />
          <span className="text-[14px] font-semibold text-[#f7f6f3] tracking-tight">zWork</span>
        </div>
        <div className="w-16" />
      </nav>

      <div ref={pageRef}>
        <PricingSection />
      </div>
    </div>
  );
}
