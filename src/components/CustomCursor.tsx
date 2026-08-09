import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

export const CustomCursor: React.FC = () => {
  const { cursorLabel } = useApp();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveHandler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveHandler);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveHandler);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      className={`custom-cursor ${cursorLabel ? 'active' : ''}`}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
      }}
    >
      {cursorLabel && <span className="custom-cursor-text">{cursorLabel}</span>}
    </div>
  );
};
