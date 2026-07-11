import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type MemoryItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type TimelineSectionProps = {
  memories: readonly MemoryItem[];
};

export function TimelineSection({ memories }: TimelineSectionProps) {
  return (
    <section id="memories" className="section">
      <div className="container">
        <div className="section-heading centered">
          <p className="eyebrow">Beautiful Memories</p>
          <h2>Some moments quietly become unforgettable</h2>
        </div>

        <div className="timeline">
          {memories.map((memory, index) => {
            const Icon = memory.icon;
            return (
              <motion.article
                key={memory.title}
                className="timeline-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
              >
                <div className="timeline-icon">
                  <Icon size={18} />
                </div>
                <h3>{memory.title}</h3>
                <p>{memory.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
