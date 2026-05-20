import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

const IdolSection: React.FC = () => {
  const sectionRef     = useRef<HTMLElement>(null);
  const labelRef       = useRef<HTMLDivElement>(null);
  const textBeforeRef  = useRef<HTMLSpanElement>(null);
  const batmanRef      = useRef<SVGSVGElement>(null);
  const batguyRef      = useRef<HTMLImageElement>(null);
  const revealTextRef  = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const batman  = batmanRef.current;
    if (!section || !batman) return;

    let ctx: gsap.Context | null = null;

    // Defer to next frame so layout has settled before we measure.
    const raf = requestAnimationFrame(() => {
      const sr = section.getBoundingClientRect();
      const br = batman.getBoundingClientRect();
      const targetX = window.innerWidth / 2  - (br.left - sr.left + br.width / 2);
      const targetY = window.innerHeight / 2 - (br.top  - sr.top  + br.height / 2);
      const targetScale = Math.min(
        (window.innerWidth  * 0.9) / br.width,
        (window.innerHeight * 0.6) / br.height
      );

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * 1.8}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          [labelRef.current, textBeforeRef.current],
          { opacity: 0, duration: 0.25, ease: 'power1.out' },
          0
        );

        tl.to(
          batman,
          {
            scale: targetScale,
            x: targetX,
            y: targetY,
            ease: 'power2.inOut',
            duration: 0.4,
          },
          0
        );

        if (batguyRef.current) {
          const isMobile = window.matchMedia('(max-width: 1023px)').matches;
          const batguyXPercent = isMobile ? -20 : -50;
          tl.fromTo(
            batguyRef.current,
            { xPercent: batguyXPercent, yPercent: 100, opacity: 0 },
            { xPercent: batguyXPercent, yPercent: 0, opacity: 1, duration: 0.3, ease: 'power3.out' },
            0.4
          );
        }

        if (revealTextRef.current) {
          tl.fromTo(
            revealTextRef.current,
            { xPercent: -50, opacity: 0, y: 40 },
            { xPercent: -50, opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            0.75
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
      className="relative w-full min-h-screen bg-black text-white overflow-hidden"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: ACCENT, opacity: 0.65 }}
      />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-[14vh] lg:py-[18vh]">
        <div ref={labelRef} className="flex items-center gap-3 mb-10 lg:mb-16">
          <span
            className="text-[0.7rem] tracking-[0.4em] uppercase"
            style={{ color: ACCENT, fontFamily: 'monospace' }}
          >
            Section 03 — The Idol
          </span>
          <span className="flex-1 h-px bg-white/10" />
        </div>

        <h2 className="text-[clamp(2.6rem,7.4vw,8.5rem)] leading-[0.95] font-black tracking-[-0.035em] uppercase max-w-[20ch]">
          <span ref={textBeforeRef}>
            Our idol
            <br />
            isn&apos;t a marketer.
            <br />
            It&apos;s{' '}
          </span>
          <svg
            ref={batmanRef}
            viewBox="0 0 1000 280"
            preserveAspectRatio="xMidYMid meet"
            style={{
              color: ACCENT,
              fill: 'currentColor',
              display: 'inline-block',
              height: '0.9em',
              width: 'auto',
              marginLeft: '0.15em',
              verticalAlign: '-0.12em',
              overflow: 'visible',
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          >
            <text
              x="500"
              y="220"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="'Helvetica Neue', Arial, sans-serif"
              fontWeight="900"
              fontSize="240"
              letterSpacing="-4"
            >
              Batman.
            </text>
          </svg>
        </h2>

      </div>

      <img
        ref={batguyRef}
        src="/batguynew-1.png"
        alt="Batguy"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          height: '85vh',
          width: 'auto',
          maxWidth: 'none',
          pointerEvents: 'none',
          zIndex: 5,
          opacity: 0,
        }}
      />

      <p
        ref={revealTextRef}
        style={{
          position: 'absolute',
          top: '12vh',
          left: '50%',
          textAlign: 'center',
          color: 'white',
          fontStyle: 'italic',
          fontFamily: "'Times New Roman', Georgia, serif",
          fontSize: 'clamp(1.6rem, 2.8vw, 3rem)',
          lineHeight: 1.2,
          opacity: 0,
          zIndex: 10,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Stay with us, there&apos;s a reason.
      </p>
    </section>
  );
};

export default IdolSection;
