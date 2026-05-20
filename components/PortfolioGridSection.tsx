import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

const CARDS = [
  {
    num: '01',
    category: 'Beauty',
    title: 'SugarBomb',
    desc: 'Increased campaign engagement through cinematic short-form content.',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop',
    stats: [
      { value: '3.2×', label: 'Engagement rate' },
      { value: '+180%', label: 'Reach in 60 days' },
    ],
  },
  {
    num: '02',
    category: 'Education',
    title: 'Caliph Academy',
    desc: 'Built a modern digital identity system for parent trust.',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop',
    stats: [
      { value: '2×', label: 'Enrolment inquiries' },
      { value: '94%', label: 'Parent trust score' },
    ],
  },
  {
    num: '03',
    category: 'Hospitality',
    title: 'Suria Cherating',
    desc: 'Elevated resort positioning with immersive storytelling visuals.',
    img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop',
    stats: [
      { value: '+67%', label: 'Direct bookings' },
      { value: '4.9★', label: 'Brand perception' },
    ],
  },
  {
    num: '04',
    category: 'Wellness',
    title: 'Bekam Ar Rayyan',
    desc: 'Repositioned traditional treatment into premium wellness branding.',
    img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop',
    stats: [
      { value: '5×', label: 'Avg monthly revenue' },
      { value: '+320%', label: 'Social following' },
    ],
  },
];

// Pre-reversed array — computed once at module load instead of every render.
// Original index recoverable via `CARDS.length - 1 - reversedIdx`.
const REVERSED_CARDS = [...CARDS].reverse();

const PortfolioGridSection: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let ctx: gsap.Context | null = null;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>('.work-panel');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            start: 'top top',
            end: () => `+=${(CARDS.length - 1) * window.innerHeight}`,
            invalidateOnRefresh: true,
          },
        });

        // Each card slides up to reveal the one beneath it
        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return;
          tl.to(
            panel,
            { yPercent: -100, ease: 'power1.inOut', duration: 1 },
            i // sequential — each takes 1 unit in the timeline
          );
        });
      }, wrapper);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Top rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: ACCENT, opacity: 0.5, zIndex: 20 }} />

      {/* Eyebrow — always visible */}
      <div style={{ position: 'absolute', top: '5vh', left: '8vw', zIndex: 20 }}>
        <p style={{ color: ACCENT, fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
          Selected work
        </p>
      </div>

      {/* Stacked panels — rendered bottom to top so first card sits on top */}
      {REVERSED_CARDS.map((card, reversedIdx) => {
        const i = CARDS.length - 1 - reversedIdx;
        return (
          <div
            key={card.title}
            className="work-panel"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: i + 1,
              overflow: 'hidden',
              color: '#fff',
            }}
          >
            {/* Background image */}
            <img
              src={card.img}
              alt={card.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* Gradient overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.85) 38%, rgba(0,0,0,0.15) 100%)',
            }} />

            {/* Content */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              padding: '0 8vw',
            }}>
              <div style={{ maxWidth: '52%' }}>

                {/* Meta row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <span style={{ color: ACCENT, fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
                    {card.num} / 0{CARDS.length}
                  </span>
                  <span style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.2)' }} />
                  <span style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                    {card.category}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: 'clamp(3rem, 7vw, 9rem)',
                  fontWeight: 900,
                  lineHeight: 0.92,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}>
                  {card.title}
                </h2>

                {/* Desc */}
                <p style={{
                  fontSize: 'clamp(1rem, 1.2vw, 1.3rem)',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.55)',
                  maxWidth: '42ch',
                  marginBottom: '2.5rem',
                }}>
                  {card.desc}
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '3rem' }}>
                  {card.stats.map(s => (
                    <div key={s.label}>
                      <p style={{
                        fontSize: 'clamp(1.6rem, 2.8vw, 3rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        color: ACCENT,
                        marginBottom: '0.3rem',
                      }}>
                        {s.value}
                      </p>
                      <p style={{
                        fontFamily: 'monospace',
                        fontSize: '0.68rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.35)',
                      }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Bottom-right counter */}
            <span style={{
              position: 'absolute',
              bottom: '5vh',
              right: '5vw',
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.15)',
              textTransform: 'uppercase',
            }}>
              {card.num} / 0{CARDS.length}
            </span>

          </div>
        );
      })}
    </div>
  );
};

export default PortfolioGridSection;
