import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FLOW = [
  { icon: 'mic', label: 'User voice' },
  { icon: 'psychology', label: 'Interpretation' },
  { icon: 'fingerprint', label: 'Identity' },
  { icon: 'output', label: 'Output' },
  { icon: 'settings_suggest', label: 'Adaptation' },
];

const STAGES = [
  { id: '01', icon: 'record_voice_over', title: 'Turn detection' },
  { id: '02', icon: 'security', title: 'Safety layer' },
  { id: '03', icon: 'database', title: 'Memory retrieval' },
  { id: '04', icon: 'badge', title: 'Identity layer' },
  { id: '05', icon: 'stream', title: 'Voice & avatar stream' },
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
    <section ref={sectionRef} className="section">
      <div className="container">
        {/* Header */}
        <div
          className="pipe-label"
          style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-sm)',
            marginBottom: 'var(--space-xl)',
            paddingBottom: 'var(--space-md)',
            borderBottom: '1px solid var(--border)',
            position: 'relative',
            opacity: 0,
          }}
        >
          <span className="section-label" style={{ marginBottom: 0 }}>
            <span className="material-symbols-outlined">account_tree</span>
            RUNTIME ARCHITECTURE / PIPELINE
          </span>
          <div style={{
            position: 'absolute', right: 0, bottom: 0,
            width: 48, height: 1, background: 'var(--purple)',
          }} />
        </div>

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
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            marginBottom: 'var(--space-xl)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle vertical line grid pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(90deg, transparent 49px, rgba(129,94,248,0.04) 50px, transparent 51px)',
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
                  padding: '6px 14px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  fontFamily: 'var(--font-label)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  opacity: 0,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{item.icon}</span>
                {item.label}
              </span>
              {i < FLOW.length - 1 && (
                <span className="flow-arrow material-symbols-outlined" style={{ fontSize: 18, color: 'var(--purple)' }}>
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
            border: '1px solid var(--border)',
            overflow: 'hidden',
            background: 'var(--bg-surface-low)',
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
                  borderRight: i < STAGES.length - 1 ? '1px solid var(--border)' : 'none',
                  background: isHovered ? 'rgba(129,94,248,0.06)' : 'transparent',
                  cursor: 'default',
                  transition: 'background 0.25s ease',
                  opacity: 0,
                }}
              >
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontFamily: 'var(--font-label)', fontSize: '11px',
                  color: isHovered ? 'var(--purple)' : 'var(--text-dim)',
                  marginBottom: 'var(--space-md)',
                  transition: 'color 0.25s ease',
                }}>
                  {stage.id}
                  <span className="material-symbols-outlined" style={{ fontSize: 15, opacity: isHovered ? 1 : 0.35, transition: 'opacity 0.25s ease' }}>
                    {stage.icon}
                  </span>
                </div>
                <h4 style={{
                  fontSize: '1rem', fontWeight: 700,
                  color: isHovered ? 'var(--purple-light)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-headline)',
                  transition: 'color 0.25s ease',
                }}>
                  {stage.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stages-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .stage-cell { border-bottom: 1px solid var(--border) !important; }
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
