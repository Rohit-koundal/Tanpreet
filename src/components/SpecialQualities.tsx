import { Flower2, Heart, Sparkles, ShieldCheck } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const qualities = [
  { title: "Grace", text: "Your simplicity and grace leave a lasting impression.", icon: Flower2 },
  { title: "Kindness", text: "The warmth in your presence makes ordinary moments feel meaningful.", icon: Heart },
  { title: "Strength", text: "May you always keep moving towards your dreams with courage and confidence.", icon: ShieldCheck },
  {
    title: "A Beautiful Presence",
    text: "Some people do not need to do anything extraordinary-their presence itself feels special.",
    icon: Sparkles
  }
] as const;

export function SpecialQualities() {
  return (
    <section className="section-block">
      <SectionTitle eyebrow="For Someone Truly Precious" title="Quiet qualities that make a person unforgettable" />
      <div className="quality-stack">
        {qualities.map((quality) => {
          const Icon = quality.icon;
          return (
            <article key={quality.title} className="quality-card card">
              <Icon size={18} />
              <h3>{quality.title}</h3>
              <p>{quality.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
