import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCelebration } from "../context/CelebrationContext";
import { SectionTitle } from "./SectionTitle";

export function GiftSurprise() {
  const [open, setOpen] = useState(false);
  const { finalGiftCelebrate } = useCelebration();

  const openGift = () => {
    if (!open) {
      setOpen(true);
      finalGiftCelebrate();
    }
  };

  return (
    <section className="section-block">
      <SectionTitle eyebrow="One Last Little Surprise" title="A small birthday gift with no expectation" />
      <motion.button className={`gift-card card luxury-gift-card ${open ? "open" : ""}`} onClick={openGift} whileTap={{ scale: 0.985 }}>
        <span className="gift-box-visual" aria-hidden="true">
          <span className="gift-lid" />
          <span className="gift-light" />
          <span className="gift-box-base" />
          <span className="gift-ribbon vertical" />
          <span className="gift-ribbon horizontal" />
        </span>
        <span>{open ? "A little birthday light is open" : "Tap to open a small birthday surprise"}</span>
      </motion.button>
      {open ? (
        <div className="gift-message card">
          <p className="gift-title">Happy Birthday, Tanpreet 🎂✨</p>
          <p>May every dream in your heart come true, and may your life always be filled with happiness, peace, success, and beautiful moments.</p>
          <p>You never owe this message an answer. This little celebration was created only to make your birthday feel special.</p>
          <button className="primary-button" onClick={finalGiftCelebrate}>
            Celebrate Once More
          </button>
          <div className="mini-sparkles" aria-hidden="true">
            <Sparkles size={14} />
            <Sparkles size={14} />
            <Sparkles size={14} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
