import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

const STEPS = [
  {
    n: '01',
    mood: 'Diagnostic',
    title: 'Brand Audit',
    body: "We start by understanding where you are, what works, what doesn't, and what the market sees. No assumptions — just evidence.",
  },
  {
    n: '02',
    mood: 'Problem-Solving',
    title: 'Think & Brainstorm',
    body: "We don't guess. We sit with the brief, challenge it, then build a strategy that connects the dots between you and your audience.",
  },
  {
    n: '03',
    mood: 'Optimisation',
    title: 'Improve the Gap',
    body: "We close the distance between where you are and where you should be — in positioning, in messaging, in execution.",
  },
  {
    n: '04',
    mood: 'Creative Formation',
    title: 'Content Ideation',
    body: "Concepts that earn attention. We turn the strategy into formats, hooks, and stories your audience actually wants to watch.",
  },
  {
    n: '05',
    mood: 'Production',
    title: 'Content Creation',
    body: "From script to shoot to post. We build the assets — clean, sharp, on-brand, and ready to perform.",
  },
  {
    n: '06',
    mood: 'Distribution',
    title: 'Creator Engagement',
    body: "The right voices amplify the right message. We collaborate with creators who match your audience and deliver real reach.",
  },
  {
    n: '07',
    mood: 'Amplification',
    title: 'Digital Ads',
    body: "Targeted, optimised, and tracked. We put the work in front of the people who matter — and iterate until it converts.",
  },
];

const ProcessSection: React.FC = () => {
  const sectionRef       = useRef<HTMLElement>(null);
  const trackRef         = useRef<HTMLDivElement>(null);
  const progressFillRef  = useRef<HTMLDivElement>(null);
  const stepRefs         = useRef<(HTMLDivElement | null)[]>([]);
  const lastIdxRef       = useRef(0);
  // Cache of last-written opacity per step so the scrub onUpdate can skip
  // DOM writes when the visual delta is below perception threshold.
  const lastOpacityRef   = useRef<number[]>([]);
  const eyebrowRef       = useRef<HTMLParagraphElement>(null);
  const headRef          = useRef<HTMLHeadingElement>(null);
  const leftColRef       = useRef<HTMLDivElement>(null);
  const rightColRef      = useRef<HTMLDivElement>(null);
  // Imperative refs for the big step number + counter label. Updating these
  // via textContent on each snap avoids a React re-render of the whole section
  // during the scrub.
  const stepNumberRef    = useRef<HTMLDivElement>(null);
  const stepCounterRef   = useRef<HTMLParagraphElement>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
  );

  // Keep isMobile in sync if viewport crosses the breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: gsap.Context | null = null;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {

        if (isMobile) {
          // Mobile — Selected Work pattern: pin the section, stack each
          // step on top of each other, slide-up to reveal the next.
          const panels = gsap.utils.toArray<HTMLElement>('.process-mobile-panel');
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: true,
              anticipatePin: 1,
              scrub: 1,
              start: 'top top',
              end: () => `+=${(panels.length - 1) * window.innerHeight}`,
              invalidateOnRefresh: true,
            },
          });
          panels.forEach((panel, i) => {
            if (i === panels.length - 1) return;
            tl.to(panel, { yPercent: -100, ease: 'power1.inOut', duration: 1 }, i);
          });
          return;
        }

        // ── Desktop ──────────────────────────────────────────────────────
        const scrub = (el: Element | null, delay = 0) => {
          if (!el) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: 60 },
            {
              opacity: 1, y: 0,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 88%',
                end: `top ${60 - delay * 6}%`,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        };

        scrub(eyebrowRef.current);
        scrub(headRef.current,    1);
        scrub(leftColRef.current,  2);
        scrub(rightColRef.current, 3);

        if (!trackRef.current) return;
        const track = trackRef.current;
        const steps = STEPS.length;

        gsap.to(track, {
          xPercent: -100 * (steps - 1) / steps,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            start: 'top top',
            end: () => `+=${(steps - 1) * window.innerHeight}`,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (steps - 1),
              duration: { min: 0.2, max: 0.5 },
              ease: 'power2.inOut',
            },
            onUpdate: (self) => {
              const exact = self.progress * (steps - 1);

              stepRefs.current.forEach((el, i) => {
                if (!el) return;
                const dist = Math.abs(i - exact);
                const next = Math.max(0.15, 1 - dist * 0.9);
                const prev = lastOpacityRef.current[i];
                // Skip writes below perception threshold — most off-screen
                // steps stay clamped at 0.15 every frame and don't need
                // re-writing.
                if (prev !== undefined && Math.abs(next - prev) < 0.005) return;
                el.style.opacity = String(next);
                lastOpacityRef.current[i] = next;
              });

              if (progressFillRef.current) {
                progressFillRef.current.style.height = `${self.progress * 100}%`;
              }

              const idx = Math.round(exact);
              if (idx !== lastIdxRef.current) {
                lastIdxRef.current = idx;
                // Imperative — no React re-render during scrub.
                if (stepNumberRef.current) stepNumberRef.current.textContent = STEPS[idx].n;
                if (stepCounterRef.current) {
                  stepCounterRef.current.textContent =
                    `Step ${String(idx + 1).padStart(2, '0')} / ${String(STEPS.length).padStart(2, '0')}`;
                }
              }
            },
          },
        });
      }, section);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (ctx) ctx.revert();
    };
  }, [isMobile]);

  // ── Mobile render — stacked slide-up panels ────────────────────────────
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="relative w-full bg-black text-white overflow-hidden"
        style={{ height: '100vh', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: ACCENT, opacity: 0.4, zIndex: 100 }} />

        {/* Eyebrow — overlay, always visible */}
        <div className="absolute top-[6vh] left-6 right-6 z-[90]">
          <p className="uppercase tracking-[0.35em]" style={{ fontSize: 11, color: ACCENT }}>
            Section 09 — How We Work
          </p>
        </div>

        {STEPS.map((step, i) => (
          <div
            key={step.n}
            className="process-mobile-panel"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: STEPS.length - i,
              background: '#0a0a0a',
              padding: '18vh 1.5rem 8vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              willChange: 'transform',
            }}
          >
            <div
              className="font-black"
              style={{
                fontSize: 'clamp(6rem, 30vw, 14rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.06em',
                color: ACCENT,
                marginBottom: 24,
                fontFeatureSettings: '"tnum"',
              }}
            >
              {step.n}
            </div>

            <p
              className="uppercase tracking-[0.3em]"
              style={{ fontSize: 10, color: ACCENT, marginBottom: 16 }}
            >
              {step.mood}
            </p>

            <h3
              className="font-black"
              style={{
                fontSize: 'clamp(2rem, 9vw, 3.6rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                marginBottom: 20,
              }}
            >
              {step.title}
            </h3>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 4vw, 1.15rem)',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '46ch',
              }}
            >
              {step.body}
            </p>

            <span
              className="absolute bottom-[5vh] left-6 uppercase"
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: '0.3em',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              Step {step.n} / {String(STEPS.length).padStart(2, '0')}
            </span>
          </div>
        ))}
      </section>
    );
  }

  // ── Desktop render ─────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white overflow-hidden"
      style={{ height: '100vh', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: ACCENT, opacity: 0.4, zIndex: 5 }} />

      <div
        className="h-full max-w-[1320px] mx-auto px-6 lg:px-12 flex flex-col"
        style={{ paddingTop: '12vh', paddingBottom: '8vh' }}
      >

        <div>
          <p
            ref={eyebrowRef}
            className="uppercase tracking-[0.35em]"
            style={{ fontSize: 11, color: ACCENT, marginBottom: 24 }}
          >
            Section 09 — How We Work
          </p>

          <h2
            ref={headRef}
            className="font-black tracking-[-0.04em] leading-[0.95]"
            style={{
              fontSize: 'clamp(1.8rem, 3.6vw, 3.6rem)',
              maxWidth: '24ch',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            A seven-step process,<br />engineered to perform.
          </h2>
        </div>

        <div
          className="grid flex-1"
          style={{
            gridTemplateColumns: 'minmax(280px, 32%) 1fr',
            gap: '5vw',
            alignItems: 'center',
            marginTop: '4vh',
          }}
        >

          <div ref={leftColRef}>
            <div
              ref={stepNumberRef}
              className="font-black"
              style={{
                fontSize: 'clamp(7rem, 16vw, 16rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.06em',
                color: ACCENT,
                marginBottom: 48,
                fontFeatureSettings: '"tnum"',
              }}
            >
              {STEPS[0].n}
            </div>

            <div className="flex items-center gap-5">
              <div
                style={{
                  width: 2,
                  height: 96,
                  background: 'rgba(255,255,255,0.1)',
                  position: 'relative',
                }}
              >
                <div
                  ref={progressFillRef}
                  style={{
                    width: '100%',
                    height: '0%',
                    background: ACCENT,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    boxShadow: `0 0 16px ${ACCENT}`,
                  }}
                />
              </div>
              <p
                ref={stepCounterRef}
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                }}
              >
                Step 01 / {String(STEPS.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          <div ref={rightColRef} style={{ overflow: 'hidden', position: 'relative' }}>
            <div
              ref={trackRef}
              style={{
                display: 'flex',
                width: `${STEPS.length * 100}%`,
                willChange: 'transform',
              }}
            >
              {STEPS.map((step, i) => (
                <div
                  key={step.n}
                  ref={el => { stepRefs.current[i] = el; }}
                  style={{
                    width: `${100 / STEPS.length}%`,
                    paddingRight: '4vw',
                    flexShrink: 0,
                  }}
                >
                  <p
                    className="uppercase tracking-[0.3em]"
                    style={{
                      fontSize: 10,
                      color: ACCENT,
                      marginBottom: 20,
                    }}
                  >
                    {step.mood}
                  </p>

                  <h3
                    className="font-black"
                    style={{
                      fontSize: 'clamp(2.2rem, 5vw, 5rem)',
                      lineHeight: 0.95,
                      letterSpacing: '-0.04em',
                      marginBottom: 28,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.3vw, 1.4rem)',
                      lineHeight: 1.55,
                      color: 'rgba(255,255,255,0.6)',
                      maxWidth: '46ch',
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
