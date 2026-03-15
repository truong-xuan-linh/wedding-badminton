# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured.

## Architecture

This is a **single-page wedding invitation website** for Minh Khoa & Thanh Vy, themed as a badminton/ESPN sports broadcast. It is built with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion.

### Entry point

`src/app/page.tsx` — async server component that reads the `?guest=Name` URL query param and passes it to `MainContent` for personalization. Wrapped in a Suspense boundary.

### Data

All wedding content (couple details, venues, story timeline, photo metadata, guestbook messages) is centralized in `src/data/weddingData.ts` as a single typed `WeddingData` object. Edit data here rather than in individual components.

### Components

`src/components/` contains one file per section, rendered in order inside `MainContent`:

1. `IntroAnimation` — Full-screen splash with shuttlecock impact and glass crack reveal
2. `NavBar` — Sticky nav with music toggle; communicates with `BackgroundMusic` via a ref
3. `HeroSection` — ESPN-style scoreboard with player cards, score (21:21), and event info
4. `AthletePass` — Personalized guest card rendered only when `?guest=` param is present
5. `Countdown` — Flip-clock timer to wedding date
6. `OurStory` — Animated relationship timeline
7. `PhotoAlbum` — Flip-book style gallery (20 WebP photos in `/public/`)
8. `ShuttlecockMinigame` — Interactive venue discovery: click mystery cards to reveal ceremony/reception/afterparty details
9. `WeddingDetails` — Full venue logistics
10. `Guestbook` — LED ticker-style scrolling messages
11. `BackgroundMusic` — Floating audio player for `background-music.mp3`

### Styling

- **Tailwind CSS v4** via PostCSS — config in `tailwind.config.ts`
- Custom color tokens: `court-*` (dark greens), `gold-*` (trophy gold), `led-*` (scoreboard orange/amber/red/green), `scoreboard`
- Custom fonts via CSS variables: `--font-display` (Anton), `--font-heading` (Oswald), `--font-body` (Inter), `--font-mono` (Courier Prime)
- Reusable effect classes (`.led-text`, `.glass-card`, `.court-line`, `.athlete-pass`, etc.) defined in `src/app/globals.css`

### Animation patterns

- **Framer Motion** is used throughout — `motion.div` with `initial`/`animate`/`exit` props
- Sections use `IntersectionObserver` to trigger entrance animations on scroll
- `AnimatePresence` wraps conditionally rendered elements for exit animations
- Staggered list animations use incremental `delay` values per item
