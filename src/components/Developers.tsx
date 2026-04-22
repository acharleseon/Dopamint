import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';

gsap.registerPlugin(ScrollTrigger);

const PILLS = [
  { label: 'APIs', icon: 'api' },
  { label: 'SDKs', icon: 'code' },
  { label: 'Event Streams', icon: 'stream' },
  { label: 'Memory Controls', icon: 'memory' },
  { label: 'Safety Layer', icon: 'security' },
  { label: 'Model Routing', icon: 'route' },
  { label: 'Deployment Controls', icon: 'rocket_launch' },
  { label: 'Identity API', icon: 'fingerprint' },
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
    <section ref={sectionRef} className="section" id="developers" style={{ background: '#fafafa' }}>
      <div className="container">
        <div className="dev-header" style={{ opacity: 0 }}>
          <div className="section-label">
            <span className="material-symbols-outlined">code</span>
            DEVELOPERS
          </div>
          <h2 className="section-title" style={{ color: 'var(--color-text)' }}>
            <ScrambledText radius={120} duration={1.0} speed={0.45}>
              Built for shipping,<br />not experimenting.
            </ScrambledText>
          </h2>
        </div>

        <div className="dev-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'var(--space-2xl)', alignItems: 'start' }}>
          {/* Left - Capability Pills */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)',
              lineHeight: 1.6, fontWeight: 400
            }}>
              Everything you need to go from idea to production — without duct-taping five services together.
            </p>
            <h4 style={{
              fontFamily: 'var(--font-body)', fontSize: '11px',
              textTransform: 'uppercase', letterSpacing: '0.15em',
              color: 'var(--color-text-dim)', marginBottom: 'var(--space-lg)',
              fontWeight: 700,
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
                    background: 'var(--color-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px', fontWeight: 500,
                    color: 'var(--color-text-body)',
                    cursor: 'default', opacity: 0,
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
              border: '2px solid var(--color-text)',
              background: '#0d0d0d',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Yellow top edge */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--color-primary)' }} />

            {/* Editor Header */}
            <div
              style={{
                display: 'flex', alignItems: 'center',
                padding: '10px 14px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                gap: 'var(--space-md)',
                marginTop: 3,
              }}
            >
              <div style={{ display: 'flex', gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                quickstart.py
              </span>
            </div>

            {/* Code Block */}
            <div ref={codeRef} style={{ padding: 'var(--space-lg)', fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.85, overflow: 'auto' }}>
              {CODE_LINES.map((line, i) => (
                <div
                  key={i}
                  className="code-line"
                  style={{ display: 'flex', gap: 12, opacity: 0, minHeight: line.text ? 'auto' : '1.85em' }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', width: 20, textAlign: 'right', userSelect: 'none', flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  <span style={{
                    color: line.cls === 'kw'  ? 'var(--color-primary)'
                         : line.cls === 'cm'  ? 'rgba(255,255,255,0.3)'
                         : line.cls === 'str' ? '#fffa7d'
                         : line.cls === 'kw2' ? 'var(--color-secondary)'
                         : 'rgba(255,255,255,0.8)',
                    fontStyle: line.cls === 'cm' ? 'italic' : 'normal',
                  }}>
                    {line.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Yellow corner accent */}
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderTop: '2px solid var(--color-primary)', borderLeft: '2px solid var(--color-primary)' }} />
          </div>
        </div>
      </div>

      <style>{`
        .dev-pill {
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .dev-pill:hover {
          background: #ffffff !important;
          border-color: var(--color-text) !important;
          color: var(--color-text) !important;
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
        }
        @media (max-width: 900px) { .dev-content { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .dev-content { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
