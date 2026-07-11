import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import { useCelebrationAudio } from "../hooks/useCelebrationAudio";
import { useCelebrationSequence } from "../hooks/useCelebrationSequence";
import { useReducedMotion } from "../hooks/useReducedMotion";

type CelebrationContextValue = ReturnType<typeof useCelebrationSequence> & {
  audio: ReturnType<typeof useCelebrationAudio>;
  reducedMotion: boolean;
};

const CelebrationContext = createContext<CelebrationContextValue | null>(null);

export function CelebrationProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const audio = useCelebrationAudio();
  const playChime = useCallback(() => audio.playEffect("chime"), [audio.playEffect]);
  const playPopper = useCallback(() => audio.playEffect("popper"), [audio.playEffect]);
  const playSparkle = useCallback(() => audio.playEffect("sparkle"), [audio.playEffect]);
  const sequence = useCelebrationSequence({
    reducedMotion,
    onChime: playChime,
    onPopper: playPopper,
    onSparkle: playSparkle,
    onMusicBoost: audio.boostMusic
  });

  const value = useMemo(() => ({ ...sequence, audio, reducedMotion }), [audio, reducedMotion, sequence]);

  return <CelebrationContext.Provider value={value}>{children}</CelebrationContext.Provider>;
}

export function useCelebration() {
  const value = useContext(CelebrationContext);
  if (!value) {
    throw new Error("useCelebration must be used inside CelebrationProvider");
  }
  return value;
}
