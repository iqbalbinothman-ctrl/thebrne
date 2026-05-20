import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

const LOGOS = [
  'AAMRA', 'Ilham Ilmu', 'Caliph Academy', 'Suria Cherating',
  'Bekam Ar Rayyan', 'EJSHOP', 'SugarBomb', 'Love and Laugh',
  'iHR', 'Nestnec',
];

const COLS = 5; // per row on desktop → 2 rows of 5

const TrustSection: React.FC = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

  // Fit each logo text to fill ~72% of its cell. Was: 10 separate
  // ResizeObservers, each doing read-after-write font sizing, which forced
  // 10 sync layouts on every resize. Now: 1 ResizeObserver on the grid,
  // RAF-batched, with all reads done before any writes (no layout thrash).
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let raf = 0;
    const refit = () => {
      raf = 0;
      const cells = grid.querySelectorAll<HTMLElement>('.logo-cell');
      // Phase 1 — all writes (collapse text to measure intrinsic width).
      const items: { text: HTMLElement; cell: HTMLElement }[] = [];
      cells.forEach((cell) => {
        const text = cell.querySelector<HTMLElement>('.logo-text');
        if (!text) return;
        text.style.fontSize = '10px';
        text.style.width = 'fit-content';
        items.push({ text, cell });
      });
      // Phase 2 — all reads in a row (browser does one layout, not N).
      const measurements = items.map(({ text, cell }) => ({
        text, textW: text.offsetWidth, cellW: cell.offsetWidth,
      }));
      // Phase 3 — all writes back.
      measurements.forEach(({ text, textW, cellW }) => {
        text.style.width = '100%';
        text.style.fontSize = `${10 * (cellW * 0.72 / textW)}px`;
      });
    };

    refit();
    const ro = new ResizeObserver(() => {
      if (raf) return;
      raf = requestAnimationFrame(refit);
    });
    ro.observe(grid);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  // GSAP scroll reveals
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: gsap.Context | null = null;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const st = { toggleActions: 'play none none reverse', invalidateOnRefresh: true };

        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
            scrollTrigger: { trigger: headlineRef.current, start: 'top 75%', ...st } }
        );

        const cells = gridRef.current?.querySelectorAll<HTMLElement>('.logo-cell');
        if (cells) {
          gsap.fromTo(
            cells,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.07, ease: 'power3.out',
              scrollTrigger: { trigger: gridRef.current, start: 'top 78%', ...st } }
          );
        }
      }, section);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white overflow-hidden"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: ACCENT, opacity: 0.5 }} />

      {/* Constrained header copy */}
      <div className="max-w-[1320px] mx-auto px-6" style={{ paddingTop: '14vh', paddingBottom: '10vh' }}>

        <p className="uppercase tracking-[0.3em] mb-6" style={{ fontSize: 12, color: ACCENT }}>
          Trusted by
        </p>

        <h2
          ref={headlineRef}
          className="font-black leading-[0.95] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(2.6rem, 7.4vw, 8.5rem)', maxWidth: '100%' }}
        >
          Trusted by brands across{' '}
          <span style={{
            textDecoration: 'underline',
            textDecorationColor: ACCENT,
            textDecorationThickness: '0.06em',
            textUnderlineOffset: '0.15em',
          }}>
            beauty, wellness, education, hospitality, F&amp;B
          </span>
          , and more.
        </h2>

      </div>

      {/* Logo grid — full width, equal cells */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: '14vh',
        }}
      >
        {LOGOS.map((name) => (
          <div
            key={name}
            className="logo-cell group cursor-pointer"
            style={{
              aspectRatio: '1 / 1',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8%',
              transition: 'background 0.35s ease',
              overflow: 'hidden',
            }}
          >
            <span
              className="logo-text font-black tracking-[-0.03em] leading-none text-center whitespace-nowrap"
              style={{
                transition: 'color 0.35s ease',
                width: '100%',
                textAlign: 'center',
                display: 'block',
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* Hover styles — moved off JS onMouseEnter/Leave (10 elements × 2 handlers
          mutating styles + querySelector) to pure CSS, which the compositor
          handles without main-thread work. */}
      <style>{`
        .logo-cell .logo-text { color: rgba(255,255,255,0.3); }
        .logo-cell:hover { background: rgba(155,225,44,0.05); }
        .logo-cell:hover .logo-text { color: ${ACCENT}; }
      `}</style>

    </section>
  );
};

export default TrustSection;
