import { useEffect } from "react";
import { Header, Footer } from "../components/navbar";
import { Reveal, display, sub, metal } from "../components/ui";
import { startScroll } from "../lib/scroll";

const intro = {
  heading: "Bini.js",
  tagline: "An open-source React framework.",
  body: "Bini.js is the framework we build and use ourselves. It keeps the tooling light and the developer experience fast, so you can go from an idea to a working app without fighting your setup.",
  docs: { label: "Read the docs", href: "https://bini.js.org/" },
  github: { label: "GitHub", href: "https://github.com/Binidu01/bini-cli" },
};

const quickStart = {
  heading: "Start in a minute.",
  body: "Run one command to scaffold a new project. The starter gives you a working page to build from.",
  commands: ["npx create-bini-app@latest"],
};

const features = {
  heading: "What you get",
  items: [
    {
      title: "Fast by default",
      body: "The dev server starts instantly and rebuilds as you type.",
    },
    {
      title: "File-based routing",
      body: "Create a file and it becomes a route. Bini.js generates the route manifest for you.",
    },
    {
      title: "Prerendering and SSR",
      body: "Render pages at build time or on the server, so content loads fast and search engines can read it.",
    },
    {
      title: "Web and desktop",
      body: "Ship to the browser or to the desktop with Tauri, all from one React codebase.",
    },
    {
      title: "Modern styling",
      body: "Tailwind CSS v4 works out of the box, and the starters come in a few different styles.",
    },
    {
      title: "Open source",
      body: "Read the code, report issues, and help decide what we build next.",
    },
  ],
};

const ecosystem = {
  heading: "The ecosystem",
  items: [
    {
      name: "create-bini-app",
      body: "Scaffold a new Bini.js project with routing, API routes, and a deploy script.",
    },
    {
      name: "bini-router",
      body: "File-based routing, layouts, loading, error and 404 boundaries, MDX pages, and Hono API routes.",
    },
    {
      name: "bini-ssg",
      body: "Pre-render every route to static HTML at build time, with no export command.",
    },
    {
      name: "bini-server",
      body: "A secure production server with ETag caching, SPA fallback, and graceful shutdown.",
    },
    {
      name: "bini-env",
      body: "A Hono-native env system that works on Node, Bun, Deno, Edge, and Workers.",
    },
    {
      name: "bini-overlay",
      body: "An error overlay and loading badge that animates on HMR and shows the stack trace on error.",
    },
    {
      name: "bini-native",
      body: "Automatic Tauri wiring that detects web APIs and sets up Rust plugins and manifests.",
    },
    {
      name: "bini-deploy",
      body: "Zero-config deployment for web, desktop, and mobile from one CLI.",
    },
  ],
};

const gradientText =
  "bg-linear-to-b from-white via-[#D8DAE0] to-[#A3A6B0] bg-clip-text text-transparent";

const outlineButton =
  "inline-flex items-center rounded-md border border-[#2A2D33] bg-black/30 px-6 py-3 font-sub text-[15px] font-medium uppercase tracking-[0.1em] text-[#ECEDF1] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#12A2EA] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12A2EA]";

function Intro() {
  return (
    <section aria-label="Bini.js" className="relative bg-black px-5 pt-40 pb-16 sm:px-8 md:pt-48 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1
            className={`${display} text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[0.01em] ${gradientText}`}
          >
            {intro.heading}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className={`${sub} ${metal} mt-5 max-w-2xl text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug tracking-[0.04em]`}>
            {intro.tagline}
          </p>
          <p className={`${sub} mt-6 max-w-xl text-[19px] leading-relaxed tracking-[0.03em] text-[#9A9DA6]`}>
            {intro.body}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={intro.docs.href} target="_blank" rel="noopener noreferrer" className={outlineButton}>
              {intro.docs.label}
            </a>
            <a href={intro.github.href} target="_blank" rel="noopener noreferrer" className={outlineButton}>
              {intro.github.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Command({ text }: { text: string }) {
  const [bin, ...args] = text.split(" ");
  return (
    <>
      <span className="text-[#ECEDF1]">{bin}</span>
      {args.map((arg: string, i: number) => {
        const at = arg.indexOf("@", 1);
        return (
          <span key={i}>
            {" "}
            <span className="text-[#D8DAE0]">{at === -1 ? arg : arg.slice(0, at)}</span>
            {at !== -1 && <span className="text-[#1DC4EC]">{arg.slice(at)}</span>}
          </span>
        );
      })}
    </>
  );
}

function Terminal() {
  return (
    <div className="overflow-hidden rounded-lg bg-black shadow-[inset_0_0_0_1px_#23262C]">
      <div className="flex items-center gap-2.5 border-b border-[#23262C] px-4 py-2.5">
        <span aria-hidden className="font-mono text-[13px] text-[#9A9DA6]">
          &gt;_
        </span>
        <span className={`${sub} text-[15px] tracking-[0.02em] text-[#9A9DA6]`}>Terminal</span>
      </div>

      <pre className="overflow-x-auto px-4 py-4 font-mono text-[14px] leading-6">
        {quickStart.commands.map((c) => (
          <div key={c}>
            <span aria-hidden className="select-none text-[#A3E635]">
              ${" "}
            </span>
            <Command text={c} />
          </div>
        ))}
      </pre>
    </div>
  );
}

function QuickStart() {
  return (
    <section aria-label="Quick start" className="relative bg-black px-5 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-[#15171B] py-16 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-16 md:py-24">
        <Reveal>
          <h2
            className={`${display} text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-[0.01em] text-balance ${gradientText}`}
          >
            {quickStart.heading}
          </h2>
          <p className={`${sub} mt-5 max-w-md text-[19px] leading-relaxed tracking-[0.03em] text-[#9A9DA6]`}>
            {quickStart.body}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section aria-label="Features" className="relative bg-black px-5 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-[#15171B] py-16 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-16 md:py-24">
        <Reveal>
          <h2
            className={`${display} text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-[0.01em] text-balance md:sticky md:top-32 ${gradientText}`}
          >
            {features.heading}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <ul className="divide-y divide-[#15171B] border-y border-[#15171B]">
            {features.items.map((f) => (
              <li key={f.title} className="grid gap-2 py-7 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                <h3 className={`${display} text-[20px] font-medium leading-snug tracking-[0.01em] text-[#ECEDF1]`}>
                  {f.title}
                </h3>
                <p className={`${sub} text-[17px] leading-relaxed tracking-[0.02em] text-[#9A9DA6]`}>{f.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section aria-label="Ecosystem" className="relative bg-black px-5 pb-32 sm:px-8 md:pb-44">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-[#15171B] pt-16 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-16 md:pt-24">
        <Reveal>
          <h2
            className={`${display} text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-[0.01em] text-balance md:sticky md:top-32 ${gradientText}`}
          >
            {ecosystem.heading}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <ul className="divide-y divide-[#15171B] border-y border-[#15171B]">
            {ecosystem.items.map((e) => (
              <li key={e.name} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                <h3 className={`${display} text-[20px] font-medium leading-snug tracking-[0.01em]`}>
                  <a
                    href={`https://bini.js.org/plugins/${e.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ECEDF1] transition-colors duration-300 hover:text-[#1DC4EC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12A2EA]"
                  >
                    {e.name}
                  </a>
                </h3>
                <p className={`${sub} text-[17px] leading-relaxed tracking-[0.02em] text-[#9A9DA6]`}>{e.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default function FrameworkPage() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return startScroll(reduced);
  }, []);

  return (
    <main className="min-h-screen bg-black antialiased">
      <Header />
      <Intro />
      <QuickStart />
      <Features />
      <Ecosystem />
      <Footer />
    </main>
  );
}