import { useEffect, useState } from "react";

export function useScrollProgress(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveId(visible.target.id);
        }
      },
      { threshold: [0.35, 0.55, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, [sectionIds]);

  return { activeId, progress };
}
