import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    name: 'DOPEkin',
    subtitle: 'AI Companion Platform',
    color: 'var(--purple)',
    glowColor: 'rgba(129, 94, 248, 0.08)',
    borderColor: 'rgba(129, 94, 248, 0.25)',
    features: ['Persistent emotional memory', 'Voice & avatar pipeline', 'Multi-agent relationships', 'Privacy-first architecture'],
    icon: 'smart_toy',
  },
  {
    name: 'DOPEtwin',
    subtitle: 'Creator Monetization Layer',
    color: 'var(--blue)',
    glowColor: 'rgba(59, 130, 246, 0.08)',
    borderColor: 'rgba(59, 130, 246, 0.25)',
    features: ['Digital twin creation', 'Revenue sharing & licensing', 'Fan interaction loops', 'Creator analytics dashboard'],
    icon: 'groups',
  },
];

export function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.eco-header', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.65,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      });

      gsap.fromTo('.eco-card-left', { y: 35, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.eco-cards', start: 'top 80%', once: true },
      });

      gsap.fromTo('.eco-card-right', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, delay: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.eco-cards', start: 'top 80%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="protocol">
      <div className="container">
        <div className="eco-header" style={{ opacity: 0 }}>
          <div className="section-label">
            <span className="material-symbols-outlined">lan</span>
            ECOSYSTEM
          </div>
          <h2 className="section-title">
            <ScrambledText radius={120} duration={1.0} speed={0.45}>
              Two products. One runtime underneath.
            </ScrambledText>
          </h2>
        </div>

        {/* Main Card Container */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            padding: 'var(--space-xl)',
            position: 'relative',
          }}
        >
          {/* Subtle purple glow on background */}
          <div style={{
            position: 'absolute', top: -1, left: '30%', right: '30%', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(129,94,248,0.5), transparent)',
          }} />

          <div className="eco-cards" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0, position: 'relative' }}>
            {PRODUCTS.map((p, i) => (
            <div
                key={p.name}
                className={`card eco-product-card ${i === 0 ? 'eco-card-left' : 'eco-card-right'}`}
                style={{
                  background: p.glowColor,
                  borderColor: p.borderColor,
                  padding: 'var(--space-2xl) var(--space-xl)',
                  opacity: 0,
                  borderTop: i > 0 ? '1px solid var(--border)' : undefined,
                  display: 'flex',
                  gap: 'var(--space-3xl)',
                  alignItems: 'center',
                }}
              >
                {/* Col 1 — Branding */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  flexShrink: 0,
                  minWidth: 200,
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 40, height: 40,
                    background: p.glowColor,
                    border: `1px solid ${p.borderColor}`,
                    flexShrink: 0,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 22, color: p.color }}>{p.icon}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.2rem', fontWeight: 800, marginBottom: 3 }}>
                      {p.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-label)', fontSize: '10px', color: p.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {p.subtitle}
                    </p>
                  </div>
                </div>

                {/* Col 2 — Features */}
                <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {p.features.map((f, fi) => (
                    <li key={fi} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontSize: '13px', color: 'var(--text-secondary)',
                    }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Col 3 — CTA */}
                <button
                  className="btn btn-outline"
                  style={{
                    borderColor: p.borderColor, color: p.color,
                    padding: '10px 20px', fontSize: '11px',
                    flexShrink: 0, whiteSpace: 'nowrap',
                    marginLeft: 'auto',
                  }}
                >
                  EXPLORE {p.name.toUpperCase()}
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>

      <style>{`
        .eco-product-card {
          transition: border-color 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .eco-product-card:hover {
          border-color: rgba(255, 255, 255, 0.5) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .eco-cards .eco-product-card { flex-direction: column !important; gap: var(--space-lg) !important; }
        }
        @media (max-width: 768px) {
          .eco-cards .eco-product-card { flex-direction: column !important; gap: var(--space-lg) !important; }
        }
      `}</style>
    </section>
  );
}
