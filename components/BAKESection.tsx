import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Spline pulls in a ~1MB WebGL runtime; defer it so the hero isn't starved
// of bandwidth while the user is still on screen one.
const Spline = lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

const BAKE_CONTENT: Record<string, { title: string; body: string }> = {
  B: {
    title: 'Be Fun — Never Boring.',
    body: "If we don't enjoy the work, no one else will either. Energy shows up in the output. A boring brief becomes a boring campaign. We refuse to let that happen.",
  },
  A: {
    title: 'Always Think About Others.',
    body: "Care is the unspoken differentiator. We treat your business like it's our own — your deadline is our deadline, your problem is our problem. Full stop.",
  },
  K: {
    title: 'Keep Going Until It Works.',
    body: "Pretty doesn't pay the bills. We build what performs — and we iterate until it does. Shipping something that doesn't work isn't shipping, it's wasting.",
  },
  E: {
    title: 'Explore & Think Differently.',
    body: "We challenge the brief when it needs challenging. That's the work you hired us for. If everyone is doing it, we're already looking somewhere else.",
  },
};

const LETTERS = ['B', 'A', 'K', 'E'] as const;

// Each letter slides in from a different edge
const ENTRANCE_DIR: Record<string, { x: number; y: number }> = {
  B: { x: -220, y: 0 },    // left
  A: { x:  220, y: 0 },    // right
  K: { x: 0, y: -220 },    // top
  E: { x: 0, y:  220 },    // bottom
};

const BAKESection: React.FC = () => {
  const [active, setActive]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [splineReady, setSplineReady] = useState(false);
  // Skip Spline entirely on low-end devices or when the user has requested
  // reduced motion. The 3D scene is ~3MB JS + 9.7MB scene file + a continuous
  // WebGL render loop; a clickable letter grid covers the same UX without it.
  const [useFallback] = useState(() => {
    if (typeof window === 'undefined') return false;
    const dm = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const lowEnd = typeof dm === 'number' && dm < 4;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return lowEnd || reduceMotion;
  });
  const overlayRef            = useRef<HTMLDivElement>(null);
  const panelRef              = useRef<HTMLDivElement>(null);
  const letterRef             = useRef<HTMLParagraphElement>(null);
  const splineWrapRef         = useRef<HTMLDivElement>(null);
  const splineApp             = useRef<any>(null);
  const sectionRef            = useRef<HTMLElement>(null);
  const eyebrowRef            = useRef<HTMLParagraphElement>(null);
  const headRef               = useRef<HTMLHeadingElement>(null);
  const descRef               = useRef<HTMLParagraphElement>(null);
  const hintRef               = useRef<HTMLParagraphElement>(null);

  // Scroll-linked scrub reveals — stagger via the `delay` arg
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: gsap.Context | null = null;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const scrub = (el: Element | null, delay = 0) => {
          if (!el) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: 60 },
            {
              opacity: 1, y: 0,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                end: `top ${38 - delay * 6}%`,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        };

        scrub(eyebrowRef.current);
        scrub(headRef.current, 1);
        scrub(descRef.current, 2);
        scrub(hintRef.current, 3);
        scrub(splineWrapRef.current, 4);
      }, section);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (ctx) ctx.revert();
    };
  }, []);

  // Only mount the Spline runtime once the section approaches the viewport.
  // Loading it eagerly during hero scroll competes for main-thread time.
  // rootMargin tightened from 600 → 200 so we don't pre-fetch a multi-MB
  // bundle while the user is still in the hero.
  useEffect(() => {
    if (useFallback) return;
    const el = splineWrapRef.current;
    if (!el || splineReady) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSplineReady(true);
        io.disconnect();
      }
    }, { rootMargin: '200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [splineReady, useFallback]);

  // Pause Spline when the section leaves the viewport — Spline keeps a
  // 60fps WebGL render loop running otherwise, even with display:none.
  useEffect(() => {
    if (useFallback || loading || !splineApp.current) return;
    const el = splineWrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      const app = splineApp.current as null | { play?: () => void; stop?: () => void };
      if (!app) return;
      if (e.isIntersecting) app.play?.(); else app.stop?.();
    }, { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [loading, useFallback]);

  // Spline canvas eats wheel events — intercept in capture phase and forward to window.
  // Not needed in fallback mode (no canvas to trap wheels).
  useEffect(() => {
    if (useFallback) return;
    const el = splineWrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      window.scrollBy({ top: e.deltaY, left: e.deltaX, behavior: 'instant' as ScrollBehavior });
    };
    el.addEventListener('wheel', onWheel, { capture: true, passive: false });
    return () => el.removeEventListener('wheel', onWheel, { capture: true });
  }, [useFallback]);

  // Keyboard shortcuts — physical B/A/K/E keys open the matching popup, Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'Escape' && active) {
        setActive(null);
        return;
      }
      const letter = e.key.toUpperCase();
      if (LETTERS.includes(letter as any)) {
        setActive(letter);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  // Animate popup in/out + letter shimmer
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    const letter  = letterRef.current;
    if (!overlay || !panel) return;

    if (active) {
      const dir = ENTRANCE_DIR[active] ?? { x: 0, y: 40 };
      gsap.set(overlay, { display: 'flex' });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        panel,
        { opacity: 0, x: dir.x, y: dir.y, scale: 0.94 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' }
      );
      // Chromatic shimmer — slow back-and-forth gradient flow
      if (letter) {
        gsap.killTweensOf(letter);
        gsap.set(letter, { backgroundPosition: '0% 50%' });
        gsap.to(letter, {
          backgroundPosition: '200% 50%',
          duration: 5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    } else {
      gsap.to(overlay, {
        opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      });
      if (letter) gsap.killTweensOf(letter);
    }
  }, [active]);

  const findLetterFromTarget = (target: any): string | undefined => {
    let node = target;
    while (node) {
      const u: string = (node.name ?? '').toUpperCase();
      const letter = LETTERS.find(l => u === `KEY_${l}` || u.endsWith(`_${l}`));
      if (letter) return letter;
      node = node.parent ?? null;
    }
    return undefined;
  };

  const onSplineMouseDown = (e: any) => {
    const letter = findLetterFromTarget(e?.target);
    if (letter) setTimeout(() => setActive(letter), 220);
  };

  const close = () => setActive(null);

  const content = active ? BAKE_CONTENT[active] : null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: ACCENT, opacity: 0.4 }} />

      {/* Section header */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12" style={{ paddingTop: '14vh', paddingBottom: '4vh' }}>

        <p
          ref={eyebrowRef}
          className="uppercase tracking-[0.35em] mb-8"
          style={{ fontSize: 11, color: ACCENT }}
        >
          Section 08 — How We Operate
        </p>

        <h2
          ref={headRef}
          className="font-black tracking-[-0.04em] leading-[0.95]"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 8rem)', marginBottom: '1.5rem' }}
        >
          B-A-K-E.
        </h2>

        <p
          ref={descRef}
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.5rem)',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '52ch',
            marginBottom: '1.5rem',
          }}
        >
          Four principles that shape every decision we make — from the brief to the brand to the final output.
        </p>

      </div>

      <p
        ref={hintRef}
        className="uppercase tracking-[0.3em] text-center font-bold"
        style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', paddingTop: '2vh', paddingBottom: '2vh' }}
      >
        Click a letter — or press B / A / K / E
      </p>

      {/* Spline 3D — the interaction. Low-end devices and prefers-reduced-motion
          users get a static clickable letter grid instead; same keyboard +
          popup UX, zero WebGL cost. */}
      <div ref={splineWrapRef} style={{ width: '100%', height: useFallback ? 'auto' : '100vh', position: 'relative', paddingBottom: '14vh' }}>
        {useFallback ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(1rem, 5vw, 4rem)',
              flexWrap: 'wrap',
              padding: 'clamp(4vh, 8vh, 12vh) 1.5rem',
            }}
          >
            {LETTERS.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setActive(letter)}
                aria-label={`Open the ${letter} principle`}
                style={{
                  background: 'none',
                  border: 'none',
                  color: ACCENT,
                  fontSize: 'clamp(6rem, 16vw, 14rem)',
                  fontWeight: 900,
                  lineHeight: 0.85,
                  letterSpacing: '-0.06em',
                  cursor: 'pointer',
                  padding: 0,
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        ) : (
          <>
            {(loading || !splineReady) && (
              <div
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#000', zIndex: 2,
                }}
              >
                <p style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                  Loading scene...
                </p>
              </div>
            )}
            {splineReady && (
              <Suspense fallback={null}>
                <Spline
                  scene="https://prod.spline.design/omLDSmahOHX6UJX7/scene.splinecode"
                  onLoad={(app) => {
                    splineApp.current = app;
                    setLoading(false);
                    try {
                      const open = (e: any) => {
                        const letter = findLetterFromTarget(e?.target);
                        if (letter) setTimeout(() => setActive(letter), 220);
                      };
                      (app as any).addEventListener?.('mouseDown', open);
                      (app as any).addEventListener?.('keyDown',   open);
                      (app as any).addEventListener?.('keyUp',     open);
                    } catch {}
                  }}
                  onSplineMouseDown={onSplineMouseDown}
                  style={{ width: '100%', height: '100%' }}
                />
              </Suspense>
            )}
          </>
        )}
      </div>

      {/* Popup overlay */}
      <div
        ref={overlayRef}
        style={{
          display: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          alignItems: 'center',
          justifyContent: 'center',
          // Was rgba(0,0,0,0.75) + backdrop-filter: blur(12px) — backdrop-filter
          // samples + blurs every viewport pixel behind it per frame, which
          // tanks FPS on mobile Safari when the modal opens. Solid 0.92 black
          // gives near-identical "lifted out of context" feel with zero
          // compositor cost.
          background: 'rgba(0,0,0,0.92)',
          padding: '24px',
        }}
        onClick={close}
      >
        <div
          ref={panelRef}
          style={{
            background: '#0d0d0d',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 28,
            maxWidth: 620,
            width: '100%',
            padding: 'clamp(40px, 6vw, 72px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 40px 100px -20px rgba(155, 225, 44, 0.18), 0 0 0 1px rgba(155, 225, 44, 0.05) inset',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={close}
            style={{
              position: 'absolute',
              top: 24, right: 24,
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              fontSize: '1.2rem',
              lineHeight: 1,
              padding: 4,
            }}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Big letter — chromatic green/silver */}
          <p
            ref={letterRef}
            style={{
              fontSize: 'clamp(5rem, 14vw, 10rem)',
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              marginBottom: '0.5rem',
              background: 'linear-gradient(120deg, #ffffff 0%, #c8e8a8 14%, #9BE12C 28%, #4a7515 42%, #d8d8d8 56%, #9BE12C 72%, #e8f5d8 88%, #ffffff 100%)',
              backgroundSize: '200% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              filter: 'drop-shadow(0 0 28px rgba(155, 225, 44, 0.35))',
            }}
          >
            {active}
          </p>

          {/* Title */}
          <h3
            style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            {content?.title}
          </h3>

          {/* Body */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {content?.body}
          </p>

          {/* Bottom counter */}
          <p
            style={{
              marginTop: '2.5rem',
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
            }}
          >
            {LETTERS.indexOf(active as any) + 1} / 4 — How We Operate
          </p>
        </div>
      </div>

    </section>
  );
};

export default BAKESection;
