import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const serif = { fontFamily: "var(--font-serif)" };

const tiers = [
  {
    name: "Free",
    price: "$0",
    subtitle: "Forever. No credit card.",
    features: [
      "Chat-first AI assistant",
      "Local file & command execution",
      "Bring your own API keys",
      "All skills & playbooks",
      "One device",
    ],
    cta: "Download",
    ctaLink: "/download",
  },
  {
    name: "Free+",
    price: "$0",
    subtitle: "Also forever. Seriously.",
    features: [
      "Everything in Free",
      "Unlimited devices",
      "Custom skill marketplace",
      "Priority model access",
      "Team workspace (up to 5)",
    ],
    cta: "Download",
    ctaLink: "/download",
  },
  {
    name: "Free Super",
    price: "$0",
    subtitle: "We are not kidding.",
    features: [
      "Everything in Free+",
      "Unlimited team members",
      "Self-hosted server option",
      "Enterprise audit logs",
      "Dedicated support channel",
      "A sticker",
    ],
    cta: "Download",
    ctaLink: "/download",
  },
];

export function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
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
      id="pricing"
      ref={sectionRef}
      className="relative z-50 bg-[#f7f6f3] py-28 md:py-36 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#171716]"
            style={serif}
          >
            Pricing
          </h2>
          <p className="mt-5 text-lg md:text-xl text-[#6b6a65] max-w-xl mx-auto">
            We could not think of a reason to charge you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="border border-[#e6e3dc] bg-white p-10 md:p-12 text-center"
            >
              <h3
                className="text-3xl md:text-4xl font-semibold tracking-tight text-[#171716] mb-2"
                style={serif}
              >
                {tier.name}
              </h3>
              <div className="text-4xl font-semibold text-[#171716] mb-1">
                {tier.price}
              </div>
              <p className="text-[13px] text-[#a09e98] mb-8">{tier.subtitle}</p>

              <ul className="space-y-3 text-left mb-10">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14px] text-[#171716]">
                    <Check className="h-4 w-4 text-[#6b6a65] mt-0.5 shrink-0" strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.ctaLink}
                className="inline-flex items-center justify-center w-full px-6 py-3 text-[14px] font-semibold bg-[#171716] text-[#f7f6f3] hover:bg-[#25241f] transition-colors"
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
