import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useCelebration } from "../../context/CelebrationContext";
import { siteConfig } from "../../data/siteConfig";

export function BirthdayReveal() {
  const { completeCelebration } = useCelebration();
  const [failed, setFailed] = useState(false);

  return (
    <section className="birthday-reveal">
      <div className="sparkle-line" aria-hidden="true" />
      <p className="reveal-kicker">Happy Birthday</p>
      <h2>Tanpreet</h2>
      <div className="reveal-portrait-frame animated-border">
        {!failed ? (
          <img
            src={siteConfig.mainImage}
            alt="Tanpreet portrait"
            onError={() => setFailed(true)}
            style={{ objectPosition: siteConfig.mainImageObjectPosition }}
          />
        ) : (
          <div className="portrait-fallback reveal-fallback">
            <span>Tanpreet</span>
            <small>Her portrait will appear here</small>
          </div>
        )}
        <span className="reveal-floral top" aria-hidden="true" />
        <span className="reveal-floral bottom" aria-hidden="true" />
      </div>
      <p className="reveal-message">Today is your day, and I hope it feels as beautiful and special as you truly are.</p>
      <button className="primary-button celebration-primary" onClick={completeCelebration}>
        <Sparkles size={16} />
        Begin the Journey
      </button>
    </section>
  );
}
