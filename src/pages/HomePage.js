import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, PORTFOLIO, REVIEWS_1, REVIEWS_2, CR_CHARACTERS, CR_ARENA_CHARS } from '../data/index.js';
import { AquronLogoCanvas, Reveal, Marquee, CRCharCardV2, SectionHeader, PortfolioCard } from '../components/index.js';
import CRSprite from '../components/CRSprites.js';

// Premium word-morph animation
const WORDS = ['Fluid Websites','Mobile Apps','E-Commerce','Digital Growth','Hybrid Apps','SEO Strategy'];

function PremiumTyper() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ display:'inline-block', position:'relative', minWidth:280 }}>
      <AnimatePresence mode="wait">
        <motion.span key={index}
          initial={{ opacity:0, y:40, filter:'blur(12px)' }}
          animate={{ opacity:1, y:0, filter:'blur(0px)' }}
          exit={{ opacity:0, y:-30, filter:'blur(8px)' }}
          transition={{ duration:0.55, ease:[0.16,1,0.3,1] }}
          style={{ display:'inline-block', background:'linear-gradient(135deg,#00C9FF,#4FFFB0,#0052FF)', backgroundSize:'200% 200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'gshift 4s ease infinite', fontFamily:'Sora,sans-serif', fontWeight:800 }}>
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// CR Arena scene - sprites only, no names
function CRArenaScene() {
  return (
    <div style={{ position:'relative', width:'100%', marginTop:40, padding:'22px 0 16px' }}>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'linear-gradient(90deg,transparent,rgba(0,201,255, 0.5),rgba(255,215,0, 0.5),rgba(0,201,255, 0.5),transparent)', borderRadius:3 }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:2, height:'110%', background:'linear-gradient(to bottom,transparent,rgba(255,215,0, 0.4),rgba(255,215,0, 0.6),rgba(255,215,0, 0.4),transparent)' }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:36, height:36, borderRadius:'50%', border:'2px solid rgba(255,215,0, 0.5)', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(5,7,31, 0.9)', zIndex:2, fontSize:14 }}>⚔️</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr) 44px repeat(4,1fr)', gap:4, alignItems:'flex-end' }}>
        {CR_ARENA_CHARS.slice(0,4).map((c,i) => (
          <motion.div key={i} style={{ textAlign:'center', zIndex:1 }} initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*.1, type:'spring' }}>
            <motion.div animate={{ y:[0,-7,0] }} transition={{ duration:2+i*.3, repeat:Infinity, ease:'easeInOut' }} style={{ filter:`drop-shadow(0 4px 14px ${c.col}88)` }}>
              <CRSprite id={c.id} size={50} />
            </motion.div>
          </motion.div>
        ))}
        <div />
        {CR_ARENA_CHARS.slice(4).map((c,i) => (
          <motion.div key={i} style={{ textAlign:'center', zIndex:1 }} initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*.1+.4, type:'spring' }}>
            <motion.div animate={{ y:[0,-7,0] }} transition={{ duration:2+i*.3+.5, repeat:Infinity, ease:'easeInOut' }} style={{ filter:`drop-shadow(0 4px 14px ${c.col}88)` }}>
              <CRSprite id={c.id} size={50} />
            </motion.div>
          </motion.div>
        ))}
      </div>
      {/* Elixir bar */}
      <motion.div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:4, marginTop:16, flexWrap:'wrap' }} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}>
        <span style={{ fontSize:10, color:'rgba(155,89,182, 0.9)', fontWeight:700, fontFamily:'Sora,sans-serif', marginRight:4 }}>ELIXIR</span>
        {[...Array(10)].map((_,i) => (
          <motion.div key={i} style={{ width:14, height:18, borderRadius:'0 0 50% 50%/0 0 40% 40%' }} initial={{ scaleY:0 }} animate={{ scaleY:1 }} transition={{ delay:1+i*.08, type:'spring' }}>
            <div style={{ width:'100%', height:'100%', borderRadius:'0 0 50% 50%/0 0 40% 40%', background:i<7?'linear-gradient(to bottom,#da77f2,#9b59b6)':'rgba(155,89,182, 0.2)', border:i>=7?'1px solid rgba(155,89,182, 0.3)':'none', boxShadow:i<7?'0 0 6px rgba(155,89,182, 0.8)':'none' }} />
          </motion.div>
        ))}
        <span style={{ fontSize:10, color:'rgba(155,89,182, 0.9)', fontWeight:700, fontFamily:'Sora,sans-serif', marginLeft:4 }}>8 CARDS READY</span>
      </motion.div>
    </div>
  );
}

export default function HomePage({ go }) {
  const [selectedModal, setSelectedModal] = useState(null);

  return (
    <div style={{ paddingTop:72, overflowX:'hidden' }}>

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'clamp(80px,10vw,120px) clamp(16px,5vw,32px) 60px', position:'relative', overflow:'hidden' }}>
        <div style={{  position:'absolute', width:'min(600px,80vw)', height:'min(600px,80vw)', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,201,255, 0.12) 0%,transparent 70%)', top:'-5%', left:'3%', pointerEvents:'none' , animation:'aurora1 14s ease-in-out infinite' }}/>
        {[260,440,620].map((s,i) => (
          <motion.div key={i} style={{ position:'absolute', width:s, height:s, borderRadius:'50%', border:`1px solid rgba(0,201,255,${.06-i*.015})`, top:'50%', left:'50%', marginLeft:-s/2, marginTop:-s/2, pointerEvents:'none' }} animate={{ rotate:360 }} transition={{ duration:22+i*8, repeat:Infinity, ease:'linear' }} />
        ))}

        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:.8, ease:[.16,1,.3,1] }} style={{ position:'relative', zIndex:1, maxWidth:860, width:'100%' }}>

          {/* Large animated Aquron logo */}
          <motion.div style={{ display:'flex', justifyContent:'center', marginBottom:22 }}
            animate={{ filter:['drop-shadow(0 0 14px rgba(0,201,255, 0.5))','drop-shadow(0 0 34px rgba(79,255,176, 0.9))','drop-shadow(0 0 14px rgba(0,201,255, 0.5))'] }} transition={{ duration:3.2, repeat:Infinity }}>
            <AquronLogoCanvas size={96} />
          </motion.div>

          <motion.div style={{ display:'inline-flex', alignItems:'center', gap:9, background:'rgba(0,201,255, 0.08)', border:'1px solid rgba(0,201,255, 0.28)', borderRadius:24, padding:'6px 18px', marginBottom:24, fontSize:'clamp(10px,1.5vw,13px)', color:'#00C9FF', fontWeight:700 }} initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:.2, type:'spring' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#4FFFB0', display:'inline-block', animation:'pulse 2s infinite', boxShadow:'0 0 8px #4FFFB0' }} />
            Trusted by 150+ clients · 30+ countries · Kolkata, India
          </motion.div>

          <h1 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(28px,5.5vw,68px)', fontWeight:800, lineHeight:1.06, marginBottom:12, color:'#fff', letterSpacing:'clamp(-0.5px,-0.03em,-1px)' }}>
            We Craft Exceptional<br />
            <PremiumTyper />
          </h1>

          <p style={{ fontSize:'clamp(14px,1.6vw,18px)', color:'rgba(255,255,255, 0.54)', maxWidth:580, margin:'16px auto 34px', lineHeight:1.88 }}>
            Aquron is a full-service digital agency crafting fluid, high-performance websites, mobile apps, e-commerce, and marketing for bold brands worldwide.
          </p>

          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <motion.button className="btn-gold" style={{ fontSize:'clamp(13px,1.4vw,16px)', padding:'clamp(11px,1.5vw,14px) clamp(20px,2.5vw,34px)' }} onClick={() => go('contact')} whileHover={{scale:1.04}} whileTap={{ scale:.97 }}>
              ⚔️ Deploy Your Project
            </motion.button>
            <motion.button className="btn-ghost" style={{ fontSize:'clamp(13px,1.4vw,16px)', padding:'clamp(11px,1.5vw,14px) clamp(20px,2.5vw,34px)' }} onClick={() => go('portfolio')} whileHover={{scale:1.03}}>
              View Our Work
            </motion.button>
          </div>

          <Reveal delay={.3}><CRArenaScene /></Reveal>
        </motion.div>
      </section>

      {/* STATS */}
      <div style={{ padding:'clamp(26px,5vw,40px) clamp(16px,5vw,32px)', background:'rgba(0,201,255, 0.025)', borderTop:'1px solid rgba(0,201,255, 0.1)', borderBottom:'1px solid rgba(0,201,255, 0.1)' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
          {[{n:'150+',l:'Projects'},{n:'98%',l:'Satisfaction'},{n:'5+',l:'Years'},{n:'30+',l:'Countries'}].map((s,i) => (
            <Reveal key={i} delay={i*.08}>
              <div style={{ textAlign:'center' }}>
                <motion.div style={{ fontSize:'clamp(24px,4vw,42px)', fontWeight:800, fontFamily:'Sora,sans-serif', marginBottom:4, letterSpacing:'-1px' }} animate={{ scale:[1,1.04,1] }} transition={{ duration:3, repeat:Infinity, delay:i*.5 }}>
                  <span style={{ background:'linear-gradient(135deg,#00C9FF,#4FFFB0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.n}</span>
                </motion.div>
                <div style={{ color:'rgba(255,255,255, 0.42)', fontSize:13, fontWeight:500 }}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CR SERVICE CARDS */}
      <section className="section-pad">
        <div className="wrap">
          <SectionHeader label="CLASH OF SERVICES" title="Deploy Your Digital Cards" sub="Like Clash Royale's legendary cards, each Aquron service is a specialist built to dominate its arena." labelColor="#FFD700" />
          <Reveal>
            <div style={{ textAlign:'center', marginBottom:30 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(123,45,139, 0.15)', border:'1px solid rgba(155,89,182, 0.3)', borderRadius:20, padding:'6px 18px' }}>
                <span style={{ fontSize:12 }}>💜</span>
                <span style={{ color:'#da77f2', fontSize:11, fontWeight:700, fontFamily:'Sora,sans-serif' }}>CHOOSE YOUR CARDS -- DEPLOY THE RIGHT STRATEGY</span>
              </div>
            </div>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(175px,1fr))', gap:15 }}>
            {SERVICES.map((s,i) => { const char=CR_CHARACTERS[s.id]; return char?<CRCharCardV2 key={s.id} char={char} service={s} delay={i*.06} onClick={() => go('service_'+s.id)} />:null; })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section-pad" style={{ background:'rgba(0,201,255, 0.018)' }}>
        <div className="wrap">
          <SectionHeader label="Battle Log" title="Projects We're Proud Of" sub="A curated selection of victories across industries and platforms." labelColor="#4FFFB0" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:22 }}>
            {PORTFOLIO.slice(0,3).map((p,i) => <PortfolioCard key={i} p={p} delay={i*.08} onClick={() => setSelectedModal(p)} />)}
          </div>
          <div style={{ textAlign:'center', marginTop:34 }}>
            <button className="btn-outline" onClick={() => go('portfolio')}>See Full Battle Log →</button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding:'clamp(50px,8vw,72px) 0', overflow:'hidden' }}>
        <div style={{ textAlign:'center', marginBottom:34, padding:'0 24px' }}>
          <Reveal><p className="section-label" style={{ color:'#FF9F43' }}>Clan Reviews</p><h2 className="section-title">What Our Clan Says</h2></Reveal>
        </div>
        <Marquee items={REVIEWS_1} dir="left" />
        <div style={{ marginTop:13 }}><Marquee items={REVIEWS_2} dir="right" /></div>
      </section>

      {/* CTA */}
      <section style={{ padding:'clamp(60px,10vw,90px) 24px', background:'linear-gradient(135deg,rgba(0,201,255, 0.1),rgba(255,215,0, 0.06))', borderTop:'1px solid rgba(0,201,255, 0.12)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,201,255,0.08) 0%,transparent 70%)', pointerEvents:'none', animation:'aurora1 8s ease-in-out infinite' }}/>
        <Reveal>
          <motion.span style={{ fontSize:'clamp(36px,6vw,52px)', display:'block', marginBottom:16, filter:'drop-shadow(0 0 20px rgba(255,215,0, 0.6))' }} animate={{ y:[0,-4,0] }} transition={{ duration:3, repeat:Infinity }}>👑</motion.span>
          <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(20px,4vw,46px)', fontWeight:800, color:'#fff', marginBottom:16, letterSpacing:'-1px' }}>Ready to Attack the Market?</h2>
          <p style={{ color:'rgba(255,255,255, 0.5)', fontSize:'clamp(14px,1.5vw,17px)', marginBottom:36 }}>Free consultation · No pressure · Results guaranteed by Aquron</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <motion.button className="btn-gold" style={{ fontSize:'clamp(13px,1.5vw,16px)', padding:'clamp(12px,1.5vw,15px) clamp(22px,3vw,38px)' }} onClick={() => go('contact')} whileHover={{scale:1.05}}>⚔️ Start Your Campaign</motion.button>
            <button className="btn-ghost" style={{ fontSize:'clamp(13px,1.5vw,16px)', padding:'clamp(12px,1.5vw,15px) clamp(22px,3vw,38px)' }} onClick={() => go('pricing')}>View Pricing</button>
          </div>
        </Reveal>
      </section>

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedModal && (
          <motion.div style={{ position:'fixed', inset:0, background:'rgba(5,7,31, 0.92)', zIndex:8000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(14px)' }} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setSelectedModal(null)}>
            <motion.div style={{ background:'#0a0d28', border:'1px solid rgba(0,201,255, 0.2)', borderRadius:22, maxWidth:680, width:'100%', maxHeight:'85vh', overflowY:'auto', position:'relative' }} initial={{ scale:.85 }} animate={{ scale:1 }} exit={{ scale:.85 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedModal(null)} style={{ position:'absolute', top:16, right:16, width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255, 0.08)', border:'1px solid rgba(255,255,255, 0.14)', color:'rgba(255,255,255, 0.7)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, zIndex:10 }}>✕</button>
              <div style={{ padding:'28px 28px 34px' }}>
                <div style={{ display:'flex', gap:16, alignItems:'center', marginBottom:20 }}>
                  <div style={{ width:60, height:60, background:`linear-gradient(135deg,${selectedModal.col}33,${selectedModal.col}11)`, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>{selectedModal.em}</div>
                  <div><h2 style={{ fontFamily:'Sora,sans-serif', fontSize:22, fontWeight:800, color:'#fff', marginBottom:4 }}>{selectedModal.title}</h2><span style={{ background:selectedModal.col, color:'#030412', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>{selectedModal.cat}</span></div>
                </div>
                <p style={{ color:'rgba(255,255,255, 0.6)', fontSize:15, lineHeight:1.8, marginBottom:20 }}>{selectedModal.desc}</p>
                <p style={{ color:'rgba(255,255,255, 0.38)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'1.2px', marginBottom:10 }}>Tech Stack</p>
                <p style={{ color:'rgba(255,255,255, 0.72)', fontSize:14, marginBottom:20 }}>{selectedModal.tech}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:28 }}>
                  {selectedModal.res.map(r => <div key={r} style={{ background:'rgba(79,255,176, 0.08)', border:'1px solid rgba(79,255,176, 0.25)', color:'#4FFFB0', fontSize:13, fontWeight:600, padding:'7px 16px', borderRadius:22 }}>✓ {r}</div>)}
                </div>
                {selectedModal.link && <a href={selectedModal.link} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, background:`linear-gradient(135deg,${selectedModal.col},#4FFFB0)`, color:'#030412', fontSize:14, fontWeight:700, padding:'12px 24px', borderRadius:11, textDecoration:'none' }}>↗ Visit Live Site</a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
