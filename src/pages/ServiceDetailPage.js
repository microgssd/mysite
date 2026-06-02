import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES, CR_CHARACTERS } from '../data/index.js';
import { Reveal, CRCharCardV2, AnimProcess } from '../components/index.js';
import CRSprite from '../components/CRSprites.js';

export default function ServiceDetailPage({ id, go }) {
  const s = SERVICES.find(x => x.id === id) || SERVICES[0];
  const char = CR_CHARACTERS[s.id];
  const related = SERVICES.filter(x => x.id !== s.id).slice(0, 3);

  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>

      {/* Hero */}
      <section style={{ padding:'60px 0', position:'relative', overflow:'hidden', background:`radial-gradient(ellipse at 22% 50%,${s.col}12 0%,transparent 60%)` }}>
        <div className="wrap">
          <motion.button onClick={() => go('services')} style={{ background:'rgba(255,255,255, 0.05)', border:'1px solid rgba(255,255,255, 0.1)', color:'rgba(255,255,255, 0.65)', padding:'7px 16px', borderRadius:8, marginBottom:28, fontSize:13, cursor:'pointer', fontFamily:'Manrope,sans-serif' }} whileHover={{color:'#fff'}}>
            Back to Services
          </motion.button>

          <div className="svc-detail-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center' }}>
            <motion.div initial={{ opacity:0, x:-44 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7 }}>
              {char && (
                <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(0,0,0, 0.35)', backdropFilter:'blur(8px)', border:`1px solid ${s.col}44`, borderRadius:12, padding:'8px 18px', marginBottom:22 }}>
                  <span style={{ fontSize:13, color:s.col, fontWeight:800, fontFamily:'Sora,sans-serif', letterSpacing:'.5px', textTransform:'uppercase' }}>{char.rarity}</span>
                  <span style={{ color:'rgba(255,255,255, 0.4)', fontSize:11 }}>·</span>
                  <span style={{ color:s.col, fontSize:13, fontWeight:600 }}>{char.tagline}</span>
                </div>
              )}
              <h1 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(24px,3.8vw,50px)', fontWeight:800, color:'#fff', lineHeight:1.1, marginBottom:18, letterSpacing:'-1px' }}>{s.hero}</h1>
              <div className="svc-stats-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:11, marginBottom:28 }}>
                {s.stats.map(st => (
                  <motion.div key={st.n} style={{ background:'rgba(255,255,255, 0.04)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255, 0.07)', borderRadius:12, padding:'13px 15px', textAlign:'center' }}
                    whileHover={{borderColor:s.col+'55', scale:1.04}}>
                    <p style={{ fontFamily:'Sora,sans-serif', fontSize:21, fontWeight:800, color:s.col, marginBottom:2 }}>{st.n}</p>
                    <p style={{ color:'rgba(255,255,255, 0.4)', fontSize:11.5 }}>{st.l}</p>
                  </motion.div>
                ))}
              </div>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <motion.button className="btn-gold" onClick={() => go('contact')} style={{ fontSize:14.5, padding:'12px 26px' }} whileHover={{scale:1.04}}>Deploy This Card</motion.button>
                <button className="btn-outline" onClick={() => go('portfolio')}>See Projects</button>
              </div>
            </motion.div>

            {/* CR character showcase - large animated sprite */}
            <motion.div initial={{ opacity:0, x:44 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7 }}
              style={{ background:`rgba(0,0,0, 0.25)`, backdropFilter:'blur(12px)', border:`1px solid ${s.col}22`, borderRadius:22, padding:32, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:20, minHeight:280, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 40%, ${s.col}10 0%, transparent 65%)`, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${s.col}88,transparent)` }} />
              {char && (
                <motion.div style={{ position:'relative', zIndex:1, filter:`drop-shadow(0 10px 28px ${s.col}99)` }}
                  animate={{ y:[0,-12,0] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}>
                  <CRSprite id={s.id} size={130} />
                </motion.div>
              )}
              <div style={{ display:'flex', flexWrap:'wrap', gap:7, justifyContent:'center', position:'relative', zIndex:1 }}>
                {s.tech.slice(0,5).map(t => (
                  <motion.span key={t} style={{ background:`rgba(0,0,0, 0.4)`, backdropFilter:'blur(6px)', border:`1px solid ${s.col}44`, color:s.col, padding:'7px 14px', borderRadius:24, fontSize:12.5, fontWeight:600 }}
                    whileHover={{scale:1.08}}>{t}</motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:'52px 0', background:'rgba(255,255,255, 0.015)' }}>
        <div className="wrap">
          <Reveal>
            <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(20px,3vw,26px)', fontWeight:800, color:'#fff', marginBottom:8 }}>What's Included</h2>
            <p style={{ color:'rgba(255,255,255, 0.4)', fontSize:14, marginBottom:26 }}>Every engagement comes with these core capabilities.</p>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:12 }}>
            {s.feats.map((f, i) => (
              <Reveal key={i} delay={i * .04}>
                <motion.div style={{ display:'flex', gap:11, alignItems:'flex-start', background:'rgba(255,255,255, 0.025)', backdropFilter:'blur(6px)', border:'1px solid rgba(255,255,255, 0.06)', borderRadius:12, padding:'13px 15px' }}
                  whileHover={{borderColor:s.col+'55', x:5}}>
                  <span style={{ color:s.col, fontSize:16, marginTop:1, flexShrink:0 }}>✓</span>
                  <span style={{ color:'rgba(255,255,255, 0.77)', fontSize:14, lineHeight:1.58 }}>{f}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding:'48px 0', background:'rgba(0,201,255, 0.025)' }}>
        <div className="wrap">
          <Reveal>
            <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(20px,3vw,24px)', fontWeight:800, color:'#fff', marginBottom:7 }}>Battle Plan</h2>
            <p style={{ color:'rgba(255,255,255, 0.38)', fontSize:14, marginBottom:6 }}>Transparent from discovery to delivery.</p>
          </Reveal>
          <AnimProcess steps={s.proc} col={s.col} />
        </div>
      </section>

      {/* Related */}
      <section style={{ padding:'48px 0' }}>
        <div className="wrap">
          <Reveal><h2 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(20px,3vw,24px)', fontWeight:800, color:'#fff', marginBottom:24 }}>Related Cards</h2></Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:15 }}>
            {related.map((rs, i) => { const rc = CR_CHARACTERS[rs.id]; return rc ? <CRCharCardV2 key={rs.id} char={rc} service={rs} delay={i*.07} onClick={() => go('service_'+rs.id)} /> : null; })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'68px 32px', textAlign:'center', background:`linear-gradient(135deg,rgba(0,0,0, 0.4),${s.col}12)`, borderTop:`1px solid ${s.col}22` }}>
        <Reveal>
          {char && (
            <motion.div style={{ display:'flex', justifyContent:'center', marginBottom:14, filter:`drop-shadow(0 0 22px ${s.col}77)` }} animate={{ y:[0,-8,0] }} transition={{ duration:3, repeat:Infinity }}>
              <CRSprite id={s.id} size={90} />
            </motion.div>
          )}
          <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(20px,3.5vw,38px)', fontWeight:800, color:'#fff', marginBottom:14, letterSpacing:'-.5px' }}>Ready to deploy {s.title}?</h2>
          <p style={{ color:'rgba(255,255,255, 0.48)', fontSize:16, marginBottom:30 }}>Let's build something extraordinary together.</p>
          <motion.button className="btn-gold" onClick={() => go('contact')} style={{ fontSize:15, padding:'14px 34px' }} whileHover={{scale:1.05}}>Get Free Consultation</motion.button>
        </Reveal>
      </section>
    </div>
  );
}
