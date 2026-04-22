import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';

gsap.registerPlugin(ScrollTrigger);

const USE_CASES = [
  {
    title: 'Mental Wellbeing',
    icon: 'favorite',
    desc: 'Dopamint delivers an emotional companion that remembers who you are, tracks patterns over time, and shows up consistently.',
  },
  {
    title: 'Creator Economy',
    icon: 'stars',
    desc: 'Dopamint turns audience scale into personalised relationships that sustains every conversation, and keeps monetisation running continuously.',
  },
  {
    title: 'EdTech',
    icon: 'school',
    desc: 'Dopamint gives every learner a persistent AI tutor, one that retains progress, and adapts to gaps.',
  },
  {
    title: 'Service Front',
    icon: 'support_agent',
    desc: 'Dopamint carries full customer history across every session, no repeated context, no cold handoffs, no lost continuity.',
  },
];

const OUTPUT_TYPES = [
  { label: 'Text', icon: 'text_fields', desc: 'Generate text responses' },
  { label: 'Image', icon: 'image', desc: 'Generate images of characters' },
  { label: 'Audio', icon: 'graphic_eq', desc: 'Generate realistic voices' },
  { label: 'Video', icon: 'videocam', desc: 'Generate video scenes' },
];

export function WhatIsDopamint() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.wid-header', { y: 25, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });

      gsap.fromTo('.wid-card', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: '.wid-grid', start: 'top 80%', once: true },
      });

      gsap.fromTo('.wid-output', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: '.wid-outputs', start: 'top 85%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="what-is" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <div className="wid-header" style={{ opacity: 0, marginBottom: 'var(--space-xl)' }}>
          <div className="section-label">
            <span className="material-symbols-outlined">help_center</span>
            WHAT IS DOPAMINT
          </div>
          <h2 className="section-title">
            <ScrambledText radius={120} duration={1.0} speed={0.45}>
              One API. Infinite identities.
            </ScrambledText>
          </h2>

          {/* Badges under title */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
            {['API', 'No-code', 'Chat Now'].map((badge) => (
              <span
                key={badge}
                style={{
                  padding: '5px 14px',
                  background: 'var(--color-primary)',
                  border: '1px solid var(--color-text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          <div style={{ maxWidth: 700 }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1.2rem',
              color: 'var(--color-text)', lineHeight: 1.6,
              fontWeight: 500, marginBottom: 'var(--space-md)'
            }}>
              Smart AI is everywhere. AI that stays is not.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: 'var(--color-text-muted)', lineHeight: 1.75,
              fontWeight: 300, marginBottom: 'var(--space-md)'
            }}>
              Every team building a companion product is engineering memory, identity, and session continuity
              from scratch before writing a single line of product logic.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1.4rem',
              color: 'var(--color-text)', lineHeight: 1.75,
              fontWeight: 800,

            }}>
              Dopamint is that layer, already built. Memory, voice, persistent identity wired into your product
              at runtime. One integration.
            </p>
          </div>
        </div>

        {/* Use Case Cards */}
        <div className="wid-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
          {USE_CASES.map((uc, i) => (
            <div
              key={i}
              className="wid-card"
              style={{
                opacity: 0,
                padding: 'var(--space-xl)',
                background: 'var(--color-primary)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 36, height: 36, flexShrink: 0,
                  background: 'var(--color-text)',
                  border: '1px solid var(--color-text)',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>{uc.icon}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.1rem',
                  fontWeight: 800, color: 'var(--color-text)',
                  letterSpacing: '-0.02em', lineHeight: 1,
                }}>
                  {uc.title}
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '14px',
                color: 'var(--color-text-muted)', lineHeight: 1.7,
                margin: 0, fontWeight: 300,
              }}>
                {uc.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Output Types */}
        <div
          className="wid-outputs"
          style={{
            border: '2px solid var(--color-text)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}>
            {OUTPUT_TYPES.map((out, i) => (
              <div
                key={i}
                className="wid-output"
                style={{
                  opacity: 0,
                  padding: 'var(--space-xl)',
                  borderRight: i < OUTPUT_TYPES.length - 1 ? '1px solid var(--color-text)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-sm)',
                  background: '#ffffff',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--color-text)' }}>{out.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1rem',
                  fontWeight: 800, color: 'var(--color-text)',
                  letterSpacing: '-0.02em',
                }}>
                  {out.label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px',
                  color: 'var(--color-text-muted)', fontWeight: 300,
                  lineHeight: 1.5,
                }}>
                  {out.desc}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .wid-grid { grid-template-columns: 1fr !important; }
          .wid-outputs > div { grid-template-columns: repeat(2, 1fr) !important; }
          .wid-output { border-right: none !important; border-bottom: 1px solid var(--color-text); }
          .wid-output:last-child { border-bottom: none; }
        }
        @media (max-width: 480px) {
          .wid-outputs > div { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
