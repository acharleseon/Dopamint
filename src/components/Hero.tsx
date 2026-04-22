import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { icon: 'speed', label: 'LATENCY', value: '< 180', unit: 'MS' },
  { icon: 'bolt', label: 'UPTIME', value: '99.99', unit: '%' },
  { icon: 'memory', label: 'SESSIONS', value: 'PERSISTENT', unit: '' },
  { icon: 'device_hub', label: 'RUNTIME', value: '∞ / ∞', unit: '' },
];

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef    = useRef<HTMLSpanElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
      tl.fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3');
      tl.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3');
      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');

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
        paddingTop: 'calc(var(--nav-height) + var(--space-md))',
        paddingBottom: 'var(--space-xl)',
        background: 'var(--color-bg)',
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
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-text)',
                background: 'var(--color-primary)',
                padding: '4px 12px',
                marginBottom: 'var(--space-lg)',
                opacity: 0,
              }}
            >
              POWERED BY $DOPE
            </span>

            <h1
              ref={headlineRef}
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
                fontWeight: 'bold',
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
                marginBottom: 'var(--space-lg)',
                textTransform: 'uppercase',
                opacity: 0,
              }}
            >
              <ScrambledText radius={130} duration={1.0} speed={0.45}>
                Real-time<br />Infrastructure<br />For AI Companions.
              </ScrambledText>
            </h1>

            <p
              ref={subtitleRef}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.75,
                maxWidth: 500,
                marginBottom: 'var(--space-lg)',
                fontWeight: 300,
                opacity: 0,
              }}
            >
              Dopamint powers emotionally intelligent companion products built for live voice, persistent identity, multimodal generation, long-session engagement, and physical AI embodiment.
              From personal twins to humanoid agents, this is the layer that makes them feel alive.
            </p>

            <div ref={ctaRef} style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginBottom: 'var(--space-md)', opacity: 0 }}>
              <button className="btn btn-yellow">
                Start Building <span className="material-symbols-outlined" style={{ fontSize: 14, marginLeft: 4 }}>arrow_forward</span>
              </button>
              <button className="btn btn-outline">Build with Core</button>
            </div>

            {/* Stats Row */}
            <div
              ref={statsRef}
              className="stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'var(--space-lg)',
                borderTop: '2px solid var(--color-text)',
                borderBottom: '2px solid var(--color-text)',
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
                      fontFamily: 'var(--font-body)',
                      fontSize: '9px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--color-text-dim)',
                      marginBottom: 4,
                      fontWeight: 600,
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>{stat.icon}</span>
                    {stat.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                    {stat.value}{stat.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Banner Image */}
          <div className="hero-visual">
            <img
              src={`${import.meta.env.BASE_URL}banner.png`}
              alt="Dopamint Banner"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--space-2xl);
          align-items: flex-start;
          min-height: calc(100vh - var(--nav-height) - var(--space-4xl));
        }
        .hero-text { max-width: 640px; }
        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          height: min(680px, 80vh);
          border-radius: 8px;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .hero-grid { gap: var(--space-xl); }
          .hero-visual { height: min(520px, 65vh); }
        }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: var(--space-lg); }
          .hero-visual { height: 320px; margin-top: var(--space-xl); border-radius: 6px; }
          .hero-text { max-width: 100%; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: var(--space-md) !important; }
        }

        @media (max-width: 480px) {
          .hero-visual { height: 240px; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: var(--space-sm) var(--space-md) !important; }
        }
      `}</style>
    </section>
  );
}
