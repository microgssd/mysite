import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO } from '../data/index.js';
import { Reveal, SectionHeader } from '../components/index.js';

const CATS = ['All', ...new Set(PORTFOLIO.map(p => p.cat))];

export default function PortfolioPage({ go }) {
  const [cat, setCat] = useState('All');
  const [modal, setModal] = useState(null);
  const filtered = cat === 'All' ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === cat);

  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>
      <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none', zIndex:0 }}/>
      <section className="section-pad" style={{ position:'relative', zIndex:1 }}>
        <div className="wrap">
          <SectionHeader label="MISSION LOG" title="Ops We're Proud Of" sub="Every project is a mission completed — engineered with precision, delivered on time." labelColor="#4FFFB0" />

          {/* Filter tabs */}
          <Reveal>
            <div className="filter-row" style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginBottom:36 }}>
              {CATS.map(c => (
                <motion.button key={c} onClick={() => setCat(c)}
                  style={{ padding:'7px 18px', borderRadius:5, fontSize:11, fontWeight:700, fontFamily:'Orbitron,monospace', letterSpacing:1.2, cursor:'pointer', border:`1px solid ${cat===c ? '#00C9FF' : 'rgba(0,201,255,0.2)'}`, background: cat===c ? 'rgba(0,201,255,0.12)' : 'rgba(0,0,0,0.4)', color: cat===c ? '#00C9FF' : 'rgba(255,255,255,0.45)', transition:'all 0.2s' }}
                  whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>
                  {c.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </Reveal>

          {/* Portfolio grid */}
          <div className="blog-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:22 }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div key={p.id} layout
                  initial={{ opacity:0, y:20, scale:0.95 }}
                  animate={{ opacity:1, y:0, scale:1 }}
                  exit={{ opacity:0, scale:0.9 }}
                  transition={{ delay:i*0.05 }}
                  onClick={() => setModal(p)}
                  style={{ background:'rgba(0,8,24,0.8)', border:`1px solid ${p.col}33`, borderRadius:12, overflow:'hidden', cursor:'pointer', position:'relative' }}
                  whileHover={{ y:-8, borderColor:`${p.col}88`, boxShadow:`0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${p.col}18` }}>
                  {/* Top color bar */}
                  <div style={{ height:3, background:`linear-gradient(90deg,${p.col},${p.col}44)` }}/>
                  {/* Scan line */}
                  <motion.div style={{ position:'absolute', left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${p.col}44,transparent)` }} animate={{ top:['3px','100%'] }} transition={{ duration:3+i*0.3, repeat:Infinity, ease:'linear' }}/>

                  <div style={{ padding:'20px 20px 18px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                      <div style={{ width:50, height:50, background:`${p.col}12`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, border:`1px solid ${p.col}33` }}>{p.em}</div>
                      <span style={{ fontFamily:'Orbitron,monospace', fontSize:9, color:p.col, border:`1px solid ${p.col}44`, borderRadius:4, padding:'3px 8px', letterSpacing:1 }}>{p.cat.toUpperCase()}</span>
                    </div>
                    <h3 style={{ fontFamily:'Orbitron,monospace', fontSize:15, fontWeight:800, color:'#fff', marginBottom:8, letterSpacing:0.5 }}>{p.title}</h3>
                    <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, lineHeight:1.6, marginBottom:14, fontFamily:'Rajdhani,sans-serif' }}>{p.desc}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }}>
                      {(p.res||p.results||[]).map(r => (
                        <span key={r} style={{ background:`${p.col}0d`, border:`1px solid ${p.col}33`, color:p.col, fontSize:10.5, fontWeight:600, padding:'3px 10px', borderRadius:4, fontFamily:'Rajdhani,sans-serif' }}>✓ {r}</span>
                      ))}
                    </div>
                    <p style={{ color:'rgba(255,255,255,0.25)', fontSize:11, fontFamily:'monospace' }}>{p.tech}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div style={{ textAlign:'center', marginTop:40 }}>
            <motion.button className="btn-gold" onClick={() => go('contact')} style={{ fontFamily:'Orbitron,monospace', fontSize:12, letterSpacing:1.5, padding:'13px 30px' }} whileHover={{ scale:1.05 }}>
              START YOUR MISSION →
            </motion.button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div style={{ position:'fixed', inset:0, background:'rgba(0,5,20,0.95)', zIndex:8000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(14px)' }} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setModal(null)}>
            <motion.div style={{ background:'#030812', border:`1px solid ${modal.col}44`, borderRadius:14, maxWidth:680, width:'100%', maxHeight:'85vh', overflowY:'auto', position:'relative' }} initial={{ scale:0.85 }} animate={{ scale:1 }} exit={{ scale:0.85 }} onClick={e => e.stopPropagation()}>
              <div style={{ height:2, background:`linear-gradient(90deg,${modal.col},${modal.col}44)` }}/>
              <button onClick={() => setModal(null)} style={{ position:'absolute', top:14, right:14, width:34, height:34, borderRadius:6, background:'rgba(255,255,255,0.06)', border:`1px solid ${modal.col}33`, color:'rgba(255,255,255,0.6)', cursor:'pointer', fontSize:16, zIndex:10, fontFamily:'monospace' }}>✕</button>
              <div style={{ padding:'24px 26px 30px' }}>
                <div style={{ display:'flex', gap:14, alignItems:'center', marginBottom:18 }}>
                  <div style={{ width:56, height:56, background:`${modal.col}12`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, border:`1px solid ${modal.col}33` }}>{modal.em}</div>
                  <div>
                    <h2 style={{ fontFamily:'Orbitron,monospace', fontSize:18, fontWeight:800, color:'#fff', marginBottom:5, letterSpacing:0.5 }}>{modal.title}</h2>
                    <span style={{ background:modal.col, color:'#030412', fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:4, fontFamily:'Orbitron,monospace', letterSpacing:1 }}>{modal.cat.toUpperCase()}</span>
                  </div>
                </div>
                <p style={{ color:'rgba(255,255,255,0.6)', fontSize:14, lineHeight:1.8, marginBottom:18, fontFamily:'Rajdhani,sans-serif' }}>{modal.desc}</p>
                <p style={{ color:'rgba(255,255,255,0.3)', fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:8, fontFamily:'Orbitron,monospace' }}>Tech Stack</p>
                <p style={{ color:'rgba(255,255,255,0.65)', fontSize:13, marginBottom:18, fontFamily:'monospace' }}>{modal.tech}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:24 }}>
                  {(modal.res||modal.results||[]).map(r => <div key={r} style={{ background:'rgba(79,255,176,0.08)', border:'1px solid rgba(79,255,176,0.25)', color:'#4FFFB0', fontSize:12, fontWeight:600, padding:'6px 14px', borderRadius:5, fontFamily:'Rajdhani,sans-serif' }}>✓ {r}</div>)}
                </div>
                {modal.link && <a href={modal.link} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${modal.col},#4FFFB0)`, color:'#030412', fontSize:13, fontWeight:700, padding:'11px 22px', borderRadius:7, textDecoration:'none', fontFamily:'Orbitron,monospace', letterSpacing:0.8 }}>↗ VISIT LIVE SITE</a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
