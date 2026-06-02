import React from 'react';
import { motion } from 'framer-motion';
import { TEAM } from '../data/index.js';
import { Reveal, SectionHeader, AnimProcess, AquronLogoCanvas } from '../components/index.js';

export default function AboutPage({ go }) {
  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>

      {/* Hero section */}
      <section className="section-pad">
        <div className="wrap">
          <div className="about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <motion.div initial={{ opacity:0, x:-44 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7 }}>
              <p className="section-label">Who We Are</p>
              <h1 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(28px,4.5vw,52px)', fontWeight:800, color:'#fff', lineHeight:1.1, marginBottom:20, letterSpacing:'-1px' }}>
                We are Aquron --<br />Built for the Bold
              </h1>
              <p style={{ color:'rgba(255,255,255, 0.56)', fontSize:16, lineHeight:1.9, marginBottom:15 }}>
                Founded in Kolkata, India, Aquron started as a two-person studio and grew into a full-service digital agency with a global client roster. We have shipped products used by hundreds of thousands across 30+ countries.
              </p>
              <p style={{ color:'rgba(255,255,255, 0.56)', fontSize:16, lineHeight:1.9, marginBottom:32 }}>
                Like water (aqua), we adapt to every challenge -- finding the most elegant, precise path. Like Clash Royale's best players, we deploy the right strategy at the right moment.
              </p>
              <div style={{ display:'flex', gap:13, flexWrap:'wrap' }}>
                <motion.button className="btn-gold" onClick={() => go('contact')} whileHover={{scale:1.04}}>
                  Work With Us
                </motion.button>
                <button className="btn-ghost" onClick={() => go('portfolio')}>View Our Work</button>
              </div>
            </motion.div>

            {/* Animated Aquron logo (replacing the plain "A") */}
            <motion.div initial={{ opacity:0, x:44 }} animate={{ opacity:1, x:0 }} transition={{ duration:.7 }}
              style={{ background:'rgba(0,201,255, 0.05)', border:'1px solid rgba(0,201,255, 0.16)', borderRadius:22, padding:'44px 36px', textAlign:'center' }}>

              {/* Large animated canvas logo */}
              <motion.div style={{ display:'flex', justifyContent:'center', marginBottom:18 }}
                animate={{ filter:['drop-shadow(0 0 14px rgba(0,201,255, 0.6))','drop-shadow(0 0 32px rgba(79,255,176, 0.9))','drop-shadow(0 0 14px rgba(0,201,255, 0.6))'] }}
                transition={{ duration:3, repeat:Infinity }}>
                <AquronLogoCanvas size={110} />
              </motion.div>

              <p style={{ fontFamily:'Sora,sans-serif', fontSize:24, fontWeight:800, marginBottom:5, background:'linear-gradient(135deg,#00C9FF,#4FFFB0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:'-.5px' }}>
                Aquron
              </p>
              <p style={{ color:'rgba(0,201,255, 0.5)', fontSize:9, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:24 }}>
                Fluid Digital Solutions
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:11 }}>
                {[['150+','Projects'],['5+','Years'],['15+','Team'],['30+','Countries']].map(s => (
                  <motion.div key={s[0]} style={{ background:'rgba(255,255,255, 0.04)', borderRadius:13, padding:14 }}
                    whileHover={{scale:1.05}}>
                    <p style={{ fontFamily:'Sora,sans-serif', color:'#00C9FF', fontWeight:800, fontSize:26, marginBottom:2, letterSpacing:'-1px' }}>{s[0]}</p>
                    <p style={{ color:'rgba(255,255,255, 0.4)', fontSize:12 }}>{s[1]}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAM -- 2 large cards side by side */}
      <section style={{ padding:'70px 0', background:'rgba(255,255,255, 0.015)' }}>
        <div className="wrap">
          <SectionHeader label="The Clan Leaders" title="Meet the Team" labelColor="#FFD700" />
          <div className="team-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28, maxWidth:900, margin:'0 auto' }}>
            {TEAM.map((tm, i) => (
              <Reveal key={i} delay={i * .12} direction={i === 0 ? 'left' : 'right'}>
                <motion.div
                  style={{ background:`linear-gradient(155deg, rgba(0,0,0, 0.4), rgba(${tm.col==='#FFD700'?'255,215,0':'0,201,255'}, 0.06))`, border:`2px solid ${tm.col}33`, borderRadius:22, padding:'36px 28px', textAlign:'center', position:'relative', overflow:'hidden', height:'100%' }}
                  whileHover={{ y:-8, borderColor:tm.col+'88', boxShadow:`0 24px 52px ${tm.col}18` }}>
                  {/* Subtle card shimmer */}
                  <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 30% 20%, ${tm.col}06 0%, transparent 60%)`, pointerEvents:'none' }} />

                  <div style={{ position:'relative', zIndex:1 }}>
                    {/* CR Character badge */}
                    <motion.div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,0,0, 0.4)', border:`1px solid ${tm.col}44`, borderRadius:20, padding:'5px 14px', marginBottom:20 }}>
                      <motion.span style={{ fontSize:18 }} animate={{ y:[0,-3,0] }} transition={{ duration:2, repeat:Infinity }}>{tm.crEmoji}</motion.span>
                      <span style={{ color:tm.col, fontSize:11, fontWeight:800, fontFamily:'Sora,sans-serif', letterSpacing:'.5px' }}>{tm.crChar}</span>
                    </motion.div>

                    <motion.div style={{ fontSize:72, marginBottom:16, display:'block', filter:`drop-shadow(0 6px 16px ${tm.col}55)` }}>
                      <motion.span style={{ display:'block' }} animate={{ y:[0,-8,0] }} transition={{ duration:2.5+i*.5, repeat:Infinity, ease:'easeInOut' }}>{tm.em}</motion.span>
                    </motion.div>

                    <h3 style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontSize:22, fontWeight:800, marginBottom:6, letterSpacing:'-.4px' }}>{tm.name}</h3>
                    <p style={{ color:tm.col, fontSize:14, marginBottom:16, fontWeight:700 }}>{tm.role}</p>
                    <p style={{ color:'rgba(255,255,255, 0.55)', fontSize:14.5, lineHeight:1.78, marginBottom:18 }}>{tm.bio}</p>

                    <div style={{ display:'flex', flexWrap:'wrap', gap:5, justifyContent:'center' }}>
                      {tm.skills.split(' · ').map(sk => (
                        <span key={sk} style={{ background:'rgba(0,0,0, 0.35)', border:`1px solid ${tm.col}33`, color:'rgba(255,255,255, 0.6)', fontSize:11.5, padding:'3px 10px', borderRadius:20 }}>{sk}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad">
        <div className="wrap">
          <SectionHeader label="Our Strengths" title="Why Clients Choose Aquron" />
          <div className="values-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:20 }}>
            {[
              { i:'💧', t:'Fluid Precision', d:'Like water, we adapt perfectly to every project while maintaining unwavering precision.', c:'#00C9FF' },
              { i:'⚔️', t:'Battle-Tested', d:'150+ successful projects across 30+ countries. We win in every arena.', c:'#FFD700' },
              { i:'🤝', t:'True Partnership', d:"We treat every project as if our own brand is on the line. Your success is our success.", c:'#4FFFB0' },
              { i:'📊', t:'Data-First', d:'Every design, feature, and marketing decision is backed by real data and testing.', c:'#FC5C7D' },
            ].map((v, i) => (
              <Reveal key={i} delay={i * .08}>
                <motion.div style={{ background:'rgba(255,255,255, 0.025)', border:'1px solid rgba(255,255,255, 0.07)', borderRadius:18, padding:28, textAlign:'center' }}
                  whileHover={{ y:-7, borderColor:v.c+'44', boxShadow:`0 18px 40px ${v.c}18` }}>
                  <motion.div style={{ fontSize:42, marginBottom:14 }} animate={{ y:[0,-6,0] }} transition={{ duration:4+i, repeat:Infinity }}>{v.i}</motion.div>
                  <p style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontWeight:700, fontSize:17, marginBottom:8 }}>{v.t}</p>
                  <p style={{ color:'rgba(255,255,255, 0.44)', fontSize:13.5, lineHeight:1.75 }}>{v.d}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
