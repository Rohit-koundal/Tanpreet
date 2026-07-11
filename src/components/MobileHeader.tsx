import { Sparkles, Music2, PartyPopper } from "lucide-react";

type MobileHeaderProps = {
  onMusicToggle: () => void;
  musicActive: boolean;
  onCelebrate: () => void;
};

export function MobileHeader({ onMusicToggle, musicActive, onCelebrate }: MobileHeaderProps) {
  return (
    <header className="mobile-header">
      <div className="mobile-brand">
        <span className="brand-mark">T ✦</span>
        <span>For Tanpreet</span>
      </div>
      <div className="mobile-actions">
        <button className={`icon-pill ${musicActive ? "active" : ""}`} onClick={onMusicToggle} aria-label="Music">
          <Music2 size={16} />
        </button>
        <button className="icon-pill" onClick={onCelebrate} aria-label="Celebrate now">
          <PartyPopper size={16} />
          <Sparkles size={14} />
        </button>
      </div>
    </header>
  );
}
