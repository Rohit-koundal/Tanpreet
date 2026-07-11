import { motion } from "framer-motion";
import { ArrowDown, BookOpenText, Sparkles } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "../data/siteConfig";

type HeroSectionProps = {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
};

export function HeroSection({ onPrimaryAction, onSecondaryAction }: HeroSectionProps) {
  const [failed, setFailed] = useState(false);

  return (
    <section id="hero" className="section hero">
      <div className="container hero-grid">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="eyebrow">To someone whose presence makes ordinary moments unforgettable</p>
          <h1 className="hero-title">
            Happy Birthday,
            <span className="calligraphy"> {siteConfig.recipientName}</span>
          </h1>
          <p className="hero-copy">
            May your life always be filled with happiness, peace, success, beautiful dreams, and countless reasons to smile.
          </p>
          <div className="button-row">
            <button className="button primary" onClick={onPrimaryAction}>
              <BookOpenText size={18} />
              Read My Wish
            </button>
            <button className="button secondary" onClick={onSecondaryAction}>
              <ArrowDown size={18} />
              Explore Our Memories
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-card"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <div className="hero-frame">
            <img
              src={siteConfig.mainImage}
              alt="Tanpreet portrait placeholder"
              className="hero-image"
              onError={() => setFailed(true)}
            />
            {failed ? (
              <div className="hero-placeholder">
                <span>Tanpreet</span>
              </div>
            ) : null}
          </div>
          <p className="hero-caption">
            A beautiful soul deserves a beautiful celebration.
            <span className="caption-accent">
              <Sparkles size={14} />
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
