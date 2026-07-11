import { useEffect, useState } from "react";
import { siteConfig } from "../data/siteConfig";

export function CountdownSection() {
  const target = new Date(siteConfig.birthdayDate).getTime();
  const [remaining, setRemaining] = useState(() => Math.max(0, target - Date.now()));

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, target - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return (
    <section className="section" aria-labelledby="countdown-title">
      <div className="container compact-section">
        <div className="section-heading">
          <p className="eyebrow">Optional celebration timer</p>
          <h2 id="countdown-title">Birthday Countdown</h2>
        </div>
        {remaining > 0 ? (
          <div className="countdown-grid">
            <TimeBox label="Days" value={days} />
            <TimeBox label="Hours" value={hours} />
            <TimeBox label="Minutes" value={minutes} />
            <TimeBox label="Seconds" value={seconds} />
          </div>
        ) : (
          <p className="countdown-message">Today and every day, may happiness find you.</p>
        )}
      </div>
    </section>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="time-box">
      <strong>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </div>
  );
}
