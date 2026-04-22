import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import ScrambledText from './ScrambledText';

const FLOW = [
  { icon: 'mic', label: 'LIVE VOICE' },
  { icon: 'psychology', label: 'INTERPRETATION' },
  { icon: 'fingerprint', label: 'IDENTITY' },
  { icon: 'output', label: 'OUTPUT' },
  { icon: 'settings_suggest', label: 'ADAPTATION' },
];

const STAGES = [
  { id: '01', icon: 'record_voice_over', title: 'Turn detection', desc: 'Reads the rhythm of conversation. Knows when to speak, when to wait.' },
  { id: '02', icon: 'security', title: 'Safety layer', desc: 'Aligns behavior in real time without interrupting the experience.' },
  { id: '03', icon: 'database', title: 'Memory retrieval', desc: 'Surfaces what matters from past sessions, instantly, in context.' },
  { id: '04', icon: 'badge', title: 'Identity layer', desc: 'Holds the companion\'s personality stable across every session.' },
  { id: '05', icon: 'stream', title: 'Voice & avatar stream', desc: 'Syncs audio, expression, and motion into one seamless output.' },
];

export function Pipeline() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.pipe-label', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      });

      gsap.fromTo('.flow-pill', { x: -25, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.1, duration: 0.45, ease: 'power2.out',
        scrollTrigger: { trigger: '.flow-container', start: 'top 85%', once: true },
      });

      gsap.fromTo('.stage-cell', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: 'power3.out',
        scrollTrigger: { trigger: '.stages-grid', start: 'top 85%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="pipeline" style={{ background: 'var(--color-primary)' }}>
      <div className="container">
        {/* Header */}
        <div
          className="pipe-label"
          style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-sm)',
            marginBottom: 'var(--space-xl)',
            paddingBottom: 'var(--space-md)',
            borderBottom: '2px solid var(--color-text)',
            position: 'relative',
            opacity: 0,
          }}
        >
          <span className="section-label" style={{ marginBottom: 0, color: 'var(--color-primary)', background: 'var(--color-text)' }}>
            <span className="material-symbols-outlined">account_tree</span>
            RUNTIME ARCHITECTURE
          </span>
          <div style={{ position: 'absolute', right: 0, bottom: -2, width: 48, height: 4, background: 'var(--color-text)' }} />
        </div>

        <h2 className="section-title" style={{ color: 'var(--color-text)', marginBottom: 'var(--space-2xl)' }}>
          <ScrambledText radius={120} duration={1.0} speed={0.45}>
            How it works under the hood.
          </ScrambledText>
        </h2>

        {/* Flow Diagram */}
        <div
          className="flow-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--space-md)',
            justifyContent: 'center',
            padding: 'var(--space-xl)',
            background: '#ffffff',
            border: '2px solid var(--color-text)',
            marginBottom: 'var(--space-xl)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle grid pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(90deg, transparent 49px, rgba(13,13,13,0.05) 50px, transparent 51px)',
            backgroundSize: '80px 100%',
            pointerEvents: 'none',
          }} />

          {FLOW.map((item, i) => (
            <div key={i} className="flow-item" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', position: 'relative', zIndex: 1 }}>
              <span
                className="flow-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  border: '1px solid var(--border)',
                  background: 'var(--color-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  opacity: 0,
                  transition: 'all 0.2s ease',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-text)' }}>{item.icon}</span>
                {item.label}
              </span>
              {i < FLOW.length - 1 && (
                <span className="flow-arrow material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-text)' }}>
                  arrow_forward
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Stages Grid */}
        <div
          className="stages-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            border: '2px solid var(--color-text)',
            overflow: 'hidden',
            background: '#ffffff',
          }}
        >
          {STAGES.map((stage, i) => {
            const isHovered = hoveredId === stage.id;
            return (
              <div
                key={stage.id}
                className="stage-cell"
                onMouseEnter={() => setHoveredId(stage.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  padding: 'var(--space-xl)',
                  borderRight: i < STAGES.length - 1 ? '1px solid var(--color-text)' : 'none',
                  background: isHovered ? 'var(--color-text)' : 'transparent',
                  cursor: 'default',
                  transition: 'background 0.2s ease',
                  opacity: 0,
                }}
              >
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontFamily: 'var(--font-body)', fontSize: '11px',
                  color: isHovered ? 'var(--color-primary)' : 'rgba(13,13,13,0.5)',
                  marginBottom: 'var(--space-md)',
                  transition: 'color 0.2s ease',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}>
                  {stage.id}
                  <span className="material-symbols-outlined" style={{ fontSize: 15, opacity: isHovered ? 1 : 0.4, transition: 'opacity 0.2s ease' }}>
                    {stage.icon}
                  </span>
                </div>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem', fontWeight: 800,
                  color: isHovered ? 'var(--color-primary)' : 'var(--color-text)',
                  transition: 'color 0.2s ease',
                  textTransform: 'none',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: 'var(--space-sm)'
                }}>
                  {stage.title}
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: isHovered ? 'rgba(255,231,1,0.8)' : 'var(--color-text-muted)',
                  lineHeight: 1.5,
                  margin: 0,
                  fontWeight: 300,
                  transition: 'color 0.2s ease'
                }}>
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pipeline-section h4 { text-transform: none; }
        @media (max-width: 900px) {
          .stages-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .stage-cell { border-bottom: 1px solid var(--color-text) !important; }
        }
        @media (max-width: 600px) {
          .stages-grid { grid-template-columns: 1fr 1fr !important; }
          .flow-container { flex-direction: column !important; }
          .flow-item { flex-direction: column !important; }
          .flow-arrow { transform: rotate(90deg); }
        }
      `}</style>
    </section>
  );
}
