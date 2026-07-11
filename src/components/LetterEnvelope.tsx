type LetterEnvelopeProps = {
  onOpen: () => void;
};

export function LetterEnvelope({ onOpen }: LetterEnvelopeProps) {
  return (
    <section id="letter" className="section-block">
      <div className="section-title">
        <p className="eyebrow">A Few Words From My Heart</p>
        <h2>An elegant envelope holding a respectful letter</h2>
      </div>
      <button className="envelope-card card" onClick={onOpen}>
        <div className="envelope-top" />
        <div className="envelope-body">
          <span className="envelope-seal">T</span>
          <strong>Open the Letter</strong>
          <p>A quiet message, folded gently for reading.</p>
        </div>
      </button>
    </section>
  );
}
