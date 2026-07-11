import { Music2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useCelebration } from "../../context/CelebrationContext";

export function MusicPermissionSheet() {
  const { audio, beginCountdown } = useCelebration();
  const [loading, setLoading] = useState(false);

  const playMusic = async () => {
    setLoading(true);
    await audio.fadeIn();
    beginCountdown();
  };

  const continueQuietly = () => {
    audio.disable();
    beginCountdown();
  };

  return (
    <section className="permission-sheet" aria-label="Music permission">
      <span className="sheet-handle" aria-hidden="true" />
      <div className="permission-icon" aria-hidden="true">
        <Music2 size={22} />
      </div>
      <h2>Make this moment a little more magical?</h2>
      <p>Tap play to enjoy the celebration with Happy Birthday music.</p>
      <div className="permission-actions">
        <button className="primary-button" onClick={playMusic} disabled={loading}>
          <Sparkles size={16} />
          {loading ? "Starting the music..." : "Play Music & Continue"}
        </button>
        <button className="secondary-button" onClick={continueQuietly} disabled={loading}>
          Continue Without Music
        </button>
      </div>
    </section>
  );
}
