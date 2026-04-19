const LINKS = [
  { label: 'Docs', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Discord', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Blog', href: '#' },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: 'var(--space-xl) 0',
        marginTop: 'var(--space-2xl)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
        }}
      >
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <a
            href="#"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/logo.png"
              alt="DOPAMINT"
              style={{ height: 16, width: 'auto', display: 'block' }}
            />
          </a>

          <span
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '10px',
              color: 'var(--blue)',
              letterSpacing: '0.1em',
              padding: '3px 8px',
              border: '1px solid rgba(59, 14, 232, 0.2)',
            }}
          >
            POWERED BY $DOPE
          </span>
        </div>

        {/* Center links */}
        <nav style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--purple)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <span style={{
          fontFamily: 'var(--font-label)',
          fontSize: '11px',
          color: 'var(--text-dim)',
          letterSpacing: '0.05em',
        }}>
          © 2025 Dopamint Labs
        </span>
      </div>
    </footer>
  );
}
