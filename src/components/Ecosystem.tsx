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
        scrollTrigger: { trigger: '.eco-outer-box', start: 'top 80%', once: true },
      });

      gsap.fromTo('.eco-card-right', { y: 55, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, delay: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: '.eco-outer-box', start: 'top 80%', once: true },
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

        {/* Single outer bordered container */}
        <div className="eco-outer-box">

          {/* ── DOPEkin Column ── */}
          <div className="eco-col eco-card-left" style={{ opacity: 0 }}>
            {/* Header — top left */}
            <div className="eco-col-header">
              <div
                className="eco-icon-box"
                style={{ borderColor: 'rgba(129, 94, 248, 0.35)', background: 'rgba(129, 94, 248, 0.08)' }}
              >
                <span className="material-symbols-outlined" style={{ color: 'var(--purple)', fontSize: 20 }}>smart_toy</span>
              </div>
              <div>
                <h3 className="eco-product-name">DOPEkin</h3>
                <p className="eco-product-subtitle" style={{ color: 'var(--purple)' }}>AI COMPANION PLATFORM</p>
              </div>
            </div>

            {/* Image */}
            <div className="eco-image-wrap">
              <div className="eco-image-area">
                <Stack
                  randomRotation={true}
                  sensitivity={180}
                  sendToBackOnClick={true}
                  autoplay={true}
                  autoplayDelay={2800}
                  pauseOnHover={true}
                  mobileClickOnly={false}
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
            <div className="eco-cta-wrap">
              <button
                className="btn btn-outline eco-cta"
                style={{ borderColor: 'rgba(129, 94, 248, 0.4)', color: 'var(--purple)' }}
              >
                EXPLORE DOPEKIN
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="eco-divider" />

          {/* ── DOPEtwin Column ── */}
          <div className="eco-col eco-card-right" style={{ opacity: 0 }}>
            {/* Header — top left */}
            <div className="eco-col-header">
              <div
                className="eco-icon-box"
                style={{ borderColor: 'rgba(47, 128, 136, 0.35)', background: 'rgba(47, 128, 136, 0.08)' }}
              >
                <span className="material-symbols-outlined" style={{ color: 'var(--teal)', fontSize: 20 }}>groups</span>
              </div>
              <div>
                <h3 className="eco-product-name">DOPEtwin</h3>
                <p className="eco-product-subtitle" style={{ color: 'var(--teal)' }}>CREATOR MONETIZATION LAYER</p>
              </div>
            </div>

            {/* Image */}
            <div className="eco-image-wrap">
              <div className="eco-image-area" style={{ position: 'relative' }}>
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
                      background: 'linear-gradient(135deg, rgba(47,128,136,0.25), rgba(59,14,232,0.18))',
                      gap: 12, padding: 24,
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--teal)' }}>sync_alt</span>
                      <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center' }}>Your Digital Twin, Earning 24/7</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'center' }}>Deploy anywhere, define how it behaves</p>
                    </div>
                  }
                  gridSize={40}
                  pixelColor="#ffffff"
                  animationStepDuration={0.2}
                  aspectRatio="0%"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    borderRadius: '12px', border: 'none',
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <p className="eco-desc">
              Turn your AI identity into an on-chain asset. Deploy it anywhere, define how it
              behaves, and earn from every interaction even when you're not there.
            </p>

            {/* CTA */}
            <div className="eco-cta-wrap">
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
      </div>

      <style>{`
        /* ── Outer container — one box, two columns ── */
        .eco-outer-box {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          margin-top: var(--space-2xl);
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }

        .eco-outer-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          pointer-events: none;
        }

        /* Vertical divider */
        .eco-divider {
          background: var(--border);
          width: 1px;
          align-self: stretch;
        }

        /* Each column */
        .eco-col {
          display: flex;
          flex-direction: column;
          padding: var(--space-xl) var(--space-xl) var(--space-xl);
          gap: var(--space-lg);
        }

        /* Header row: icon + name/subtitle */
        .eco-col-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          flex-shrink: 0;
        }

        .eco-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .eco-product-name {
          font-family: var(--font-headline);
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 1px;
          color: var(--text-primary);
        }

        .eco-product-subtitle {
          font-family: var(--font-label);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.13em;
        }

        /* Image wrapper: no padding — fills full column width */
        .eco-image-wrap {
          flex-shrink: 0;
        }

        /* Image area: 4:3 aspect ratio */
        .eco-image-area {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: transparent;
          position: relative;
        }

        /* Description */
        .eco-desc {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.75;
          text-align: center;
          padding: 0 var(--space-sm);
          flex: 1;
        }

        /* CTA wrapper — centers the button */
        .eco-cta-wrap {
          display: flex;
          justify-content: center;
          flex-shrink: 0;
        }

        .eco-cta {
          padding: 10px 28px;
          font-size: 12px;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        /* Mobile: stack columns */
        @media (max-width: 768px) {
          .eco-outer-box {
            grid-template-columns: 1fr;
          }
          .eco-divider {
            width: 100%;
            height: 1px;
          }
          .eco-col {
            padding: var(--space-lg);
          }
          .eco-image-wrap {
            padding: 0;
          }
        }
      `}</style>
    </section>
  );
}
