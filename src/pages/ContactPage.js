import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, SectionHeader } from '../components/index.js';

const FIELD_STYLE = {
  background: 'rgba(0,10,30,0.97)',
  border: '1px solid rgba(0,201,255,0.22)',
  borderRadius: 8,
  color: '#e0f0ff',
  fontFamily: 'Rajdhani,sans-serif',
  fontSize: 15,
  padding: '11px 14px',
  width: '100%',
  outline: 'none',
  transition: 'border-color .25s, box-shadow .25s',
  WebkitAppearance: 'none',
  appearance: 'none',
};

const LABEL = {
  color: 'rgba(0,201,255,0.6)',
  fontSize: 10,
  display: 'block',
  marginBottom: 5,
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  fontFamily: 'Orbitron,monospace',
};

export default function ContactPage({ go }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'', budget:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const fieldStyle = (name) => ({
    ...FIELD_STYLE,
    borderColor: focused === name ? '#00C9FF' : 'rgba(0,201,255,0.22)',
    background: focused === name ? 'rgba(0,20,50,0.97)' : 'rgba(0,10,30,0.97)',
    boxShadow: focused === name ? '0 0 0 3px rgba(0,201,255,0.1), 0 0 16px rgba(0,201,255,0.05)' : 'none',
    color: '#e0f0ff',
  });

  const submit = () => {
    if (!form.name || !form.email || !form.message) { alert('Please fill Name, Email and Message.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1800);
  };

  if (sent) return (
    <div style={{ paddingTop:88, minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:'60px 24px' }}>
      <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', stiffness:200 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <motion.circle cx="32" cy="32" r="28" stroke="#4FFFB0" strokeWidth="2" fill="none" initial={{ pathLength:0 }} animate={{ pathLength:1 }} transition={{ duration:0.8 }}/>
          <motion.path d="M18 32 L27 41 L46 22" stroke="#4FFFB0" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength:0 }} animate={{ pathLength:1 }} transition={{ duration:0.6, delay:0.4 }}/>
        </svg>
      </motion.div>
      <motion.h2 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.3 }} style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(20px,4vw,28px)', fontWeight:800, color:'#fff', marginBottom:12, marginTop:20, letterSpacing:1 }}>TRANSMISSION SENT</motion.h2>
      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.45 }} style={{ color:'rgba(255,255,255,0.52)', fontSize:15, marginBottom:8 }}>
        We'll reply to <strong style={{ color:'#00C9FF' }}>{form.email}</strong> within 24 hours.
      </motion.p>
      <p style={{ color:'rgba(255,255,255,0.3)', fontSize:12, marginBottom:28, fontFamily:'monospace' }}>forwarded to work2sayan@gmail.com</p>
      <motion.button className="btn-gold" onClick={() => setSent(false)} whileHover={{ scale:1.05 }}>SEND ANOTHER</motion.button>
    </div>
  );

  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>
      <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none', zIndex:0 }}/>
      <section className="section-pad" style={{ position:'relative', zIndex:1 }}>
        <div className="wrap">
          <SectionHeader label="INITIATE CONTACT" title="Let's Build Something Great" sub="Free consultation · 24-hour response guaranteed." labelColor="#00C9FF" />

          <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.7fr', gap:44, maxWidth:1050, margin:'0 auto' }}>

            {/* Left info panel */}
            <Reveal direction="left">
              <div>
                {[
                  { i:'✉', t:'Email', v:'work2sayan@gmail.com', h:'mailto:work2sayan@gmail.com', col:'#00C9FF' },
                  { i:'◎', t:'Location', v:'Kolkata, West Bengal, India', col:'#4FFFB0' },
                  { i:'◷', t:'Response Time', v:'Within 24 hours', col:'#FFD700' },
                  { i:'◈', t:'Working Hours', v:'Mon-Sat, 9AM-8PM IST', col:'#FC5C7D' },
                ].map(c => (
                  <motion.div key={c.t} style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:18, padding:'12px 14px', borderRadius:8, border:'1px solid transparent' }}
                    whileHover={{ borderColor:`${c.col}33`, background:`${c.col}06`, x:6 }}>
                    <div style={{ width:40, height:40, background:`${c.col}10`, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0, border:`1px solid ${c.col}33`, color:c.col, fontFamily:'monospace', fontWeight:700 }}>{c.i}</div>
                    <div>
                      <p style={{ color:'rgba(255,255,255,0.3)', fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:3, fontFamily:'Orbitron,monospace' }}>{c.t}</p>
                      {c.h ? <a href={c.h} style={{ color:c.col, fontSize:13.5, textDecoration:'none', fontFamily:'Rajdhani,sans-serif', fontWeight:600 }}>{c.v}</a>
                        : <p style={{ color:'rgba(255,255,255,0.75)', fontSize:13.5, fontFamily:'Rajdhani,sans-serif' }}>{c.v}</p>}
                    </div>
                  </motion.div>
                ))}

                {/* Cyber decorative element */}
                <div style={{ marginTop:24, padding:'16px', background:'rgba(0,201,255,0.04)', border:'1px solid rgba(0,201,255,0.12)', borderRadius:8 }}>
                  <p style={{ fontFamily:'monospace', fontSize:11, color:'rgba(0,201,255,0.5)', lineHeight:1.8 }}>
                    <span style={{ color:'rgba(0,201,255,0.3)' }}>{'> '}</span>status: <span style={{ color:'#4FFFB0' }}>ONLINE</span><br/>
                    <span style={{ color:'rgba(0,201,255,0.3)' }}>{'> '}</span>queue: <span style={{ color:'#FFD700' }}>0 active projects</span><br/>
                    <span style={{ color:'rgba(0,201,255,0.3)' }}>{'> '}</span>response: <span style={{ color:'#00C9FF' }}>{'< 24h'}</span>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal direction="right">
              {/* Inject option styles globally */}
              <style>{`
                select option {
                  background: #000a1e !important;
                  color: #e0f0ff !important;
                  padding: 8px !important;
                }
                select option:hover, select option:focus, select option:checked {
                  background: #001a3e !important;
                  color: #00C9FF !important;
                }
              `}</style>
              <div style={{
                background: 'rgba(0,8,24,0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(0,201,255,0.18)',
                borderRadius: 14,
                padding: 'clamp(20px,4vw,32px)',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,201,255,0.08)',
              }}>
                {/* Top glow line */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.5),rgba(79,255,176,0.3),transparent)' }}/>
                {/* Scan line */}
                <motion.div style={{ position:'absolute', left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.2),transparent)' }} animate={{ top:['0%','100%'] }} transition={{ duration:4, repeat:Infinity, ease:'linear' }}/>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
                  <div><label style={LABEL}>Full Name *</label>
                    <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your Name" style={fieldStyle('name')} onFocus={()=>setFocused('name')} onBlur={()=>setFocused(null)}/></div>
                  <div><label style={LABEL}>Email *</label>
                    <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@company.com" style={fieldStyle('email')} onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)}/></div>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
                  <div><label style={LABEL}>Phone</label>
                    <input type="tel" value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+91 XXXXX XXXXX" style={fieldStyle('phone')} onFocus={()=>setFocused('phone')} onBlur={()=>setFocused(null)}/></div>
                  <div><label style={LABEL}>Service</label>
                    <select value={form.service} onChange={e=>set('service',e.target.value)} style={{ ...fieldStyle('service'), cursor:'pointer' }} onFocus={()=>setFocused('service')} onBlur={()=>setFocused(null)}>
                      <option value="" style={{ background:'#000a1e',color:'#e0f0ff' }}>Choose service</option>
                      {['Web Development','E-Commerce Store','Android App','iOS App','Hybrid App','Payment Integration','Blog / CMS','Digital Marketing','Full Package'].map(o=>(
                        <option key={o} value={o} style={{ background:'#000a1e',color:'#e0f0ff' }}>{o}</option>
                      ))}
                    </select></div>
                </div>

                <div style={{ marginBottom:12 }}>
                  <label style={LABEL}>Budget (USD)</label>
                  <select value={form.budget} onChange={e=>set('budget',e.target.value)} style={{ ...fieldStyle('budget'), cursor:'pointer' }} onFocus={()=>setFocused('budget')} onBlur={()=>setFocused(null)}>
                    <option value="" style={{ background:'#000a1e',color:'#e0f0ff' }}>Select budget range</option>
                    {['Under $500','$500 - $1,500','$1,500 - $5,000','$5,000 - $15,000','$15,000 - $50,000','$50,000+','Let\'s discuss'].map(o=>(
                      <option key={o} value={o} style={{ background:'#000a1e',color:'#e0f0ff' }}>{o}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom:20 }}>
                  <label style={LABEL}>Project Details *</label>
                  <textarea value={form.message} onChange={e=>set('message',e.target.value)} rows={4} placeholder="Describe your goals, timeline, and requirements..." style={{ ...fieldStyle('message'), resize:'vertical', minHeight:100 }} onFocus={()=>setFocused('message')} onBlur={()=>setFocused(null)}/>
                </div>

                <motion.button className="btn-gold" onClick={submit} disabled={loading}
                  style={{ width:'100%', padding:'13px', fontSize:14, fontFamily:'Orbitron,monospace', letterSpacing:1.5, opacity:loading?0.7:1 }}
                  whileHover={{ scale:loading?1:1.02 }} whileTap={{ scale:0.98 }}>
                  {loading ? 'TRANSMITTING...' : 'SEND MESSAGE →'}
                </motion.button>
                <p style={{ color:'rgba(255,255,255,0.2)', fontSize:11, textAlign:'center', marginTop:10, fontFamily:'monospace' }}>
                  encrypted · forwarded to work2sayan@gmail.com
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
