import React, { useState, useEffect } from 'react';
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
          style={{ display:'inline-block', background:'linear-gradient(135deg,#00C9FF,#4FFFB0,#0052FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', fontFamily:'Sora,sans-serif', fontWeight:800 }}>
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Cyberpunk hero visual — data grid + floating nodes
function CyberHeroVisual() {
  return (
    <div style={{ position:'relative', width:'100%', marginTop:'clamp(16px,4vw,44px)', height:'clamp(80px,15vw,120px)', overflow:'visible' }}>
      {/* Horizontal data lines */}
      {[0,1,2,3].map(i => (
        <motion.div key={i} style={{ position:'absolute', left:0, right:0, height:1, top:`${20+i*22}%`,
          background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.3),rgba(0,201,255,0.12),transparent)' }}
          animate={{ opacity:[0.3,0.8,0.3] }} transition={{ duration:2+i*0.4, repeat:Infinity, delay:i*0.3 }} />
      ))}
      {/* Floating service nodes — 2 rows on mobile via CSS grid equivalent */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:6, alignItems:'center', height:'clamp(60px,12vw,90px)' }}>
        {SERVICES.map((s,i) => (
          <motion.div key={s.id}
            style={{ width:'100%', aspectRatio:'1', maxWidth:56, margin:'0 auto',
              borderRadius:8, border:`1px solid ${s.col}66`, background:`${s.col}0d`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'Orbitron,monospace', fontSize:'clamp(6px,1.2vw,9px)', color:s.col, fontWeight:800,
              boxShadow:`0 0 10px ${s.col}22`, letterSpacing:0.5,
            }}
            animate={{ y:[0,-6,0], opacity:[0.6,1,0.6] }}
            transition={{ duration:2+i*0.22, repeat:Infinity, ease:'easeInOut', delay:i*0.12 }}
          >
            {s.id.split('-').map(w=>w[0].toUpperCase()).join('')}
          </motion.div>
        ))}
      </div>
      {/* Bottom scan bar */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2,
        background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.6),rgba(79,255,176,0.4),transparent)' }}>
        <motion.div style={{ position:'absolute', inset:0,
          background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.9),transparent)',
          width:'30%' }}
          animate={{ x:['-30%','120%'] }} transition={{ duration:3, repeat:Infinity, ease:'linear' }} />
      </div>
    </div>
  );
}


export default function HomePage({ go }) {
  const [selectedModal, setSelectedModal] = useState(null);

  return (
    <div style={{ paddingTop:72, overflowX:'hidden' }}>

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'clamp(80px,10vw,120px) clamp(16px,5vw,32px) 60px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:'min(600px,80vw)', height:'min(600px,80vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,201,255,0.12) 0%,transparent 70%)', top:'-5%', left:'3%', pointerEvents:'none', animation:'aurora1 14s ease-in-out infinite' }}/>
        <div style={{ position:'absolute', width:'min(400px,60vw)', height:'min(400px,60vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(79,255,176,0.07) 0%,transparent 70%)', bottom:'5%', right:'5%', pointerEvents:'none', animation:'aurora2 18s ease-in-out infinite' }}/>
        {/* Cyber grid overlay */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.03) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }}/>
        {[260,440,620].map((s,i) => (
          <motion.div key={i} style={{ position:'absolute', width:s, height:s, borderRadius:'50%', border:`1px solid rgba(0,201,255,${.06-i*.015})`, top:'50%', left:'50%', marginLeft:-s/2, marginTop:-s/2, pointerEvents:'none' }} animate={{ rotate:360 }} transition={{ duration:22+i*8, repeat:Infinity, ease:'linear' }} />
        ))}

        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:.8, ease:[.16,1,.3,1] }} style={{ position:'relative', zIndex:1, maxWidth:860, width:'100%' }}>
          <motion.div style={{ display:'flex', justifyContent:'center', marginBottom:22 }}
            animate={{ filter:['drop-shadow(0 0 14px rgba(0,201,255,0.5))','drop-shadow(0 0 34px rgba(79,255,176,0.9))','drop-shadow(0 0 14px rgba(0,201,255,0.5))'] }} transition={{ duration:3.2, repeat:Infinity }}>
            <AquronLogoCanvas size={96} />
          </motion.div>

          <motion.div style={{ display:'inline-flex', alignItems:'center', gap:9, background:'rgba(0,201,255,0.08)', border:'1px solid rgba(0,201,255,0.28)', borderRadius:24, padding:'6px 18px', marginBottom:24, fontSize:'clamp(10px,1.5vw,13px)', color:'#00C9FF', fontWeight:700 }} initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:.2, type:'spring' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#4FFFB0', display:'inline-block', animation:'pulse 2s infinite', boxShadow:'0 0 8px #4FFFB0' }} />
            Trusted by 150+ clients · 30+ countries · Kolkata, India
          </motion.div>

          <h1 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(28px,5.5vw,68px)', fontWeight:800, lineHeight:1.06, marginBottom:12, color:'#fff', letterSpacing:'clamp(-0.5px,-0.03em,-1px)' }}>
            We Craft Exceptional<br /><PremiumTyper />
          </h1>
          <p style={{ fontSize:'clamp(14px,1.6vw,18px)', color:'rgba(255,255,255,0.54)', maxWidth:580, margin:'16px auto 34px', lineHeight:1.88 }}>
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

      {/* STATS — cyberpunk style */}
      <div style={{ padding:'clamp(22px,4vw,38px) clamp(16px,5vw,32px)', background:'rgba(0,5,20,0.7)', borderTop:'1px solid rgba(0,201,255,0.12)', borderBottom:'1px solid rgba(0,201,255,0.12)', position:'relative', overflow:'hidden' }}>
        {/* Scan line */}
        <motion.div style={{ position:'absolute', left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.3),transparent)' }} animate={{ top:['0%','100%'] }} transition={{ duration:3, repeat:Infinity, ease:'linear' }}/>
        <div style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
          {[
            {n:'150+', l:'Projects', col:'#00C9FF', icon:'◈'},
            {n:'98%',  l:'Satisfaction', col:'#4FFFB0', icon:'◎'},
            {n:'5+',   l:'Years', col:'#FFD700', icon:'◆'},
            {n:'30+',  l:'Countries', col:'#FC5C7D', icon:'◉'},
          ].map((s,i) => (
            <Reveal key={i} delay={i*.08}>
              <div style={{ textAlign:'center', position:'relative', padding:'14px 8px' }}>
                {/* Cyber frame */}
                <div style={{ position:'absolute', inset:0, borderRadius:8, border:`1px solid ${s.col}22`, background:`${s.col}05` }}/>
                {/* Corner brackets */}
                <div style={{ position:'absolute', top:4, left:4, width:8, height:8, borderTop:`1.5px solid ${s.col}77`, borderLeft:`1.5px solid ${s.col}77` }}/>
                <div style={{ position:'absolute', top:4, right:4, width:8, height:8, borderTop:`1.5px solid ${s.col}77`, borderRight:`1.5px solid ${s.col}77` }}/>
                <div style={{ position:'absolute', bottom:4, left:4, width:8, height:8, borderBottom:`1.5px solid ${s.col}77`, borderLeft:`1.5px solid ${s.col}77` }}/>
                <div style={{ position:'absolute', bottom:4, right:4, width:8, height:8, borderBottom:`1.5px solid ${s.col}77`, borderRight:`1.5px solid ${s.col}77` }}/>
                {/* Icon */}
                <div style={{ fontFamily:'monospace', fontSize:14, color:s.col, opacity:0.6, marginBottom:4 }}>{s.icon}</div>
                {/* Number with glitch */}
                <motion.div style={{ position:'relative' }} animate={{ scale:[1,1.03,1] }} transition={{ duration:3, repeat:Infinity, delay:i*.5 }}>
                  <span style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(22px,4vw,44px)', fontWeight:900, color:s.col, letterSpacing:'-0.5px',
                    textShadow:`0 0 20px ${s.col}88, 0 0 40px ${s.col}44` }}>
                    {s.n}
                  </span>
                  {/* Glitch copy */}
                  <motion.span style={{ position:'absolute', left:2, top:0, fontFamily:'Orbitron,monospace', fontSize:'clamp(22px,4vw,44px)', fontWeight:900, color:s.col, opacity:0, letterSpacing:'-0.5px' }}
                    animate={{ opacity:[0,0.3,0], x:[0,3,0] }} transition={{ duration:4, repeat:Infinity, delay:i*1.2 }}>
                    {s.n}
                  </motion.span>
                </motion.div>
                <div style={{ color:'rgba(255,255,255,0.35)', fontSize:11, fontWeight:600, fontFamily:'Rajdhani,sans-serif', letterSpacing:1.5, textTransform:'uppercase', marginTop:4 }}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

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
