import React from 'react';

export const Logo = ({ className = "h-8" }: { className?: string }) => {
  return (
    <svg viewBox="0 0 320 80" className={className} xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0, 10)">
        {/* Grey parts */}
        <rect x="0" y="0" width="18" height="18" fill="#6b7280" />
        <rect x="0" y="40" width="18" height="18" fill="#6b7280" />
        <rect x="20" y="20" width="18" height="18" fill="#6b7280" />
        
        {/* Black parts */}
        {/* Left column of black block */}
        <rect x="40" y="0" width="18" height="18" fill="currentColor" />
        <rect x="40" y="20" width="18" height="18" fill="currentColor" />
        <rect x="40" y="40" width="18" height="18" fill="currentColor" />
        
        {/* Middle column of black block (with hole) */}
        <rect x="60" y="0" width="18" height="18" fill="currentColor" />
        <rect x="60" y="40" width="18" height="18" fill="currentColor" />
        
        {/* Right column of black block */}
        <rect x="80" y="0" width="18" height="18" fill="currentColor" />
        <rect x="80" y="20" width="18" height="18" fill="currentColor" />
        <rect x="80" y="40" width="18" height="18" fill="currentColor" />
      </g>
      <text x="110" y="66" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="72" fill="currentColor" letterSpacing="-2">VINCI</text>
    </svg>
  );
};
