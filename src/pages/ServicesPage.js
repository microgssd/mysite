import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../data/index.js';
import { Reveal, SectionHeader, CyberServiceCard, AnimProcess } from '../components/index.js';

const GROUPS = [
  { label:'Web & E-Commerce', sub:'Websites and stores that perform, convert, and rank.', ids:['web-info','ecommerce'] },
  { label:'App Development', sub:'Native and cross-platform mobile experiences.', ids:['android','ios','hybrid'] },
  { label:'AI & Automation', sub:'Intelligent systems, bots, and ML-powered products.', ids:['ml-ai','ai-chatbot','telegram-bot'] },
  { label:'Growth & Platforms', sub:'Marketing, payments, SaaS, and content that converts.', ids:['digital','payment','blog','saas'] },
];

export default function ServicesPage({ go }) {
  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>
      {/* Cyber grid bg */}
      <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.025) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none', zIndex:0 }}/>
      <section className="section-pad" style={{ position:'relative', zIndex:1 }}>
        <div className="wrap">
          <SectionHeader label="SERVICE MODULES" title="Select Your Loadout"
            sub="Each module is a precision-engineered solution — deploy the right stack to dominate your market."
            labelColor="#00C9FF" />

          {GROUPS.map((g) => (
            <div key={g.label} style={{ marginBottom:52 }}>
              <Reveal direction="left">
                <div style={{ marginBottom:20, display:'flex', alignItems:'center', gap:12 }}>
                  <motion.div style={{ width:3, height:24, background:'#00C9FF', borderRadius:2 }} animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:2, repeat:Infinity }} />
                  <div>
                    <h2 style={{ fontFamily:'Orbitron,monospace', color:'#e0f0ff', fontSize:'clamp(14px,2vw,18px)', fontWeight:700, letterSpacing:1 }}>{g.label}</h2>
                    <p style={{ color:'rgba(255,255,255,0.38)', fontSize:13 }}>{g.sub}</p>
                  </div>
                </div>
              </Reveal>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(185px,1fr))', gap:16 }}>
                {SERVICES.filter(s => g.ids.includes(s.id)).map((s,i) => (
                  <CyberServiceCard key={s.id} service={s} delay={i*.07} onClick={() => go('service_'+s.id)} />
                ))}
              </div>
            </div>
          ))}

          <Reveal>
            <div style={{ background:'rgba(0,201,255,0.04)', border:'1px solid rgba(0,201,255,0.15)', borderRadius:12, padding:'clamp(24px,4vw,40px)', marginTop:16, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.5),transparent)' }}/>
              <h2 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(16px,2vw,20px)', fontWeight:800, color:'#e0f0ff', marginBottom:8, textAlign:'center', letterSpacing:1 }}>Mission Protocol</h2>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, textAlign:'center', marginBottom:20 }}>Transparent and structured from day one to launch.</p>
              <AnimProcess steps={['Discovery','Strategy','Design','Develop','Test','Launch','Grow']} col="#00C9FF" />
            </div>
          </Reveal>

          <div style={{ textAlign:'center', marginTop:44 }}>
            <motion.button className="btn-gold" style={{ fontSize:14, padding:'13px 32px', fontFamily:'Orbitron,monospace', letterSpacing:1.5 }} onClick={() => go('contact')} whileHover={{ scale:1.05 }}>
              INITIATE PROJECT
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
