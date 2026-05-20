import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

const POINTS = [
  {
    num: '01',
    title: 'Your wins are your wins.',
    body: "We don't plaster our name across your campaigns to fish for credit.",
  },
  {
    num: '02',
    title: 'We work behind the brand, not in front of it.',
    body: 'Your audience should fall in love with you, not with us.',
  },
  {
    num: '03',
    title: 'Preparation beats inspiration.',
    body: "Like Batman, we don't have superpowers. We have systems, discipline, and obsession with the details.",
  },
  {
    num: '04',
    title: 'No theatrics.',
    body: "We don't sell mystery, we sell results. The cape is the strategy.",
  },
];

const GothamSection: React.FC = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const closingRef  = useRef<HTMLParagraphElement>(null);

  // Fit headline to full container width — RAF-batched + reads-then-writes
  // to avoid forced reflow on resize. Was: write → read → write → read → write
  // (5 sync layouts per resize event). Now: writes are collected then flushed
  // after a single layout read.
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    let raf = 0;
    const fit = () => {
      raf = 0;
      // Writes — set to a small size + intrinsic width.
      el.style.fontSize = '10px';
      el.style.width = 'fit-content';
      // Single batched read of both widths (browser flushes layout once).
      const textWidth = el.offsetWidth;
      const containerWidth = (el.parentElement as HTMLElement).offsetWidth;
      // Writes — final size + reset width.
      el.style.width = '100%';
      el.style.fontSize = `${10 * (containerWidth / textWidth) * 1.3}px`;
    };
    fit();
    const ro = new ResizeObserver(() => {
      if (raf) return;
      raf = requestAnimationFrame(fit);
    });
    ro.observe(el.parentElement as HTMLElement);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: gsap.Context | null = null;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const scrub = { scrub: 1, invalidateOnRefresh: true };

        gsap.fromTo(
          headRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: 'power4.out',
            scrollTrigger: { trigger: headRef.current, start: 'top 85%', end: 'top 30%', ...scrub } }
        );

        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: 'power3.out',
            scrollTrigger: { trigger: subRef.current, start: 'top 85%', end: 'top 30%', ...scrub } }
        );

        const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.g-card');
        if (cards) {
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 60 },
              { opacity: 1, y: 0, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 25%', ...scrub } }
            );
          });
        }

        gsap.fromTo(
          closingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: 'power3.out',
            scrollTrigger: { trigger: closingRef.current, start: 'top 85%', end: 'top 30%', ...scrub } }
        );
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
      className="relative w-full bg-black text-white py-[14vh] px-6"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* top rule */}
      <div className="absolute left-0 right-0 top-0 h-px" style={{ background: ACCENT, opacity: 0.65 }} />

      {/* Full-width headline — lives outside the max-w container */}
      <div className="w-full mb-12">
        <h2
          ref={headRef}
          className="font-black leading-[1.0] tracking-[-0.035em] uppercase w-full text-center"
        >
          That&apos;s the lens we built{' '}
          <img
            src="/logo-light.svg"
            alt=""
            aria-hidden="true"
            width="180"
            height="64"
            style={{
              display: 'inline-block',
              height: '0.75em',
              width: 'auto',
              maxWidth: 'none',
              marginRight: '0.15em',
              position: 'relative',
              top: '-0.1em',
              verticalAlign: 'middle',
            }}
          />
          The Brne around.
        </h2>
      </div>

      <div className="max-w-screen-xl mx-auto">

        {/* Sub */}
        <p
          ref={subRef}
          className="text-[clamp(1rem,1.4vw,1.5rem)] leading-[1.65] max-w-[58ch] mb-20"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          Your brand is Gotham. Your customers are the city. We&apos;re not here to take the spotlight — we&apos;re here to do the work in the shadows so your brand becomes the one everyone notices.
        </p>

        {/* Cards label */}
        <p className="text-[0.72rem] tracking-[0.38em] uppercase mb-8" style={{ color: ACCENT, fontFamily: 'monospace' }}>
          What this means for our clients
        </p>

      </div>

      {/* Full-width cards — outside max-w container */}
      <div ref={cardsRef} className="w-full flex flex-col" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {POINTS.map((p) => (
          <div
            key={p.num}
            className="g-card w-full flex flex-col md:flex-row md:items-start gap-8 md:gap-0 px-6 py-12 md:py-16"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Number */}
            <div className="md:w-[15%] shrink-0">
              <span
                className="text-[clamp(2.5rem,4vw,5rem)] font-black tracking-[-0.04em] leading-none"
                style={{ color: ACCENT }}
              >
                {p.num}
              </span>
            </div>

            {/* Title */}
            <div className="md:w-[40%] shrink-0 md:pr-12">
              <h3 className="text-[clamp(1.4rem,2.2vw,2.8rem)] font-black leading-[1.1] tracking-[-0.03em] uppercase">
                {p.title}
              </h3>
            </div>

            {/* Body */}
            <div className="md:w-[45%]">
              <p
                className="text-[clamp(0.95rem,1.2vw,1.2rem)] leading-[1.65]"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {p.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-screen-xl mx-auto px-6">

        {/* Closing */}
        <p
          ref={closingRef}
          className="mt-24 text-[clamp(1.2rem,2.2vw,2.6rem)] font-black tracking-[-0.025em] uppercase text-center leading-[1.15]"
        >
          Heroes get statues.{' '}
          <span style={{ color: ACCENT }}>Vigilantes get results.</span>
          <br />
          We know which one builds businesses.
        </p>

      </div>
    </section>
  );
};

export default GothamSection;
