import { useEffect, useRef } from 'react';

const CHARACTERS = ' .,:;+*xX#%@';
const CELL_WIDTH = 18;
const CELL_HEIGHT = 26;
const TRAIL_RADIUS = 54;
const RIPPLE_DURATION = 1.25;

type Point = {
  x: number;
  y: number;
};

type Ripple = Point & {
  age: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function smoothstep(minimum: number, maximum: number, value: number) {
  const progress = clamp((value - minimum) / (maximum - minimum), 0, 1);
  return progress * progress * (3 - 2 * progress);
}

function distanceToSegment(
  x: number,
  y: number,
  start: Point,
  end: Point,
) {
  const segmentX = end.x - start.x;
  const segmentY = end.y - start.y;
  const lengthSquared = segmentX * segmentX + segmentY * segmentY;

  if (lengthSquared === 0) {
    return Math.hypot(x - end.x, y - end.y);
  }

  const progress = clamp(
    ((x - start.x) * segmentX + (y - start.y) * segmentY) /
      lengthSquared,
    0,
    1,
  );

  return Math.hypot(
    x - (start.x + segmentX * progress),
    y - (start.y + segmentY * progress),
  );
}

function hexDistance(x: number, y: number) {
  const absoluteX = Math.abs(x);
  const absoluteY = Math.abs(y);
  return Math.max(absoluteY, absoluteX * 0.866 + absoluteY * 0.5);
}

function randomIndex(index: number) {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return Math.floor((value - Math.floor(value)) * CHARACTERS.length);
}

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    if (reducedMotion.matches) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let columns = 0;
    let rows = 0;
    let pixelRatio = 1;
    let intensity = new Float32Array();
    let baseCharacters = new Uint8Array();
    let previousPoint: Point | null = null;
    let ripples: Ripple[] = [];
    let animationFrame = 0;
    let previousTime = performance.now();
    let inkColor = '';

    const updateInkColor = () => {
      inkColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--ink')
        .trim();
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      columns = Math.ceil(width / CELL_WIDTH);
      rows = Math.ceil(height / CELL_HEIGHT);
      intensity = new Float32Array(columns * rows);
      baseCharacters = Uint8Array.from(
        { length: columns * rows },
        (_, index) => randomIndex(index),
      );

      canvas.width = Math.ceil(width * pixelRatio);
      canvas.height = Math.ceil(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.font = '15px "Geist Mono", monospace';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
    };

    const paintTrail = (start: Point, end: Point, strength = 1) => {
      const firstColumn = Math.max(
        0,
        Math.floor((Math.min(start.x, end.x) - TRAIL_RADIUS) / CELL_WIDTH),
      );
      const lastColumn = Math.min(
        columns - 1,
        Math.ceil((Math.max(start.x, end.x) + TRAIL_RADIUS) / CELL_WIDTH),
      );
      const firstRow = Math.max(
        0,
        Math.floor((Math.min(start.y, end.y) - TRAIL_RADIUS) / CELL_HEIGHT),
      );
      const lastRow = Math.min(
        rows - 1,
        Math.ceil((Math.max(start.y, end.y) + TRAIL_RADIUS) / CELL_HEIGHT),
      );

      for (let row = firstRow; row <= lastRow; row += 1) {
        for (let column = firstColumn; column <= lastColumn; column += 1) {
          const distance = distanceToSegment(
            column * CELL_WIDTH + CELL_WIDTH / 2,
            row * CELL_HEIGHT + CELL_HEIGHT / 2,
            start,
            end,
          );
          const value =
            (1 - smoothstep(5, TRAIL_RADIUS, distance)) * strength;
          const index = row * columns + column;
          intensity[index] = Math.max(intensity[index], value);
        }
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const point = { x: event.clientX, y: event.clientY };

      if (previousPoint) {
        paintTrail(previousPoint, point);
      }

      previousPoint = point;
    };

    const handlePointerDown = (event: PointerEvent) => {
      const point = { x: event.clientX, y: event.clientY };
      previousPoint = point;
      ripples = [...ripples.slice(-2), { ...point, age: 0 }];
      paintTrail(point, point, 1.15);
    };

    const handleWindowBlur = () => {
      previousPoint = null;
    };

    const draw = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const decay = Math.exp(-3.2 * delta);

      context.clearRect(0, 0, width, height);
      context.fillStyle = inkColor;
      ripples = ripples
        .map((ripple) => ({ ...ripple, age: ripple.age + delta }))
        .filter((ripple) => ripple.age < RIPPLE_DURATION);

      for (let index = 0; index < intensity.length; index += 1) {
        intensity[index] *= decay;
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = column * CELL_WIDTH + CELL_WIDTH / 2;
        const y = row * CELL_HEIGHT + CELL_HEIGHT / 2;
        let value = intensity[index];

        for (const ripple of ripples) {
          const progress = ripple.age / RIPPLE_DURATION;
          const radius = progress * Math.min(Math.max(width, height) * 0.42, 440);
          const ringWidth = 12 + progress * 18;
          const ringDistance = Math.abs(
            hexDistance(x - ripple.x, y - ripple.y) - radius,
          );
          const ring =
            (1 - smoothstep(0, ringWidth, ringDistance)) *
            (1 - progress) ** 2 *
            0.92;
          value = Math.max(value, ring);
        }

        if (value <= 0.025) {
          continue;
        }

        const characterOffset = Math.floor(
          value * (CHARACTERS.length - 1),
        );
        const character =
          CHARACTERS[
            (baseCharacters[index] + characterOffset) % CHARACTERS.length
          ];
        context.globalAlpha = clamp(value * 0.78, 0, 0.82);
        context.fillText(character, x, y);
      }

      context.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    const themeObserver = new MutationObserver(updateInkColor);
    themeObserver.observe(document.documentElement, {
      attributeFilter: ['data-theme'],
    });

    updateInkColor();
    resize();
    animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      themeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas aria-hidden="true" className="ascii-background" ref={canvasRef} />;
}
