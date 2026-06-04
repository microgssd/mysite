import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, PORTFOLIO, REVIEWS_1, REVIEWS_2 } from '../data/index.js';
import { AquronLogoCanvas, Reveal, Marquee, CyberServiceCard, SectionHeader, PortfolioCard } from '../components/index.js';

const WORDS = ['Fluid Websites','Mobile Apps','E-Commerce','Digital Growth','Hybrid Apps','SEO Strategy'];

function PremiumTyper() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i+1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ display:'inline-block', minWidth:280 }}>
      <AnimatePresence mode="wait">
        <motion.span key={index}
          initial={{ opacity:0, y:40, filter:'blur(12px)' }}
          animate={{ opacity:1, y:0, filter:'blur(0px)' }}
          exit={{ opacity:0, y:-30, filter:'blur(8px)' }}
          transition={{ duration:0.55, ease:[0.16,1,0.3,1] }}
          style={{ display:'inline-block', background:'linear-gradient(90deg,#00C9FF,#4FFFB0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', fontFamily:'Orbitron,monospace', fontWeight:900, letterSpacing:'clamp(1px,0.03em,3px)', textShadow:'none' }}>
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Cyberpunk tech stack visual — real tech icons
const TECH_ICONS = [
  { name:'React', col:'#61DAFB',
    svg: (c) => (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="4.5" fill={c}/>
        <ellipse cx="30" cy="30" rx="24" ry="9" stroke={c} strokeWidth="1.6" fill="none"/>
        <ellipse cx="30" cy="30" rx="24" ry="9" stroke={c} strokeWidth="1.6" fill="none" transform="rotate(60 30 30)"/>
        <ellipse cx="30" cy="30" rx="24" ry="9" stroke={c} strokeWidth="1.6" fill="none" transform="rotate(120 30 30)"/>
      </svg>
    )
  },
  { name:'Next.js', col:'#ffffff',
    svg: (c) => (
      <svg viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="22" stroke={c} strokeWidth="1.6" fill="none"/>
        <path d="M22 40 L22 20 L38 38" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="32" y1="20" x2="32" y2="32" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    )
  },
  { name:'Node.js', col:'#68A063',
    svg: (c) => (
      <svg viewBox="0 0 60 60" fill="none">
        <path d="M30 8 L50 19.5 L50 40.5 L30 52 L10 40.5 L10 19.5 Z" stroke={c} strokeWidth="1.6" fill="none"/>
        <path d="M30 14 L44 22 L44 38 L30 46 L16 38 L16 22 Z" stroke={c} strokeWidth="1" strokeOpacity="0.4" fill="none"/>
        <text x="30" y="34" textAnchor="middle" fill={c} fontSize="11" fontWeight="bold" fontFamily="monospace">JS</text>
      </svg>
    )
  },
  { name:'AWS', col:'#FF9900',
    svg: (c) => (
      <svg viewBox="0 0 60 60" fill="none">
        <path d="M14 36 Q10 30 14 24 Q20 14 30 14 Q38 14 42 20" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        <path d="M44 22 Q52 26 50 34 Q48 42 40 44 L20 44 Q12 42 12 36" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        <path d="M20 50 L16 54 M20 50 L24 54" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M40 50 L36 54 M40 50 L44 54" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="20" y1="44" x2="20" y2="50" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="40" y1="44" x2="40" y2="50" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        <text x="30" y="34" textAnchor="middle" fill={c} fontSize="8" fontWeight="bold" fontFamily="monospace">AWS</text>
      </svg>
    )
  },
  { name:'MongoDB', col:'#47A248',
    svg: (c) => (
      <svg viewBox="0 0 60 60" fill="none">
        <path d="M30 8 Q34 16 34 26 Q34 36 30 52 Q26 36 26 26 Q26 16 30 8Z" stroke={c} strokeWidth="1.6" fill={`${c}22`}/>
        <path d="M30 52 Q26 44 24 36 Q30 40 30 52Z" fill={c} opacity="0.6"/>
        <line x1="30" y1="38" x2="30" y2="52" stroke={c} strokeWidth="1.5"/>
        <circle cx="30" cy="22" r="3" fill={c} opacity="0.8"/>
      </svg>
    )
  },
  { name:'Express.js', col:'#68A063',
    svg: (c) => (
      <svg viewBox="0 0 60 60" fill="none">
        <text x="30" y="22" textAnchor="middle" fill={c} fontSize="11" fontWeight="bold" fontFamily="monospace">EX</text>
        <path d="M10 30 L50 30" stroke={c} strokeWidth="1.4" opacity="0.4"/>
        <path d="M10 36 L30 36 L50 28" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        <circle cx="10" cy="36" r="2.5" fill={c} opacity="0.8"/>
        <circle cx="50" cy="28" r="2.5" fill={c}/>
        <circle cx="30" cy="36" r="2" fill={c} opacity="0.5"/>
        <rect x="16" y="42" width="28" height="8" rx="3" stroke={c} strokeWidth="1.2" fill={`${c}12`}/>
        <text x="30" y="48.5" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.8">express</text>
      </svg>
    )
  },
  { name:'Docker', col:'#2496ED',
    svg: (c) => (
      <svg viewBox="0 0 60 60" fill="none">
        <rect x="8" y="28" width="8" height="8" rx="1" stroke={c} strokeWidth="1.4" fill={`${c}18`}/>
        <rect x="18" y="28" width="8" height="8" rx="1" stroke={c} strokeWidth="1.4" fill={`${c}18`}/>
        <rect x="28" y="28" width="8" height="8" rx="1" stroke={c} strokeWidth="1.4" fill={`${c}18`}/>
        <rect x="18" y="18" width="8" height="8" rx="1" stroke={c} strokeWidth="1.4" fill={`${c}18`}/>
        <rect x="28" y="18" width="8" height="8" rx="1" stroke={c} strokeWidth="1.4" fill={`${c}18`}/>
        <rect x="28" y="8" width="8" height="8" rx="1" stroke={c} strokeWidth="1.4" fill={`${c}18`}/>
        <path d="M8 36 Q14 48 30 48 Q46 48 50 36 Q54 28 46 26 Q44 20 38 22" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        <circle cx="46" cy="22" r="3" fill={c} opacity="0.7"/>
        <line x1="42" y1="22" x2="34" y2="22" stroke={c} strokeWidth="1.2"/>
      </svg>
    )
  },
  { name:'ML / AI', col:'#a855f7',
    svg: (c) => (
      <svg viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="22" r="4" fill={`${c}30`} stroke={c} strokeWidth="1.2"/>
        <circle cx="16" cy="38" r="3.5" fill={`${c}30`} stroke={c} strokeWidth="1.2"/>
        <circle cx="30" cy="38" r="4" fill={c} stroke={c} strokeWidth="1.2"/>
        <circle cx="44" cy="38" r="3.5" fill={`${c}30`} stroke={c} strokeWidth="1.2"/>
        <line x1="30" y1="26" x2="16" y2="35" stroke={c} strokeWidth="1" opacity="0.6"/>
        <line x1="30" y1="26" x2="30" y2="34" stroke={c} strokeWidth="1" opacity="0.7"/>
        <line x1="30" y1="26" x2="44" y2="35" stroke={c} strokeWidth="1" opacity="0.6"/>
        <circle cx="30" cy="38" r="8" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3">
          <animate attributeName="r" values="5;10;5" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
        </circle>
        <text x="30" y="54" textAnchor="middle" fill={c} fontSize="7" fontFamily="monospace" opacity="0.7">ML/AI</text>
      </svg>
    )
  },
];

function CyberHeroVisual() {
  return (
    <div style={{ width:'100%', marginTop:'clamp(14px,3vw,36px)', padding:'0 0 8px' }}>
      {/* Section label */}
      <div style={{ textAlign:'center', marginBottom:12 }}>
        <span style={{ fontFamily:'Orbitron,monospace', fontSize:9, color:'rgba(0,201,255,0.5)', letterSpacing:2, textTransform:'uppercase' }}>
          TECH STACK
        </span>
      </div>
      {/* Icons grid — wraps to 2 rows on mobile */}
      <div className='tech-stack-grid' style={{ display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:'clamp(6px,1.5vw,14px)', maxWidth:760, margin:'0 auto', padding:'0 8px' }}>
        {TECH_ICONS.map((tech, i) => (
          <motion.div key={tech.name}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.1+i*0.07, type:'spring', stiffness:200 }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
            <motion.div
              animate={{ y:[0,-5,0], filter:[`drop-shadow(0 2px 6px ${tech.col}55)`,`drop-shadow(0 0 14px ${tech.col}99)`,`drop-shadow(0 2px 6px ${tech.col}55)`] }}
              transition={{ duration:2.5+i*0.2, repeat:Infinity, ease:'easeInOut', delay:i*0.18 }}
              whileHover={{ scale:1.2 }}
              style={{ width:'clamp(32px,5vw,52px)', height:'clamp(32px,5vw,52px)',
                background:`${tech.col}0d`, border:`1px solid ${tech.col}44`,
                borderRadius:10, padding:'clamp(5px,1vw,8px)',
                display:'flex', alignItems:'center', justifyContent:'center', cursor:'default' }}>
              {tech.svg(tech.col)}
            </motion.div>
            <span style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(5px,0.9vw,8px)',
              color:`${tech.col}88`, letterSpacing:0.5, textAlign:'center',
              display:'block', lineHeight:1.2 }}>
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
      {/* Bottom scan bar */}
      <div style={{ height:2, marginTop:14,
        background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.5),rgba(79,255,176,0.3),transparent)',
        position:'relative', overflow:'hidden', borderRadius:1 }}>
        <motion.div style={{ position:'absolute', inset:0, width:'25%',
          background:'linear-gradient(90deg,transparent,rgba(0,201,255,1),transparent)' }}
          animate={{ x:['-25%','125%'] }} transition={{ duration:2.5, repeat:Infinity, ease:'linear' }}/>
      </div>
    </div>
  );
}


// Cyberpunk counting stats
function useCountUp(target, duration, inView) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const numTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
    const suffix = target.replace(/[0-9.]/g, '');
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numTarget);
      setVal(current + suffix);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, target, duration]);
  return inView && started.current ? val : '0' + target.replace(/[0-9.]/g, '');
}

function StatBox({ n, l, col, icon, delay }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const counted = useCountUp(n, 1.8, inView);
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay, duration:0.5 }}
      style={{ textAlign:'center', position:'relative', padding:'18px 10px' }}>
      {/* Cyber frame with proper corners */}
      <div style={{ position:'absolute', inset:0, borderRadius:8, border:`1px solid ${col}28`, background:`${col}04` }}/>
      {/* Corner brackets - each individually positioned to prevent mobile clipping */}
      <div style={{ position:'absolute', top:5, left:5, width:10, height:10, borderTop:`2px solid ${col}99`, borderLeft:`2px solid ${col}99`, borderRadius:'3px 0 0 0' }}/>
      <div style={{ position:'absolute', top:5, right:5, width:10, height:10, borderTop:`2px solid ${col}99`, borderRight:`2px solid ${col}99`, borderRadius:'0 3px 0 0' }}/>
      <div style={{ position:'absolute', bottom:5, left:5, width:10, height:10, borderBottom:`2px solid ${col}99`, borderLeft:`2px solid ${col}99`, borderRadius:'0 0 0 3px' }}/>
      <div style={{ position:'absolute', bottom:5, right:5, width:10, height:10, borderBottom:`2px solid ${col}99`, borderRight:`2px solid ${col}99`, borderRadius:'0 0 3px 0' }}/>
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ fontFamily:'monospace', fontSize:16, color:col, opacity:0.55, marginBottom:6, lineHeight:1 }}>{icon}</div>
        <motion.div style={{ position:'relative', display:'inline-block' }}
          animate={{ scale:[1,1.03,1] }} transition={{ duration:3, repeat:Infinity, delay }}>
          <span style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(20px,4vw,40px)', fontWeight:900, color:col,
            textShadow:`0 0 20px ${col}88, 0 0 40px ${col}44`, letterSpacing:'-0.5px' }}>
            {counted}
          </span>
          {/* Glitch effect */}
          <motion.span aria-hidden style={{ position:'absolute', left:2, top:0, fontFamily:'Orbitron,monospace', fontSize:'clamp(20px,4vw,40px)', fontWeight:900, color:col, opacity:0, letterSpacing:'-0.5px', pointerEvents:'none' }}
            animate={{ opacity:[0,0.25,0], x:[0,3,0] }} transition={{ duration:4, repeat:Infinity, delay:delay+1.5 }}>
            {counted}
          </motion.span>
        </motion.div>
        <div style={{ color:'rgba(200,220,255,0.4)', fontSize:11, fontWeight:600, fontFamily:'Rajdhani,sans-serif', letterSpacing:1.5, textTransform:'uppercase', marginTop:5 }}>{l}</div>
      </div>
    </motion.div>
  );
}

function CyberStatsSection() {
  return (
    <div style={{ padding:'clamp(20px,4vw,36px) clamp(16px,5vw,32px)', background:'rgba(0,5,20,0.7)', borderTop:'1px solid rgba(0,201,255,0.12)', borderBottom:'1px solid rgba(0,201,255,0.12)', position:'relative', overflow:'hidden' }}>
      <motion.div style={{ position:'absolute', left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.3),transparent)' }} animate={{ top:['0%','100%'] }} transition={{ duration:3, repeat:Infinity, ease:'linear' }}/>
      <div style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'clamp(8px,2vw,20px)' }}>
        <StatBox n="150+" l="Projects"    col="#00C9FF" icon="◈" delay={0}    />
        <StatBox n="98%"  l="Satisfaction" col="#4FFFB0" icon="◎" delay={0.1} />
        <StatBox n="5+"   l="Years"        col="#FFD700" icon="◆" delay={0.2} />
        <StatBox n="6+"  l="Countries"    col="#FC5C7D" icon="◉" delay={0.3} />
      </div>
    </div>
  );
}


export default function HomePage({ go }) {
  const [selectedModal, setSelectedModal] = useState(null);

  return (
    <div style={{ paddingTop:72, overflowX:'hidden' }}>

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'clamp(68px,6vw,100px) clamp(16px,5vw,32px) clamp(28px,4vw,56px)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:'min(600px,80vw)', height:'min(600px,80vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,201,255,0.12) 0%,transparent 70%)', top:'-5%', left:'3%', pointerEvents:'none', animation:'aurora1 14s ease-in-out infinite' }}/>
        <div style={{ position:'absolute', width:'min(400px,60vw)', height:'min(400px,60vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(79,255,176,0.07) 0%,transparent 70%)', bottom:'5%', right:'5%', pointerEvents:'none', animation:'aurora2 18s ease-in-out infinite' }}/>
        {/* Cyber grid overlay */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.03) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }}/>
        {[260,440,620].map((s,i) => (
          <motion.div key={i} style={{ position:'absolute', width:s, height:s, borderRadius:'50%', border:`1px solid rgba(0,201,255,${.06-i*.015})`, top:'50%', left:'50%', marginLeft:-s/2, marginTop:-s/2, pointerEvents:'none' }} animate={{ rotate:360 }} transition={{ duration:22+i*8, repeat:Infinity, ease:'linear' }} />
        ))}

        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:.8, ease:[.16,1,.3,1] }} style={{ position:'relative', zIndex:1, maxWidth:860, width:'100%' }}>
          <motion.div style={{ display:'flex', justifyContent:'center', marginBottom:'clamp(8px,2vw,20px)' }}
            animate={{ filter:['drop-shadow(0 0 14px rgba(0,201,255,0.5))','drop-shadow(0 0 34px rgba(79,255,176,0.9))','drop-shadow(0 0 14px rgba(0,201,255,0.5))'] }} transition={{ duration:3.2, repeat:Infinity }}>
            <AquronLogoCanvas size={96} />
          </motion.div>

          <motion.div style={{ display:'inline-flex', alignItems:'center', gap:9, background:'rgba(0,201,255,0.08)', border:'1px solid rgba(0,201,255,0.28)', borderRadius:24, padding:'6px 18px', marginBottom:24, fontSize:'clamp(10px,1.5vw,13px)', color:'#00C9FF', fontWeight:700 }} initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:.2, type:'spring' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#4FFFB0', display:'inline-block', animation:'pulse 2s infinite', boxShadow:'0 0 8px #4FFFB0' }} />
            Trusted by 150+ clients · 6+ countries · Kolkata, India
          </motion.div>

          <h1 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(22px,4.5vw,58px)', fontWeight:900, lineHeight:1.1, marginBottom:12, color:'#fff', letterSpacing:'clamp(0px,0.02em,2px)', textShadow:'0 0 40px rgba(0,201,255,0.3)' }}>
            <span style={{ display:'block', fontSize:'clamp(11px,1.5vw,14px)', fontFamily:'Rajdhani,sans-serif', color:'rgba(0,201,255,0.7)', letterSpacing:'clamp(3px,0.5vw,8px)', textTransform:'uppercase', marginBottom:8, fontWeight:600 }}>
              [ AQURON DIGITAL AGENCY ]
            </span>
            WE CRAFT EXCEPTIONAL<br />
            <span style={{ display:'inline-block', position:'relative' }}>
              <PremiumTyper />
            </span>
          </h1>
          <p style={{ fontSize:'clamp(13px,1.4vw,17px)', color:'rgba(148,200,240,0.65)', maxWidth:580, margin:'14px auto 30px', lineHeight:1.88, fontFamily:'Rajdhani,sans-serif', fontWeight:500, letterSpacing:'0.3px' }}>
            Aquron is a full-service digital agency crafting fluid, high-performance websites, mobile apps, e-commerce, and marketing for bold brands worldwide.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <motion.button className="btn-gold" style={{ fontSize:'clamp(13px,1.4vw,16px)', padding:'clamp(11px,1.5vw,14px) clamp(20px,2.5vw,34px)' }} onClick={() => go('contact')} whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}>
              Deploy Your Project
            </motion.button>
            <motion.button className="btn-ghost" style={{ fontSize:'clamp(13px,1.4vw,16px)', padding:'clamp(11px,1.5vw,14px) clamp(20px,2.5vw,34px)' }} onClick={() => go('portfolio')} whileHover={{ scale:1.03 }}>
              View Our Work
            </motion.button>
          </div>
          <Reveal delay={.3}><CyberHeroVisual /></Reveal>
        </motion.div>
      </section>

      {/* STATS — cyberpunk glitch counters */}
      <CyberStatsSection />

      {/* CYBER SERVICE CARDS */}
      <section className="section-pad">
        <div className="wrap">
          <SectionHeader label="SERVICES" title="Deploy Your Digital Stack" sub="Each Aquron service is a specialist module — engineered to dominate its arena." labelColor="#00C9FF" />
          {/* Cyber section label */}
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:30 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,201,255,0.06)', border:'1px solid rgba(0,201,255,0.2)', borderRadius:6, padding:'6px 18px' }}>
                <motion.span style={{ width:6, height:6, borderRadius:'50%', background:'#00C9FF', display:'inline-block' }} animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:1.2, repeat:Infinity }} />
                <span style={{ color:'rgba(0,201,255,0.8)', fontSize:11, fontWeight:700, fontFamily:'Orbitron,monospace', letterSpacing:2 }}>SELECT SERVICE MODULE</span>
              </div>
            </div>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(175px,1fr))', gap:15 }}>
            {SERVICES.map((s,i) => (
              <CyberServiceCard key={s.id} service={s} delay={i*.06} onClick={() => go('service_'+s.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO — cyberpunk style */}
      <section className="section-pad" style={{ background:'rgba(0,201,255,0.018)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.02) 1px,transparent 1px)', backgroundSize:'40px 40px', pointerEvents:'none' }}/>
        <div className="wrap" style={{ position:'relative', zIndex:1 }}>
          <SectionHeader label="MISSION LOG" title="Ops We're Proud Of" sub="A curated selection of successful deployments across industries and platforms." labelColor="#4FFFB0" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:22 }}>
            {PORTFOLIO.slice(0,3).map((p,i) => <PortfolioCard key={i} p={p} delay={i*.08} onClick={() => setSelectedModal(p)} />)}
          </div>
          <div style={{ textAlign:'center', marginTop:34 }}>
            <motion.button className="btn-outline" onClick={() => go('portfolio')} whileHover={{ scale:1.04 }}
              style={{ fontFamily:'Orbitron,monospace', letterSpacing:1.5, fontSize:12 }}>
              VIEW FULL MISSION LOG →
            </motion.button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding:'clamp(50px,8vw,72px) 0', overflow:'hidden' }}>
        <div style={{ textAlign:'center', marginBottom:34, padding:'0 24px' }}>
          <Reveal>
            <p className="section-label" style={{ color:'#FF9F43', fontFamily:'Orbitron,monospace', letterSpacing:2 }}>CLIENT INTEL</p>
            <h2 className="section-title">What Our Clients Say</h2>
          </Reveal>
        </div>
        <Marquee items={REVIEWS_1} dir="left" />
        <div style={{ marginTop:13 }}><Marquee items={REVIEWS_2} dir="right" /></div>
      </section>

      {/* CTA */}
      <section style={{ padding:'clamp(60px,10vw,90px) 24px', background:'linear-gradient(135deg,rgba(0,201,255,0.08),rgba(79,255,176,0.04))', borderTop:'1px solid rgba(0,201,255,0.12)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.025) 1px,transparent 1px)', backgroundSize:'50px 50px', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,201,255,0.06) 0%,transparent 70%)', pointerEvents:'none', animation:'aurora1 8s ease-in-out infinite' }}/>
        <Reveal>
          {/* Cyber icon instead of emoji */}
          <motion.div style={{ display:'flex', justifyContent:'center', marginBottom:16 }} animate={{ y:[0,-4,0] }} transition={{ duration:3, repeat:Infinity }}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <motion.rect x="4" y="4" width="44" height="44" rx="8" stroke="#00C9FF" strokeWidth="1.5" fill="none"
                animate={{ strokeOpacity:[0.4,1,0.4] }} transition={{ duration:2, repeat:Infinity }} />
              <motion.rect x="10" y="10" width="32" height="32" rx="5" stroke="#4FFFB0" strokeWidth="1" fill="none"
                animate={{ strokeOpacity:[0.3,0.8,0.3] }} transition={{ duration:2, repeat:Infinity, delay:0.4 }} />
              <path d="M18 26 L22 30 L34 18" stroke="#00C9FF" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(20px,4vw,46px)', fontWeight:800, color:'#fff', marginBottom:16, letterSpacing:'-1px' }}>Ready to Deploy?</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'clamp(14px,1.5vw,17px)', marginBottom:36 }}>Free consultation · No pressure · Results guaranteed by Aquron</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <motion.button className="btn-gold" style={{ fontSize:'clamp(13px,1.5vw,16px)', padding:'clamp(12px,1.5vw,15px) clamp(22px,3vw,38px)' }} onClick={() => go('contact')} whileHover={{ scale:1.05 }}>Start Your Project</motion.button>
            <button className="btn-ghost" style={{ fontSize:'clamp(13px,1.5vw,16px)', padding:'clamp(12px,1.5vw,15px) clamp(22px,3vw,38px)' }} onClick={() => go('pricing')}>View Pricing</button>
          </div>
        </Reveal>
      </section>

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedModal && (
          <motion.div style={{ position:'fixed', inset:0, background:'rgba(5,7,31,0.92)', zIndex:8000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(14px)' }} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setSelectedModal(null)}>
            <motion.div style={{ background:'#0a0d28', border:'1px solid rgba(0,201,255,0.2)', borderRadius:16, maxWidth:680, width:'100%', maxHeight:'85vh', overflowY:'auto', position:'relative' }} initial={{ scale:.85 }} animate={{ scale:1 }} exit={{ scale:.85 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedModal(null)} style={{ position:'absolute', top:16, right:16, width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.14)', color:'rgba(255,255,255,0.7)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, zIndex:10 }}>✕</button>
              <div style={{ padding:'28px 28px 34px' }}>
                <div style={{ display:'flex', gap:16, alignItems:'center', marginBottom:20 }}>
                  <div style={{ width:60, height:60, background:`linear-gradient(135deg,${selectedModal.col}33,${selectedModal.col}11)`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, border:`1px solid ${selectedModal.col}33` }}>{selectedModal.em}</div>
                  <div><h2 style={{ fontFamily:'Orbitron,monospace', fontSize:18, fontWeight:800, color:'#fff', marginBottom:6 }}>{selectedModal.title}</h2><span style={{ background:selectedModal.col, color:'#030412', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:4 }}>{selectedModal.cat}</span></div>
                </div>
                <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, lineHeight:1.8, marginBottom:20 }}>{selectedModal.desc}</p>
                <p style={{ color:'rgba(255,255,255,0.38)', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:10, fontFamily:'Orbitron,monospace' }}>Tech Stack</p>
                <p style={{ color:'rgba(255,255,255,0.72)', fontSize:14, marginBottom:20 }}>{selectedModal.tech}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:28 }}>
                  {selectedModal.res.map(r => <div key={r} style={{ background:'rgba(79,255,176,0.08)', border:'1px solid rgba(79,255,176,0.25)', color:'#4FFFB0', fontSize:13, fontWeight:600, padding:'7px 16px', borderRadius:6 }}>✓ {r}</div>)}
                </div>
                {selectedModal.link && <a href={selectedModal.link} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${selectedModal.col},#4FFFB0)`, color:'#030412', fontSize:14, fontWeight:700, padding:'12px 24px', borderRadius:8, textDecoration:'none' }}>↗ Visit Live Site</a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
