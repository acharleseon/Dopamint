import { ReactNode } from 'react';

interface HoverFlipCardProps {
  firstContent: ReactNode;
  secondContent: ReactNode;
}

export default function HoverFlipCard({ firstContent, secondContent }: HoverFlipCardProps) {
  return (
    <>
      <div className="hover-flip-card">
        {/* Both layers stacked absolutely, fade between them on hover */}
        <div className="hover-flip-first">
          {firstContent}
        </div>
        <div className="hover-flip-second">
          {secondContent}
        </div>
      </div>
      <style>{`
        .hover-flip-card {
          width: 100%;
          height: 100%;
          background: var(--color-bg);
          position: relative;
          border: 2px solid var(--color-text);
          border-radius: 16px;
          cursor: pointer;
          overflow: hidden;
        }

        .hover-flip-first {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 1;
          transition: opacity 0.22s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hover-flip-card:hover .hover-flip-first {
          opacity: 0;
        }

        .hover-flip-second {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.22s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hover-flip-card:hover .hover-flip-second {
          opacity: 1;
        }
      `}</style>
    </>
  );
}
