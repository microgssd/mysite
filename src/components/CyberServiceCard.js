import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ── BIG detailed cyberpunk SVG icons ──────────────────────
const ICONS = {
  'web-info': (col) => (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      {/* Monitor frame */}
      <rect x="6" y="10" width="78" height="52" rx="5" stroke={col} strokeWidth="1.8" fill={`${col}08`}/>
      {/* Screen glass */}
      <rect x="10" y="14" width="70" height="44" rx="3" stroke={col} strokeWidth="0.8" strokeOpacity="0.4" fill={`${col}05`}/>
      {/* Title bar */}
      <rect x="10" y="14" width="70" height="10" rx="3" fill={`${col}18`}/>
      <circle cx="16" cy="19" r="2.2" fill="#ff6b6b" opacity="0.8"/>
      <circle cx="23" cy="19" r="2.2" fill="#ffd93d" opacity="0.8"/>
      <circle cx="30" cy="19" r="2.2" fill="#6bcb77" opacity="0.8"/>
      {/* URL bar */}
      <rect x="36" y="15.5" width="36" height="7" rx="3.5" stroke={col} strokeWidth="0.8" strokeOpacity="0.5" fill={`${col}10`}/>
      <circle cx="40" cy="19" r="1.5" fill={col} opacity="0.5"/>
      <rect x="43" y="17.5" width="24" height="3" rx="1.5" fill={col} opacity="0.35"/>
      {/* Content area */}
      <rect x="14" y="28" width="28" height="3" rx="1.5" fill={col} opacity="0.7"/>
      <rect x="14" y="34" width="42" height="2" rx="1" fill={col} opacity="0.4"/>
      <rect x="14" y="39" width="36" height="2" rx="1" fill={col} opacity="0.3"/>
      <rect x="14" y="44" width="40" height="2" rx="1" fill={col} opacity="0.25"/>
      {/* Right panel image placeholder */}
      <rect x="58" y="27" width="18" height="22" rx="2" stroke={col} strokeWidth="0.8" strokeOpacity="0.5" fill={`${col}08`}/>
      <path d="M62 44 L66 38 L70 42 L72 39 L76 44Z" fill={col} opacity="0.3"/>
      <circle cx="64" cy="32" r="2" fill={col} opacity="0.4"/>
      {/* Code lines */}
      <rect x="14" y="50" width="18" height="2" rx="1" fill="#4FFFB0" opacity="0.5"/>
      <rect x="35" y="50" width="24" height="2" rx="1" fill={col} opacity="0.25"/>
      {/* Stand */}
      <path d="M38 62 L52 62 L54 72 L36 72Z" stroke={col} strokeWidth="1.2" fill={`${col}10`}/>
      <line x1="34" y1="72" x2="56" y2="72" stroke={col} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Animated cursor blink */}
      <rect x="50" y="33" width="2" height="8" rx="1" fill={col}>
        <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite"/>
      </rect>
      {/* Glow scan across screen */}
      <rect x="10" y="14" width="6" height="44" rx="2" fill={`${col}15`}>
        <animateTransform attributeName="transform" type="translate" values="-6,0;68,0;-6,0" dur="3s" repeatCount="indefinite"/>
      </rect>
    </svg>
  ),

  'ecommerce': (col) => (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      {/* Shopping bag */}
      <path d="M22 30 L26 14 L64 14 L68 30 L70 68 L20 68 Z" stroke={col} strokeWidth="1.8" fill={`${col}08`} strokeLinejoin="round"/>
      {/* Bag handle */}
      <path d="M34 14 Q34 6 45 6 Q56 6 56 14" stroke={col} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Product item inside */}
      <rect x="30" y="38" width="30" height="22" rx="3" stroke={col} strokeWidth="1" strokeOpacity="0.5" fill={`${col}10`}/>
      {/* Star rating */}
      <text x="32" y="52" fill={col} fontSize="6" opacity="0.8">★★★★★</text>
      {/* Price tag */}
      <rect x="52" y="20" width="16" height="8" rx="4" fill={col} opacity="0.85"/>
      <text x="60" y="26" fill="#030412" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">$$$</text>
      {/* Cart wheel circles */}
      <circle cx="31" cy="74" r="4.5" stroke={col} strokeWidth="1.5" fill={`${col}12`}/>
      <circle cx="59" cy="74" r="4.5" stroke={col} strokeWidth="1.5" fill={`${col}12`}/>
      <circle cx="31" cy="74" r="1.5" fill={col} opacity="0.6"/>
      <circle cx="59" cy="74" r="1.5" fill={col} opacity="0.6"/>
      {/* Scan lines on bag */}
      <line x1="24" y1="42" x2="66" y2="42" stroke={col} strokeWidth="0.6" strokeOpacity="0.3" strokeDasharray="3,3"/>
      <line x1="24" y1="50" x2="66" y2="50" stroke={col} strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="3,3"/>
      {/* Notification badge */}
      <circle cx="68" cy="28" r="6" fill="#ff4d4d" opacity="0.9"/>
      <text x="68" y="31" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">+</text>
      {/* Floating dollar */}
      <text x="10" y="28" fill={col} fontSize="14" opacity="0.4" fontFamily="monospace">
        $
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
      </text>
    </svg>
  ),

  'android': (col) => (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      {/* Phone body */}
      <rect x="24" y="8" width="42" height="74" rx="8" stroke={col} strokeWidth="1.8" fill={`${col}08`}/>
      {/* Screen */}
      <rect x="28" y="16" width="34" height="54" rx="4" stroke={col} strokeWidth="0.8" strokeOpacity="0.5" fill={`${col}06`}/>
      {/* Status bar */}
      <rect x="28" y="16" width="34" height="8" rx="4" fill={`${col}15`}/>
      <rect x="31" y="19" width="8" height="2" rx="1" fill={col} opacity="0.5"/>
      <circle cx="58" cy="20" r="1.5" fill={col} opacity="0.5"/>
      <circle cx="54" cy="20" r="1.5" fill={col} opacity="0.35"/>
      {/* App grid */}
      <rect x="31" y="28" width="10" height="10" rx="2.5" fill={`${col}20`} stroke={col} strokeWidth="0.8"/>
      <rect x="44" y="28" width="10" height="10" rx="2.5" fill={`${col}15`} stroke={col} strokeWidth="0.8"/>
      <rect x="31" y="42" width="10" height="10" rx="2.5" fill={`${col}12`} stroke={col} strokeWidth="0.8"/>
      <rect x="44" y="42" width="10" height="10" rx="2.5" fill={`${col}18`} stroke={col} strokeWidth="0.8"/>
      {/* App icons inside */}
      <path d="M34 33 L38 37 M38 33 L34 37" stroke={col} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="49" cy="33" r="2.5" stroke={col} strokeWidth="1" fill="none"/>
      <circle cx="36" cy="47" r="2" fill={col} opacity="0.5"/>
      <path d="M45 44 L51 44 M45 48 L49 48" stroke={col} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      {/* Notification dot */}
      <circle cx="56" cy="26" r="3" fill="#ff4d4d" opacity="0.9"/>
      {/* Bottom nav */}
      <rect x="28" y="56" width="34" height="14" rx="2" fill={`${col}10`}/>
      <circle cx="36" cy="63" r="2.5" stroke={col} strokeWidth="1" fill="none"/>
      <rect x="43" y="60" width="8" height="2" rx="1" fill={col} opacity="0.4"/>
      <rect x="43" y="64" width="6" height="2" rx="1" fill={col} opacity="0.3"/>
      {/* Android antenna ears */}
      <line x1="34" y1="8" x2="30" y2="2" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="56" y1="8" x2="60" y2="2" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <circle cx="30" cy="2" r="2" fill={col} opacity="0.7"/>
      <circle cx="60" cy="2" r="2" fill={col} opacity="0.7"/>
      {/* Home button */}
      <rect x="39" y="84" width="12" height="4" rx="2" stroke={col} strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  ),

  'ios': (col) => (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      {/* Phone - sleek flat design */}
      <rect x="22" y="5" width="46" height="80" rx="10" stroke={col} strokeWidth="1.8" fill={`${col}08`}/>
      {/* Side buttons */}
      <rect x="18" y="24" width="3" height="12" rx="1.5" fill={col} opacity="0.4"/>
      <rect x="18" y="38" width="3" height="12" rx="1.5" fill={col} opacity="0.4"/>
      <rect x="69" y="28" width="3" height="16" rx="1.5" fill={col} opacity="0.4"/>
      {/* Screen */}
      <rect x="26" y="13" width="38" height="64" rx="6" stroke={col} strokeWidth="0.8" strokeOpacity="0.4" fill={`${col}06`}/>
      {/* Dynamic island */}
      <rect x="36" y="16" width="18" height="6" rx="3" fill={`${col}30`} stroke={col} strokeWidth="0.8"/>
      <circle cx="43" cy="19" r="1.5" fill={col} opacity="0.6"/>
      <circle cx="47" cy="19" r="1" fill={col} opacity="0.3"/>
      {/* App screens */}
      <rect x="29" y="26" width="36" height="24" rx="3" fill={`${col}10`} stroke={col} strokeWidth="0.6" strokeOpacity="0.4"/>
      {/* iOS style icon grid */}
      <rect x="31" y="28" width="8" height="8" rx="2" fill={`${col}25`}/>
      <rect x="41" y="28" width="8" height="8" rx="2" fill={`${col}18`}/>
      <rect x="51" y="28" width="8" height="8" rx="2" fill={`${col}20`}/>
      <rect x="31" y="38" width="8" height="8" rx="2" fill={`${col}15`}/>
      <rect x="41" y="38" width="8" height="8" rx="2" fill={`${col}22`}/>
      <rect x="51" y="38" width="8" height="8" rx="2" fill={`${col}18`}/>
      {/* Apple-style gradient bar */}
      <rect x="29" y="54" width="36" height="2" rx="1" fill={`${col}30`}/>
      {/* Text content */}
      <rect x="29" y="60" width="24" height="2.5" rx="1.2" fill={col} opacity="0.5"/>
      <rect x="29" y="65" width="32" height="2" rx="1" fill={col} opacity="0.3"/>
      <rect x="29" y="70" width="20" height="2" rx="1" fill={col} opacity="0.2"/>
      {/* Home indicator */}
      <rect x="37" y="80" width="16" height="3" rx="1.5" fill={col} opacity="0.4"/>
      {/* Apple logo suggestion */}
      <path d="M45 52 Q46 48 50 49 Q50 50.5 48 51 Q50 51 50 53 Q47 54.5 45 52Z" fill={col} opacity="0.5"/>
    </svg>
  ),

  'hybrid': (col) => (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      {/* Left device - Android */}
      <rect x="5" y="18" width="30" height="54" rx="6" stroke={col} strokeWidth="1.5" fill={`${col}08`}/>
      <rect x="9" y="24" width="22" height="36" rx="3" stroke={col} strokeWidth="0.7" strokeOpacity="0.4" fill={`${col}06`}/>
      {/* Right device - iOS */}
      <rect x="55" y="18" width="30" height="54" rx="6" stroke={col} strokeWidth="1.5" fill={`${col}08`}/>
      <rect x="59" y="24" width="22" height="36" rx="3" stroke={col} strokeWidth="0.7" strokeOpacity="0.4" fill={`${col}06`}/>
      {/* Shared code symbol in center */}
      <circle cx="45" cy="45" r="12" stroke={col} strokeWidth="1.5" fill={`${col}12`}/>
      {/* </> code icon */}
      <path d="M38 45 L42 41 L42 49Z" fill={col} opacity="0.8"/>
      <path d="M52 45 L48 41 L48 49Z" fill={col} opacity="0.8"/>
      <line x1="43" y1="42" x2="47" y2="48" stroke={col} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Connection lines */}
      <line x1="35" y1="38" x2="33" y2="38" stroke={col} strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
      <line x1="35" y1="45" x2="33" y2="45" stroke={col} strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
      <line x1="35" y1="52" x2="33" y2="52" stroke={col} strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
      <line x1="55" y1="38" x2="57" y2="38" stroke={col} strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
      <line x1="55" y1="45" x2="57" y2="45" stroke={col} strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
      <line x1="55" y1="52" x2="57" y2="52" stroke={col} strokeWidth="1" strokeDasharray="2,2" opacity="0.5"/>
      {/* App content squares left */}
      <rect x="11" y="26" width="8" height="8" rx="2" fill={`${col}20`}/>
      <rect x="21" y="26" width="8" height="8" rx="2" fill={`${col}15`}/>
      <rect x="11" y="36" width="18" height="2.5" rx="1.2" fill={col} opacity="0.3"/>
      {/* App content squares right */}
      <rect x="61" y="26" width="8" height="8" rx="2" fill={`${col}20`}/>
      <rect x="71" y="26" width="8" height="8" rx="2" fill={`${col}15`}/>
      <rect x="61" y="36" width="18" height="2.5" rx="1.2" fill={col} opacity="0.3"/>
      {/* Sync arrows */}
      <path d="M45 75 Q35 80 28 74" stroke={col} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M45 75 Q55 80 62 74" stroke={col} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <circle cx="45" cy="75" r="2.5" fill={col} opacity="0.6">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  ),

  'digital': (col) => (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      {/* Chart axes */}
      <line x1="12" y1="72" x2="12" y2="12" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="12" y1="72" x2="78" y2="72" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      {/* Axis ticks */}
      {[20,34,48,62].map(x=><line key={x} x1={x} y1="70" x2={x} y2="74" stroke={col} strokeWidth="1" opacity="0.35"/>)}
      {[20,35,50,65].map(y=><line key={y} x1="10" y1={y} x2="14" y2={y} stroke={col} strokeWidth="1" opacity="0.35"/>)}
      {/* Area fill */}
      <path d="M12 72 L20 58 L32 42 L44 50 L56 28 L68 34 L78 18 L78 72Z" fill={`${col}12`}/>
      {/* Main line */}
      <polyline points="12,72 20,58 32,42 44,50 56,28 68,34 78,18" stroke={col} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Data points */}
      <circle cx="20" cy="58" r="4" fill={`${col}30`} stroke={col} strokeWidth="1.5"/>
      <circle cx="32" cy="42" r="4" fill={`${col}30`} stroke={col} strokeWidth="1.5"/>
      <circle cx="44" cy="50" r="4" fill={`${col}30`} stroke={col} strokeWidth="1.5"/>
      <circle cx="56" cy="28" r="5" fill={col} stroke={col} strokeWidth="1.5"/>
      <circle cx="68" cy="34" r="4" fill={`${col}30`} stroke={col} strokeWidth="1.5"/>
      <circle cx="78" cy="18" r="5" fill={col}/>
      {/* Up arrow on last point */}
      <path d="M74 14 L78 8 L82 14" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* SEO badge */}
      <rect x="4" y="4" width="24" height="10" rx="3" fill={`${col}20`} stroke={col} strokeWidth="0.8"/>
      <text x="16" y="12" fill={col} fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">SEO</text>
      {/* Tooltip on peak */}
      <rect x="60" y="16" width="22" height="12" rx="3" fill={`${col}25`} stroke={col} strokeWidth="0.8"/>
      <text x="71" y="25" fill={col} fontSize="6" textAnchor="middle" fontFamily="monospace">+320%</text>
      {/* Grid lines */}
      {[28,42,56].map(y=><line key={y} x1="12" y1={y} x2="78" y2={y} stroke={col} strokeWidth="0.5" strokeDasharray="4,4" opacity="0.15"/>)}
    </svg>
  ),

  'payment': (col) => (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      {/* Main credit card */}
      <rect x="8" y="20" width="62" height="40" rx="6" stroke={col} strokeWidth="1.8" fill={`${col}10`}/>
      {/* Card stripe */}
      <rect x="8" y="32" width="62" height="10" fill={`${col}22`}/>
      {/* Card chip */}
      <rect x="16" y="22" width="14" height="11" rx="2" stroke={col} strokeWidth="1" fill={`${col}20`}/>
      <line x1="16" y1="25.5" x2="30" y2="25.5" stroke={col} strokeWidth="0.7" opacity="0.5"/>
      <line x1="16" y1="29" x2="30" y2="29" stroke={col} strokeWidth="0.7" opacity="0.5"/>
      <line x1="23" y1="22" x2="23" y2="33" stroke={col} strokeWidth="0.7" opacity="0.5"/>
      {/* Card number dots */}
      {[20,28,36,44].map(x=>(
        <g key={x}>
          <circle cx={x} cy="48" r="1.5" fill={col} opacity="0.6"/>
          <circle cx={x+3} cy="48" r="1.5" fill={col} opacity="0.6"/>
          <circle cx={x+6} cy="48" r="1.5" fill={col} opacity="0.6"/>
        </g>
      ))}
      {/* WiFi/tap symbol */}
      <path d="M54 24 Q58 21 62 24" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M56 27 Q58 25.5 60 27" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.9"/>
      <circle cx="58" cy="29.5" r="1.5" fill={col} opacity="0.9"/>
      {/* Second card behind */}
      <rect x="18" y="32" width="62" height="40" rx="6" stroke={col} strokeWidth="1" strokeOpacity="0.4" fill={`${col}05`}/>
      {/* Secure shield */}
      <path d="M74 58 Q74 52 80 50 Q86 52 86 58 Q86 64 80 67 Q74 64 74 58Z" stroke={col} strokeWidth="1.5" fill={`${col}15`}/>
      <path d="M77 58 L79 60 L83 56" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Transaction arrows */}
      <path d="M8 76 L24 76" stroke={col} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M22 73 L26 76 L22 79" stroke={col} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),

  'blog': (col) => (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      {/* Main document */}
      <rect x="10" y="6" width="52" height="68" rx="5" stroke={col} strokeWidth="1.8" fill={`${col}08`}/>
      {/* Folded corner */}
      <path d="M62 6 L62 18 L74 18" stroke={col} strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M62 6 L74 18 L74 74 Q74 78 70 78 L10 78 Q6 78 6 74 L6 6Z" stroke={col} strokeWidth="0" fill="none"/>
      {/* Header image area */}
      <rect x="14" y="10" width="44" height="22" rx="3" fill={`${col}12`} stroke={col} strokeWidth="0.7" strokeOpacity="0.5"/>
      <path d="M18 28 L26 18 L34 24 L40 18 L52 28Z" fill={col} opacity="0.2"/>
      <circle cx="22" cy="16" r="3" fill={col} opacity="0.3"/>
      {/* Title */}
      <rect x="14" y="36" width="36" height="4" rx="2" fill={col} opacity="0.7"/>
      {/* Body text lines */}
      <rect x="14" y="44" width="44" height="2.5" rx="1.2" fill={col} opacity="0.4"/>
      <rect x="14" y="50" width="40" height="2.5" rx="1.2" fill={col} opacity="0.35"/>
      <rect x="14" y="56" width="44" height="2.5" rx="1.2" fill={col} opacity="0.3"/>
      <rect x="14" y="62" width="30" height="2.5" rx="1.2" fill={col} opacity="0.25"/>
      {/* Tags */}
      <rect x="14" y="68" width="14" height="6" rx="3" fill={`${col}20`} stroke={col} strokeWidth="0.7"/>
      <rect x="30" y="68" width="18" height="6" rx="3" fill={`${col}15`} stroke={col} strokeWidth="0.7"/>
      {/* Floating notification */}
      <circle cx="72" cy="30" r="14" stroke={col} strokeWidth="1.2" fill={`${col}10`}/>
      <text x="72" y="27" fill={col} fontSize="10" textAnchor="middle" fontFamily="monospace">✍</text>
      <circle cx="80" cy="20" r="5" fill="#ff4d4d" opacity="0.9"/>
      <text x="80" y="23" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle">3</text>
      {/* Views counter */}
      <rect x="54" y="78" width="28" height="10" rx="5" fill={`${col}15`} stroke={col} strokeWidth="0.8"/>
      <text x="68" y="85" fill={col} fontSize="7" textAnchor="middle" fontFamily="monospace">1.2K ♥</text>
    </svg>
  ),
};

const RANKS = {
  'web-info':'S','ecommerce':'A','android':'A','ios':'S',
  'hybrid':'S','digital':'A','payment':'B','blog':'B'
};

export default function CyberServiceCard({ service, delay = 0, onClick }) {
  const col = service.col || '#00C9FF';
  const rank = RANKS[service.id] || 'A';
  const IconFn = ICONS[service.id];
  const [hovered, setHovered] = useState(false);
  const [scanY, setScanY] = useState(0);
  const rafRef = useRef(null);
  const t0Ref = useRef(null);

  useEffect(() => {
    const run = (ts) => {
      if (!t0Ref.current) t0Ref.current = ts;
      setScanY(((ts - t0Ref.current) % 3000) / 3000 * 100);
      rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <motion.div
      initial={{ opacity:0, y:30 }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay, duration:0.5, type:'spring', stiffness:180 }}
      whileHover={{ y:-10, scale:1.04 }}
      whileTap={{ scale:0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{
        position:'relative', cursor:'pointer', borderRadius:12,
        background:`linear-gradient(155deg,rgba(4,7,26,0.97),rgba(6,10,32,0.99))`,
        border:`1px solid ${hovered ? col : col+'33'}`,
        overflow:'hidden', padding:'18px 16px 16px',
        boxShadow: hovered
          ? `0 0 0 1px ${col}66, 0 12px 40px rgba(0,0,0,0.6), 0 0 30px ${col}18`
          : `0 4px 24px rgba(0,0,0,0.55)`,
        transition:'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Scan line */}
      <div style={{ position:'absolute', left:0, right:0, height:1.5,
        background:`linear-gradient(90deg,transparent,${col}77,transparent)`,
        top:`${scanY}%`, pointerEvents:'none', zIndex:5,
        opacity: hovered ? 1 : 0.35, transition:'opacity 0.3s' }}/>

      {/* Corner ornaments */}
      {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h],i) => (
        <div key={i} style={{ position:'absolute', [v]:5, [h]:5, width:12, height:12,
          borderTop: v==='top' ? `1.5px solid ${hovered?col:col+'66'}` : 'none',
          borderBottom: v==='bottom' ? `1.5px solid ${hovered?col:col+'66'}` : 'none',
          borderLeft: h==='left' ? `1.5px solid ${hovered?col:col+'66'}` : 'none',
          borderRight: h==='right' ? `1.5px solid ${hovered?col:col+'66'}` : 'none',
          borderRadius: v==='top'&&h==='left'?'3px 0 0 0':v==='top'&&h==='right'?'0 3px 0 0':v==='bottom'&&h==='left'?'0 0 0 3px':'0 0 3px 0',
          transition:'border-color 0.3s' }}/>
      ))}

      {/* Top row: rank badge + card no */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontFamily:'Orbitron,monospace', fontSize:10, fontWeight:900, color:col,
          border:`1px solid ${col}55`, borderRadius:4, padding:'3px 9px', letterSpacing:1.5,
          background:`${col}0f`, boxShadow:`0 0 8px ${col}22` }}>
          {rank}-RANK
        </div>
        <div style={{ fontFamily:'monospace', fontSize:9, color:`${col}55`, letterSpacing:1 }}>
          {String(Object.keys(ICONS).indexOf(service.id)+1).padStart(3,'0')}/008
        </div>
      </div>

      {/* Icon — large, detailed */}
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center',
        height:96, marginBottom:12, position:'relative',
        filter: hovered
          ? `drop-shadow(0 0 16px ${col}cc) drop-shadow(0 0 6px ${col}88)`
          : `drop-shadow(0 2px 10px ${col}55)`,
        transition:'filter 0.35s' }}>
        {IconFn && IconFn(col)}
        {/* Glow orb */}
        <div style={{ position:'absolute', width:60, height:60, borderRadius:'50%',
          background:`radial-gradient(circle,${col}14 0%,transparent 70%)`,
          animation:'aurora3 4s ease-in-out infinite', pointerEvents:'none' }}/>
      </div>

      {/* Divider */}
      <div style={{ height:1, background:`linear-gradient(90deg,transparent,${col}55,transparent)`, marginBottom:12 }}/>

      {/* Service name */}
      <h3 style={{ fontFamily:'Orbitron,monospace', fontSize:10.5, fontWeight:700,
        color: hovered ? '#ffffff' : '#c8e8ff', letterSpacing:0.8, marginBottom:5, textAlign:'center',
        textShadow: hovered ? `0 0 14px ${col}` : 'none', transition:'text-shadow 0.3s, color 0.3s' }}>
        {service.title.toUpperCase()}
      </h3>

      {/* Short desc */}
      <p style={{ fontFamily:'Rajdhani,sans-serif', fontSize:10.5, color:`rgba(148,198,240,0.6)`,
        textAlign:'center', lineHeight:1.45, marginBottom:12 }}>
        {service.short}
      </p>

      {/* Tech chips */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:4, justifyContent:'center', marginBottom:10 }}>
        {(service.tech || []).slice(0,3).map(t => (
          <span key={t} style={{ fontFamily:'monospace', fontSize:8.5, color:`${col}bb`,
            border:`1px solid ${col}2a`, borderRadius:3, padding:'2px 6px', background:`${col}08` }}>{t}</span>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign:'center', fontFamily:'Rajdhani,sans-serif', fontSize:11, fontWeight:700,
        color: hovered ? col : `${col}77`, letterSpacing:1.2, transition:'color 0.3s' }}>
        {service.title} →
      </div>
    </motion.div>
  );
}
