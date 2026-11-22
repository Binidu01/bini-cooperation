import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Header, Footer } from "../components/navbar";
import { Reveal, display, sub } from "../components/ui";
import { startScroll } from "../lib/scroll";

const intro = {
  heading: "Contact us",
  body: "Tell us what you want to build or the problem you want to solve, and we'll get back to you.",
};

const email = "binicooperations@gmail.com";

const channels = [
  { label: "Email", value: email, href: `mailto:${email}`, external: false },
  { label: "WhatsApp", value: "+94 70 385 0455", href: "https://wa.me/94703850455", external: true },
  { label: "Phone", value: "+94 78 729 6686", href: "tel:+94787296686", external: false },
  {
    label: "LinkedIn",
    value: "Bini Cooperations",
    href: "https://www.linkedin.com/company/bini-cooperation/",
    external: true,
  },
];

const gradientText =
  "bg-linear-to-b from-white via-[#D8DAE0] to-[#A3A6B0] bg-clip-text text-transparent";

const fieldClass = `${sub} w-full rounded-md border border-[#23262C] bg-white/2 px-4 py-3 text-[17px] tracking-[0.02em] text-[#ECEDF1] placeholder:text-[#6B6E78] transition-colors duration-300 hover:border-[#2A2D33] focus:border-[#12A2EA] focus:outline-none`;

const labelClass = `${sub} block text-[15px] tracking-[0.03em] text-[#9A9DA6]`;

function Intro() {
  return (
    <section aria-label="Contact" className="relative bg-black px-5 pt-40 pb-16 sm:px-8 md:pt-48 md:pb-24">
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

function Channels() {
  return (
    <ul className="divide-y divide-[#15171B] border-y border-[#15171B]">
      {channels.map((c) => (
        <li key={c.label} className="py-6">
          <p className={`${sub} text-[15px] tracking-[0.03em] text-[#6B6E78]`}>{c.label}</p>
          <a
            href={c.href}
            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`${display} mt-1 inline-block break-all text-[20px] font-medium leading-snug tracking-[0.01em] text-[#ECEDF1] transition-colors duration-300 hover:text-[#1DC4EC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12A2EA]`}
          >
            {c.value}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Message from ${name.trim()}`;
    const body = `${message.trim()}\n\n${name.trim()}${mobile.trim() ? `\n${mobile.trim()}` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-4">
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="contact-mobile" className={labelClass}>
            Mobile number
          </label>
          <input
            id="contact-mobile"
            name="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="off"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="contact-message" className={labelClass}>
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-[#2A2D33] bg-black/30 px-5 py-2.5 font-sub text-[15px] font-medium uppercase tracking-widest text-[#ECEDF1] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#12A2EA] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12A2EA]"
        >
          Send message
        </button>
      </div>
    </form>
  );
}

function Reach() {
  return (
    <section aria-label="Ways to reach us" className="relative bg-black px-5 pb-32 sm:px-8 md:pb-44">
      <div className="mx-auto grid max-w-6xl gap-14 border-t border-[#15171B] pt-16 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-24 md:pt-24">
        <Reveal>
          <Channels />
        </Reveal>
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

export default function ContactPage() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return startScroll(reduced);
  }, []);

  return (
    <main className="min-h-screen bg-black antialiased">
      <Header />
      <Intro />
      <Reach />
      <Footer />
    </main>
  );
}