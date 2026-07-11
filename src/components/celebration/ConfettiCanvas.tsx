import { useEffect, useRef, useState } from "react";
import type { CelebrationBurst } from "../../hooks/useCelebrationSequence";

type ConfettiCanvasProps = {
  burst: CelebrationBurst | null;
  reducedMotion: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  gravity: number;
  rotation: number;
  spin: number;
  ttl: number;
  life: number;
  color: string;
  shape: "circle" | "rect" | "star";
};

const colors = ["#c9a35b", "#d8a7a1", "#6f3040", "#fff8ea", "#b9826a", "#8fa7c8", "#8d6aa8"];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeParticle(x: number, y: number, power: number, direction = -Math.PI / 2): Particle {
  const angle = direction + randomBetween(-0.75, 0.75);
  const speed = randomBetween(power * 0.55, power);

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: randomBetween(4, 9),
    gravity: randomBetween(0.08, 0.16),
    rotation: randomBetween(0, Math.PI * 2),
    spin: randomBetween(-0.16, 0.16),
    ttl: randomBetween(90, 150),
    life: 0,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: ["circle", "rect", "star"][Math.floor(Math.random() * 3)] as Particle["shape"]
  };
}

function drawStar(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath();
  for (let point = 0; point < 10; point += 1) {
    const radius = point % 2 === 0 ? size : size * 0.42;
    const angle = (Math.PI * point) / 5;
    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  ctx.closePath();
  ctx.fill();
}

export function ConfettiCanvas({ burst, reducedMotion }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!burst) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    setVisible(true);

    const count = reducedMotion
      ? { side: 26, center: 30, final: 42, soft: 20 }[burst.type]
      : { side: 100, center: 80, final: 120, soft: 36 }[burst.type];

    const particles: Particle[] = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (burst.type === "side") {
      for (let index = 0; index < count / 2; index += 1) {
        particles.push(makeParticle(24, height - 72, randomBetween(7, 12), -Math.PI / 3));
        particles.push(makeParticle(width - 24, height - 72, randomBetween(7, 12), (-2 * Math.PI) / 3));
      }
    } else if (burst.type === "final") {
      for (let index = 0; index < count; index += 1) {
        particles.push(makeParticle(width / 2, height * 0.62, randomBetween(7, 13), randomBetween(-2.7, -0.45)));
      }
    } else {
      for (let index = 0; index < count; index += 1) {
        particles.push(makeParticle(width / 2, height * 0.45, randomBetween(5, 10), randomBetween(-2.4, -0.7)));
      }
    }

    particlesRef.current = particlesRef.current.concat(particles).slice(-160);

    const draw = () => {
      context.clearRect(0, 0, width, height);
      particlesRef.current = particlesRef.current
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + particle.gravity,
          vx: particle.vx * 0.992,
          rotation: particle.rotation + particle.spin,
          life: particle.life + 1
        }))
        .filter((particle) => particle.life < particle.ttl && particle.y < height + 80);

      particlesRef.current.forEach((particle) => {
        context.save();
        context.globalAlpha = Math.max(0, 1 - particle.life / particle.ttl);
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.fillStyle = particle.color;

        if (particle.shape === "circle") {
          context.beginPath();
          context.arc(0, 0, particle.size * 0.55, 0, Math.PI * 2);
          context.fill();
        } else if (particle.shape === "star") {
          drawStar(context, particle.size);
        } else {
          context.fillRect(-particle.size / 2, -particle.size / 3, particle.size, particle.size * 0.66);
        }

        context.restore();
      });

      if (particlesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(draw);
      } else {
        setVisible(false);
      }
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [burst, reducedMotion]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className={`confetti-canvas ${visible ? "visible" : ""}`} aria-hidden="true" />;
}
