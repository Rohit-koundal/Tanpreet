import { useState } from "react";
import { Music2, Pause, Play } from "lucide-react";
import { useCelebration } from "../context/CelebrationContext";

export function MusicController() {
  const { audio } = useCelebration();
  const [open, setOpen] = useState(false);

  return (
    <div className="music-fab-wrap">
      <button className={`music-fab ${audio.isPlaying ? "active" : ""}`} onClick={() => setOpen((current) => !current)} aria-label="Music controls">
        <Music2 size={18} />
      </button>
      {open ? (
        <div className="music-panel card">
          <div className="music-panel-head">
            <strong>Music</strong>
            <span>{audio.isPlaying ? "Happy Birthday music is playing" : audio.enabled ? "Paused" : "Music is off"}</span>
          </div>
          <div className="music-controls">
            <button className="icon-pill" onClick={audio.toggle} aria-label={audio.isPlaying ? "Pause" : "Play"}>
              {audio.isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
          <div className="music-progress" aria-label="Music progress">
            <span style={{ width: `${audio.progress}%` }} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
