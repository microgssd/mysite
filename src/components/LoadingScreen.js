import React, { useEffect, useRef, useState } from 'react';

// Reuses the AquronLogoCanvas drawing logic inline for the loading screen
function AquronLoaderCanvas({ size }) {
  const canvasRef = useRef(null);
  const t0Ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = size * 2, H = size * 2, cx = W / 2, cy = H / 2;
    canvas.width = W; canvas.height = H;
    canvas.style.width = size + 'px'; canvas.style.height = size + 'px';

    const draw = (ts) => {
      if (!t0Ref.current) t0Ref.current = ts;
      const elapsed = (ts - t0Ref.current) / 1000;
      ctx.clearRect(0, 0, W, H);
      const cyc = elapsed % 10, active = cyc < 3, phase = active ? cyc / 3 : 0;

      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, cx);
      grd.addColorStop(0, `rgba(0,201,255,${active ? 0.22 : 0.07})`);
      grd.addColorStop(1, 'rgba(0,201,255,0)');
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(cx, cy, cx, 0, Math.PI * 2); ctx.fill();

      ctx.save(); ctx.translate(cx, cy); ctx.rotate(elapsed * 0.25);
      ctx.strokeStyle = 'rgba(0,201,255,0.3)'; ctx.lineWidth = 2; ctx.setLineDash([20, 10]);
      ctx.beginPath(); ctx.arc(0, 0, cx * 0.82, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();

      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-elapsed * 0.4);
      ctx.strokeStyle = 'rgba(79,255,176,0.2)'; ctx.lineWidth = 1.5; ctx.setLineDash([14, 10]);
      ctx.beginPath(); ctx.arc(0, 0, cx * 0.54, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(cx, cy - cx * 0.6);
      ctx.bezierCurveTo(cx + cx * .46, cy - cx * .18, cx + cx * .42, cy + cx * .38, cx, cy + cx * .54);
      ctx.bezierCurveTo(cx - cx * .42, cy + cx * .38, cx - cx * .46, cy - cx * .18, cx, cy - cx * .6);
      const da = active ? 0.13 + phase * 0.07 : 0.08;
      const lg = ctx.createLinearGradient(cx - cx * .46, cy - cx * .6, cx + cx * .46, cy + cx * .54);
      lg.addColorStop(0, `rgba(0,201,255,${da})`); lg.addColorStop(1, `rgba(79,255,176,${da})`);
      ctx.fillStyle = lg; ctx.fill();
      const sa = active ? 0.9 + phase * 0.1 : 0.52;
      const sg = ctx.createLinearGradient(cx - cx * .46, cy - cx * .6, cx + cx * .46, cy + cx * .54);
      sg.addColorStop(0, `rgba(0,201,255,${sa})`); sg.addColorStop(1, `rgba(79,255,176,${sa * 0.8})`);
      ctx.strokeStyle = sg; ctx.lineWidth = 1.8; ctx.stroke();

      ctx.font = `bold ${cx * 0.54}px Orbitron, monospace`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const tg = ctx.createLinearGradient(cx - cx * .3, cy - cx * .2, cx + cx * .3, cy + cx * .2);
      tg.addColorStop(0, `rgba(0,201,255,${active ? 0.95 : 0.72})`);
      tg.addColorStop(1, `rgba(79,255,176,${active ? 0.9 : 0.65})`);
      ctx.fillStyle = tg;
      ctx.shadowColor = active ? `rgba(0,201,255,${0.6 + phase * 0.4})` : 'rgba(0,201,255,0.28)';
      ctx.shadowBlur = active ? 18 + phase * 24 : 8;
      ctx.fillText('A', cx, cy + cx * 0.06);
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size]);

  return <canvas ref={canvasRef} style={{ display:'block' }} />;
}

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | revealing | done

  useEffect(() => {
    // Animate progress bar 0→100 over ~1.8s
    let start = null;
    const duration = 1800;
    const raf = requestAnimationFrame(function tick(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        // Start reveal exit
        setPhase('revealing');
        setTimeout(() => {
          setPhase('done');
          onDone();
        }, 700);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#030810',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'revealing' ? 0 : 1,
      transform: phase === 'revealing' ? 'scale(1.04)' : 'scale(1)',
      transition: 'opacity 0.65s ease, transform 0.65s ease',
      overflow: 'hidden',
    }}>
      {/* Circuit board background */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.12, pointerEvents:'none' }}>
        <defs>
          <pattern id="lg-circuit" width="80" height="80" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="80" y2="0" stroke="rgba(0,201,255,0.4)" strokeWidth="0.5"/>
            <line x1="0" y1="0" x2="0" y2="80" stroke="rgba(0,201,255,0.4)" strokeWidth="0.5"/>
            <line x1="20" y1="0" x2="20" y2="20" stroke="rgba(0,201,255,0.6)" strokeWidth="0.7"/>
            <line x1="20" y1="20" x2="40" y2="20" stroke="rgba(0,201,255,0.6)" strokeWidth="0.7"/>
            <line x1="60" y1="0" x2="60" y2="40" stroke="rgba(79,255,176,0.5)" strokeWidth="0.7"/>
            <line x1="60" y1="40" x2="80" y2="40" stroke="rgba(79,255,176,0.5)" strokeWidth="0.7"/>
            <circle cx="20" cy="20" r="2" fill="rgba(0,201,255,0.7)"/>
            <circle cx="60" cy="40" r="2" fill="rgba(79,255,176,0.6)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lg-circuit)"/>
      </svg>

      {/* Glow orb behind logo */}
      <div style={{
        position: 'absolute',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,201,255,0.12) 0%, transparent 70%)',
        animation: 'aurora1 4s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>

      {/* Logo */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <AquronLoaderCanvas size={120} />
      </div>

      {/* Brand name */}
      <div style={{
        fontFamily: 'Orbitron, monospace',
        fontSize: 'clamp(20px, 4vw, 32px)',
        fontWeight: 900,
        letterSpacing: 'clamp(4px, 1vw, 10px)',
        background: 'linear-gradient(135deg, #00C9FF, #4FFFB0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: 8,
        textShadow: 'none',
      }}>
        AQURON
      </div>

      <div style={{
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: 'clamp(10px, 1.5vw, 13px)',
        color: 'rgba(0,201,255,0.5)',
        letterSpacing: 'clamp(2px, 0.5vw, 4px)',
        textTransform: 'uppercase',
        marginBottom: 40,
      }}>
        Fluid Digital Solutions
      </div>

      {/* Progress bar container */}
      <div style={{
        width: 'clamp(200px, 40vw, 320px)',
        height: 2,
        background: 'rgba(0,201,255,0.12)',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 12,
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #00C9FF, #4FFFB0)',
          borderRadius: 2,
          transition: 'width 0.05s linear',
          boxShadow: '0 0 8px rgba(0,201,255,0.6)',
        }}/>
        {/* Shimmer */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, width: 40,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          left: `${progress}%`,
          transform: 'translateX(-50%)',
          borderRadius: 2,
        }}/>
      </div>

      {/* Progress counter */}
      <div style={{
        fontFamily: 'Orbitron, monospace',
        fontSize: 11,
        color: 'rgba(0,201,255,0.45)',
        letterSpacing: 2,
      }}>
        {String(progress).padStart(3, '0')}%
      </div>

      {/* Scan line sweep */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(0,201,255,0.15), transparent)',
        animation: 'scanDown 3s linear infinite',
        pointerEvents: 'none',
      }}/>
    </div>
  );
}
