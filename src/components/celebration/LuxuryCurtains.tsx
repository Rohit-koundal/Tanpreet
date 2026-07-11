import type { CSSProperties } from "react";

type LuxuryCurtainsProps = {
  open: boolean;
};

export function LuxuryCurtains({ open }: LuxuryCurtainsProps) {
  return (
    <div className={`luxury-curtains ${open ? "open" : ""}`} aria-hidden="true">
      <div className="curtain-light" />
      <div className="curtain-panel left" />
      <div className="curtain-panel right" />
      <div className="curtain-sparkles">
        {Array.from({ length: 12 }).map((_, index) => {
          const style = {
            "--spark-left": `${34 + ((index * 5) % 32)}%`,
            "--spark-top": `${18 + ((index * 7) % 58)}%`,
            "--spark-delay": `${index * 90}ms`
          } as CSSProperties;
          return <span key={index} style={style} />;
        })}
      </div>
    </div>
  );
}
