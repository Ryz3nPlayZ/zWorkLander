import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serif = { fontFamily: "var(--font-serif)" };

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.66-.68.83-1.28 2.18-1.12 3.29 1.18.09 2.39-.6 3.11-1.84" />
    </svg>
  );
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025-.007.054-.029.083-.03.01.001.02.005.03.007.066.037.123.083.18.133.037.03.073.062.108.09.12.09.228.177.33.257.415.345.758.623 1.209.756.22.06.45.087.68.08.526-.02 1.074-.224 1.58-.474.782-.38 1.55-.868 2.058-1.526.413-.526.577-1.124.537-1.784-.058-.995-.597-2.087-1.224-2.956-.9-1.27-1.962-2.34-2.727-3.562-.48-.765-.773-1.612-.896-2.505-.124-.896.028-1.793.28-2.547.25-.753.607-1.379.902-1.912.391-.699.716-1.303.762-1.879.057-.736-.108-1.39-.522-1.959-.415-.569-1.073-.994-1.928-1.257-.855-.264-1.84-.36-2.8-.36-.28 0-.55.01-.81.03zm-1.896 4.717c.064-.008.15.002.253.037.207.071.457.226.698.475.242.249.47.582.627.967.158.385.247.828.22 1.28-.027.451-.16.876-.397 1.243-.237.367-.562.666-.931.858-.37.192-.772.274-1.16.241-.387-.032-.76-.17-1.05-.4-.29-.23-.497-.543-.6-.898-.1-.356-.1-.76.012-1.156.11-.396.335-.78.64-1.09.306-.31.686-.535 1.07-.633.192-.05.385-.074.578-.064zm5.824.009c.17.006.34.031.506.077.386.102.764.33 1.067.642.303.312.525.7.634 1.1.108.4.107.81.003 1.167-.104.356-.313.672-.606.903-.293.23-.669.369-1.057.401-.387.033-.79-.048-1.16-.24-.369-.192-.694-.491-.931-.858-.237-.367-.37-.792-.397-1.243-.027-.452.062-.895.22-1.28.157-.385.385-.718.627-.967.24-.25.49-.404.698-.475.102-.035.189-.045.253-.037.193-.01.386.014.578.064.384.098.764.323 1.07.633.305.31.53.694.64 1.09.112.396.112.8.012 1.156-.103.355-.31.668-.6.898-.29.23-.663.368-1.05.4-.388.033-.79-.049-1.16-.241-.369-.192-.694-.491-.931-.858-.237-.367-.37-.792-.397-1.243-.027-.452.062-.895.22-1.28.157-.385.385-.718.627-.967.24-.25.49-.404.698-.475.102-.035.189-.045.253-.037z" />
    </svg>
  );
}

const platforms = [
  {
    icon: AppleIcon,
    label: "macOS",
    cta: "Download for Mac",
    desc: "Universal binary for Intel & Apple Silicon",
    comingSoon: false,
    url: "https://github.com/Ryz3nPlayZ/zWork/releases/latest/download/zWork-macOS-universal.dmg",
  },
  {
    icon: WindowsIcon,
    label: "Windows",
    cta: "Coming soon",
    desc: "Join the waitlist to get early access",
    comingSoon: true,
    url: "#",
  },
  {
    icon: LinuxIcon,
    label: "Linux",
    cta: "Download for Linux",
    desc: "AppImage and DEB packages available",
    comingSoon: false,
    url: "https://github.com/Ryz3nPlayZ/zWork/releases/latest/download/zWork-linux.AppImage",
  },
];

function detectOS(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Mac") && !ua.includes("Windows")) return "macOS";
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Linux")) return "Linux";
  return "macOS";
}

export function DownloadSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const detected = useMemo(() => detectOS(), []);
  const primary = platforms.find((p) => p.label === detected) || platforms[0];
  const others = platforms.filter((p) => p.label !== detected);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardRef.current) return;
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const PrimaryIcon = primary.icon;

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative z-50 bg-[#171716] py-16 md:py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#f7f6f3]"
            style={serif}
          >
            Get zWork
          </h2>
          <p className="mt-4 text-lg text-[#a09e98] max-w-xl mx-auto">
            Free and open source. No signup required.
          </p>
        </div>

        {/* Primary card */}
        <div
          ref={cardRef}
          className="border border-[#2d2d31] bg-[#1c1c20] p-10 md:p-14 text-center"
        >
          <PrimaryIcon className="h-12 w-12 text-[#f7f6f3] mx-auto mb-6" />
          <h3
            className="text-3xl md:text-4xl font-normal tracking-tight text-[#f7f6f3] mb-2"
            style={serif}
          >
            {primary.label}
          </h3>
          <p className="text-[15px] text-[#a09e98] mb-8">{primary.desc}</p>

          {primary.comingSoon ? (
            <button
              disabled
              className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3.5 text-[14px] font-semibold bg-[#2d2d31] text-[#6b6a65] cursor-not-allowed"
            >
              {primary.cta}
            </button>
          ) : (
            <a
              href={primary.url}
              download
              className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3.5 text-[14px] font-semibold bg-[#f7f6f3] text-[#171716] hover:bg-white transition-colors"
            >
              {primary.cta}
            </a>
          )}

          <button
            onClick={() => setShowAll(!showAll)}
            className="block mx-auto mt-6 text-[13px] text-[#a09e98] hover:text-[#f7f6f3] transition-colors"
          >
            {showAll ? "Hide other platforms" : "More options"}
          </button>
        </div>

        {/* Other platforms */}
        {showAll && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {others.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.label}
                  className="border border-[#2d2d31] bg-[#1c1c20] p-8 text-center"
                >
                  <Icon className="h-8 w-8 text-[#f7f6f3] mx-auto mb-4" />
                  <h4
                    className="text-xl font-normal tracking-tight text-[#f7f6f3] mb-1"
                    style={serif}
                  >
                    {p.label}
                  </h4>
                  <p className="text-[13px] text-[#a09e98] mb-5">{p.desc}</p>
                  {p.comingSoon ? (
                    <span className="text-[13px] text-[#6b6a65]">{p.cta}</span>
                  ) : (
                    <a
                      href={p.url}
                      download
                      className="inline-flex items-center px-5 py-2.5 text-[13px] font-semibold bg-[#f7f6f3] text-[#171716] hover:bg-white transition-colors"
                    >
                      {p.cta}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="https://github.com/Ryz3nPlayZ/zWork"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#2d2d31] px-5 py-2.5 text-[13px] font-medium text-[#a09e98] hover:text-[#f7f6f3] hover:border-[#4a4a4e] transition-colors"
          >
            Build from source
          </a>
        </div>
      </div>
    </section>
  );
}

