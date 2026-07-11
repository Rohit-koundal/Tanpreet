import { useEffect, useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";

type NavbarProps = {
  onCelebrate: () => void;
};

export function Navbar({ onCelebrate }: NavbarProps) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className={`navbar ${solid ? "navbar-solid" : ""}`}>
      <div className="navbar-brand">
        <Sparkles size={18} />
        <span>T ✦ For Tanpreet</span>
      </div>

      <nav className={`navbar-links ${open ? "open" : ""}`}>
        <button onClick={() => jumpTo("hero")}>Home</button>
        <button onClick={() => jumpTo("memories")}>Memories</button>
        <button onClick={() => jumpTo("gallery")}>Gallery</button>
        <button onClick={() => jumpTo("letter")}>Letter</button>
        <button onClick={() => jumpTo("wishes")}>Wishes</button>
      </nav>

      <div className="navbar-actions">
        <button className="button secondary small" onClick={onCelebrate}>
          Celebrate 🎉
        </button>
        <button className="icon-button mobile-toggle" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}
