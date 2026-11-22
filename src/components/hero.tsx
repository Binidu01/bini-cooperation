import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import {
  lerp,
  range,
  smoothstep,
  easeOutCubic,
  easeInQuad,
  easeInOutCubic,
  bump,
  storyProgress,
  onFrame,
} from "../lib/scroll";
import { Icon, ICONS, display, sub, metal } from "./ui";

type Cam = { fx: number; fy: number; s: number };
type Shot = { from: number; to: number; a: Cam; b: Cam };

const SHOTS: Shot[] = [
  { from: 0, to: 0.24, a: { fx: 0.5, fy: 0.5, s: 0.985 }, b: { fx: 0.5, fy: 0.5, s: 1.03 } },
  { from: 0.24, to: 0.4, a: { fx: 0.5, fy: 0.5, s: 1.04 }, b: { fx: 0.5, fy: 0.5, s: 1.0 } },
  { from: 0.4, to: 0.52, a: { fx: 0.5, fy: 0.5, s: 0.99 }, b: { fx: 0.5, fy: 0.5, s: 1.03 } },
  { from: 0.52, to: 0.605, a: { fx: 0.5, fy: 0.5, s: 1.04 }, b: { fx: 0.5, fy: 0.5, s: 1.0 } },
  { from: 0.605, to: 0.76, a: { fx: 0.5, fy: 0.5, s: 1 }, b: { fx: 0.5, fy: 0.5, s: 1.02 } },
  { from: 0.76, to: 1, a: { fx: 0.5, fy: 0.5, s: 1.02 }, b: { fx: 0.5, fy: 0.5, s: 1.05 } },
];

function camAt(p: number): Cam {
  const shot = SHOTS.find((sh) => p < sh.to) ?? SHOTS[SHOTS.length - 1];
  const t = range(p, shot.from, shot.to);
  const e = lerp(t, smoothstep(t), 0.5);
  return {
    fx: lerp(shot.a.fx, shot.b.fx, e),
    fy: lerp(shot.a.fy, shot.b.fy, e),
    s: lerp(shot.a.s, shot.b.s, e),
  };
}

const ATMOSPHERE = false;

type RootRef = { rootRef: RefObject<HTMLElement | null> };

function AtmosphereBack({ rootRef }: RootRef) {
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onFrame(() => {
        const root = rootRef.current;
        if (!root) return;
        const { p, rect, vh } = storyProgress(root);
        if (rect.bottom < 0 || rect.top > vh) return;
        const end = 1 - range(p, 0.86, 0.93);

        if (dotsRef.current) {
          dotsRef.current.style.opacity = String(
            range(p, 0.02, 0.12) * (1 - range(p, 0.5, 0.78) * 0.7) * end
          );
          dotsRef.current.style.backgroundPosition = `0 ${-p * 220}px`;
        }
      }),
    [rootRef]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={dotsRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: "radial-gradient(rgba(163,166,176,0.35) 1px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(70% 60% at 50% 50%, #000, transparent 100%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 50%, #000, transparent 100%)",
        }}
      />
    </div>
  );
}

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .9 -.32'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function AtmosphereFront({ rootRef }: RootRef) {
  const vignetteRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onFrame(() => {
        const root = rootRef.current;
        if (!root) return;
        const { p, rect, vh } = storyProgress(root);
        if (rect.bottom < 0 || rect.top > vh) return;

        if (vignetteRef.current)
          vignetteRef.current.style.opacity = String(0.6 + bump(p, 0.9, 0.1) * 0.4);
      }),
    [rootRef]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-12 overflow-hidden">
      <div
        ref={vignetteRef}
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.4) 100%)" }}
      />

      {ATMOSPHERE && (
        <div className="bini-grain absolute inset-[-50%] opacity-[0.03]" style={{ backgroundImage: GRAIN }} />
      )}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes bini-grain {
              0%   { transform: translate3d(0, 0, 0); }
              25%  { transform: translate3d(-6%, 4%, 0); }
              50%  { transform: translate3d(5%, -7%, 0); }
              75%  { transform: translate3d(-4%, -3%, 0); }
              100% { transform: translate3d(0, 0, 0); }
            }
            .bini-grain { animation: bini-grain 0.9s steps(5) infinite; }
            @media (prefers-reduced-motion: reduce) { .bini-grain { animation: none; } }
          `,
        }}
      />
    </div>
  );
}

const build = {
  heading: "From idea to production.",
  sub: "Technology built around real problems.",
};

const WORDS = [
  { from: 0.1, fade: 0.21, to: 0.23, text: "Discover" },
  { from: 0.26, fade: 0.37, to: 0.39, text: "Design" },
  { from: 0.43, fade: 0.57, to: 0.59, text: "Build" },
  { from: 0.64, fade: 0.89, to: 0.94, text: "Launch" },
] as const;

const demo = {
  domain: "halden.com",
  logo: "Halden",
  links: ["Platform", "Solutions", "Contact"],
  cta: "Start free trial",
  headline: "Every order, shipment and invoice in one view.",
  sub: "Halden gives distributors live visibility across orders, inventory and billing, so nothing slips between systems.",
  primary: "Start free trial",
  secondary: "Talk to sales",
  chartTitle: "Orders, last 30 days",
  kpi: "12,480",
  delta: "18.2%",
  activityTitle: "Recent activity",
  activityLink: "View all",
  activity: [
    { icon: "cart", tone: "blue", title: "New order #48213", detail: "Brightline Supply · $2,480", time: "2 min ago" },
    { icon: "box", tone: "green", title: "Stock received", detail: "1,200 units · SKU HX-204", time: "18 min ago" },
    { icon: "alert", tone: "amber", title: "Low stock alert", detail: "M8 steel fasteners · 42 left", time: "45 min ago" },
    { icon: "receipt", tone: "green", title: "Invoice paid", detail: "INV-3391 · $12,900", time: "1 hr ago" },
    { icon: "truck", tone: "blue", title: "Shipment dispatched", detail: "Order #48197 · Rotterdam", time: "2 hr ago" },
  ],
};

const STAGE_VH = 640;

const DEVICES = [
  { lw: 1200, ratio: 1.55 },
  { lw: 768, ratio: 0.78 },
  { lw: 390, ratio: 0.52 },
] as const;

const CHROME = 28;
const STAGGER = 0.55;

const fit = (boxW: number, boxH: number, ratio: number) => {
  const w = Math.min(boxW * 0.96, boxH * 0.96 * ratio);
  return { w, h: w / ratio };
};

function B({
  className = "",
  inner = "",
  children,
}: {
  className?: string;
  inner?: string;
  children?: ReactNode;
}) {
  return (
    <div data-b className={`blk ${className}`}>
      <div className={`real ${inner}`}>{children}</div>
      <span className="wire" />
      <span className="skel" />
    </div>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const frameWireRef = useRef<HTMLDivElement>(null);
  const frameBodyRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const ctaRef = useRef<HTMLSpanElement>(null);
  const urlTextRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rimRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const bezelRef = useRef<HTMLDivElement>(null);
  const islandRef = useRef<HTMLDivElement>(null);
  const camRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const tabBtnRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const kpiRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const box = boxRef.current!;
    const frame = frameRef.current!;
    const ui = uiRef.current!;
    const blocks = Array.from(frame.querySelectorAll<HTMLElement>("[data-b]"));
    const count = blocks.length;

    const domain = demo.domain;

    let lastP = -1;
    let boxW = 0;
    let boxH = 0;
    let typed = -1;

    const measure = () => {
      boxW = box.clientWidth;
      boxH = box.clientHeight;
      lastP = -1;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);

    const off = onFrame(() => {
      const { p, rect, vh } = storyProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;

      if (boxW === 0 || Math.abs(p - lastP) < 0.00004) return;
      lastP = p;

      const wireP = range(p, 0.06, 0.22);
      const skelP = range(p, 0.26, 0.4);
      const fullP = range(p, 0.43, 0.57);

      blocks.forEach((el, i) => {
        const a = (i / count) * STAGGER;
        const b = a + 1 - STAGGER;
        el.style.setProperty("--w", String(easeOutCubic(range(wireP, a, b))));
        el.style.setProperty("--s", String(range(skelP, a, b)));
        el.style.setProperty("--f", String(easeOutCubic(range(fullP, a, b))));
      });

      const body = easeOutCubic(range(p, 0.26, 0.4));
      if (frameWireRef.current)
        frameWireRef.current.style.opacity = String(range(p, 0.02, 0.06) * (1 - body));
      if (frameBodyRef.current) frameBodyRef.current.style.opacity = String(body);

      const rp = range(p, 0.62, 0.76);
      const a = smoothstep(range(rp, 0, 0.38));
      const b = smoothstep(range(rp, 0.62, 1));
      const [d, t, m] = DEVICES.map((dev) => fit(boxW, boxH, dev.ratio));
      const w = lerp(lerp(d.w, t.w, a), m.w, b);
      const h = lerp(lerp(d.h, t.h, a), m.h, b);
      const lw = lerp(lerp(DEVICES[0].lw, DEVICES[1].lw, a), DEVICES[2].lw, b);

      const bz = lerp(lerp(0, 6, a), 5, b);
      const R = lerp(lerp(12, 18, a), w * 0.13, b);
      const chrome = CHROME * (1 - a);
      const sw = w - 2 * bz;
      const sh = h - 2 * bz - chrome;
      const k = sw / lw;

      const cam = camAt(p);
      const rise = easeInOutCubic(range(p, 0, 0.1));
      const shipLift = easeOutCubic(range(p, 0.76, 0.9));
      const exitE = easeInQuad(range(p, 0.86, 0.93));
      const S = cam.s * (1 + exitE * 0.12);

      const shake = 0.3;
      const sx = Math.sin(p * 410) * 0.9 * shake;
      const sy = Math.cos(p * 530) * 0.7 * shake;

      const tx = (0.5 - cam.fx) * w * S + sx;
      const ty = (0.5 - cam.fy) * h * S + sy + lerp(boxH * 0.85, 0, rise) - shipLift * 6;

      const blur = exitE * 6;

      frame.style.width = `${w}px`;
      frame.style.height = `${h}px`;
      frame.style.transform = `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, 0) scale(${S})`;
      frame.style.filter = blur > 0.05 ? `blur(${blur}px)` : "";
      frame.style.opacity = String(range(p, 0, 0.04) * (1 - range(p, 0.89, 0.94)));
      ui.style.left = `${bz}px`;
      ui.style.top = `${bz + chrome}px`;
      ui.style.width = `${lw}px`;
      ui.style.height = `${sh / k}px`;
      ui.style.transform = `scale(${k})`;
      ui.style.setProperty("--k", String(k));

      if (shellRef.current) shellRef.current.style.borderRadius = `${R}px`;
      if (chromeRef.current) chromeRef.current.style.opacity = String(1 - range(a, 0, 0.5));
      if (bezelRef.current) {
        const bs = bezelRef.current.style;
        bs.opacity = String(range(a, 0, 0.3));
        bs.borderWidth = `${bz}px`;
        bs.borderRadius = `${R}px`;
      }
      if (camRef.current) {
        const cs = camRef.current.style;
        const dot = 4.5;
        cs.opacity = String(range(a, 0.5, 1) * (1 - range(b, 0, 0.3)));
        cs.width = cs.height = `${dot}px`;
        cs.top = `${bz / 2 - dot / 2}px`;
      }
      if (islandRef.current) {
        const is = islandRef.current.style;
        is.opacity = String(range(b, 0.5, 1));
        is.width = `${sw * 0.26}px`;
        is.height = `${sw * 0.07}px`;
        is.top = `${bz + sw * 0.026}px`;
      }
      if (btnRef.current) btnRef.current.style.opacity = String(range(b, 0.4, 1));
      if (tabBtnRef.current) tabBtnRef.current.style.opacity = String(range(a, 0.5, 1) * (1 - range(b, 0, 0.3)));
      if (rimRef.current) rimRef.current.style.borderRadius = `${R}px`;
      if (frameWireRef.current) frameWireRef.current.style.borderRadius = `${R}px`;
      if (contentRef.current)
        contentRef.current.style.paddingTop = b > 0.001 ? `${24 + b * 28}px` : "";

      if (rimRef.current) rimRef.current.style.opacity = String(easeOutCubic(range(p, 0.42, 0.6)));

      if (chartRef.current)
        chartRef.current.style.strokeDashoffset = String(1 - easeOutCubic(range(p, 0.46, 0.58)));
      if (areaRef.current)
        areaRef.current.style.opacity = String(easeOutCubic(range(p, 0.5, 0.6)));
      if (ctaRef.current) {
        const lift = easeOutCubic(range(p, 0.5, 0.6));
        ctaRef.current.style.opacity = String(0.75 + lift * 0.25);
      }
      if (kpiRef.current)
        kpiRef.current.textContent = Math.round(
          12480 * easeOutCubic(range(p, 0.5, 0.62))
        ).toLocaleString("en-US");

      const chars = Math.floor(range(p, 0.52, 0.62) * domain.length);
      if (chars !== typed && urlTextRef.current) {
        typed = chars;
        urlTextRef.current.textContent = domain.slice(0, chars);
      }

      if (contentRef.current) {
        const el = contentRef.current;
        const ms = smoothstep(range(p, 0.76, 0.86));
        el.scrollTop = ms * Math.max(0, el.scrollHeight - el.clientHeight);
      }

      if (titleRef.current) {
        const out = easeInQuad(range(p, 0.03, 0.12));
        titleRef.current.style.opacity = String(1 - out);
        titleRef.current.style.transform = `translate3d(0, ${-out * 7}vh, 0) scale(${1 + out * 0.18})`;
        titleRef.current.style.filter = out > 0.01 ? `blur(${out * 14}px)` : "";
      }

      WORDS.forEach((wd, i) => {
        const el = wordRefs.current[i];
        if (!el) return;
        const inn = easeOutCubic(range(p, wd.from, wd.from + 0.025));
        const out = range(p, wd.fade, wd.to);
        el.style.opacity = String(inn * (1 - out));
        el.style.transform = `translate3d(${(1 - inn) * -70}px, 0, 0) scale(${lerp(1.06, 1, inn)})`;
      });
    });

    return () => {
      off();
      ro.disconnect();
    };
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      aria-label="From sketch to shipped"
      className="relative bg-black"
      style={{ height: `${STAGE_VH}svh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-black px-4 pt-20 pb-4 sm:px-6 md:px-8">
        {ATMOSPHERE && <AtmosphereBack rootRef={rootRef} />}

        <div className="relative min-h-0 flex-1">
          <div ref={boxRef} className="absolute inset-0">
            <div
              ref={frameRef}
              aria-hidden
              className="absolute top-1/2 left-1/2"
              style={{
                width: 580,
                height: 360,
                transform: "translate(-50%, -50%)",
                opacity: 1,
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[6%] -bottom-5 h-10 rounded-[50%] bg-black/80 blur-2xl"
              />

              <div
                ref={shellRef}
                className="absolute inset-0 overflow-hidden rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              >
                <div
                  ref={frameBodyRef}
                  className="absolute inset-0 bg-linear-to-br from-[#0B0C0E] to-[#1A1A1E]"
                  style={{ opacity: 0 }}
                />

                <div ref={chromeRef} className="absolute inset-x-0 top-0 h-7 overflow-hidden">
                <B
                  className="h-full"
                  inner="flex h-full items-center gap-1.5 bg-[#15171B] px-3"
                >
                  <span className="size-2 rounded-full bg-[#2A2D33]" />
                  <span className="size-2 rounded-full bg-[#2A2D33]" />
                  <span className="size-2 rounded-full bg-[#2A2D33]" />
                  <span className="ml-3 flex h-4 max-w-45 flex-1 items-center overflow-hidden rounded-full bg-[#0B0C0E] px-2.5">
                    <span
                      ref={urlTextRef}
                      className="whitespace-nowrap font-mono text-[9px] leading-none text-[#9A9DA6]"
                    />
                  </span>
                </B>
                </div>

                <div
                  ref={uiRef}
                  className="@container absolute left-0 origin-top-left text-white"
                  style={{ top: CHROME, width: DEVICES[0].lw, height: 700 }}
                >
                  <div
                    ref={contentRef}
                    className="flex h-full flex-col gap-6 overflow-hidden p-6 @4xl:gap-6 @4xl:p-7"
                  >
                    <header className="flex items-center justify-between gap-4">
                      <B
                        className="rounded-md"
                        inner="flex items-center gap-2 text-lg font-semibold"
                      >
                        <span className="grid size-7 place-items-center rounded-md bg-linear-to-br from-[#12A2EA] to-[#0636C6] text-white">
                          <Icon name="logo" className="size-4" />
                        </span>
                        {demo.logo}
                      </B>
                      <B
                        className="hidden rounded-full @4xl:block"
                        inner="flex gap-7 px-3 py-1 text-sm font-medium text-[#9A9DA6]"
                      >
                        {demo.links.map((l) => (
                          <span key={l}>{l}</span>
                        ))}
                      </B>
                      <B
                        className="hidden rounded-full @4xl:block"
                        inner="rounded-full bg-linear-to-b from-[#1B7FE0] to-[#1052C4] px-4 py-2 text-sm font-medium text-white"
                      >
                        {demo.cta}
                      </B>
                      <B
                        className="rounded @4xl:hidden"
                        inner="flex size-8 flex-col items-center justify-center gap-1"
                      >
                        <span className="h-0.5 w-4 bg-[#9A9DA6]" />
                        <span className="h-0.5 w-4 bg-[#9A9DA6]" />
                        <span className="h-0.5 w-4 bg-[#9A9DA6]" />
                      </B>
                    </header>

                    <div className="grid items-center gap-7 @4xl:grid-cols-2 @4xl:gap-10">
                      <div className="space-y-4">
                        <B
                          className="rounded-lg"
                          inner="text-[clamp(1.5rem,3cqw,2.75rem)] font-semibold leading-[1.1] tracking-tight"
                        >
                          {demo.headline}
                        </B>
                        <B
                          className="rounded-lg"
                          inner="max-w-sm text-[15px] leading-relaxed text-[#9A9DA6]"
                        >
                          {demo.sub}
                        </B>
                        <div className="flex flex-wrap gap-2.5">
                          <B className="rounded-full" inner="rounded-full">
                            <span
                              ref={ctaRef}
                              className="block rounded-full bg-linear-to-b from-[#1B7FE0] to-[#1052C4] px-5 py-2.5 text-sm font-medium text-white"
                            >
                              {demo.primary}
                              <Icon name="arrow" className="ml-1.5 inline size-3.5 align-[-2px]" />
                            </span>
                          </B>
                          <B
                            className="rounded-full"
                            inner="rounded-full px-5 py-2.5 text-sm font-medium text-[#D8DAE0] ring-1 ring-[#2A2D33]"
                          >
                            {demo.secondary}
                          </B>
                        </div>
                      </div>

                      <B
                        className="rounded-xl"
                        inner="rounded-xl bg-white/[0.03] p-4 ring-1 ring-[#2A2D33]"
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm text-[#9A9DA6]">{demo.chartTitle}</span>
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                            <Icon name="up" className="size-3" />
                            {demo.delta}
                          </span>
                        </div>
                        <p ref={kpiRef} className="mt-1 text-2xl font-semibold tabular-nums">
                          {demo.kpi}
                        </p>
                        <svg viewBox="0 0 400 140" className="mt-3 w-full">
                          <defs>
                            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                              <stop offset="0" stopColor="#12A2EA" stopOpacity="0.2" />
                              <stop offset="1" stopColor="#12A2EA" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
                              <stop offset="0" stopColor="#1266D2" />
                              <stop offset="1" stopColor="#1DC4EC" />
                            </linearGradient>
                          </defs>
                          <path
                            ref={areaRef}
                            d="M0 110 C 40 100, 70 75, 110 85 S 180 50, 220 58 S 300 25, 340 32 S 380 18, 400 12 L400 140 L0 140 Z"
                            fill="url(#area)"
                            style={{ opacity: 0 }}
                          />
                          <path
                            ref={chartRef}
                            d="M0 110 C 40 100, 70 75, 110 85 S 180 50, 220 58 S 300 25, 340 32 S 380 18, 400 12"
                            pathLength={1}
                            fill="none"
                            stroke="url(#lineGrad)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="1 1"
                            strokeDashoffset="1"
                          />
                        </svg>
                      </B>
                    </div>

                    <B
                      className="rounded-xl"
                      inner="rounded-xl bg-white/[0.03] ring-1 ring-[#2A2D33]"
                    >
                      <div className="flex items-center justify-between px-4 pt-4 pb-2">
                        <span className="text-sm font-semibold">{demo.activityTitle}</span>
                        <span className="text-xs font-medium text-[#1DC4EC]">{demo.activityLink}</span>
                      </div>
                      <ul className="px-2 pb-2">
                        {demo.activity.map((a) => (
                          <li key={a.title} className="flex items-center gap-3 rounded-lg px-2 py-2">
                            <span
                              className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                                a.tone === "green"
                                  ? "bg-emerald-400/10 text-emerald-400"
                                  : a.tone === "amber"
                                    ? "bg-amber-400/10 text-amber-400"
                                    : "bg-[#12A2EA]/15 text-[#1DC4EC]"
                              }`}
                            >
                              <Icon name={a.icon as keyof typeof ICONS} className="size-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium">{a.title}</span>
                              <span className="block truncate text-xs text-[#9A9DA6]">{a.detail}</span>
                            </span>
                            <span className="shrink-0 text-xs text-[#9A9DA6]">{a.time}</span>
                          </li>
                        ))}
                      </ul>
                    </B>
                  </div>
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    background:
                      "linear-gradient(115deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 28%, rgba(255,255,255,0) 45%)",
                  }}
                />

                <div
                  ref={bezelRef}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-20 box-border"
                  style={{ opacity: 0, borderStyle: "solid", borderColor: "#050506", borderWidth: 0 }}
                />
                <div
                  ref={camRef}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#050506] ring-1 ring-[#3A3D45]"
                  style={{ opacity: 0, boxShadow: "inset 0 0 2px 0.5px rgba(80,120,200,0.55)" }}
                />
                <div
                  ref={islandRef}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black"
                  style={{ opacity: 0 }}
                />
              </div>

              <div ref={tabBtnRef} aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: 0 }}>
                <span className="absolute -right-0.5 top-[12%] h-[6%] w-0.5 rounded-r bg-[#3A3D45]" />
                <span className="absolute -right-0.5 top-[20%] h-[6%] w-0.5 rounded-r bg-[#3A3D45]" />
                <span className="absolute -right-0.5 top-[32%] h-[9%] w-0.5 rounded-r bg-[#3A3D45]" />
              </div>

              <div ref={btnRef} aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: 0 }}>
                <span className="absolute -left-0.5 top-[17%] h-[5%] w-0.5 rounded-l bg-[#2A2D33]" />
                <span className="absolute -left-0.5 top-[25%] h-[9%] w-0.5 rounded-l bg-[#2A2D33]" />
                <span className="absolute -left-0.5 top-[36%] h-[9%] w-0.5 rounded-l bg-[#2A2D33]" />
                <span className="absolute -right-0.5 top-[28%] h-[14%] w-0.5 rounded-r bg-[#2A2D33]" />
              </div>

              <div
                ref={rimRef}
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(200,204,214,0.28), 0 0 0 1px rgba(0,0,0,0.9)",
                }}
              />

              <div
                ref={frameWireRef}
                className="absolute inset-0 rounded-xl border border-[#2A2D33]"
                style={{ opacity: 0 }}
              />
            </div>
          </div>
        </div>

        <AtmosphereFront rootRef={rootRef} />

        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-x-0 top-[34%] z-10 px-5 text-center will-change-transform"
        >
          <h1
            className={`bini-title ${display} text-[clamp(1.375rem,4.2vw,3.75rem)] font-semibold leading-[1.2] tracking-[0.02em] bg-linear-to-b from-white via-[#D8DAE0] to-[#A3A6B0] bg-clip-text text-transparent`}
          >
            {build.heading}
          </h1>
          <p
            className={`bini-sub ${sub} ${metal} mx-auto mt-5 max-w-lg text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug tracking-[0.04em]`}
          >
            {build.sub}
          </p>
        </div>

        <div aria-hidden className="pointer-events-none absolute bottom-6 left-[4vw] z-14">
          {WORDS.map((wd, i) => (
            <div
              key={wd.text}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className={`${display} absolute bottom-0 left-0 text-[clamp(2rem,6vw,5rem)] leading-none font-semibold tracking-[0.04em] uppercase will-change-transform`}
              style={{ opacity: 0, color: "transparent", WebkitTextStroke: "1px rgba(163,166,176,0.35)" }}
            >
              {wd.text}
            </div>
          ))}
        </div>

        <div aria-hidden className="bini-open pointer-events-none absolute inset-0 z-20 bg-black" />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .blk { position: relative; }
            .blk > .real {
              height: 100%;
              border-radius: inherit;
              opacity: var(--f, 0);
              transform: translate3d(0, calc((1 - var(--f, 0)) * 10px), 0);
            }
            .blk > .wire,
            .blk > .skel {
              position: absolute;
              inset: 0;
              pointer-events: none;
              border-radius: inherit;
            }
            .blk > .wire {
              border: calc(1px / var(--k, 1)) solid rgba(161, 174, 216, 0.75);
              opacity: calc(var(--w, 0) * (1 - var(--f, 0)));
              clip-path: inset(0 calc((1 - var(--w, 0)) * 100%) 0 0);
            }
            .blk > .skel {
              opacity: calc(var(--s, 0) * (1 - var(--f, 0)));
              background: linear-gradient(90deg, rgba(216,218,224,0.09) 25%, rgba(216,218,224,0.18) 50%, rgba(216,218,224,0.09) 75%) 0 0 / 200% 100%;
              box-shadow: inset 0 0 0 calc(1px / var(--k, 1)) rgba(163,166,176,0.28);
              animation: bini-shimmer 1.8s linear infinite;
            }

            @keyframes bini-shimmer {
              from { background-position: 200% 0; }
              to   { background-position: -200% 0; }
            }
            @keyframes bini-title-in {
              from { opacity: 0; letter-spacing: 0.45em; filter: blur(14px); }
              to   { opacity: 1; letter-spacing: 0.02em; filter: blur(0); }
            }
            @keyframes bini-fade-up {
              from { opacity: 0; transform: translate3d(0, 12px, 0); }
              to   { opacity: 1; transform: none; }
            }
            @keyframes bini-open {
              from { opacity: 1; }
              to   { opacity: 0; }
            }
            .bini-title { animation: bini-title-in 2.2s cubic-bezier(0.2, 0.7, 0.1, 1) 0.4s both; }
            .bini-sub   { animation: bini-fade-up 1.2s cubic-bezier(0.2, 0.7, 0.1, 1) 1.1s both; }
            .bini-open  { animation: bini-open 1.8s ease-out 0.1s both; }

            @media (prefers-reduced-motion: reduce) {
              .blk > .skel,
              .bini-title,
              .bini-sub { animation: none; }
              .bini-open { animation: none; opacity: 0; }
            }
          `,
        }}
      />
    </section>
  );
}