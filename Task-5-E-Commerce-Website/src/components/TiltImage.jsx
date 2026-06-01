import { useRef, useState, useEffect } from 'react';
import '../styles/TiltImage.css';

const TiltImage = ({ src, alt, className = '', style = {}, containerStyle = {} }) => {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = ((centerY - y) / centerY) * 12;

    setTilt({ rotateX, rotateY, scale: 1.05 });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={containerRef}
      className={`tilt-wrapper ${className}`}
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="tilt-inner"
        style={{
          transform: `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease',
        }}
      >
        <div className="tilt-shine" style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)`,
          opacity: isHovered ? 1 : 0,
        }} />
        <img
          src={src}
          alt={alt}
          className="tilt-img"
          draggable="false"
          loading="lazy"
        />
      </div>
      <div className={`tilt-float ${isHovered ? 'pause' : ''}`}>
        <div className="tilt-float-shadow" />
      </div>
    </div>
  );
};

export default TiltImage;
