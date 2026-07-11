export const galleryItems = [
  {
    src: "/src/assets/images/tanpreet-1.jpg",
    caption: "A graceful moment by the water",
    objectPosition: "42% center"
  },
  {
    src: "/src/assets/images/tanpreet-2.jpg",
    caption: "Sunlit elegance in yellow",
    objectPosition: "50% 38%"
  },
  {
    src: "/src/assets/images/tanpreet-3.jpg",
    caption: "Confidence, calm, and effortless style",
    objectPosition: "52% 34%"
  },
  {
    src: "/src/assets/images/tanpreet-4.jpg",
    caption: "A mountain memory with the softest smile",
    objectPosition: "28% center"
  },
  {
    src: "/src/assets/images/tanpreet-5.jpg",
    caption: "A festive glow made for beautiful memories",
    objectPosition: "50% 34%"
  },
  {
    src: "/src/assets/images/tanpreet-6.jpg",
    caption: "A quiet portrait full of grace",
    objectPosition: "52% 34%"
  }
] as const;

export const storyItems = galleryItems.slice(0, 4);
