import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const serif = { fontFamily: "var(--font-serif)" };

export function Footer() {
  return (
    <div className="relative z-50">
      {/* CTA card */}
      <section className="bg-[#f7f6f3] px-6 pb-0">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-[#e6e3dc] bg-[#171716] p-10 md:p-16 text-center">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#f7f6f3]"
              style={serif}
            >
              Ready to get to work?
            </h2>
            <p className="mt-4 text-[15px] text-[#a09e98] max-w-lg mx-auto leading-relaxed">
              zWork runs locally on macOS, Windows, and Linux. Free to use with
              your own API keys.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/download"
                className="inline-flex items-center gap-2 rounded-full bg-[#f7f6f3] px-6 py-3 text-[14px] font-semibold text-[#171716] hover:bg-white transition-colors"
              >
                Download for free
              </Link>
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
        </div>
      </section>

      {/* Footer links */}
      <footer className="relative z-50 border-t border-[#e6e3dc] bg-[#f7f6f3] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Logo size={22} fill="#171716" />
            <span className="text-[13px] font-semibold tracking-tight text-[#171716]">
              <span className="lowercase">z</span>Work
            </span>
          </div>
          <div className="flex items-center gap-6 text-[12.5px] text-[#6b6a65]">
            <a href="#" className="hover:text-[#171716] transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-[#171716] transition-colors">
              Changelog
            </a>
            <a
              href="https://github.com/Ryz3nPlayZ/zWork"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#171716] transition-colors"
            >
              GitHub
            </a>
            <a href="#" className="hover:text-[#171716] transition-colors">
              Privacy
            </a>
          </div>
          <div className="text-[11.5px] text-[#a09e98]">
            &copy; 2026 zWork
          </div>
        </div>
      </footer>
    </div>
  );
}
