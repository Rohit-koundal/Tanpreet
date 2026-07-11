import { useState } from "react";
import { SectionTitle } from "./SectionTitle";

const wishes = [
  "May every dream in your heart come true",
  "May peace always find you",
  "May success follow your hard work",
  "May your smile remain bright",
  "May you always be respected and valued",
  "May your life be filled with beautiful moments",
  "May you meet people who genuinely understand you",
  "May happiness stay with you through every chapter"
] as const;

export function WishCards() {
  const [index, setIndex] = useState(0);

  return (
    <section id="wishes" className="section-block">
      <SectionTitle eyebrow="My Wishes for You" title="One wish card at a time" />
      <div className="wish-progress">
        {Math.min(index + 1, wishes.length)} of {wishes.length} wishes
      </div>
      <div className="wish-stack">
        {wishes.slice(index, index + 3).map((wish, visibleIndex) => (
          <article key={wish} className={`wish-card card wish-${visibleIndex}`}>
            {wish}
          </article>
        ))}
      </div>
      <div className="wish-actions">
        <button className="secondary-button" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0}>
          Previous
        </button>
        <button className="primary-button" onClick={() => setIndex((current) => Math.min(wishes.length - 1, current + 1))} disabled={index === wishes.length - 1}>
          {index === wishes.length - 1 ? "All Wishes Read" : "Next Wish"}
        </button>
      </div>
    </section>
  );
}
