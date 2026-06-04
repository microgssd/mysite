
import React from 'react';
import { motion } from 'framer-motion';
import { PRICING } from '../data/index.js';
import { Reveal, SectionHeader } from '../components/index.js';

const CrCardBack = ({ col }) => (
  <div style={{ position:'absolute', inset:0, borderRadius:20, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
    <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 30% 20%, ${col}14 0%, transparent 60%)` }} />
    <div style={{ position:'absolute', bottom:-20, right:-20, width:120, height:120, borderRadius:'50%', background:`radial-gradient(circle, ${col}08, transparent)` }} />
  </div>
);

export default function PricingPage({ go }) {
  return (
    <div style={{ paddingTop:88 }}>
      <section className="section-pad">
        <div className="wrap">
          <SectionHeader label="SHOP" title="Choose Your Plan" sub="No hidden fees. No surprise invoices. Pay exactly what you see." labelColor="#FFD700" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:22 }}>
            {PRICING.map((plan,i) => (
              <Reveal key={i} delay={i*.08} direction="scale">
                <motion.div style={{ background:plan.pop?`linear-gradient(155deg,rgba(0,0,0, 0.4),rgba(${plan.col==='#00C9FF'?'0,201,255':'79,255,176'}, 0.06))`:'rgba(255,255,255, 0.025)', border:`${plan.pop?2:1}px solid ${plan.pop?plan.col+'88':'rgba(255,255,255, 0.07)'}`, borderRadius:22, padding:'28px 24px', position:'relative', height:'100%' }}
                  whileHover={{ y:-9, boxShadow:`0 22px 50px ${plan.col}22` }}>
                  <CrCardBack col={plan.col} />
                  {plan.pop && (
                    <div style={{ position:'absolute', top:-13, left:'50%', transform:'translateX(-50%)', background:`linear-gradient(135deg,${plan.col},#4FFFB0)`, color:'#030412', fontSize:10.5, fontWeight:800, padding:'5px 16px', borderRadius:20, whiteSpace:'nowrap', fontFamily:'Sora,sans-serif' }}>⭐ MOST POPULAR</div>
                  )}
                  <div style={{ position:'relative', zIndex:1 }}>
                    <p style={{ color:plan.col, fontWeight:800, fontSize:13, marginBottom:9, textTransform:'uppercase', letterSpacing:1, fontFamily:'Sora,sans-serif' }}>{plan.name}</p>
                    <div style={{ display:'flex', alignItems:'baseline', gap:4, marginBottom:6 }}>
                      <span style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontSize:38, fontWeight:800, letterSpacing:'-1px' }}>${plan.price.toLocaleString()}</span>
                      <span style={{ color:'rgba(255,255,255, 0.35)', fontSize:13 }}>/{plan.per}</span>
                    </div>
                    <div style={{ height:1, background:'rgba(255,255,255, 0.07)', margin:'18px 0' }} />
                    <div style={{ marginBottom:22 }}>
                      {plan.inc.map(f=><div key={f} style={{ display:'flex', gap:9, marginBottom:9, alignItems:'flex-start' }}><span style={{ color:plan.col, fontSize:13, flexShrink:0 }}>✓</span><span style={{ color:'rgba(255,255,255, 0.76)', fontSize:13 }}>{f}</span></div>)}
                      {plan.not.map(f=><div key={f} style={{ display:'flex', gap:9, marginBottom:9, opacity:.26, alignItems:'flex-start' }}><span style={{ color:'rgba(255,255,255, 0.4)', fontSize:13 }}>✕</span><span style={{ color:'rgba(255,255,255, 0.3)', fontSize:13 }}>{f}</span></div>)}
                    </div>
                    <motion.button onClick={()=>go('contact')} style={{ width:'100%', padding:'12px', borderRadius:11, fontFamily:'Manrope,sans-serif', fontSize:14, fontWeight:700, cursor:'pointer', background:plan.pop?`linear-gradient(135deg,${plan.col},#4FFFB0)`:'transparent', border:plan.pop?'none':`1.5px solid ${plan.col}66`, color:plan.pop?'#030412':plan.col }}
                      whileHover={{scale:1.03, y:-2}}>
                      {plan.pop?'Get Started -- Best Value':'Choose Plan'}
                    </motion.button>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
          {/* Payment methods */}
          <Reveal>
            <div style={{ marginTop:52, textAlign:'center' }}>
              <p style={{ color:'rgba(255,255,255, 0.28)', fontSize:12, marginBottom:20, letterSpacing:'1.5px', textTransform:'uppercase' }}>Accepted Payment Methods</p>
              <div style={{ display:'flex', justifyContent:'center', gap:13, flexWrap:'wrap', marginBottom:14 }}>
                {[{n:'Stripe',i:'⚡',c:'#635BFF'},{n:'PayPal',i:'🅿',c:'#009CDE'},{n:'Visa/MC',i:'💳',c:'#1A1F71'},{n:'Amex',i:'◈',c:'#2E77BC'}].map(m=>(
                  <motion.div key={m.n} style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255, 0.03)', border:'1px solid rgba(255,255,255, 0.08)', borderRadius:10, padding:'9px 16px' }}
                    whileHover={{borderColor:m.c+'55', background:m.c+'12', y:-2}}>
                    <span style={{ fontSize:18 }}>{m.i}</span><span style={{ color:'rgba(255,255,255, 0.6)', fontSize:13, fontWeight:500 }}>{m.n}</span>
                  </motion.div>
                ))}
              </div>
              <p style={{ color:'rgba(255,255,255, 0.22)', fontSize:12.5 }}>🔒 256-bit SSL · PCI-DSS compliant · Secure worldwide</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
