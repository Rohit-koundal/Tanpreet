type MusicPromptModalProps = {
  onPlayMusic: () => void;
  onContinue: () => void;
};

export function MusicPromptModal({ onPlayMusic, onContinue }: MusicPromptModalProps) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="music-title">
      <div className="modal-panel music-panel">
        <p className="eyebrow">Optional background music</p>
        <h2 id="music-title">Would you like to play soft background music?</h2>
        <div className="button-row">
          <button className="button primary" onClick={onPlayMusic}>
            Play Music
          </button>
          <button className="button secondary" onClick={onContinue}>
            Continue Without Music
          </button>
        </div>
      </div>
    </div>
  );
}
