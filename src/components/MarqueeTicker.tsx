const ITEMS = [
  { icon: 'speed', label: 'Low Latency' },
  { icon: 'memory', label: 'On-Chain Memory' },
  { icon: 'graphic_eq', label: 'Voice Native' },
  { icon: 'schema', label: 'Multimodal' },
  { icon: 'factory', label: 'Production Ready' },
];

export function MarqueeTicker() {
  // Duplicate items enough times for seamless loop
  const allItems = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        width: '100%',
        background: 'rgba(47, 128, 136, 0.06)',
        borderTop: '1px solid rgba(47, 128, 136, 0.15)',
        borderBottom: '1px solid rgba(47, 128, 136, 0.15)',
        padding: '14px 0',
        overflow: 'hidden',
        marginBottom: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2xl)',
          whiteSpace: 'nowrap',
          animation: 'marquee 30s linear infinite',
          width: 'max-content',
        }}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-label)',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--teal)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
            {i < allItems.length - 1 && (
              <span style={{ color: 'rgba(47, 128, 136, 0.3)', marginLeft: 'var(--space-lg)' }}>•</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
