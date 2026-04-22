import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: '01',
    icon: 'psychology',
    title: "The problem with AI isn't intelligence, it's amnesia.",
    desc: 'Every session begins as if nothing came before.',
  },
  {
    id: '02',
    icon: 'favorite',
    title: "A companion that forgets you isn't a companion.",
    desc: "It's a very fast search bar.",
  },
  {
    id: '03',
    icon: 'stacked_line_chart',
    title: 'Real presence needs memory that compounds.',
    desc: "Voice that flows, and identity that doesn't reset at midnight.",
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
      gsap.fromTo('.why-header', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      });

      gsap.fromTo('.why-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: '.why-cards', start: 'top 80%', once: true },
      });

      gsap.fromTo('.cap-item', { x: -20, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: 'power2.out',
        scrollTrigger: { trigger: '.why-caps', start: 'top 85%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="why" style={{ overflow: 'hidden', background: '#fafafa' }}>
      <div className="container">
        <div className="why-header" style={{ opacity: 0, marginBottom: 'var(--space-xl)' }}>
          <div className="section-label">
            <span className="material-symbols-outlined">dataset</span>
            WHY DOPAMINT
          </div>
          <h2 className="section-title">
            <ScrambledText radius={120} duration={1.0} speed={0.45}>
              Built for relationships,<br />not requests.
            </ScrambledText>
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
          {FEATURES.map((f, idx) => (
            <div
              key={f.id}
              className="card card-glow why-card"
              style={{
                opacity: 0,
                padding: 'var(--space-xl)',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
                background: '#ffffff',
                borderColor: 'var(--border)',
                transition: 'all 0.25s ease',
              }}
            >
              {/* Header: icon left, ID right */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40, height: 40,
                    flexShrink: 0,
                    background: idx === 0 ? 'var(--color-primary)' : idx === 1 ? 'var(--color-secondary)' : '#f0f0f0',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-text)' }}>
                    {f.icon}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-text-dim)', letterSpacing: '0.15em', fontWeight: 600 }}>
                  {f.id}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.0, color: 'var(--color-text)', letterSpacing: '-0.03em' }}>
                {f.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{f.desc}</p>
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
            borderTop: '2px solid var(--color-text)',
            paddingTop: 'var(--space-3xl)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', fontWeight: 800, marginBottom: 'var(--space-lg)', letterSpacing: '-0.03em', color: 'var(--color-text)' }}>
                Capabilities
              </h3>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                {CAPABILITIES.map((cap, i) => (
                  <li
                    key={i}
                    className="cap-item"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                      color: 'var(--color-text)', opacity: 0,
                      background: 'var(--color-primary)',
                      padding: '8px 16px',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-text)' }}>
                      {cap.icon}
                    </span>
                    {cap.text}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: 3, height: '100%', background: 'var(--color-primary)' }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.8, paddingLeft: 'var(--space-xl)', fontWeight: 300 }}>
                Dopamint is the infrastructure layer connecting state-of-the-art models to the physical
                world, ensuring latency, memory, and safety guarantees required for real-world deployment.
              </p>
            </div>
          </div>

          <div className="spline-container" style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
            <img
              src={`${import.meta.env.BASE_URL}ai-runtime.png`}
              alt="Dopamint AI Runtime Architecture Diagram"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-cards { grid-template-columns: repeat(2, 1fr) !important; }
          .why-caps { gap: var(--space-xl) !important; }
        }
        @media (max-width: 768px) {
          .why-cards { grid-template-columns: 1fr !important; }
          .why-caps { grid-template-columns: 1fr !important; }
          .spline-container { height: 300px !important; }
        }
      `}</style>
    </section>
  );
}
