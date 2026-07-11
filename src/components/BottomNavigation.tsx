import { Heart, Home, Images, Mail, Sparkles } from "lucide-react";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "memories", label: "Memories", icon: Sparkles },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "letter", label: "Letter", icon: Mail },
  { id: "wishes", label: "Wishes", icon: Heart }
] as const;

type BottomNavigationProps = {
  activeId: string;
  hidden?: boolean;
  onNavigate: (id: string) => void;
};

export function BottomNavigation({ activeId, hidden, onNavigate }: BottomNavigationProps) {
  if (hidden) return null;

  return (
    <nav className="bottom-nav" aria-label="Primary">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeId === tab.id;
        return (
          <button key={tab.id} className={`nav-tab ${active ? "active" : ""}`} onClick={() => onNavigate(tab.id)} aria-current={active ? "page" : undefined}>
            <Icon size={17} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
