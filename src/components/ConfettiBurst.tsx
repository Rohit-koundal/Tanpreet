import type { CSSProperties } from "react";

type ConfettiBurstProps = {
  seed: number;
  width: number;
  height: number;
};

const palette = ["#d6b06e", "#f4c8b1", "#fff3df", "#9f5f53", "#ffffff"];

export function ConfettiBurst({ seed, width, height }: ConfettiBurstProps) {
  return (
    <div className="confetti-overlay" aria-hidden="true">
      {Array.from({ length: 60 }).map((_, index) => {
        const left = `${(index * 17 + seed * 13) % 100}%`;
        const duration = `${4.5 + (index % 6) * 0.35}s`;
        const delay = `${(index % 10) * 0.08}s`;
        const size = `${8 + (index % 3) * 4}px`;
        const color = palette[index % palette.length];
        const top = `-${Math.min(20, height / 30)}px`;

        return (
          <span
            key={`${seed}-${index}`}
            className="confetti-piece"
            style={{ "--left": left, "--duration": duration, "--delay": delay, "--size": size, "--color": color, "--top": top } as CSSProperties}
          />
        );
      })}
      <div className="confetti-ribbon" />
      <div className="confetti-ribbon confetti-ribbon-alt" />
    </div>
  );
}
