import { useEffect } from "react";
import { Header, Footer } from "../components/navbar";
import { Reveal, display, sub } from "../components/ui";
import { startScroll } from "../lib/scroll";

const content = {
  code: "404",
  heading: "This page doesn't exist.",
  body: "The link may be broken, or the page may have moved. Head back home, or get in touch if you think something is missing.",
  primary: { label: "Back to home", href: "/" },
  secondary: { label: "Contact", href: "/contact" },
};

const gradientText =
  "bg-linear-to-b from-white via-[#D8DAE0] to-[#A3A6B0] bg-clip-text text-transparent";

const buttonClass =
  "inline-flex items-center rounded-md border border-[#2A2D33] bg-black/30 px-7 py-3.5 font-sub text-[15px] font-medium uppercase tracking-[0.1em] text-[#ECEDF1] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#12A2EA] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12A2EA]";

export default function NotFound() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return startScroll(reduced);
  }, []);

  return (
    <main className="min-h-screen bg-black antialiased">
      <Header />
      <section
        aria-label="Page not found"
        className="relative flex min-h-[80vh] items-center justify-center bg-black px-5 pt-32 pb-24 sm:px-8"
      >
        <div className="mx-auto w-full max-w-6xl text-center">
          <Reveal>
            <p
              aria-hidden
              className={`${display} text-[clamp(5rem,18vw,12rem)] font-semibold leading-none tracking-[0.01em] ${gradientText}`}
            >
              {content.code}
            </p>
            <h1
              className={`${display} mt-6 mx-auto max-w-3xl text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-[0.01em] text-balance ${gradientText}`}
            >
              {content.heading}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p
              className={`${sub} mt-6 mx-auto max-w-xl text-[19px] leading-relaxed tracking-[0.03em] text-[#9A9DA6]`}
            >
              {content.body}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={content.primary.href} className={buttonClass}>
                {content.primary.label}
              </a>
              <a href={content.secondary.href} className={buttonClass}>
                {content.secondary.label}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}