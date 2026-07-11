# Tanpreet Birthday Tribute

A mobile-only birthday tribute web app for Tanpreet.

## Install

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Where to place photos

Update the image paths in `src/data/siteConfig.ts`.

Recommended location:

- `src/assets/images/`

Use these exact filenames for the 6 photos shared in chat:

- `src/assets/images/tanpreet-1.jpg` - main lake/boat photo, also used for hero and birthday reveal
- `src/assets/images/tanpreet-2.jpg` - yellow suit portrait
- `src/assets/images/tanpreet-3.jpg` - yellow suit sunglasses photo
- `src/assets/images/tanpreet-4.jpg` - mountain photo
- `src/assets/images/tanpreet-5.jpg` - festive yellow outfit full photo
- `src/assets/images/tanpreet-6.jpg` - festive yellow close portrait

The app falls back gracefully if any image is missing.

## Where to place celebration audio

Use properly licensed or royalty-free audio files. The main track should be a soft instrumental Happy Birthday style recording, not a commercial copyrighted recording.

Bundled generated WAV assets are expected at:

- `public/audio/happy-birthday.wav`
- `public/audio/luxury-celebration.wav`
- `public/audio/celebration-chime.wav`
- `public/audio/popper.wav`
- `public/audio/sparkle.wav`

The app tries `public/audio/happy-birthday.wav` first, then `public/audio/luxury-celebration.wav`. Missing audio will not crash the celebration; it logs one helpful warning and continues quietly.

## Edit content

- Memories: `src/data/memories.ts`
- Gallery and story images: `src/data/gallery.ts`
- Letter content: `src/data/birthdayMessage.ts`
- Global settings: `src/data/siteConfig.ts`
- Motion and scroll behavior: `src/hooks/`

## Notes

- The app is intentionally respectful and avoids proposal-style language.
- It supports fallback placeholders for missing images and music.
- It is designed as a Vite React TypeScript PWA with clean reusable components.
