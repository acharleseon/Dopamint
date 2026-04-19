import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

import './ScrambledText.css';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

/**
 * ScrambledText — mouse-proximity scramble with zero layout shift.
 *
 * Two core fixes vs. the original React Bits version:
 *
 * 1. type:'words,chars' — SplitText wraps each word in white-space:nowrap
 *    spans BEFORE splitting into chars, so line breaks only happen between
 *    whole words, never mid-word.
 *
 * 2. Width locking — after split, each char's rendered pixel width is
 *    measured and hardcoded onto the span. Scramble chars will never be
 *    wider/narrower than the original, eliminating horizontal reflow and
 *    the vertical cascade that shifts surrounding elements.
 *
 * Renders as a <span> so it inherits all parent heading typography.
 */
const ScrambledText = ({
  radius = 120,
  duration = 1.0,
  speed = 0.5,
  scrambleChars = '.:',   // use equal-width chars only — period & colon
  className = '',
  style = {},
  children,
}) => {
  const rootRef = useRef(null);
  const charsRef = useRef([]);
  const splitRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // words,chars → SplitText adds white-space:nowrap to each word wrapper,
    // so line breaks only happen between words, never inside a word.
    const split = SplitText.create(el, {
      type: 'words,chars',
      charsClass: 'char',
      wordsClass: 'word',
    });
    splitRef.current = split;
    charsRef.current = split.chars;

    // Lock each char to its natural rendered width in 'em' units BEFORE scrambling.
    // By using 'em', the fixed width scales perfectly when the parent font-size shrinks
    // on tablet/mobile breakpoints, preventing huge gaps between letters.
    charsRef.current.forEach((c) => {
      // Don't lock or scramble pure whitespace
      if (c.innerHTML.trim() === '') return;

      const naturalWidth = c.getBoundingClientRect().width;
      const fontSizePx = parseFloat(window.getComputedStyle(c).fontSize) || 16;
      const widthEm = naturalWidth / fontSizePx;

      gsap.set(c, {
        display: 'inline-block',
        width: `${widthEm}em`,        // relative lock — scales if font-size changes
        textAlign: 'center',          // center the scramble char in the locked box
        attr: { 'data-content': c.innerHTML },
      });
    });

    const handleMove = (e) => {
      charsRef.current.forEach((c) => {
        // Skip spaces or empty characters
        if (!c.dataset.content || c.dataset.content.trim() === '') return;

        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || '',
              chars: scrambleChars,
              speed,
            },
            ease: 'none',
          });
        }
      });
    };

    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
      if (splitRef.current) splitRef.current.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <span
      ref={rootRef}
      className={`text-block ${className}`}
      style={style}
    >
      {children}
    </span>
  );
};

export default ScrambledText;
