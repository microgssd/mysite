import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../data/index.js';
import { Reveal } from '../components/index.js';

const ALL_TAGS = [...new Set(BLOG_POSTS.flatMap(p => p.tags))];

// Same category icons as BlogPage
function BlogIcon({ cat, col, size = 48 }) {
  const icons = {
    'Web Dev': <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><rect x="4" y="10" width="56" height="40" rx="5" stroke={col} strokeWidth="1.5" fill={`${col}15`}/><line x1="4" y1="20" x2="60" y2="20" stroke={col} strokeWidth="1" opacity="0.5"/><circle cx="11" cy="15" r="2" fill={col} opacity="0.7"/><circle cx="17" cy="15" r="2" fill={col} opacity="0.5"/><circle cx="23" cy="15" r="2" fill={col} opacity="0.3"/><path d="M14 30 L20 36 L14 42" stroke={col} strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M24 42 L36 42" stroke={col} strokeWidth="2" strokeLinecap="round"/></svg>,
    'Mobile': <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><rect x="18" y="4" width="28" height="56" rx="6" stroke={col} strokeWidth="1.5" fill={`${col}12`}/><line x1="18" y1="14" x2="46" y2="14" stroke={col} strokeWidth="1" opacity="0.5"/><line x1="18" y1="50" x2="46" y2="50" stroke={col} strokeWidth="1" opacity="0.5"/><circle cx="32" cy="55" r="2.5" stroke={col} strokeWidth="1" fill="none" opacity="0.6"/><rect x="22" y="18" width="20" height="28" rx="2" fill={`${col}15`} stroke={col} strokeWidth="0.8"/><path d="M26 30 L29 34 L37 26" stroke={col} strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>,
    'Payments': <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><rect x="6" y="16" width="52" height="32" rx="5" stroke={col} strokeWidth="1.5" fill={`${col}10`}/><rect x="6" y="24" width="52" height="8" fill={`${col}20`}/><rect x="10" y="33" width="12" height="9" rx="2" stroke={col} strokeWidth="1" fill={`${col}15`}/><line x1="28" y1="35" x2="44" y2="35" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/><line x1="28" y1="39" x2="40" y2="39" stroke={col} strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/></svg>,
    'Design': <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><path d="M8 56 L20 30 L42 22 L46 26 L38 48 Z" stroke={col} strokeWidth="1.5" fill={`${col}12`} strokeLinejoin="round"/><circle cx="42" cy="22" r="6" stroke={col} strokeWidth="1.5" fill={`${col}20`}/><circle cx="42" cy="22" r="2.5" fill={col} opacity="0.7"/><circle cx="52" cy="40" r="5" stroke={col} strokeWidth="1.2" fill={`${col}18`}/><line x1="8" y1="56" x2="4" y2="62" stroke={col} strokeWidth="2" strokeLinecap="round"/></svg>,
    'Backend': <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><rect x="8" y="8" width="48" height="14" rx="3" stroke={col} strokeWidth="1.5" fill={`${col}12`}/><rect x="8" y="26" width="48" height="14" rx="3" stroke={col} strokeWidth="1.5" fill={`${col}08`}/><rect x="8" y="44" width="48" height="14" rx="3" stroke={col} strokeWidth="1.5" fill={`${col}10`}/><circle cx="16" cy="15" r="3" fill={col} opacity="0.8"/><circle cx="16" cy="33" r="3" fill={col} opacity="0.5"/><circle cx="16" cy="51" r="3" fill={col} opacity="0.65"/><rect x="24" y="12" width="22" height="5" rx="2" fill={`${col}30`}/><rect x="24" y="30" width="16" height="5" rx="2" fill={`${col}20`}/><rect x="24" y="48" width="20" height="5" rx="2" fill={`${col}25`}/></svg>,
    'Marketing': <svg width={size} height={size} viewBox="0 0 64 64" fill="none"><polyline points="8,50 18,34 28,40 40,20 50,28 60,10" stroke={col} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="40" cy="20" r="4" fill={col} opacity="0.8"/><circle cx="60" cy="10" r="4" fill={col}/><path d="M54 6 L62 6 L62 14" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round"/><line x1="8" y1="54" x2="60" y2="54" stroke={col} strokeWidth="0.8" opacity="0.25"/></svg>,
  };
  return icons[cat] || <span style={{ fontSize: size * 0.5 }}>{BLOG_POSTS.find(p=>p.cat===cat)?.em || '📝'}</span>;
}

function BlogDetailSidebar({ go, currentIdx }) {
  const related = BLOG_POSTS.filter((_, i) => i !== currentIdx).slice(0, 4);
  const sideStyle = { background:'rgba(2,5,18,0.9)', border:'1px solid rgba(0,201,255,0.15)', borderRadius:10, padding:16, marginBottom:16, position:'relative', overflow:'hidden' };
  const headStyle = { fontFamily:'Orbitron,monospace', color:'#e0f0ff', fontSize:11, fontWeight:700, marginBottom:12, letterSpacing:1.5, textTransform:'uppercase', display:'flex', alignItems:'center', gap:7 };
  return (
    <motion.div className="blog-sidebar" initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 }}>
      {/* Related */}
      <div style={sideStyle}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.3),transparent)' }}/>
        <div style={headStyle}><span style={{ color:'#00C9FF' }}>{'>'}</span> Related Posts</div>
        {related.map((p, i) => {
          const idx = BLOG_POSTS.indexOf(p);
          return (
            <motion.div key={i} onClick={() => { go('blog_' + idx); window.scrollTo({ top:0 }); }}
              style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:12, cursor:'pointer', padding:'8px', borderRadius:6, border:'1px solid transparent' }}
              whileHover={{ borderColor:'rgba(0,201,255,0.15)', background:'rgba(0,201,255,0.04)', x:3 }}>
              <div style={{ width:34, height:34, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background:`${p.col}10`, border:`1px solid ${p.col}33`, borderRadius:6 }}>
                <BlogIcon cat={p.cat} col={p.col} size={22} />
              </div>
              <div>
                <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(200,230,255,0.8)', fontSize:12.5, fontWeight:600, lineHeight:1.4 }}>{p.title}</p>
                <p style={{ fontFamily:'monospace', color:'rgba(0,201,255,0.4)', fontSize:10, marginTop:2 }}>{p.cat} · {p.read}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tags */}
      <div style={sideStyle}>
        <div style={headStyle}><span style={{ color:'#4FFFB0' }}>{'>'}</span> Tags</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
          {ALL_TAGS.map(tag => (
            <motion.button key={tag} onClick={() => go('blog')}
              style={{ background:'rgba(0,201,255,0.04)', border:'1px solid rgba(0,201,255,0.15)', borderRadius:4, padding:'4px 10px', color:'rgba(160,210,255,0.5)', fontFamily:'monospace', fontSize:10, cursor:'pointer', letterSpacing:0.5 }}
              whileHover={{ scale:1.06 }}>
              {tag}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div style={{ ...sideStyle, background:'rgba(0,201,255,0.04)', borderColor:'rgba(0,201,255,0.2)' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.4),transparent)' }}/>
        <div style={headStyle}><span style={{ color:'#FFD700' }}>{'>'}</span> Newsletter</div>
        <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(148,200,240,0.5)', fontSize:13, marginBottom:12, lineHeight:1.6 }}>One transmission/week. Pure signal.</p>
        <input placeholder="your@email.com" style={{ background:'rgba(0,10,30,0.97)', border:'1px solid rgba(0,201,255,0.22)', borderRadius:6, color:'#e0f0ff', fontFamily:'Rajdhani,sans-serif', fontSize:14, padding:'9px 13px', width:'100%', outline:'none', marginBottom:10 }}/>
        <motion.button className="btn-primary" style={{ width:'100%', padding:'10px', fontSize:11, fontFamily:'Orbitron,monospace', letterSpacing:1.5 }} whileHover={{ scale:1.03 }}>SUBSCRIBE →</motion.button>
      </div>

      {/* CTA */}
      <motion.div style={{ ...sideStyle, textAlign:'center', borderColor:'rgba(255,215,0,0.2)' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(255,215,0,0.3),transparent)' }}/>
        <motion.div style={{ fontSize:32, marginBottom:10 }} animate={{ y:[0,-5,0] }} transition={{ duration:2.5, repeat:Infinity }}>⚡</motion.div>
        <h3 style={{ fontFamily:'Orbitron,monospace', color:'#fff', fontSize:12, fontWeight:700, marginBottom:8, letterSpacing:1 }}>BUILD THIS FOR YOUR BIZ?</h3>
        <motion.button className="btn-gold" style={{ width:'100%', padding:'10px', fontSize:11, fontFamily:'Orbitron,monospace', letterSpacing:1 }} onClick={() => go('contact')} whileHover={{ scale:1.04 }}>
          FREE CONSULT →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function BlogDetailPage({ id, go }) {
  const post = BLOG_POSTS[id] || BLOG_POSTS[0];
  const paragraphs = post.body.split('\n\n');

  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>
      <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.015) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none', zIndex:0 }}/>
      <article style={{ padding:'48px 0 72px', position:'relative', zIndex:1 }}>
        <div className="wrap">
          <div className="blog-layout">
            {/* Article */}
            <div>
              <motion.button onClick={() => go('blog')}
                style={{ background:'rgba(0,201,255,0.06)', border:'1px solid rgba(0,201,255,0.2)', color:'rgba(160,210,255,0.7)', padding:'7px 16px', borderRadius:6, marginBottom:28, fontSize:11, cursor:'pointer', fontFamily:'Orbitron,monospace', letterSpacing:1.5 }}
                whileHover={{ scale:1.03 }}>
                ← BACK TO LOGS
              </motion.button>

              <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
                {/* Meta row */}
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:20, flexWrap:'wrap' }}>
                  <span style={{ fontFamily:'Orbitron,monospace', background:`${post.col}18`, border:`1px solid ${post.col}44`, color:post.col, fontSize:9, fontWeight:700, padding:'4px 12px', borderRadius:4, letterSpacing:1.5 }}>
                    {post.cat.toUpperCase()}
                  </span>
                  <span style={{ fontFamily:'monospace', color:'rgba(148,200,240,0.4)', fontSize:12 }}>{post.date}</span>
                  <span style={{ fontFamily:'monospace', color:'rgba(148,200,240,0.4)', fontSize:12 }}>· {post.read} read</span>
                </div>

                {/* Title with icon */}
                <div style={{ display:'flex', gap:18, alignItems:'flex-start', marginBottom:22 }}>
                  <div style={{ flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', width:56, height:56, background:`${post.col}10`, border:`1px solid ${post.col}33`, borderRadius:8, filter:`drop-shadow(0 0 10px ${post.col}55)` }}>
                    <BlogIcon cat={post.cat} col={post.col} size={36} />
                  </div>
                  <h1 style={{ fontFamily:'Orbitron,monospace', color:'#fff', fontSize:'clamp(16px,3vw,32px)', fontWeight:900, lineHeight:1.2, letterSpacing:'0.5px', textShadow:`0 0 20px ${post.col}44` }}>
                    {post.title}
                  </h1>
                </div>

                {/* Excerpt */}
                <div style={{ borderLeft:`3px solid ${post.col}`, paddingLeft:18, marginBottom:28, background:`${post.col}06`, borderRadius:'0 6px 6px 0', padding:'14px 18px' }}>
                  <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(180,220,255,0.75)', fontSize:16, lineHeight:1.8, fontStyle:'italic' }}>{post.exc}</p>
                </div>

                {/* Divider */}
                <div style={{ height:1, background:`linear-gradient(90deg,${post.col}55,transparent)`, marginBottom:28 }}/>

                {/* Body */}
                {paragraphs.map((para, i) => (
                  <motion.p key={i} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1+i*0.05 }}
                    style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(180,220,255,0.7)', fontSize:15.5, lineHeight:1.92, marginBottom:22, fontWeight:400 }}>
                    {para}
                  </motion.p>
                ))}

                {/* Tags */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginTop:28, marginBottom:28 }}>
                  {post.tags.map(t => (
                    <span key={t} style={{ background:'rgba(0,201,255,0.07)', border:'1px solid rgba(0,201,255,0.2)', color:'#00C9FF', fontSize:11, fontWeight:600, padding:'4px 12px', borderRadius:4, fontFamily:'monospace', letterSpacing:0.5 }}>{t}</span>
                  ))}
                </div>

                {/* Inline CTA */}
                <Reveal>
                  <motion.div style={{ padding:'22px', background:'rgba(0,5,20,0.8)', border:`1px solid ${post.col}33`, borderRadius:10, position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${post.col}55,transparent)` }}/>
                    <p style={{ fontFamily:'Orbitron,monospace', color:post.col, fontWeight:700, fontSize:12, marginBottom:8, letterSpacing:1 }}>
                      WANT THIS FOR YOUR BUSINESS?
                    </p>
                    <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(148,200,240,0.55)', fontSize:14, lineHeight:1.75, marginBottom:16 }}>
                      Aquron has hands-on experience across 150+ projects. Let's talk.
                    </p>
                    <motion.button className="btn-gold" onClick={() => go('contact')} style={{ fontSize:13, padding:'10px 22px', fontFamily:'Orbitron,monospace', letterSpacing:1.5 }} whileHover={{ scale:1.04 }}>
                      FREE CONSULTATION →
                    </motion.button>
                  </motion.div>
                </Reveal>
              </motion.div>
            </div>

            {/* Sidebar */}
            <BlogDetailSidebar go={go} currentIdx={id} />
          </div>
        </div>
      </article>
    </div>
  );
}
