import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className = '',
  tiltMaxAngle = 10,
  glareOpacity = 0.15,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltMaxAngle;
    const rotateY = ((x - centerX) / centerX) * tiltMaxAngle;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePosition((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Specular 3D Holographic Glare Layer */}
      {glarePosition.active && (
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-inherit transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glareOpacity}), transparent 80%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

export default TiltCard;
