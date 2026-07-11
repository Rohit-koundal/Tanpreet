import type { CSSProperties } from "react";

type RosePetalLayerProps = {
  active: boolean;
};

export function RosePetalLayer({ active }: RosePetalLayerProps) {
  if (!active) return null;

  return (
    <div className="rose-petal-layer" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, index) => (
        <span
          key={index}
          style={
            {
              "--petal-left": `${((index * 13) % 118) - 12}%`,
              "--petal-delay": `${index * -0.22}s`
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
