import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';
import GridDistortion from './GridDistortion';

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.final-cta-content', { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{
        paddingTop: 'var(--space-4xl)',
        paddingBottom: 'var(--space-4xl)',
        background: 'var(--color-primary)',
        textAlign: 'center',
        borderTop: '2px solid var(--color-text)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6 }}>
        <GridDistortion />
      </div>
      <div className="container final-cta-content" style={{ position: 'relative', zIndex: 1, opacity: 0 }}>
        <h2 style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(3rem, 6vw, 4.5rem)',
          fontWeight: 900,
          color: 'var(--color-text)',
          lineHeight: 0.9,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--space-xl)',
          maxWidth: 800,
          margin: '0 auto var(--space-xl) auto',
        }}>
          <ScrambledText radius={120} duration={1.0} speed={0.45}>
            Build AI systems that persist, adapt, and feel alive.
          </ScrambledText>
        </h2>
        <button className="btn btn-outline" style={{ background: 'var(--color-text)', color: '#ffffff', borderColor: 'var(--color-text)' }}>
          Start Building <span className="material-symbols-outlined" style={{ fontSize: 14, marginLeft: 4 }}>arrow_forward</span>
        </button>
      </div>
    </section>
  );
}
