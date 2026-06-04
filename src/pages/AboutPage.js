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

          <div className="team-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28, maxWidth:1000, margin:'0 auto' }}>

            {/* ── CEO ── */}
            <Reveal delay={0} direction="left">
              <motion.div
                style={{ background:'linear-gradient(160deg,rgba(4,6,20,0.98),rgba(10,14,36,0.97))', border:'1px solid rgba(255,215,0,0.2)', borderRadius:16, overflow:'hidden', position:'relative' }}
                whileHover={{ y:-8, borderColor:'rgba(255,215,0,0.5)', boxShadow:'0 28px 64px rgba(255,215,0,0.1)' }}>
                <div style={{ height:3, background:'linear-gradient(90deg,#FFD700,rgba(255,215,0,0.3),transparent)' }}/>
                <motion.div style={{ position:'absolute', left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(255,215,0,0.2),transparent)', zIndex:0 }}
                  animate={{ top:['3px','100%'] }} transition={{ duration:5, repeat:Infinity, ease:'linear' }}/>
                {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h],i)=>(
                  <div key={i} style={{ position:'absolute',[v]:8,[h]:8,width:14,height:14,
                    borderTop:v==='top'?'1.5px solid rgba(255,215,0,0.5)':'none',
                    borderBottom:v==='bottom'?'1.5px solid rgba(255,215,0,0.5)':'none',
                    borderLeft:h==='left'?'1.5px solid rgba(255,215,0,0.5)':'none',
                    borderRight:h==='right'?'1.5px solid rgba(255,215,0,0.5)':'none',zIndex:1 }}/>
                ))}

                <div style={{ padding:'32px 28px 28px', position:'relative', zIndex:1 }}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:20, marginBottom:24 }}>
                    <div style={{ flexShrink:0, width:70, height:70, borderRadius:12, background:'linear-gradient(135deg,rgba(255,215,0,0.15),rgba(255,215,0,0.05))', border:'1px solid rgba(255,215,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                      <span style={{ fontFamily:'Orbitron,monospace', fontSize:26, fontWeight:900, color:'#FFD700', textShadow:'0 0 20px rgba(255,215,0,0.7)', letterSpacing:-1 }}>SD</span>
                      <motion.div style={{ position:'absolute', inset:-4, borderRadius:16, border:'1px solid rgba(255,215,0,0.3)' }}
                        animate={{ opacity:[0.3,0.8,0.3], scale:[0.96,1.02,0.96] }} transition={{ duration:2.5, repeat:Infinity }}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,215,0,0.07)', border:'1px solid rgba(255,215,0,0.2)', borderRadius:4, padding:'3px 10px', marginBottom:8, fontFamily:'Orbitron,monospace', fontSize:8, color:'rgba(255,215,0,0.8)', letterSpacing:1.5 }}>
                        ⚡ CEO / LEAD DEV
                      </div>
                      <h3 style={{ fontFamily:'Orbitron,monospace', color:'#fff', fontSize:'clamp(16px,2.2vw,22px)', fontWeight:900, letterSpacing:1, marginBottom:3, textShadow:'0 0 16px rgba(255,215,0,0.35)' }}>
                        SAYAN DHAR
                      </h3>
                      <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(255,215,0,0.6)', fontSize:12, fontWeight:600, letterSpacing:2, textTransform:'uppercase' }}>
                        CEO & Development Head
                      </p>
                    </div>
                  </div>

                  <div style={{ height:1, background:'linear-gradient(90deg,rgba(255,215,0,0.3),transparent)', marginBottom:18 }}/>

                  <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(180,215,255,0.65)', fontSize:14.5, lineHeight:1.8, marginBottom:22 }}>
                    Full-stack architect and founder of Aquron with 5+ years building scalable digital products for 150+ clients across 6+ countries. Personally leads every major technical decision and client engagement.
                  </p>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:20 }}>
                    {[['5+','Years Exp'],['150+','Projects'],['15+','Tech Stack']].map(([n,l])=>(
                      <div key={l} style={{ background:'rgba(255,215,0,0.05)', border:'1px solid rgba(255,215,0,0.12)', borderRadius:8, padding:'10px 6px', textAlign:'center' }}>
                        <div style={{ fontFamily:'Orbitron,monospace', fontSize:16, fontWeight:900, color:'#FFD700', marginBottom:2 }}>{n}</div>
                        <div style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(255,255,255,0.35)', fontSize:10, letterSpacing:0.8, textTransform:'uppercase' }}>{l}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {['React','Next.js','Node.js','MongoDB','System Design','TypeScript'].map(sk=>(
                      <span key={sk} style={{ background:'rgba(255,215,0,0.06)', border:'1px solid rgba(255,215,0,0.18)', color:'rgba(255,215,0,0.65)', fontSize:10.5, padding:'4px 10px', borderRadius:4, fontFamily:'monospace', letterSpacing:0.3 }}>{sk}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* ── OPS ── */}
            <Reveal delay={0.12} direction="right">
              <motion.div
                style={{ background:'linear-gradient(160deg,rgba(3,6,20,0.98),rgba(6,12,32,0.97))', border:'1px solid rgba(0,201,255,0.18)', borderRadius:16, overflow:'hidden', position:'relative' }}
                whileHover={{ y:-8, borderColor:'rgba(0,201,255,0.5)', boxShadow:'0 28px 64px rgba(0,201,255,0.08)' }}>
                <div style={{ height:3, background:'linear-gradient(90deg,#00C9FF,rgba(0,201,255,0.3),transparent)' }}/>
                <motion.div style={{ position:'absolute', left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.18),transparent)', zIndex:0 }}
                  animate={{ top:['3px','100%'] }} transition={{ duration:5, repeat:Infinity, ease:'linear', delay:1.5 }}/>
                {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h],i)=>(
                  <div key={i} style={{ position:'absolute',[v]:8,[h]:8,width:14,height:14,
                    borderTop:v==='top'?'1.5px solid rgba(0,201,255,0.45)':'none',
                    borderBottom:v==='bottom'?'1.5px solid rgba(0,201,255,0.45)':'none',
                    borderLeft:h==='left'?'1.5px solid rgba(0,201,255,0.45)':'none',
                    borderRight:h==='right'?'1.5px solid rgba(0,201,255,0.45)':'none',zIndex:1 }}/>
                ))}

                <div style={{ padding:'32px 28px 28px', position:'relative', zIndex:1 }}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:20, marginBottom:24 }}>
                    <div style={{ flexShrink:0, width:70, height:70, borderRadius:12, background:'linear-gradient(135deg,rgba(0,201,255,0.12),rgba(0,201,255,0.04))', border:'1px solid rgba(0,201,255,0.28)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                      <span style={{ fontFamily:'Orbitron,monospace', fontSize:26, fontWeight:900, color:'#00C9FF', textShadow:'0 0 20px rgba(0,201,255,0.7)', letterSpacing:-1 }}>AG</span>
                      <motion.div style={{ position:'absolute', inset:-4, borderRadius:16, border:'1px solid rgba(0,201,255,0.25)' }}
                        animate={{ opacity:[0.2,0.7,0.2], scale:[0.96,1.02,0.96] }} transition={{ duration:3, repeat:Infinity }}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(0,201,255,0.06)', border:'1px solid rgba(0,201,255,0.2)', borderRadius:4, padding:'3px 10px', marginBottom:8, fontFamily:'Orbitron,monospace', fontSize:8, color:'rgba(0,201,255,0.8)', letterSpacing:1.5 }}>
                        🎯 OPS LEAD / MANAGER
                      </div>
                      <h3 style={{ fontFamily:'Orbitron,monospace', color:'#fff', fontSize:'clamp(16px,2.2vw,22px)', fontWeight:900, letterSpacing:1, marginBottom:3, textShadow:'0 0 16px rgba(0,201,255,0.3)' }}>
                        ANKAN GHOSH
                      </h3>
                      <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(0,201,255,0.6)', fontSize:12, fontWeight:600, letterSpacing:2, textTransform:'uppercase' }}>
                        Operations Manager
                      </p>
                    </div>
                  </div>

                  <div style={{ height:1, background:'linear-gradient(90deg,rgba(0,201,255,0.25),transparent)', marginBottom:18 }}/>

                  <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(180,215,255,0.65)', fontSize:14.5, lineHeight:1.8, marginBottom:22 }}>
                    The operational backbone of Aquron. Ensures every project ships on time, every client receives white-glove service, and no detail ever falls through the cracks.
                  </p>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:20 }}>
                    {[['100%','On-Time'],['150+','Clients'],['5+','Years']].map(([n,l])=>(
                      <div key={l} style={{ background:'rgba(0,201,255,0.04)', border:'1px solid rgba(0,201,255,0.1)', borderRadius:8, padding:'10px 6px', textAlign:'center' }}>
                        <div style={{ fontFamily:'Orbitron,monospace', fontSize:16, fontWeight:900, color:'#00C9FF', marginBottom:2 }}>{n}</div>
                        <div style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(255,255,255,0.35)', fontSize:10, letterSpacing:0.8, textTransform:'uppercase' }}>{l}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {['Project Mgmt','Client Relations','Agile','Process Ops','Strategy'].map(sk=>(
                      <span key={sk} style={{ background:'rgba(0,201,255,0.05)', border:'1px solid rgba(0,201,255,0.15)', color:'rgba(0,201,255,0.65)', fontSize:10.5, padding:'4px 10px', borderRadius:4, fontFamily:'monospace', letterSpacing:0.3 }}>{sk}</span>
                    ))}
                  </div>
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
