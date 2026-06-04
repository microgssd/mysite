import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS } from '../data/index.js';

const ALL_TAGS = [...new Set(BLOG_POSTS.flatMap(p => p.tags))];
const ALL_CATS = [...new Set(BLOG_POSTS.map(p => p.cat))];

// Unique icon per blog category — no two look the same
function BLOG_CAT_ICON({ cat, col, em }) {
  const icons = {
    'Web Dev': (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="4" y="10" width="56" height="40" rx="5" stroke={col} strokeWidth="1.5" fill={`${col}10`}/>
        <line x1="4" y1="20" x2="60" y2="20" stroke={col} strokeWidth="1" opacity="0.5"/>
        <circle cx="11" cy="15" r="2" fill={col} opacity="0.7"/>
        <circle cx="17" cy="15" r="2" fill={col} opacity="0.5"/>
        <circle cx="23" cy="15" r="2" fill={col} opacity="0.3"/>
        <path d="M14 30 L20 36 L14 42" stroke={col} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M24 42 L36 42" stroke={col} strokeWidth="2" strokeLinecap="round"/>
        <rect x="20" y="52" width="24" height="3" rx="1.5" fill={col} opacity="0.4"/>
        <line x1="32" y1="50" x2="32" y2="52" stroke={col} strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
    'Mobile': (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="20" y="4" width="24" height="42" rx="5" stroke={col} strokeWidth="1.5" fill={`${col}10`}/>
        <line x1="20" y1="12" x2="44" y2="12" stroke={col} strokeWidth="1" opacity="0.5"/>
        <line x1="20" y1="38" x2="44" y2="38" stroke={col} strokeWidth="1" opacity="0.5"/>
        <circle cx="32" cy="43" r="2" stroke={col} strokeWidth="1" fill="none" opacity="0.6"/>
        <rect x="24" y="16" width="16" height="18" rx="2" fill={`${col}15`} stroke={col} strokeWidth="0.8"/>
        <path d="M27 22 L29 25 L33 20" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Signal waves right */}
        <path d="M48 20 Q52 24 48 28" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
        <path d="M50 17 Q56 24 50 31" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    'Payments': (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="4" y="16" width="48" height="30" rx="5" stroke={col} strokeWidth="1.5" fill={`${col}10`}/>
        <rect x="4" y="24" width="48" height="8" fill={`${col}20`}/>
        <rect x="8" y="32" width="10" height="8" rx="2" stroke={col} strokeWidth="1" fill={`${col}15`}/>
        <line x1="24" y1="34" x2="40" y2="34" stroke={col} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="24" y1="38" x2="36" y2="38" stroke={col} strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
        {/* Shield */}
        <path d="M46 50 Q46 44 52 42 Q58 44 58 50 Q58 56 52 59 Q46 56 46 50Z" stroke={col} strokeWidth="1.5" fill={`${col}15`}/>
        <path d="M49 50 L51 52 L55 48" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'Design': (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        {/* Pen tool */}
        <path d="M8 52 L20 28 L40 20 L44 24 L36 44 Z" stroke={col} strokeWidth="1.5" fill={`${col}10`} strokeLinejoin="round"/>
        <line x1="20" y1="28" x2="36" y2="44" stroke={col} strokeWidth="1" opacity="0.4"/>
        <circle cx="40" cy="20" r="5" stroke={col} strokeWidth="1.5" fill={`${col}20`}/>
        <circle cx="40" cy="20" r="2" fill={col} opacity="0.7"/>
        {/* Color palette circles */}
        <circle cx="50" cy="38" r="5" stroke={col} strokeWidth="1.2" fill={`${col}20`}/>
        <circle cx="58" cy="46" r="5" stroke={col} strokeWidth="1.2" fill={`${col}15`}/>
        <circle cx="50" cy="54" r="5" stroke={col} strokeWidth="1.2" fill={`${col}25`}/>
        <line x1="8" y1="52" x2="4" y2="58" stroke={col} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'Backend': (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        {/* Server stack */}
        <rect x="8" y="10" width="48" height="12" rx="3" stroke={col} strokeWidth="1.5" fill={`${col}12`}/>
        <rect x="8" y="26" width="48" height="12" rx="3" stroke={col} strokeWidth="1.5" fill={`${col}08`}/>
        <rect x="8" y="42" width="48" height="12" rx="3" stroke={col} strokeWidth="1.5" fill={`${col}10`}/>
        <circle cx="16" cy="16" r="2.5" fill={col} opacity="0.8"/>
        <circle cx="16" cy="32" r="2.5" fill={col} opacity="0.5"/>
        <circle cx="16" cy="48" r="2.5" fill={col} opacity="0.6"/>
        <rect x="22" y="14" width="20" height="4" rx="1.5" fill={`${col}30`}/>
        <rect x="22" y="30" width="14" height="4" rx="1.5" fill={`${col}22`}/>
        <rect x="22" y="46" width="18" height="4" rx="1.5" fill={`${col}28`}/>
        <circle cx="50" cy="16" r="3" fill="#4FFFB0" opacity="0.8"/>
        <circle cx="50" cy="32" r="3" fill={col} opacity="0.5"/>
        <circle cx="50" cy="48" r="3" fill="#4FFFB0" opacity="0.7"/>
      </svg>
    ),
    'Marketing': (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        {/* Megaphone */}
        <path d="M8 24 L8 40 L20 40 L40 52 L40 12 L20 24 Z" stroke={col} strokeWidth="1.5" fill={`${col}12`} strokeLinejoin="round"/>
        <line x1="8" y1="24" x2="8" y2="40" stroke={col} strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 40 L22 52 L28 52 L26 40" stroke={col} strokeWidth="1.2" fill={`${col}15`}/>
        {/* Sound waves */}
        <path d="M44 20 Q50 26 50 32 Q50 38 44 44" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
        <path d="M48 16 Q56 24 56 32 Q56 40 48 48" stroke={col} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4"/>
        {/* Up arrow */}
        <path d="M6 8 L10 4 L14 8" stroke={col} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="10" y1="4" x2="10" y2="14" stroke={col} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  const icon = icons[cat];
  if (icon) return icon;
  // Fallback: tech-style hex with emoji
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <polygon points="32,4 58,18 58,46 32,60 6,46 6,18" stroke={col} strokeWidth="1.5" fill={`${col}10`}/>
      <text x="32" y="40" textAnchor="middle" fontSize="22">{em}</text>
    </svg>
  );
}

// Cyberpunk blog card - terminal/data-log style, different from service cards
function CyberBlogCard({ post, index, onClick }) {
  const [hov, setHov] = useState(false);
  const cardNum = String(index + 1).padStart(3, '0');
  return (
    <motion.div
      initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:index*0.07, type:'spring', stiffness:180 }}
      whileHover={{ y:-8 }} whileTap={{ scale:0.98 }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      onClick={onClick}
      style={{ background:'rgba(2,5,18,0.95)', border:`1px solid ${hov ? post.col+'88' : post.col+'22'}`,
        borderRadius:10, overflow:'hidden', cursor:'pointer', position:'relative',
        boxShadow: hov ? `0 0 0 1px ${post.col}44, 0 16px 48px rgba(0,0,0,0.7), 0 0 28px ${post.col}14` : '0 4px 24px rgba(0,0,0,0.5)',
        transition:'border-color 0.3s, box-shadow 0.3s' }}>

      {/* Top terminal bar */}
      <div style={{ height:28, background:`rgba(0,0,0,0.5)`, borderBottom:`1px solid ${post.col}22`,
        display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 12px' }}>
        <div style={{ display:'flex', gap:5 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#ff5f57', opacity:0.8 }}/>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#ffbd2e', opacity:0.8 }}/>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'#28ca41', opacity:0.8 }}/>
        </div>
        <span style={{ fontFamily:'monospace', fontSize:9, color:`${post.col}77`, letterSpacing:1 }}>
          LOG-{cardNum} {'// '} {post.date}
        </span>
        <span style={{ fontFamily:'Orbitron,monospace', fontSize:8, color:`${post.col}88`, letterSpacing:1.5 }}>
          {post.cat.toUpperCase()}
        </span>
      </div>

      {/* Scan line */}
      <motion.div style={{ position:'absolute', left:0, right:0, height:1,
        background:`linear-gradient(90deg,transparent,${post.col}55,transparent)` }}
        animate={{ top:['28px','100%'] }} transition={{ duration:3+index*0.4, repeat:Infinity, ease:'linear' }}/>

      {/* Header area - data visualization style */}
      <div style={{ height:110, background:`linear-gradient(135deg,${post.col}12,${post.col}04,rgba(0,0,0,0.3))`,
        display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px',
        position:'relative', overflow:'hidden' }}>
        {/* Grid lines */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${post.col}08 1px,transparent 1px),linear-gradient(90deg,${post.col}08 1px,transparent 1px)`,
          backgroundSize:'20px 20px', pointerEvents:'none' }}/>
        {/* Left - unique cyber icon per category */}
        <div style={{ position:'relative', zIndex:1, width:72, height:72, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <BLOG_CAT_ICON cat={post.cat} col={post.col} em={post.em} />
        </div>
        {/* Right - data bars */}
        <div style={{ display:'flex', flexDirection:'column', gap:5, alignItems:'flex-end', position:'relative', zIndex:1 }}>
          {[85,60,40,75].map((w,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:4, height:4, borderRadius:'50%', background:post.col, opacity:0.6 }}/>
              <motion.div style={{ height:3, borderRadius:2, background:`${post.col}66` }}
                initial={{ width:0 }} animate={{ width: hov ? w*0.6 : w*0.4 }} transition={{ duration:0.6, delay:i*0.08 }}/>
            </div>
          ))}
          <span style={{ fontFamily:'monospace', fontSize:9, color:`${post.col}66`, marginTop:2 }}>{post.read} read</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding:'14px 16px 16px' }}>
        {/* Prefix prompt */}
        <div style={{ fontFamily:'monospace', fontSize:10, color:`${post.col}66`, marginBottom:8, letterSpacing:0.5 }}>
          <span style={{ color:`${post.col}44` }}>{'> '}</span>
          <span style={{ color:`${post.col}88` }}>{'cat '}</span>
          <span style={{ color:'rgba(255,255,255,0.3)' }}>{'/articles/'}{post.cat.toLowerCase().replace(' ','-')}</span>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily:'Orbitron,monospace', fontSize:12.5, fontWeight:700,
          color: hov ? '#ffffff' : '#c8e8ff', lineHeight:1.4, marginBottom:8, letterSpacing:0.3,
          textShadow: hov ? `0 0 12px ${post.col}` : 'none', transition:'text-shadow 0.3s, color 0.3s' }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(148,198,240,0.55)', fontSize:13,
          lineHeight:1.6, marginBottom:12 }}>
          {post.exc}
        </p>

        {/* Divider */}
        <div style={{ height:1, background:`linear-gradient(90deg,${post.col}44,transparent)`, marginBottom:10 }}/>

        {/* Tags + CTA row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:6 }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
            {post.tags.slice(0,3).map(t => (
              <span key={t} style={{ fontFamily:'monospace', fontSize:9, color:`${post.col}cc`,
                border:`1px solid ${post.col}2a`, borderRadius:3, padding:'2px 7px',
                background:`${post.col}08` }}>{t}</span>
            ))}
          </div>
          <span style={{ fontFamily:'Rajdhani,sans-serif', fontSize:12, fontWeight:700,
            color: hov ? post.col : `${post.col}66`,
            transition:'color 0.3s', letterSpacing:1 }}>
            READ →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function BlogSidebar({ activeTag, setActiveTag, activeCat, setActiveCat, go }) {
  const recent = BLOG_POSTS.slice(0,3);
  const sideStyle = { background:'rgba(2,5,18,0.9)', border:'1px solid rgba(0,201,255,0.15)', borderRadius:10, padding:16, marginBottom:16, position:'relative', overflow:'hidden' };
  const headStyle = { fontFamily:'Orbitron,monospace', color:'#e0f0ff', fontSize:11, fontWeight:700, marginBottom:12, letterSpacing:1.5, textTransform:'uppercase', display:'flex', alignItems:'center', gap:7 };
  return (
    <motion.div className="blog-sidebar" initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:.2 }}>
      {/* Search */}
      <div style={sideStyle}>
        <div style={headStyle}><span style={{ color:'#00C9FF' }}>{'>'}</span> Search</div>
        <input placeholder="Search articles..." style={{ background:'rgba(0,10,30,0.97)', border:'1px solid rgba(0,201,255,0.22)', borderRadius:6, color:'#e0f0ff', fontFamily:'Rajdhani,sans-serif', fontSize:14, padding:'10px 14px', width:'100%', outline:'none' }} />
      </div>
      {/* Categories */}
      <div style={sideStyle}>
        <div style={headStyle}><span style={{ color:'#00C9FF' }}>{'>'}</span> Categories</div>
        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
          {ALL_CATS.map(cat => (
            <motion.button key={cat} onClick={() => setActiveCat(activeCat===cat?null:cat)}
              style={{ textAlign:'left', background:activeCat===cat?'rgba(0,201,255,0.12)':'rgba(0,201,255,0.03)', border:`1px solid ${activeCat===cat?'rgba(0,201,255,0.4)':'rgba(0,201,255,0.1)'}`, borderRadius:5, padding:'8px 12px', color:activeCat===cat?'#00C9FF':'rgba(160,210,255,0.6)', fontFamily:'Rajdhani,sans-serif', fontSize:13.5, fontWeight:activeCat===cat?700:500, cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center' }}
              whileHover={{ x:4 }}>
              <span>{cat}</span>
              <span style={{ fontFamily:'monospace', fontSize:10, color:'rgba(0,201,255,0.4)', border:'1px solid rgba(0,201,255,0.2)', borderRadius:3, padding:'1px 6px' }}>{BLOG_POSTS.filter(p=>p.cat===cat).length}</span>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Tags */}
      <div style={sideStyle}>
        <div style={headStyle}><span style={{ color:'#4FFFB0' }}>{'>'}</span> Tags</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
          {ALL_TAGS.map(tag => (
            <motion.button key={tag} onClick={() => setActiveTag(activeTag===tag?null:tag)}
              style={{ background:activeTag===tag?'rgba(0,201,255,0.15)':'rgba(0,201,255,0.04)', border:`1px solid ${activeTag===tag?'rgba(0,201,255,0.5)':'rgba(0,201,255,0.15)'}`, borderRadius:4, padding:'4px 10px', color:activeTag===tag?'#00C9FF':'rgba(160,210,255,0.5)', fontFamily:'monospace', fontSize:10, cursor:'pointer', letterSpacing:0.5 }}
              whileHover={{ scale:1.06 }} whileTap={{ scale:0.96 }}>
              {tag}
            </motion.button>
          ))}
        </div>
      </div>
      {/* Recent */}
      <div style={sideStyle}>
        <div style={headStyle}><span style={{ color:'#FFD700' }}>{'>'}</span> Recent Posts</div>
        {recent.map((p,i) => (
          <motion.div key={i} onClick={() => go('blog_'+i)}
            style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:13, cursor:'pointer', padding:'8px', borderRadius:6, border:'1px solid transparent' }}
            whileHover={{ borderColor:'rgba(0,201,255,0.15)', background:'rgba(0,201,255,0.04)', x:3 }}>
            <div style={{ width:32, height:32, borderRadius:5, background:`${p.col}12`, border:`1px solid ${p.col}33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, flexShrink:0 }}>{p.em}</div>
            <div>
              <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(200,230,255,0.8)', fontSize:12.5, fontWeight:600, lineHeight:1.4 }}>{p.title}</p>
              <p style={{ fontFamily:'monospace', color:'rgba(0,201,255,0.4)', fontSize:10, marginTop:2 }}>{p.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Newsletter */}
      <div style={{ ...sideStyle, background:'rgba(0,201,255,0.04)', borderColor:'rgba(0,201,255,0.2)' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,255,0.4),transparent)' }}/>
        <div style={headStyle}><span style={{ color:'#FC5C7D' }}>{'>'}</span> Newsletter</div>
        <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(148,200,240,0.5)', fontSize:13, marginBottom:12, lineHeight:1.6 }}>One transmission/week. Pure signal.</p>
        <input placeholder="your@email.com" style={{ background:'rgba(0,10,30,0.97)', border:'1px solid rgba(0,201,255,0.22)', borderRadius:6, color:'#e0f0ff', fontFamily:'Rajdhani,sans-serif', fontSize:14, padding:'9px 13px', width:'100%', outline:'none', marginBottom:10 }} />
        <motion.button className="btn-primary" style={{ width:'100%', padding:'10px', fontSize:12, fontFamily:'Orbitron,monospace', letterSpacing:1.5 }} whileHover={{ scale:1.03 }}>SUBSCRIBE →</motion.button>
      </div>
    </motion.div>
  );
}

export default function BlogPage({ go }) {
  const [activeTag, setActiveTag] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const filtered = BLOG_POSTS.filter(p => {
    if (activeCat && p.cat !== activeCat) return false;
    if (activeTag && !p.tags.includes(activeTag)) return false;
    return true;
  });

  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>
      <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.02) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none', zIndex:0 }}/>
      <section className="section-pad" style={{ position:'relative', zIndex:1 }}>
        <div className="wrap">
          {/* Cyberpunk page header */}
          <div style={{ marginBottom:40, textAlign:'center' }}>
            <p style={{ fontFamily:'Orbitron,monospace', color:'#FC5C7D', fontSize:10, fontWeight:700, letterSpacing:3, textTransform:'uppercase', marginBottom:10 }}>
              KNOWLEDGE BASE
            </p>
            <h1 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(20px,3.5vw,38px)', fontWeight:900, color:'#fff', letterSpacing:2, marginBottom:10, textShadow:'0 0 30px rgba(252,92,125,0.3)' }}>
              THE AQURON BLOG
            </h1>
            <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(148,200,240,0.55)', fontSize:15, maxWidth:500, margin:'0 auto', lineHeight:1.75 }}>
              Practical guides, deep dives, and honest opinions on web, mobile, and digital growth.
            </p>
          </div>

          <div className="blog-layout">
            {/* Posts grid */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div key={activeTag+activeCat} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:20 }}>
                  {filtered.map((post,i) => (
                    <CyberBlogCard key={i} post={post} index={i} onClick={() => go('blog_'+BLOG_POSTS.indexOf(post))} />
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
