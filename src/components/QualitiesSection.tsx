import { Heart, ShieldCheck, Sparkles, Feather } from "lucide-react";
import { motion } from "framer-motion";

const qualities = [
  {
    title: "Grace",
    text: "Your simplicity and grace leave a lasting impression.",
    icon: Feather
  },
  {
    title: "Kindness",
    text: "The warmth in your presence makes ordinary moments feel meaningful.",
    icon: Heart
  },
  {
    title: "Strength",
    text: "May you always continue moving towards your dreams with courage and confidence.",
    icon: ShieldCheck
  },
  {
    title: "A Beautiful Presence",
    text: "Some people do not need to do anything extraordinary-their presence itself feels special.",
    icon: Sparkles
  }
] as const;

export function QualitiesSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading centered">
          <p className="eyebrow">For Someone Truly Precious</p>
          <h2>Quiet qualities that make a person unforgettable</h2>
        </div>

        <div className="qualities-grid">
          {qualities.map((quality, index) => {
            const Icon = quality.icon;
            return (
              <motion.article
                className="quality-card"
                key={quality.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Icon size={20} />
                <h3>{quality.title}</h3>
                <p>{quality.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
