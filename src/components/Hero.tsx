import { useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StarBorder from './StarBorder';
import MagnetLines from './MagnetLines';
import ScrambledText from './ScrambledText';

const Spline = lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { icon: 'speed', label: 'LATENCY', value: '< 180', unit: 'MS' },
  { icon: 'bolt', label: 'UPTIME', value: '99.99', unit: '%' },
  { icon: 'memory', label: 'SESSIONS', value: 'PERSISTENT', unit: '' },
  { icon: 'device_hub', label: 'RUNTIME', value: '∞ / ∞', unit: '' },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

      // Headline reveal — animate h1 as one unit, ScrambledText handles char splits
      tl.fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3');

      tl.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3');
      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');

      // Stats stagger
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll('.stat-item');
        tl.fromTo(items, { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 }, '-=0.2');
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      id="runtime"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--nav-height) + var(--space-2xl))',
        paddingBottom: 'var(--space-3xl)',
      }}
    >
      <div className="container">
        <div className="hero-grid">
          {/* Text Column */}
          <div className="hero-text" style={{ position: 'relative', zIndex: 10 }}>
            <span
              ref={badgeRef}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: 'var(--font-label)',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--blue)',
                marginBottom: 'var(--space-lg)',
                opacity: 0,
              }}
            >
              POWERED BY $DOPE
            </span>

            <h1
              ref={headlineRef}
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                marginBottom: 'var(--space-xl)',
                opacity: 0,
              }}
            >
              <ScrambledText radius={130} duration={1.0} speed={0.45}>
                Real-time infrastructure for physical AI.
              </ScrambledText>
            </h1>

            <p
              ref={subtitleRef}
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: 520,
                marginBottom: 'var(--space-2xl)',
                fontWeight: 300,
                letterSpacing: '0.01em',
                opacity: 0,
              }}
            >
              Dopamint powers emotionally intelligent companion products, giving physical and
              virtual agents persistent memory, stable identity, and sub-second voice interactions.
            </p>

            <div ref={ctaRef} style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginBottom: 'var(--space-2xl)', opacity: 0 }}>
              <button className="btn btn-primary">Start building</button>
              <StarBorder
                as="button"
                color="#2F8088"
                speed="5s"
                thickness={2}
                style={{}}
              >
                Build with Core
              </StarBorder>
            </div>

            {/* Stats Row */}
            <div
              ref={statsRef}
              className="stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'var(--space-lg)',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                padding: 'var(--space-md) 0',
              }}
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="stat-item" style={{ opacity: 0 }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontFamily: 'var(--font-label)',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--text-dim)',
                      marginBottom: 4,
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 13 }}>{stat.icon}</span>
                    {stat.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-label)', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {stat.value}{stat.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Spline 3D Robot Scene */}
          <div className="hero-visual">
            {/* Subtle glow behind Spline */}
            <div
              style={{
                position: 'absolute',
                width: '70%',
                height: '70%',
                top: '15%',
                left: '15%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(129,94,248,0.1) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)',
                filter: 'blur(50px)',
                pointerEvents: 'none',
              }}
            />
            {/* ── MagnetLines — centered on the robot's head ── */}
            <div
              style={{
                position: 'absolute',
                zIndex: 0,
                top: '23%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                opacity: 0.85,
              }}
            >
              <MagnetLines
                rows={6}
                columns={6}
                containerSize="clamp(270px, 45vmin, 480px)"
                lineColor="rgba(200, 80, 220, 0.5)"
                lineColorAlt="rgba(255, 60, 160, 0.45)"
                lineWidth="0.68vmin"
                lineHeight="4.8vmin"
                baseAngle={0}
              />
            </div>

            <Suspense
              fallback={
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 48, color: 'var(--purple)', opacity: 0.2, animation: 'pulse-glow 2s ease infinite' }}
                  >
                    smart_toy
                  </span>
                </div>
              }
            >
              <Spline
                scene="https://prod.spline.design/2l5UPEhPR7xghxRD/scene.splinecode"
                style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
              />
            </Suspense>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-2xl);
          align-items: center;
          min-height: calc(100vh - var(--nav-height) - var(--space-4xl));
        }
        .hero-text {
          max-width: 620px;
        }
        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: min(600px, 70vh);
          margin-left: -30%;
          margin-right: calc(-50vw + 50% - 60px);
          transform: translateX(-14%);
          overflow: visible;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-xl);
          }
          .hero-visual {
            height: min(450px, 55vh);
            margin-right: calc(-50vw + 50% - 40px);
            transform: translateX(-11%);
          }
        }

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-lg);
          }
          .hero-visual {
            height: 340px;
            margin-left: 0;
            margin-right: 0;
            margin-top: var(--space-3xl);
            transform: none;
          }
          .hero-text {
            max-width: 100%;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: var(--space-md) !important;
          }
        }

        @media (max-width: 480px) {
          .hero-visual {
            height: 280px;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: var(--space-sm) var(--space-md) !important;
          }
        }
      `}</style>
    </section>
  );
}
