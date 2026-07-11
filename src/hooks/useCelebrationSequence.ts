import { useCallback, useEffect, useRef, useState } from "react";

export type CelebrationStage =
  | "intro"
  | "permission"
  | "countdown"
  | "curtain"
  | "popper"
  | "cake"
  | "birthdayReveal"
  | "completed";

export type CelebrationBurst = {
  id: number;
  type: "side" | "center" | "final" | "soft";
};

type SequenceOptions = {
  reducedMotion: boolean;
  onChime: () => void;
  onPopper: () => void;
  onSparkle: () => void;
  onMusicBoost: () => void;
};

export function useCelebrationSequence({ reducedMotion, onChime, onPopper, onSparkle, onMusicBoost }: SequenceOptions) {
  const [stage, setStage] = useState<CelebrationStage>("intro");
  const [countdownValue, setCountdownValue] = useState("3");
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [poppersActive, setPoppersActive] = useState(false);
  const [petalsActive, setPetalsActive] = useState(false);
  const [burst, setBurst] = useState<CelebrationBurst | null>(null);
  const [candlesLit, setCandlesLit] = useState(0);
  const [candlesBlown, setCandlesBlown] = useState(0);
  const [wishMessageVisible, setWishMessageVisible] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const lastHeaderCelebration = useRef(0);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, reducedMotion ? Math.min(delay, 120) : delay);
    timers.current.push(timer);
    return timer;
  }, [reducedMotion]);

  const triggerBurst = useCallback((type: CelebrationBurst["type"]) => {
    setBurst({ id: Date.now() + Math.random(), type });
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (stage !== "countdown") return;
    clearTimers();
    setCountdownValue("3");
    schedule(() => setCountdownValue("2"), 850);
    schedule(() => setCountdownValue("1"), 1700);
    schedule(() => setCountdownValue("Make a wish"), 2550);
    schedule(() => setStage("curtain"), 3550);
  }, [clearTimers, schedule, stage]);

  useEffect(() => {
    if (stage !== "curtain") return;
    clearTimers();
    setCurtainsOpen(false);
    schedule(() => {
      onChime();
      setCurtainsOpen(true);
    }, 180);
    schedule(() => setStage("popper"), 1980);
  }, [clearTimers, onChime, schedule, stage]);

  useEffect(() => {
    if (stage !== "popper") return;
    clearTimers();
    setPoppersActive(true);
    onPopper();
    triggerBurst("side");
    schedule(() => triggerBurst("center"), 150);
    schedule(() => setPetalsActive(true), 400);
    schedule(() => setPoppersActive(false), 950);
    schedule(() => setPetalsActive(false), 3100);
    schedule(() => setStage("cake"), 3250);
  }, [clearTimers, onPopper, schedule, stage, triggerBurst]);

  useEffect(() => {
    if (stage !== "birthdayReveal") return;
    clearTimers();
    onSparkle();
    schedule(() => triggerBurst("center"), 1100);
  }, [clearTimers, onSparkle, schedule, stage, triggerBurst]);

  const openCelebration = useCallback(() => setStage("permission"), []);

  const beginCountdown = useCallback(() => {
    setStage("countdown");
  }, []);

  const replayFull = useCallback(() => {
    clearTimers();
    setCandlesLit(0);
    setCandlesBlown(0);
    setWishMessageVisible(false);
    setCurtainsOpen(false);
    setPoppersActive(false);
    setPetalsActive(false);
    setToast(null);
    setStage("intro");
  }, [clearTimers]);

  const lightCandles = useCallback(() => {
    setCandlesLit(0);
    onSparkle();
    [1, 2, 3].forEach((value, index) => {
      schedule(() => setCandlesLit(value), 350 * (index + 1));
    });
  }, [onSparkle, schedule]);

  const blowCandles = useCallback(() => {
    [1, 2, 3].forEach((value, index) => {
      schedule(() => setCandlesBlown(value), 250 * (index + 1));
    });
    schedule(() => {
      setWishMessageVisible(true);
      triggerBurst("soft");
    }, 900);
    schedule(() => setStage("birthdayReveal"), 2300);
  }, [schedule, triggerBurst]);

  const completeCelebration = useCallback(() => {
    setStage("completed");
    setPetalsActive(false);
    setPoppersActive(false);
  }, []);

  const headerCelebrate = useCallback(() => {
    const now = Date.now();
    if (now - lastHeaderCelebration.current < 4000) return false;
    lastHeaderCelebration.current = now;
    setToast("Birthday magic unlocked ✨");
    onPopper();
    triggerBurst("side");
    setPoppersActive(true);
    setPetalsActive(true);
    schedule(() => setPoppersActive(false), 900);
    schedule(() => setPetalsActive(false), 2200);
    schedule(() => setToast(null), 2500);
    return true;
  }, [onPopper, schedule, triggerBurst]);

  const finalGiftCelebrate = useCallback(() => {
    onMusicBoost();
    onPopper();
    triggerBurst("final");
    setPoppersActive(true);
    setPetalsActive(true);
    schedule(() => setPoppersActive(false), 900);
    schedule(() => setPetalsActive(false), 3200);
  }, [onMusicBoost, onPopper, schedule, triggerBurst]);

  return {
    stage,
    countdownValue,
    curtainsOpen,
    poppersActive,
    petalsActive,
    burst,
    candlesLit,
    candlesBlown,
    wishMessageVisible,
    toast,
    isCompleted: stage === "completed",
    openCelebration,
    beginCountdown,
    replayFull,
    lightCandles,
    blowCandles,
    completeCelebration,
    headerCelebrate,
    finalGiftCelebrate
  };
}
