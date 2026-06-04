import React, { useState, useEffect, useRef } from 'react';
import CRSprite from './CRSprites.js';
import { motion, AnimatePresence } from 'framer-motion';
export { default as CRSprite } from './CRSprites.js';
export { default as CyberServiceCard } from './CyberServiceCard.js';

// ─── AURORA BACKGROUND ───────────────────────────────────────
export default function AuroraBackground() {
  return (
    <div className="aurora-bg">
      <motion.div className="aurora-blob" animate={{ x:[0,80,-60,0], y:[0,-40,50,0] }} transition={{ duration:18, repeat:Infinity, ease:'easeInOut' }}
        style={{ width:600, height:600, background:'radial-gradient(circle,rgba(0,201,255, 0.55),transparent)', top:-100, left:-100 }} />
      <motion.div className="aurora-blob" animate={{ x:[0,-60,40,0], y:[0,50,-40,0] }} transition={{ duration:22, repeat:Infinity, ease:'easeInOut' }}
        style={{ width:500, height:500, background:'radial-gradient(circle,rgba(0,82,255, 0.45),transparent)', bottom:-80, right:-80 }} />
      <motion.div className="aurora-blob" animate={{ x:[0,40,-40,0], y:[0,60,-60,0] }} transition={{ duration:16, repeat:Infinity, ease:'easeInOut' }}
        style={{ width:400, height:400, background:'radial-gradient(circle,rgba(79,255,176, 0.35),transparent)', top:'40%', left:'60%' }} />
      <motion.div className="aurora-blob" animate={{ x:[0,-30,30,0], y:[0,30,-30,0] }} transition={{ duration:20, repeat:Infinity, ease:'easeInOut' }}
        style={{ width:300, height:300, background:'radial-gradient(circle,rgba(255,215,0, 0.15),transparent)', top:'20%', left:'40%' }} />
    </div>
  );
}

export { default as CustomCursor } from './CustomCursor.js';

// ─── SCROLL PROGRESS ──────────────────────────────────────────
export function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setWidth((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

// ─── NAVBAR ───────────────────────────────────────────────────
export function Navbar({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const linksRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (activeRef.current && linksRef.current) {
      const rect = activeRef.current.getBoundingClientRect();
      const parent = linksRef.current.getBoundingClientRect();
      setIndicatorStyle({ left: rect.left - parent.left, width: rect.width });
    }
  }, [page]);

  const links = [['home','Home'],['services','Services'],['portfolio','Portfolio'],['pricing','Pricing'],['blog','Blog'],['about','About'],['contact','Contact']];
  const currentPage = page.startsWith('service_') ? 'services' : page.startsWith('blog_') ? 'blog' : page;

  return (
    <nav className={`navbar ${scrolled?'scrolled':''}`}>
      <div className="nav-inner">
        <motion.div className="brand" onClick={() => go('home')} whileHover={{scale: 1.02}} whileTap={{ scale: 0.98 }}>
          <AquronLogoCanvas size={42} />
          <div>
            <div className="brand-name">Aquron</div>
            <div className="brand-tag">Fluid Digital Solutions</div>
          </div>
        </motion.div>

        <div className="nav-links" ref={linksRef} style={{ display:'flex', gap:2, alignItems:'center', position:'relative' }}>
          <motion.div className="nav-indicator" style={indicatorStyle} layoutId="nav-indicator" />
          {links.map(([id, label]) => (
            <button key={id} className={`nav-btn ${currentPage===id?'active':''}`}
              ref={currentPage===id ? activeRef : null}
              onClick={() => { go(id); setMobileOpen(false); }}>
              {label}
            </button>
          ))}
          <motion.button className="btn-primary" style={{ marginLeft:12, padding:'9px 20px', fontSize:13 }}
            onClick={() => go('contact')} whileHover={{scale:1.05}} whileTap={{ scale:.97 }}>
            Hire Us →
          </motion.button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMobileOpen(v => !v)}
          className="ham-btn"
          style={{ display:'none', flexDirection:'column', gap:5, width:40, height:40, alignItems:'center', justifyContent:'center', background:'none', border:'1px solid rgba(0,201,255, 0.28)', borderRadius:9, cursor:'pointer' }}>
          {[0,1,2].map(i => (
            <motion.span key={i} style={{ display:'block', width:19, height:2, background:'rgba(255,255,255, 0.8)', borderRadius:2 }}
              animate={mobileOpen ? (i===0?{rotate:45,y:7}:i===2?{rotate:-45,y:-7}:{opacity:0}) : {rotate:0,y:0,opacity:1}} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
            style={{ background:'rgba(5,7,26, 0.97)', borderTop:'1px solid rgba(0,201,255, 0.12)', overflow:'hidden' }}>
            {links.map(([id,label],i) => (
              <motion.button key={id} initial={{ x:-20, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ delay:i*.04 }}
                onClick={() => { go(id); setMobileOpen(false); }}
                style={{ display:'block', width:'100%', textAlign:'left', background:'none', border:'none', borderBottom:'1px solid rgba(255,255,255, 0.05)', padding:'13px 28px', color: currentPage===id?'#00C9FF':'rgba(255,255,255, 0.72)', fontFamily:'Manrope,sans-serif', fontSize:15, cursor:'pointer' }}>
                {label}
              </motion.button>
            ))}
            <div style={{ padding:'14px 20px' }}>
              <button className="btn-primary" style={{ width:'100%', padding:13 }} onClick={() => { go('contact'); setMobileOpen(false); }}>Get Free Quote →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@media(max-width:768px){.nav-links{display:none!important}.ham-btn{display:flex!important}}`}</style>
    </nav>
  );
}

// ─── AQURON LOGO CANVAS ───────────────────────────────────────
export function AquronLogoCanvas({ size = 44 }) {
  const canvasRef = useRef(null);
  const t0Ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = size * 2, H = size * 2, cx = W/2, cy = H/2;
    canvas.width = W; canvas.height = H;
    canvas.style.width = size + 'px'; canvas.style.height = size + 'px';

    const draw = (ts) => {
      if (!t0Ref.current) t0Ref.current = ts;
      const elapsed = (ts - t0Ref.current) / 1000;
      ctx.clearRect(0, 0, W, H);
      const cyc = elapsed % 10, active = cyc < 3, phase = active ? cyc / 3 : 0;
      const a = phase * Math.PI * 4;

      // Glow bg
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, cx);
      grd.addColorStop(0, `rgba(0,201,255,${active ? 0.22 : 0.07})`);
      grd.addColorStop(1, 'rgba(0,201,255,0)');
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(cx, cy, cx, 0, Math.PI*2); ctx.fill();

      // Outer ring
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(elapsed * 0.25);
      ctx.strokeStyle = 'rgba(0,201,255,0.22)'; ctx.lineWidth = 1.8; ctx.setLineDash([20, 10]);
      ctx.beginPath(); ctx.arc(0, 0, cx * 0.82, 0, Math.PI*2); ctx.stroke();
      ctx.restore();

      // Inner ring
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-elapsed * 0.33);
      ctx.strokeStyle = 'rgba(0,82,255,0.18)'; ctx.lineWidth = 1.4; ctx.setLineDash([14, 10]);
      ctx.beginPath(); ctx.arc(0, 0, cx * 0.54, 0, Math.PI*2); ctx.stroke();
      ctx.restore();
      ctx.setLineDash([]);

      // Water drop
      ctx.beginPath();
      ctx.moveTo(cx, cy - cx * 0.6);
      ctx.bezierCurveTo(cx + cx*.46, cy - cx*.18, cx + cx*.42, cy + cx*.38, cx, cy + cx*.54);
      ctx.bezierCurveTo(cx - cx*.42, cy + cx*.38, cx - cx*.46, cy - cx*.18, cx, cy - cx*.6);
      const da = active ? 0.13 + phase * 0.07 : 0.08;
      const lg = ctx.createLinearGradient(cx - cx*.46, cy - cx*.6, cx + cx*.46, cy + cx*.54);
      lg.addColorStop(0, `rgba(0,201,255,${da})`); lg.addColorStop(1, `rgba(79,255,176,${da})`);
      ctx.fillStyle = lg; ctx.fill();
      const sa = active ? 0.9 + phase * 0.1 : 0.52;
      const lg2 = ctx.createLinearGradient(cx - cx*.46, cy - cx*.6, cx + cx*.46, cy + cx*.54);
      lg2.addColorStop(0, `rgba(0,201,255,${sa})`); lg2.addColorStop(1, `rgba(79,255,176,${sa})`);
      ctx.strokeStyle = lg2; ctx.lineWidth = 3.2; ctx.stroke();

      // Wave
      const wA = active ? (cx * 0.13 + Math.sin(phase * Math.PI * 2) * cx * 0.1) : 0;
      ctx.beginPath(); ctx.moveTo(cx - cx*.28, cy + cx*.08);
      ctx.quadraticCurveTo(cx - cx*.07, cy + cx*.08 - wA, cx, cy + cx*.08);
      ctx.quadraticCurveTo(cx + cx*.07, cy + cx*.08 + wA, cx + cx*.28, cy + cx*.08);
      ctx.strokeStyle = `rgba(0,82,255,${active ? 0.92 : 0.5})`; ctx.lineWidth = 3.8; ctx.stroke();

      // Letter A
      ctx.fillStyle = `rgba(0,201,255,${active ? 1 : 0.75})`;
      ctx.font = `bold ${cx * 0.52}px Sora,Georgia,serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('A', cx, cy + cx * 0.12);

      // Orbiting dots
      if (active) {
        const ox = Math.cos(a) * cx * 0.5, oy = Math.sin(a) * cx * 0.5;
        ctx.beginPath(); ctx.arc(cx + ox, cy + oy, cx * 0.1, 0, Math.PI*2);
        ctx.fillStyle = `rgba(79,255,176,${0.5 + Math.sin(a) * 0.42})`; ctx.fill();
        const a2 = a + 2.1;
        const ix = Math.cos(a2) * cx * 0.32, iy = Math.sin(a2) * cx * 0.32;
        ctx.beginPath(); ctx.arc(cx + ix, cy + iy, cx * 0.065, 0, Math.PI*2);
        ctx.fillStyle = `rgba(0,201,255,${0.42 + Math.cos(a2) * 0.3})`; ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size]);

  return <canvas ref={canvasRef} style={{ display:'block', flexShrink:0 }} />;
}

// ─── FOOTER ──────────────────────────────────────────────
function useGeoTime() {
  const [info, setInfo] = React.useState({ time: '', city: '', tz: '' });
  React.useEffect(() => {
    // Use public IP geolocation (no permission needed)
    const fetchGeo = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const d = await res.json();
        const tz = d.timezone || 'UTC';
        const city = d.city || d.country_name || '';
        const tick = () => {
          const now = new Date();
          const time = now.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: true });
          setInfo({ time, city, tz });
        };
        tick();
        const id = setInterval(tick, 1000);
        return id;
      } catch {
        // Fallback to browser local time
        const tick = () => {
          const t = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
          setInfo({ time: t, city: 'Your Location', tz: '' });
        };
        tick();
        const id = setInterval(tick, 1000);
        return id;
      }
    };
    let id;
    fetchGeo().then(i => { id = i; });
    return () => { if (id) clearInterval(id); };
  }, []);
  return info;
}

export function Footer({ go }) {
  const geo = useGeoTime();
  const year = new Date().getFullYear();
  const links = [['Web Development','services'],['Mobile Apps','services'],['E-Commerce','services'],['Digital Marketing','services'],['Payment Integration','services'],['Blog Platforms','services']];
  const company = [['About Us','about'],['Portfolio','portfolio'],['Pricing','pricing'],['Blog','blog'],['Contact','contact']];
  const socials = [
    { icon:'𝕏', col:'#1DA1F2', label:'Twitter',   href:'#' },
    { icon:'in', col:'#0A66C2', label:'LinkedIn',  href:'#' },
    { icon:'⌥',  col:'#fff',    label:'GitHub',    href:'#' },
    { icon:'◈',  col:'#E1306C', label:'Instagram', href:'#' },
  ];

  return (
    <footer style={{ position:'relative', zIndex:2 }}>
      <div style={{ position:'absolute', bottom:-100, left:'50%', transform:'translateX(-50%)', width:600, height:300, background:'radial-gradient(ellipse, rgba(0,201,255,0.07) 0%, transparent 70%)', pointerEvents:'none', animation:'floatB 8s ease-in-out infinite' }} />
      <div className="wrap" style={{ position:'relative', zIndex:1 }}>
        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1.1fr', gap:32, marginBottom:44 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, cursor:'pointer' }} onClick={() => go('home')}>
              <AquronLogoCanvas size={32} />
              <div>
                <div style={{ fontFamily:'Sora,sans-serif', fontSize:16, fontWeight:800, background:'linear-gradient(135deg,#00C9FF,#4FFFB0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Aquron</div>
                <div style={{ color:'rgba(0, 201, 255, 0.4)', fontSize:7.5, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase' }}>Fluid Digital Solutions</div>
              </div>
            </div>
            <p style={{ color:'rgba(255,255,255,0.38)', fontSize:13.5, lineHeight:1.82, marginBottom:20 }}>Crafting fluid digital experiences that flow seamlessly and deliver measurable results for bold brands worldwide.</p>
            {/* Geo time widget */}
            {geo.time && (
              <motion.div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(0, 201, 255, 0.06)', border:'1px solid rgba(0, 201, 255, 0.18)', borderRadius:10, padding:'6px 12px', marginBottom:16 }}
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
                <span style={{ fontSize:12 }}>📍</span>
                <div>
                  <span style={{ color:'#00C9FF', fontSize:12.5, fontWeight:700, fontFamily:'Sora,sans-serif' }}>{geo.time}</span>
                  {geo.city && <span style={{ color:'rgba(255,255,255,0.4)', fontSize:11, marginLeft:5 }}>in {geo.city}</span>}
                </div>
              </motion.div>
            )}
            <div style={{ display:'flex', gap:9 }}>
              {socials.map((s, i) => (
                <motion.a key={i} href={s.href} title={s.label} style={{ width:36, height:36, borderRadius:9, background:'rgba(255,255,255,0.04)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.6)', fontSize:13, fontWeight:800, border:'1px solid rgba(255,255,255,0.07)', cursor:'pointer', textDecoration:'none' }}
                  whileHover={{ y:-4, scale:1.1 }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontWeight:700, marginBottom:14, fontSize:12.5, textTransform:'uppercase', letterSpacing:'1px' }}>Services</p>
            {links.map(([l,p]) => (
              <motion.p key={l} onClick={() => go(p)} style={{ color:'rgba(255,255,255,0.38)', fontSize:13.5, marginBottom:8, cursor:'pointer' }} whileHover={{ x:5 }}>{l}</motion.p>
            ))}
          </div>
          <div>
            <p style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontWeight:700, marginBottom:14, fontSize:12.5, textTransform:'uppercase', letterSpacing:'1px' }}>Company</p>
            {company.map(([l,p]) => (
              <motion.p key={l} onClick={() => go(p)} style={{ color:'rgba(255,255,255,0.38)', fontSize:13.5, marginBottom:8, cursor:'pointer' }} whileHover={{ x:5 }}>{l}</motion.p>
            ))}
          </div>
          <div>
            <p style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontWeight:700, marginBottom:14, fontSize:12.5, textTransform:'uppercase', letterSpacing:'1px' }}>Contact</p>
            <p style={{ color:'rgba(255,255,255,0.38)', fontSize:13.5, marginBottom:8 }}>✉️ work2sayan@gmail.com</p>
            <p style={{ color:'rgba(255,255,255,0.38)', fontSize:13.5, marginBottom:8 }}>📍 Kolkata, India</p>
            <p style={{ color:'rgba(255,255,255,0.38)', fontSize:13.5 }}>🌐 Mon-Sat 9AM-8PM IST</p>
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:20, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
          {/* Auto-updating year via JS */}
          <p style={{ color:'rgba(255,255,255,0.22)', fontSize:12.5 }}>
            &copy; {year} Aquron Digital Agency. All rights reserved. Kolkata, India.
          </p>
          <p style={{ color:'rgba(255,255,255,0.22)', fontSize:12.5 }}>Built with precision &middot; Delivered with care</p>
        </div>
      </div>
    </footer>
  );
}


// ─── ANIMATED PROCESS STEPS ───────────────────────────────────
export function AnimProcess({ steps, col }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      const cur = i % steps.length;
      setActive(cur);
          i++;
    }, 1100);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div className="proc-wrap">
      {steps.map((s, i) => (
        <div key={i} className={`proc-step ${active === i ? 'active' : ''}`}>
          {i < steps.length - 1 && (
            <div className="proc-line">
              <motion.div className="proc-line-fill" animate={{ width: i < active ? '100%' : '0%' }} transition={{ duration: 0.65 }} />
            </div>
          )}
          <motion.div className={`proc-dot ${active === i ? 'active' : ''}`} animate={active === i ? { scale: 1.25 } : { scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
            <span className="proc-num">{i + 1}</span>
          </motion.div>
          <p className="proc-label">{s}</p>
        </div>
      ))}
    </div>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────
export function Marquee({ items, dir = 'left' }) {
  const doubled = [...items, ...items];
  return (
    <div className="marq-wrap">
      <div className={dir === 'left' ? 'marq-L' : 'marq-R'} style={{ display:'flex', gap:14, width:'max-content', animation:`${dir==='left'?'marqL':'marqR'} 90s linear infinite` }}>
        {doubled.map((r, i) => (
          <div key={i} className="rcard" style={{ cursor:'default' }}>
            <div style={{ color:'#4FFFB0', fontSize:11.5, marginBottom:8 }}>★★★★★</div>
            <div style={{ color:'rgba(255,255,255, 0.68)', fontSize:12.5, lineHeight:1.78, marginBottom:10 }}>"{r.q}"</div>
            <div style={{ color:'#fff', fontWeight:600, fontSize:12.5, fontFamily:'Sora,sans-serif' }}>{r.n}</div>
            <div style={{ color:'rgba(255,255,255, 0.3)', fontSize:11.5 }}>{r.r}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CR CHARACTER CARD ─────────────────────────────────────────
export function CRCharCard({ char, service, onClick, delay = 0 }) {
  const rarityColors = { legendary:'rarity-legendary', epic:'rarity-epic', rare:'rarity-rare', common:'rarity-common' };
  return (
    <motion.div className="cr-char-card" onClick={onClick}
      initial={{ opacity:0, y:40, scale:.9 }} animate={{ opacity:1, y:0, scale:1 }}
      transition={{ delay, duration:.5, type:'spring', stiffness:200 }}
      whileHover={{y:-10, scale:1.04}} whileTap={{ scale:.97 }}>
      {/* CR-style elixir cost */}
      {char.elixir > 0 && (
        <div style={{ position:'absolute', top:12, right:12, width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#9b59b6,#7b2d8b)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:'#fff', boxShadow:'0 0 10px rgba(155,89,182, 0.6)', fontFamily:'Sora,sans-serif' }}>
          {char.elixir}
        </div>
      )}
      {char.elixir === 0 && (
        <div style={{ position:'absolute', top:12, right:12, fontSize:11, fontWeight:800, color:'#FFD700', fontFamily:'Sora,sans-serif', letterSpacing:1 }}>
          LEGEND
        </div>
      )}
      <motion.span style={{ fontSize:52, display:'block', marginBottom:12, filter:'drop-shadow(0 4px 12px rgba(0,0,0, 0.5))' }}
        animate={{ y:[0,-6,0] }} transition={{ duration:2.5+delay, repeat:Infinity, ease:'easeInOut' }}>
        {char.emoji}
      </motion.span>
      <span className={`cr-rarity ${rarityColors[char.rarity]||'rarity-common'}`}>{char.rarity}</span>
      <h3 style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontSize:15, fontWeight:800, marginBottom:4, letterSpacing:'-.3px' }}>{char.name}</h3>
      <p style={{ color:'rgba(255,255,255, 0.5)', fontSize:12, marginBottom:10, lineHeight:1.5 }}>{char.tagline}</p>
      {service && <p style={{ color:'var(--c1)', fontSize:12, fontWeight:700 }}>{service.title} →</p>}
    </motion.div>
  );
}

// ─── USE SCROLL REVEAL HOOK ───────────────────────────────────
export function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold, rootMargin:'0px 0px -40px 0px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── SCROLL REVEAL WRAPPER ────────────────────────────────────
export function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, visible] = useScrollReveal();
  const variants = {
    hidden: { opacity:0, y: direction==='up'?32:direction==='down'?-32:0, x: direction==='left'?-40:direction==='right'?40:0, scale: direction==='scale'?.85:1 },
    visible: { opacity:1, y:0, x:0, scale:1 }
  };
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={visible?'visible':'hidden'}
      transition={{ duration:.65, delay, ease:[0.16,1,0.3,1] }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── PORTFOLIO CARD WITH MODAL ─────────────────────────────────
export function PortfolioCard({ p, onClick, delay = 0 }) {
  return (
    <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay, type:'spring', stiffness:180 }}
      onClick={onClick} style={{ background:'rgba(255,255,255, 0.035)', border:'1px solid rgba(0,201,255, 0.12)', borderRadius:18, overflow:'hidden', cursor:'pointer' }}
      whileHover={{y:-9, boxShadow:'0 22px 50px rgba(0,201,255, 0.14)'}}>
      <div style={{ height:148, background:`linear-gradient(135deg,${p.col}22,${p.col}08)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:58, position:'relative', overflow:'hidden' }}>
        <motion.span whileHover={{scale:1.25}} style={{ display:'block', position:'relative', zIndex:1, filter:'drop-shadow(0 4px 16px rgba(0,0,0, 0.4))' }}>{p.em}</motion.span>
        <div style={{ position:'absolute', top:10, right:10, background:p.col, color:'#030412', fontSize:10.5, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>{p.cat}</div>
        {p.link && <a href={p.link} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{ position:'absolute', bottom:8, left:10, background:'rgba(0,0,0, 0.62)', color:'#fff', fontSize:10.5, fontWeight:600, padding:'3px 9px', borderRadius:6, textDecoration:'none', border:'1px solid rgba(255,255,255, 0.15)' }}>↗ Live</a>}
      </div>
      <div style={{ padding:20 }}>
        <h3 style={{ fontFamily:'Sora,sans-serif', color:'#fff', fontSize:15.5, fontWeight:700, marginBottom:4, letterSpacing:'-.3px' }}>{p.title}</h3>
        <p style={{ color:'rgba(255,255,255, 0.32)', fontSize:11.5, marginBottom:9 }}>{p.tech}</p>
        <p style={{ color:'rgba(255,255,255, 0.58)', fontSize:12.5, lineHeight:1.65, marginBottom:11 }}>{p.desc}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
          {p.res.map(r => <span key={r} style={{ background:'rgba(79,255,176, 0.07)', color:'#4FFFB0', fontSize:10.5, fontWeight:600, padding:'2px 8px', borderRadius:20 }}>✓ {r}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────
export function SectionHeader({ label, title, sub, labelColor, center = true }) {
  return (
    <Reveal>
      <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 52 }}>
        {label && <p className="section-label" style={{ color: labelColor || 'var(--c1)' }}>{label}</p>}
        <h2 className="section-title">{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
      </div>
    </Reveal>
  );
}

// ─── CR CARD (no name, SVG sprite) ───────────────────────────

export function CRCharCardV2({ char, service, onClick, delay = 0 }) {
  const rarityColors = {
    legendary: { bg:'rgba(255,165,0, 0.15)', color:'#FFD700', border:'rgba(255,215,0, 0.4)' },
    epic:      { bg:'rgba(123,45,139, 0.25)', color:'#da77f2', border:'rgba(218,119,242, 0.35)' },
    rare:      { bg:'rgba(26,79,216, 0.25)',  color:'#74b9ff', border:'rgba(116,185,255, 0.35)' },
    common:    { bg:'rgba(255,255,255, 0.07)',color:'rgba(255,255,255, 0.65)', border:'rgba(255,255,255, 0.18)' },
  };
  const rc = rarityColors[char.rarity] || rarityColors.common;

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity:0, y:40, scale:.9 }}
      animate={{ opacity:1, y:0, scale:1 }}
      transition={{ delay, duration:.5, type:'spring', stiffness:200 }}
      whileHover={{y:-10, scale:1.04}}
      whileTap={{ scale:.97 }}
      style={{
        background:`linear-gradient(155deg, rgba(0,0,0, 0.5), rgba(${
          char.col==='#00C9FF'?'0,201,255':char.col==='#4FFFB0'?'79,255,176':char.col==='#7c3aed'?'124,58,237':char.col==='#FFD700'?'255,215,0':'255,159,67'
        }, 0.08))`,
        border:`1px solid ${char.col}44`,
        borderRadius:18,
        padding:'20px 16px 18px',
        cursor:'pointer',
        position:'relative',
        overflow:'hidden',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        textAlign:'center',
        backdropFilter:'blur(4px)',
        boxShadow:`0 4px 20px rgba(0,0,0, 0.4)`,
      }}
    >
      {/* CR card top shine */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${char.col}aa, transparent)`, borderRadius:'18px 18px 0 0' }} />

      {/* Elixir cost badge */}
      {char.elixir > 0 ? (
        <div style={{ position:'absolute', top:10, right:10, width:26, height:26, borderRadius:'50%', background:'linear-gradient(135deg,#9b59b6,#7b2d8b)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:'#fff', boxShadow:'0 0 10px rgba(155,89,182, 0.7)', fontFamily:'Sora,sans-serif', zIndex:2 }}>{char.elixir}</div>
      ) : (
        <div style={{ position:'absolute', top:10, right:10, fontSize:9, fontWeight:800, color:'#FFD700', fontFamily:'Sora,sans-serif', letterSpacing:'.5px', textShadow:'0 0 8px rgba(255,215,0, 0.8)', zIndex:2 }}>LEGEND</div>
      )}

      {/* Rarity badge */}
      <div style={{ display:'inline-block', background:rc.bg, color:rc.color, border:`1px solid ${rc.border}`, borderRadius:20, padding:'2px 10px', fontSize:9, fontWeight:800, letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:10, zIndex:1 }}>{char.rarity}</div>

      {/* SVG Sprite -- no name shown */}
      <div style={{ position:'relative', zIndex:1, filter:`drop-shadow(0 8px 20px ${char.glowCol||char.col+'99'})` }}>
        <CRSprite id={service?.id || ''} size={80} />
      </div>

      {/* Tagline only, no character name */}
      <p style={{ color:'rgba(255,255,255, 0.55)', fontSize:11.5, marginBottom:10, lineHeight:1.45, zIndex:1 }}>{char.tagline}</p>

      {service && (
        <p style={{ color:char.col, fontSize:12, fontWeight:700, zIndex:1, fontFamily:'Sora,sans-serif' }}>
          {service.title} →
        </p>
      )}

      {/* Bottom glow */}
      <div style={{ position:'absolute', bottom:-10, left:'50%', transform:'translateX(-50%)', width:60, height:30, background:`radial-gradient(ellipse, ${char.col}44, transparent)`, borderRadius:'50%' }} />
    </motion.div>
  );
}
