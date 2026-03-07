# Alex Mercer — Portfolio

A full-stack developer portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Design

Dark industrial-luxury aesthetic — charcoal backgrounds, amber/gold accents, editorial `Syne` + `Instrument Serif` typography, custom cursor, scroll-triggered reveals, and animated hero.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS custom properties
- **Fonts**: Syne, DM Mono, Instrument Serif (Google Fonts)
- **Animations**: Pure CSS + Intersection Observer

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx       # Root layout + metadata
  page.tsx         # Page assembling all sections
  globals.css      # CSS variables, animations, base styles

components/
  Cursor.tsx       # Custom animated cursor
  Navbar.tsx       # Sticky nav with scroll effect
  Hero.tsx         # Landing hero section
  About.tsx        # About section with photo + bio
  Skills.tsx       # Skills grid
  Experience.tsx   # Work history timeline
  Projects.tsx     # Project cards grid
  Contact.tsx      # Contact form + channels
  Footer.tsx       # Footer
  RevealWrapper.tsx # Scroll-reveal HOC

lib/
  data.ts          # All portfolio content (easy to edit)
```

## Customization

All content lives in `lib/data.ts` — edit stats, skills, experience, and projects there.
To swap in a real photo, replace the `AM` placeholder in `components/About.tsx` with a Next.js `<Image>` component.

## Build

```bash
npm run build
npm start
```

## Deploy

One-click deploy to Vercel: push to GitHub and import the repo at [vercel.com](https://vercel.com).
