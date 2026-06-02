import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES, CR_CHARACTERS } from '../data/index.js';
import { Reveal, SectionHeader, CRCharCardV2, AnimProcess } from '../components/index.js';

const GROUPS = [
  { label:'Web Development', sub:'Websites that perform, convert, and rank.', ids:['web-info','ecommerce'] },
  { label:'App Development', sub:'Native and cross-platform mobile experiences.', ids:['android','ios','hybrid'] },
  { label:'Growth & Revenue', sub:'Marketing, payments, and content that converts.', ids:['digital','payment','blog'] },
];

export default function ServicesPage({ go }) {
  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>
      <section className="section-pad">
        <div className="wrap">
          <SectionHeader label="CARD COLLECTION" title="Choose Your Battle Cards"
            sub="Each Aquron service is a specialist card -- deploy the right combination to dominate your market."
            labelColor="#FFD700" />

          {GROUPS.map((g, gi) => (
            <div key={g.label} style={{ marginBottom:56 }}>
              <Reveal direction="left">
                <div style={{ marginBottom:24 }}>
                  <h2 style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontSize:'clamp(18px,2.5vw,22px)', fontWeight:700, marginBottom:4 }}>{g.label}</h2>
                  <p style={{ color:'rgba(255,255,255, 0.38)', fontSize:13.5 }}>{g.sub}</p>
                </div>
              </Reveal>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(185px,1fr))', gap:16 }}>
                {SERVICES.filter(s => g.ids.includes(s.id)).map((s, i) => {
                  const char = CR_CHARACTERS[s.id];
                  return char ? (
                    <CRCharCardV2 key={s.id} char={char} service={s} delay={i * .07} onClick={() => go('service_' + s.id)} />
                  ) : null;
                })}
              </div>
            </div>
          ))}

          <Reveal>
            <div style={{ background:'rgba(0,201,255, 0.04)', border:'1px solid rgba(0,201,255, 0.15)', borderRadius:20, padding:'clamp(28px,5vw,44px)', marginTop:16 }}>
              <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:'clamp(20px,2.5vw,24px)', fontWeight:800, color:'#fff', textAlign:'center', marginBottom:9 }}>Our Battle Strategy</h2>
              <p style={{ color:'rgba(255,255,255, 0.4)', fontSize:14, textAlign:'center', marginBottom:6 }}>Transparent and structured from day one to launch.</p>
              <AnimProcess steps={['Discovery','Strategy','Design','Develop','Test','Launch','Grow']} col="#00C9FF" />
            </div>
          </Reveal>

          <div style={{ textAlign:'center', marginTop:44 }}>
            <motion.button className="btn-gold" style={{ fontSize:15, padding:'14px 34px' }} onClick={() => go('contact')} whileHover={{scale:1.05}}>
              Deploy a Project
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
