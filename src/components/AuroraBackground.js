import React from 'react';

export default function AuroraBackground() {
  return (
    <div className="aurora-bg">
      <div className="aurora-blob" style={{ width:600, height:600, background:'radial-gradient(circle,rgba(0,201,255,0.55),transparent)', top:-100, left:-100, animation:'aurora1 18s ease-in-out infinite' }} />
      <div className="aurora-blob" style={{ width:500, height:500, background:'radial-gradient(circle,rgba(0,82,255,0.45),transparent)', bottom:-80, right:-80, animation:'aurora2 22s ease-in-out infinite' }} />
      <div className="aurora-blob" style={{ width:400, height:400, background:'radial-gradient(circle,rgba(79,255,176,0.35),transparent)', top:'40%', left:'60%', animation:'aurora3 16s ease-in-out infinite' }} />
      <div className="aurora-blob" style={{ width:300, height:300, background:'radial-gradient(circle,rgba(255,215,0,0.15),transparent)', top:'20%', left:'40%', animation:'aurora1 20s 2s ease-in-out infinite' }} />
    </div>
  );
}
