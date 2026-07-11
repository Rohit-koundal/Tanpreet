import { Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import { useCelebration } from "../../context/CelebrationContext";

type CelebrationIntroProps = {
  passive?: boolean;
};

export function CelebrationIntro({ passive = false }: CelebrationIntroProps) {
  const { openCelebration } = useCelebration();

  return (
    <section className={`celebration-intro ${passive ? "passive" : ""}`} aria-label="Birthday celebration opening">
      <div className="intro-glow" aria-hidden="true" />
      <div className="floral-corner top-left" aria-hidden="true" />
      <div className="floral-corner bottom-right" aria-hidden="true" />
      <div className="intro-particles" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, index) => {
          const style = {
            "--particle-left": `${((index * 17) % 115) - 10}%`,
            "--particle-top": `${12 + ((index * 9) % 76)}%`,
            "--particle-delay": `${index * -0.32}s`
          } as CSSProperties;
          return <span key={index} style={style} />;
        })}
      </div>
      <div className="intro-copy">
        <p className="intro-mark">T ✦</p>
        <p className="intro-whisper">For someone truly special...</p>
        <h1>A little birthday celebration is waiting for you.</h1>
        {!passive ? (
          <button className="primary-button celebration-primary" onClick={openCelebration}>
            <Sparkles size={17} />
            Open Your Celebration
          </button>
        ) : null}
      </div>
    </section>
  );
}
