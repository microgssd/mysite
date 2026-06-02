import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring   = ringRef.current;
    if (!cursor || !ring) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let hover   = false;
    let clicking = false;
    let raf;

    // ── particle pool (canvas-drawn, zero React overhead) ──
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99988;width:100vw;height:100vh;';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const particles = [];
    const COLS = ['#00C9FF','#4FFFB0','#FFD700','#00C9FF','#4FFFB0'];
    let pid = 0;

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      // spawn particle every move
      particles.push({ x: mx, y: my, born: performance.now(),
        col: COLS[pid++ % COLS.length], size: 6 });
    };

    const onDown = () => { clicking = true;  };
    const onUp   = () => { clicking = false; };

    const setHover = (on) => {
      hover = on;
    };

    // ── delegation: single listener on document ──
    const onEnter = (e) => {
      const t = e.target;
      if (t.matches('button,a,input,select,textarea,[role="button"]')) setHover(true);
    };
    const onLeave = (e) => {
      const t = e.target;
      if (t.matches('button,a,input,select,textarea,[role="button"]')) setHover(false);
    };
    document.addEventListener('mouseover',  onEnter, true);
    document.addEventListener('mouseout',   onLeave, true);
    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);

    // ── RAF loop ──
    const loop = (now) => {
      // lag
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;

      // cursor dot position
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';

      // ring position
      ring.style.left = Math.round(rx) + 'px';
      ring.style.top  = Math.round(ry) + 'px';

      // cursor dot appearance  – CSS class swap only
      const scale   = clicking ? 0.55 : hover ? 1.7 : 1.0;
      const color   = hover    ? '#FFD700' : '#00C9FF';
      cursor.style.transform = `translate(-50%,-50%) scale(${scale})`;
      cursor.children[0].setAttribute('data-hover', hover ? '1' : '0');
      // update SVG stroke color via CSS variable
      cursor.style.setProperty('--cc', color);
      ring.style.setProperty('--rc', hover ? '#FFD700' : 'rgba(0,201,255,0.7)');

      // particles canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const alive = [];
      for (const p of particles) {
        const age = (now - p.born) / 500;   // 0→1 over 500ms
        if (age >= 1) continue;
        alive.push(p);
        const op  = (1 - age) * 0.75;
        const sz  = p.size * (1 - age * 0.6);
        ctx.save();
        ctx.globalAlpha = op;
        ctx.shadowBlur  = sz * 2;
        ctx.shadowColor = p.col;
        ctx.fillStyle   = p.col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      particles.length = 0;
      particles.push(...alive);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mouseover',  onEnter, true);
      document.removeEventListener('mouseout',   onLeave, true);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      canvas.remove();
    };
  }, []);

  return (
    <>
      {/* ── crosshair dot ── */}
      <div ref={cursorRef} style={{
        position:'fixed', left:-200, top:-200,
        width:22, height:22,
        pointerEvents:'none', zIndex:99999,
        transform:'translate(-50%,-50%)',
        transition:'transform 0.15s cubic-bezier(0.34,1.56,0.64,1)',
        '--cc':'#00C9FF',
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22" style={{ overflow:'visible' }}>
          {/* crosshair arms */}
          <line x1="11" y1="0"  x2="11" y2="6"  stroke="var(--cc)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="11" y1="16" x2="11" y2="22" stroke="var(--cc)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="0"  y1="11" x2="6"  y2="11" stroke="var(--cc)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="16" y1="11" x2="22" y2="11" stroke="var(--cc)" strokeWidth="2" strokeLinecap="round"/>
          {/* rotated center diamond */}
          <rect x="8" y="8" width="6" height="6" rx="1"
            fill="var(--cc)" transform="rotate(45 11 11)"/>
          {/* corner ticks */}
          <line x1="2.5"  y1="2.5"  x2="5.5"  y2="5.5"  stroke="#4FFFB0" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
          <line x1="19.5" y1="2.5"  x2="16.5" y2="5.5"  stroke="#4FFFB0" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
          <line x1="2.5"  y1="19.5" x2="5.5"  y2="16.5" stroke="#4FFFB0" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
          <line x1="19.5" y1="19.5" x2="16.5" y2="16.5" stroke="#4FFFB0" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
        </svg>
      </div>

      {/* ── lagging diamond ring ── */}
      <div ref={ringRef} style={{
        position:'fixed', left:-200, top:-200,
        width:44, height:44,
        pointerEvents:'none', zIndex:99995,
        transform:'translate(-50%,-50%)',
        '--rc':'rgba(0,201,255,0.7)',
      }}>
        <svg width="44" height="44" viewBox="0 0 44 44" style={{ animation:'cursorSpin 3s linear infinite', transformOrigin:'22px 22px' }}>
          {/* rotating dashed diamond */}
          <rect x="10" y="10" width="24" height="24" rx="3"
            fill="none" stroke="var(--rc)" strokeWidth="1.5"
            strokeDasharray="8 4"
            transform="rotate(45 22 22)"
          />
        </svg>
        {/* counter-spin inner ring */}
        <svg width="44" height="44" viewBox="0 0 44 44" style={{ position:'absolute', inset:0, animation:'cursorSpinR 6s linear infinite', transformOrigin:'22px 22px' }}>
          <circle cx="22" cy="22" r="17" fill="none"
            stroke="rgba(0,201,255,0.25)" strokeWidth="0.8"
            strokeDasharray="4 6"
          />
        </svg>
        {/* cardinal dots */}
        {[0,90,180,270].map(deg => (
          <div key={deg} style={{
            position:'absolute', width:4, height:4, borderRadius:'50%',
            background:'#4FFFB0', boxShadow:'0 0 5px #4FFFB0',
            top:'50%', left:'50%',
            transform:`translate(-50%,-50%) rotate(${deg}deg) translateY(-20px)`,
          }}/>
        ))}
      </div>

      <style>{`
        * { cursor: none !important; }
        @keyframes cursorSpin  { to { transform: rotate(360deg);  } }
        @keyframes cursorSpinR { to { transform: rotate(-360deg); } }
      `}</style>
    </>
  );
}
