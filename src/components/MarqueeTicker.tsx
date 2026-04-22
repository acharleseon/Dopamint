const ITEMS = [
  { icon: 'speed', label: 'Low Latency' },
  { icon: 'memory', label: 'On-Chain Memory' },
  { icon: 'graphic_eq', label: 'Voice Native' },
  { icon: 'schema', label: 'Multimodal' },
  { icon: 'factory', label: 'Production Ready' },
];

export function MarqueeTicker() {
  const allItems = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        width: '100%',
        background: 'var(--color-primary)',
        borderTop: '2px solid var(--color-text)',
        borderBottom: '2px solid var(--color-text)',
        padding: '14px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2xl)',
          whiteSpace: 'nowrap',
          animation: 'marquee 32s linear infinite',
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
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--color-text)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
            {i < allItems.length - 1 && (
              <span style={{ color: 'rgba(13,13,13,0.35)', marginLeft: 'var(--space-lg)' }}>◆</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
