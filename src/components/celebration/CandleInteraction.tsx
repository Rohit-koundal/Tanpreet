import type { CSSProperties } from "react";

type CandleInteractionProps = {
  candlesLit: number;
  candlesBlown: number;
};

export function CandleInteraction({ candlesLit, candlesBlown }: CandleInteractionProps) {
  return (
    <div className={`cake-visual ${candlesBlown === 3 ? "dimmed" : ""}`} aria-label="Birthday cake with three candles">
      <div className="cake-sparkles" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            style={
              {
                "--cake-sparkle-left": `${18 + index * 8}%`,
                "--cake-sparkle-top": `${20 + (index % 3) * 18}%`,
                "--cake-sparkle-delay": `${index * -0.16}s`
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="candles">
        {[0, 1, 2].map((index) => {
          const lit = index < candlesLit && index >= candlesBlown;
          const blown = index < candlesBlown;

          return (
            <span key={index} className={`candle candle-${index + 1} ${lit ? "lit" : ""} ${blown ? "blown" : ""}`}>
              <i className="wick" />
              <i className="flame" />
              <i className="smoke" />
            </span>
          );
        })}
      </div>
      <div className="cake-top">
        <span className="cake-flower left" />
        <span className="cake-nameplate">Tanpreet</span>
        <span className="cake-flower right" />
      </div>
      <div className="cake-layer upper" />
      <div className="cake-layer lower" />
      <div className="cake-stand" />
    </div>
  );
}
