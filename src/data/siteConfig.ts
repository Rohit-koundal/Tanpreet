export const siteConfig = {
  recipientName: "Tanpreet",
  birthdayDate: "2026-01-01T00:00:00",
  mainImage: "/images/tanpreetmain.png",
  mainImageObjectPosition: "42% center",
  galleryImages: [
    "/images/tanpreet-1.png",
    "/images/tanpreet-2.png",
    "/images/tanpreet-3.png",
    "/images/tanpreet-4.png",
    "/images/tanpreet-5.png",
    "/images/tanpreet-6.png"
  ],
  storyImages: [
    "/images/tanpreet-1.png",
    "/images/tanpreet-2.png",
    "/images/tanpreet-3.png",
    "/images/tanpreet-4.png"
  ],
  music: "/audio/happy-birthday.mp3",
  audio: {
    happyBirthday: "/audio/happy-birthday.mp3",
    fallbackMusic: "/audio/luxury-celebration.mp3",
    chime: "/audio/celebration-chime.mp3",
    popper: "/audio/popper.mp3",
    sparkle: "/audio/sparkle.mp3"
  },
  showCountdown: false,
  enableMusic: true,
  enablePetals: true,
  enableConfetti: true,
  enableFinalSurprise: true,
  maxAppWidth: 430,
  title: "Happy Birthday Tanpreet | A Special Celebration",
  description: "A heartfelt and respectful birthday tribute created with beautiful memories and sincere wishes for Tanpreet.",
  themeColor: "#f6efe3",
  colors: {
    ivory: "#f8f2e9",
    cream: "#fffaf2",
    champagne: "#c9a35b",
    rose: "#d9a7a1",
    blush: "#ead1cb",
    burgundy: "#6f3040",
    brown: "#594438"
  }
} as const;
