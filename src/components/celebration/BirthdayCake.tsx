import { Sparkles } from "lucide-react";
import { useCelebration } from "../../context/CelebrationContext";
import { CandleInteraction } from "./CandleInteraction";

export function BirthdayCake() {
  const { candlesLit, candlesBlown, wishMessageVisible, lightCandles, blowCandles } = useCelebration();
  const lighting = candlesLit > 0 && candlesLit < 3;
  const readyToBlow = candlesLit === 3 && candlesBlown === 0;

  return (
    <section className="cake-screen">
      <p className="eyebrow">Before we begin...</p>
      <h2>Close your eyes, make a beautiful wish, and blow out the candles.</h2>
      <CandleInteraction candlesLit={candlesLit} candlesBlown={candlesBlown} />
      {wishMessageVisible ? <p className="wish-message">May your wish come true ✨</p> : <p className="cake-hint">A soft little wish before the journey begins.</p>}
      <div className="cake-actions">
        {candlesLit < 3 ? (
          <button className="primary-button" onClick={lightCandles} disabled={lighting}>
            <Sparkles size={16} />
            {lighting ? "Lighting the candles..." : "Tap to light the candles"}
          </button>
        ) : (
          <button className="primary-button" onClick={blowCandles} disabled={!readyToBlow}>
            Blow Out the Candles
          </button>
        )}
      </div>
    </section>
  );
}
