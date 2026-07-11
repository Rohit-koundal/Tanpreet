import { Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { useCelebration } from "../../context/CelebrationContext";

export function CelebrationCountdown() {
  const { countdownValue } = useCelebration();
  const isWish = countdownValue === "Make a wish";

  return (
    <section className="countdown-screen" aria-live="polite">
      <div className="countdown-orbit" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, index) => {
          const style = {
            "--orbit-left": `${8 + ((index * 13) % 84)}%`,
            "--orbit-top": `${14 + ((index * 11) % 72)}%`,
            "--orbit-delay": `${index * -90}ms`
          } as CSSProperties;
          return <span key={index} style={style} />;
        })}
      </div>
      <p>Something special is about to begin...</p>
      <strong key={countdownValue} className={isWish ? "wish-count" : ""}>
        {isWish ? "Make a wish" : countdownValue}
      </strong>
      <div className="countdown-spark">
        <Sparkles size={18} />
      </div>
    </section>
  );
}
