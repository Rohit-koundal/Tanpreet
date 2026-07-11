export const siteConfig = {
  recipientName: "Tanpreet",
  birthdayDate: "2026-01-01T00:00:00",
  mainImage: "/src/assets/images/tanpreetmain.png",
  mainImageObjectPosition: "42% center",
  galleryImages: [
    "/src/assets/images/tanpreet-1.png",
    "/src/assets/images/tanpreet-2.png",
    "/src/assets/images/tanpreet-3.png",
    "/src/assets/images/tanpreet-4.png",
    "/src/assets/images/tanpreet-5.png",
    "/src/assets/images/tanpreet-6.png"
  ],
  storyImages: [
    "/src/assets/images/tanpreet-1.png",
    "/src/assets/images/tanpreet-2.png",
    "/src/assets/images/tanpreet-3.png",
    "/src/assets/images/tanpreet-4.png"
  ],
  music: "/audio/happy-birthday.wav",
  audio: {
    happyBirthday: "/audio/happy-birthday.wav",
    fallbackMusic: "/audio/luxury-celebration.wav",
    chime: "/audio/celebration-chime.wav",
    popper: "/audio/popper.wav",
    sparkle: "/audio/sparkle.wav"
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
