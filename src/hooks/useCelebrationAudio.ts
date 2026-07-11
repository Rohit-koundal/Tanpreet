import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "../data/siteConfig";

export type CelebrationEffectName = "chime" | "popper" | "sparkle";

const backgroundVolume = 0.28;
const effectVolumes: Record<CelebrationEffectName, number> = {
  chime: 0.45,
  popper: 0.65,
  sparkle: 0.35
};

export function useCelebrationAudio() {
  const backgroundRef = useRef<HTMLAudioElement | null>(null);
  const backgroundPathRef = useRef<string>(siteConfig.audio.happyBirthday);
  const effectsRef = useRef<Partial<Record<CelebrationEffectName, HTMLAudioElement>>>({});
  const warnedRef = useRef(new Set<string>());
  const enabledRef = useRef(window.localStorage.getItem("tanpreet-music") === "enabled");
  const [enabled, setEnabled] = useState(() => window.localStorage.getItem("tanpreet-music") === "enabled");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const warnOnce = useCallback((path: string) => {
    if (warnedRef.current.has(path)) return;
    warnedRef.current.add(path);
    console.warn(`Optional celebration audio not found or could not play: ${path}`);
  }, []);

  const createAudio = useCallback((path: string, volume: number, loop = false) => {
    const audio = new Audio(path);
    audio.preload = "auto";
    audio.volume = volume;
    audio.loop = loop;
    audio.addEventListener("error", () => warnOnce(path), { once: true });
    return audio;
  }, [warnOnce]);

  const ensureAudio = useCallback(() => {
    if (!backgroundRef.current) {
      const music = createAudio(siteConfig.audio.happyBirthday, 0, true);
      backgroundRef.current = music;
      backgroundPathRef.current = siteConfig.audio.happyBirthday;
    }

    (Object.keys(effectVolumes) as CelebrationEffectName[]).forEach((name) => {
      if (!effectsRef.current[name]) {
        effectsRef.current[name] = createAudio(siteConfig.audio[name], effectVolumes[name], false);
      }
    });
  }, [createAudio]);

  const fadeTo = useCallback((targetVolume: number, duration = 900) => {
    const audio = backgroundRef.current;
    if (!audio) return;
    const start = audio.volume;
    const startedAt = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const ratio = Math.min(1, elapsed / duration);
      audio.volume = Math.max(0, Math.min(1, start + (targetVolume - start) * ratio));
      if (ratio < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, []);

  const playBackground = useCallback(async () => {
    ensureAudio();
    const attempts: string[] = [backgroundPathRef.current];

    if (backgroundPathRef.current !== siteConfig.audio.fallbackMusic) {
      attempts.push(siteConfig.audio.fallbackMusic);
    }

    for (const path of attempts) {
      if (!backgroundRef.current || backgroundPathRef.current !== path) {
        backgroundRef.current?.pause();
        backgroundRef.current = createAudio(path, 0, true);
        backgroundPathRef.current = path;
      }

      try {
        backgroundRef.current.volume = 0;
        await backgroundRef.current.play();
        return true;
      } catch {
        warnOnce(path);
      }
    }

    return false;
  }, [createAudio, ensureAudio, warnOnce]);

  const fadeIn = useCallback(async () => {
    enabledRef.current = true;
    setEnabled(true);
    window.localStorage.setItem("tanpreet-music", "enabled");

    const played = await playBackground();
    if (played) {
      setIsPlaying(true);
      fadeTo(backgroundVolume, 1500);
    } else {
      setIsPlaying(false);
    }
  }, [fadeTo, playBackground]);

  const pause = useCallback(() => {
    backgroundRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    if (!enabledRef.current && !enabled) return;
    void fadeIn();
  }, [enabled, fadeIn]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      void fadeIn();
    }
  }, [fadeIn, isPlaying, pause]);

  const disable = useCallback(() => {
    enabledRef.current = false;
    setEnabled(false);
    pause();
    window.localStorage.setItem("tanpreet-music", "disabled");
  }, [pause]);

  const playEffect = useCallback((name: CelebrationEffectName) => {
    ensureAudio();
    const effect = effectsRef.current[name];
    if (!effect) return;

    const music = backgroundRef.current;
    if (music && !music.paused) fadeTo(0.16, 180);

    try {
      effect.currentTime = 0;
      effect.volume = effectVolumes[name];
      void effect.play().catch(() => warnOnce(siteConfig.audio[name]));
      window.setTimeout(() => {
        if (backgroundRef.current && !backgroundRef.current.paused) fadeTo(backgroundVolume, 350);
      }, 700);
    } catch {
      warnOnce(siteConfig.audio[name]);
    }
  }, [ensureAudio, fadeTo, warnOnce]);

  const boostMusic = useCallback(() => {
    fadeTo(0.36, 220);
    window.setTimeout(() => fadeTo(backgroundVolume, 900), 1100);
  }, [fadeTo]);

  useEffect(() => {
    const updateProgress = () => {
      const audio = backgroundRef.current;
      setProgress(audio && audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };

    const timer = window.setInterval(updateProgress, 500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        fadeTo(0, 450);
        window.setTimeout(() => backgroundRef.current?.pause(), 480);
        setIsPlaying(false);
      } else if (enabledRef.current) {
        void fadeIn();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [fadeIn, fadeTo]);

  return {
    enabled,
    isPlaying,
    progress,
    ensureAudio,
    fadeIn,
    pause,
    resume,
    toggle,
    disable,
    playEffect,
    boostMusic
  };
}
