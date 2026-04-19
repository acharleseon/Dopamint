import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';

gsap.registerPlugin(ScrollTrigger);

const PILLS = [
  { label: 'RESTful APIs', icon: 'api' },
  { label: 'Python SDK', icon: 'code' },
  { label: 'TypeScript SDK', icon: 'javascript' },
  { label: 'Event Streams', icon: 'stream' },
  { label: 'Webhooks', icon: 'webhook' },
  { label: 'CLI Tools', icon: 'terminal' },
  { label: 'Docker Images', icon: 'deployed_code' },
  { label: 'WebSockets', icon: 'electrical_services' },
];

const CODE_LINES = [
  { text: 'from dopamint import DopamintClient', cls: 'kw' },
  { text: '', cls: '' },
  { text: 'client = DopamintClient(api_key="dope_...")', cls: '' },
  { text: '', cls: '' },
  { text: '# Create a persistent companion', cls: 'cm' },
  { text: 'companion = client.companions.create(', cls: '' },
  { text: '    name="Luna",', cls: 'str' },
  { text: '    voice="warm-feminine",', cls: 'str' },
  { text: '    memory_mode="persistent",', cls: 'str' },
  { text: '    identity_anchor=True', cls: 'kw2' },
  { text: ')', cls: '' },
  { text: '', cls: '' },
  { text: '# Start real-time session', cls: 'cm' },
  { text: 'session = companion.connect()', cls: '' },
  { text: 'response = session.speak("Hello, Luna.")', cls: '' },
];

export function Developers() {
  const sectionRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.dev-header', { y: 25, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.55,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      });

      gsap.fromTo('.dev-pill', { y: 15, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.05, duration: 0.35,
        scrollTrigger: { trigger: '.dev-pills', start: 'top 85%', once: true },
      });

      // Code typewriter
      if (codeRef.current) {
        const lines = codeRef.current.querySelectorAll('.code-line');
        gsap.fromTo(lines, { opacity: 0, x: -8 }, {
          opacity: 1, x: 0, stagger: 0.07, duration: 0.25, ease: 'power2.out',
          scrollTrigger: { trigger: codeRef.current, start: 'top 80%', once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="developers">
      <div className="container">
        <div className="dev-header" style={{ opacity: 0 }}>
          <div className="section-label">
            <span className="material-symbols-outlined">code</span>
            DEVELOPERS
          </div>
          <h2 className="section-title">
            <ScrambledText radius={120} duration={1.0} speed={0.45}>
              Built for shipping, not experimenting.
            </ScrambledText>
          </h2>
        </div>

        <div className="dev-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'var(--space-2xl)', alignItems: 'start' }}>
          {/* Left - Capability Pills */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-label)', fontSize: '12px',
              textTransform: 'uppercase', letterSpacing: '0.15em',
              color: 'var(--text-dim)', marginBottom: 'var(--space-lg)',
            }}>
              Infrastructure
            </h4>
            <div className="dev-pills" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
              {PILLS.map((pill, i) => (
                <span
                  key={i}
                  className="dev-pill"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-surface)',
                    fontFamily: 'var(--font-label)',
                    fontSize: '12px', color: 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                    cursor: 'default', opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--purple)';
                    e.currentTarget.style.color = 'var(--purple-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{pill.icon}</span>
                  {pill.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Code Editor */}
          <div
            style={{
              border: '1px solid var(--border)',
              background: 'var(--bg-surface)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Iridescent top edge */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, var(--purple), var(--blue), var(--orange))',
              opacity: 0.5,
            }} />

            {/* Editor Header */}
            <div
              style={{
                display: 'flex', alignItems: 'center',
                padding: '10px 14px',
                borderBottom: '1px solid var(--border)',
                gap: 'var(--space-md)',
              }}
            >
              <div style={{ display: 'flex', gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{
                fontFamily: 'var(--font-label)', fontSize: '11px',
                color: 'var(--text-dim)', letterSpacing: '0.05em',
              }}>
                quickstart.py
              </span>
            </div>

            {/* Code Block */}
            <div ref={codeRef} style={{ padding: 'var(--space-lg)', fontFamily: 'var(--font-label)', fontSize: '13px', lineHeight: 1.85, overflow: 'auto' }}>
              {CODE_LINES.map((line, i) => (
                <div
                  key={i}
                  className="code-line"
                  style={{
                    display: 'flex', gap: 12, opacity: 0,
                    minHeight: line.text ? 'auto' : '1.85em',
                  }}
                >
                  <span style={{ color: 'var(--text-dim)', fontSize: '11px', width: 20, textAlign: 'right', userSelect: 'none', flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  <span style={{
                    color: line.cls === 'kw' ? 'var(--purple-light)'
                         : line.cls === 'cm' ? 'var(--text-dim)'
                         : line.cls === 'str' ? 'var(--orange-light)'
                         : line.cls === 'kw2' ? 'var(--blue-light)'
                         : 'var(--text-secondary)',
                    fontStyle: line.cls === 'cm' ? 'italic' : 'normal',
                  }}>
                    {line.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Corner accents */}
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderTop: '1px solid rgba(129,94,248,0.2)', borderLeft: '1px solid rgba(129,94,248,0.2)' }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dev-content { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .dev-content { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
