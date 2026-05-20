import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

const FinalCTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const ctasRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const reveal = (el: Element | null, delay = 0) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: `top ${42 - delay * 6}%`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      };

      reveal(eyebrowRef.current);
      reveal(headRef.current, 1);
      reveal(bodyRef.current, 2);
      reveal(ctasRef.current, 3);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: ACCENT, opacity: 0.4 }} />

      <div
        className="max-w-[1320px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center"
        style={{ paddingTop: '22vh', paddingBottom: '22vh' }}
      >
        <p
          ref={eyebrowRef}
          className="uppercase tracking-[0.35em]"
          style={{ fontSize: 11, color: ACCENT, marginBottom: '4rem' }}
        >
          Section 10 — Final CTA
        </p>

        <h2
          ref={headRef}
          className="font-black tracking-[-0.04em] leading-[0.95]"
          style={{ fontSize: 'clamp(2.8rem, 7.5vw, 8.5rem)', marginBottom: '2.5rem' }}
        >
          Ready to be unseen<br />
          <span style={{ color: ACCENT }}>the right way?</span>
        </h2>

        <p
          ref={bodyRef}
          style={{
            fontSize: 'clamp(1.05rem, 1.4vw, 1.4rem)',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '54ch',
            marginBottom: '4rem',
          }}
        >
          Put your name on our waiting list. We'll tell you honestly whether we're the right team to help you build what you're building. No pitch deck. No fluff.
        </p>

        <div
          ref={ctasRef}
          className="flex flex-col gap-5 items-center"
          style={{ fontSize: 'clamp(0.82rem, 3vw, 1.5rem)' }}
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 font-medium transition-colors whitespace-nowrap"
            style={{ color: ACCENT }}
          >
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            <span className="border-b border-transparent group-hover:border-current">Get Your Free Audit</span>
          </Link>

          <a
            href="https://wa.me/60000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap"
          >
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            <span className="border-b border-transparent group-hover:border-current">Or WhatsApp us if you'd rather talk first</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
