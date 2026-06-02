import React from 'react';
import { motion } from 'framer-motion';

/* Each character is an SVG "pixel-art inspired" illustration that animates */

const bob = { y: [0, -8, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } };
const breathe = { scaleY: [1, 1.04, 1], transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } };

/* ── WIZARD ─────────────────────────────────────────────── */
function Wizard({ size = 90 }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 60 70" animate={bob}>
      {/* Hat */}
      <motion.polygon points="30,2 10,28 50,28" fill="#1a0a5e" animate={{ scaleX:[1,1.03,1] }} transition={{ duration:2.5,repeat:Infinity }} />
      <rect x="8" y="26" width="44" height="6" rx="3" fill="#2a1a8e" />
      <circle cx="30" cy="18" r="3" fill="#FFD700" />
      {/* Stars on hat */}
      <text x="20" y="22" fontSize="5" fill="#FFD700">★</text>
      <text x="34" y="24" fontSize="4" fill="#00C9FF">✦</text>
      {/* Face */}
      <ellipse cx="30" cy="38" rx="13" ry="12" fill="#f4c28c" />
      {/* Eyes */}
      <ellipse cx="24" cy="36" rx="2.5" ry="3" fill="white" />
      <ellipse cx="36" cy="36" rx="2.5" ry="3" fill="white" />
      <circle cx="25" cy="36.5" r="1.5" fill="#1a1aff" />
      <circle cx="37" cy="36.5" r="1.5" fill="#1a1aff" />
      <circle cx="25.8" cy="35.8" r=".5" fill="white" />
      <circle cx="37.8" cy="35.8" r=".5" fill="white" />
      {/* Beard */}
      <ellipse cx="30" cy="44" rx="7" ry="5" fill="#ddd" />
      <rect x="23" y="42" width="14" height="8" rx="3" fill="#ccc" />
      {/* Robe */}
      <rect x="18" y="50" width="24" height="16" rx="4" fill="#2a1a8e" />
      <line x1="30" y1="50" x2="30" y2="66" stroke="#FFD700" strokeWidth="1.5" />
      {/* Arms */}
      <motion.line x1="18" y1="54" x2="8" y2="60" stroke="#2a1a8e" strokeWidth="5" strokeLinecap="round"
        animate={{ rotate:[-5,10,-5] }} style={{ transformOrigin:'18px 54px' }} transition={{ duration:1.5,repeat:Infinity }} />
      <motion.line x1="42" y1="54" x2="52" y2="58" stroke="#2a1a8e" strokeWidth="5" strokeLinecap="round"
        animate={{ rotate:[5,-8,5] }} style={{ transformOrigin:'42px 54px' }} transition={{ duration:1.8,repeat:Infinity }} />
      {/* Staff */}
      <line x1="52" y1="58" x2="56" y2="42" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
      <motion.circle cx="56" cy="40" r="4" fill="#FFD700" animate={{ opacity:[0.7,1,0.7], scale:[0.9,1.1,0.9] }} transition={{ duration:1.2,repeat:Infinity }} />
      {/* Magic sparkles */}
      <motion.text x="4" y="50" fontSize="7" fill="#00C9FF" animate={{ opacity:[0,1,0], y:[50,44,50] }} transition={{ duration:2,repeat:Infinity }}>✦</motion.text>
      <motion.text x="50" y="46" fontSize="5" fill="#FFD700" animate={{ opacity:[0,1,0], y:[46,40,46] }} transition={{ duration:1.6,repeat:Infinity,delay:.5 }}>★</motion.text>
    </motion.svg>
  );
}

/* ── GOBLIN ─────────────────────────────────────────────── */
function Goblin({ size = 90 }) {
  return (
    <motion.svg width={size} height={size * 1.1} viewBox="0 0 60 66" animate={bob} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
      {/* Body */}
      <ellipse cx="30" cy="48" rx="14" ry="16" fill="#2d8a2d" />
      {/* Head */}
      <ellipse cx="30" cy="26" rx="18" ry="16" fill="#3aad3a" />
      {/* Ears */}
      <ellipse cx="12" cy="22" rx="5" ry="7" fill="#2d8a2d" />
      <ellipse cx="48" cy="22" rx="5" ry="7" fill="#2d8a2d" />
      <ellipse cx="12" cy="22" rx="2.5" ry="4" fill="#ff9999" />
      <ellipse cx="48" cy="22" rx="2.5" ry="4" fill="#ff9999" />
      {/* Eyes - wide & evil */}
      <ellipse cx="22" cy="22" rx="6" ry="5" fill="#FFD700" />
      <ellipse cx="38" cy="22" rx="6" ry="5" fill="#FFD700" />
      <circle cx="22" cy="23" r="3" fill="#cc0000" />
      <circle cx="38" cy="23" r="3" fill="#cc0000" />
      <circle cx="23.5" cy="22" r="1" fill="black" />
      <circle cx="39.5" cy="22" r="1" fill="black" />
      {/* Eyebrows - frowning */}
      <path d="M 16 16 Q 22 13 28 16" stroke="#1a5c1a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 32 16 Q 38 13 44 16" stroke="#1a5c1a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="30" cy="27" rx="4" ry="3" fill="#2d8a2d" />
      <circle cx="27.5" cy="28" r="1.5" fill="#1a5c1a" />
      <circle cx="32.5" cy="28" r="1.5" fill="#1a5c1a" />
      {/* Mouth with teeth */}
      <path d="M 20 34 Q 30 40 40 34" stroke="#1a3a1a" strokeWidth="1.5" fill="#1a3a1a" />
      <rect x="24" y="34" width="5" height="5" fill="white" rx="1" />
      <rect x="31" y="34" width="5" height="5" fill="white" rx="1" />
      {/* Dagger */}
      <motion.g animate={{ rotate:[-8,8,-8] }} style={{ transformOrigin:'50px 55px' }} transition={{ duration:1.3,repeat:Infinity }}>
        <rect x="46" y="44" width="3" height="18" rx="1.5" fill="#999" />
        <polygon points="47.5,44 44,52 51,52" fill="#ccc" />
        <rect x="43" y="54" width="9" height="3" rx="1.5" fill="#8B4513" />
      </motion.g>
      {/* Arms */}
      <ellipse cx="15" cy="50" rx="5" ry="8" fill="#3aad3a" />
      <ellipse cx="45" cy="50" rx="5" ry="8" fill="#3aad3a" />
      {/* Legs */}
      <ellipse cx="22" cy="62" rx="6" ry="5" fill="#2d8a2d" />
      <ellipse cx="38" cy="62" rx="6" ry="5" fill="#2d8a2d" />
      {/* Feet */}
      <ellipse cx="20" cy="65" rx="8" ry="3" fill="#1a5c1a" />
      <ellipse cx="40" cy="65" rx="8" ry="3" fill="#1a5c1a" />
    </motion.svg>
  );
}

/* ── BARBARIAN ───────────────────────────────────────────── */
function Barbarian({ size = 90 }) {
  return (
    <motion.svg width={size} height={size * 1.1} viewBox="0 0 60 68" animate={breathe} style={{ transformOrigin: 'center' }}>
      {/* Helmet */}
      <ellipse cx="30" cy="15" rx="16" ry="14" fill="#8B6914" />
      <rect x="14" y="10" width="32" height="8" rx="2" fill="#a07820" />
      <rect x="22" y="4" width="16" height="6" rx="2" fill="#8B6914" />
      {/* Horns */}
      <motion.polygon points="14,12 8,2 16,14" fill="#c8a020" animate={{ rotate:[-3,3,-3] }} style={{ transformOrigin:'14px 12px' }} transition={{ duration:2,repeat:Infinity }} />
      <motion.polygon points="46,12 52,2 44,14" fill="#c8a020" animate={{ rotate:[3,-3,3] }} style={{ transformOrigin:'46px 12px' }} transition={{ duration:2,repeat:Infinity }} />
      {/* Face */}
      <ellipse cx="30" cy="24" rx="13" ry="12" fill="#d4956a" />
      {/* Eyes */}
      <ellipse cx="24" cy="22" rx="3" ry="2.5" fill="white" />
      <ellipse cx="36" cy="22" rx="3" ry="2.5" fill="white" />
      <circle cx="24" cy="22.5" r="1.8" fill="#333" />
      <circle cx="36" cy="22.5" r="1.8" fill="#333" />
      <circle cx="24.8" cy="21.8" r=".6" fill="white" />
      <circle cx="36.8" cy="21.8" r=".6" fill="white" />
      {/* Beard */}
      <path d="M 20 30 Q 30 38 40 30 L 40 36 Q 30 44 20 36 Z" fill="#8B6914" />
      {/* Body - big */}
      <rect x="14" y="36" width="32" height="22" rx="5" fill="#8B4513" />
      {/* Armor detail */}
      <rect x="22" y="36" width="16" height="22" fill="#6B3410" rx="2" />
      <circle cx="30" cy="42" r="3" fill="#a07820" />
      {/* Arms */}
      <motion.ellipse cx="8" cy="46" rx="6" ry="10" fill="#d4956a"
        animate={{ rotate:[-15,10,-15] }} style={{ transformOrigin:'14px 38px' }} transition={{ duration:1.5,repeat:Infinity }} />
      <motion.ellipse cx="52" cy="46" rx="6" ry="10" fill="#d4956a"
        animate={{ rotate:[15,-10,15] }} style={{ transformOrigin:'46px 38px' }} transition={{ duration:1.5,repeat:Infinity }} />
      {/* Sword */}
      <motion.g animate={{ rotate:[-10,15,-10] }} style={{ transformOrigin:'8px 46px' }} transition={{ duration:1.5,repeat:Infinity }}>
        <rect x="2" y="48" width="3" height="22" rx="1.5" fill="#ccc" />
        <polygon points="3.5,48 0,56 7,56" fill="#ddd" />
        <rect x="0" y="57" width="7" height="3" rx="1.5" fill="#8B4513" />
      </motion.g>
      {/* Legs */}
      <rect x="16" y="56" width="12" height="12" rx="3" fill="#6B3410" />
      <rect x="32" y="56" width="12" height="12" rx="3" fill="#6B3410" />
    </motion.svg>
  );
}

/* ── ARCHER QUEEN ────────────────────────────────────────── */
function ArcherQueen({ size = 90 }) {
  return (
    <motion.svg width={size} height={size * 1.15} viewBox="0 0 60 70" animate={bob} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
      {/* Crown */}
      <motion.g animate={{ y:[0,-2,0] }} transition={{ duration:2,repeat:Infinity }}>
        <polygon points="18,14 22,6 26,14" fill="#FFD700" />
        <polygon points="27,14 30,5 33,14" fill="#FFD700" />
        <polygon points="34,14 38,6 42,14" fill="#FFD700" />
        <rect x="16" y="12" width="28" height="5" rx="2" fill="#FFD700" />
        <circle cx="30" cy="12" r="3" fill="#ff4444" />
        <circle cx="22" cy="14" r="2" fill="#44aaff" />
        <circle cx="38" cy="14" r="2" fill="#44aaff" />
      </motion.g>
      {/* Hair - dark */}
      <ellipse cx="30" cy="26" rx="16" ry="16" fill="#2a1a0a" />
      {/* Flowing hair */}
      <path d="M 14 24 Q 8 32 10 42 Q 14 36 14 30 Z" fill="#2a1a0a" />
      <path d="M 46 24 Q 52 32 50 42 Q 46 36 46 30 Z" fill="#2a1a0a" />
      {/* Face */}
      <ellipse cx="30" cy="28" rx="12" ry="11" fill="#f2c49e" />
      {/* Eyes */}
      <ellipse cx="24" cy="26" rx="3" ry="2.5" fill="white" />
      <ellipse cx="36" cy="26" rx="3" ry="2.5" fill="white" />
      <circle cx="24.5" cy="26.5" r="1.8" fill="#2a1a0a" />
      <circle cx="36.5" cy="26.5" r="1.8" fill="#2a1a0a" />
      <circle cx="25.3" cy="25.8" r=".6" fill="white" />
      <circle cx="37.3" cy="25.8" r=".6" fill="white" />
      {/* Small smile */}
      <path d="M 25 33 Q 30 37 35 33" stroke="#c07060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Body / armor */}
      <rect x="18" y="40" width="24" height="20" rx="4" fill="#4a2070" />
      <rect x="22" y="40" width="16" height="20" fill="#5a2a88" rx="2" />
      {/* Gold armor accents */}
      <path d="M 22 44 Q 30 48 38 44" stroke="#FFD700" strokeWidth="2" fill="none" />
      <circle cx="30" cy="46" r="2" fill="#FFD700" />
      {/* Arms */}
      <motion.line x1="18" y1="44" x2="6" y2="50" stroke="#4a2070" strokeWidth="7" strokeLinecap="round"
        animate={{ rotate:[-10,5,-10] }} style={{ transformOrigin:'18px 44px' }} transition={{ duration:2,repeat:Infinity }} />
      {/* Bow */}
      <motion.g animate={{ rotate:[-5,5,-5] }} style={{ transformOrigin:'6px 50px' }} transition={{ duration:1.8,repeat:Infinity }}>
        <path d="M 4 40 Q -2 50 4 60" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round" />
        <line x1="4" y1="40" x2="4" y2="60" stroke="#d4a450" strokeWidth="1" strokeDasharray="3,2" />
        {/* Arrow */}
        <motion.line x1="4" y1="50" x2="14" y2="50" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"
          animate={{ x1:[4,6,4], x2:[14,16,14] }} transition={{ duration:1.2,repeat:Infinity }} />
        <polygon points="14,50 10,47 10,53" fill="#ccc" />
      </motion.g>
      <motion.line x1="42" y1="44" x2="54" y2="50" stroke="#4a2070" strokeWidth="7" strokeLinecap="round"
        animate={{ rotate:[8,-5,8] }} style={{ transformOrigin:'42px 44px' }} transition={{ duration:2,repeat:Infinity }} />
      {/* Legs */}
      <rect x="20" y="58" width="9" height="12" rx="3" fill="#3a1858" />
      <rect x="31" y="58" width="9" height="12" rx="3" fill="#3a1858" />
      {/* Boots */}
      <ellipse cx="24.5" cy="69" rx="7" ry="3" fill="#2a1040" />
      <ellipse cx="35.5" cy="69" rx="7" ry="3" fill="#2a1040" />
    </motion.svg>
  );
}

/* ── GRAND WARDEN ────────────────────────────────────────── */
function GrandWarden({ size = 90 }) {
  return (
    <motion.svg width={size} height={size * 1.15} viewBox="0 0 60 70" animate={bob} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}>
      {/* Staff / orb at top */}
      <motion.circle cx="48" cy="12" r="8" fill="none" stroke="#4FFFB0" strokeWidth="2"
        animate={{ opacity:[0.5,1,0.5], scale:[0.9,1.1,0.9] }} transition={{ duration:2,repeat:Infinity }} />
      <motion.circle cx="48" cy="12" r="5" fill="#4FFFB0" animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:1.5,repeat:Infinity }} />
      <line x1="48" y1="20" x2="46" y2="58" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
      {/* Beard - long white */}
      <path d="M 20 36 Q 30 28 40 36 L 42 50 Q 36 60 30 62 Q 24 60 18 50 Z" fill="white" />
      <path d="M 24 52 Q 30 60 36 52" fill="#eee" />
      {/* Head */}
      <ellipse cx="30" cy="28" rx="14" ry="13" fill="#f0d5aa" />
      {/* Magic hood */}
      <ellipse cx="30" cy="20" rx="14" ry="12" fill="#2a0a5e" />
      <path d="M 16 18 Q 30 8 44 18 Q 36 16 30 18 Q 24 16 16 18 Z" fill="#3a1a7e" />
      {/* Eyes - glowing */}
      <motion.ellipse cx="24" cy="26" rx="3.5" ry="3" fill="#4FFFB0"
        animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:1.5,repeat:Infinity }} />
      <motion.ellipse cx="36" cy="26" rx="3.5" ry="3" fill="#4FFFB0"
        animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:1.5,repeat:Infinity,delay:.3 }} />
      <circle cx="24.5" cy="26.5" r="1.5" fill="white" />
      <circle cx="36.5" cy="26.5" r="1.5" fill="white" />
      {/* Body - robes */}
      <rect x="14" y="40" width="28" height="22" rx="6" fill="#2a0a5e" />
      <path d="M 14 40 Q 30 46 46 40" stroke="#4FFFB0" strokeWidth="1.5" fill="none" />
      <path d="M 20 40 L 20 62" stroke="#4FFFB0" strokeWidth="1" opacity=".5" />
      <path d="M 40 40 L 40 62" stroke="#4FFFB0" strokeWidth="1" opacity=".5" />
      {/* Floating aura rings */}
      <motion.ellipse cx="30" cy="50" rx="22" ry="6" fill="none" stroke="#4FFFB0" strokeWidth="1" strokeDasharray="4,3"
        animate={{ rotate:360 }} style={{ transformOrigin:'30px 50px' }} transition={{ duration:4,repeat:Infinity,ease:'linear' }} />
      {/* Arm holding staff */}
      <motion.line x1="42" y1="46" x2="46" y2="40" stroke="#2a0a5e" strokeWidth="7" strokeLinecap="round"
        animate={{ rotate:[-3,3,-3] }} style={{ transformOrigin:'42px 46px' }} transition={{ duration:2,repeat:Infinity }} />
      {/* Other arm */}
      <motion.ellipse cx="14" cy="48" rx="5" ry="8" fill="#2a0a5e"
        animate={{ rotate:[-5,5,-5] }} style={{ transformOrigin:'18px 42px' }} transition={{ duration:2.5,repeat:Infinity }} />
    </motion.svg>
  );
}

/* ── BOWLER ──────────────────────────────────────────────── */
function Bowler({ size = 90 }) {
  return (
    <motion.svg width={size} height={size * 1.1} viewBox="0 0 60 66" animate={breathe} style={{ transformOrigin: 'center' }}>
      {/* Rock/ball rolling */}
      <motion.circle cx="10" cy="58" r="9" fill="#666" stroke="#444" strokeWidth="2"
        animate={{ x:[0,4,0] }} transition={{ duration:1.5,repeat:Infinity }} />
      <circle cx="8" cy="56" r="2" fill="#888" />
      <circle cx="13" cy="60" r="1.5" fill="#555" />
      {/* Head */}
      <ellipse cx="34" cy="22" rx="16" ry="15" fill="#c4956a" />
      {/* Unibrow */}
      <path d="M 22 16 Q 34 12 46 16" stroke="#5a3010" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <ellipse cx="27" cy="20" rx="4" ry="3.5" fill="white" />
      <ellipse cx="41" cy="20" rx="4" ry="3.5" fill="white" />
      <circle cx="28" cy="20.5" r="2.2" fill="#333" />
      <circle cx="42" cy="20.5" r="2.2" fill="#333" />
      <circle cx="29" cy="19.8" r=".7" fill="white" />
      <circle cx="43" cy="19.8" r=".7" fill="white" />
      {/* Nose */}
      <ellipse cx="34" cy="26" rx="4" ry="3" fill="#a06040" />
      {/* Mouth - grin */}
      <path d="M 25 32 Q 34 38 43 32" stroke="#5a3010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="28" y="32" width="4" height="4" fill="white" rx="1" />
      <rect x="34" y="32" width="4" height="4" fill="white" rx="1" />
      {/* Loincloth / body */}
      <rect x="20" y="38" width="28" height="16" rx="5" fill="#a0522d" />
      <rect x="26" y="38" width="16" height="16" rx="3" fill="#8B4513" />
      {/* Arms - throwing pose */}
      <motion.ellipse cx="14" cy="46" rx="5" ry="12" fill="#c4956a" transform="rotate(30 14 46)"
        animate={{ rotate:[25,45,25] }} style={{ transformOrigin:'20px 38px' }} transition={{ duration:1.5,repeat:Infinity }} />
      <ellipse cx="48" cy="48" rx="5" ry="10" fill="#c4956a" transform="rotate(-20 48 48)" />
      {/* Legs */}
      <rect x="22" y="52" width="10" height="14" rx="4" fill="#8B4513" />
      <rect x="36" y="52" width="10" height="14" rx="4" fill="#8B4513" />
    </motion.svg>
  );
}

/* ── BOMBER ──────────────────────────────────────────────── */
function Bomber({ size = 90 }) {
  return (
    <motion.svg width={size} height={size * 1.1} viewBox="0 0 60 66" animate={bob} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
      {/* Head */}
      <ellipse cx="30" cy="20" rx="15" ry="14" fill="#c47840" />
      {/* Bandana */}
      <rect x="15" y="14" width="30" height="8" rx="4" fill="#cc2200" />
      <path d="M 45 14 L 52 10 L 52 18 Z" fill="#cc2200" />
      {/* Eyes */}
      <ellipse cx="23" cy="20" rx="4" ry="3.5" fill="#ffe080" />
      <ellipse cx="37" cy="20" rx="4" ry="3.5" fill="#ffe080" />
      <circle cx="23.5" cy="20.5" r="2.2" fill="#333" />
      <circle cx="37.5" cy="20.5" r="2.2" fill="#333" />
      <circle cx="24.3" cy="19.8" r=".7" fill="white" />
      <circle cx="38.3" cy="19.8" r=".7" fill="white" />
      {/* Stubble */}
      <ellipse cx="30" cy="30" rx="8" ry="5" fill="#a05820" />
      <path d="M 23 30 Q 30 34 37 30" fill="#444" />
      {/* Body */}
      <rect x="17" y="34" width="26" height="18" rx="5" fill="#663300" />
      <rect x="23" y="34" width="14" height="18" rx="3" fill="#553300" />
      {/* Bomb */}
      <motion.g animate={{ rotate:[-8,8,-8], y:[0,-2,0] }} style={{ transformOrigin:'48px 36px' }} transition={{ duration:1.3,repeat:Infinity }}>
        <circle cx="48" cy="40" r="10" fill="#222" />
        <circle cx="44" cy="37" r="3" fill="#333" />
        {/* Fuse */}
        <path d="M 48 30 Q 52 25 50 20" stroke="#8B4513" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Spark */}
        <motion.circle cx="50" cy="20" r="3" fill="#FFD700"
          animate={{ opacity:[0,1,0], scale:[0.5,1.2,0.5] }} transition={{ duration:.6,repeat:Infinity }} />
        <motion.text x="46" y="18" fontSize="6" fill="orange" animate={{ opacity:[0,1,0] }} transition={{ duration:.6,repeat:Infinity,delay:.2 }}>✦</motion.text>
      </motion.g>
      {/* Arm holding bomb */}
      <motion.ellipse cx="44" cy="42" rx="5" ry="9" fill="#c47840" transform="rotate(-30 44 42)"
        animate={{ rotate:[-35,-25,-35] }} style={{ transformOrigin:'40px 36px' }} transition={{ duration:1.3,repeat:Infinity }} />
      {/* Other arm */}
      <ellipse cx="14" cy="42" rx="5" ry="9" fill="#c47840" transform="rotate(20 14 42)" />
      {/* Legs */}
      <rect x="19" y="50" width="10" height="14" rx="4" fill="#553300" />
      <rect x="31" y="50" width="10" height="14" rx="4" fill="#553300" />
    </motion.svg>
  );
}

/* ── GOBLIN KING ─────────────────────────────────────────── */
function GoblinKing({ size = 90 }) {
  return (
    <motion.svg width={size} height={size * 1.15} viewBox="0 0 60 70" animate={bob} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
      {/* Crown - big gold */}
      <motion.g animate={{ y:[0,-3,0] }} transition={{ duration:2,repeat:Infinity }}>
        <polygon points="14,16 18,4 22,16" fill="#FFD700" />
        <polygon points="23,16 28,2 33,16" fill="#FFD700" />
        <polygon points="34,16 38,4 42,16" fill="#FFD700" />
        <polygon points="43,16 47,8 51,16" fill="#FFD700" />
        <rect x="12" y="13" width="42" height="7" rx="3" fill="#FFD700" />
        <circle cx="28" cy="13" r="4" fill="#ff4444" />
        <circle cx="19" cy="15" r="3" fill="#44aaff" />
        <circle cx="37" cy="13" r="4" fill="#44ff44" />
        <circle cx="46" cy="15" r="3" fill="#ffaa44" />
      </motion.g>
      {/* Huge head */}
      <ellipse cx="30" cy="32" rx="20" ry="18" fill="#3aad3a" />
      {/* Big ears */}
      <ellipse cx="10" cy="28" rx="7" ry="9" fill="#2d8a2d" />
      <ellipse cx="50" cy="28" rx="7" ry="9" fill="#2d8a2d" />
      <ellipse cx="10" cy="28" rx="3.5" ry="5" fill="#ff9999" />
      <ellipse cx="50" cy="28" rx="3.5" ry="5" fill="#ff9999" />
      {/* Eyes - big evil */}
      <ellipse cx="21" cy="27" rx="7" ry="6" fill="#FFD700" />
      <ellipse cx="39" cy="27" rx="7" ry="6" fill="#FFD700" />
      <circle cx="21.5" cy="28" r="4" fill="#cc0000" />
      <circle cx="39.5" cy="28" r="4" fill="#cc0000" />
      <circle cx="23.5" cy="26.5" r="1.5" fill="black" />
      <circle cx="41.5" cy="26.5" r="1.5" fill="black" />
      {/* Nose */}
      <ellipse cx="30" cy="34" rx="5" ry="4" fill="#2d8a2d" />
      <circle cx="27" cy="35" r="2" fill="#1a5c1a" />
      <circle cx="33" cy="35" r="2" fill="#1a5c1a" />
      {/* Big grin with teeth */}
      <path d="M 16 42 Q 30 52 44 42" fill="#1a3a1a" />
      <rect x="20" y="42" width="5" height="6" fill="white" rx="1" />
      <rect x="27" y="42" width="5" height="7" fill="white" rx="1" />
      <rect x="34" y="42" width="5" height="6" fill="white" rx="1" />
      {/* Cape / robes */}
      <rect x="12" y="50" width="36" height="16" rx="5" fill="#4a1a6e" />
      <path d="M 12 50 Q 30 56 48 50" stroke="#FFD700" strokeWidth="2" fill="none" />
      {/* Scepter */}
      <motion.g animate={{ rotate:[-5,5,-5] }} style={{ transformOrigin:'8px 52px' }} transition={{ duration:2,repeat:Infinity }}>
        <rect x="6" y="42" width="4" height="24" rx="2" fill="#8B4513" />
        <motion.circle cx="8" cy="40" r="6" fill="#FFD700"
          animate={{ opacity:[0.7,1,0.7], scale:[0.9,1.1,0.9] }} transition={{ duration:1.5,repeat:Infinity }} />
        <circle cx="8" cy="40" r="3" fill="#ff4444" />
      </motion.g>
      {/* Arm holding scepter */}
      <ellipse cx="12" cy="56" rx="5" ry="9" fill="#3aad3a" />
      <ellipse cx="48" cy="56" rx="5" ry="9" fill="#3aad3a" />
      {/* Legs */}
      <rect x="16" y="64" width="12" height="8" rx="3" fill="#3a1458" />
      <rect x="32" y="64" width="12" height="8" rx="3" fill="#3a1458" />
    </motion.svg>
  );
}

/* ── CHARACTER MAP ───────────────────────────────────────── */
export const CHARACTER_SPRITES = {
  'web-info':  Wizard,
  'ecommerce': Goblin,
  'android':   Barbarian,
  'ios':       ArcherQueen,
  'hybrid':    GrandWarden,
  'digital':   Bowler,
  'payment':   Bomber,
  'blog':      GoblinKing,
};

export default function CRSprite({ id, size = 90 }) {
  const Component = CHARACTER_SPRITES[id];
  if (!Component) return null;
  return <Component size={size} />;
}
