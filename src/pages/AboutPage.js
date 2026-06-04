import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Reveal, AquronLogoCanvas } from '../components/index.js';

// ── Counting number hook ──────────────────────────────────
function useCount(target, duration, inView) {
  const [val, setVal] = useState('0');
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const num = parseFloat(target.replace(/[^0-9.]/g,''));
    const suffix = target.replace(/[0-9.]/g,'');
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const e = 1 - Math.pow(1-p, 3);
      setVal(Math.round(e * num) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return val;
}

function CyberStat({ n, l, col, delay }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold:0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const counted = useCount(n, 1.6, inView);
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay }}
      style={{ textAlign:'center', position:'relative', padding:'14px 8px' }}>
      <div style={{ position:'absolute', inset:0, borderRadius:8, border:`1px solid ${col}25`, background:`${col}05` }}/>
      <div style={{ position:'absolute', top:4, left:4, width:8, height:8, borderTop:`1.5px solid ${col}88`, borderLeft:`1.5px solid ${col}88` }}/>
      <div style={{ position:'absolute', top:4, right:4, width:8, height:8, borderTop:`1.5px solid ${col}88`, borderRight:`1.5px solid ${col}88` }}/>
      <div style={{ position:'absolute', bottom:4, left:4, width:8, height:8, borderBottom:`1.5px solid ${col}88`, borderLeft:`1.5px solid ${col}88` }}/>
      <div style={{ position:'absolute', bottom:4, right:4, width:8, height:8, borderBottom:`1.5px solid ${col}88`, borderRight:`1.5px solid ${col}88` }}/>
      <div style={{ position:'relative', zIndex:1 }}>
        <motion.span style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(22px,3.5vw,38px)', fontWeight:900, color:col, textShadow:`0 0 20px ${col}88`, display:'block', letterSpacing:'-0.5px' }}
          animate={{ scale:[1,1.03,1] }} transition={{ duration:3, repeat:Infinity, delay }}>
          {counted}
        </motion.span>
        <span style={{ color:'rgba(200,220,255,0.4)', fontSize:11, fontWeight:600, fontFamily:'Rajdhani,sans-serif', letterSpacing:1.5, textTransform:'uppercase' }}>{l}</span>
      </div>
    </motion.div>
  );
}

// ── CEO cyberpunk SVG model ───────────────────────────────
function CeoModel({ col }) {
  return (
    <svg width="180" height="220" viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ceoCoat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1428"/>
          <stop offset="100%" stopColor="#060b18"/>
        </linearGradient>
        <linearGradient id="ceoSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8996a"/>
          <stop offset="100%" stopColor="#a87848"/>
        </linearGradient>
        <linearGradient id="ceoHair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a3e"/>
          <stop offset="100%" stopColor="#2a2a60"/>
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="90" cy="215" rx="50" ry="6" fill="rgba(0,0,0,0.4)"/>

      {/* Coat tails */}
      <path d="M55 145 Q42 175 38 215 L62 215 Q66 190 70 165Z" fill="url(#ceoCoat)" stroke={`${col}33`} strokeWidth="1"/>
      <path d="M125 145 Q138 175 142 215 L118 215 Q114 190 110 165Z" fill="url(#ceoCoat)" stroke={`${col}33`} strokeWidth="1"/>

      {/* Body - tactical coat */}
      <path d="M48 110 Q44 145 44 180 L136 180 Q136 145 132 110 Q110 100 90 100 Q70 100 48 110Z" fill="url(#ceoCoat)" stroke={`${col}44`} strokeWidth="1.2"/>

      {/* Chest panel with glowing lines */}
      <rect x="72" y="112" width="36" height="50" rx="3" fill="rgba(0,0,0,0.4)" stroke={`${col}33`} strokeWidth="0.8"/>
      <line x1="78" y1="122" x2="102" y2="122" stroke={col} strokeWidth="1" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite"/>
      </line>
      <line x1="78" y1="128" x2="98" y2="128" stroke={col} strokeWidth="0.8" opacity="0.4"/>
      <line x1="78" y1="134" x2="102" y2="134" stroke={col} strokeWidth="0.8" opacity="0.3"/>
      <rect x="78" y="140" width="16" height="16" rx="2" fill={`${col}18`} stroke={col} strokeWidth="0.8"/>
      <path d="M82 148 L84 151 L90 145" stroke={col} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Left arm */}
      <path d="M48 110 Q34 120 30 148 L50 150 Q52 130 58 118Z" fill="url(#ceoCoat)" stroke={`${col}33`} strokeWidth="1"/>
      {/* Left hand - tech glove */}
      <ellipse cx="38" cy="158" rx="12" ry="14" fill="#2a3a50" stroke={`${col}55`} strokeWidth="1"/>
      <line x1="32" y1="150" x2="30" y2="144" stroke="#607090" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="36" y1="148" x2="34" y2="142" stroke="#607090" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="40" y1="148" x2="39" y2="141" stroke="#607090" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="38" cy="162" r="3" fill="none" stroke={col} strokeWidth="1">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
      </circle>

      {/* Right arm */}
      <path d="M132 110 Q146 120 150 148 L130 150 Q128 130 122 118Z" fill="url(#ceoCoat)" stroke={`${col}33`} strokeWidth="1"/>
      {/* Right hand - normal */}
      <ellipse cx="142" cy="155" rx="10" ry="12" fill="url(#ceoSkin)"/>
      <line x1="137" y1="146" x2="136" y2="140" stroke="#a07848" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="141" y1="144" x2="140" y2="138" stroke="#a07848" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="145" y1="145" x2="145" y2="139" stroke="#a07848" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Shoulders - armor pads */}
      <ellipse cx="48" cy="108" rx="14" ry="9" fill="#1a2540" stroke={`${col}55`} strokeWidth="1.2" transform="rotate(-10 48 108)"/>
      <ellipse cx="132" cy="108" rx="14" ry="9" fill="#1a2540" stroke={`${col}55`} strokeWidth="1.2" transform="rotate(10 132 108)"/>

      {/* Neck */}
      <rect x="82" y="88" width="16" height="16" rx="3" fill="url(#ceoSkin)"/>

      {/* Head */}
      <ellipse cx="90" cy="70" rx="28" ry="30" fill="url(#ceoSkin)"/>
      {/* Jawline - sharp anime style */}
      <path d="M65 72 Q64 88 72 96 Q80 102 90 102 Q100 102 108 96 Q116 88 115 72" fill="#b88858" stroke="none"/>

      {/* Hair - swept back with blue highlight */}
      <path d="M62 62 Q64 44 74 38 Q82 32 90 30 Q98 32 106 38 Q116 44 118 62 Q112 52 104 46 Q96 38 90 36 Q84 38 76 46 Q68 52 62 62Z" fill="url(#ceoHair)"/>
      <path d="M62 62 Q60 70 62 78" stroke="#1a1a3e" strokeWidth="2" fill="none"/>
      <path d="M118 62 Q120 70 118 78" stroke="#1a1a3e" strokeWidth="2" fill="none"/>
      {/* Blue streak */}
      <path d="M86 36 Q88 32 92 34 Q90 42 88 50Z" fill={col} opacity="0.6"/>

      {/* Eyebrows */}
      <path d="M68 58 Q75 54 82 57" stroke="#1a1a3a" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M98 57 Q105 54 112 58" stroke="#1a1a3a" strokeWidth="2.2" fill="none" strokeLinecap="round"/>

      {/* Eyes - cyberpunk glowing */}
      <ellipse cx="76" cy="65" rx="7" ry="6" fill="#0a0a20"/>
      <ellipse cx="104" cy="65" rx="7" ry="6" fill="#0a0a20"/>
      <ellipse cx="76" cy="65" rx="5" ry="4.5" fill={col} opacity="0.9">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="104" cy="65" rx="5" ry="4.5" fill={col} opacity="0.9">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" begin="0.3s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="76" cy="65" rx="3" ry="3" fill="#001828"/>
      <ellipse cx="104" cy="65" rx="3" ry="3" fill="#001828"/>
      <circle cx="74" cy="63.5" r="1" fill="rgba(255,255,255,0.8)"/>
      <circle cx="102" cy="63.5" r="1" fill="rgba(255,255,255,0.8)"/>
      {/* Eyelid lines */}
      <path d="M69 61 Q76 57 83 61" stroke="#0a0a1e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M97 61 Q104 57 111 61" stroke="#0a0a1e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* Right ear - tech piece */}
      <ellipse cx="62" cy="68" rx="5" ry="7" fill="#b88858"/>
      <rect x="58" y="66" width="4" height="6" rx="1" fill="#1a2540" stroke={col} strokeWidth="0.8"/>
      <circle cx="60" cy="69" r="1" fill={col} opacity="0.8"/>
      <ellipse cx="118" cy="68" rx="5" ry="7" fill="#b88858"/>

      {/* Nose */}
      <path d="M87 76 Q90 80 93 76" stroke="#906040" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Smirk */}
      <path d="M80 87 Q88 92 96 88" stroke="#8a5030" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M93 88 Q97 87 98 91" stroke="#8a5030" strokeWidth="1" fill="none" strokeLinecap="round"/>

      {/* Cyber monocle on right eye */}
      <rect x="97" y="59" width="15" height="13" rx="3" fill="none" stroke="rgba(255,100,100,0.7)" strokeWidth="1">
        <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
      </rect>
      <line x1="112" y1="61" x2="118" y2="57" stroke="rgba(255,100,100,0.5)" strokeWidth="1"/>

      {/* Hologram display from hand */}
      <rect x="20" y="128" width="24" height="16" rx="2" fill="rgba(0,201,255,0.1)" stroke={col} strokeWidth="0.7" opacity="0.7"/>
      <line x1="22" y1="133" x2="42" y2="133" stroke={col} strokeWidth="0.5" opacity="0.6"/>
      <line x1="22" y1="137" x2="38" y2="137" stroke={col} strokeWidth="0.5" opacity="0.4"/>
      <line x1="38" y1="150" x2="32" y2="128" stroke={col} strokeWidth="0.5" opacity="0.3" strokeDasharray="2,2"/>

      {/* Collar / turtleneck */}
      <path d="M76 98 Q78 106 90 108 Q102 106 104 98 Q96 104 90 104 Q84 104 76 98Z" fill="#0e1828" stroke={`${col}33`} strokeWidth="0.8"/>

      {/* Bottom of coat */}
      <line x1="44" y1="180" x2="136" y2="180" stroke={`${col}22`} strokeWidth="1"/>
    </svg>
  );
}

// ── Operations Manager cyberpunk SVG model ────────────────
function OpsModel({ col }) {
  return (
    <svg width="180" height="220" viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="opsCoat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1a2e"/>
          <stop offset="100%" stopColor="#050d18"/>
        </linearGradient>
        <linearGradient id="opsSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a874"/>
          <stop offset="100%" stopColor="#b08050"/>
        </linearGradient>
      </defs>

      <ellipse cx="90" cy="215" rx="46" ry="5" fill="rgba(0,0,0,0.35)"/>

      {/* Coat tails */}
      <path d="M58 148 Q46 178 42 215 L64 215 Q67 192 72 168Z" fill="url(#opsCoat)" stroke={`${col}33`} strokeWidth="1"/>
      <path d="M122 148 Q134 178 138 215 L116 215 Q113 192 108 168Z" fill="url(#opsCoat)" stroke={`${col}33`} strokeWidth="1"/>

      {/* Body */}
      <path d="M52 112 Q48 148 48 182 L132 182 Q132 148 128 112 Q108 102 90 102 Q72 102 52 112Z" fill="url(#opsCoat)" stroke={`${col}44`} strokeWidth="1.2"/>

      {/* Chest - data clipboard */}
      <rect x="72" y="114" width="36" height="48" rx="3" fill="rgba(0,0,0,0.4)" stroke={`${col}44`} strokeWidth="0.8"/>
      <rect x="76" y="118" width="28" height="4" rx="2" fill={`${col}20`}/>
      <rect x="76" y="125" width="28" height="2.5" rx="1" fill={`${col}30`}/>
      <rect x="76" y="130" width="22" height="2.5" rx="1" fill={`${col}22`}/>
      <rect x="76" y="135" width="26" height="2.5" rx="1" fill={`${col}18`}/>
      <rect x="76" y="140" width="20" height="2.5" rx="1" fill={`${col}15`}/>
      {/* Status indicator */}
      <circle cx="88" cy="152" r="5" fill={`${col}20`} stroke={col} strokeWidth="1">
        <animate attributeName="fill-opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite"/>
      </circle>
      <path d="M85 152 L87 155 L92 149" stroke={col} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Left arm */}
      <path d="M52 112 Q38 122 34 150 L54 152 Q56 132 62 120Z" fill="url(#opsCoat)" stroke={`${col}33`} strokeWidth="1"/>
      <ellipse cx="40" cy="160" rx="10" ry="12" fill="url(#opsSkin)"/>
      <line x1="34" y1="152" x2="33" y2="146" stroke="#906040" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="38" y1="150" x2="37" y2="144" stroke="#906040" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="42" y1="150" x2="42" y2="143" stroke="#906040" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Right arm - holding tablet */}
      <path d="M128 112 Q142 122 146 150 L126 152 Q124 132 118 120Z" fill="url(#opsCoat)" stroke={`${col}33`} strokeWidth="1"/>
      <ellipse cx="140" cy="158" rx="10" ry="12" fill="url(#opsSkin)"/>
      {/* Tablet */}
      <rect x="144" y="130" width="24" height="34" rx="3" fill="rgba(0,0,0,0.6)" stroke={col} strokeWidth="1.2"/>
      <rect x="146" y="133" width="20" height="26" rx="2" fill={`${col}08`}/>
      <line x1="148" y1="137" x2="164" y2="137" stroke={col} strokeWidth="0.7" opacity="0.6"/>
      <line x1="148" y1="141" x2="160" y2="141" stroke={col} strokeWidth="0.7" opacity="0.4"/>
      <line x1="148" y1="145" x2="162" y2="145" stroke={col} strokeWidth="0.7" opacity="0.35"/>
      <line x1="148" y1="149" x2="158" y2="149" stroke={col} strokeWidth="0.7" opacity="0.3"/>
      <rect x="151" y="153" width="10" height="3" rx="1" fill={`${col}30`}/>

      {/* Shoulders */}
      <ellipse cx="52" cy="110" rx="13" ry="8" fill="#0e1e34" stroke={`${col}55`} strokeWidth="1" transform="rotate(-12 52 110)"/>
      <ellipse cx="128" cy="110" rx="13" ry="8" fill="#0e1e34" stroke={`${col}55`} strokeWidth="1" transform="rotate(12 128 110)"/>

      {/* Neck */}
      <rect x="83" y="90" width="14" height="14" rx="3" fill="url(#opsSkin)"/>

      {/* Head */}
      <ellipse cx="90" cy="72" rx="26" ry="28" fill="url(#opsSkin)"/>
      <path d="M67 74 Q66 88 74 96 Q82 102 90 102 Q98 102 106 96 Q114 88 113 74" fill="#c08858"/>

      {/* Hair - neat, professional */}
      <path d="M64 64 Q66 46 76 40 Q83 34 90 32 Q97 34 104 40 Q114 46 116 64 Q110 54 102 48 Q96 42 90 40 Q84 42 78 48 Q70 54 64 64Z" fill="#1e1428"/>
      <path d="M64 64 Q62 72 64 80" stroke="#1e1428" strokeWidth="2" fill="none"/>
      <path d="M116 64 Q118 72 116 80" stroke="#1e1428" strokeWidth="2" fill="none"/>

      {/* Hair side parts - slightly wavy */}
      <path d="M64 64 Q66 56 70 52" stroke="#2a1e38" strokeWidth="3" fill="none" strokeLinecap="round"/>

      {/* Eyebrows - professional serious */}
      <path d="M69 60 Q76 57 83 59" stroke="#1e1428" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M97 59 Q104 57 111 60" stroke="#1e1428" strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* Eyes - calm, intelligent */}
      <ellipse cx="76" cy="67" rx="7" ry="5.5" fill="#0a0a1e"/>
      <ellipse cx="104" cy="67" rx="7" ry="5.5" fill="#0a0a1e"/>
      <ellipse cx="76" cy="67" rx="4.5" ry="4" fill={col} opacity="0.85">
        <animate attributeName="opacity" values="0.65;0.95;0.65" dur="3s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="104" cy="67" rx="4.5" ry="4" fill={col} opacity="0.85">
        <animate attributeName="opacity" values="0.65;0.95;0.65" dur="3s" begin="0.5s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="76" cy="67" rx="2.5" ry="2.5" fill="#001a28"/>
      <ellipse cx="104" cy="67" rx="2.5" ry="2.5" fill="#001a28"/>
      <circle cx="74.5" cy="65.5" r="1" fill="rgba(255,255,255,0.7)"/>
      <circle cx="102.5" cy="65.5" r="1" fill="rgba(255,255,255,0.7)"/>
      <path d="M69 63 Q76 59 83 63" stroke="#0d0d1e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M97 63 Q104 59 111 63" stroke="#0d0d1e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      <ellipse cx="64" cy="70" rx="4" ry="6" fill="#c08858"/>
      <ellipse cx="116" cy="70" rx="4" ry="6" fill="#c08858"/>

      <path d="M88 78 Q90 82 92 78" stroke="#906040" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M80 89 Q88 93 96 90" stroke="#8a5030" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* Headset - manager comms */}
      <path d="M64 62 Q64 50 90 48 Q116 50 116 62" stroke={col} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
      <rect x="58" y="62" width="8" height="12" rx="3" fill="#1a2a40" stroke={col} strokeWidth="1" opacity="0.8"/>
      <circle cx="62" cy="68" r="2" fill={col} opacity="0.7">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.8s" repeatCount="indefinite"/>
      </circle>

      {/* Collar */}
      <path d="M78 100 Q80 108 90 110 Q100 108 102 100 Q94 105 90 105 Q86 105 78 100Z" fill="#0a1428" stroke={`${col}33`} strokeWidth="0.8"/>

      {/* Rank badge on shoulder */}
      <rect x="46" y="100" width="14" height="8" rx="2" fill={`${col}15`} stroke={col} strokeWidth="0.8"/>
      <line x1="48" y1="104" x2="58" y2="104" stroke={col} strokeWidth="0.6" opacity="0.6"/>
    </svg>
  );
}

export default function AboutPage({ go }) {
  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>

      {/* ── HERO ── */}
      <section className="section-pad">
        <div className="wrap">
          <div className="about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:52, alignItems:'center' }}>

            <motion.div initial={{ opacity:0, x:-44 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7 }}>
              <p style={{ fontFamily:'Orbitron,monospace', color:'#00C9FF', fontSize:10, fontWeight:700, letterSpacing:3, textTransform:'uppercase', marginBottom:10 }}>WHO WE ARE</p>
              <h1 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(20px,3.8vw,42px)', fontWeight:900, color:'#fff', lineHeight:1.15, marginBottom:20, letterSpacing:1, textShadow:'0 0 30px rgba(0,201,255,0.25)' }}>
                WE ARE AQURON<br />
                <span style={{ background:'linear-gradient(135deg,#00C9FF,#4FFFB0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  BUILT FOR THE BOLD
                </span>
              </h1>
              <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(180,220,255,0.65)', fontSize:15.5, lineHeight:1.88, marginBottom:15 }}>
                Founded in Kolkata, India, Aquron started as a two-person studio and grew into a full-service digital agency. We have shipped products used by thousands across 6+ countries.
              </p>
              <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(180,220,255,0.65)', fontSize:15.5, lineHeight:1.88, marginBottom:32 }}>
                Like water (aqua), we adapt to every challenge — finding the most elegant, precise path. Like precision engineers, we deploy the right solution at the right moment.
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <motion.button className="btn-gold" onClick={() => go('contact')} whileHover={{ scale:1.04 }}
                  style={{ fontFamily:'Orbitron,monospace', fontSize:12, letterSpacing:1.5 }}>
                  WORK WITH US
                </motion.button>
                <button className="btn-ghost" onClick={() => go('portfolio')}
                  style={{ fontFamily:'Orbitron,monospace', fontSize:12, letterSpacing:1.5 }}>
                  VIEW OUR WORK
                </button>
              </div>
            </motion.div>

            {/* Stats panel */}
            <motion.div initial={{ opacity:0, x:44 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7 }}
              style={{ background:'rgba(0,5,18,0.8)', border:'1px solid rgba(0,201,255,0.18)', borderRadius:14, padding:'clamp(20px,4vw,36px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.5),transparent)' }}/>
              <motion.div style={{ position:'absolute', left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.15),transparent)' }} animate={{ top:['0%','100%'] }} transition={{ duration:3, repeat:Infinity, ease:'linear' }}/>
              <motion.div style={{ display:'flex', justifyContent:'center', marginBottom:14 }}
                animate={{ filter:['drop-shadow(0 0 14px rgba(0,201,255,0.6))','drop-shadow(0 0 28px rgba(79,255,176,0.9))','drop-shadow(0 0 14px rgba(0,201,255,0.6))'] }} transition={{ duration:3, repeat:Infinity }}>
                <AquronLogoCanvas size={80} />
              </motion.div>
              <p style={{ fontFamily:'Orbitron,monospace', fontSize:18, fontWeight:900, marginBottom:4, background:'linear-gradient(135deg,#00C9FF,#4FFFB0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:2 }}>AQURON</p>
              <p style={{ color:'rgba(0,201,255,0.4)', fontSize:8, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:22, fontFamily:'Rajdhani,sans-serif' }}>FLUID DIGITAL SOLUTIONS</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[{n:'150+',l:'Projects',col:'#00C9FF'},{n:'5+',l:'Years',col:'#4FFFB0'},{n:'15+',l:'Team',col:'#FFD700'},{n:'6+',l:'Countries',col:'#FC5C7D'}].map((s,i) => (
                  <CyberStat key={s.l} n={s.n} l={s.l} col={s.col} delay={i*0.1} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding:'clamp(50px,7vw,80px) 0', background:'rgba(0,3,12,0.6)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.03) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }}/>
        <div className="wrap" style={{ position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <p style={{ fontFamily:'Orbitron,monospace', color:'#FFD700', fontSize:10, fontWeight:700, letterSpacing:3, textTransform:'uppercase', marginBottom:10 }}>THE LEADERSHIP</p>
            <h2 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(18px,3vw,32px)', fontWeight:900, color:'#fff', letterSpacing:2, textShadow:'0 0 20px rgba(255,215,0,0.3)' }}>MEET THE TEAM</h2>
          </div>

          <div className="team-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, maxWidth:960, margin:'0 auto' }}>

            {/* CEO Card */}
            <Reveal delay={0} direction="left">
              <motion.div style={{ background:'linear-gradient(155deg,rgba(4,7,22,0.97),rgba(8,12,32,0.99))', border:'2px solid rgba(255,215,0,0.25)', borderRadius:16, padding:'28px 22px 24px', textAlign:'center', position:'relative', overflow:'hidden' }}
                whileHover={{ y:-8, borderColor:'rgba(255,215,0,0.6)', boxShadow:'0 24px 60px rgba(255,215,0,0.12)' }}>
                {/* Top accent */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#FFD700,transparent)' }}/>
                {/* Corner brackets */}
                {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h],i) => (
                  <div key={i} style={{ position:'absolute', [v]:6, [h]:6, width:14, height:14,
                    borderTop:v==='top'?'2px solid rgba(255,215,0,0.6)':'none', borderBottom:v==='bottom'?'2px solid rgba(255,215,0,0.6)':'none',
                    borderLeft:h==='left'?'2px solid rgba(255,215,0,0.6)':'none', borderRight:h==='right'?'2px solid rgba(255,215,0,0.6)':'none' }}/>
                ))}
                {/* Scan line */}
                <motion.div style={{ position:'absolute', left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(255,215,0,0.3),transparent)' }} animate={{ top:['0%','100%'] }} transition={{ duration:4, repeat:Infinity, ease:'linear' }}/>
                {/* Rank badge */}
                <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(255,215,0,0.08)', border:'1px solid rgba(255,215,0,0.3)', borderRadius:5, padding:'4px 14px', marginBottom:16, fontFamily:'Orbitron,monospace', fontSize:9, color:'#FFD700', letterSpacing:2 }}>
                  ⚡ LEAD DEV / CEO
                </div>
                {/* SVG character */}
                <motion.div style={{ display:'flex', justifyContent:'center', marginBottom:16, filter:'drop-shadow(0 8px 24px rgba(255,215,0,0.4))' }}
                  animate={{ y:[0,-6,0] }} transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}>
                  <CeoModel col="#FFD700" />
                </motion.div>
                <h3 style={{ fontFamily:'Orbitron,monospace', color:'#fff', fontSize:'clamp(14px,2vw,18px)', fontWeight:900, marginBottom:5, letterSpacing:1, textShadow:'0 0 12px rgba(255,215,0,0.4)' }}>SAYAN DHAR</h3>
                <p style={{ color:'#FFD700', fontSize:11, marginBottom:14, fontWeight:700, fontFamily:'Rajdhani,sans-serif', letterSpacing:2, textTransform:'uppercase' }}>CEO & Development Head</p>
                <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(180,220,255,0.6)', fontSize:13.5, lineHeight:1.75, marginBottom:16 }}>Full-stack architect and founder of Aquron with 5+ years building scalable digital products for 150+ clients. Personally leads every major technical decision.</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:5, justifyContent:'center' }}>
                  {['React','Next.js','Node.js','MongoDB','Architecture'].map(sk => (
                    <span key={sk} style={{ background:'rgba(255,215,0,0.07)', border:'1px solid rgba(255,215,0,0.2)', color:'rgba(255,215,0,0.7)', fontSize:10, padding:'3px 9px', borderRadius:4, fontFamily:'monospace' }}>{sk}</span>
                  ))}
                </div>
              </motion.div>
            </Reveal>

            {/* Ops Card */}
            <Reveal delay={0.12} direction="right">
              <motion.div style={{ background:'linear-gradient(155deg,rgba(4,7,22,0.97),rgba(6,10,28,0.99))', border:'2px solid rgba(0,201,255,0.2)', borderRadius:16, padding:'28px 22px 24px', textAlign:'center', position:'relative', overflow:'hidden' }}
                whileHover={{ y:-8, borderColor:'rgba(0,201,255,0.6)', boxShadow:'0 24px 60px rgba(0,201,255,0.1)' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#00C9FF,transparent)' }}/>
                {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h],i) => (
                  <div key={i} style={{ position:'absolute', [v]:6, [h]:6, width:14, height:14,
                    borderTop:v==='top'?'2px solid rgba(0,201,255,0.55)':'none', borderBottom:v==='bottom'?'2px solid rgba(0,201,255,0.55)':'none',
                    borderLeft:h==='left'?'2px solid rgba(0,201,255,0.55)':'none', borderRight:h==='right'?'2px solid rgba(0,201,255,0.55)':'none' }}/>
                ))}
                <motion.div style={{ position:'absolute', left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.25),transparent)' }} animate={{ top:['0%','100%'] }} transition={{ duration:3.5, repeat:Infinity, ease:'linear', delay:1 }}/>
                <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(0,201,255,0.07)', border:'1px solid rgba(0,201,255,0.25)', borderRadius:5, padding:'4px 14px', marginBottom:16, fontFamily:'Orbitron,monospace', fontSize:9, color:'#00C9FF', letterSpacing:2 }}>
                  🎯 OPS LEAD / MANAGER
                </div>
                <motion.div style={{ display:'flex', justifyContent:'center', marginBottom:16, filter:'drop-shadow(0 8px 24px rgba(0,201,255,0.35))' }}
                  animate={{ y:[0,-6,0] }} transition={{ duration:3.8, repeat:Infinity, ease:'easeInOut' }}>
                  <OpsModel col="#00C9FF" />
                </motion.div>
                <h3 style={{ fontFamily:'Orbitron,monospace', color:'#fff', fontSize:'clamp(14px,2vw,18px)', fontWeight:900, marginBottom:5, letterSpacing:1, textShadow:'0 0 12px rgba(0,201,255,0.4)' }}>ANKAN GHOSH</h3>
                <p style={{ color:'#00C9FF', fontSize:11, marginBottom:14, fontWeight:700, fontFamily:'Rajdhani,sans-serif', letterSpacing:2, textTransform:'uppercase' }}>Operations Manager</p>
                <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(180,220,255,0.6)', fontSize:13.5, lineHeight:1.75, marginBottom:16 }}>The operational backbone of Aquron. Ensures every project ships on time, every client receives white-glove service, and no detail ever falls through the cracks.</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:5, justifyContent:'center' }}>
                  {['Project Mgmt','Client Relations','Agile','Process Ops'].map(sk => (
                    <span key={sk} style={{ background:'rgba(0,201,255,0.06)', border:'1px solid rgba(0,201,255,0.18)', color:'rgba(0,201,255,0.7)', fontSize:10, padding:'3px 9px', borderRadius:4, fontFamily:'monospace' }}>{sk}</span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VALUES CARDS ── */}
      <section className="section-pad">
        <div className="wrap">
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <p style={{ fontFamily:'Orbitron,monospace', color:'#4FFFB0', fontSize:10, fontWeight:700, letterSpacing:3, textTransform:'uppercase', marginBottom:10 }}>OUR STRENGTHS</p>
            <h2 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(18px,3vw,30px)', fontWeight:900, color:'#fff', letterSpacing:1.5 }}>WHY CLIENTS CHOOSE AQURON</h2>
          </div>
          <div className="values-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:18 }}>
            {[
              { icon:(
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M20 4 Q24 10 24 16 Q24 24 20 36 Q16 24 16 16 Q16 10 20 4Z" stroke="#00C9FF" strokeWidth="1.5" fill="rgba(0,201,255,0.1)"/>
                    <ellipse cx="20" cy="20" rx="14" ry="6" stroke="#00C9FF" strokeWidth="1" fill="none" opacity="0.4"/>
                  </svg>
                ), t:'Fluid Precision', d:'Like water, we adapt perfectly to every project while maintaining unwavering precision.', c:'#00C9FF' },
              { icon:(
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <polygon points="20,4 36,12 36,28 20,36 4,28 4,12" stroke="#FFD700" strokeWidth="1.5" fill="rgba(255,215,0,0.08)"/>
                    <path d="M12 20 L16 24 L28 14" stroke="#FFD700" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  </svg>
                ), t:'Battle-Tested', d:'150+ successful projects across 6+ countries. We win in every arena.', c:'#FFD700' },
              { icon:(
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="14" cy="14" r="7" stroke="#4FFFB0" strokeWidth="1.5" fill="rgba(79,255,176,0.1)"/>
                    <circle cx="26" cy="26" r="7" stroke="#4FFFB0" strokeWidth="1.5" fill="rgba(79,255,176,0.1)"/>
                    <line x1="19" y1="19" x2="21" y2="21" stroke="#4FFFB0" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ), t:'True Partnership', d:"We treat every project as if our own brand is on the line. Your success is our success.", c:'#4FFFB0' },
              { icon:(
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <polyline points="4,30 12,20 18,24 26,12 32,16 38,6" stroke="#FC5C7D" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="38" cy="6" r="3" fill="#FC5C7D"/>
                    <line x1="4" y1="34" x2="38" y2="34" stroke="#FC5C7D" strokeWidth="0.8" opacity="0.3"/>
                  </svg>
                ), t:'Data-First', d:'Every design, feature, and decision is backed by real data and testing.', c:'#FC5C7D' },
            ].map((v, i) => (
              <Reveal key={i} delay={i * .08}>
                <motion.div style={{ background:'rgba(2,5,18,0.9)', border:`1px solid ${v.c}22`, borderRadius:12, padding:'24px 20px', textAlign:'center', position:'relative', overflow:'hidden' }}
                  whileHover={{ y:-7, borderColor:`${v.c}66`, boxShadow:`0 18px 40px ${v.c}14` }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${v.c}55,transparent)` }}/>
                  <motion.div style={{ display:'flex', justifyContent:'center', marginBottom:14, filter:`drop-shadow(0 0 8px ${v.c}66)` }}
                    animate={{ y:[0,-5,0] }} transition={{ duration:4+i, repeat:Infinity }}>
                    {v.icon}
                  </motion.div>
                  <p style={{ fontFamily:'Orbitron,monospace', color:'#fff', fontWeight:700, fontSize:13, marginBottom:8, letterSpacing:0.5 }}>{v.t}</p>
                  <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(180,220,255,0.5)', fontSize:13.5, lineHeight:1.75 }}>{v.d}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
