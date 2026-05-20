import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

const ManifestoSection: React.FC = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const circleRef    = useRef<SVGPathElement>(null);

  // Lazy-load Tenor embed only when the meme container is about to scroll
  // into view. Eager loading the script pulled a 3rd-party origin into the
  // initial network waterfall even though the meme is far down the page.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const target = section.querySelector<HTMLElement>('.tenor-gif-embed');
    if (!target) return;
    if (document.querySelector('script[src="https://tenor.com/embed.js"]')) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (document.querySelector('script[src="https://tenor.com/embed.js"]')) {
        io.disconnect();
        return;
      }
      const s = document.createElement('script');
      s.src = 'https://tenor.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
      io.disconnect();
    }, { rootMargin: '400px 0px' });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: gsap.Context | null = null;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Scroll-linked scrub — animation tied to scroll position, reverses on scroll up
        const els = section.querySelectorAll<HTMLElement>('.js-manifesto');
        els.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 80 },
            {
              opacity: 1, y: 0,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'top 30%',
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        // Hand-drawn circle draw-in on "ONE"
        if (circleRef.current) {
          const len = circleRef.current.getTotalLength();
          gsap.set(circleRef.current, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(circleRef.current, {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            },
          });
        }

        // Parallax on the big statement
        gsap.fromTo(
          statementRef.current,
          { yPercent: 6 },
          {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
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
      className="relative w-full bg-black text-white overflow-hidden"
      style={{ padding: '18vh 0', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: ACCENT, opacity: 0.4 }} />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">

        {/* Eyebrow */}
        <p
          className="js-manifesto uppercase tracking-[0.35em]"
          style={{ fontSize: 11, color: ACCENT, marginBottom: 80 }}
        >
          The Best Part Of Us
        </p>

        {/* Hero block */}
        <div className="w-full" style={{ marginBottom: '10vh' }}>

          <h2
            className="js-manifesto font-black"
            style={{
              fontSize: 'clamp(2rem, 4vw, 5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              marginBottom: 32,
            }}
          >
            The best part of us is
          </h2>

          <div
            ref={statementRef}
            className="js-manifesto font-black uppercase w-full"
            style={{
              fontSize: 'clamp(4rem, 13vw, 14rem)',
              lineHeight: 0.82,
              letterSpacing: '-0.08em',
            }}
          >
            <span style={{ position: 'relative', display: 'inline-block' }}>
              One
              <svg
                viewBox="0 0 220 130"
                style={{
                  position: 'absolute',
                  top: '-38%',
                  left: '-28%',
                  width: '156%',
                  height: '176%',
                  overflow: 'visible',
                  pointerEvents: 'none',
                }}
              >
                <path
                  ref={circleRef}
                  d="M 28,65 C 22,18 68,4 110,6 C 152,8 196,22 200,68 C 204,108 172,122 110,120 C 48,118 16,98 24,60 C 30,32 55,8 28,65"
                  stroke={ACCENT}
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>{' '}client<br />
            per niche.<br />
            Only.
          </div>

          {/* Tenor meme */}
          <div style={{ marginTop: '6vh', maxWidth: 420 }}>
            <div
              className="tenor-gif-embed"
              data-postid="20018981"
              data-share-method="host"
              data-aspect-ratio="1"
              data-width="100%"
            />
          </div>

        </div>

        {/* Body copy */}
        <div className="w-full">

          <p
            className="js-manifesto"
            style={{
              fontSize: 'clamp(1.2rem, 2vw, 2.2rem)',
              lineHeight: 1.45,
              letterSpacing: '-0.03em',
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 1400,
              marginBottom: 56,
            }}
          >
            We won&apos;t take on two brands in the same space.
            Two academies. Two beauty spas. Two of anything
            that competes with each other.
          </p>

          <p
            className="js-manifesto"
            style={{
              fontSize: 'clamp(1.2rem, 2vw, 2.2rem)',
              lineHeight: 1.45,
              letterSpacing: '-0.03em',
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 1400,
              marginBottom: 56,
            }}
          >
            Because the ideas would overlap,
            the strategies would clash,
            and your edge would disappear.
          </p>

          {/* Pull quote */}
          <p
            className="js-manifesto font-black uppercase w-full"
            style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.07em',
              color: ACCENT,
              margin: '14vh 0',
            }}
          >
            When you work with us,<br />
            your creative direction<br />
            is exclusively yours.
          </p>

          <p
            className="js-manifesto"
            style={{
              fontSize: 'clamp(1.2rem, 2vw, 2.2rem)',
              lineHeight: 1.45,
              letterSpacing: '-0.03em',
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 1400,
              marginBottom: 56,
            }}
          >
            We&apos;re not chasing the money.
            We&apos;re chasing the work we&apos;re proud
            to put our name behind.
          </p>

          {/* Closing */}
          <p
            className="js-manifesto font-black"
            style={{
              fontSize: 'clamp(2rem, 5vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.06em',
              maxWidth: '18ch',
            }}
          >
            That&apos;s why we don&apos;t take on 100 clients.
            Just the right ones.
          </p>

        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
