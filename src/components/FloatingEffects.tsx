import type { CSSProperties } from "react";

type FloatingEffectsProps = {
  enabled: boolean;
};

export function FloatingEffects({ enabled }: FloatingEffectsProps) {
  if (!enabled) return null;

  return (
    <div className="floating-effects" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="petal"
          style={{ "--delay": `${index * 0.45}s`, "--x": `${(index * 9) % 100}%` } as CSSProperties}
        />
      ))}
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={`spark-${index}`}
          className="spark"
          style={{ "--delay": `${index * 0.8}s`, "--x": `${(index * 17) % 100}%` } as CSSProperties}
        />
      ))}
    </div>
  );
}
