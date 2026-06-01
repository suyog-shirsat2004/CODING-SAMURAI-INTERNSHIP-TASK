import { useState, useRef, useCallback } from 'react';
import '../styles/ProductViewer360.css';

const ANGLES = ['Front', 'Right', 'Back', 'Left'];

const angleTransforms = (deg) => {
  const t = deg % 360;
  if (t === 0) return { transform: 'rotateY(0deg) scaleX(1)', label: 'Front' };
  if (t === 90 || t === -270) return { transform: 'perspective(600px) rotateY(-15deg) scaleX(0.92)', label: 'Right' };
  if (t === 180 || t === -180) return { transform: 'scaleX(-1)', label: 'Back' };
  if (t === 270 || t === -90) return { transform: 'perspective(600px) rotateY(15deg) scaleX(0.92)', label: 'Left' };
  const p = Math.abs(Math.sin((t * Math.PI) / 180));
  const scale = 1 - p * 0.08;
  return { transform: `perspective(600px) rotateY(${t * 0.15}deg) scaleX(${scale})`, label: `${t}°` };
};

const ProductViewer360 = ({ src, alt }) => {
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);
  const angleStart = useRef(0);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    angleStart.current = angle;
  }, [angle]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    const newAngle = ((angleStart.current - delta * 0.5) % 360 + 360) % 360;
    setAngle(newAngle);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStart.current = null;
    const snap = Math.round(angle / 90) * 90;
    setAngle(snap % 360);
  }, [isDragging, angle]);

  const handleAngleClick = (idx) => setAngle(idx * 90);

  const current = angleTransforms(angle);
  const activeIdx = Math.round(angle / 90) % 4;

  return (
    <div className="viewer360">
      <div className="viewer360-stage">
        <div className={`viewer360-scene ${isDragging ? 'dragging' : ''}`}>
          <div
            className="viewer360-image"
            style={current}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img src={src} alt={alt} draggable="false" />
            <div className="viewer360-shine" />
          </div>
        </div>
        <div className="viewer360-hint">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          <span>Drag to rotate 360°</span>
        </div>
      </div>
      <div className="viewer360-thumbs">
        {ANGLES.map((label, i) => (
          <button
            key={label}
            className={`viewer360-thumb ${i === activeIdx ? 'active' : ''}`}
            onClick={() => handleAngleClick(i)}
          >
            <span className="thumb-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductViewer360;
