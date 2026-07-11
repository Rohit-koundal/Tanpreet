import { SectionTitle } from "./SectionTitle";
import { memories } from "../data/memories";
import { MemoryStory } from "./MemoryStory";
import { useState } from "react";

export function MemoryTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="memories" className="section-block">
      <SectionTitle
        eyebrow="Beautiful Memories"
        title="Some moments may look small to the world, but quietly become unforgettable."
      />
      <div className="timeline-stack">
        {memories.map((memory, index) => (
          <MemoryStory
            key={memory.title}
            {...memory}
            index={index}
            expanded={expandedIndex === index}
            onToggle={() => setExpandedIndex((current) => (current === index ? null : index))}
          />
        ))}
      </div>
    </section>
  );
}
