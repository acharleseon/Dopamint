import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    cta: 'Start free',
    popular: false,
    features: [
      '1,000 sessions/month',
      '128MB memory per agent',
      'Community support',
      'Shared infrastructure',
      'Basic analytics',
    ],
  },
  {
    name: 'Production',
    price: '$249',
    period: '/mo',
    cta: 'Start building',
    popular: true,
    features: [
      '50,000 sessions/month',
      '2GB memory per agent',
      'Priority support (24h)',
      'Dedicated runtime',
      'Advanced analytics',
      'Custom voice models',
      'Webhook integrations',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    cta: 'Contact us',
    popular: false,
    features: [
      'Unlimited sessions',
      'Unlimited memory',
      'Dedicated account manager',
      'On-premise deployment',
      'SLA guarantees',
      'Custom integrations',
      'SOC 2 compliance',
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
    <section ref={sectionRef} className="section" id="pricing">
      <div className="container">
        <div className="price-header" style={{ opacity: 0, textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="material-symbols-outlined">payments</span>
            PRICING
          </div>
          <h2 className="section-title" style={{ margin: '0 auto var(--space-2xl)' }}>
            <ScrambledText radius={120} duration={1.0} speed={0.45}>
              Scale from prototype to planet.
            </ScrambledText>
          </h2>
        </div>

        <div className="price-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)', alignItems: 'start' }}>
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="card price-card iridescent-glow"
              style={{
                opacity: 0,
                padding: 'var(--space-2xl) var(--space-xl)',
                borderColor: tier.popular ? 'rgba(129, 94, 248, 0.4)' : 'var(--border)',
                background: tier.popular ? 'rgba(129, 94, 248, 0.03)' : 'var(--bg-surface)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Popular bar */}
              {tier.popular && (
                <div style={{
                  position: 'absolute', top: -1, left: 0, right: 0, height: 2,
                  background: 'linear-gradient(90deg, var(--purple), var(--teal), var(--blue))',
                }} />
              )}

              {/* Ghost corner icon */}
              <span
                className="material-symbols-outlined"
                style={{
                  position: 'absolute', top: 'var(--space-lg)', right: 'var(--space-lg)',
                  fontSize: 40, opacity: 0.04,
                }}
              >
                {tier.popular ? 'diamond' : 'hexagon'}
              </span>

              {/* Popular badge */}
              {tier.popular && (
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-label)', fontSize: '10px',
                  textTransform: 'uppercase', letterSpacing: '0.15em',
                  color: 'var(--purple)', marginBottom: 'var(--space-md)',
                  padding: '3px 8px',
                  border: '1px solid rgba(129,94,248,0.3)',
                  alignSelf: 'flex-start',
                }}>
                  Most Popular
                </span>
              )}

              {/* Tier name */}
              <h3 style={{
                fontFamily: 'var(--font-headline)', fontSize: '1rem',
                fontWeight: 600, color: 'var(--text-secondary)',
                marginBottom: 'var(--space-sm)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                {tier.name}
              </h3>

              {/* Price */}
              <div style={{
                fontFamily: 'var(--font-headline)', fontSize: '3rem',
                fontWeight: 900, lineHeight: 1,
                marginBottom: 'var(--space-xl)',
                display: 'flex', alignItems: 'baseline', gap: 4,
              }}>
                {tier.price}
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 400 }}>{tier.period}</span>
              </div>

              {/* CTA */}
              <button
                className={tier.popular ? 'btn btn-primary' : 'btn btn-outline'}
                style={{ width: '100%', marginBottom: 'var(--space-xl)', justifyContent: 'center' }}
              >
                {tier.cta}
              </button>

              {/* Features */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-lg)', flex: 1 }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {tier.features.map((f, fi) => (
                    <li key={fi} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5,
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: tier.popular ? 'var(--purple)' : 'var(--text-dim)',
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
          .price-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .price-grid .price-card:last-child {
            grid-column: 1 / -1;
            max-width: 420px;
            margin: 0 auto;
            width: 100%;
          }
        }
        @media (max-width: 640px) {
          .price-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; }
          .price-grid .price-card:last-child { grid-column: auto; max-width: none; }
        }
      `}</style>
    </section>
  );
}
