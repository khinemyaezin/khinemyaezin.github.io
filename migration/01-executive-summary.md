# Executive Summary

## Current State

The repository is an Angular 18 standalone-component application (`khinemyaezin.github.io` v2.1) serving as a personal portfolio. It uses:

- Angular 18 (standalone components, no NgModules)
- SCSS + Bootstrap 5.3.3 + Bootstrap Icons
- RxJS 7 for scroll/event streams
- Angular SSR (Express engine) — present in `server.ts`, `main.server.ts`
- Zone.js change detection
- Hash-based routing (`withHashLocation()`)
- Deployed via `angular-cli-ghpages` to GitHub Pages

Leftover Next.js artifacts exist (`.next/`, `out/`, `next-env.d.ts`, `server.ts`) from a prior partial migration attempt, but `package.json` is purely Angular. The actual source code lives under `src/app/`.

## Target State

A static single-page application built with:

- **React 19.3** (latest stable)
- **React Router v7** (browser history)
- **Vite** (build tool, dev server)
- **Tailwind CSS** (styling, replaces SCSS/Bootstrap)
- **TypeScript**
- **Vitest + React Testing Library** (unit tests)
- **Playwright** (E2E tests)
- Deployed as static files to GitHub Pages via GitHub Actions

## Migration Scope

| In Scope | Out of Scope |
|---|---|
| All Angular components under `src/app/` | Angular SSR/Express server (`server.ts`) |
| JSON data files (`projects.json`, `experience.json`, `story.data.json`) | Zone.js, RxJS (except where logic is ported) |
| Public assets (images, SVGs, favicon) | Karma/Jasmine test runner |
| SCSS-based animations ported to Tailwind/CSS | Angular CLI build (`ng build`) |
| Custom cursor, smooth scroll, magnetic links | Next.js/server-side rendering |

## Timeline Estimate

| Phase | Duration | Description |
|---|---|---|
| Phase 0 — Setup | 1–2 days | Scaffold Vite + React + TS + Tailwind + React Router |
| Phase 1 — Core layout | 2–3 days | App shell, routing, scroll progress, custom cursor |
| Phase 2 — Content sections | 3–4 days | Hero, Introduction, Story (JSON-driven) |
| Phase 3 — Interactive sections | 3–4 days | Experience timeline, Projects slider, Contact magnetic links |
| Phase 4 — Animations | 2–3 days | Port scroll directives to React hooks + CSS animations |
| Phase 5 — Testing | 2–3 days | Unit + E2E tests |
| Phase 6 — Deploy | 1–2 days | GitHub Pages CI/CD, cutover |

**Total estimated effort: 14–21 days** (part-time or focused sprint)

## Success Criteria

- [ ] All 8 sections (Hero, Introduction, Story, Experience, Projects, Contact + 2 Title sections) render correctly
- [ ] Scroll-based animations work (text reveal, door effect, scale/rotate, slider transform, overlay toggle)
- [ ] Custom cursor with trail and hover states works
- [ ] Magnetic link hover effects on contact links work
- [ ] JSON data drives all content (projects, experience, story)
- [ ] Site builds and deploys to GitHub Pages via CI/CD
- [ ] Lighthouse score ≥ 90 for Performance, Accessibility, SEO

## Risks

- Scroll-driven animations (projects slider, title cycling) require careful `requestAnimationFrame` + scroll listener porting
- Custom cursor requires global DOM manipulation outside React render cycle
- Hash history vs browser history on GitHub Pages (404 handling for direct URL access)
- Loss of Angular SSR SEO benefits (mitigated by static pre-rendering or meta tags)
