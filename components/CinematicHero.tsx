import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Prevent GSAP from doing huge catch-up work after a stall (tab switch,
// long task). Without this, returning to the tab triggers a frame burst.
gsap.ticker.lagSmoothing(500, 33);

const FRAME_COUNT = 33;
const FRAME_PATH = (i: number) =>
  `/frames-webp/ezgif-frame-${String(i * 2 - 1).padStart(3, '0')}.webp`;

// Forced-perspective floor pose — each heading sits "standing on the ground"
// tilted back into the scene. SEEN is closest (small tilt, full size),
// WANTED is mid-stage, REMEMBERED is furthest down the hallway.
// `restRX` = resting rotateX tilt. Larger = more lean-back (farther).
// `restScale` = how small the word reads at rest (forced-perspective scale).
const POINTS = [
  {
    heading: 'SEEN',
    body: 'Be where attention happens. From Google to social platforms, we make sure your brand gets discovered by the right people at the right time.',
    depth: { restRX: 42, restScale: 1.0, restZ: 200 },
  },
  {
    heading: 'WANTED',
    body: 'Turn attention into desire through storytelling, strategy, content, and performance-driven campaigns that move people to act.',
    depth: { restRX: 55, restScale: 1.0, restZ: -100 },
  },
  {
    heading: 'REMEMBERED',
    body: 'Build a brand people don’t just see — but feel, trust, and remember through powerful branding and digital experiences.',
    depth: { restRX: 68, restScale: 1.0, restZ: -350 },
  },
];

const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyBgRef  = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const vignetteRef  = useRef<HTMLDivElement>(null);
  const cursorRef    = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const sceneRef        = useRef<HTMLDivElement>(null);
  const videoScaleRef   = useRef<HTMLDivElement>(null);
  const maskedVideoRef  = useRef<HTMLVideoElement>(null);
  const audioRef       = useRef<HTMLAudioElement>(null);
  const line1Ref       = useRef<HTMLSpanElement>(null);
  const prefixRef      = useRef<HTMLSpanElement>(null);
  const seenRef        = useRef<HTMLElement>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [framesReady, setFramesReady]   = useState(false);

  const imagesRef       = useRef<HTMLImageElement[]>([]);
  const targetFrameRef  = useRef(0);
  const currentFrameRef = useRef(0);
  const zoomRef         = useRef(1);

  // ─── Preload frames ────────────────────────────────────────────────────────
  // Progressive: block on the first PRIORITY frames, then stream the rest at
  // low fetchPriority so we paint the hero in ~300ms instead of waiting for
  // ~9MB of webp to land. The render loop already no-ops on incomplete frames,
  // so fast scrolls just hold the last-loaded frame until the next arrives.
  useEffect(() => {
    let cancelled = false;
    const PRIORITY = 4;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;
    let priorityLoaded = 0;

    const loadOne = (i: number, blocking: boolean) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority =
          blocking ? 'high' : 'low';
        img.src = FRAME_PATH(i + 1);
        img.onload = img.onerror = () => {
          if (cancelled) return resolve();
          loaded++;
          if (blocking) {
            priorityLoaded++;
            if (priorityLoaded === PRIORITY) setFramesReady(true);
          }
          setLoadProgress(loaded / FRAME_COUNT);
          resolve();
        };
        images[i] = img;
      });

    imagesRef.current = images;

    (async () => {
      // Phase 1 — block only on the first PRIORITY frames
      await Promise.all(
        Array.from({ length: PRIORITY }, (_, i) => loadOne(i, true))
      );
      if (cancelled) return;
      // Phase 2 — stream the rest at low priority, deferred to idle
      const streamRest = () => {
        for (let i = PRIORITY; i < FRAME_COUNT; i++) {
          if (cancelled) return;
          loadOne(i, false);
        }
      };
      const ric = (window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
      }).requestIdleCallback;
      if (ric) ric(streamRest, { timeout: 2000 });
      else setTimeout(streamRest, 0);
    })();

    return () => { cancelled = true; };
  }, []);

  // ─── Image-sequence render loop (+ canvas sizing) ─────────────────────────
  useEffect(() => {
    if (!framesReady) return;
    const canvas = canvasRef.current;
    const sticky = stickyBgRef.current;
    if (!canvas || !sticky) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let rafId = 0;
    let rendered = -1;
    let inView = true;
    let lastZoom = -1;

    // Cover-fit drawImage always fills canvas, so no fillRect needed.
    // The redundant fillRect was causing brief black flashes on mobile.
    // On mobile (< 1024px), shift the batman silhouette 40% of canvas width
    // to the right so it doesn't sit under the manifesto text.
    const draw = (idx: number) => {
      const img = imagesRef.current[idx];
      if (!img?.complete) return;
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth || 1, ih = img.naturalHeight || 1;
      const z = zoomRef.current;
      const scale = Math.max(cw / iw, ch / ih) * z;
      const dw = iw * scale, dh = ih * scale;
      const offsetX = cw < 1024 ? cw * 0.4 : 0;
      ctx.drawImage(img, (cw - dw) / 2 + offsetX, (ch - dh) / 2, dw, dh);
    };

    // RAF only runs while there's something to do (frame chase or zoom change).
    // Idle-RAF was burning a frame's worth of work every tick for nothing.
    const tick = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      const zoomDiff = zoomRef.current - lastZoom;
      const needFrameWork = Math.abs(diff) > 0.01;
      const needZoomRedraw = Math.abs(zoomDiff) > 0.0005;
      if (!inView || (!needFrameWork && !needZoomRedraw)) {
        rafId = 0;
        return;
      }
      const next = needFrameWork ? currentFrameRef.current + diff * 0.18 : targetFrameRef.current;
      currentFrameRef.current = next;
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(next)));
      if (idx !== rendered || needZoomRedraw) {
        draw(idx);
        rendered = idx;
        lastZoom = zoomRef.current;
      }
      rafId = requestAnimationFrame(tick);
    };
    const wake = () => { if (!rafId && inView) rafId = requestAnimationFrame(tick); };
    (window as any).__heroWake = wake;

    // Resize clears the canvas — immediately redraw current frame to avoid
    // a blank flash when mobile browsers collapse/expand the address bar.
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      if (rendered >= 0) draw(rendered);
    };
    resize();
    window.addEventListener('resize', resize);

    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView) wake();
    }, { threshold: 0 });
    io.observe(sticky);
    draw(0);
    rendered = 0;
    lastZoom = zoomRef.current;
    wake();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      io.disconnect();
      delete (window as any).__heroWake;
    };
  }, [framesReady]);

  // ─── Custom cursor ─────────────────────────────────────────────────────────
  useEffect(() => {
    const cursor = cursorRef.current;
    const sticky = stickyBgRef.current;
    if (!cursor || !sticky) return;
    let mx = 0, my = 0, cx = 0, cy = 0, hovering = false, raf = 0;
    const onMove  = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onEnter = () => { hovering = true; cursor.style.opacity = '1'; if (!raf) raf = requestAnimationFrame(loop); };
    const onLeave = () => { hovering = false; cursor.style.opacity = '0'; cancelAnimationFrame(raf); raf = 0; };
    const loop = () => {
      cx += (mx - cx) * 0.12; cy += (my - cy) * 0.12;
      cursor.style.transform = `translate(${cx - 12}px, ${cy - 12}px)`;
      if (hovering) raf = requestAnimationFrame(loop);
    };
    sticky.addEventListener('mousemove', onMove);
    sticky.addEventListener('mouseenter', onEnter);
    sticky.addEventListener('mouseleave', onLeave);
    return () => {
      sticky.removeEventListener('mousemove', onMove);
      sticky.removeEventListener('mouseenter', onEnter);
      sticky.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ─── Background audio (Batman theme) — play in hero, pause when scrolled past ─
  useEffect(() => {
    const container = containerRef.current;
    const audio = audioRef.current;
    if (!container || !audio) return;

    audio.volume = 0.5;
    const tryPlay = () => {
      // Upgrade preload now that we actually want playback. Setting this
      // before play() triggers the file to start streaming.
      if (audio.preload !== 'auto') audio.preload = 'auto';
      audio.play().catch(() => {});
    };

    const io = new IntersectionObserver(([entry]) => {
      const inHero = entry.isIntersecting;
      if (inHero) tryPlay(); else audio.pause();
      // Free the GPU when the hero is off-screen — the masked video keeps
      // decoding even with display:none in a sticky context.
      const masked = maskedVideoRef.current;
      if (masked) {
        if (inHero) masked.play().catch(() => {}); else masked.pause();
      }
    }, { threshold: 0 });
    io.observe(container);

    // First user interaction unlocks autoplay if the browser blocked it.
    // pointerdown covers mouse + touch; once+signal auto-cleans listeners.
    const unlock = new AbortController();
    const opts = { passive: true, once: true, signal: unlock.signal };
    window.addEventListener('pointerdown', tryPlay, opts);
    window.addEventListener('keydown',     tryPlay, opts);

    return () => {
      io.disconnect();
      unlock.abort();
      audio.pause();
    };
  }, []);

  // ─── Animations ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!framesReady) return;
    const container = containerRef.current;
    if (!container) return;

    if (sceneRef.current) {
      // Iris reveal — was an SVG mask with animated mask-size, which forces
      // CPU re-rasterization of the mask per scroll pixel on Safari/WebKit.
      // clip-path: circle() stays on the GPU compositor fast path on all
      // modern browsers. We lose the organic blob silhouette in exchange for
      // a clean circular iris that scrolls at 60fps on iOS.
      gsap.set(sceneRef.current, {
        clipPath: 'circle(0% at 50% 50%)',
        WebkitClipPath: 'circle(0% at 50% 50%)',
      });
    }

    const line1   = line1Ref.current;
    const prefix  = prefixRef.current;
    const seen    = seenRef.current;
    const vw      = window.innerWidth;
    // On mobile the prefix wraps to a new line; -150 makes "seen" overlap it. Use a smaller offset.
    const seenY   = vw < 1024 ? -60 : -150;

    const ctx = gsap.context(() => {
      // Manifesto intro (on mount): line1 from right, prefix from left, "seen." drops + grows
      if (line1 && prefix && seen) {
        gsap.set(line1,  { x: vw, opacity: 0 });
        gsap.set(prefix, { x: -vw, opacity: 0 });
        gsap.set(seen,   { scale: 0.2, opacity: 0, y: seenY, transformOrigin: '50% 50%' });

        gsap.timeline()
          .to(line1,  { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 0)
          .to(prefix, { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 0.15)
          .to(seen,   { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.8)' }, '>-0.1');
      }

      // Background scroll-linked timeline: frame sequence, manifesto exit, canvas fade
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=500vh',
          scrub: 1.5,
          onUpdate: (self) => {
            const p = self.progress;
            targetFrameRef.current = p * (FRAME_COUNT - 1);
            zoomRef.current = 1 + p * 0.08;
            if (vignetteRef.current) {
              const vp = Math.min(1, p * 2);
              vignetteRef.current.style.opacity = String(0.4 + vp * 0.5);
            }
            (window as any).__heroWake?.();
          },
        },
      });

      // Manifesto exit / entry — deterministic onEnter / onLeaveBack triggers
      // instead of scrub. This avoids state-capture races (StrictMode double-mount,
      // intro animation still running, etc.) that would otherwise leave the
      // manifesto half-restored when scrolling back to the top.
      if (line1 && prefix && seen) {
        ScrollTrigger.create({
          trigger: container,
          start: '6% top',
          onEnter: () => {
            gsap.to(line1,  { x: vw,  opacity: 0, duration: 0.6, ease: 'power3.in', overwrite: 'auto' });
            gsap.to(prefix, { x: -vw, opacity: 0, duration: 0.6, ease: 'power3.in', overwrite: 'auto' });
            gsap.to(seen,   { scale: 0.2, opacity: 0, y: seenY, duration: 0.6, ease: 'power2.in', overwrite: 'auto' });
          },
          onLeaveBack: () => {
            gsap.to(line1,  { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
            gsap.to(prefix, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
            gsap.to(seen,   { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.6)', overwrite: 'auto' });
          },
        });
      }

      // Canvas fade out (after all frames have played, near end of timeline)
      if (canvasRef.current) {
        tl.to(canvasRef.current, { opacity: 0, duration: 0.08 }, 0.92);
      }

      // Iris expand — clip-path circle grows from 0 to viewport-covering size,
      // revealing the single video layer beneath. 120% guarantees coverage at
      // any aspect ratio (the circle's radius is measured from center to the
      // farthest side).
      if (sceneRef.current) {
        gsap.to(sceneRef.current, {
          clipPath: 'circle(120% at 50% 50%)',
          WebkitClipPath: 'circle(120% at 50% 50%)',
          ease: 'none',
          scrollTrigger: { trigger: container, start: 'top top', end: '+=500vh', scrub: 1 },
        });
      }

      // Background video zoom — applied to a wrapper div, NOT the <video>
      // element. Scaling a video forces per-frame re-rasterization of the
      // decoded picture; scaling a wrapper div composites the already-painted
      // texture cheaply on the GPU.
      if (videoScaleRef.current) {
        gsap.set(videoScaleRef.current, { scale: 1.5 });
        gsap.to(videoScaleRef.current, {
          scale: 1.0, ease: 'sine.inOut',
          scrollTrigger: { trigger: container, start: 'top top', end: 'bottom bottom', scrub: 1.5 },
        });
      }

      // Forced-perspective floor reveal (SEEN → WANTED → REMEMBERED).
      // Headings start almost lying flat on the floor (steep rotateX) and
      // rise into their resting tilt. Drop-shadow on the element reads as
      // the projected floor shadow. Scrubbed both ways so it reverses on
      // scroll-up.
      const groups = gsap.utils.toArray<HTMLElement>('.statement-group');
      groups.forEach((group, i) => {
        const heading = group.querySelector<HTMLElement>('.statement-heading');
        const body    = group.querySelector<HTMLElement>('.statement-body');
        const depth   = POINTS[i]?.depth ?? { restRX: 50, restScale: 0.9, restZ: 0 };

        if (heading) {
          // Only transform + opacity in the scrub tween — these are
          // GPU-composite cheap. filter (blur + dual drop-shadow) on a
          // 320px headline forced full re-rasterization per scroll pixel,
          // brutal on Safari. The resting drop-shadow stays on via CSS.
          gsap.fromTo(
            heading,
            {
              rotateX: 86,
              z: depth.restZ - 600,
              scale: depth.restScale * 0.55,
              opacity: 0,
            },
            {
              rotateX: depth.restRX,
              z: depth.restZ,
              scale: depth.restScale,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: group,
                start: 'top 95%',
                end: 'center 40%',
                scrub: 1.6,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (body) {
          gsap.fromTo(
            body,
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1, ease: 'none',
              scrollTrigger: { trigger: group, start: 'top 80%', end: 'top 45%', scrub: 1.2 },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [framesReady]);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Custom cursor — mix-blend-mode: difference forced a per-mousemove
          recomposite of every pixel behind the cursor across the whole
          viewport (especially expensive on Safari, where blend modes are
          off the GPU fast path). Replaced with a high-contrast double-ring:
          white outer border + inset dark shadow ring stays legible on any
          background while staying on the GPU compositor. */}
      <div ref={cursorRef} className="cinema-cursor" style={{
        position: 'fixed', top: 0, left: 0, width: 24, height: 24,
        borderRadius: '50%',
        border: '1.5px solid white',
        boxShadow: 'inset 0 0 0 1.5px rgba(0,0,0,0.45)',
        pointerEvents: 'none', zIndex: 9999,
        opacity: 0, transition: 'opacity 0.2s',
      }} />

      {!framesReady && (
        <div style={{
          position: 'fixed', inset: 0, background: '#000', zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 24,
        }}>
          <div style={{ width: 200, height: 1, background: 'rgba(255,255,255,0.15)', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: 0, width: `${loadProgress * 100}%`,
              background: 'rgba(255,255,255,0.9)', transition: 'width 0.15s ease-out',
            }} />
          </div>
          <span style={{
            fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase',
          }}>
            TUNING SIGNAL · {Math.round(loadProgress * 100)}%
          </span>
        </div>
      )}

      {/* Background audio — looped through hero, paused once user scrolls past.
          preload="none" + no autoPlay attribute: the 1MB file is NOT fetched
          on page load. tryPlay() in the IntersectionObserver flips preload to
          'auto' before calling play(), so it only downloads when the hero is
          actually visible (and even then, only after audio is unlocked). */}
      <audio ref={audioRef} src="/Batman%20Opening%20Theme%20with%20Batgirl.mp3" loop preload="none" />

      {/* Main Container */}
      <div ref={containerRef} className="relative w-full bg-black min-h-[400vh]">
        
        {/* Sticky Background (Frames, blob, video) */}
        <div ref={stickyBgRef} className="sticky top-0 h-[100vh] w-full overflow-hidden z-10 bg-black">
          {/* Image sequence canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] block" style={{ transform: 'translateZ(0)' }} />

          {/* Vignette */}
          <div ref={vignetteRef} className="absolute inset-0 z-[2] opacity-40 pointer-events-none" 
               style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.92) 100%)' }} />

          {/* Scanlines + film grain combined into one tileable WebP. Was two
              separate layers: a repeating-linear-gradient + an inline SVG noise.
              Gradients re-rasterize per resize; the inline SVG was decoded into
              memory as a texture anyway. One WebP cached as a single texture is
              cheaper for the compositor and removes one full-screen layer.
              Note: the CRT-burn radial-gradient that used to sit at z-[5] was
              redundant with the vignette at z-[2] and has been dropped. */}
          <div
            className="absolute inset-0 z-[3] pointer-events-none opacity-25"
            style={{
              backgroundImage: 'url(/grain-scanlines.webp)',
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
            }}
          />

          {/* Manifesto */}
          <div ref={manifestoRef} className="absolute inset-0 z-[20] flex flex-col items-center justify-center text-center px-[8vw] pointer-events-none overflow-hidden">
            <span ref={line1Ref} className="manifesto-line block text-[clamp(3.9rem,10.4vw,10rem)] lg:text-[clamp(4rem,10.4vw,13rem)] leading-[0.92] font-[800] tracking-[-0.03em] text-white font-['Embolism_Spark','Helvetica_Neue',Arial,sans-serif]">We create the unseen,</span>
            <span className="manifesto-line block text-[clamp(3.9rem,10.4vw,10rem)] lg:text-[clamp(4rem,10.4vw,13rem)] leading-[0.92] font-[800] tracking-[-0.03em] text-white font-['Embolism_Spark','Helvetica_Neue',Arial,sans-serif]">
              <span ref={prefixRef} className="inline-block">so your brand becomes</span>
              {' '}
              <em ref={seenRef} className="inline-block not-italic whitespace-nowrap">
                the <span className="text-[#9BE12C]">seen.</span>
              </em>
            </span>
          </div>

          {/* Single Video — masked by the growing SVG blob. Once the mask
              exceeds the viewport the video covers everything, so no second
              video element is needed for fallback. Scale is applied to the
              wrapper div, not the <video>, to keep video pixels on the GPU
              fast path. */}
          <div ref={sceneRef} className="absolute inset-0 z-[25] pointer-events-none" style={{ willChange: 'clip-path' }}>
            <div ref={videoScaleRef} className="absolute inset-0" style={{ transformOrigin: 'center center', willChange: 'transform' }}>
              <video ref={maskedVideoRef} autoPlay muted loop playsInline preload="metadata"
                     className="bg-video absolute inset-0 w-full h-full object-cover">
                <source src="/video-background-scroll.webm" type="video/webm" />
                <source src="/video-background-scroll.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Static Scrolling Items (over the sticky background) */}
        <div className="relative z-[30] w-full" style={{ marginTop: '50vh' }}>
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 pb-[20vh]">
            {POINTS.map((point, i) => (
              <section
                key={i}
                className="statement-group min-h-[100vh] flex flex-col justify-center items-center text-center gap-6 md:gap-10"
                style={{ perspective: '900px', perspectiveOrigin: '50% 35%' }}
              >
                <h2
                  className="statement-heading text-[clamp(2.6rem,15vw,20rem)] leading-[0.78] font-normal tracking-[0.02em] uppercase text-white whitespace-nowrap"
                  style={{
                    fontFamily: "'Bebas Neue', 'Helvetica Neue', Arial, sans-serif",
                    transformStyle: 'preserve-3d',
                    transformOrigin: '50% 100%',
                    // willChange only on what we actually animate — filter is now static.
                    willChange: 'transform, opacity',
                    // Single drop-shadow (was two stacked) — cuts shadow paint cost ~50%
                    // while still giving the "floor projection" cue.
                    filter: 'drop-shadow(0 18px 22px rgba(0,0,0,0.78))',
                  }}
                >
                  {point.heading}
                </h2>
                <p className="statement-body text-[clamp(1.1rem,1.8vw,1.6rem)] leading-relaxed text-white/80 max-w-[42ch] mx-auto font-['Helvetica_Neue',Arial,sans-serif]">
                  {point.body}
                </p>
              </section>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default CinematicHero;
