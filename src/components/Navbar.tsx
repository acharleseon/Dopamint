import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'RUNTIME', id: 'runtime' },
  { label: 'PROTOCOL', id: 'protocol' },
  { label: 'VOICE', id: 'voice' },
  { label: 'DEVELOPERS', id: 'developers' },
  { label: 'PRICING', id: 'pricing' },
];

const DIVIDER = 'rgba(255,255,255,0.09)';
const BORDER  = 'rgba(255,255,255,0.09)';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const [activeId, setActiveId]  = useState('runtime');
  const overlayRef   = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const tlRef        = useRef<gsap.core.Timeline | null>(null);

  // Scroll-based glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver — auto-highlight active section
  useEffect(() => {
    const ratios: Record<string, number> = {};
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio;
          const best = Object.entries(ratios).reduce(
            (acc, [k, v]) => (v > acc.val ? { id: k, val: v } : acc),
            { id: '', val: -1 }
          );
          if (best.id) setActiveId(best.id);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
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

  const handleNavClick = (id: string) => { setActiveId(id); setMenuOpen(false); };

  const barBase: React.CSSProperties = {
    width: 22, height: 2, background: '#fff', borderRadius: 1,
    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)', transformOrigin: 'center',
  };

  // Shared cell style: full-height flex centering + right divider
  const cell = (extraStyle?: React.CSSProperties): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 28px',
    height: '100%',
    borderRight: `1px solid ${DIVIDER}`,
    flexShrink: 0,
    ...extraStyle,
  });

  return (
    <>
      <nav
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: menuOpen ? 1010 : 1000,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'stretch',          // ← cells fill full height for dividers
          background: scrolled ? 'rgba(5,5,5,0.88)' : 'rgba(5,5,5,0.35)',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'blur(8px)',
          border: `1px solid ${BORDER}`,
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* ── Logo cell ── */}
        <div style={cell({ borderRight: `1px solid ${DIVIDER}`, padding: '0 32px' })}>
          <a
            href="#"
            onClick={() => handleNavClick('runtime')}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/logo.png"
              alt="DOPAMINT"
              style={{ height: 20, width: 'auto', display: 'block' }}
            />
          </a>
        </div>

        {/* ── Desktop nav links (each as a bordered cell) ── */}
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
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: isActive ? 'var(--purple)' : 'rgba(255,255,255,0.5)',
                  borderBottom: isActive ? '2px solid var(--purple)' : '2px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                {link.label}
              </a>
            );
          })}

          {/* Spacer pushes CONNECT to the right */}
          <div style={{ flex: 1 }} />
        </div>

        {/* ── Connect button cell ── */}
        <div
          className="desktop-only"
          style={{ ...cell({ borderRight: 'none', borderLeft: `1px solid ${DIVIDER}`, padding: '0 28px' }), alignItems: 'center' }}
        >
          <button className="btn btn-primary" style={{ padding: '9px 22px', fontSize: '11px', whiteSpace: 'nowrap' }}>
            CONNECT
          </button>
        </div>

        {/* ── Hamburger (mobile only) ── */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: menuOpen ? 0 : 6, width: 60, height: '100%',
            borderLeft: `1px solid ${DIVIDER}`, flexShrink: 0, zIndex: 1002,
            marginLeft: 'auto',
          }}
        >
          <span style={{ ...barBase, transform: menuOpen ? 'translateY(1px) rotate(45deg)' : 'none' }} />
          <span style={{ ...barBase, opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }} />
          <span style={{ ...barBase, transform: menuOpen ? 'translateY(-1px) rotate(-45deg)' : 'none' }} />
        </button>

      </nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 1001, background: '#050505',
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
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--purple)' : 'var(--text-primary)',
                opacity: 0,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--purple)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? 'var(--purple-light)' : 'var(--text-primary)'; }}
            >
              {link.label}
            </a>
          );
        })}

        <button className="btn btn-primary" onClick={() => setMenuOpen(false)} style={{ marginTop: 'var(--space-lg)', padding: '14px 40px' }}>
          CONNECT
        </button>

        <p style={{ position: 'absolute', bottom: 'var(--space-xl)', fontFamily: 'var(--font-label)', fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
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
