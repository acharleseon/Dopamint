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

      // Animate heading as a single unit — ScrambledText handles char splits
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
      style={{ paddingBottom: 'var(--space-3xl)', position: 'relative', overflow: 'hidden' }}
    >
      {/* DotGrid background — starts after the gradient divider line */}
      <div style={{ position: 'absolute', top: 'calc(var(--space-4xl) + 1px)', left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <DotGrid
          dotSize={5}
          gap={22}
          baseColor="rgba(129,94,248,0.18)"
          activeColor="#815ef8"
          proximity={130}
          shockRadius={220}
          shockStrength={4}
          resistance={700}
          returnDuration={1.4}
          style={{}}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top gradient border */}
        <div style={{
          height: 1, marginBottom: 'var(--space-4xl)',
          background: 'linear-gradient(90deg, transparent, rgba(129,94,248,0.5), rgba(59,130,246,0.3), transparent)',
        }} />

        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <div className="cta-label section-label" style={{ justifyContent: 'center', opacity: 0 }}>
            <span className="material-symbols-outlined">flag</span>
            END OF SPEC
          </div>

          <h2
            className="cta-heading"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 900,
              marginBottom: 'var(--space-xl)',
              fontFamily: 'var(--font-headline)',
              opacity: 0,
            }}
          >
            <ScrambledText radius={130} duration={1.1} speed={0.45}>
              Get in before it opens.
            </ScrambledText>
          </h2>

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
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-label)',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
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
                border: '1px solid var(--border)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-label)',
                fontSize: '13px',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--purple)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            />
            <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Join the waitlist
            </button>
          </div>

          <p style={{
            fontFamily: 'var(--font-label)', fontSize: '11px',
            color: 'var(--text-dim)', marginTop: 'var(--space-md)',
            letterSpacing: '0.05em',
          }}>
            No spam. Early access only.
          </p>
        </div>
      </div>
    </section>
  );
}
