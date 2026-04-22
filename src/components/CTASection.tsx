import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DotGrid from './DotGrid';
import ScrambledText from './ScrambledText';

gsap.registerPlugin(ScrollTrigger);

const TAGS = ['Early access', 'Priority visibility', 'Ecosystem rewards'];

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-label', { y: 15, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.fromTo('.cta-heading', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-heading', start: 'top 85%' },
      });

      gsap.fromTo('.cta-tags', { y: 15, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5,
        scrollTrigger: { trigger: '.cta-tags', start: 'top 90%' },
      });

      gsap.fromTo('.cta-form', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: '.cta-form', start: 'top 90%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{
        paddingTop: 'var(--space-2xl)',
        paddingBottom: 'var(--space-2xl)',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-primary)',
      }}
    >
      {/* DotGrid background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.35 }}>
        <DotGrid
          dotSize={5}
          gap={22}
          baseColor="rgba(13,13,13,0.2)"
          activeColor="#0d0d0d"
          proximity={130}
          shockRadius={220}
          shockStrength={4}
          resistance={700}
          returnDuration={1.4}
          style={{}}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top border */}
        <div style={{ height: 2, marginBottom: 'var(--space-lg)', background: 'rgba(13,13,13,0.2)' }} />

        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <div className="cta-label section-label" style={{ justifyContent: 'center', opacity: 0, background: 'var(--color-text)', color: '#ffffff', display: 'inline-flex' }}>
            <span className="material-symbols-outlined">rocket_launch</span>
            TESTNET
          </div>

          <h2
            className="cta-heading"
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(3rem, 5.5vw, 4.5rem)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 0.85,
              marginBottom: 'var(--space-lg)',
              color: 'var(--color-text)',
              opacity: 0,
            }}
          >
            <ScrambledText radius={130} duration={1.1} speed={0.45}>
              Testnet opening soon.
            </ScrambledText>
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: 'var(--color-text)', marginBottom: 'var(--space-2xl)',
            lineHeight: 1.6, fontWeight: 500, maxWidth: 520, margin: '0 auto var(--space-2xl) auto'
          }}>
            Be among the first to build on Dopamint. Early builders get priority access, ecosystem visibility, and $DOPE rewards.
          </p>

          {/* Tags */}
          <div className="cta-tags" style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: 'var(--space-sm)', marginBottom: 'var(--space-2xl)', opacity: 0,
          }}>
            {TAGS.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '5px 14px',
                  border: '1px solid rgba(13,13,13,0.25)',
                  background: 'rgba(13,13,13,0.06)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Email Form */}
          <div className="cta-form" style={{
            display: 'flex', gap: 'var(--space-sm)', maxWidth: 480,
            margin: '0 auto', opacity: 0,
          }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                padding: '14px 16px',
                border: '2px solid var(--color-text)',
                background: '#ffffff',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                transition: 'border-color 0.2s ease',
                outline: 'none',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-text)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-text)'; }}
            />
            <button className="btn" style={{
              background: 'var(--color-text)', color: '#ffffff',
              border: '2px solid var(--color-text)',
              whiteSpace: 'nowrap',
              fontSize: '13px',
              fontWeight: 700,
            }}>
              Join the waitlist
            </button>
          </div>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '11px',
            color: 'rgba(13,13,13,0.55)', marginTop: 'var(--space-md)',
            letterSpacing: '0.05em', fontWeight: 600
          }}>
            Powered by $DOPE.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .cta-form { flex-direction: column !important; }
          .cta-form button { width: 100%; }
        }
      `}</style>
    </section>
  );
}
