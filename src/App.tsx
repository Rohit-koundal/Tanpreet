import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { MobileHeader } from "./components/MobileHeader";
import { BottomNavigation } from "./components/BottomNavigation";
import { FloatingPetals } from "./components/FloatingPetals";
import { LetterReader } from "./components/LetterReader";
import { MusicController } from "./components/MusicController";
import { CelebrationExperience } from "./components/celebration/CelebrationExperience";
import { CelebrationProvider, useCelebration } from "./context/CelebrationContext";
import { Home } from "./pages/Home";
import { useScrollProgress } from "./hooks/useScrollProgress";

const sectionIds = ["home", "memories", "gallery", "letter", "wishes"];

function AppContent() {
  const celebration = useCelebration();
  const [letterOpen, setLetterOpen] = useState(false);
  const { activeId } = useScrollProgress(sectionIds);

  useEffect(() => {
    if (!celebration.isCompleted) return;
    document.body.style.overflow = letterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [celebration.isCompleted, letterOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: celebration.reducedMotion ? "auto" : "smooth", block: "start" });
  };

  const headerCelebrate = () => {
    celebration.headerCelebrate();
    scrollTo("home");
  };

  const showMainApp = celebration.isCompleted;
  const bottomNavHidden = letterOpen || !showMainApp;

  return (
    <div className="app-frame-inner">
      <CelebrationExperience />
      {showMainApp ? <FloatingPetals reducedMotion={celebration.reducedMotion} /> : null}

      {showMainApp ? (
        <>
          <MobileHeader onMusicToggle={celebration.audio.toggle} musicActive={celebration.audio.isPlaying} onCelebrate={headerCelebrate} />
          <Home onOpenLetter={() => setLetterOpen(true)} onScrollTo={scrollTo} />
          <BottomNavigation activeId={activeId} hidden={bottomNavHidden} onNavigate={scrollTo} />
          <MusicController />
          <LetterReader open={letterOpen} onClose={() => setLetterOpen(false)} />
        </>
      ) : null}
    </div>
  );
}

function App() {
  return (
    <CelebrationProvider>
      <AppShell>
        <AppContent />
      </AppShell>
    </CelebrationProvider>
  );
}

export default App;
