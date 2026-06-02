
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO } from '../data/index.js';
import { Reveal, SectionHeader, PortfolioCard } from '../components/index.js';

const CATS = ['All','Web App','E-Commerce','Hybrid App','Web + Android','E-Learning','Digital Marketing'];

export default function PortfolioPage({ go }) {
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const filtered = filter==='All' ? PORTFOLIO : PORTFOLIO.filter(p=>p.cat===filter);
  return (
    <div style={{ paddingTop:88 }}>
      <section className="section-pad">
        <div className="wrap">
          <SectionHeader label="Battle Log" title="Work That Speaks for Itself" sub="A curated selection across industries and platforms." labelColor="#4FFFB0" />
          <Reveal>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginBottom:40 }}>
              {CATS.map(c => (
                <motion.button key={c} className={`fpill ${filter===c?'act':''}`} onClick={() => setFilter(c)}
                  whileHover={{scale:1.06}} whileTap={{ scale:.96 }}
                  style={{ padding:'8px 18px', borderRadius:22, border:'1px solid', fontFamily:'Manrope,sans-serif', fontSize:12.5, fontWeight:600, cursor:'pointer', transition:'all .24s', background:filter===c?'#00C9FF':'transparent', borderColor:filter===c?'#00C9FF':'rgba(255,255,255, 0.13)', color:filter===c?'#030412':'rgba(255,255,255, 0.56)', boxShadow:filter===c?'0 4px 16px rgba(0,201,255, 0.3)':'none' }}>
                  {c}
                </motion.button>
              ))}
            </div>
          </Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={filter} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              className='blog-grid' style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:26 }}>
              {filtered.map((p,i) => <PortfolioCard key={p.title} p={p} delay={i*.07} onClick={() => setModal(p)} />)}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <AnimatePresence>
        {modal && (
          <motion.div className="modal-overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={()=>setModal(null)}>
            <motion.div className="modal-box" initial={{ scale:.85 }} animate={{ scale:1 }} exit={{ scale:.85 }} onClick={e=>e.stopPropagation()}>
              <button onClick={()=>setModal(null)} style={{ position:'absolute', top:16, right:16, width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255, 0.08)', border:'1px solid rgba(255,255,255, 0.14)', color:'rgba(255,255,255, 0.7)', cursor:'pointer', fontSize:18 }}>✕</button>
              <div style={{ padding:'28px 32px 36px' }}>
                <div style={{ display:'flex', gap:16, alignItems:'center', marginBottom:22 }}>
                  <div style={{ width:60, height:60, background:`linear-gradient(135deg,${modal.col}33,${modal.col}11)`, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>{modal.em}</div>
                  <div><h2 style={{ fontFamily:'Sora,sans-serif', fontSize:22, fontWeight:800, color:'#fff', marginBottom:4 }}>{modal.title}</h2><span style={{ background:modal.col, color:'#030412', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>{modal.cat}</span></div>
                </div>
                <p style={{ color:'rgba(255,255,255, 0.6)', fontSize:15, lineHeight:1.8, marginBottom:20 }}>{modal.desc}</p>
                <p style={{ color:'rgba(255,255,255, 0.38)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'1.2px', marginBottom:10 }}>Tech Stack</p>
                <p style={{ color:'rgba(255,255,255, 0.72)', fontSize:14, marginBottom:20 }}>{modal.tech}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:28 }}>
                  {modal.res.map(r=><div key={r} style={{ background:'rgba(79,255,176, 0.08)', border:'1px solid rgba(79,255,176, 0.25)', color:'#4FFFB0', fontSize:13, fontWeight:600, padding:'7px 16px', borderRadius:22 }}>✓ {r}</div>)}
                </div>
                {modal.link && <a href={modal.link} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${modal.col},#4FFFB0)`, color:'#030412', fontSize:14, fontWeight:700, padding:'12px 24px', borderRadius:11, textDecoration:'none' }}>↗ Visit Live Site</a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
