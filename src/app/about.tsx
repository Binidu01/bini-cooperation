import { useEffect } from "react";
import { Header, Footer } from "../components/navbar";
import { Reveal, display, sub, metal } from "../components/ui";
import { startScroll } from "../lib/scroll";

const intro = {
  heading: "About Bini Cooperations",
  body: "Bini Cooperations is an early-stage technology company with a long-term ambition: to build useful software and meaningful products that can grow far beyond where we start.",
};

const story = {
  heading: "Software should make complex things simpler.",
  paragraphs: [
    "We are a software company, not a web studio. We design and build custom software, web applications, business systems, and digital products around real operational needs.",
    "We combine product thinking, engineering discipline, and modern technology, so what we deliver solves the problem it was built for and keeps working as the business grows.",
  ],
};

const principles = {
  heading: "How we think",
  items: [
    {
      title: "Start with the problem",
      body: "We spend time with the people doing the work before we write a line of code. What we build comes from how things actually run, not from how we assume they do.",
    },
    {
      title: "Keep it simple",
      body: "Good software takes steps away. We favor clear interfaces and systems a new team member can understand on their first day.",
    },
    {
      title: "Engineer it properly",
      body: "Clean architecture, solid testing, and careful releases. Reliability is built in from the start, so it holds up long after launch.",
    },
    {
      title: "Build for the long term",
      body: "We plan beyond version one. Everything we make is designed to grow, adapt, and last.",
    },
  ],
};

const binijs = {
  heading: "We build in the open.",
  body: "Alongside client work, we build Bini.js, an open-source React framework. It is where we put our engineering ideas into practice and share them with other developers.",
  label: "Explore",
  href: "/framework",
};

const gradientText =
  "bg-linear-to-b from-white via-[#D8DAE0] to-[#A3A6B0] bg-clip-text text-transparent";

function Intro() {
  return (
    <section aria-label="About" className="relative bg-black px-5 pt-40 pb-16 sm:px-8 md:pt-48 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1
            className={`${display} max-w-4xl text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[0.01em] text-balance ${gradientText}`}
          >
            {intro.heading}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className={`${sub} mt-6 max-w-2xl text-[19px] leading-relaxed tracking-[0.03em] text-[#9A9DA6]`}>
            {intro.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section aria-label="Our approach" className="relative bg-black px-5 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 border-t border-[#15171B] py-16 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-start md:gap-16 md:py-24">
        <Reveal>
          <h2
            className={`${display} text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-[0.01em] text-balance ${gradientText}`}
          >
            {story.heading}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-5">
            {story.paragraphs.map((p) => (
              <p key={p} className={`${sub} max-w-md text-[19px] leading-relaxed tracking-[0.03em] text-[#9A9DA6]`}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section aria-label="What we believe" className="relative bg-black px-5 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-[#15171B] py-16 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-16 md:py-24">
        <Reveal>
          <h2
            className={`${display} text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-[0.01em] text-balance md:sticky md:top-32 ${gradientText}`}
          >
            {principles.heading}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <ul className="divide-y divide-[#15171B] border-y border-[#15171B]">
            {principles.items.map((p) => (
              <li key={p.title} className="py-8">
                <h3 className={`${display} text-[22px] font-medium leading-snug tracking-[0.01em] text-[#ECEDF1]`}>
                  {p.title}
                </h3>
                <p className={`${sub} mt-2 max-w-lg text-[17px] leading-relaxed tracking-[0.02em] text-[#9A9DA6]`}>
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function OpenSource() {
  return (
    <section aria-label="Bini.js" className="relative bg-black px-5 pb-32 sm:px-8 md:pb-44">
      <div className="mx-auto max-w-6xl border-t border-[#15171B] pt-16 md:pt-24">
        <Reveal className="flex max-w-3xl flex-col items-start">
          <h2
            className={`${display} text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-[0.01em] text-balance ${gradientText}`}
          >
            {binijs.heading}
          </h2>
          <p className={`${sub} ${metal} mt-5 max-w-xl text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-snug tracking-[0.04em]`}>
            {binijs.body}
          </p>
          <a
            href={binijs.href}
            className="mt-9 inline-flex items-center rounded-md border border-[#2A2D33] bg-black/30 px-7 py-3.5 font-sub text-[15px] font-medium uppercase tracking-widest text-[#ECEDF1] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#12A2EA] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12A2EA]"
          >
            {binijs.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function AboutPage() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return startScroll(reduced);
  }, []);

  return (
    <main className="min-h-screen bg-black antialiased">
      <Header />
      <Intro />
      <Story />
      <Principles />
      <OpenSource />
      <Footer />
    </main>
  );
}