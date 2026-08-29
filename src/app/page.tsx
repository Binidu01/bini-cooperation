import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Header, Footer } from '../components/navbar';

function setMeta(nameOrProp: string, content: string, attr: 'name' | 'property' = 'name') {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${nameOrProp}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, nameOrProp);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function Seo() {
  useEffect(() => {
    document.title = 'Bini Cooperations — Software Engineering & Digital Products';
    setMeta(
      'description',
      'Bini Cooperations builds custom software, digital products, business systems, and developer technologies for modern businesses.'
    );
    setMeta('og:title', 'Bini Cooperations — Software Engineering & Digital Products', 'property');
    setMeta(
      'og:description',
      'Bini Cooperations builds custom software, digital products, business systems, and developer technologies for modern businesses.',
      'property'
    );
    setMeta('og:type', 'website', 'property');
  }, []);
  return null;
}

const chromeText = 'bg-gradient-to-b from-white via-[#D9DCE1] to-[#9BA0A8] bg-clip-text text-transparent';

interface MetallicSectionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  id?: string;
}

const MetallicSection: React.FC<MetallicSectionProps> = ({
  children,
  className = '',
  intensity = 'medium',
  id,
}) => {
  const intensityMap = {
    light: 'from-[#080808] via-[#12161E] to-[#080808]',
    medium: 'from-[#050505] via-[#1A1E2A] to-[#050505]',
    strong: 'from-[#000000] via-[#20242F] to-[#000000]',
  };

  return (
    <div id={id} className={`relative overflow-hidden ${className}`}>
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${intensityMap[intensity]}`}>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(199,203,209,0.15) 25%, rgba(217,220,225,0.25) 50%, rgba(155,160,168,0.15) 75%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 6s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(217,220,225,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(199,203,209,0.2) 0%, transparent 50%)',
            animation: 'metallicPulse 4s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(199,203,209,0.1) 30%, rgba(217,220,225,0.15) 60%, rgba(155,160,168,0.05) 100%)',
            backgroundSize: '300% 300%',
            animation: 'chromeShift 8s ease-in-out infinite',
          }}
        />
      </div>
      
      <div className="absolute inset-0 -z-5 pointer-events-none border border-[#2B3038]/30" />
      
      {children}
    </div>
  );
};

const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <MetallicSection
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20"
      intensity="strong"
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1400 800" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="heroBlue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#008CFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -50 640 L 300 640 L 380 560 L 700 560"
          stroke="url(#heroBlue)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
        />
      </svg>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center z-20">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.12] tracking-tight text-balance">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, x: -36, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className={`inline-block mr-[0.3em] ${chromeText}`}
          >
            We build
          </motion.span>
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease, delay: 0.28 }}
            className="inline-block text-[#0080FF]"
          >
            software
          </motion.span>
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, x: 36, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease, delay: 0.46 }}
            className={`inline-block ml-[0.3em] ${chromeText}`}
          >
            that moves businesses forward.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68 }}
          className="text-[#D9DCE1] text-lg max-w-2xl mx-auto leading-relaxed mt-7 font-sans"
        >
          Bini Cooperations builds modern software and digital solutions that help turn complex business challenges into reliable
          technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-11"
        >
          <a
            href="#services"
            className="group relative inline-flex items-center gap-2 text-[#E8E9EB] hover:text-white px-7 py-3.5 rounded-md font-medium font-sans border border-[#2B3038] hover:border-[#0066FF] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_30px_-8px_rgba(0,102,255,0.3)] overflow-hidden backdrop-blur-sm bg-black/30"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#0066FF]/0 via-[#0066FF]/5 to-[#0066FF]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative z-10 flex items-center gap-2">
              Explore What We Build
              <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">→</span>
            </span>
          </a>
        </motion.div>
      </div>
    </MetallicSection>
  );
};

const Intro: React.FC = () => (
  <section className="py-28 bg-black border-t border-[#16181C]">
    <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
        <h2 className={`font-display text-3xl sm:text-4xl leading-tight ${chromeText}`}>Technology built around real problems.</h2>
        <p className="text-[#9BA0A8] text-base leading-relaxed mt-6 font-sans max-w-xl mx-auto">
          We believe software should make complex things simpler. Bini Cooperations combines product thinking, engineering
          discipline, and modern technology to create digital solutions designed around real-world needs.
        </p>

        <div className="flex items-center justify-center gap-3 mt-10" aria-hidden="true">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#0066FF] to-transparent origin-right"
          />
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35, type: 'spring', stiffness: 300, damping: 15 }}
            className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"
          />
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#0066FF] to-transparent origin-left"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

const SERVICES = [
  {
    n: '01',
    title: 'Custom Software',
    description: 'Purpose-built software designed around specific business requirements.',
    icon: (
      <>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.4-3.4a6 6 0 0 1-7.9 7.9L6.3 20.7a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9L14.7 6.3Z" />
      </>
    ),
  },
  {
    n: '02',
    title: 'Web Applications',
    description: 'Modern applications designed for performance, usability, and scalability.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 0 5 4 5 9s-2 9-5 9-5-4-5-9 2-9 5-9Z" />
      </>
    ),
  },
  {
    n: '03',
    title: 'Business Systems',
    description: 'Digital systems that simplify workflows and help businesses operate more efficiently.',
    icon: (
      <>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M8.2 7.3 10.3 16 M15.8 7.3 13.7 16 M8.3 6h7.4" />
      </>
    ),
  },
  {
    n: '04',
    title: 'Digital Products',
    description: 'Software products designed, engineered, and prepared for real-world use.',
    icon: (
      <>
        <path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7V8Z" />
        <path d="M3.3 7 12 12l8.7-5 M12 12v10" />
      </>
    ),
  },
  {
    n: '05',
    title: 'Product Design',
    description: 'Thoughtful user experiences designed around users and business objectives.',
    icon: (
      <>
        <path d="M12 19 19 12l3 3-7 7-3-3Z" />
        <path d="M18 13 16.5 5.5 2 2l3.5 14.5L13 18l5-5Z" />
        <path d="M2 2l7.6 7.6" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
  },
  {
    n: '06',
    title: 'Software Engineering',
    description: 'Architecture, development, integration, optimization, testing, and technical implementation.',
    icon: <path d="M7 8L3 12L7 16M17 8L21 12L17 16M14 5L10 19" />,
  },
];

interface ServiceRowProps {
  service: (typeof SERVICES)[number];
  index: number;
  total: number;
  spineProgress: ReturnType<typeof useSpring>;
  shouldReduceMotion: boolean;
}

const ServiceRow: React.FC<ServiceRowProps> = ({ service, index, total, spineProgress, shouldReduceMotion }) => {
  const threshold = index / total;
  const rangeStart = Math.max(threshold - 0.05, 0);
  const nodeScale = useTransform(spineProgress, [rangeStart, threshold], [0.4, 1]);
  const nodeGlow = useTransform(spineProgress, [rangeStart, threshold], [0, 1]);
  const contentOpacity = useTransform(spineProgress, [rangeStart, threshold], [0, 1]);
  const contentY = useTransform(spineProgress, [rangeStart, threshold], [24, 0]);
  const underlineScale = useTransform(spineProgress, [threshold, Math.min(threshold + 0.03, 1)], [0, 1]);
  const isLast = index === total - 1;

  return (
    <div className="relative flex gap-6 sm:gap-10 pb-16 last:pb-0">
      <div className="relative shrink-0 flex flex-col items-center">
        <motion.div
          style={{ scale: shouldReduceMotion ? 1 : nodeScale }}
          className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black border-2 flex items-center justify-center"
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: isLast ? '#008CFF' : '#0066FF',
              opacity: shouldReduceMotion ? 1 : nodeGlow,
            }}
          />
          <div className="absolute inset-0 rounded-full border-2 border-[#20242A]" />
          <span className="font-mono text-xs text-[#C7CBD1] relative z-10">{service.n}</span>
        </motion.div>
      </div>

      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : contentOpacity,
          y: shouldReduceMotion ? 0 : contentY,
        }}
        className="flex-1 pt-1 sm:pt-2"
      >
        <div className="flex items-start gap-4 sm:gap-5">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#0080FF] shrink-0 mt-1"
            aria-hidden="true"
          >
            {service.icon}
          </svg>
          <div>
            <h3 className="font-display text-xl sm:text-2xl text-white">{service.title}</h3>
            <motion.span
              style={{ scaleX: shouldReduceMotion ? 1 : underlineScale }}
              className="block h-px w-12 bg-[#0066FF] origin-left my-3"
              aria-hidden="true"
            />
            <p className="text-[#8A8F99] text-sm sm:text-base leading-relaxed font-sans max-w-lg">{service.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Services: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 60%'],
  });
  const spineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 });
  const spineScaleY = useTransform(spineProgress, [0, 1], [0, 1]);

  return (
    <section id="services" ref={sectionRef} className="py-28 bg-black border-t border-[#16181C]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-20 max-w-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="text-[#5A5F68] text-xs font-mono tracking-widest mb-3">SERVICES</div>
          <h2 className={`font-display text-3xl sm:text-4xl leading-tight ${chromeText}`}>What we build</h2>
          <p className="text-[#8A8F99] text-base mt-4 font-sans">From business software to digital products, we turn ideas and challenges into practical technology.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[22px] sm:left-[24px] top-[22px] sm:top-[24px] bottom-[22px] sm:bottom-[24px] w-px bg-[#16181C]" aria-hidden="true" />
          <motion.div
            className="absolute left-[22px] sm:left-[24px] top-[22px] sm:top-[24px] bottom-[22px] sm:bottom-[24px] w-px origin-top bg-gradient-to-b from-[#0066FF] to-[#008CFF]"
            style={{ scaleY: shouldReduceMotion ? 1 : spineScaleY }}
            aria-hidden="true"
          />

          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.n}
              service={service}
              index={i}
              total={SERVICES.length}
              spineProgress={spineProgress}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const SOLUTIONS = [
  { title: 'Business Automation', description: 'Reduce repetitive work and simplify operations.' },
  { title: 'Internal Platforms', description: 'Give teams better tools for everyday work.' },
  { title: 'Customer Platforms', description: 'Create modern digital experiences for customers.' },
  { title: 'Custom Systems', description: 'Build technology around unique business requirements.' },
  { title: 'Digital Transformation', description: 'Modernize outdated workflows and technology.' },
];

const Solutions: React.FC = () => (
  <section id="solutions" className="py-28 bg-black border-t border-[#16181C]">
    <div className="max-w-5xl mx-auto px-6 lg:px-8">
      <motion.div className="mb-16 max-w-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="text-[#5A5F68] text-xs font-mono tracking-widest mb-3">SOLUTIONS</div>
        <h2 className={`font-display text-3xl sm:text-4xl leading-tight ${chromeText}`}>Technology with a purpose.</h2>
        <p className="text-[#8A8F99] text-base mt-4 font-sans">
          Bini Cooperations doesn't build software for the sake of building software — every solution starts from a specific
          operational need.
        </p>
      </motion.div>

      <div className="border-t border-[#16181C]">
        {SOLUTIONS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 py-6 border-b border-[#16181C] hover:border-[#0066FF]/30 transition-colors duration-300"
          >
            <span className="font-mono text-xs text-[#5A5F68] w-10 shrink-0">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-xl text-white sm:w-64 shrink-0">{s.title}</h3>
            <p className="text-[#8A8F99] text-sm font-sans">{s.description}</p>
            <span className="hidden sm:block ml-auto w-6 h-px bg-[#2B3038] group-hover:w-10 group-hover:bg-[#0066FF] transition-all duration-300" aria-hidden="true" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================
// FLYWHEEL DIAGRAM — FINAL FIXED VERSION
// ============================================

const FLYWHEEL_STAGES = [
  {
    words: ['Real', 'Projects'],
  },
  {
    words: ['Production', 'Challenges'],
  },
  {
    words: ['Lessons', 'Learned'],
  },
  {
    words: ['Bini.js', 'Improves'],
  },
];

const FLYWHEEL_POINTS = [
  { x: 350, y: 125, labelAnchor: 'above' as const },
  { x: 535, y: 310, labelAnchor: 'right' as const },
  { x: 350, y: 495, labelAnchor: 'below' as const },
  { x: 165, y: 310, labelAnchor: 'left' as const },
];

const FlywheelDiagram: React.FC<{ shouldReduceMotion: boolean }> = ({ shouldReduceMotion }) => {
  const [reached, setReached] = useState<boolean[]>(() => FLYWHEEL_STAGES.map((_, i) => i === 0));

  const arcs = FLYWHEEL_POINTS.map((p, i) => {
    const next = FLYWHEEL_POINTS[(i + 1) % FLYWHEEL_POINTS.length];
    return { d: `M${p.x},${p.y} A185,185 0 0,1 ${next.x},${next.y}`, toIndex: (i + 1) % FLYWHEEL_POINTS.length };
  });

  return (
    <svg viewBox="0 0 700 620" className="w-full h-auto max-w-2xl mx-auto" aria-hidden="true">
      {/* PNG Logo Only — No Circle, No Border */}
      <image
        href="/bini.png"
        x="290"
        y="250"
        width="120"
        height="120"
        preserveAspectRatio="xMidYMid slice"
      />

      {/* Arcs */}
      {arcs.map((arc, i) => (
        <motion.path
          key={i}
          d={arc.d}
          stroke="#0066FF"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: 0.2 + i * 0.35, ease: 'easeOut' }}
          onAnimationComplete={() =>
            setReached((prev) => {
              if (prev[arc.toIndex]) return prev;
              const next = [...prev];
              next[arc.toIndex] = true;
              return next;
            })
          }
          markerEnd={`url(#flywheelArrow)`}
        />
      ))}

      <defs>
        <marker id="flywheelArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" fill="#0066FF" />
        </marker>
      </defs>

      {/* Nodes */}
      {FLYWHEEL_POINTS.map((p, i) => {
        const lit = shouldReduceMotion || reached[i];
        const stage = FLYWHEEL_STAGES[i];
        const isAbove = p.labelAnchor === 'above';
        const isLeft = p.labelAnchor === 'left';
        const isRight = p.labelAnchor === 'right';
        const isBelow = p.labelAnchor === 'below';

        let labelX = p.x;
        let labelY = p.y;
        let textAnchor: 'middle' | 'start' | 'end' = 'middle';

        if (isAbove) {
          labelY = p.y - 50;
          textAnchor = 'middle';
        } else if (isBelow) {
          labelY = p.y + 44;
          textAnchor = 'middle';
        } else if (isLeft) {
          labelX = p.x - 30;
          labelY = p.y -5;
          textAnchor = 'end';
        } else if (isRight) {
          labelX = p.x + 30;
          labelY = p.y - 5;
          textAnchor = 'start';
        }

        const line2Y = labelY + 20;

        return (
          <motion.g
            key={stage.words.join(' ')}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={lit ? { opacity: 1, scale: 1 } : {}}
            whileInView={shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 320, damping: 18 }}
          >
            {/* Node Circle */}
            <circle cx={p.x} cy={p.y} r="21" fill="#0A0A0C" stroke={lit ? '#008CFF' : '#2B3038'} strokeWidth="2.5" style={{ transition: 'stroke 0.3s ease' }} />

            {/* Node Number */}
            <text
              x={p.x}
              y={p.y + 7}
              textAnchor="middle"
              fill={lit ? '#C7CBD1' : '#5A5F68'}
              fontSize="20"
              fontFamily="var(--font-mono, monospace)"
              style={{ transition: 'fill 0.3s ease' }}
            >
              {i + 1}
            </text>

            {/* Label Line 1 */}
            <text
              x={labelX}
              y={labelY}
              textAnchor={textAnchor}
              fill={lit ? '#C7CBD1' : '#5A5F68'}
              fontSize="18"
              fontFamily="var(--font-sans, sans-serif)"
              style={{ transition: 'fill 0.3s ease' }}
            >
              {stage.words[0]}
            </text>

            {/* Label Line 2 */}
            <text
              x={labelX}
              y={line2Y}
              textAnchor={textAnchor}
              fill={lit ? '#C7CBD1' : '#5A5F68'}
              fontSize="18"
              fontFamily="var(--font-sans, sans-serif)"
              style={{ transition: 'fill 0.3s ease' }}
            >
              {stage.words[1]}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
};

const Products: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MetallicSection
      id="products"
      className="relative py-28 overflow-hidden"
      intensity="medium"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,140,255,0.9) 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 z-20">
        <div className="text-center mb-16">
          <div className="text-[#0080FF] text-xs font-mono tracking-widest mb-3">
            BUILDING TECHNOLOGY OF OUR OWN
          </div>
          <h2 className={`font-display text-3xl sm:text-4xl leading-tight ${chromeText}`}>
            Building technology of our own.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[#0080FF] text-xs font-mono tracking-widest mb-4">OPEN SOURCE</div>
            <h3 className="font-display text-3xl text-white leading-tight">Bini.js</h3>
            <p className="font-display text-lg text-[#C7CBD1] mt-3">
              A React framework for building and shipping modern applications.
            </p>

            <div className="mt-6 space-y-4">
              <p className="text-[#D9DCE1] text-base leading-relaxed font-sans">
                Bini.js isn't designed in a vacuum. It's shaped by real client work — every production problem we hit becomes a lesson, and every lesson makes the framework better for the next project.
              </p>
              <p className="text-[#9BA0A8] text-base leading-relaxed font-sans">
                We don't build software for the sake of building software. We build because every project teaches us something, and every lesson makes the next project better.
              </p>
            </div>

            <a
              href="https://bini.js.org/"
              className="group relative inline-flex items-center gap-2 bg-black hover:bg-[#0A0A0C] text-white px-6 py-3 rounded-md font-medium font-sans border border-[#2B3038] hover:border-[#0066FF] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_30px_-8px_rgba(0,102,255,0.3)] overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#0066FF]/0 via-[#0066FF]/5 to-[#0066FF]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10 flex items-center gap-2">
                Explore Bini.js
                <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">→</span>
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center items-center"
          >
            <FlywheelDiagram shouldReduceMotion={!!shouldReduceMotion} />
          </motion.div>
        </div>
      </div>
    </MetallicSection>
  );
};

const Vision: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section id="about" className="relative py-32 bg-black border-t border-[#16181C] overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="text-[#5A5F68] text-xs font-mono tracking-widest mb-4">VISION</div>
          <h2 className={`font-display text-3xl sm:text-4xl leading-tight text-balance ${chromeText}`}>We're building for the long term.</h2>
          <p className="text-[#9BA0A8] text-base leading-relaxed mt-6 max-w-xl mx-auto font-sans">
            Bini Cooperations is an early-stage technology company with a long-term ambition: build useful software, create
            meaningful products, and develop technology that can grow far beyond where we start.
          </p>
        </motion.div>

        <div className="relative mt-16 h-px w-full bg-[#16181C] overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute inset-y-0 left-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #0066FF, #008CFF, transparent)' }}
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </section>
  );
};

const PRINCIPLES = [
  {
    n: '01',
    title: 'Purpose',
    detail: 'Technology should solve a real problem.',
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    n: '02',
    title: 'Precision',
    detail: 'Good software is designed intentionally.',
    icon: (
      <>
        <path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21" />
        <circle cx="12" cy="12" r="5.5" />
      </>
    ),
  },
  {
    n: '03',
    title: 'Reliability',
    detail: 'Production software needs to be dependable.',
    icon: (
      <>
        <path d="M12 3.5 19.5 6.5V11.5C19.5 16 16.5 19.7 12 21C7.5 19.7 4.5 16 4.5 11.5V6.5L12 3.5Z" />
        <path d="M9 12l2 2 4-4.5" />
      </>
    ),
  },
  {
    n: '04',
    title: 'Evolution',
    detail: 'Systems should be able to grow and change.',
    icon: (
      <>
        <path d="M3 20L8 15L12 18L20 10" />
        <path d="M20 10V15" />
        <path d="M20 10H15" />
      </>
    ),
  },
];

const Principles: React.FC = () => (
  <section className="py-28 bg-black border-t border-[#16181C]">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <motion.div className="mb-16 max-w-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="text-[#5A5F68] text-xs font-mono tracking-widest mb-3">PRINCIPLES</div>
        <h2 className={`font-display text-3xl sm:text-4xl leading-tight ${chromeText}`}>How we think about software.</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRINCIPLES.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="group relative rounded-lg border border-[#16181C] hover:border-[#2B3038] bg-[#050505] p-7 transition-colors duration-300 overflow-hidden"
          >
            <span className="absolute -right-2 -top-4 font-display text-7xl text-[#0E1015] select-none" aria-hidden="true">
              {p.n}
            </span>
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative text-[#0080FF] mb-5"
              aria-hidden="true"
            >
              {p.icon}
            </svg>
            <h3 className="relative font-display text-xl text-white">{p.title}</h3>
            <span className="relative block h-px w-8 bg-[#2B3038] group-hover:w-full group-hover:bg-[#0066FF] transition-all duration-500 my-3" aria-hidden="true" />
            <p className="relative text-[#8A8F99] text-sm leading-relaxed font-sans">{p.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    detail: 'Understand the business, users, requirements, and goals.',
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M20 20l-4.8-4.8" />
      </>
    ),
  },
  {
    n: '02',
    title: 'Design',
    detail: 'Define the product experience and technical architecture.',
    icon: (
      <>
        <path d="M11 19 18 12l3 3-7 7-3-3Z" />
        <path d="M16.5 13.5 15 6 3 3l3 12 7.5 1.5Z" />
        <path d="M3 3l6.6 6.6" />
      </>
    ),
  },
  {
    n: '03',
    title: 'Build',
    detail: 'Develop, test, refine, and validate the software.',
    icon: (
      <>
        <path d="M6 3v6M3 6h6" />
        <path d="M13.7 8.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.4-3.4a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.4 3.4Z" />
      </>
    ),
  },
  {
    n: '04',
    title: 'Launch',
    detail: 'Deploy the product and prepare it for continued improvement.',
    icon: (
      <>
        <path d="M12 2c2.5 2 4 5.5 4 9 0 2-1 4-2 5l-2 2-2-2c-1-1-2-3-2-5 0-3.5 1.5-7 4-9Z" />
        <path d="M9 15l-2.5 2.5c-.5.5-.5 2.5-.5 2.5s2 0 2.5-.5L11 17" />
        <path d="M15 15l2.5 2.5c.5.5.5 2.5.5 2.5s-2 0-2.5-.5L13 17" />
        <circle cx="12" cy="9" r="1.4" />
      </>
    ),
  },
];

interface ProcessNodeProps {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
  lineProgress: ReturnType<typeof useSpring>;
  shouldReduceMotion: boolean;
}

const ProcessNode: React.FC<ProcessNodeProps> = ({ step, index, total, lineProgress, shouldReduceMotion }) => {
  const stepThreshold = index / (total - 1);
  const rangeStart = Math.max(stepThreshold - 0.06, 0);
  const scale = useTransform(lineProgress, [rangeStart, stepThreshold], [0.6, 1]);
  const ringOpacity = useTransform(lineProgress, [rangeStart, stepThreshold], [0.3, 1]);
  const iconOpacity = useTransform(lineProgress, [rangeStart, stepThreshold], [0.35, 1]);
  const contentOpacity = useTransform(lineProgress, [rangeStart, stepThreshold], [0, 1]);
  const contentY = useTransform(lineProgress, [rangeStart, stepThreshold], [16, 0]);

  return (
    <div>
      <motion.div
        style={{ scale: shouldReduceMotion ? 1 : scale }}
        className="relative z-10 w-9 h-9 rounded-full border-2 border-[#20242A] flex items-center justify-center mb-5 bg-black"
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: '#0066FF', opacity: shouldReduceMotion ? 1 : ringOpacity }}
        />
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative text-[#C7CBD1]"
          style={{ opacity: shouldReduceMotion ? 1 : iconOpacity }}
          aria-hidden="true"
        >
          {step.icon}
        </motion.svg>
      </motion.div>
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : contentOpacity,
          y: shouldReduceMotion ? 0 : contentY,
        }}
      >
        <div className="font-mono text-xs text-[#5A5F68] mb-1">{step.n}</div>
        <h3 className="font-display text-lg text-white">{step.title}</h3>
        <p className="text-[#8A8F99] text-sm mt-1.5 leading-relaxed font-sans">{step.detail}</p>
      </motion.div>
    </div>
  );
};

const ProcessNodeMobile: React.FC<ProcessNodeProps> = ({ step, index, total, lineProgress, shouldReduceMotion }) => {
  const stepThreshold = index / (total - 1);
  const rangeStart = Math.max(stepThreshold - 0.06, 0);
  const ringOpacity = useTransform(lineProgress, [rangeStart, stepThreshold], [0.3, 1]);
  const iconOpacity = useTransform(lineProgress, [rangeStart, stepThreshold], [0.35, 1]);
  const contentOpacity = useTransform(lineProgress, [rangeStart, stepThreshold], [0, 1]);
  const contentX = useTransform(lineProgress, [rangeStart, stepThreshold], [-12, 0]);
  const isLast = index === total - 1;

  return (
    <div className="relative">
      <div className="absolute -left-[38px] top-0 w-9 h-9 rounded-full border-2 border-[#20242A] flex items-center justify-center bg-black">
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: isLast ? '#008CFF' : '#0066FF', opacity: shouldReduceMotion ? 1 : ringOpacity }}
        />
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative text-[#C7CBD1]"
          style={{ opacity: shouldReduceMotion ? 1 : iconOpacity }}
          aria-hidden="true"
        >
          {step.icon}
        </motion.svg>
      </div>
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : contentOpacity,
          x: shouldReduceMotion ? 0 : contentX,
        }}
      >
        <div className="font-mono text-xs text-[#5A5F68] mb-1">{step.n}</div>
        <h3 className="font-display text-lg text-white">{step.title}</h3>
        <p className="text-[#8A8F99] text-sm mt-1.5 leading-relaxed font-sans">{step.detail}</p>
      </motion.div>
    </div>
  );
};

const Process: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 55%'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.3 });
  const scaleX = useTransform(lineProgress, [0, 1], [0, 1]);
  const scaleY = useTransform(lineProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="py-28 bg-black border-t border-[#16181C]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-16 max-w-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="text-[#5A5F68] text-xs font-mono tracking-widest mb-3">PROCESS</div>
          <h2 className={`font-display text-3xl sm:text-4xl leading-tight ${chromeText}`}>From idea to production.</h2>
        </motion.div>

        <div className="hidden md:block relative">
          <div className="absolute top-[13px] left-0 right-0 h-px bg-[#16181C]" />
          <motion.div
            className="absolute top-[13px] left-0 right-0 h-px bg-gradient-to-r from-[#0066FF] via-[#0066FF] to-[#008CFF] origin-left"
            style={{ scaleX: shouldReduceMotion ? 1 : scaleX }}
          />
          <div className="grid grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <ProcessNode
                key={step.n}
                step={step}
                index={i}
                total={STEPS.length}
                lineProgress={lineProgress}
                shouldReduceMotion={!!shouldReduceMotion}
              />
            ))}
          </div>
        </div>

        <div className="md:hidden relative pl-8">
          <div className="absolute top-1 bottom-1 left-[13px] w-px bg-[#16181C]" />
          <motion.div
            className="absolute top-1 left-[13px] w-px bg-gradient-to-b from-[#0066FF] via-[#0066FF] to-[#008CFF] origin-top"
            style={{ scaleY: shouldReduceMotion ? 1 : scaleY, bottom: '4px' }}
          />
          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <ProcessNodeMobile
                key={step.n}
                step={step}
                index={i}
                total={STEPS.length}
                lineProgress={lineProgress}
                shouldReduceMotion={!!shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WHY = [
  {
    title: 'Built for the problem',
    detail: 'We start with understanding the problem, not choosing a technology first.',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </>
    ),
  },
  {
    title: 'Designed to last',
    detail: 'We care about maintainability, reliability, and future growth.',
    icon: <path d="M12 3.5 19.5 6.5V11.5C19.5 16 16.5 19.7 12 21C7.5 19.7 4.5 16 4.5 11.5V6.5L12 3.5Z" />,
  },
  {
    title: 'Modern by default',
    detail: 'We use modern tools and engineering practices where they provide real value.',
    icon: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  },
  {
    title: 'Focused on outcomes',
    detail: 'Software should create practical value for the people using it.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12.5l2.3 2.3 4.7-5.1" />
      </>
    ),
  },
];

const WhyUs: React.FC = () => (
  <section className="py-28 bg-black border-t border-[#16181C]">
    <div className="max-w-5xl mx-auto px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`font-display text-3xl sm:text-4xl leading-tight max-w-2xl text-balance mb-16 ${chromeText}`}
      >
        Built with engineering discipline.
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {WHY.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="group flex gap-5 rounded-lg border border-[#16181C] hover:border-[#2B3038] bg-[#050505] p-7 transition-colors duration-300"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#0080FF] shrink-0 mt-0.5"
              aria-hidden="true"
            >
              {p.icon}
            </svg>
            <div>
              <h3 className="font-display text-lg text-white">{p.title}</h3>
              <span className="block h-px w-8 bg-[#2B3038] group-hover:w-16 group-hover:bg-[#0066FF] transition-all duration-500 my-2.5" aria-hidden="true" />
              <p className="text-[#8A8F99] text-sm leading-relaxed font-sans">{p.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact: React.FC = () => (
  <MetallicSection
    id="contact"
    className="relative py-32 overflow-hidden"
    intensity="strong"
  >
    <div className="relative max-w-2xl mx-auto px-6 lg:px-8 text-center z-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className={`font-display text-4xl leading-tight text-balance ${chromeText}`}>Have a problem worth solving?</h2>
        <p className="text-[#D9DCE1] text-lg mt-4 mb-10 font-sans">
          Tell us what you're building, what needs to improve, or where you want to go next.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:rbinidu@gmail.com"
            className="group relative inline-flex items-center gap-2 text-[#C7CBD1] hover:text-white px-8 py-3.5 rounded-md font-medium font-sans border border-[#2B3038] hover:border-[#0066FF] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_30px_-8px_rgba(0,102,255,0.3)] overflow-hidden backdrop-blur-sm bg-black/30"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#0066FF]/0 via-[#0066FF]/5 to-[#0066FF]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative z-10 flex items-center gap-2">
              Contact Bini Cooperations
            </span>
          </a>
        </div>
      </motion.div>
    </div>
  </MetallicSection>
);

export default function Home() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes metallicPulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
      }
      @keyframes chromeShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <Seo />
      <main className="min-h-screen bg-black font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-[#0066FF] focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <Header />
        <div id="main-content">
          <Hero />
          <Intro />
          <Services />
          <Solutions />
          <Products />
          <Vision />
          <Principles />
          <Process />
          <WhyUs />
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  );
}