import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { birthdayChapters, letterFooter } from "../data/birthdayMessage";

type LetterReaderProps = {
  open: boolean;
  onClose: () => void;
};

export function LetterReader({ open, onClose }: LetterReaderProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [chapter, setChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const chapters = useMemo(() => birthdayChapters, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    if (open) {
      setChapter(0);
      setProgress(0);
      scrollerRef.current?.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [open]);

  if (!open) return null;

  return (
    <section className="letter-reader" aria-label="Letter reader">
      <div className="letter-reader-top">
        <button className="story-close" onClick={onClose} aria-label="Close letter">
          <X size={18} />
        </button>
        <div>
          <p className="eyebrow">A Few Words From My Heart</p>
          <strong>{chapters[chapter]?.title ?? "Letter"}</strong>
        </div>
        <div className="reader-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div
        className="letter-reader-body"
        ref={scrollerRef}
        onScroll={(event) => {
          const target = event.currentTarget;
          const ratio = target.scrollHeight > target.clientHeight ? (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100 : 0;
          setProgress(Math.min(100, Math.max(0, ratio)));
          const page = Math.min(chapters.length - 1, Math.round((target.scrollTop / Math.max(1, target.clientHeight)) * 1.1));
          setChapter(page);
        }}
      >
        {chapters.map((item, index) => (
          <article key={item.title} className="letter-page">
            <h3>{item.title}</h3>
            {item.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {index < chapters.length - 1 ? (
              <button className="secondary-button" onClick={() => scrollerRef.current?.scrollTo({ top: (index + 1) * window.innerHeight, behavior: "smooth" })}>
                Continue
              </button>
            ) : null}
          </article>
        ))}
        <article className="letter-page letter-end">
          <p>{letterFooter}</p>
          <button className="primary-button" onClick={onClose}>
            Close Letter
          </button>
        </article>
      </div>
    </section>
  );
}
