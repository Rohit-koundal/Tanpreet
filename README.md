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

Use these exact filenames for deployable public photos:

- `public/images/tanpreetmain.png` - main hero and birthday reveal image
- `public/images/tanpreet-1.png` - lake/boat photo
- `public/images/tanpreet-2.png` - yellow suit portrait
- `public/images/tanpreet-3.png` - yellow suit sunglasses photo
- `public/images/tanpreet-4.png` - mountain photo
- `public/images/tanpreet-5.png` - festive yellow outfit full photo
- `public/images/tanpreet-6.png` - festive yellow close portrait

The app falls back gracefully if any image is missing.

## Where to place celebration audio

Use properly licensed or royalty-free audio files. The main track should be a soft instrumental Happy Birthday style recording, not a commercial copyrighted recording.

Deployable audio assets are expected at:

- `public/audio/happy-birthday.mp3`
- `public/audio/luxury-celebration.mp3`
- `public/audio/celebration-chime.mp3`
- `public/audio/popper.mp3`
- `public/audio/sparkle.mp3`

The app tries `public/audio/happy-birthday.mp3` first, then `public/audio/luxury-celebration.mp3`. Missing audio will not crash the celebration; it logs one helpful warning and continues quietly.

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
