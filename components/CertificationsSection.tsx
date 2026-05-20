import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = '#9BE12C';

const BADGES = [
  { alt: 'Google Partner',           src: '/assets/logos/google-partner.png' },
  { alt: 'Meta Business Partner',    src: '/assets/logos/meta-partner.png' },
  { alt: 'TikTok Marketing Partner', src: '/assets/logos/tiktok-partner.png' },
  { alt: 'Shopee',                   src: '/assets/logos/shopee.svg' },
  { alt: 'Google Ads',               src: '/assets/logos/google-ads.png' },
];

const CertificationsSection: React.FC = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const headRef     = useRef<HTMLHeadingElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);
  const badgesRef   = useRef<HTMLDivElement>(null);
  const bodyRef     = useRef<HTMLParagraphElement>(null);

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
                start: `top 88%`,
                end: `top ${38 - delay * 6}%`,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        };

        scrub(eyebrowRef.current);
        scrub(headRef.current, 1);
        scrub(taglineRef.current, 2);

        // Badges — each scrubs in independently with slight offset
        const badges = badgesRef.current?.querySelectorAll<HTMLElement>('.cert-badge');
        badges?.forEach((badge, i) => {
          gsap.fromTo(
            badge,
            { opacity: 0, y: 50, scale: 0.94 },
            {
              opacity: 1, y: 0, scale: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: badgesRef.current,
                start: 'top 82%',
                end: `top ${32 - i * 8}%`,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        scrub(bodyRef.current, 3);
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
      className="relative w-full bg-black text-white"
      style={{ padding: '16vh 0', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: ACCENT, opacity: 0.4 }} />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 text-center">

        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="uppercase tracking-[0.35em]"
          style={{ fontSize: 11, color: ACCENT, marginBottom: 40 }}
        >
          Section 07 — Certifications
        </p>

        {/* Headline */}
        <h2
          ref={headRef}
          className="font-black tracking-[-0.04em]"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 6rem)',
            lineHeight: 0.95,
            maxWidth: '18ch',
            margin: '0 auto 32px',
          }}
        >
          Officially recognised by the platforms that matter.
        </h2>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-black uppercase tracking-[-0.03em]"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 2rem)',
            color: ACCENT,
            marginBottom: '10vh',
          }}
        >
          Strategy is the difference. Certification is the receipt.
        </p>

        {/* Badges */}
        <div
          ref={badgesRef}
          className="grid grid-cols-1 lg:grid-cols-5"
          style={{
            marginBottom: '8vh',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {BADGES.map((b, i) => (
            <React.Fragment key={b.alt}>
              <div
                className="cert-badge"
                style={{
                  borderRight: '1px solid rgba(255,255,255,0.1)',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  padding: '40px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={b.src}
                  alt={b.alt}
                  style={{ height: 64, width: '100%', maxWidth: 140, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
              </div>

            </React.Fragment>
          ))}
        </div>

        {/* Body */}
        <p
          ref={bodyRef}
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.5rem)',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '58ch',
            margin: '0 auto',
          }}
        >
          Both certifications confirm what our work already proves — we operate at the standard the platforms themselves recognise.
        </p>

      </div>
    </section>
  );
};

export default CertificationsSection;
