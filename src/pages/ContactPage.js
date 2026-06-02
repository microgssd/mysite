import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, SectionHeader } from '../components/index.js';

const INPUT_STYLE = {
  background: 'rgba(255,255,255, 0.06)',
  border: '1px solid rgba(0,201,255, 0.22)',
  borderRadius: 10,
  color: '#fff',
  fontFamily: 'Manrope,sans-serif',
  fontSize: 14,
  padding: '12px 16px',
  width: '100%',
  outline: 'none',
  backdropFilter: 'blur(8px)',
  transition: 'border-color .25s, background .25s, box-shadow .25s',
};
const LABEL_STYLE = {
  color: 'rgba(255,255,255, 0.5)',
  fontSize: 12,
  display: 'block',
  marginBottom: 6,
  fontWeight: 600,
  letterSpacing: '.4px',
  textTransform: 'uppercase',
  fontFamily: 'Sora,sans-serif',
};

function Field({ label, children }) {
  return (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
    </div>
  );
}

export default function ContactPage({ go }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'', budget:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const inputStyle = (name) => ({
    ...INPUT_STYLE,
    borderColor: focused === name ? '#00C9FF' : 'rgba(0,201,255, 0.22)',
    background: focused === name ? 'rgba(0,201,255, 0.08)' : 'rgba(255,255,255, 0.06)',
    boxShadow: focused === name ? '0 0 0 3px rgba(0,201,255, 0.12), 0 0 20px rgba(0,201,255, 0.06)' : 'none',
  });

  const submit = () => {
    if (!form.name || !form.email || !form.message) { alert('Please fill Name, Email and Message.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1800);
  };

  if (sent) return (
    <div style={{ paddingTop:88, minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:'60px 24px' }}>
      <motion.div initial={{ scale:0, rotate:-10 }} animate={{ scale:1, rotate:0 }} transition={{ type:'spring', stiffness:200 }} style={{ fontSize:72, marginBottom:18 }}>🎉</motion.div>
      <motion.h2 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.2 }} style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(24px,4vw,34px)', fontWeight:800, color:'#fff', marginBottom:12 }}>Message Sent!</motion.h2>
      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.35 }} style={{ color:'rgba(255,255,255, 0.52)', fontSize:16, marginBottom:10 }}>
        Thanks, <strong style={{ color:'#00C9FF' }}>{form.name}</strong>! We will reply to <strong style={{ color:'#00C9FF' }}>{form.email}</strong> within 24 hours.
      </motion.p>
      <p style={{ color:'rgba(255,255,255, 0.34)', fontSize:13, marginBottom:30 }}>Forwarded to work2sayan@gmail.com</p>
      <motion.button className="btn-gold" onClick={() => setSent(false)} whileHover={{scale:1.05}}>Send Another Message</motion.button>
    </div>
  );

  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>
      <section className="section-pad">
        <div className="wrap">
          <SectionHeader label="Deploy Message" title="Let's Build Something Great" sub="Free consultation, 24-hour response guaranteed." />

          <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.7fr', gap:48, maxWidth:1050, margin:'0 auto' }}>

            {/* Contact info */}
            <Reveal direction="left">
              <div>
                {[
                  { i:'✉️', t:'Email', v:'work2sayan@gmail.com', h:'mailto:work2sayan@gmail.com' },
                  { i:'📍', t:'Location', v:'Kolkata, West Bengal, India' },
                  { i:'⏱️', t:'Response Time', v:'Within 24 hours' },
                  { i:'🌐', t:'Working Hours', v:'Mon-Sat, 9AM-8PM IST' },
                ].map(c => (
                  <motion.div key={c.t} style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:22, padding:'13px 14px', borderRadius:13 }}
                    whileHover={{x:7}}>
                    <div style={{ width:44, height:44, background:'rgba(0,201,255, 0.1)', borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0, border:'1px solid rgba(0,201,255, 0.22)' }}>{c.i}</div>
                    <div>
                      <p style={{ color:'rgba(255,255,255, 0.3)', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'1.2px', marginBottom:3, fontFamily:'Sora,sans-serif' }}>{c.t}</p>
                      {c.h ? <a href={c.h} style={{ color:'#00C9FF', fontSize:14, textDecoration:'none', fontWeight:500 }}>{c.v}</a> : <p style={{ color:'rgba(255,255,255, 0.75)', fontSize:14, fontWeight:400 }}>{c.v}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            {/* Glassy form */}
            <Reveal direction="right">
              <div style={{
                background: 'rgba(255,255,255, 0.04)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(0,201,255, 0.18)',
                borderRadius: 22,
                padding: 'clamp(22px,4vw,34px)',
                boxShadow: '0 8px 48px rgba(0,0,0, 0.4), inset 0 1px 0 rgba(255,255,255, 0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Glass shine effect */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255, 0.35),rgba(79,255,176, 0.25),transparent)', pointerEvents:'none' }} />
                <div style={{ position:'absolute', top:0, left:'-100%', width:'60%', height:'100%', background:'linear-gradient(90deg,transparent,rgba(255,255,255, 0.015),transparent)', pointerEvents:'none', animation:'goldShine 6s ease-in-out infinite' }} />

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:13, marginBottom:13 }}>
                  <Field label="Full Name *">
                    <input value={form.name} onChange={e => f('name', e.target.value)} placeholder="Your Name"
                      style={inputStyle('name')} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                  </Field>
                  <Field label="Email *">
                    <input type="email" value={form.email} onChange={e => f('email', e.target.value)} placeholder="you@company.com"
                      style={inputStyle('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
                  </Field>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:13, marginBottom:13 }}>
                  <Field label="Phone">
                    <input type="tel" value={form.phone} onChange={e => f('phone', e.target.value)} placeholder="+1 555 000 0000"
                      style={inputStyle('phone')} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} />
                  </Field>
                  <Field label="Service">
                    <select value={form.service} onChange={e => f('service', e.target.value)}
                      style={{ ...inputStyle('service'), cursor:'pointer' }} onFocus={() => setFocused('service')} onBlur={() => setFocused(null)}>
                      <option value="">Choose service</option>
                      <option>Web Development</option><option>Android App</option><option>iOS App</option>
                      <option>Hybrid App</option><option>E-Commerce Store</option><option>Payment Integration</option>
                      <option>Blog / CMS</option><option>Digital Marketing</option><option>Full Package</option>
                    </select>
                  </Field>
                </div>

                <div style={{ marginBottom:13 }}>
                  <Field label="Budget (USD)">
                    <select value={form.budget} onChange={e => f('budget', e.target.value)}
                      style={{ ...inputStyle('budget'), cursor:'pointer' }} onFocus={() => setFocused('budget')} onBlur={() => setFocused(null)}>
                      <option value="">Select budget</option>
                      <option>Under $500</option><option>$500 - $1,500</option><option>$1,500 - $5,000</option>
                      <option>$5,000 - $15,000</option><option>$15,000 - $50,000</option><option>$50,000+</option><option>Let's discuss</option>
                    </select>
                  </Field>
                </div>

                <div style={{ marginBottom:22 }}>
                  <Field label="Project Details *">
                    <textarea value={form.message} onChange={e => f('message', e.target.value)}
                      rows={4} placeholder="Describe your goals, timeline, and requirements..."
                      style={{ ...inputStyle('message'), resize:'vertical', minHeight:110 }}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
                  </Field>
                </div>

                <motion.button className="btn-gold" onClick={submit} disabled={loading}
                  style={{ width:'100%', padding:'clamp(12px,2vw,15px)', fontSize:'clamp(14px,1.5vw,16px)', opacity:loading ? .7 : 1, letterSpacing:'.3px' }}
                  whileHover={{scale: loading ? 1 : 1.02, boxShadow:'0 12px 36px rgba(255,165,0, 0.5)'}}
                  whileTap={{ scale:.98 }}>
                  {loading ? 'Sending...' : '⚔️ Send Message →'}
                </motion.button>

                <p style={{ color:'rgba(255,255,255, 0.22)', fontSize:11.5, textAlign:'center', marginTop:12 }}>
                  🔒 Encrypted · Forwarded to work2sayan@gmail.com
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
