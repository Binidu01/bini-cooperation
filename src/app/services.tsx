import { useEffect } from "react";
import { Header, Footer } from "../components/navbar";
import { Visual, type VisualKind } from "../components/services";
import { Icon, Reveal, display, sub, metal } from "../components/ui";
import { startScroll } from "../lib/scroll";

const intro = {
  heading: "What we do",
  body: "Every engagement starts with a specific operational need. We design and build the technology around it, from the first sketch to production.",
};

const offerings: {
  kind: VisualKind;
  title: string;
  summary: string;
  detail: string;
  points: string[];
}[] = [
  {
    kind: "product",
    title: "Custom Software",
    summary: "Purpose-built software designed around your specific business requirements.",
    detail:
      "Off-the-shelf tools rarely fit the way a business actually works. We build software, systems, and digital products shaped around your processes, so your team stops working around the tool and the tool starts working for them.",
    points: [
      "Internal tools and line-of-business systems",
      "Mobile and desktop applications",
      "Integrations with the tools you already use",
      "Ongoing maintenance and iteration",
    ],
  },
  {
    kind: "web",
    title: "Web Applications",
    summary: "Modern web applications and customer platforms built for performance, usability, and scalability.",
    detail:
      "From customer portals to full platforms, we build web applications that load fast, work on every screen size, and stay maintainable as they grow.",
    points: [
      "Customer portals and dashboards",
      "Responsive, accessible interfaces",
      "Performance and SEO built in",
      "Deployment and hosting setup",
    ],
  },
  {
    kind: "systems",
    title: "Business Systems",
    summary: "Automation, internal platforms, and modernization of legacy workflows.",
    detail:
      "When orders, stock, billing, and reporting live in separate places, things slip between them. We connect those operations into one system and replace manual, error-prone steps with reliable automation.",
    points: [
      "Workflow automation",
      "Internal platforms and admin tools",
      "Legacy system modernization",
      "Reporting and data consolidation",
    ],
  },
  {
    kind: "design",
    title: "Product Design",
    summary: "User experiences shaped around the needs of your users and your business objectives.",
    detail:
      "Good software starts with a clear picture of who uses it and why. We move from wireframes to a finished interface, and leave you with a consistent design system your team can keep building on.",
    points: [
      "User research and flows",
      "Wireframes and prototypes",
      "Interface and visual design",
      "Design systems and tokens",
    ],
  },
  {
    kind: "engineering",
    title: "Software Engineering",
    summary: "Architecture, development, integration, optimization, testing, and delivery.",
    detail:
      "Solid engineering is what keeps a product reliable after launch. We take care of the architecture, the code, the tests, and the delivery pipeline, with the same discipline whether it is a small tool or a large platform.",
    points: [
      "Architecture and technical planning",
      "Development and code review",
      "Automated testing and CI",
      "Performance optimization",
    ],
  },
];

const process = [
  { title: "Discover", body: "We learn the problem, the people involved, and what success looks like before anything is built." },
  { title: "Design", body: "Sketches become wireframes, then a clear interface you can react to early." },
  { title: "Build", body: "We develop in small, testable steps so you can see real progress along the way." },
  { title: "Launch", body: "We ship, monitor, and keep improving once real users are on it." },
];

const gradientText =
  "bg-linear-to-b from-white via-[#D8DAE0] to-[#A3A6B0] bg-clip-text text-transparent";

function Intro() {
  return (
    <section aria-label="Services" className="relative bg-black px-5 pt-40 pb-16 sm:px-8 md:pt-48 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1
            className={`${display} text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[0.01em] ${gradientText}`}
          >
            {intro.heading}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className={`${sub} mt-6 max-w-xl text-[19px] leading-relaxed tracking-[0.03em] text-[#9A9DA6]`}>
            {intro.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Offerings() {
  return (
    <section aria-label="Our services" className="relative bg-black px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {offerings.map((o, i) => (
          <article
            key={o.title}
            id={o.kind}
            className="grid items-center gap-10 border-t border-[#15171B] py-16 md:grid-cols-2 md:gap-20 md:py-24"
          >
            <Reveal className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="mx-auto w-full max-w-sm rounded-[18px] bg-white/2 p-2.5 shadow-[inset_0_0_0_1px_#23262C]">
                <div className="aspect-3/4 overflow-hidden rounded-xl bg-black shadow-[inset_0_0_0_1px_#23262C]">
                  <Visual kind={o.kind} id={`page-${i}`} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h2
                className={`${display} text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[0.01em] ${gradientText}`}
              >
                {o.title}
              </h2>
              <p className={`${sub} ${metal} mt-4 text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-snug tracking-[0.03em]`}>
                {o.summary}
              </p>
              <p className={`${sub} mt-5 max-w-lg text-[18px] leading-relaxed tracking-[0.03em] text-[#9A9DA6]`}>
                {o.detail}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {o.points.map((p) => (
                  <li key={p} className={`${sub} flex items-start gap-2.5 text-[16px] tracking-[0.03em] text-[#D8DAE0]`}>
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-[#12A2EA]" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section aria-label="How we work" className="relative bg-black px-5 pt-24 pb-32 sm:px-8 md:pt-32 md:pb-44">
      <div className="mx-auto max-w-6xl border-t border-[#15171B] pt-16 md:pt-24">
        <Reveal>
          <h2
            className={`${display} max-w-2xl text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-[0.01em] text-balance ${gradientText}`}
          >
            How we work
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="border-t border-[#2A2D33] pt-5">
                <h3 className={`${display} text-[14px] font-medium uppercase tracking-widest text-[#ECEDF1]`}>
                  {s.title}
                </h3>
                <p className={`${sub} mt-3 text-[17px] leading-snug tracking-[0.02em] text-[#9A9DA6]`}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return startScroll(reduced);
  }, []);

  return (
    <main className="min-h-screen bg-black antialiased">
      <Header />
      <Intro />
      <Offerings />
      <Process />
      <Footer />
    </main>
  );
}