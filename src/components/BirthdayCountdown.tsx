import { useEffect, useState } from "react";
import { siteConfig } from "../data/siteConfig";

export function BirthdayCountdown() {
  const birthday = new Date(siteConfig.birthdayDate).getTime();
  const [remaining, setRemaining] = useState(Math.max(0, birthday - Date.now()));

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, birthday - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, [birthday]);

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const minutes = Math.floor((remaining / 60000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return (
    <section className="card countdown-card" aria-labelledby="countdown-title">
      <h2 id="countdown-title">Birthday Countdown</h2>
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
