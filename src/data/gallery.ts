export const galleryItems = [
  {
    src: "/images/tanpreet-1.png",
    caption: "A graceful moment by the water",
    objectPosition: "42% center"
  },
  {
    src: "/images/tanpreet-2.png",
    caption: "Sunlit elegance in yellow",
    objectPosition: "50% 38%"
  },
  {
    src: "/images/tanpreet-3.png",
    caption: "Confidence, calm, and effortless style",
    objectPosition: "52% 34%"
  },
  {
    src: "/images/tanpreet-4.png",
    caption: "A mountain memory with the softest smile",
    objectPosition: "28% center"
  },
  {
    src: "/images/tanpreet-5.png",
    caption: "A festive glow made for beautiful memories",
    objectPosition: "50% 34%"
  },
  {
    src: "/images/tanpreet-6.png",
    caption: "A quiet portrait full of grace",
    objectPosition: "52% 34%"
  }
] as const;

export const storyItems = galleryItems.slice(0, 4);
