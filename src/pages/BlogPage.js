
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS } from '../data/index.js';
import { Reveal, SectionHeader } from '../components/index.js';

const ALL_TAGS = [...new Set(BLOG_POSTS.flatMap(p=>p.tags))];
const ALL_CATS = [...new Set(BLOG_POSTS.map(p=>p.cat))];

function BlogSidebar({ activeTag, setActiveTag, activeCat, setActiveCat, go }) {
  const recent = BLOG_POSTS.slice(0,3);
  return (
    <motion.div className="blog-sidebar" initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:.2 }}>
      {/* Search */}
      <div className="sidebar-card">
        <h3 style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontSize:15, fontWeight:700, marginBottom:14 }}>🔍 Search</h3>
        <input placeholder="Search articles..." style={{ background:'rgba(0,10,40, 0.97)', border:'1px solid rgba(0,201,255, 0.28)', borderRadius:9, color:'#fff', fontFamily:'Manrope,sans-serif', fontSize:13.5, padding:'10px 14px', width:'100%', outline:'none' }} />
      </div>
      {/* Categories */}
      <div className="sidebar-card">
        <h3 style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontSize:15, fontWeight:700, marginBottom:14 }}>📂 Categories</h3>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {ALL_CATS.map(cat=>(
            <motion.button key={cat} onClick={()=>setActiveCat(activeCat===cat?null:cat)}
              style={{ textAlign:'left', background:activeCat===cat?'rgba(0,201,255, 0.15)':'rgba(255,255,255, 0.04)', border:`1px solid ${activeCat===cat?'rgba(0,201,255, 0.4)':'rgba(255,255,255, 0.07)'}`, borderRadius:9, padding:'9px 14px', color:activeCat===cat?'#00C9FF':'rgba(255,255,255, 0.65)', fontFamily:'Manrope,sans-serif', fontSize:13, fontWeight:activeCat===cat?600:400, cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center' }}
              whileHover={{x:4}}>
              <span>{cat}</span>
              <span style={{ color:'rgba(255,255,255, 0.3)', fontSize:11 }}>{BLOG_POSTS.filter(p=>p.cat===cat).length}</span>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Tags */}
      <div className="sidebar-card">
        <h3 style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontSize:15, fontWeight:700, marginBottom:14 }}>🏷️ Tags</h3>
        <div className="tag-cloud">
          {ALL_TAGS.map(tag=>(
            <motion.button key={tag} className={`tag-pill ${activeTag===tag?'active':''}`} onClick={()=>setActiveTag(activeTag===tag?null:tag)} whileHover={{scale:1.08}} whileTap={{ scale:.95 }}>{tag}</motion.button>
          ))}
        </div>
      </div>
      {/* Recent */}
      <div className="sidebar-card">
        <h3 style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontSize:15, fontWeight:700, marginBottom:14 }}>📰 Recent Posts</h3>
        {recent.map((p,i)=>(
          <motion.div key={i} onClick={()=>go("blog_"+i)} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:14, cursor:'pointer', padding:'8px', borderRadius:8 }}
            whileHover={{x:3}}>
            <span style={{ fontSize:22, flexShrink:0 }}>{p.em}</span>
            <div><p style={{ color:'rgba(255,255,255, 0.8)', fontSize:12.5, fontWeight:500, lineHeight:1.45 }}>{p.title}</p><p style={{ color:'rgba(255,255,255, 0.32)', fontSize:11, marginTop:3 }}>{p.date}</p></div>
          </motion.div>
        ))}
      </div>
      {/* Newsletter */}
      <motion.div className="sidebar-card" style={{ background:'linear-gradient(135deg,rgba(0,201,255, 0.08),rgba(79,255,176, 0.04))', border:'1px solid rgba(0,201,255, 0.18)' }}>
        <h3 style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontSize:15, fontWeight:700, marginBottom:8 }}>📬 Newsletter</h3>
        <p style={{ color:'rgba(255,255,255, 0.44)', fontSize:13, marginBottom:14, lineHeight:1.6 }}>One email/week. Pure signal.</p>
        <input placeholder="your@email.com" style={{ background:'rgba(0,10,40, 0.97)', border:'1px solid rgba(0,201,255, 0.28)', borderRadius:9, color:'#fff', fontFamily:'Manrope,sans-serif', fontSize:13, padding:'9px 13px', width:'100%', outline:'none', marginBottom:10 }} />
        <motion.button className="btn-primary" style={{ width:'100%', padding:'10px', fontSize:13 }} whileHover={{scale:1.03}}>Subscribe →</motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function BlogPage({ go }) {
  const [activeTag, setActiveTag] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const filtered = BLOG_POSTS.filter(p=>{
    if(activeCat && p.cat!==activeCat) return false;
    if(activeTag && !p.tags.includes(activeTag)) return false;
    return true;
  });
  return (
    <div style={{ paddingTop:88 }}>
      <section className="section-pad">
        <div className="wrap">
          <SectionHeader label="Knowledge Base" title="The Aquron Blog" sub="Practical guides, deep dives, and honest opinions on web, mobile, and digital growth." labelColor="#FC5C7D" />
          <div className="blog-layout">
            {/* Posts */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div key={activeTag+activeCat} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:26 }}>
                  {filtered.map((post,i)=>(
                    <motion.div key={i} onClick={()=>go("blog_"+BLOG_POSTS.indexOf(post))}
                      style={{ background:'rgba(255,255,255, 0.025)', border:"1px solid rgba(255,255,255, 0.07)", borderRadius:16, overflow:'hidden', cursor:'pointer' }}
                      initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*.07 }}
                      whileHover={{ y:-7, borderColor:post.col+"55", boxShadow:`0 20px 44px ${post.col}22` }}>
                      <div style={{ height:144, background:`linear-gradient(135deg,${post.col}22,${post.col}08)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:56, position:'relative' }}>
                        <motion.span whileHover={{scale:1.2, rotate:10}}>{post.em}</motion.span>
                        <div style={{ position:'absolute', top:12, right:12, background:post.col+"22", border:`1px solid ${post.col}44`, color:post.col, fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>{post.cat}</div>
                      </div>
                      <div style={{ padding:22 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:11 }}>
                          <span style={{ color:'rgba(255,255,255, 0.32)', fontSize:12 }}>{post.date}</span>
                          <span style={{ color:'rgba(255,255,255, 0.32)', fontSize:12 }}>{post.read} read</span>
                        </div>
                        <h3 style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontSize:16, fontWeight:700, lineHeight:1.4, marginBottom:10 }}>{post.title}</h3>
                        <p style={{ color:'rgba(255,255,255, 0.5)', fontSize:13.5, lineHeight:1.75, marginBottom:14 }}>{post.exc}</p>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
                          {post.tags.map(t=><span key={t} style={{ background:'rgba(0,201,255, 0.08)', border:'1px solid rgba(0,201,255, 0.2)', color:'var(--c1)', fontSize:10.5, fontWeight:600, padding:'2px 8px', borderRadius:20 }}>{t}</span>)}
                        </div>
                        <span style={{ color:post.col, fontSize:13, fontWeight:600 }}>Read Article →</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Sidebar */}
            <BlogSidebar activeTag={activeTag} setActiveTag={setActiveTag} activeCat={activeCat} setActiveCat={setActiveCat} go={go} />
          </div>
        </div>
      </section>
    </div>
  );
}
