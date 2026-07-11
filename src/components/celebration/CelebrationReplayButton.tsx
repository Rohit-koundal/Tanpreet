import { RotateCcw } from "lucide-react";
import { useCelebration } from "../../context/CelebrationContext";

export function CelebrationReplayButton() {
  const { replayFull } = useCelebration();

  return (
    <button className="replay-button" onClick={replayFull}>
      <RotateCcw size={15} />
      Replay Celebration
    </button>
  );
}
