import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

const GuaranteeStrip: React.FC = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLHeadingElement>(null);
  const notRef      = useRef<HTMLImageElement>(null);
  const promiseRef  = useRef<HTMLDivElement>(null);
  const bodyRef     = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let headSplit: SplitType | null = null;
    let bodySplit: SplitType | null = null;
    let ctx: gsap.Context | null = null;
    const rafs: number[] = [];

    rafs.push(requestAnimationFrame(() => {
      rafs.push(requestAnimationFrame(() => {
        if (headRef.current) {
          headSplit = new SplitType(headRef.current, { types: 'words' });
        }
        if (bodyRef.current) {
          bodySplit = new SplitType(bodyRef.current, { types: 'words' });
        }

        ctx = gsap.context(() => {
          // Eyebrow strip — fade & slide
          if (eyebrowRef.current) {
            gsap.fromTo(
              eyebrowRef.current,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0, ease: 'none',
                scrollTrigger: {
                  trigger: eyebrowRef.current,
                  start: 'top 92%',
                  end: 'top 70%',
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          // Headline — per-word reveal. Blur was applied to each individual
          // word span (~40+ separate filter layers). Dropped: opacity + y
          // alone read almost identically and stay on the GPU fast path.
          if (headSplit?.words?.length) {
            gsap.set(headSplit.words, { opacity: 0.08, y: 30 });
            gsap.to(headSplit.words, {
              opacity: 1, y: 0,
              stagger: 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: headRef.current,
                start: 'top 85%',
                end: 'bottom 55%',
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });
          }

          // "not" marker — mask-position scrub (sweep diagonally across the glyph)
          if (notRef.current) {
            gsap.fromTo(
              notRef.current,
              { '--mask-x': '100%' } as any,
              {
                '--mask-x': '0%',
                ease: 'none',
                scrollTrigger: {
                  trigger: headRef.current,
                  start: 'top 75%',
                  end: 'top 45%',
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              } as any
            );
          }

          // "The Promise" label
          if (promiseRef.current) {
            gsap.fromTo(
              promiseRef.current,
              { opacity: 0, x: -30 },
              {
                opacity: 1, x: 0, ease: 'none',
                scrollTrigger: {
                  trigger: promiseRef.current,
                  start: 'top 88%',
                  end: 'top 65%',
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          // Body paragraph — per-word reveal, slightly slower stagger for "reading" feel.
          // No per-word filter (see headline note above).
          if (bodySplit?.words?.length) {
            gsap.set(bodySplit.words, { opacity: 0.12, y: 20 });
            gsap.to(bodySplit.words, {
              opacity: 1, y: 0,
              stagger: 0.03,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bodyRef.current,
                start: 'top 85%',
                end: 'bottom 55%',
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });
          }
        }, section);
      }));
    }));

    return () => {
      rafs.forEach(cancelAnimationFrame);
      if (ctx) ctx.revert();
      if (headSplit) headSplit.revert();
      if (bodySplit) bodySplit.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: ACCENT, opacity: 0.65 }}
      />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-[14vh] lg:py-[18vh]">
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-10 lg:mb-16">
          <span
            className="text-[0.7rem] tracking-[0.4em] uppercase"
            style={{ color: ACCENT, fontFamily: 'monospace' }}
          >
            Section 02 — The Guarantee
          </span>
          <span className="flex-1 h-px bg-white/10" />
        </div>

        <h2
          ref={headRef}
          className="text-[clamp(2.6rem,7.4vw,8.5rem)] leading-[0.95] font-black tracking-[-0.035em] uppercase max-w-[18ch]"
        >
          We&apos;re
          <span
            className="relative inline-block align-baseline"
            style={{ width: '0.2em' }}
          >
            <img
              ref={notRef}
              src="/not.svg"
              alt="not"
              className="absolute pointer-events-none not-marker"
              style={{
                left: 'calc(50% + 0.5em)',
                bottom: '0.58em',
                transform: 'translateX(-50%)',
                height: '0.975em',
                width: '0.65em',
                maxWidth: 'none',
                display: 'block',
              }}
            />
          </span>
          {' '}an{' '}
          <span className="text-white/35">award-winning agency.</span>
          <br />
          We&apos;d rather be{' '}
          <span style={{ color: ACCENT }}>a working one.</span>
        </h2>

        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div ref={promiseRef} className="lg:col-span-2">
            <span
              className="text-[0.7rem] tracking-[0.4em] uppercase text-white/50"
              style={{ fontFamily: 'monospace' }}
            >
              The Promise
            </span>
          </div>
          <p
            ref={bodyRef}
            className="lg:col-span-7 text-[clamp(1.05rem,1.5vw,1.45rem)] leading-relaxed text-white/85 max-w-[58ch]"
          >
            If it doesn&apos;t work, you don&apos;t pay. Every project is
            structured around milestone reviews — if the work doesn&apos;t hit
            the mark we agreed on, you walk away.{' '}
            <span className="text-white">No fees. No friction.</span>
          </p>
        </div>
      </div>

      <style>{`
        .not-marker {
          --mask-x: 100%;
          -webkit-mask-image: linear-gradient(105deg, #000 50%, transparent 50%);
          mask-image: linear-gradient(105deg, #000 50%, transparent 50%);
          -webkit-mask-size: 220% 100%;
          mask-size: 220% 100%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: var(--mask-x) 0%;
          mask-position: var(--mask-x) 0%;
        }
      `}</style>
    </section>
  );
};

export default GuaranteeStrip;
