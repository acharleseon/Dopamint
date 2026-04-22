import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'RUNTIME', id: 'runtime' },
  { label: 'ECOSYSTEM', id: 'protocol' },
  { label: 'WHY US', id: 'why' },
  { label: 'PIPELINE', id: 'pipeline' },
  { label: 'VOICE', id: 'voice' },
  { label: 'DEVELOPERS', id: 'developers' },
  { label: 'PRICING', id: 'pricing' },
];

const BORDER = 'rgba(13,13,13,0.12)';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const [activeId, setActiveId]  = useState('runtime');
  const overlayRef   = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const tlRef        = useRef<gsap.core.Timeline | null>(null);

  const isScrollingClick = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll spy & solid effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isScrollingClick.current) return;

      const triggerLine = window.innerHeight / 3; // 33% down the screen
      let currentActive = '';

      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if the trigger line falls within the section's vertical bounds
          if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
            currentActive = id;
            break;
          }
        }
      }

      if (currentActive) {
        setActiveId((prev) => (prev !== currentActive ? currentActive : prev));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial check

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!overlayRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tlRef.current = tl;
      tl.to(overlayRef.current, { clipPath: 'circle(150% at calc(100% - 36px) 32px)', duration: 0.7, ease: 'power3.inOut' });
      tl.fromTo(menuItemsRef.current.filter(Boolean), { x: 40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: 'power2.out' }, '-=0.35');
    } else {
      document.body.style.overflow = '';
      if (tlRef.current) tlRef.current.kill();
      gsap.to(overlayRef.current, { clipPath: 'circle(0% at calc(100% - 36px) 32px)', duration: 0.5, ease: 'power3.inOut' });
    }
  }, [menuOpen]);

  const handleNavClick = (id: string) => { 
    setActiveId(id); 
    setMenuOpen(false); 
    
    isScrollingClick.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isScrollingClick.current = false;
    }, 800);
  };

  const barBase: React.CSSProperties = {
    width: 22, height: 2,
    background: menuOpen ? '#000000ff' : 'var(--color-text)',
    borderRadius: 1,
    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)', transformOrigin: 'center',
  };

  const cell = (extra?: React.CSSProperties): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    height: '100%',
    borderRight: `1px solid ${BORDER}`,
    flexShrink: 0,
    ...extra,
  });

  return (
    <>
      <nav
        className="navbar"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: menuOpen ? 1010 : 1000,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'stretch',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.82)',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'blur(8px)',
          borderBottom: `1px solid ${BORDER}`,
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
          boxShadow: scrolled ? '0 1px 0 rgba(13,13,13,0.07)' : 'none',
        }}
      >
        {/* Logo cell */}
        <div style={cell({ padding: '0 32px' })}>
          <a
            href="#"
            onClick={() => handleNavClick('runtime')}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="DOPAMINT"
              style={{ height: 72, width: 'auto', display: 'block' }}
            />
          </a>
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className="nav-cell"
                style={{
                  ...cell(),
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: isActive ? 'var(--color-text)' : 'rgba(13,13,13,0.45)',
                  borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--color-text)'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(13,13,13,0.45)'; }}
              >
                {link.label}
              </a>
            );
          })}
          <div style={{ flex: 1 }} />
        </div>

        {/* Connect button */}
        <div
          className="desktop-only"
          style={{ ...cell({ borderRight: 'none', borderLeft: `1px solid ${BORDER}`, padding: '0 28px' }), alignItems: 'center' }}
        >
          <button className="btn btn-primary" style={{ padding: '9px 22px', fontSize: '11px', whiteSpace: 'nowrap' }}>
            CONNECT
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: menuOpen ? 0 : 6, width: 60, height: '100%',
            borderLeft: `1px solid ${BORDER}`, flexShrink: 0, zIndex: 1002,
            marginLeft: 'auto',
          }}
        >
          <span style={{ ...barBase, transform: menuOpen ? 'translateY(1px) rotate(45deg)' : 'none' }} />
          <span style={{ ...barBase, opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }} />
          <span style={{ ...barBase, transform: menuOpen ? 'translateY(-1px) rotate(-45deg)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 1001, background: 'var(--color-text)',
          clipPath: 'circle(0% at calc(100% - 36px) 32px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 'var(--space-xl)',
          padding: '120px var(--content-padding) 80px',
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
      >
        {NAV_LINKS.map((link, i) => {
          const isActive = activeId === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              ref={(el) => { if (el) menuItemsRef.current[i] = el; }}
              onClick={() => handleNavClick(link.id)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--color-primary)' : '#ffffff',
                opacity: 0,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? 'var(--color-primary)' : '#ffffff'; }}
            >
              {link.label}
            </a>
          );
        })}

        <button className="btn btn-yellow" onClick={() => setMenuOpen(false)} style={{ marginTop: 'var(--space-lg)', padding: '14px 40px' }}>
          CONNECT
        </button>

        <p style={{ position: 'absolute', bottom: 'var(--space-xl)', fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          © 2025 DOPAMINT — POWERED BY $DOPE
        </p>
      </div>

      <style>{`
        .desktop-nav  { display: flex !important; }
        .desktop-only { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        .nav-cell:last-child { border-right: none; }

        @media (max-width: 900px) {
          .desktop-nav  { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
