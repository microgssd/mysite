import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Tech SVG icons per service — no human figures
const ICONS = {
  'web-info': (col) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="6" y="12" width="52" height="36" rx="4" stroke={col} strokeWidth="1.8" fill="none"/>
      <line x1="6" y1="22" x2="58" y2="22" stroke={col} strokeWidth="1.2" opacity="0.6"/>
      <circle cx="13" cy="17" r="2" fill={col} opacity="0.7"/>
      <circle cx="20" cy="17" r="2" fill={col} opacity="0.5"/>
      <circle cx="27" cy="17" r="2" fill={col} opacity="0.3"/>
      <rect x="14" y="28" width="20" height="2" rx="1" fill={col} opacity="0.5"/>
      <rect x="14" y="33" width="30" height="2" rx="1" fill={col} opacity="0.35"/>
      <rect x="14" y="38" width="24" height="2" rx="1" fill={col} opacity="0.25"/>
      <path d="M44 28 L54 38 L44 48" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8"/>
      <line x1="28" y1="48" x2="36" y2="52" stroke={col} strokeWidth="1.2" opacity="0.5"/>
      <rect x="22" y="52" width="20" height="3" rx="1.5" fill={col} opacity="0.4"/>
    </svg>
  ),
  'ecommerce': (col) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <path d="M8 10 L14 10 L20 38 L50 38 L56 18 L20 18" stroke={col} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="26" cy="46" r="4" stroke={col} strokeWidth="1.5" fill="none"/>
      <circle cx="44" cy="46" r="4" stroke={col} strokeWidth="1.5" fill="none"/>
      <rect x="28" y="22" width="8" height="12" rx="1" stroke={col} strokeWidth="1.2" fill="none" opacity="0.6"/>
      <line x1="32" y1="20" x2="32" y2="36" stroke={col} strokeWidth="1" opacity="0.4"/>
      <path d="M36 26 L44 26 M36 30 L42 30" stroke={col} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M48 12 L52 16 M48 16 L52 12" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
    </svg>
  ),
  'android': (col) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="18" y="14" width="28" height="44" rx="5" stroke={col} strokeWidth="1.8" fill="none"/>
      <line x1="18" y1="22" x2="46" y2="22" stroke={col} strokeWidth="1" opacity="0.5"/>
      <line x1="18" y1="48" x2="46" y2="48" stroke={col} strokeWidth="1" opacity="0.5"/>
      <circle cx="32" cy="53" r="2" stroke={col} strokeWidth="1.2" fill="none" opacity="0.6"/>
      <rect x="26" y="27" width="12" height="16" rx="2" stroke={col} strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M29 27 L29 24 M35 27 L35 24" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
      <line x1="12" y1="26" x2="16" y2="26" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="48" y1="26" x2="52" y2="26" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="12" y1="32" x2="16" y2="32" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <line x1="48" y1="32" x2="52" y2="32" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  'ios': (col) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="20" y="8" width="24" height="48" rx="6" stroke={col} strokeWidth="1.8" fill="none"/>
      <line x1="20" y1="18" x2="44" y2="18" stroke={col} strokeWidth="1" opacity="0.5"/>
      <line x1="20" y1="48" x2="44" y2="48" stroke={col} strokeWidth="1" opacity="0.5"/>
      <rect x="28" y="12" width="8" height="2" rx="1" fill={col} opacity="0.4"/>
      <circle cx="32" cy="53" r="2.5" stroke={col} strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M28 32 Q32 26 36 32 Q40 38 36 44 Q32 50 28 44 Q24 38 28 32Z" stroke={col} strokeWidth="1.2" fill="none" opacity="0.6"/>
      <circle cx="32" cy="38" r="3" fill={col} opacity="0.35"/>
      <path d="M32 28 L32 24 M30 25 L32 24 L34 25" stroke={col} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    </svg>
  ),
  'hybrid': (col) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="16" width="20" height="34" rx="4" stroke={col} strokeWidth="1.8" fill="none"/>
      <rect x="36" y="16" width="20" height="34" rx="4" stroke={col} strokeWidth="1.8" fill="none"/>
      <line x1="28" y1="33" x2="36" y2="33" stroke={col} strokeWidth="1.5" strokeDasharray="2,2" opacity="0.6"/>
      <circle cx="32" cy="33" r="4" stroke={col} strokeWidth="1.2" fill="none"/>
      <circle cx="32" cy="33" r="1.5" fill={col} opacity="0.7"/>
      <line x1="8" y1="24" x2="28" y2="24" stroke={col} strokeWidth="0.8" opacity="0.3"/>
      <line x1="36" y1="24" x2="56" y2="24" stroke={col} strokeWidth="0.8" opacity="0.3"/>
      <line x1="8" y1="42" x2="28" y2="42" stroke={col} strokeWidth="0.8" opacity="0.3"/>
      <line x1="36" y1="42" x2="56" y2="42" stroke={col} strokeWidth="0.8" opacity="0.3"/>
      <path d="M29 29 L35 29 M29 37 L35 37" stroke={col} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  'digital': (col) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <polyline points="8,46 18,32 26,38 36,20 46,28 56,12" stroke={col} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="32" r="3" fill={col} opacity="0.7"/>
      <circle cx="26" cy="38" r="3" fill={col} opacity="0.6"/>
      <circle cx="36" cy="20" r="3" fill={col} opacity="0.8"/>
      <circle cx="46" cy="28" r="3" fill={col} opacity="0.6"/>
      <circle cx="56" cy="12" r="3" fill={col}/>
      <line x1="8" y1="50" x2="56" y2="50" stroke={col} strokeWidth="0.8" opacity="0.3"/>
      <line x1="8" y1="10" x2="8" y2="50" stroke={col} strokeWidth="0.8" opacity="0.3"/>
      <path d="M50 8 L58 8 L58 16" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8"/>
    </svg>
  ),
  'payment': (col) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="16" width="48" height="32" rx="5" stroke={col} strokeWidth="1.8" fill="none"/>
      <line x1="8" y1="26" x2="56" y2="26" stroke={col} strokeWidth="2" opacity="0.6"/>
      <rect x="14" y="32" width="12" height="8" rx="2" fill={col} opacity="0.25" stroke={col} strokeWidth="1"/>
      <line x1="32" y1="34" x2="50" y2="34" stroke={col} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="32" y1="38" x2="44" y2="38" stroke={col} strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
      <circle cx="48" cy="44" r="8" fill="#0a0d1e" stroke={col} strokeWidth="1.5"/>
      <text x="48" y="48" textAnchor="middle" fontSize="10" fill={col} fontWeight="bold" fontFamily="monospace">$</text>
    </svg>
  ),
  'blog': (col) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="10" y="10" width="36" height="44" rx="3" stroke={col} strokeWidth="1.8" fill="none"/>
      <line x1="17" y1="20" x2="39" y2="20" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="17" y1="27" x2="39" y2="27" stroke={col} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="17" y1="33" x2="33" y2="33" stroke={col} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <line x1="17" y1="39" x2="36" y2="39" stroke={col} strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
      <line x1="17" y1="45" x2="30" y2="45" stroke={col} strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
      <circle cx="46" cy="44" r="10" fill="#0a0d1e" stroke={col} strokeWidth="1.5"/>
      <path d="M41 44 L43 46 L51 38" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const RANKS = {
  'web-info':'S','ecommerce':'A','android':'A','ios':'S',
  'hybrid':'S','digital':'A','payment':'B','blog':'B'
};

export default function CyberServiceCard({ service, delay = 0, onClick, autoLoop = false }) {
  const col = service.col || '#00C9FF';
  const rank = RANKS[service.id] || 'A';
  const IconFn = ICONS[service.id];
  const [hovered, setHovered] = useState(false);
  const [scanY, setScanY] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  // Scan line animation
  useEffect(() => {
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const progress = ((ts - startRef.current) % 3000) / 3000;
      setScanY(progress * 100);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const glowRgb = col.replace('#','').match(/.{2}/g)
    ?.map(h => parseInt(h,16)).join(',') || '0,201,255';

  return (
    <motion.div
      initial={{ opacity:0, y:30 }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay, duration:0.5, type:'spring', stiffness:180 }}
      whileHover={{ y:-10, scale:1.03 }}
      whileTap={{ scale:0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{
        position:'relative', cursor:'pointer', borderRadius:10,
        background:'linear-gradient(155deg,rgba(5,8,30,0.95),rgba(8,12,40,0.98))',
        border:`1px solid ${hovered ? col : col+'44'}`,
        overflow:'hidden', padding:'16px 14px 14px',
        boxShadow: hovered
          ? `0 0 0 1px ${col}88, 0 8px 32px rgba(${glowRgb},0.25), inset 0 1px 0 rgba(255,255,255,0.05)`
          : `0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)`,
        transition:'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Scan line */}
      <div style={{
        position:'absolute', left:0, right:0, height:1,
        background:`linear-gradient(90deg,transparent,${col}66,transparent)`,
        top:`${scanY}%`, pointerEvents:'none', zIndex:5,
        opacity: hovered ? 0.8 : 0.3,
        transition:'opacity 0.3s',
      }}/>

      {/* Corner ornaments */}
      {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h],i) => (
        <div key={i} style={{
          position:'absolute', [v]:4, [h]:4, width:10, height:10,
          borderTop: v==='top' ? `1.5px solid ${col}88` : 'none',
          borderBottom: v==='bottom' ? `1.5px solid ${col}88` : 'none',
          borderLeft: h==='left' ? `1.5px solid ${col}88` : 'none',
          borderRight: h==='right' ? `1.5px solid ${col}88` : 'none',
          borderRadius: v==='top'&&h==='left'?'3px 0 0 0':v==='top'&&h==='right'?'0 3px 0 0':v==='bottom'&&h==='left'?'0 0 0 3px':'0 0 3px 0',
          opacity: hovered ? 1 : 0.5, transition:'opacity 0.3s',
        }}/>
      ))}

      {/* Top row: rank + card number */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <div style={{
          fontFamily:'Orbitron,monospace', fontSize:9, fontWeight:900,
          color:col, border:`1px solid ${col}55`, borderRadius:3,
          padding:'2px 7px', letterSpacing:1.5, background:`${col}10`,
        }}>
          {rank}-RANK
        </div>
        <div style={{
          fontFamily:'monospace', fontSize:8, color:`${col}66`, letterSpacing:1,
        }}>
          {String(Object.keys(ICONS).indexOf(service.id)+1).padStart(3,'0')}/008
        </div>
      </div>

      {/* Icon */}
      <div style={{
        display:'flex', justifyContent:'center', alignItems:'center',
        height:72, marginBottom:10, position:'relative',
        filter: hovered ? `drop-shadow(0 0 12px ${col}99)` : `drop-shadow(0 2px 8px ${col}44)`,
        transition:'filter 0.3s',
      }}>
        {IconFn && IconFn(col)}
        {/* Glow orb behind icon */}
        <div style={{
          position:'absolute', width:50, height:50, borderRadius:'50%',
          background:`radial-gradient(circle,${col}18 0%,transparent 70%)`,
          animation:'aurora1 4s ease-in-out infinite',
        }}/>
      </div>

      {/* Top border line under icon */}
      <div style={{ height:1, background:`linear-gradient(90deg,transparent,${col}44,transparent)`, marginBottom:10 }}/>

      {/* Name */}
      <h3 style={{
        fontFamily:'Orbitron,monospace', fontSize:10, fontWeight:700,
        color:'#e0f0ff', letterSpacing:0.8, marginBottom:4, textAlign:'center',
        textShadow: hovered ? `0 0 12px ${col}` : 'none',
        transition:'text-shadow 0.3s',
      }}>
        {service.title.toUpperCase()}
      </h3>

      {/* Tagline */}
      <p style={{
        fontFamily:'Rajdhani,sans-serif', fontSize:9.5, color:`rgba(160,200,240,0.6)`,
        textAlign:'center', lineHeight:1.4, marginBottom:10,
      }}>
        {service.short}
      </p>

      {/* Skill mini-tags */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:3, justifyContent:'center' }}>
        {(service.tech || []).slice(0,3).map(t => (
          <span key={t} style={{
            fontFamily:'monospace', fontSize:8, color:`${col}cc`,
            border:`1px solid ${col}33`, borderRadius:2,
            padding:'1px 5px', background:`${col}08`,
          }}>{t}</span>
        ))}
      </div>

      {/* CTA link */}
      <div style={{
        marginTop:10, textAlign:'center',
        fontFamily:'Rajdhani,sans-serif', fontSize:10, fontWeight:700,
        color: hovered ? col : `${col}88`,
        letterSpacing:1.2, transition:'color 0.3s',
      }}>
        {service.title} →
      </div>
    </motion.div>
  );
}
