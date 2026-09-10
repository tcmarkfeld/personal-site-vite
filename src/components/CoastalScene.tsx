import { useEffect, useRef } from 'react';

const cloudPaths = [
  'M380 350c15-23 41-28 65-16 8-35 55-48 81-18 28-14 60 0 63 23 34-10 64 0 76 20H380Z',
  'M730 210c25-25 47-22 65-13 8-39 57-51 89-18 25-12 60 0 65 23 27-8 57 0 74 21H730Z',
  'M900 380c22-20 42-19 59-10 7-32 48-39 69-15 29-20 63-9 73 17 30-10 50 0 62 17H900Z',
];

export function CoastalScene({ dark }: { dark: boolean }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frondRef = useRef<HTMLImageElement>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const frond = frondRef.current;
    if (!scene || !canvas || !frond) return;
    // Keep a static scene on Gecko, where scene compositing stalls interaction.
    if (CSS.supports('-moz-appearance', 'none')) return;
    scene.dataset.motionMode = 'scene';
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const clouds = cloudPaths.map((path) => new Path2D(path));
    const birds = new Path2D('M0 0q7-5 14 0 7-5 14 0m22-12q5-4 10 0 5-4 10 0');
    const palm = document.createElement('canvas');
    palm.width = 0;
    let timer: number | undefined;
    let inView = false;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let palmX = 0;
    let palmY = 0;
    let palmWidth = 0;
    let palmHeight = 0;

    function paint() {
      if (!ctx || !canvas || !scene || !palm.width || !width) return;
      const time = timeRef.current;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      // Match the painting's cover crop, including the mobile offset.
      const mobile = width <= 600;
      const viewportWidth = width * (mobile ? 1.55 : 1);
      const scale = Math.max(viewportWidth / 1536, height / 1024);
      ctx.translate(
        (viewportWidth - 1536 * scale) / 2 - (mobile ? width * 0.55 : 0),
        (height - 1024 * scale) / 2,
      );
      ctx.scale(scale, scale);
      ctx.save();
      ctx.translate(Math.sin(time / 30) * 45, 0);
      const gradient = ctx.createLinearGradient(0, 170, 0, 390);
      gradient.addColorStop(0, dark ? '#fffdf006' : '#fffdf018');
      gradient.addColorStop(1, '#fffdf000');
      ctx.fillStyle = gradient;
      clouds.forEach((path) => ctx.fill(path));
      ctx.restore();
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#fff6d9';
      // Small reflections only; never resample the landscape or shoreline.
      for (let i = 0; i < 16; i++) {
        const x = 45 + ((i * 113) % 400);
        const y = 570 + ((i * 37) % 220);
        const span = 12 + (y - 555) * 0.1;
        ctx.globalAlpha =
          Math.max(0, Math.sin(time / (1.5 + (i % 3)) + i)) * 0.2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + span / 2, y - 1.5, x + span, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
      ctx.save();
      // Cross the visible viewport, above the heading, and wrap only offscreen.
      const birdScale = mobile ? 1 : 0.9;
      const flockWidth = 70 * birdScale;
      const progress = (time / (mobile ? 26 : 40) + 0.25) % 1;
      ctx.translate(
        progress * (width + flockWidth * 2) - flockWidth,
        (mobile ? 68 : 76) + Math.sin(time / 3) * 2,
      );
      ctx.scale(birdScale, birdScale);
      ctx.strokeStyle = dark ? '#9eafa5' : '#355654';
      ctx.lineWidth = 2;
      ctx.stroke(birds);
      ctx.restore();
      ctx.save();
      ctx.translate(palmX + palmWidth, palmY + palmHeight * 0.15);
      ctx.rotate((Math.sin(time / 4) * 3 * Math.PI) / 180);
      ctx.globalAlpha = mobile ? 0.25 : 0.5;
      ctx.drawImage(
        palm,
        -palmWidth,
        -palmHeight * 0.15,
        palmWidth,
        palmHeight,
      );
      ctx.restore();
      if (scene.dataset.ready !== 'true') scene.dataset.ready = 'true';
    }

    function tick() {
      timeRef.current += 1 / 24;
      paint();
      timer = window.setTimeout(tick, Math.ceil(1000 / 24));
    }

    function updateMotion() {
      window.clearTimeout(timer);
      const active = inView && !document.hidden && !preference.matches;
      scene!.dataset.active = String(active);
      if (!active) return;
      // A timer avoids waking on every 60/120 Hz display frame.
      timer = window.setTimeout(tick, Math.ceil(1000 / 24));
    }

    function resize() {
      if (!scene || !canvas || !frond || !frond.naturalWidth) return;
      const bounds = scene.getBoundingClientRect();
      const leaf = frond.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;
      // Bound raster work on Retina screens and large desktop windows.
      ratio = Math.min(devicePixelRatio, 1.25, 1440 / width, 1080 / height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      palmX = leaf.left - bounds.left;
      palmY = leaf.top - bounds.top;
      palmWidth = leaf.width;
      palmHeight = leaf.height;
      palm.width = Math.min(640, Math.ceil(palmWidth * ratio));
      palm.height = Math.round(
        (palm.width * frond.naturalHeight) / frond.naturalWidth,
      );
      const cache = palm.getContext('2d');
      if (!cache) return;
      cache.filter = dark ? 'brightness(0.55) saturate(0.7)' : 'none';
      cache.drawImage(frond, 0, 0, palm.width, palm.height);
      paint();
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateMotion();
    });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(scene);
    resizeObserver.observe(scene);
    frond.addEventListener('load', resize);
    document.addEventListener('visibilitychange', updateMotion);
    preference.addEventListener('change', updateMotion);
    resize();
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      resizeObserver.disconnect();
      frond.removeEventListener('load', resize);
      document.removeEventListener('visibilitychange', updateMotion);
      preference.removeEventListener('change', updateMotion);
    };
  }, [dark]);

  return (
    <div className="coastal-scene" ref={sceneRef} aria-hidden="true">
      <img
        className="coastal-painting"
        src={dark ? '/coastal-observatory-night.webp' : '/coastal-observatory.jpg'}
        alt=""
        fetchPriority="high"
      />
      <img
        className="coastal-frond"
        ref={frondRef}
        src="/coastal-frond.png"
        alt=""
      />
      <div className="coastal-shade" />
      <canvas className="coastal-motion" ref={canvasRef} />
    </div>
  );
}
