import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

const PLATFORMS = [
  {
    name: 'Google',
    role: 'Intent',
    description: "Capture buyers the moment they're searching.",
    image: '/google.webp',
  },
  {
    name: 'Meta',
    sub: 'Facebook & Instagram',
    role: 'Demand',
    description: 'Build attention, emotion, and retargeting at scale.',
    image: '/meta.webp',
  },
  {
    name: 'TikTok',
    role: 'Discovery',
    description: 'Move products through creator content, video, and live.',
    image: '/tiktok.webp',
  },
  {
    name: 'YouTube',
    role: 'Authority',
    description: 'Long-form storytelling that builds trust over time.',
    image: '/youtube.webp',
  },
  {
    name: 'LinkedIn',
    role: 'B2B Reach',
    description: 'Decision-maker visibility for serious brands.',
    image: '/linkedn.webp',
  },
  {
    name: 'Threads & X',
    role: 'Conversation',
    description: 'Real-time positioning and brand voice.',
    image: '/thread.webp',
  },
  {
    name: 'WhatsApp',
    role: 'Conversion',
    description: 'Close the loop where Malaysian buyers actually transact.',
    image: '/whatsapp.webp',
  },
];

// Total panels = 1 intro + 7 platforms
const TOTAL = PLATFORMS.length + 1;

const PlatformsSection: React.FC = () => {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Lazy-init so the first render already knows whether we're on mobile —
  // avoids a brief desktop pin setup that would otherwise need to be reverted,
  // leaving the wrapper in an inconsistent height/scroll state.
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
  );

  // Keep state in sync if the viewport is resized across the breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const wrapper   = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    let ctx: gsap.Context | null = null;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>('.platform-panel');

        if (isMobile) {
          // Mobile — same "slide-up to reveal" pattern as Selected Work.
          // Pin the section for (panels-1) viewport heights of scroll. Each
          // unit slides one panel up off-screen, revealing the next beneath.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              pin: true,
              anticipatePin: 1,
              scrub: 1,
              start: 'top top',
              end: () => `+=${(panels.length - 1) * window.innerHeight}`,
              invalidateOnRefresh: true,
            },
          });

          panels.forEach((panel, i) => {
            if (i === panels.length - 1) return; // last panel stays
            tl.to(panel, { yPercent: -100, ease: 'power1.inOut', duration: 1 }, i);
          });
        } else {
          // Desktop — horizontal pin scroll
          const scrollTween = gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              pin: true,
              anticipatePin: 1,
              scrub: 1,
              snap: 1 / (panels.length - 1),
              end: () => '+=' + container.offsetWidth,
              invalidateOnRefresh: true,
            },
          });

          panels.forEach((panel) => {
            const els = panel.querySelectorAll<HTMLElement>('.reveal-el');
            if (!els.length) return;
            gsap.fromTo(
              els,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.1,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: 'left 75%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        }
      }, wrapper);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (ctx) ctx.revert();
    };
  }, [isMobile]);

  // On mobile the panels are absolutely stacked so they can slide-up to
  // reveal each other. zIndex must be reversed (Intro on top → WhatsApp at
  // the bottom of the stack) so the chronological order plays out.
  const panelMobileStyle = (i: number): React.CSSProperties =>
    isMobile
      ? {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: TOTAL - i,
          willChange: 'transform',
        }
      : {};

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Top accent rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: ACCENT, opacity: 0.65, zIndex: 100 }} />

      <div
        ref={containerRef}
        style={{
          display: isMobile ? 'block' : 'flex',
          flexDirection: isMobile ? undefined : 'row',
          width: isMobile ? '100%' : `${TOTAL * 100}vw`,
          height: '100vh',
          position: 'relative',
        }}
      >
        {/* ── Panel 0: Intro ── */}
        <div
          className="platform-panel"
          style={{
            width: '100vw',
            height: '100vh',
            flexShrink: 0,
            background: '#0d0d0d',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 8vw',
            textAlign: 'center',
            color: '#fff',
            ...panelMobileStyle(0),
          }}
        >
          <span className="reveal-el" style={{ color: ACCENT, fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '2rem', display: 'block' }}>
            Section 04 — Platforms
          </span>
          <h2 className="reveal-el" style={{ fontSize: 'clamp(2.4rem,5.5vw,7rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.035em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Built for every platform<br />that matters.
          </h2>
          <p className="reveal-el" style={{ fontSize: 'clamp(0.95rem,1.3vw,1.4rem)', lineHeight: 1.7, maxWidth: '52ch', color: 'rgba(255,255,255,0.55)', marginBottom: '3rem' }}>
            We don&apos;t pick platforms by trend. We pick them by where your buyers actually decide. Each platform plays a specific role in the system we build for you.
          </p>
          <div className="reveal-el" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
            <span>Scroll</span>
            <span>{isMobile ? '↓' : '→'}</span>
          </div>
        </div>

        {/* ── Platform panels ── */}
        {PLATFORMS.map((p, pi) => (
          <div
            key={p.name}
            className="platform-panel"
            style={{
              width: '100vw',
              height: '100vh',
              flexShrink: 0,
              background: '#0a0a0a',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: isMobile ? '0 8vw' : '0 10vw',
              color: '#fff',
              position: 'relative',
              ...panelMobileStyle(pi + 1),
            }}
          >
            {/* Text content — on mobile let it span full width since the image sits as a faded backdrop */}
            <div style={{ maxWidth: isMobile ? '100%' : (p.image ? '48%' : '70%'), position: 'relative', zIndex: 1 }}>

              {/* Role — big, left-aligned with name */}
              <div className="reveal-el" style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: ACCENT, fontSize: 'clamp(2rem,3.5vw,4.5rem)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1 }}>
                  {p.role}
                </span>
              </div>

              {/* Platform name — smaller on Google to avoid image overlap */}
              <h3
                className="reveal-el"
                style={{
                  fontSize: p.image ? 'clamp(2.5rem,6vw,7rem)' : 'clamp(4rem,12vw,14rem)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}
              >
                {p.name}
              </h3>

              {/* Sub label */}
              {p.sub && (
                <span className="reveal-el" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>
                  {p.sub}
                </span>
              )}

              {/* Description */}
              <p
                className="reveal-el"
                style={{
                  fontSize: 'clamp(1rem,1.4vw,1.5rem)',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.45)',
                  maxWidth: '44ch',
                }}
              >
                {p.description}
              </p>
            </div>

            {/* Panel image — desktop: full-height right edge. Mobile: faded backdrop so text stays readable. */}
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: '100vh',
                  width: isMobile ? '100vw' : 'auto',
                  maxWidth: 'none',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                  opacity: isMobile ? 0.18 : 1,
                  zIndex: 0,
                }}
              />
            )}

            {/* Panel number */}
            <span style={{
              position: 'absolute',
              bottom: '6vh',
              right: '6vw',
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.15)',
              textTransform: 'uppercase',
              zIndex: 2,
            }}>
              {String(pi + 1).padStart(2, '0')} / {String(PLATFORMS.length).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformsSection;
