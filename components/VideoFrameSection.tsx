import React from 'react';

const SCROLL_HEIGHT = '500vh';

interface Point {
  heading: string;
  body: string;
  headingTransform: string;
  bodyAlign: 'left' | 'center' | 'right';
}

const POINTS: Point[] = [
  {
    heading: 'SEEN',
    body: 'Be where attention happens. From Google to social platforms, we make sure your brand gets discovered by the right people at the right time.',
    headingTransform: 'skewX(-10deg) rotate(-2deg)',
    bodyAlign: 'center',
  },
  {
    heading: 'WANTED',
    body: 'Turn attention into desire through storytelling, strategy, content, and performance-driven campaigns that move people to act.',
    headingTransform: 'rotate(-4deg) skewY(-3deg)',
    bodyAlign: 'right',
  },
  {
    heading: 'REMEMBERED',
    body: 'Build a brand people don’t just see — but feel, trust, and remember through powerful branding and digital experiences.',
    headingTransform: 'skewX(9deg) rotate(2deg)',
    bodyAlign: 'left',
  },
];

const VideoFrameSection: React.FC = () => {
  return (
    <section
      style={{
        height: SCROLL_HEIGHT,
        position: 'relative',
        background: '#000',
        // Overlap CinematicHero's tail-end unpin range so the hero's blob video doesn't
        // bleed through alongside our own video at the section transition.
        marginTop: '-100vh',
      }}
    >
      {/* Fixed video background — sticky-pinned across the entire section's pin range */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <video
          src="/video-frame.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            background: '#000',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 30%, rgba(0,0,0,0.72) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Three text panels stacked at 1, 2, 3 viewports down — each fills one viewport
          and scrolls naturally from bottom to top while the video stays pinned. */}
      {POINTS.map((p, i) => (
        <PointPanel key={p.heading} point={p} offsetVh={(i + 1) * 100} />
      ))}
    </section>
  );
};

interface PointPanelProps {
  point: Point;
  offsetVh: number;
}

const PointPanel: React.FC<PointPanelProps> = ({ point, offsetVh }) => {
  const bodyJustify =
    point.bodyAlign === 'left' ? 'flex-start' :
    point.bodyAlign === 'right' ? 'flex-end' : 'center';

  return (
    <div
      style={{
        position: 'absolute',
        top: `${offsetVh}vh`,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5vh',
        padding: '0 6vw',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(4rem, 13vw, 16rem)',
          lineHeight: 0.92,
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
          transform: point.headingTransform,
          transformOrigin: '50% 50%',
          textShadow: '0 6px 40px rgba(0,0,0,0.55)',
        }}
      >
        {point.heading}
      </h2>

      <div style={{ width: '100%', display: 'flex', justifyContent: bodyJustify }}>
        <p
          style={{
            margin: 0,
            fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(1rem, 1.6vw, 1.5rem)',
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: '0.02em',
            maxWidth: '38ch',
            textAlign: point.bodyAlign,
            textShadow: '0 2px 18px rgba(0,0,0,0.6)',
          }}
        >
          {point.body}
        </p>
      </div>
    </div>
  );
};

export default VideoFrameSection;
