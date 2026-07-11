type IntroModalProps = {
  recipientName: string;
  onBegin: () => void;
  onQuietClose: () => void;
};

export function IntroModal({ recipientName, onBegin, onQuietClose }: IntroModalProps) {
  return (
    <div className="modal-backdrop intro-backdrop" role="dialog" aria-modal="true" aria-labelledby="intro-title">
      <div className="modal-panel intro-panel">
        <p className="eyebrow">Today is all about you</p>
        <h1 id="intro-title">Happy Birthday, {recipientName} 🎂</h1>
        <p className="intro-text">A small celebration created with respect, warm wishes, and beautiful memories.</p>
        <div className="button-row">
          <button className="button primary" onClick={onBegin}>
            Begin the Celebration
          </button>
          <button className="button secondary" onClick={onQuietClose}>
            Explore Quietly
          </button>
        </div>
      </div>
    </div>
  );
}
