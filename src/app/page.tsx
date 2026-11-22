import { useEffect, useRef } from "react";
import { Header, Footer } from "../components/navbar";
import { Hero } from "../components/hero";
import { Services } from "../components/services";
import { Reveal, display, sub, metal } from "../components/ui";
import { startScroll, onFrame, range, smoothstep } from "../lib/scroll";

const vision = {
  heading: "Built for the long term. Designed around real problems.",
  body: "Bini Cooperations is an early-stage technology company with a long-term ambition: to build useful software and meaningful products that can grow far beyond where we start. We believe software should make complex things simpler, so we combine product thinking, engineering discipline, and modern technology to create digital solutions designed around real-world needs.",
};

function Vision() {
  const rootRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last = -1;

    return onFrame(() => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0) return;

      const t = reduced ? 1 : range(vh - rect.top, 200, vh / 2 + rect.height / 2);
      if (Math.abs(t - last) < 0.0005) return;
      last = t;

      const e = smoothstep(t);
      const shift = (1 - e) * window.innerWidth;
      if (leftRef.current) {
        leftRef.current.style.transform = `translate3d(${-shift}px, 0, 0)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translate3d(${shift}px, 0, 0)`;
      }
    });
  }, []);

  return (
    <section
      id="vision"
      ref={rootRef}
      aria-label="Vision"
      className="relative overflow-hidden bg-black px-5 py-28 sm:px-8 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-end md:gap-16">
          <div ref={leftRef} className="will-change-transform" style={{ transform: "translate3d(-100vw, 0, 0)" }}>
            <h2
              className={`${display} text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-[0.01em] text-balance bg-linear-to-b from-white via-[#D8DAE0] to-[#A3A6B0] bg-clip-text text-transparent`}
            >
              {vision.heading}
            </h2>
          </div>
          <div ref={rightRef} className="will-change-transform" style={{ transform: "translate3d(100vw, 0, 0)" }}>
            <p className={`${sub} max-w-md text-[19px] leading-relaxed tracking-[0.03em] text-[#9A9DA6]`}>{vision.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const finale = {
  heading: "Have a problem worth solving?",
  sub: "Tell us what you are building, what needs to improve, or where you want to go next.",
  button: "Contact",
  href: "/contact",
};

function Closing() {
  return (
    <section aria-label="Contact" className="relative bg-black px-5 pb-32 pt-8 text-center sm:px-8 md:pb-44">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center">
        <h2
          className={`${display} max-w-3xl text-[clamp(1.375rem,3.6vw,2.75rem)] font-semibold leading-[1.2] tracking-[0.02em] text-balance bg-linear-to-b from-white via-[#D8DAE0] to-[#A3A6B0] bg-clip-text text-transparent`}
        >
          {finale.heading}
        </h2>
        <p className={`${sub} ${metal} mt-5 max-w-md text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-snug tracking-[0.04em]`}>
          {finale.sub}
        </p>
        <a
          href={finale.href}
          className="mt-9 inline-flex items-center rounded-md border border-[#2A2D33] bg-black/30 px-7 py-3.5 font-sub text-[15px] font-medium uppercase tracking-widest text-[#ECEDF1] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#12A2EA] hover:text-white"
        >
          {finale.button}
        </a>
      </Reveal>
    </section>
  );
}

export default function Page() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return startScroll(reduced);
  }, []);

  return (
    <main className="min-h-screen bg-black antialiased">
      <Header />
      <Hero />
      <Services />
      <Vision />
      <Closing />
      <Footer />
    </main>
  );
}