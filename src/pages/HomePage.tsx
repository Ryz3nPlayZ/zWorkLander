import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { track } from "@vercel/analytics";
import {
  ArrowRight,
  ArrowUp,
  Layers3,
  Paperclip,
  Globe,
  Zap,
  Shield,
  Monitor,
} from "lucide-react";
import { Logo } from "../components/Logo";
import { DemoShell } from "../components/demos/DemoShell";
import { DemoUserMessage, DemoAssistantMessage } from "../components/demos/DemoMessage";
import {
  DemoArtifactPanel,
  DemoDocContent,
  DemoSheetContent,
  DemoTasksContent,
} from "../components/demos/DemoArtifactPanel";
import { useDemoScenario } from "../components/demos/useDemoScenario";
import { q1SummaryScenario } from "../demos/q1Summary";
import { cleanSheetScenario } from "../demos/cleanSheet";
import { meetingTasksScenario } from "../demos/meetingTasks";
import { memoryRecallScenario } from "../demos/memoryRecall";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper">
      <TopBar />

      {/* Hero — full viewport app shell demo */}
      <HeroSection />

      {/* Feature demos */}
      <FeatureDemos />

      {/* Trust bar */}
      <TrustSection />

      {/* Final CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo size={28} />
          <span className="text-lg font-semibold tracking-tight text-ink">
            <span className="lowercase">z</span>Work
          </span>
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          <Link
            to="/features"
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/motion"
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            Motion
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Ryz3nPlayZ/zWork"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm text-ink-muted hover:text-ink transition-colors sm:block"
          >
            GitHub
          </a>
          <Link
            to="/download"
            className="press inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink/90 transition-colors"
          >
            Download <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-10 pb-16 sm:pt-14 sm:pb-20">
      <div className="mx-auto max-w-5xl w-full text-center mb-10">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink">
          Your computer, actually working.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-ink-muted max-w-2xl mx-auto">
          zWork reads your files, writes your documents, and keeps track of
          what needs to happen next — all inside a simple app.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/download"
            className="press inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-base font-semibold text-paper hover:bg-ink/90 transition-colors"
          >
            Download free <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#demos"
            className="press inline-flex items-center gap-2 rounded-full border border-line px-8 py-3 text-base font-semibold text-ink hover:bg-paper transition-colors"
          >
            See how it works
          </a>
        </div>
      </div>

      {/* Hero demo — full app shell */}
      <div className="mx-auto w-full max-w-5xl">
        <HeroDemo />
      </div>
    </section>
  );
}

function HeroDemo() {
  const { state } = useDemoScenario(q1SummaryScenario, {
    typingSpeed: 35,
    stepDelay: 900,
  });

  const showComposer =
    state.phase === "idle" ||
    state.phase === "typing" ||
    state.phase === "sent" ||
    state.phase === "thinking";

  return (
    <div className="h-[520px] w-full overflow-hidden">
      <DemoShell sidebarOpen={true} msgCount={state.phase === "idle" ? 0 : 2}>
        <div className="flex h-full">
        {/* Messages + composer */}
        <div className="flex h-full min-w-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto flex max-w-[960px] flex-col gap-5 px-6 py-8">
              {state.typedText && (
                <DemoUserMessage
                  text={state.typedText}
                  showCursor={state.phase === "typing"}
                />
              )}
              {(state.phase === "thinking" ||
                state.phase === "done" ||
                state.phase === "artifact" ||
                state.phase === "complete") && (
                <DemoAssistantMessage
                  activities={q1SummaryScenario.activities}
                  visibleCount={state.visibleActivities}
                  showWorking={
                    state.phase === "thinking" &&
                    state.visibleActivities < q1SummaryScenario.activities.length
                  }
                >
                  {state.phase === "artifact" && (
                    <div className="mt-3 rounded-xl border border-line bg-paper-raised p-4 text-[13px] text-ink leading-6 animate-fade-in">
                      <p className="mb-2">
                        {q1SummaryScenario.assistantMessage}
                      </p>
                      <DemoDocContent
                        items={[
                          "Supply chain delays — 3 vendors flagged",
                          "Hiring shortfall — engineering 40% under target",
                          "Churn spike in enterprise tier — up 12% QoQ",
                        ]}
                      />
                    </div>
                  )}
                </DemoAssistantMessage>
              )}
            </div>
          </div>

          {showComposer && (
            <div className="shrink-0 bg-paper px-6 pb-5 pt-3 border-t border-line">
              <div className="mx-auto max-w-[960px]">
                <div className="group relative w-full rounded-2xl border border-line bg-paper-raised">
                  <div className="block w-full px-5 pt-4 pb-2 text-[14.5px] leading-6 text-ink-faint min-h-[48px]">
                    Send a message
                  </div>
                  <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5 pt-1">
                    <div className="flex items-center gap-1">
                      <div className="h-8 w-8 rounded-full hover:bg-paper-sunken flex items-center justify-center text-ink-muted cursor-pointer">
                        <Paperclip className="h-4 w-4" />
                      </div>
                      <div className="h-8 w-8 rounded-full hover:bg-paper-sunken flex items-center justify-center text-ink-muted cursor-pointer">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div className="h-8 w-8 rounded-full hover:bg-paper-sunken flex items-center justify-center text-ink-muted cursor-pointer">
                        <Layers3 className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-ink-muted px-2">
                        Claude 3.5
                      </span>
                      <div
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                          state.phase === "typing" || state.phase === "idle"
                            ? "bg-paper-sunken text-ink-faint border border-line"
                            : "bg-paper-sunken text-ink border border-line"
                        }`}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-center text-[11px] text-ink-faint">
                  zWork can take actions on your computer. Review before
                  approving.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Artifact panel */}
        <DemoArtifactPanel
          type="doc"
          title="Q1 Risk Summary"
          visible={state.showArtifact}
        >
          <DemoDocContent
            items={[
              "Supply chain delays — 3 vendors flagged",
              "Hiring shortfall — engineering 40% under target",
              "Churn spike in enterprise tier — up 12% QoQ",
            ]}
          />
        </DemoArtifactPanel>
      </div>
    </DemoShell>
    </div>
  );
}

function FeatureDemos() {
  return (
    <section id="demos" className="border-t border-line bg-paper-soft px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl space-y-24 sm:space-y-32">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint block mb-4">
            See it in action
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink">
            It does the work, you get the output.
          </h2>
        </div>

        {/* Demo 2 — Spreadsheet */}
        <FeatureDemo
          scenario={cleanSheetScenario}
          caption="Turn messy exports into clean tables without touching a formula."
          artifactType="sheet"
          artifactTitle="Revenue — March (Cleaned)"
          artifactContent={<DemoSheetContent />}
        />

        {/* Demo 3 — Tasks */}
        <FeatureDemo
          scenario={meetingTasksScenario}
          caption="Turn conversations into clear next steps that stay on your radar."
          artifactType="tasks"
          artifactTitle="Action Items — Product Meeting"
          artifactContent={<DemoTasksContent />}
        />

        {/* Demo 4 — Memory */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint block mb-4">
              04 / Memory
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-ink mb-4">
              It remembers everything.
            </h3>
            <p className="text-lg text-ink-muted leading-relaxed">
              {memoryRecallScenario.userMessage}
            </p>
            <p className="mt-4 text-ink-muted leading-relaxed">
              {memoryRecallScenario.assistantMessage}
            </p>
          </div>
          <div className="order-1 md:order-2 rounded-2xl border border-line bg-paper shadow-lg overflow-hidden">
            <MiniDemo scenario={memoryRecallScenario} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureDemo({
  scenario,
  caption,
  artifactType,
  artifactTitle,
  artifactContent,
}: {
  scenario: typeof cleanSheetScenario;
  caption: string;
  artifactType: "doc" | "sheet" | "tasks" | "graph";
  artifactTitle: string;
  artifactContent: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint block mb-4">
          {scenario.id === "clean-sheet" ? "02 / Spreadsheets" : "03 / Tasks"}
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-ink mb-4">
          {scenario.id === "clean-sheet"
            ? "From chaos to clean sheet."
            : "From meeting to action list."}
        </h3>
        <p className="text-lg text-ink-muted leading-relaxed">{caption}</p>
      </div>
      <div className="rounded-2xl border border-line bg-paper shadow-lg overflow-hidden">
        <MiniDemo
          scenario={scenario}
          artifactType={artifactType}
          artifactTitle={artifactTitle}
          artifactContent={artifactContent}
        />
      </div>
    </div>
  );
}

function MiniDemo({
  scenario,
  artifactType,
  artifactTitle,
  artifactContent,
}: {
  scenario: typeof cleanSheetScenario;
  artifactType?: "doc" | "sheet" | "tasks" | "graph";
  artifactTitle?: string;
  artifactContent?: React.ReactNode;
}) {
  const { state } = useDemoScenario(scenario, {
    typingSpeed: 25,
    stepDelay: 700,
    loopDelay: 4000,
  });

  const showComposer =
    state.phase === "idle" ||
    state.phase === "typing" ||
    state.phase === "sent" ||
    state.phase === "thinking";

  return (
    <div className="h-[380px] w-full overflow-hidden">
      <DemoShell sidebarOpen={false} msgCount={state.phase === "idle" ? 0 : 2}>
        <div className="flex h-full">
          <div className="flex h-full min-w-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto flex max-w-[960px] flex-col gap-5 px-6 py-8">
                {state.typedText && (
                  <DemoUserMessage
                    text={state.typedText}
                    showCursor={state.phase === "typing"}
                  />
                )}
                {(state.phase === "thinking" ||
                  state.phase === "done" ||
                  state.phase === "artifact" ||
                  state.phase === "complete") && (
                  <DemoAssistantMessage
                    activities={scenario.activities}
                    visibleCount={state.visibleActivities}
                    showWorking={
                      state.phase === "thinking" &&
                      state.visibleActivities < scenario.activities.length
                    }
                  >
                    {state.phase === "artifact" && scenario.assistantMessage && (
                      <div className="mt-3 text-[13px] text-ink leading-6 animate-fade-in">
                        {scenario.assistantMessage}
                      </div>
                    )}
                  </DemoAssistantMessage>
                )}
              </div>
            </div>

            {showComposer && (
              <div className="shrink-0 bg-paper px-6 pb-5 pt-3 border-t border-line">
                <div className="mx-auto max-w-[960px]">
                  <div className="group relative w-full rounded-2xl border border-line bg-paper-raised">
                    <div className="block w-full px-5 pt-4 pb-2 text-[14.5px] leading-6 text-ink-faint min-h-[48px]">
                      Send a message
                    </div>
                    <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5 pt-1">
                      <div className="flex items-center gap-1">
                        <div className="h-8 w-8 rounded-full hover:bg-paper-sunken flex items-center justify-center text-ink-muted cursor-pointer">
                          <Paperclip className="h-4 w-4" />
                        </div>
                        <div className="h-8 w-8 rounded-full hover:bg-paper-sunken flex items-center justify-center text-ink-muted cursor-pointer">
                          <Globe className="h-4 w-4" />
                        </div>
                        <div className="h-8 w-8 rounded-full hover:bg-paper-sunken flex items-center justify-center text-ink-muted cursor-pointer">
                          <Layers3 className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-ink-muted px-2">
                          Claude 3.5
                        </span>
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-paper-sunken text-ink border border-line">
                          <ArrowUp className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {artifactType && artifactTitle && (
            <DemoArtifactPanel
              type={artifactType}
              title={artifactTitle}
              visible={state.showArtifact}
            >
              {artifactContent}
            </DemoArtifactPanel>
          )}
        </div>
      </DemoShell>
    </div>
  );
}

function TrustSection() {
  const items = [
    {
      icon: <Monitor className="h-5 w-5" />,
      title: "Runs on your machine",
      desc: "macOS, Windows, and Linux. Your files never leave your computer.",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Private by default",
      desc: "No cloud proxy. No telemetry. No data collection. Period.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Free and open source",
      desc: "Use your own API keys, or ours. No account required to start.",
    },
  ];

  return (
    <section className="border-t border-line bg-paper px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid sm:grid-cols-3 gap-10">
          {items.map((item) => (
            <div key={item.title} className="text-center sm:text-left">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-paper-soft text-ink-muted mb-4">
                {item.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-ink mb-1">
                {item.title}
              </h3>
              <p className="text-[13px] text-ink-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="border-t border-line bg-paper-soft px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink mb-6">
          Ready to put your computer to work?
        </h2>
        <p className="text-lg text-ink-muted mb-10">
          Free and open source. No account required.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/download"
            className="press inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-base font-semibold text-paper hover:bg-ink/90 transition-colors"
          >
            Download free <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com/Ryz3nPlayZ/zWork"
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex items-center gap-2 rounded-full border border-line px-8 py-3 text-base font-semibold text-ink hover:bg-paper transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-6 py-12">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Logo size={22} fill="#171716" />
          <span className="text-[13px] font-semibold tracking-tight text-ink">
            <span className="lowercase">z</span>Work
          </span>
        </div>
        <div className="flex items-center gap-6 text-[12.5px] text-ink-muted">
          <Link to="/changelog" className="hover:text-ink transition-colors">
            Changelog
          </Link>
          <Link to="/motion" className="hover:text-ink transition-colors">
            Motion
          </Link>
          <a
            href="https://github.com/Ryz3nPlayZ/zWork"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            GitHub
          </a>
        </div>
        <div className="text-[11.5px] text-ink-faint">&copy; 2026 zWork</div>
      </div>
    </footer>
  );
}
