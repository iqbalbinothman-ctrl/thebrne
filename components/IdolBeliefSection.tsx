import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const IdolBeliefSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const paraRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const para    = paraRef.current;
    if (!section || !para) return;

    let split: SplitType | null = null;
    let ctx: gsap.Context | null = null;
    const rafs: number[] = [];

    rafs.push(requestAnimationFrame(() => {
      rafs.push(requestAnimationFrame(() => {
        split = new SplitType(para, { types: 'words' });

        // Per-word reveal — blur was applied per word (~80+ filter layers).
        // Dropped: opacity + y read nearly identical at a fraction of the
        // paint cost.
        gsap.set(split.words, { opacity: 0.08, y: 30 });

        ctx = gsap.context(() => {
          gsap.to(split!.words, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: para,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

        }, section);
      }));
    }));

    return () => {
      rafs.forEach(cancelAnimationFrame);
      if (ctx) ctx.revert();
      if (split) split.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[140vh] bg-black text-white flex items-center justify-center px-0 lg:px-6"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      <p
        ref={paraRef}
        className="belief-paragraph w-full lg:w-[58vw] text-center text-[clamp(2.2rem,3vw,3.8rem)] leading-[1.35] tracking-[-0.03em] font-medium"
      >
        We believe the{' '}
        <span className="highlight">best work</span>
        {' '}is done by the people no one sees. The ones who show up at{' '}
        <span className="highlight">3 a.m.</span>
        {' '}when there's a problem. The ones who do the{' '}
        <span className="highlight">heavy lifting</span>
        {' '}and let the{' '}
        <span className="highlight">city take the credit</span>
        . The ones whose name you don't know but whose work you{' '}
        <span className="highlight">can't ignore</span>
        .
      </p>

      <style>{`
        .belief-paragraph .highlight {
          font-family: 'Embolism Spark', 'Helvetica Neue', cursive;
          font-size: 1.08em;
          color: #9BE12C;
          display: inline-block;
          padding: 0 0.08em;
        }
      `}</style>
    </section>
  );
};

export default IdolBeliefSection;
