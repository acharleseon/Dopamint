import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';

gsap.registerPlugin(ScrollTrigger);

const AUDIENCES = [
  {
    icon: 'devices',
    title: 'Consumer App Founders',
    accentColor: 'var(--color-primary)',
    desc: 'Focus on the experience. Skip rebuilding the core.',
  },
  {
    icon: 'movie',
    title: 'Media & IP Owners',
    accentColor: 'var(--color-secondary)',
    desc: 'Turn characters into interactive entities with memory and voice.',
  },
  {
    icon: 'stars',
    title: 'Creators & Influencers',
    accentColor: 'var(--color-primary)',
    desc: 'Deploy a version of yourself that scales — and earns.',
  },
  {
    icon: 'science',
    title: 'AI Researchers',
    accentColor: 'var(--color-secondary)',
    desc: 'Work with long-session memory and real interaction data.',
  },
  {
    icon: 'sports_esports',
    title: 'Gaming & Virtual Worlds',
    accentColor: 'var(--color-primary)',
    desc: 'Create NPCs and in-game companions that remember, respond, and evolve in real time.',
  },
  {
    icon: 'business_center',
    title: 'Enterprise & CX Teams',
    accentColor: 'var(--color-secondary)',
    desc: 'Launch AI agents for support and engagement with persistent memory and natural interaction.',
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
    <section ref={sectionRef} className="section" id="voice" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <div className="who-header" style={{ opacity: 0 }}>
          <div className="section-label">
            <span className="material-symbols-outlined">diversity_3</span>
            WHO THIS IS FOR
          </div>
          <h2 className="section-title">
            <ScrambledText radius={120} duration={1.0} speed={0.45}>
              Who's already building on it.
            </ScrambledText>
          </h2>
        </div>

        <div className="who-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)' }}>
          {AUDIENCES.map((a, i) => (
            <div
              key={i}
              className="who-card"
              style={{
                opacity: 0,
                cursor: 'default',
                padding: 'var(--space-2xl) var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-lg)',
                background: '#ffffff',
                border: '1px solid var(--border)',
                transition: 'all 0.25s var(--ease-out)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-text)';
                e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: a.accentColor }} />

              <span
                className="material-symbols-outlined who-icon"
                style={{
                  fontSize: 36, color: 'var(--color-text)',
                  display: 'block',
                  marginTop: 4,
                }}
              >
                {a.icon}
              </span>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem', fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
              }}>
                {a.title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '14px',
                color: 'var(--color-text-muted)', lineHeight: 1.6,
                fontWeight: 300, margin: 0,
              }}>
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .who-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 1024px) {
          .who-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .who-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
