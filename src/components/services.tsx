import { useEffect, useRef, type ReactNode } from "react";
import { pinProgress, onFrame } from "../lib/scroll";
import { Icon, display, sub } from "./ui";

export type VisualKind = "web" | "systems" | "product" | "design" | "engineering";

const services = {
  heading: "What we do",
  intro: "Every engagement starts with a specific operational need. We design and build the technology around it.",
  items: [
    { kind: "product", title: "Custom Software", body: "Purpose-built software, systems, and digital products designed around your specific business requirements." },
    { kind: "web", title: "Web Applications", body: "Modern web applications and customer platforms built for performance, usability, and scalability." },
    { kind: "systems", title: "Business Systems", body: "Automation, internal platforms, and modernization of legacy workflows, so your teams operate more efficiently." },
    { kind: "design", title: "Product Design", body: "User experiences shaped around the needs of your users and your business objectives." },
    { kind: "engineering", title: "Software Engineering", body: "Architecture, development, integration, optimization, testing, and delivery." },
  ] as { kind: VisualKind; title: string; body: string }[],
  cta: { label: "View all services", href: "/services" },
};

const ACC = "#3FA9F5";
const FRAME = "#2F3238";
const SKEL = "#17191D";
const MUTED = "#6B6E78";
const MONO = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" } as const;

function Lbl({
  x,
  y,
  children,
  fill = ACC,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: ReactNode;
  fill?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} fill={fill} fontSize="8" letterSpacing="0.9" textAnchor={anchor} style={MONO}>
      {children}
    </text>
  );
}

const Bar = ({ x, y, w, c = SKEL, h = 4 }: { x: number; y: number; w: number; c?: string; h?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} />
);
const Dots = ({ x, y }: { x: number; y: number }) => (
  <g fill={FRAME}>
    <circle cx={x} cy={y} r="1.7" />
    <circle cx={x + 7} cy={y} r="1.7" />
    <circle cx={x + 14} cy={y} r="1.7" />
  </g>
);
const Tick = ({ x, y }: { x: number; y: number }) => (
  <path d={`M${x} ${y} l2 2.2 l3.6 -4.4`} fill="none" stroke="#12A2EA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
);
const Arrow = ({ x, y, dir }: { x: number; y: number; dir: "down" | "right" }) => (
  <path
    d={dir === "down" ? `M${x - 3} ${y - 4} L${x} ${y} L${x + 3} ${y - 4}` : `M${x - 4} ${y - 3} L${x} ${y} L${x - 4} ${y + 3}`}
    fill="none"
    stroke="#12A2EA"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

const NODE_ICONS: Record<string, string> = {
  cart: "M3 4h2l2.4 11h10.2l2-8H6.5|M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2|M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
  box: "M21 8l-9-5-9 5v8l9 5 9-5z|M3 8l9 5 9-5|M12 13v8",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2z|M9 8h6|M9 12h6",
  chart: "M4 20V11|M10 20V4|M16 20v-7|M22 20H2",
};

export function Visual({ kind, id }: { kind: VisualKind; id: string }) {
  return (
    <svg viewBox="0 0 300 400" className="size-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <pattern id={`grid-${id}`} width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" fill="none" stroke="#121418" strokeWidth="1" />
        </pattern>
        <pattern id={`dots-${id}`} width="4.5" height="4.5" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="0.9" fill="#3A3D45" />
        </pattern>
      </defs>
      <rect width="300" height="400" fill="#000" />
      <rect width="300" height="400" fill={`url(#grid-${id})`} />

      {kind === "web" && (
        <g>
          <rect x="60" y="70" width="190" height="120" rx="4" fill="#000" stroke={FRAME} />
          <path d="M60 86 H250" stroke={FRAME} />
          <Dots x={68} y={78} />
          <Lbl x={244} y={80} anchor="end">1440PX</Lbl>
          <rect x="100" y="96" width="68" height="40" rx="2" fill={`url(#dots-${id})`} />
          <rect x="174" y="96" width="68" height="40" rx="2" fill={SKEL} />
          <rect x="174" y="142" width="68" height="40" rx="2" fill={SKEL} />

          <rect x="36" y="150" width="120" height="110" rx="4" fill="#000" stroke={FRAME} />
          <path d="M36 166 H156" stroke={FRAME} />
          <Dots x={44} y={158} />
          <Lbl x={150} y={160} anchor="end">768PX</Lbl>
          <rect x="46" y="176" width="48" height="32" rx="2" fill={SKEL} />
          <rect x="100" y="176" width="48" height="32" rx="2" fill={SKEL} />
          <rect x="46" y="214" width="102" height="36" rx="2" fill={`url(#dots-${id})`} />

          <rect x="20" y="232" width="66" height="108" rx="4" fill="#000" stroke={FRAME} />
          <Lbl x={80} y={245} anchor="end">375PX</Lbl>
          <rect x="28" y="254" width="50" height="26" rx="2" fill={SKEL} />
          <rect x="28" y="286" width="50" height="26" rx="2" fill={SKEL} />
          <rect x="28" y="318" width="50" height="14" rx="2" fill={SKEL} />

        </g>
      )}

      {kind === "systems" && (
        <g>
          <g fill="none" stroke="#12A2EA" strokeDasharray="3 3">
            <path d="M76 104 V130 H116 V154" />
            <path d="M224 104 V130 H184 V154" />
            <path d="M116 246 V270 H76 V294" />
            <path d="M184 246 V270 H224 V294" />
          </g>
          <Arrow x={116} y={156} dir="down" />
          <Arrow x={184} y={156} dir="down" />
          <Arrow x={76} y={296} dir="down" />
          <Arrow x={224} y={296} dir="down" />

          {[
            [24, 60, "ORDERS", "cart"],
            [172, 60, "STOCK", "box"],
            [24, 296, "BILLING", "receipt"],
            [172, 296, "REPORTS", "chart"],
          ].map(([x, y, t, ic]) => (
            <g key={t as string}>
              <rect x={x as number} y={y as number} width="104" height="44" rx="5" fill="#000" stroke={FRAME} />
              <rect x={(x as number) + 10} y={(y as number) + 12} width="20" height="20" rx="5" fill="#0B0C0E" stroke={FRAME} />
              <g
                transform={`translate(${(x as number) + 11.6} ${(y as number) + 13.6}) scale(0.7)`}
                fill="none"
                stroke="#9A9DA6"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {NODE_ICONS[ic as string].split("|").map((d) => (
                  <path key={d} d={d} />
                ))}
              </g>
              <Lbl x={(x as number) + 38} y={(y as number) + 21} fill="#C9CCD4">{t as string}</Lbl>
              <Bar x={(x as number) + 38} y={(y as number) + 28} w={44} c="#23262C" h={3} />
            </g>
          ))}

          <rect x="84" y="156" width="132" height="90" rx="5" fill="#000" stroke="#3A3D45" />
          <path d="M84 172 H216" stroke={FRAME} />
          <Dots x={93} y={164} />
          <Lbl x={208} y={167} anchor="end" fill="#ECEDF1">SYSTEM</Lbl>
          {[10, 16, 12, 22, 30].map((h, n) => (
            <rect key={n} x={96 + n * 14} y={234 - h} width="8" height={h} rx="1.5" fill={n === 4 ? "#12A2EA" : "#23262C"} />
          ))}
          <path d="M96 214 L110 208 L124 211 L138 200 L152 192" fill="none" stroke="#3A3D45" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <Bar x={172} y={184} w={32} c="#C9CCD4" h={4} />
          <Bar x={172} y={194} w={24} c="#23262C" h={3} />
          <Bar x={172} y={202} w={30} c="#23262C" h={3} />
          <rect x="172" y="218" width="34" height="12" rx="6" fill="none" stroke="#12A2EA" />
          <circle cx="180" cy="224" r="2" fill="#12A2EA" />
          <Bar x={186} y={222.5} w={14} c="#23262C" h={3} />
        </g>
      )}

      {kind === "product" && (
        <g>
          <g fill="#2F3238">
            <rect x="87" y="110" width="3" height="14" rx="1.5" />
            <rect x="87" y="136" width="3" height="24" rx="1.5" />
            <rect x="87" y="166" width="3" height="24" rx="1.5" />
            <rect x="210" y="140" width="3" height="40" rx="1.5" />
          </g>
          <rect x="90" y="70" width="120" height="260" rx="24" fill="#000" stroke="#3A3D45" />
          <rect x="95" y="75" width="110" height="250" rx="19" fill="#000" stroke="#1B1D22" />
          <rect x="138" y="81" width="24" height="7" rx="3.5" fill="#0B0C0E" stroke={FRAME} />
          <Bar x={104} y={83} w={14} c="#8E9199" h={3} />
          <g fill="#8E9199">
            <rect x="172" y="86" width="2.5" height="3" />
            <rect x="176" y="84.5" width="2.5" height="4.5" />
            <rect x="180" y="83" width="2.5" height="6" />
          </g>
          <rect x="186" y="83" width="12" height="6" rx="2" fill="none" stroke="#8E9199" />
          <rect x="188" y="85" width="6" height="2" rx="1" fill="#8E9199" />
          <circle cx="111" cy="108" r="7" fill="#000" stroke={FRAME} />
          <Bar x={123} y={103} w={40} c="#C9CCD4" h={4} />
          <Bar x={123} y={111} w={26} c="#23262C" h={3} />
          <circle cx="193" cy="108" r="6" fill="none" stroke={FRAME} />
          <rect x="103" y="126" width="94" height="70" rx="8" fill="#000" stroke={FRAME} />
          <Bar x={111} y={134} w={30} c="#23262C" h={3} />
          <Bar x={111} y={143} w={44} c="#ECEDF1" h={6} />
          <path d="M111 186 C 127 178, 135 182, 148 170 S 172 160, 189 148" fill="none" stroke="#12A2EA" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="189" cy="148" r="2.2" fill="#12A2EA" />
          <rect x="103" y="206" width="28" height="10" rx="5" fill="none" stroke="#12A2EA" />
          <rect x="135" y="206" width="28" height="10" rx="5" fill="none" stroke={FRAME} />
          <rect x="167" y="206" width="28" height="10" rx="5" fill="none" stroke={FRAME} />
          {[0, 1, 2].map((n) => (
            <g key={n}>
              <circle cx="112" cy={234 + n * 25} r="7" fill="#000" stroke={FRAME} />
              <Bar x={126} y={229 + n * 25} w={[52, 44, 46][n]} c="#C9CCD4" h={3.5} />
              <Bar x={126} y={236 + n * 25} w={30} c="#23262C" h={3} />
              <Bar x={178} y={231 + n * 25} w={16} c="#3A3D45" h={4} />
            </g>
          ))}
          <rect x="140" y="318" width="20" height="3" rx="1.5" fill="#3A3D45" />
          <path d="M87 205 H76" stroke={FRAME} />
          <Lbl x={74} y={208} anchor="end">ONBOARDING</Lbl>
          <path d="M213 215 H224" stroke={FRAME} />
          <Lbl x={226} y={218}>ANALYTICS</Lbl>
        </g>
      )}

      {kind === "design" && (
        <g>
          <Lbl x={26} y={80} fill={MUTED}>WIREFRAME</Lbl>
          <rect x="26" y="90" width="104" height="150" rx="3" fill="#000" stroke={FRAME} strokeDasharray="3 3" />
          <rect x="36" y="100" width="84" height="46" fill="none" stroke={FRAME} strokeDasharray="2 3" />
          <path d="M36 100 L120 146 M120 100 L36 146" stroke={FRAME} />
          <Bar x={36} y={158} w={60} c="#23262C" />
          <Bar x={36} y={168} w={84} c={SKEL} />
          <Bar x={36} y={176} w={70} c={SKEL} />
          <rect x="36" y="196" width="40" height="14" rx="2" fill="none" stroke={FRAME} strokeDasharray="2 3" />
          <path d="M134 165 H164" stroke="#12A2EA" strokeDasharray="3 3" />
          <Arrow x={166} y={165} dir="right" />

          <Lbl x={170} y={80}>FINAL UI</Lbl>
          <rect x="170" y="90" width="104" height="150" rx="3" fill="#000" stroke={FRAME} />
          <rect x="180" y="100" width="84" height="46" rx="2" fill={`url(#dots-${id})`} />
          <Bar x={180} y={158} w={60} c="#C9CCD4" h={5} />
          <Bar x={180} y={168} w={84} c="#23262C" />
          <Bar x={180} y={176} w={70} c="#23262C" />
          <rect x="180" y="196" width="40" height="14" rx="3" fill="#12A2EA" />

          <Lbl x={26} y={296} fill={MUTED}>DESIGN TOKENS</Lbl>
          {["#12A2EA", "#ECEDF1", "#3A3D45", "#17191D"].map((c, n) => (
            <rect key={c} x={26 + n * 26} y="304" width="18" height="18" rx="3" fill={c} stroke={FRAME} />
          ))}
          <text x="158" y="320" fill="#ECEDF1" fontSize="20" style={MONO}>Aa</text>
        </g>
      )}

      {kind === "engineering" && (
        <g>
          {["CLIENT", "API GATEWAY", "SERVICES", "DATABASE"].map((t, n) => (
            <g key={t}>
              <rect x="40" y={56 + n * 64} width="220" height="42" rx="4" fill="#000" stroke={FRAME} />
              <Lbl x={52} y={80 + n * 64} fill="#C9CCD4">{t}</Lbl>
              {[0, 1, 2].map((m) => (
                <rect key={m} x={196 + m * 18} y={70 + n * 64} width="12" height="14" rx="2" fill="none" stroke={FRAME} />
              ))}
              {n < 3 && (
                <g>
                  <path d={`M150 ${98 + n * 64} V${118 + n * 64}`} stroke="#12A2EA" strokeDasharray="3 3" fill="none" />
                  <Arrow x={150} y={120 + n * 64} dir="down" />
                </g>
              )}
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

export function Services() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const track = trackRef.current!;
    const mq = window.matchMedia("(min-width: 768px)");
    let dist = 0;

    const layout = () => {
      if (!mq.matches) {
        root.style.height = "";
        track.style.transform = "";
        dist = 0;
        return;
      }
      const visible = window.innerWidth - track.offsetLeft;
      dist = Math.max(0, track.offsetWidth - visible);
      root.style.height = `${window.innerHeight + dist * 1.15}px`;
    };
    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout);

    const off = onFrame(() => {
      if (!mq.matches) return;
      const { p, rect, vh } = pinProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      track.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
    });

    return () => {
      off();
      window.removeEventListener("resize", layout);
    };
  }, []);

  return (
    <section
      id="services"
      ref={rootRef}
      aria-label="Services"
      className="svc relative bg-black"
    >
      <div className="svc-stage">
        <div className="svc-intro">
          <h2
            className={`${display} text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold leading-[1.08] tracking-[0.01em] bg-linear-to-b from-white via-[#D8DAE0] to-[#A3A6B0] bg-clip-text text-transparent`}
          >
            {services.heading}
          </h2>
          <p className={`${sub} mt-6 max-w-sm text-[18px] leading-relaxed tracking-[0.03em] text-[#9A9DA6]`}>
            {services.intro}
          </p>
          <a
            href={services.cta.href}
            className={`${sub} mt-8 inline-flex w-fit items-center gap-2 rounded-md border border-[#2A2D33] bg-black/30 px-5 py-2.5 text-[14px] uppercase tracking-widest text-[#ECEDF1] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#12A2EA] hover:text-white`}
          >
            {services.cta.label}
            <Icon name="arrow" className="size-4" />
          </a>
        </div>

        <div ref={trackRef} className="svc-track">
          {services.items.map((it, i) => (
            <article key={it.title} className="svc-card">
              <div className="svc-media">
                <Visual kind={it.kind} id={String(i)} />
              </div>
              <div className="svc-copy">
                <h3 className={`${display} text-[14px] font-medium uppercase tracking-widest text-[#ECEDF1]`}>{it.title}</h3>
                <p className={`${sub} mt-2 text-[17px] leading-snug tracking-[0.02em] text-[#9A9DA6]`}>{it.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .svc-stage { padding: 6rem 1.25rem 5rem; }
            .svc-intro { display: flex; flex-direction: column; margin-bottom: 3rem; }
            .svc-track { display: grid; gap: 2.5rem; grid-template-columns: 1fr; }
            .svc-card { min-width: 0; padding: 10px; border-radius: 18px; background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012)); box-shadow: inset 0 0 0 1px #23262C; transition: box-shadow .35s ease, transform .35s ease; }
            .svc-card:hover { box-shadow: inset 0 0 0 1px rgba(18,162,234,0.55); transform: translateY(-3px); }
            .svc-media { position: relative; overflow: hidden; border-radius: 12px; background: #000; aspect-ratio: 3 / 4; box-shadow: inset 0 0 0 1px #23262C; }
            .svc-media svg { transition: transform .8s cubic-bezier(.2,.7,.1,1); }
            .svc-card:hover .svc-media svg { transform: scale(1.04); }
            .svc-copy { padding: 1.1rem 0.6rem 0.8rem; }
            @media (min-width: 640px) { .svc-track { grid-template-columns: 1fr 1fr; } }
            @media (min-width: 768px) {
              .svc-stage { position: sticky; top: 0; height: 100svh; overflow: hidden; display: flex; align-items: center; padding: 5rem 0 2rem; }
              .svc-intro { position: absolute; z-index: 10; top: 0; bottom: 0; left: 0; width: min(36vw, 540px); margin: 0; justify-content: center; padding: 5rem 3rem 2rem max(2rem, 4vw); background: linear-gradient(90deg, #000 80%, rgba(0,0,0,0)); }
              .svc-progress { display: flex; }
              .svc-track { display: flex; gap: 2rem; width: max-content; margin-left: min(36vw, 540px); padding-right: 6vw; will-change: transform; }
              .svc-card { flex: none; --ih: min(52svh, 440px); width: calc(var(--ih) * 0.75 + 20px); }
              .svc-media { height: var(--ih); aspect-ratio: auto; }
            }
          `,
        }}
      />
    </section>
  );
}