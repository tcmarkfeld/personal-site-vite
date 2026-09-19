import { useEffect, useRef } from 'react';

export function ThinkingOrb({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number | undefined;
    let visible = false;
    let time = 0;

    function paint() {
      if (!ctx) return;
      ctx.clearRect(0, 0, 240, 240);
      ctx.fillStyle = dark ? '#ece6d9' : '#263b38';
      const tilt = 0.9 + Math.sin(time * 0.6) * 0.35;
      const turn = Math.sin(time * 0.35) * 0.45;
      const breath = 1 + Math.sin(time * 0.8) * 0.06;

      // Each dot moves around the tube as the ring bends and changes tilt.
      for (let ring = 0; ring < 32; ring++) {
        const u = (ring / 32) * Math.PI * 2 + time * 0.18;
        for (let dot = 0; dot < 16; dot++) {
          const v = (dot / 16) * Math.PI * 2 + time * 0.5;
          const radius = 57 + 25 * Math.cos(v);
          const x = Math.cos(u) * radius;
          const y = Math.sin(u) * radius;
          const z = 25 * Math.sin(v) + Math.sin(u * 2 + time * 0.7) * 8;
          const tiltedY = y * Math.cos(tilt) - z * Math.sin(tilt);
          const tiltedZ = y * Math.sin(tilt) + z * Math.cos(tilt);
          const turnedX = x * Math.cos(turn) + tiltedZ * Math.sin(turn);
          const depth = -x * Math.sin(turn) + tiltedZ * Math.cos(turn);
          const perspective = 300 / (300 - depth);
          ctx.globalAlpha = 0.15 + ((depth + 95) / 190) * 0.85;
          ctx.beginPath();
          ctx.arc(
            120 + turnedX * perspective * breath,
            120 + tiltedY * perspective * breath,
            1.15 * perspective,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      time += 1 / 24;
      paint();
      timer = window.setTimeout(tick, 1000 / 24);
    }

    function updateMotion() {
      window.clearTimeout(timer);
      if (preference.matches) {
        time = 0;
        paint();
      } else if (visible && !document.hidden) {
        timer = window.setTimeout(tick, 1000 / 24);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateMotion();
    });
    observer.observe(canvas);
    document.addEventListener('visibilitychange', updateMotion);
    preference.addEventListener('change', updateMotion);
    paint();
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateMotion);
      preference.removeEventListener('change', updateMotion);
    };
  }, [dark]);

  return <canvas ref={canvasRef} width="240" height="240" className="thinking-orb" />;
}
