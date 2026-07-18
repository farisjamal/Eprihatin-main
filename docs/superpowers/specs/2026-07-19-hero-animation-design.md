# Hero Animation Design — e-Prihatin Landing Page

**Date:** 2026-07-19
**Scope:** Landing page hero section only. CSS-only, no new dependencies.

## Goal

Add entrance animation to the hero section of `src/app/pages/public/LandingPage.tsx` to make the landing page feel more polished and alive.

## Design (approved)

1. **Staggered fade-up entrance** — hero badge, headline, paragraph, and CTA buttons fade in and slide up 20px sequentially (~100ms delay between each, ~700ms duration, ease-out curve).
2. **Ken Burns background zoom** — campus background image slowly scales from 1.0 to 1.08 over 20 seconds (one-shot, holds final frame).
3. **Stats cards stagger** — the 4 glass stat cards overlapping the hero fade-up with per-card delay after the hero text finishes.
4. **Accessibility** — all animations disabled under `prefers-reduced-motion: reduce`; content shows immediately at full opacity.

## Implementation

- New keyframes and utility classes (`hero-fade-up`, `hero-zoom`, `.animate-hero-item`, `.hero-delay-*`, `.animate-hero-zoom`) added to `src/styles/theme.css` under `@layer utilities`.
- Classes applied to existing elements in `LandingPage.tsx`; stats cards get inline `animationDelay` based on index.
- No JS, no new packages, no changes to other pages.

## Out of scope

Page transition animations, navbar changes, scroll-reveal on lower sections (user narrowed scope to hero only).
