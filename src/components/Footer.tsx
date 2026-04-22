const LINKS = [
  { label: 'Runtime', href: '#runtime' },
  { label: 'Protocol', href: '#protocol' },
  { label: 'Voice', href: '#voice' },
  { label: 'Developers', href: '#developers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testnet', href: '#testnet' },
];

const SOCIAL_LINKS = [
  { label: 'Twitter/X', href: '#' },
  { label: 'Discord', href: '#' },
  { label: 'Docs', href: '#' },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '2px solid var(--color-text)',
        padding: 'var(--space-xl) 0',
        background: 'var(--color-bg)',
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
          <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="DOPAMINT"
              style={{ height: 56, width: 'auto', display: 'block' }}
            />
          </a>

          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--color-text)',
              letterSpacing: '0.1em',
              padding: '3px 8px',
              background: 'var(--color-primary)',
              border: '1px solid var(--color-text)',
              textTransform: 'uppercase',
            }}
          >
            POWERED BY $DOPE
          </span>
        </div>

        {/* Center links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', alignItems: 'center' }}>
          <nav style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text)';
                  e.currentTarget.style.textDecoration = 'underline';
                  (e.currentTarget.style as CSSStyleDeclaration).textDecorationColor = 'var(--color-primary)';
                  (e.currentTarget.style as CSSStyleDeclaration).textDecorationThickness = '2px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <nav style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  transition: 'color 0.2s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text)';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right */}
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          color: 'var(--color-text-dim)',
          letterSpacing: '0.05em',
        }}>
          © 2026 Dopamint. All rights reserved. Powered by $DOPE.
        </span>
      </div>
    </footer>
  );
}
