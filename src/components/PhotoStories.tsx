import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { storyItems } from "../data/gallery";

type PhotoStoriesProps = {
  onOpenSection?: () => void;
};

export function PhotoStories({ onOpenSection }: PhotoStoriesProps) {
  const stories = useMemo(() => storyItems, []);
  const [viewer, setViewer] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const close = () => {
    setViewer(null);
    setPaused(false);
  };

  return (
    <section id="stories" className="section-block">
      <SectionTitle eyebrow="Photo Stories" title="Little story previews from the gallery" />
      <div className="story-row">
        {stories.map((story, index) => (
          <button key={story.caption} className="story-circle" onClick={() => { setViewer(index); onOpenSection?.(); }}>
            <span className="story-ring" />
            <img src={story.src} alt={story.caption} loading="lazy" style={{ objectPosition: story.objectPosition }} />
          </button>
        ))}
      </div>

      {viewer !== null ? (
        <div
          className="story-viewer"
          onTouchStart={(event) => setTouchStart({ x: event.touches[0].clientX, y: event.touches[0].clientY })}
          onTouchMove={(event) => {
            if (!touchStart) return;
            const deltaY = event.touches[0].clientY - touchStart.y;
            if (deltaY > 80) close();
          }}
          onTouchEnd={() => setTouchStart(null)}
          onClick={(event) => {
            const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
            const x = event.clientX - rect.left;
            if (x < rect.width / 2) {
              setViewer((current) => (current === null ? null : (current - 1 + stories.length) % stories.length));
            } else {
              setViewer((current) => (current === null ? null : (current + 1) % stories.length));
            }
          }}
          onMouseDown={() => setPaused(true)}
          onMouseUp={() => setPaused(false)}
          onMouseLeave={() => setPaused(false)}
        >
          <button className="story-close" onClick={(event) => { event.stopPropagation(); close(); }} aria-label="Close story viewer">
            <X size={18} />
          </button>
          <div className="story-progress">
            {stories.map((_, index) => (
              <span key={index} className={index === viewer ? "active" : index < viewer ? "done" : ""} />
            ))}
          </div>
          <div className="story-viewer-inner">
            <img src={stories[viewer].src} alt={stories[viewer].caption} style={{ objectPosition: stories[viewer].objectPosition }} />
          </div>
          <div className="story-viewer-caption">
            <span>{paused ? "Paused" : "Tap sides to navigate"}</span>
            <p>{stories[viewer].caption}</p>
          </div>
          <div className="story-nav-hint">
            <ChevronLeft size={16} />
            <span>Swipe down to close</span>
            <ChevronRight size={16} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
