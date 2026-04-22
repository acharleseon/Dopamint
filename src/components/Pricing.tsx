import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    name: 'BUILD',
    price: '$0',
    period: '/mo',
    cta: 'Start Building →',
    popular: false,
    features: [
      'Usage-based access.',
      'No seat fees.',
      'Public testnet.',
    ],
  },
  {
    name: 'SCALE',
    price: '$249',
    period: '/mo',
    cta: 'Talk to Sales →',
    popular: true,
    features: [
      'Volume pricing.',
      'SLA guarantees.',
      'Priority routing.',
    ],
  },
  {
    name: 'ENTERPRISE',
    price: 'Custom',
    period: '',
    cta: 'Contact Us →',
    popular: false,
    features: [
      'Dedicated infrastructure.',
      'Custom pricing.',
      'Compliance review.',
    ],
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.price-header', { y: 25, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.55,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      });

      gsap.fromTo('.price-card', { y: 35, opacity: 0, scale: 0.97 }, {
        y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: '.price-grid', start: 'top 82%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="pricing" style={{ background: 'var(--color-text)' }}>
      <div className="container">
        <div className="price-header" style={{ opacity: 0 }}>
          <div className="section-label">
            <span className="material-symbols-outlined">payments</span>
            PRICING
          </div>
          <h2 className="section-title" style={{ color: '#ffffff' }}>
            <ScrambledText radius={120} duration={1.0} speed={0.45}>
              Start simple. Scale when it works.
            </ScrambledText>
          </h2>
        </div>

        <div className="price-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)', alignItems: 'start' }}>
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="price-card"
              style={{
                opacity: 0,
                padding: 'var(--space-2xl) var(--space-xl)',
                border: tier.popular ? '2px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.12)',
                background: tier.popular ? 'var(--color-primary)' : 'rgba(255,255,255,0.03)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = tier.popular
                  ? 'var(--yellow-glow)'
                  : '0 8px 32px rgba(255,231,1,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'none';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)', fontSize: '10px',
                  textTransform: 'uppercase', letterSpacing: '0.15em',
                  color: 'var(--color-text)', fontWeight: 700,
                  marginBottom: 'var(--space-md)',
                  padding: '3px 10px',
                  background: 'var(--color-text)',
                  color: 'var(--color-primary)',
                  alignSelf: 'flex-start',
                }}>
                  Most Popular
                </span>
              )}

              {/* Tier name */}
              <h3 style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.15rem',
                fontWeight: 800, color: tier.popular ? 'var(--color-text)' : '#ffffff',
                marginBottom: 'var(--space-sm)',
                letterSpacing: '-0.025em',
                lineHeight: 1,
              }}>
                {tier.name}
              </h3>

              {/* Price */}
              <div style={{
                fontFamily: 'var(--font-heading)', fontSize: '3.5rem',
                fontWeight: 900, lineHeight: 1,
                marginBottom: 'var(--space-xl)',
                color: tier.popular ? 'var(--color-text)' : '#ffffff',
                letterSpacing: '-0.04em',
                display: 'flex', alignItems: 'baseline', gap: 4,
              }}>
                {tier.price}
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 400, opacity: 0.6 }}>{tier.period}</span>
              </div>

              {/* CTA */}
              <button
                className={tier.popular ? 'btn btn-primary' : 'btn btn-outline'}
                style={{
                  width: '100%', marginBottom: 'var(--space-xl)', justifyContent: 'center',
                  ...(tier.popular ? { background: 'var(--color-text)', color: 'var(--color-primary)', borderColor: 'var(--color-text)' } : { borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }),
                }}
              >
                {tier.cta}
              </button>

              {/* Features */}
              <div style={{ borderTop: `1px solid ${tier.popular ? 'rgba(13,13,13,0.2)' : 'rgba(255,255,255,0.1)'}`, paddingTop: 'var(--space-lg)', flex: 1 }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {tier.features.map((f, fi) => (
                    <li key={fi} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      fontFamily: 'var(--font-body)', fontSize: '14px',
                      color: tier.popular ? 'var(--color-text)' : 'rgba(255,255,255,0.7)',
                      lineHeight: 1.5, fontWeight: 300,
                    }}>
                      <span style={{
                        width: 6, height: 6,
                        background: tier.popular ? 'var(--color-text)' : 'var(--color-primary)',
                        flexShrink: 0,
                      }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .price-grid { grid-template-columns: 1fr 1fr !important; }
          .price-grid .price-card:last-child { grid-column: 1 / -1; max-width: 420px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 640px) {
          .price-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; }
          .price-grid .price-card:last-child { grid-column: auto; max-width: none; }
        }
      `}</style>
    </section>
  );
}
