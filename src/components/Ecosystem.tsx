import { useEffect, useRef, type ReactElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambledText from './ScrambledText';
import CoverflowGallery from './CoverflowGallery';
import HoverFlipCard from './HoverFlipCard';

gsap.registerPlugin(ScrollTrigger);

const DOPEKIN_IMAGES = [
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=500&auto=format',
  'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=500&auto=format',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format',
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=500&auto=format',
];

const DOPETWIN_FEATURES = [
  { title: 'Shannon Elizabeth', icon: 'public', img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=400&auto=format' },
  { title: 'Blac Chyna', icon: 'schedule', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format' },
  { title: 'Bhad Bhabie', icon: 'lock', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=400&auto=format' },
  { title: 'Cardi B', icon: 'payments', img: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=400&auto=format' },
  { title: 'Iggy Azalea', icon: 'insights', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format' },
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

      gsap.fromTo('.eco-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
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
    <section ref={sectionRef} className="section" id="protocol" style={{ background: '#fafafa' }}>
      <div className="container">
        <div className="eco-header" style={{ opacity: 0 }}>
          <div className="section-label">
            <span className="material-symbols-outlined">lan</span>
            PRODUCT
          </div>
          <h2 className="section-title" style={{ maxWidth: 1200, fontSize: 'clamp(2.4rem, 5vw, 4.8rem)' }}>
            <ScrambledText radius={120} duration={1.0} speed={0.45}>
              Built on Dopamint Infrastructure
            </ScrambledText>
          </h2>
        </div>

        {/* Products Container */}
        <div style={{ marginTop: 'var(--space-lg)' }}>
          <div className="eco-outer-box" style={{ opacity: 1 }}>
            <div className="eco-grid">

              {/* DOPEkin Col */}
              <div className="eco-col eco-card" style={{ opacity: 0 }}>
                <div className="eco-col-header">
                  <div
                    className="eco-icon-box"
                    style={{ borderColor: 'var(--color-primary)', background: 'var(--color-primary)' }}
                  >
                    <span className="material-symbols-outlined" style={{ color: 'var(--color-text)', fontSize: 20 }}>smart_toy</span>
                  </div>
                  <div>
                    <h3 className="eco-product-name">DopeKin</h3>
                    <p className="eco-product-subtitle" style={{ color: 'var(--color-text-muted)' }}>Emotional and Revenue Layer of AI Companions</p>
                  </div>
                </div>

                <div className="eco-image-wrap">
                  <div className="eco-image-area" style={{ overflow: 'visible', background: 'transparent', height: '420px' }}>
                    <CoverflowGallery />
                  </div>
                </div>

                <div className="eco-footer-row">
                  <p className="eco-desc">
                    Meet AI companions that remember who you are, pick up where you left off,
                    and grow more present with every conversation.
                  </p>
                  <button className="btn btn-primary eco-cta">
                    EXPLORE
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* DOPEtwin Col */}
              <div className="eco-col eco-card" style={{ opacity: 0 }}>
                <div className="eco-image-wrap">
                  <div className="eco-image-area" style={{ 
                    overflow: 'visible', 
                    padding: '10px 0',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '8px',
                    height: 'auto',
                    aspectRatio: 'auto'
                  }}>
                    {DOPETWIN_FEATURES.map((feat, idx) => (
                      <div key={idx} style={{ aspectRatio: '3/4', width: '100%' }}>
                        <HoverFlipCard
                          firstContent={
                            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                              <img
                                src={feat.img}
                                alt={feat.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              <div style={{ 
                                position: 'absolute', 
                                bottom: 0, left: 0, right: 0, 
                                height: '80%', 
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
                                pointerEvents: 'none'
                              }} />
                              <div style={{ 
                                position: 'absolute',
                                bottom: 0, left: 0, right: 0,
                                padding: '12px 6px',
                                fontFamily: 'var(--font-heading)', 
                                fontSize: '10px', 
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                textAlign: 'center',
                                textShadow: '0px 2px 4px rgba(0,0,0,0.8)'
                              }}>
                                {feat.title}
                              </div>
                            </div>
                          }
                          secondContent={
                            <div style={{
                              width: '100%', height: '100%',
                              display: 'flex', flexDirection: 'column',
                              alignItems: 'center', justifyContent: 'center',
                              background: 'var(--color-primary)',
                              gap: 6, padding: 8,
                            }}>
                              <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-text)' }}>{feat.icon}</span>
                              <p style={{ color: 'var(--color-text)', fontWeight: 800, fontSize: '10px', textAlign: 'center', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', lineHeight: 1.1 }}>{feat.title}</p>
                            </div>
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="eco-footer-row">
                  <p className="eco-desc">
                    Turn your AI identity into an on-chain asset. Deploy it anywhere, define how it
                    behaves, and earn from every interaction even when you're not there.
                  </p>
                  <button className="btn btn-outline eco-cta">
                    EXPLORE
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .eco-outer-box {
          background: #ffffff;
          border: 2px solid var(--color-text);
          overflow: visible;
          position: relative;
        }

        .eco-outer-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: var(--color-primary);
          pointer-events: none;
        }

        .eco-grid {
          display: flex;
          flex-direction: column;
        }

        .eco-col-border {
          border-bottom: 2px solid var(--color-text);
        }

        .eco-col {
          display: flex;
          flex-direction: column;
          padding: var(--space-lg);
          gap: var(--space-md);
          overflow: visible;
        }

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
          width: 40px; height: 40px;
          border: 1px solid;
          flex-shrink: 0;
        }

        .eco-product-name {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 1px;
          color: var(--color-text);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .eco-product-subtitle {
          font-family: var(--font-body);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          font-weight: 600;
        }

        .eco-image-wrap { flex-shrink: 0; }

        .eco-image-area {
          width: 100%;
          min-height: 260px;
          overflow: visible;
          background: transparent;
          position: relative;
        }

        .eco-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-2xl);
          margin-top: var(--space-md);
        }

        .eco-desc {
          font-size: 15px;
          font-family: var(--font-body);
          color: var(--color-text-muted);
          line-height: 1.75;
          text-align: left;
          flex: 1;
          font-weight: 300;
          margin: 0;
        }

        .eco-footer-row .btn {
          flex-shrink: 0;
        }

        .eco-cta {
          padding: 10px 28px;
          font-size: 12px;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .eco-col { padding: var(--space-lg); }
          .eco-image-wrap { padding: 0; }
        }
      `}</style>
    </section>
  );
}
