import { Heart, Gift, Sparkles } from "lucide-react";

type FinalSurpriseSectionProps = {
  opened: boolean;
  onOpen: () => void;
  onCelebrateAgain: () => void;
};

export function FinalSurpriseSection({ opened, onOpen, onCelebrateAgain }: FinalSurpriseSectionProps) {
  return (
    <section className="section">
      <div className="container compact-section final-surprise">
        <div className="section-heading centered">
          <p className="eyebrow">One Last Little Surprise</p>
          <h2>A final gesture of respect and celebration</h2>
        </div>

        <button className={`gift-box ${opened ? "opened" : ""}`} onClick={onOpen}>
          <Gift size={34} />
          <span>Tap to open a small birthday surprise</span>
        </button>

        {opened ? (
          <div className="surprise-message">
            <p className="glow-line">Happy Birthday, Tanpreet 🎂</p>
            <p>You never owe this message an answer. It was created only to wish you happiness and to make your birthday feel a little more special.</p>
            <p>May every new chapter of your life be more beautiful than the last. ✨</p>
            <button className="button secondary" onClick={onCelebrateAgain}>
              Celebrate Once More
            </button>
            <div className="surprise-icons" aria-hidden="true">
              <Heart size={18} />
              <Sparkles size={18} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
