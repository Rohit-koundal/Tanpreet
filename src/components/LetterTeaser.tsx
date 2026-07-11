type LetterTeaserProps = {
  onOpen: () => void;
};

export function LetterTeaser({ onOpen }: LetterTeaserProps) {
  return (
    <section id="letter" className="section">
      <div className="container compact-section letter-teaser">
        <div className="section-heading">
          <p className="eyebrow">A Few Words From My Heart</p>
          <h2>An elegant letter waiting behind a quiet envelope</h2>
        </div>
        <button className="button primary" onClick={onOpen}>
          Read the Letter
        </button>
      </div>
    </section>
  );
}
