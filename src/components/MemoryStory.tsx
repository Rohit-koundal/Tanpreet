import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type MemoryStoryProps = {
  title: string;
  description: string;
  meta: string;
  icon: LucideIcon;
  index: number;
  expanded: boolean;
  onToggle: () => void;
};

export function MemoryStory({ title, description, meta, icon: Icon, index, expanded, onToggle }: MemoryStoryProps) {
  return (
    <motion.article
      className={`memory-card card ${expanded ? "expanded" : ""}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onToggle();
      }}
    >
      <span className="memory-line" />
      <div className="memory-icon">
        <Icon size={17} />
      </div>
      <div className="memory-copy">
        <div className="memory-meta">{meta}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="memory-toggle">{expanded ? "Tap to collapse" : "Tap to expand"}</span>
      </div>
    </motion.article>
  );
}
