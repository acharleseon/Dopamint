import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  {
    id: 0,
    img: './dopekin_avatars/seeker_1.png',
    text: "Call In—I'll keep it smooth, witty, and dangerous.",
  },
  {
    id: 1,
    img: './dopekin_avatars/seeker_2.png',
    text: "He doesn't need thanks—he needs you to keep moving.",
  },
  {
    id: 2,
    img: './dopekin_avatars/seeker_3.png',
    text: 'Successful cybersecurity consultant. Hacker.',
  },
  {
    id: 3,
    img: './dopekin_avatars/seeker_4.png',
    text: 'Your personal fitness and mentality coach.',
  },
  {
    id: 4,
    img: './dopekin_avatars/seeker_5.png',
    text: 'Late night philosopher and deep thinker.',
  },
];

export default function CoverflowGallery() {
  const [activeIdx, setActiveIdx] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CARDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {CARDS.map((card, idx) => {
          let offset = idx - activeIdx;
          if (offset > 2) offset -= CARDS.length;
          if (offset < -2) offset += CARDS.length;

          const isActive = offset === 0;
          const absOffset = Math.abs(offset);

          return (
            <motion.div
              key={card.id}
              onClick={() => setActiveIdx(idx)}
              animate={{
                x: `${offset * 80}%`,
                scale: isActive ? 1.05 : 1 - absOffset * 0.15,
                zIndex: isActive ? 10 : 10 - absOffset,
                opacity: absOffset > 2 ? 0 : 1,
              }}
              whileHover={{
                x: `${offset * 80}%`,
                scale: isActive ? 1.05 : (1 - absOffset * 0.15) + 0.03,
                zIndex: 20,
              }}
              transition={{ type: 'tween', duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: 'absolute',
                width: 'min(62%, 260px)',
                background: 'var(--color-bg)',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderColor: 'var(--color-text)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'none',
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5' }}>
                <img src={card.img} alt={card.text} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                
                {/* Gradient Overlay for Text */}
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, left: 0, right: 0, 
                  height: '60%', 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
                  pointerEvents: 'none'
                }} />

                {/* Text overlay */}
                <div style={{ 
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: '20px 16px',
                  fontFamily: 'var(--font-body)', 
                  fontSize: '13px', 
                  fontWeight: 600,
                  color: '#ffffff',
                  textAlign: 'left',
                  lineHeight: 1.4,
                  textShadow: '0px 2px 4px rgba(0,0,0,0.8)'
                }}>
                  {card.text}
                </div>

                {!isActive && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', transition: 'background 0.3s' }} />
                )}
              </div>


            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
