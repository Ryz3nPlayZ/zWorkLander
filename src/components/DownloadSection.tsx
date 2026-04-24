import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Apple, Monitor, AppWindow } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const serif = { fontFamily: "var(--font-serif)" };

const platforms = [
  {
    icon: Apple,
    label: "macOS",
    cta: "Download for Mac",
    comingSoon: false,
  },
  {
    icon: Monitor,
    label: "Linux",
    cta: "Download for Linux",
    comingSoon: false,
  },
  {
    icon: AppWindow,
    label: "Windows",
    cta: "Coming soon",
    comingSoon: true,
  },
];

export function DownloadSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.12,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative z-50 bg-[#171716] py-28 md:py-36 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a09e98] block mb-4">
            Get started
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#f7f6f3] max-w-3xl mx-auto"
            style={serif}
          >
            Stop context-switching. Start shipping.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-[#a09e98] max-w-2xl mx-auto leading-relaxed">
            zWork is free and open source. Download once, connect your own keys,
            and own your workflow end to end.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {platforms.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`relative rounded-2xl border p-8 md:p-10 text-center transition-shadow duration-300 ${
                  p.comingSoon
                    ? "border-[#2d2d31] bg-[#1c1c20]"
                    : "border-[#2d2d31] bg-[#1c1c20] hover:shadow-[0_12px_32px_rgba(247,246,243,0.04)]"
                }`}
              >
                {p.comingSoon && (
                  <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider text-[#a09e98] border border-[#2d2d31] rounded-full px-2.5 py-1">
                    Coming soon
                  </span>
                )}
                <div className="inline-flex items-center justify-center rounded-xl bg-[#25252a] p-4 text-[#f7f6f3] mb-6">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-2xl md:text-3xl font-semibold tracking-tight text-[#f7f6f3] mb-3"
                  style={serif}
                >
                  {p.label}
                </h3>
                <p className="text-[14px] text-[#a09e98] leading-relaxed mb-6">
                  {p.label === "macOS"
                    ? "Universal binary for Intel & Apple Silicon."
                    : p.label === "Linux"
                    ? "AppImage and DEB packages available."
                    : "Join the waitlist to get early access."}
                </p>
                <button
                  disabled={p.comingSoon}
                  className={`inline-flex items-center rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                    p.comingSoon
                      ? "bg-[#2d2d31] text-[#6b6a65] cursor-not-allowed"
                      : "bg-[#f7f6f3] text-[#171716] hover:bg-white"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[14px] text-[#6b6a65] mb-4">
            Prefer to build from source?
          </p>
          <a
            href="https://github.com/Ryz3nPlayZ/zWork"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#2d2d31] px-6 py-3 text-[14px] font-medium text-[#a09e98] hover:text-[#f7f6f3] hover:border-[#4a4a4e] transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
