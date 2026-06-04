import React from 'react';

export default function AuroraBackground() {
  return (
    <div className="aurora-bg">
      {/* Subtle depth glow blobs - very low opacity so content shines */}
      <div className="aurora-blob" style={{ width:700, height:700, background:'radial-gradient(circle,rgba(0,201,255,0.07),transparent)', top:-150, left:-150, animation:'aurora1 20s ease-in-out infinite' }} />
      <div className="aurora-blob" style={{ width:500, height:500, background:'radial-gradient(circle,rgba(124,58,237,0.06),transparent)', bottom:-80, right:-80, animation:'aurora2 24s ease-in-out infinite' }} />
      <div className="aurora-blob" style={{ width:400, height:400, background:'radial-gradient(circle,rgba(79,255,176,0.05),transparent)', top:'40%', left:'55%', animation:'aurora3 18s ease-in-out infinite' }} />

      {/* Cyberpunk circuit board SVG overlay */}
      <svg className="cyber-grid-svg" xmlns="http://www.w3.org/2000/svg" style={{ position:'fixed', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.18 }}>
        <defs>
          <pattern id="cybergrid" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Main grid lines */}
            <line x1="0" y1="0" x2="80" y2="0" stroke="rgba(0,201,255,0.35)" strokeWidth="0.5"/>
            <line x1="0" y1="0" x2="0" y2="80" stroke="rgba(0,201,255,0.35)" strokeWidth="0.5"/>
            {/* Circuit traces */}
            <line x1="20" y1="0" x2="20" y2="20" stroke="rgba(0,201,255,0.5)" strokeWidth="0.6"/>
            <line x1="20" y1="20" x2="40" y2="20" stroke="rgba(0,201,255,0.5)" strokeWidth="0.6"/>
            <line x1="60" y1="0" x2="60" y2="40" stroke="rgba(79,255,176,0.4)" strokeWidth="0.6"/>
            <line x1="60" y1="40" x2="80" y2="40" stroke="rgba(79,255,176,0.4)" strokeWidth="0.6"/>
            <line x1="0" y1="60" x2="40" y2="60" stroke="rgba(0,201,255,0.4)" strokeWidth="0.6"/>
            <line x1="40" y1="60" x2="40" y2="80" stroke="rgba(0,201,255,0.4)" strokeWidth="0.6"/>
            <line x1="80" y1="20" x2="60" y2="20" stroke="rgba(124,58,237,0.35)" strokeWidth="0.6"/>
            <line x1="60" y1="20" x2="60" y2="0" stroke="rgba(124,58,237,0.35)" strokeWidth="0.6"/>
            {/* Circuit nodes */}
            <circle cx="20" cy="20" r="1.5" fill="rgba(0,201,255,0.6)"/>
            <circle cx="60" cy="40" r="1.5" fill="rgba(79,255,176,0.5)"/>
            <circle cx="40" cy="60" r="1.5" fill="rgba(0,201,255,0.5)"/>
            <circle cx="60" cy="20" r="1.2" fill="rgba(124,58,237,0.5)"/>
            {/* Small corner squares */}
            <rect x="0" y="0" width="3" height="3" fill="rgba(0,201,255,0.25)"/>
            <rect x="77" y="77" width="3" height="3" fill="rgba(0,201,255,0.2)"/>
          </pattern>
          <pattern id="finegrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(0,201,255,0.08)" strokeWidth="0.3"/>
            <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(0,201,255,0.08)" strokeWidth="0.3"/>
          </pattern>
        </defs>
        {/* Fine grid base */}
        <rect width="100%" height="100%" fill="url(#finegrid)"/>
        {/* Circuit overlay */}
        <rect width="100%" height="100%" fill="url(#cybergrid)"/>
      </svg>

      {/* Scan line that sweeps down slowly */}
      <div style={{ position:'fixed', left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.12),rgba(79,255,176,0.08),transparent)', pointerEvents:'none', animation:'scanDown 8s linear infinite', zIndex:0, opacity:0.6 }}/>
    </div>
  );
}
