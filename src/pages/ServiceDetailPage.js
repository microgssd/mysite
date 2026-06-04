import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../data/index.js';
import { Reveal, CyberServiceCard, AnimProcess } from '../components/index.js';

// Cyberpunk service icons (reuse from CyberServiceCard logic inline)
const ICONS = {
  'web-info':(c)=><svg width="80" height="80" viewBox="0 0 64 64" fill="none"><rect x="6" y="12" width="52" height="36" rx="4" stroke={c} strokeWidth="1.8" fill="none"/><line x1="6" y1="22" x2="58" y2="22" stroke={c} strokeWidth="1.2" opacity="0.6"/><circle cx="13" cy="17" r="2" fill={c} opacity="0.7"/><circle cx="20" cy="17" r="2" fill={c} opacity="0.5"/><circle cx="27" cy="17" r="2" fill={c} opacity="0.3"/><rect x="14" y="28" width="20" height="2" rx="1" fill={c} opacity="0.5"/><rect x="14" y="33" width="30" height="2" rx="1" fill={c} opacity="0.35"/><rect x="14" y="38" width="24" height="2" rx="1" fill={c} opacity="0.25"/><path d="M44 28 L54 38 L44 48" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8"/></svg>,
  'ecommerce':(c)=><svg width="80" height="80" viewBox="0 0 64 64" fill="none"><path d="M8 10 L14 10 L20 38 L50 38 L56 18 L20 18" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="26" cy="46" r="4" stroke={c} strokeWidth="1.5" fill="none"/><circle cx="44" cy="46" r="4" stroke={c} strokeWidth="1.5" fill="none"/><rect x="28" y="22" width="8" height="12" rx="1" stroke={c} strokeWidth="1.2" fill="none" opacity="0.6"/></svg>,
  'android':(c)=><svg width="80" height="80" viewBox="0 0 64 64" fill="none"><rect x="18" y="14" width="28" height="44" rx="5" stroke={c} strokeWidth="1.8" fill="none"/><line x1="18" y1="22" x2="46" y2="22" stroke={c} strokeWidth="1" opacity="0.5"/><line x1="18" y1="48" x2="46" y2="48" stroke={c} strokeWidth="1" opacity="0.5"/><circle cx="32" cy="53" r="2" stroke={c} strokeWidth="1.2" fill="none" opacity="0.6"/><rect x="26" y="27" width="12" height="16" rx="2" stroke={c} strokeWidth="1.2" fill="none" opacity="0.6"/><path d="M29 27 L29 24 M35 27 L35 24" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/></svg>,
  'ios':(c)=><svg width="80" height="80" viewBox="0 0 64 64" fill="none"><rect x="20" y="8" width="24" height="48" rx="6" stroke={c} strokeWidth="1.8" fill="none"/><line x1="20" y1="18" x2="44" y2="18" stroke={c} strokeWidth="1" opacity="0.5"/><line x1="20" y1="48" x2="44" y2="48" stroke={c} strokeWidth="1" opacity="0.5"/><rect x="28" y="12" width="8" height="2" rx="1" fill={c} opacity="0.4"/><circle cx="32" cy="53" r="2.5" stroke={c} strokeWidth="1.2" fill="none" opacity="0.6"/><path d="M28 32 Q32 26 36 32 Q40 38 36 44 Q32 50 28 44 Q24 38 28 32Z" stroke={c} strokeWidth="1.2" fill="none" opacity="0.6"/></svg>,
  'hybrid':(c)=><svg width="80" height="80" viewBox="0 0 64 64" fill="none"><rect x="8" y="16" width="20" height="34" rx="4" stroke={c} strokeWidth="1.8" fill="none"/><rect x="36" y="16" width="20" height="34" rx="4" stroke={c} strokeWidth="1.8" fill="none"/><line x1="28" y1="33" x2="36" y2="33" stroke={c} strokeWidth="1.5" strokeDasharray="2,2" opacity="0.6"/><circle cx="32" cy="33" r="4" stroke={c} strokeWidth="1.2" fill="none"/><circle cx="32" cy="33" r="1.5" fill={c} opacity="0.7"/></svg>,
  'digital':(c)=><svg width="80" height="80" viewBox="0 0 64 64" fill="none"><polyline points="8,46 18,32 26,38 36,20 46,28 56,12" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="36" cy="20" r="3" fill={c} opacity="0.8"/><circle cx="56" cy="12" r="3" fill={c}/><line x1="8" y1="50" x2="56" y2="50" stroke={c} strokeWidth="0.8" opacity="0.3"/><path d="M50 8 L58 8 L58 16" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8"/></svg>,
  'payment':(c)=><svg width="80" height="80" viewBox="0 0 64 64" fill="none"><rect x="8" y="16" width="48" height="32" rx="5" stroke={c} strokeWidth="1.8" fill="none"/><line x1="8" y1="26" x2="56" y2="26" stroke={c} strokeWidth="2" opacity="0.6"/><rect x="14" y="32" width="12" height="8" rx="2" fill={c} opacity="0.25" stroke={c} strokeWidth="1"/><line x1="32" y1="34" x2="50" y2="34" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/></svg>,
  'blog':(c)=><svg width="80" height="80" viewBox="0 0 64 64" fill="none"><rect x="10" y="10" width="36" height="44" rx="3" stroke={c} strokeWidth="1.8" fill="none"/><line x1="17" y1="20" x2="39" y2="20" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/><line x1="17" y1="27" x2="39" y2="27" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/><line x1="17" y1="33" x2="33" y2="33" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/><line x1="17" y1="39" x2="36" y2="39" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/></svg>,
};

export default function ServiceDetailPage({ id, go }) {
  const s = SERVICES.find(x => x.id === id) || SERVICES[0];
  const related = SERVICES.filter(x => x.id !== s.id).slice(0,3);
  const IconFn = ICONS[s.id];

  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>
      <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none', zIndex:0 }}/>

      {/* Hero */}
      <section style={{ padding:'52px 0 40px', position:'relative', zIndex:1, overflow:'hidden' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${s.col}66,transparent)` }}/>
        <div className="wrap">
          <motion.button onClick={() => go('services')} style={{ background:'rgba(0,201,255,0.06)', border:'1px solid rgba(0,201,255,0.2)', color:'rgba(255,255,255,0.65)', padding:'7px 16px', borderRadius:6, marginBottom:28, fontSize:12, cursor:'pointer', fontFamily:'Orbitron,monospace', letterSpacing:1 }} whileHover={{ scale:1.03 }}>
            ← BACK
          </motion.button>

          <div className="svc-detail-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:52, alignItems:'center' }}>
            <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7 }}>
              {/* Rank badge */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(0,201,255,0.06)', border:`1px solid ${s.col}44`, borderRadius:6, padding:'6px 16px', marginBottom:20 }}>
                <motion.span style={{ width:6, height:6, borderRadius:'50%', background:s.col }} animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:1.2, repeat:Infinity }} />
                <span style={{ fontFamily:'Orbitron,monospace', fontSize:11, color:s.col, fontWeight:700, letterSpacing:1.5 }}>SERVICE MODULE ACTIVE</span>
              </div>
              <h1 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(18px,3vw,36px)', fontWeight:800, color:'#fff', lineHeight:1.2, marginBottom:18, letterSpacing:'.5px' }}>{s.hero}</h1>
              {/* Stats */}
              <div className="svc-stats-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:11, marginBottom:26 }}>
                {s.stats.map(st => (
                  <motion.div key={st.n} style={{ background:'rgba(0,0,0,0.4)', border:`1px solid ${s.col}33`, borderRadius:8, padding:'12px 14px', textAlign:'center' }} whileHover={{ borderColor:s.col+'88', scale:1.04 }}>
                    <p style={{ fontFamily:'Orbitron,monospace', fontSize:20, fontWeight:800, color:s.col, marginBottom:2 }}>{st.n}</p>
                    <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontFamily:'Rajdhani,sans-serif', letterSpacing:1 }}>{st.l}</p>
                  </motion.div>
                ))}
              </div>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <motion.button className="btn-gold" onClick={() => go('contact')} style={{ fontSize:13, padding:'11px 24px', fontFamily:'Orbitron,monospace', letterSpacing:1 }} whileHover={{ scale:1.04 }}>DEPLOY THIS MODULE</motion.button>
                <button className="btn-outline" onClick={() => go('portfolio')} style={{ fontFamily:'Orbitron,monospace', fontSize:12, letterSpacing:1 }}>VIEW MISSIONS</button>
              </div>
            </motion.div>

            {/* Icon showcase */}
            <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7 }}
              style={{ background:'rgba(0,0,0,0.3)', border:`1px solid ${s.col}22`, borderRadius:16, padding:32, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:20, minHeight:260, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 40%,${s.col}08 0%,transparent 65%)`, pointerEvents:'none' }}/>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${s.col}66,transparent)` }}/>
              {/* Animated scan */}
              <motion.div style={{ position:'absolute', left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${s.col}55,transparent)` }} animate={{ top:['0%','100%'] }} transition={{ duration:3, repeat:Infinity, ease:'linear' }}/>
              <motion.div style={{ filter:`drop-shadow(0 0 20px ${s.col}88)`, position:'relative', zIndex:1 }} animate={{ y:[0,-8,0] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}>
                {IconFn ? IconFn(s.col) : null}
              </motion.div>
              {/* Tech tags */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center', position:'relative', zIndex:1 }}>
                {s.tech.slice(0,5).map(t => (
                  <motion.span key={t} style={{ background:'rgba(0,0,0,0.5)', border:`1px solid ${s.col}44`, color:s.col, padding:'5px 12px', borderRadius:4, fontSize:11, fontWeight:600, fontFamily:'monospace' }} whileHover={{ scale:1.08 }}>{t}</motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:'44px 0', background:'rgba(0,0,0,0.2)', position:'relative', zIndex:1 }}>
        <div className="wrap">
          <Reveal>
            <h2 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(16px,2.5vw,22px)', fontWeight:800, color:'#fff', marginBottom:6, letterSpacing:1 }}>Module Capabilities</h2>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, marginBottom:24 }}>Every engagement includes these core capabilities.</p>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:10 }}>
            {s.feats.map((f,i) => (
              <Reveal key={i} delay={i*.03}>
                <motion.div style={{ display:'flex', gap:10, alignItems:'flex-start', background:'rgba(0,0,0,0.3)', border:'1px solid rgba(0,201,255,0.08)', borderRadius:8, padding:'11px 14px' }} whileHover={{ borderColor:`${s.col}44`, x:4 }}>
                  <span style={{ color:s.col, fontSize:14, flexShrink:0, fontFamily:'monospace' }}>{'>'}</span>
                  <span style={{ color:'rgba(255,255,255,0.7)', fontSize:13.5, lineHeight:1.5, fontFamily:'Rajdhani,sans-serif' }}>{f}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding:'40px 0', position:'relative', zIndex:1 }}>
        <div className="wrap">
          <Reveal>
            <h2 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(16px,2.5vw,20px)', fontWeight:800, color:'#fff', marginBottom:6, letterSpacing:1 }}>Execution Protocol</h2>
            <p style={{ color:'rgba(255,255,255,0.38)', fontSize:13, marginBottom:16 }}>Transparent from discovery to delivery.</p>
          </Reveal>
          <AnimProcess steps={s.proc} col={s.col} />
        </div>
      </section>

      {/* Related */}
      <section style={{ padding:'40px 0', position:'relative', zIndex:1 }}>
        <div className="wrap">
          <Reveal><h2 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(16px,2.5vw,20px)', fontWeight:800, color:'#fff', marginBottom:22, letterSpacing:1 }}>Related Modules</h2></Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:14 }}>
            {related.map((rs,i) => <CyberServiceCard key={rs.id} service={rs} delay={i*.07} onClick={() => go('service_'+rs.id)} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'60px 24px', textAlign:'center', background:`linear-gradient(135deg,rgba(0,0,0,0.4),${s.col}0a)`, borderTop:`1px solid ${s.col}22`, position:'relative', zIndex:1 }}>
        <Reveal>
          <motion.div style={{ display:'flex', justifyContent:'center', marginBottom:16, filter:`drop-shadow(0 0 20px ${s.col}77)` }} animate={{ y:[0,-6,0] }} transition={{ duration:3, repeat:Infinity }}>
            {IconFn ? IconFn(s.col) : null}
          </motion.div>
          <h2 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(18px,3vw,32px)', fontWeight:800, color:'#fff', marginBottom:14, letterSpacing:'.5px' }}>Ready to deploy {s.title}?</h2>
          <p style={{ color:'rgba(255,255,255,0.48)', fontSize:15, marginBottom:28 }}>Let's build something extraordinary together.</p>
          <motion.button className="btn-gold" onClick={() => go('contact')} style={{ fontSize:14, padding:'13px 32px', fontFamily:'Orbitron,monospace', letterSpacing:1.5 }} whileHover={{ scale:1.05 }}>GET FREE CONSULT</motion.button>
        </Reveal>
      </section>
    </div>
  );
}
