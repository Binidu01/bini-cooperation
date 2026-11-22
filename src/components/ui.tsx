import { useEffect, useRef, type ReactNode } from "react";

export const display = "font-display";
export const sub = "font-sub font-medium";
export const metal = "bg-linear-to-b from-[#ECEDF1] to-[#8E9199] bg-clip-text text-transparent";

export const ICONS: Record<string, string> = {
  logo: "M12 3 3 8l9 5 9-5z|M3 13l9 5 9-5",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9z",
  layout: "M3 5h18v14H3z|M3 10h18|M9 10v9",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8|M22 21v-2a4 4 0 0 0-3-3.9|M16 3.1a4 4 0 0 1 0 7.8",
  up: "M7 17 17 7|M8 7h9v9",
  cart: "M3 4h2l2.4 11h10.2l2-8H6.5|M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2|M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
  box: "M21 8l-9-5-9 5v8l9 5 9-5z|M3 8l9 5 9-5|M12 13v8",
  alert: "M12 3 2 20h20z|M12 10v4|M12 17.5v.01",
  truck: "M3 6h11v10H3z|M14 10h4l3 3v3h-7|M7 19a2 2 0 1 0 0-.01|M17 19a2 2 0 1 0 0-.01",
  check: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0|M8 12l3 3 5-6",
  clock: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0|M12 7v5l3 2",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2z|M9 8h6|M9 12h6",
  arrow: "M5 12h14|M13 6l6 6-6 6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
};

export function Icon({ name, className = "size-4" }: { name: keyof typeof ICONS; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {ICONS[name].split("|").map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`bini-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}