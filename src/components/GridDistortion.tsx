import { useEffect, useRef } from 'react';

export default function GridDistortion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    const setSize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    setSize();

    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const gridSize = 50;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;

      ctx.strokeStyle = 'rgba(13, 13, 13, 0.06)';
      ctx.lineWidth = 1;

      const numCols = Math.ceil(width / gridSize) + 1;
      const numRows = Math.ceil(height / gridSize) + 1;

      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
          const baseX = i * gridSize;
          const baseY = j * gridSize;

          const dx = mouse.x - baseX;
          const dy = mouse.y - baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 250;

          // Add a slight displacement based on mouse proximity
          let offsetX = 0;
          let offsetY = 0;
          let nodeRadius = 2;

          if (dist < maxDist) {
            const force = Math.pow(1 - dist / maxDist, 2);
            offsetX = -(dx / dist) * force * 15;
            offsetY = -(dy / dist) * force * 15;
            nodeRadius = 2 + force * 4;
          }

          const x = baseX + offsetX;
          const y = baseY + offsetY;

          ctx.beginPath();
          ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = dist < maxDist ? `rgba(13, 13, 13, ${0.1 + (1 - dist / maxDist) * 0.4})` : 'rgba(13, 13, 13, 0.1)';
          ctx.fill();

          // Connect to right
          if (i < numCols - 1) {
            const rBaseX = (i + 1) * gridSize;
            const rBaseY = j * gridSize;
            const rDx = mouse.x - rBaseX;
            const rDy = mouse.y - rBaseY;
            const rDist = Math.sqrt(rDx * rDx + rDy * rDy);
            
            let rOffsetX = 0;
            let rOffsetY = 0;
            if (rDist < maxDist) {
              const rForce = Math.pow(1 - rDist / maxDist, 2);
              rOffsetX = -(rDx / rDist) * rForce * 15;
              rOffsetY = -(rDy / rDist) * rForce * 15;
            }
            
            const rX = rBaseX + rOffsetX;
            const rY = rBaseY + rOffsetY;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(rX, rY);
            ctx.stroke();
          }

          // Connect to bottom
          if (j < numRows - 1) {
            const bBaseX = i * gridSize;
            const bBaseY = (j + 1) * gridSize;
            const bDx = mouse.x - bBaseX;
            const bDy = mouse.y - bBaseY;
            const bDist = Math.sqrt(bDx * bDx + bDy * bDy);
            
            let bOffsetX = 0;
            let bOffsetY = 0;
            if (bDist < maxDist) {
              const bForce = Math.pow(1 - bDist / maxDist, 2);
              bOffsetX = -(bDx / bDist) * bForce * 15;
              bOffsetY = -(bDy / bDist) * bForce * 15;
            }
            
            const bX = bBaseX + bOffsetX;
            const bY = bBaseY + bOffsetY;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(bX, bY);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener('resize', setSize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
