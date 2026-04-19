import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';

gsap.registerPlugin(ScrollTrigger);

const AUDIENCES = [
  {
    icon: 'engineering',
    title: 'Companion Product Teams',
    color: 'var(--purple)',
    bullets: [
      'Replace hacky memory workarounds',
      'Ship emotionally coherent AI companions',
      'Scale to millions of unique relationships',
    ],
  },
  {
    icon: 'music_note',
    title: 'Creator Ecosystems',
    color: 'var(--teal)',
    bullets: [
      'Monetize personality at scale',
      'Build interactive fan experiences',
      'Protect creative IP with on-chain identity',
    ],
  },
  {
    icon: 'devices',
    title: 'Consumer Platforms',
    color: 'var(--blue)',
    bullets: [
      'Integrate AI that remembers users',
      'Reduce churn with personalized AI',
      'Privacy-compliant by design',
    ],
  },
];

export function WhoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.who-header', { y: 25, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.fromTo('.who-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.who-grid', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="voice">
      <div className="container">
        <div className="who-header" style={{ opacity: 0 }}>
          <div className="section-label">
            <span className="material-symbols-outlined">diversity_3</span>
            WHO THIS IS FOR
          </div>
          <h2 className="section-title">
            <ScrambledText radius={120} duration={1.0} speed={0.45}>
              One runtime. Infinite applications.
            </ScrambledText>
          </h2>
        </div>

        <div className="who-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)' }}>
          {AUDIENCES.map((a, i) => (
            <div
              key={i}
              className="card card-glow who-card"
              style={{
                opacity: 0,
                cursor: 'default',
                padding: 'var(--space-2xl) var(--space-xl)',
              }}
              onMouseEnter={(e) => {
                const iconEl = e.currentTarget.querySelector('.who-icon') as HTMLElement;
                if (iconEl) iconEl.style.color = a.color;
              }}
              onMouseLeave={(e) => {
                const iconEl = e.currentTarget.querySelector('.who-icon') as HTMLElement;
                if (iconEl) iconEl.style.color = 'var(--text-dim)';
              }}
            >
              <span
                className="material-symbols-outlined who-icon"
                style={{
                  fontSize: 32, color: 'var(--text-dim)',
                  transition: 'color 0.3s ease',
                  display: 'block',
                  marginBottom: 'var(--space-lg)',
                }}
              >
                {a.icon}
              </span>

              <h3 style={{
                fontSize: '1.15rem', fontWeight: 700,
                fontFamily: 'var(--font-headline)',
                marginBottom: 'var(--space-lg)',
              }}>
                {a.title}
              </h3>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {a.bullets.map((b, bi) => (
                  <li key={bi} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6,
                  }}>
                    <span style={{
                      width: 4, height: 4, borderRadius: '50%',
                      background: a.color, flexShrink: 0, marginTop: 7,
                    }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .who-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
