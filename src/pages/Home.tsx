import { BirthdayCountdown } from "../components/BirthdayCountdown";
import { FinalMessage } from "../components/FinalMessage";
import { GalleryCarousel } from "../components/GalleryCarousel";
import { GiftSurprise } from "../components/GiftSurprise";
import { HeroCard } from "../components/HeroCard";
import { LetterEnvelope } from "../components/LetterEnvelope";
import { MemoryTimeline } from "../components/MemoryTimeline";
import { PhotoStories } from "../components/PhotoStories";
import { SpecialQualities } from "../components/SpecialQualities";
import { WishCards } from "../components/WishCards";
import { siteConfig } from "../data/siteConfig";

type HomeProps = {
  onOpenLetter: () => void;
  onScrollTo: (id: string) => void;
};

export function Home({ onOpenLetter, onScrollTo }: HomeProps) {
  return (
    <main className="home-content">
      <HeroCard onReadWish={onOpenLetter} onExploreMemories={() => onScrollTo("memories")} />
      {siteConfig.showCountdown ? <BirthdayCountdown /> : null}
      <PhotoStories />
      <MemoryTimeline />
      <GalleryCarousel />
      <SpecialQualities />
      <LetterEnvelope onOpen={onOpenLetter} />
      <WishCards />
      <GiftSurprise />
      <FinalMessage />
    </main>
  );
}
