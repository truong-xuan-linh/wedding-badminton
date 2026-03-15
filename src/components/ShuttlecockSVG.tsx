'use client';

interface ShuttlecockSVGProps {
  size?: number;
  color?: string;
  className?: string;
  rotate?: number;
}

export default function ShuttlecockSVG({
  size = 48,
  color = '#f0faf4',
  className = '',
  rotate = 0,
}: ShuttlecockSVGProps) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 50 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Feather cone - outer shape */}
      <ellipse cx="25" cy="22" rx="22" ry="20" fill={color} fillOpacity="0.12" stroke={color} strokeOpacity="0.5" strokeWidth="0.8" />
      <ellipse cx="25" cy="22" rx="18" ry="17" fill={color} fillOpacity="0.08" />

      {/* Feather radial lines */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x2 = 25 + Math.cos(angle) * 21;
        const y2 = 22 + Math.sin(angle) * 19;
        return (
          <line
            key={i}
            x1="25" y1="22"
            x2={x2} y2={y2}
            stroke={color}
            strokeOpacity="0.35"
            strokeWidth="0.6"
          />
        );
      })}

      {/* Inner feather texture circles */}
      <circle cx="25" cy="22" r="10" fill="none" stroke={color} strokeOpacity="0.2" strokeWidth="0.5" />
      <circle cx="25" cy="22" r="5" fill="none" stroke={color} strokeOpacity="0.3" strokeWidth="0.5" />

      {/* Feather tips */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = ((i * 45 - 90) * Math.PI) / 180;
        const x = 25 + Math.cos(angle) * 22;
        const y = 22 + Math.sin(angle) * 20;
        return (
          <circle key={i} cx={x} cy={y} r="1.5" fill={color} fillOpacity="0.6" />
        );
      })}

      {/* Stem */}
      <rect x="22.5" y="40" width="5" height="26" rx="2.5" fill={color} fillOpacity="0.7" />

      {/* Cork base / rubber */}
      <ellipse cx="25" cy="67" rx="6" ry="4" fill="#d4a464" fillOpacity="0.9" />
      <ellipse cx="25" cy="65" rx="5" ry="3" fill="#e8c07a" />
      {/* Rubber ring detail */}
      <rect x="20" y="63" width="10" height="3" rx="1.5" fill="#888" fillOpacity="0.6" />
    </svg>
  );
}
