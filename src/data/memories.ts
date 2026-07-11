import { BusFront, GraduationCap, Clock3, MapPin, HeartHandshake, BriefcaseBusiness } from "lucide-react";

export const memories = [
  {
    title: "B.Com College Days",
    description: "The beginning of memories that still remain special. Ordinary college days became unforgettable because you were part of them.",
    meta: "B.Com college",
    icon: GraduationCap
  },
  {
    title: "Matour Chowk",
    description: "Sometimes reaching Matour Chowk early was simply about hoping to see you for a moment. On the days you appeared, the day somehow felt complete.",
    meta: "Matour Chowk",
    icon: MapPin
  },
  {
    title: "Bus Memories",
    description: "Friends would tease, make silly bets, and encourage me to sit near you. Even when I did, nervousness always won over words.",
    meta: "During bus rides",
    icon: BusFront
  },
  {
    title: "A Back-Seat Memory",
    description: "One simple bus journey, sitting close but being too nervous to speak, quietly became unforgettable.",
    meta: "Back seat",
    icon: HeartHandshake
  },
  {
    title: "December 31, 2022 — 2:30 AM",
    description: "A moment that may have seemed ordinary, but became a memory I never forgot.",
    meta: "Bus Stand",
    icon: Clock3
  },
  {
    title: "Clerk Office Moments",
    description: "Two brief moments outside the clerk office that remained meaningful, even though I could never express myself properly.",
    meta: "Clerk office",
    icon: BriefcaseBusiness
  }
] as const;
