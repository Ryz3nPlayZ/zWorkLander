import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { DownloadSection } from "../components/DownloadSection";
import { Logo } from "../components/Logo";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const serif = { fontFamily: "var(--font-serif)" };

export default function DownloadPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
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

      {/* Hero */}
      <div ref={headerRef} className="relative z-10 text-center pt-12 pb-8 md:pt-20 md:pb-12 px-6">
        <div className="inline-flex items-center justify-center rounded-2xl bg-[#1c1c20] border border-[#2d2d31] p-5 mb-8">
          <Logo size={56} fill="#f7f6f3" />
        </div>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#f7f6f3] mb-5"
          style={serif}
        >
          Get <span className="lowercase">z</span>Work
        </h1>
        <p className="text-lg md:text-xl text-[#a09e98] max-w-xl mx-auto leading-relaxed">
          Free, open source, and private. Download for your platform and start shipping faster.
        </p>
      </div>

      {/* Content */}
      <div ref={contentRef}>
        <DownloadSection />
      </div>
    </div>
  );
}
