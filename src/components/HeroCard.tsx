import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownToLine, Sparkles } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

type HeroCardProps = {
  onReadWish: () => void;
  onExploreMemories: () => void;
};

export function HeroCard({ onReadWish, onExploreMemories }: HeroCardProps) {
  const [failed, setFailed] = useState(false);

  return (
    <section id="home" className="stack">
      <motion.article className="hero-card card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="hero-pretitle">To someone whose presence makes ordinary moments unforgettable</p>
        <h1 className="hero-title">
          <span>Happy Birthday,</span>
          <span className="calligraphy">Tanpreet</span>
        </h1>
        <div className="portrait-frame">
          {!failed ? (
            <img
              src={siteConfig.mainImage}
              alt="Tanpreet portrait"
              onError={() => setFailed(true)}
              style={{ objectPosition: siteConfig.mainImageObjectPosition }}
            />
          ) : null}
          {failed ? (
            <div className="portrait-fallback">
              <span>Tanpreet</span>
              <small>Add Tanpreet's photo in <code>src/assets/images</code></small>
            </div>
          ) : null}
          <span className="portrait-flourish left" />
          <span className="portrait-flourish right" />
        </div>
        <p className="hero-caption">A beautiful soul deserves a beautiful celebration.</p>
        <div className="hero-buttons">
          <button className="primary-button" onClick={onReadWish}>
            Read My Wish
          </button>
          <button className="secondary-button" onClick={onExploreMemories}>
            Explore Memories
          </button>
        </div>
        <div className="scroll-hint">
          <ArrowDownToLine size={14} />
          <span>Swipe gently to continue</span>
          <Sparkles size={14} />
        </div>
      </motion.article>

      <motion.article className="greeting-card card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="greeting-icons" aria-hidden="true">
          <span>✿</span>
          <span>✦</span>
          <span>♥</span>
          <span>✧</span>
        </div>
        <p>May your life always be filled with happiness, peace, success, beautiful dreams, and countless reasons to smile.</p>
      </motion.article>
    </section>
  );
}
