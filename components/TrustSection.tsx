import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

// White silhouette logos generated into /public/assets/logos-trust.
// 30 logos -> 5 columns = 6 clean rows on desktop.
const LOGOS = Array.from({ length: 30 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  const row = Math.floor(i / 6) + 1;
  const col = (i % 6) + 1;
  return `/assets/logos-trust/logo_${n}_r${row}c${col}.png`;
});

const COLS = 5; // per row on desktop

const TrustSection: React.FC = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

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
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.05, ease: 'power3.out',
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
        {LOGOS.map((src, i) => (
          <div
            key={i}
            className="logo-cell group"
            style={{
              aspectRatio: '1 / 1',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16%',
              transition: 'background 0.35s ease',
              overflow: 'hidden',
            }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="logo-img"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                transition: 'opacity 0.35s ease',
              }}
            />
          </div>
        ))}
      </div>

      {/* Greyscale logos at reduced opacity, full brightness on hover —
          preserves each logo's actual design while staying tonally consistent. */}
      <style>{`
        .logo-cell .logo-img { opacity: 0.7; }
        .logo-cell:hover { background: rgba(155,225,44,0.05); }
        .logo-cell:hover .logo-img { opacity: 1; }
      `}</style>

    </section>
  );
};

export default TrustSection;
