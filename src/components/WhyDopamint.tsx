import { useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';

const Spline = lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: '01',
    icon: 'psychology',
    title: 'AI amnesia is solved.',
    desc: 'No more repetitive context setting. Agents remember past interactions indefinitely.',
    color: 'var(--purple)',
    bg: 'rgba(129,94,248,0.08)',
    border: 'rgba(129,94,248,0.18)'
  },
  {
    id: '02',
    icon: 'favorite',
    title: 'Forgetful companions fail.',
    desc: 'Emotional connection requires continuity. We provide the substrate for long-term bonds.',
    color: 'var(--teal)',
    bg: 'rgba(47,128,136,0.08)',
    border: 'rgba(47,128,136,0.18)'
  },
  {
    id: '03',
    icon: 'stacked_line_chart',
    title: 'Compounding memory.',
    desc: "Interactions build value over time. Each conversation enriches the agent's understanding.",
    color: 'var(--blue)',
    bg: 'rgba(59,14,232,0.08)',
    border: 'rgba(59,14,232,0.18)'
  },
];

const CAPABILITIES = [
  { text: 'Persistent memory', icon: 'memory' },
  { text: 'Stable identity', icon: 'fingerprint' },
  { text: 'Unified output', icon: 'hub' },
  { text: 'Not a model. A runtime.', icon: 'terminal' },
];

export function WhyDopamint() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section label + title
      gsap.fromTo(
        '.why-header',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );

      // Cards stagger
      gsap.fromTo(
        '.why-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.55, ease: 'power3.out',
          scrollTrigger: { trigger: '.why-cards', start: 'top 80%', once: true },
        }
      );

      // Capabilities
      gsap.fromTo(
        '.cap-item',
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: 'power2.out',
          scrollTrigger: { trigger: '.why-caps', start: 'top 85%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="why-header" style={{ opacity: 0 }}>
          <div className="section-label">
            <span className="material-symbols-outlined">dataset</span>
            WHY DOPAMINT
          </div>
          <h2 className="section-title" style={{ position: 'relative', display: 'inline-block' }}>
            <ScrambledText radius={120} duration={1.0} speed={0.45}>
              Built for relationships, not requests.
            </ScrambledText>
            <div style={{
              position: 'absolute', bottom: -8, left: 0,
              width: '33%', height: 1,
              background: 'rgba(129,94,248,0.4)',
            }} />
          </h2>
        </div>

        {/* Feature Cards */}
        <div
          className="why-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-lg)',
            marginBottom: 'var(--space-3xl)',
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className="card card-glow why-card"
              style={{
                opacity: 0,
                padding: 'var(--space-xl)',
                backdropFilter: 'blur(8px)',
                cursor: 'default',
              }}
            >
              {/* Header row: icon left, ID right */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-lg)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  background: f.bg,
                  border: `1px solid ${f.border}`,
                }}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 18, color: f.color, opacity: 0.85 }}
                  >
                    {f.icon}
                  </span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '11px',
                  color: 'var(--text-dim)',
                  letterSpacing: '0.15em',
                }}>
                  {f.id}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 'var(--space-md)', fontFamily: 'var(--font-headline)' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Capabilities + Description */}
        <div
          className="why-caps"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-3xl)',
            alignItems: 'center',
            borderTop: '1px solid var(--border)',
            paddingTop: 'var(--space-3xl)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: '50%', width: 1, height: 48, background: 'var(--border)' }} className="center-divider" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
            <div>
              <h3
                style={{
                  fontSize: '1.3rem', fontWeight: 700, marginBottom: 'var(--space-lg)',
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: 'var(--font-headline)',
                }}
              >
                <span className="material-symbols-outlined" style={{ color: 'var(--purple)' }}>extension</span>
                Capabilities
              </h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                {CAPABILITIES.map((cap, i) => (
                  <li
                    key={i}
                    className="cap-item"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontFamily: 'var(--font-label)', fontSize: '13px',
                      color: 'var(--text-secondary)', opacity: 0,
                      background: 'rgba(255,255,255,0.03)',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: 16,
                        color: 'var(--teal)',
                      }}
                    >
                      {cap.icon}
                    </span>
                    {cap.text}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ position: 'relative' }}>
              <div className="center-divider-line" style={{
                position: 'absolute', left: -16, top: 16,
                width: 2, height: '80%',
                background: 'rgba(129,94,248,0.12)',
              }} />
              <p style={{
                fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8,
                paddingLeft: 'var(--space-xl)',
              }}>
                Dopamint is the infrastructure layer connecting state-of-the-art models to the physical
                world, ensuring latency, memory, and safety guarantees required for real-world deployment.
              </p>
            </div>
          </div>

          <div className="spline-container" style={{ position: 'relative', height: '550px', transform: 'scale(1.25)' }}>
            <Suspense
              fallback={
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 48, color: 'var(--purple)', opacity: 0.2, animation: 'pulse-glow 2s ease infinite' }}
                  >
                    view_in_ar
                  </span>
                </div>
              }
            >
              <Spline
                scene="https://prod.spline.design/HGWtsGJoSsQAbPnb/scene.splinecode"
                style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}
              />
            </Suspense>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-cards { grid-template-columns: repeat(2, 1fr) !important; }
          .why-caps  { gap: var(--space-xl) !important; }
          .center-divider { display: none !important; }
        }
        @media (max-width: 768px) {
          .why-cards { grid-template-columns: 1fr !important; }
          .why-caps { grid-template-columns: 1fr !important; }
          .center-divider, .center-divider-line { display: none !important; }
          .spline-container { height: 350px !important; transform: scale(1) !important; }
        }
      `}</style>
    </section>
  );
}
