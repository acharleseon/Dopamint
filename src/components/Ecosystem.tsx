import { useEffect, useRef, type ReactElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';
import Stack from './Stack';
import PixelTransition from './PixelTransition';

gsap.registerPlugin(ScrollTrigger);

const DOPEKIN_IMAGES = [
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=500&auto=format',
  'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=500&auto=format',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format',
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=500&auto=format',
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

      gsap.fromTo('.eco-card-left', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.eco-cards-grid', start: 'top 80%', once: true },
      });

      gsap.fromTo('.eco-card-right', { y: 55, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, delay: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: '.eco-cards-grid', start: 'top 80%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const dopekinCards: ReactElement[] = DOPEKIN_IMAGES.map((src, i) => (
    <img
      key={i}
      src={src}
      alt={`dopekin-${i + 1}`}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  ));

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

        {/* Two-column card grid */}
        <div className="eco-cards-grid">

          {/* ── DOPEkin Card ── */}
          <div className="card eco-product-card eco-card-left" style={{ opacity: 0 }}>
            {/* Header */}
            <div className="eco-card-header">
              <div className="eco-icon-box" style={{ borderColor: 'rgba(129, 94, 248, 0.35)', background: 'rgba(129, 94, 248, 0.08)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--purple)' }}>smart_toy</span>
              </div>
              <div>
                <h3 className="eco-product-name">DOPEkin</h3>
                <p className="eco-product-subtitle" style={{ color: 'var(--purple)' }}>AI COMPANION PLATFORM</p>
              </div>
            </div>

            {/* Stack Image Component */}
            <div className="eco-image-area">
              <div style={{ width: '100%', height: '100%' }}>
                <Stack
                  randomRotation={true}
                  sensitivity={180}
                  sendToBackOnClick={true}
                  autoplay={true}
                  autoplayDelay={2800}
                  pauseOnHover={true}
                  mobileClickOnly={true}
                  cards={dopekinCards as never[]}
                />
              </div>
            </div>

            {/* Description */}
            <p className="eco-desc">
              Meet AI companion friends that remember who you are, pick up where you left off,
              and grow more present with every conversation.
            </p>

            {/* CTA */}
            <button
              className="btn btn-outline eco-cta"
              style={{ borderColor: 'rgba(129, 94, 248, 0.4)', color: 'var(--purple)' }}
            >
              EXPLORE DOPEKIN
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
            </button>
          </div>

          {/* ── DOPEtwin Card ── */}
          <div className="card eco-product-card eco-card-right" style={{ opacity: 0 }}>
            {/* Header */}
            <div className="eco-card-header">
              <div className="eco-icon-box" style={{ borderColor: 'rgba(47, 128, 136, 0.35)', background: 'rgba(47, 128, 136, 0.08)' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--teal)' }}>groups</span>
              </div>
              <div>
                <h3 className="eco-product-name">DOPEtwin</h3>
                <p className="eco-product-subtitle" style={{ color: 'var(--teal)' }}>CREATOR MONETIZATION LAYER</p>
              </div>
            </div>

            {/* PixelTransition Image Component */}
            <div className="eco-image-area">
              <PixelTransition
                firstContent={
                  <img
                    src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=500&auto=format"
                    alt="dopetwin default"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                }
                secondContent={
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(47,128,136,0.2), rgba(59,14,232,0.15))',
                    gap: 12, padding: 24,
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--teal)' }}>sync_alt</span>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center' }}>Your Digital Twin, Earning 24/7</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'center' }}>Deploy anywhere, define how it behaves</p>
                  </div>
                }
                gridSize={10}
                pixelColor="rgba(47, 128, 136, 0.7)"
                animationStepDuration={0.35}
                aspectRatio="75%"
                style={{ width: '100%', height: '100%', borderRadius: '12px', border: 'none' }}
              />
            </div>

            {/* Description */}
            <p className="eco-desc">
              Turn your AI identity into an on-chain asset. Deploy it anywhere, define how it
              behaves, and earn from every interaction even when you're not there.
            </p>

            {/* CTA */}
            <button
              className="btn btn-outline eco-cta"
              style={{ borderColor: 'rgba(47, 128, 136, 0.4)', color: 'var(--teal)' }}
            >
              EXPLORE DOPETWIN
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
            </button>
          </div>

        </div>
      </div>

      <style>{`
        .eco-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-xl);
          margin-top: var(--space-2xl);
        }

        .eco-product-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          padding: var(--space-xl);
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .eco-product-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }

        .eco-product-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px);
        }

        .eco-card-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          flex-shrink: 0;
        }

        .eco-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .eco-icon-box .material-symbols-outlined {
          font-size: 22px;
        }

        .eco-product-name {
          font-family: var(--font-headline);
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 2px;
          color: var(--text-primary);
        }

        .eco-product-subtitle {
          font-family: var(--font-label);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .eco-image-area {
          width: 100%;
          height: 240px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
          background: rgba(255,255,255,0.03);
        }

        .eco-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.7;
          flex: 1;
          text-align: center;
        }

        .eco-cta {
          width: 100%;
          justify-content: center;
          padding: 12px 20px;
          font-size: 11px;
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .eco-cards-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }
        }
      `}</style>
    </section>
  );
}
