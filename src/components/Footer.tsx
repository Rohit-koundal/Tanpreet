type FooterProps = {
  recipientName: string;
};

export function Footer({ recipientName }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>Made with respect, gratitude, beautiful memories, and sincere wishes.</p>
        <p className="footer-highlight">May your life always be filled with happiness, peace, and beautiful moments.</p>
        <p>For {recipientName} ✨</p>
      </div>
    </footer>
  );
}
