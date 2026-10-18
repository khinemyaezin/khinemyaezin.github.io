# Migration Phases Plan

## Overview

6-phase migration from Angular 18 to React 19.3 static SPA. Each phase has defined deliverables, exit criteria, and rollback considerations.

**Total estimated effort: 14–21 days**

---

## Phase 0 — Project Setup

**Duration:** 1–2 days

**Objectives:**
- Scaffold Vite + React 19.3 + TypeScript + React Router + Tailwind CSS
- Copy JSON data files and public assets
- Configure ESLint, Prettier, Vitest
- Set up GitHub Actions for GitHub Pages

**Deliverables:**
- `package.json` with React 19.3 deps
- `vite.config.ts`, `tailwind.config.ts`, `tsconfig.json`
- `src/main.tsx`, `src/App.tsx`, `src/index.css`
- `src/data/projects.json`, `experience.json`, `story.data.json` (copied)
- `public/` assets copied
- `.github/workflows/deploy.yml` (GitHub Pages)
- Empty `dist/` build passing `npm run build`

**Exit Criteria:**
- `npm run dev` starts Vite dev server on localhost:5173
- `npm run build` produces static output in `dist/`
- GitHub Actions deploys to GitHub Pages successfully

**Rollback:** No impact on existing Angular app; new repo branch.

---

## Phase 1 — Core Layout & Shell

**Duration:** 2–3 days

**Objectives:**
- App router with `/` and `/portfolio` routes
- Main layout component with `<main>` scroll container
- Scroll progress bar
- Custom cursor + trail
- Global scroll listener + smooth scroll hook

**Deliverables:**
- `src/components/layout/Layout.tsx`
- `src/components/layout/ScrollProgress.tsx`
- `src/components/ui/Cursor.tsx`
- `src/hooks/useScrollProgress.ts`
- `src/hooks/useCursor.ts`
- `src/hooks/useSmoothScroll.ts`
- `src/hooks/useIntersectionObserver.ts`
- `src/pages/Home.tsx` (redirect to /portfolio)
- `src/pages/Portfolio.tsx` (shell with empty section placeholders)

**Exit Criteria:**
- Scroll progress bar updates on scroll
- Custom cursor follows mouse with trail lag
- Smooth scroll works on `<main>` (momentum-based)
- Navigation between `/` and `/portfolio` works

---

## Phase 2 — Content Sections (Static)

**Duration:** 3–4 days

**Objectives:**
- Render all 8 sections from JSON data
- Hero section with text reveal
- Introduction section (basic structure)
- Story section (paragraphs from JSON)
- Experience section (timeline list)
- Projects section (card list)
- Title sections (2 instances with different messages)
- Contact section (social links)

**Deliverables:**
- `src/components/sections/Hero.tsx`
- `src/components/sections/Introduction.tsx`
- `src/components/sections/Story.tsx`
- `src/components/sections/Experience.tsx`
- `src/components/sections/Projects.tsx`
- `src/components/sections/ProjectCard.tsx`
- `src/components/sections/Title.tsx`
- `src/components/sections/Contact.tsx`
- `src/types/index.ts`

**Exit Criteria:**
- All sections render with correct content from JSON
- Images load from public assets
- Layout matches Angular design (Tailwind equivalent)

---

## Phase 3 — Animations & Interactions

**Duration:** 3–4 days

**Objectives:**
- Port all scroll-driven animations from Angular directives
- Text reveal (char-by-char stagger)
- Introduction door effect (split chars, translateX)
- Story profile scale/rotate + paragraph fade-in thresholds
- Experience active/inactive overlay (throttled)
- Projects horizontal slider synced to scroll (`translate3d`)
- Title sticky word cycling
- Contact magnetic links

**Deliverables:**
- `src/hooks/useTextReveal.ts`
- `src/hooks/useMagnetic.ts`
- `src/hooks/useThrottle.ts`
- `src/hooks/useAnimationFrame.ts`
- Updated section components with animation logic
- `src/index.css` with custom keyframes (fade-in, text-reveal, door-closed)

**Exit Criteria:**
- All animations match Angular behavior at 60fps
- Scroll-driven transforms work smoothly
- Magnetic links respond to mouse movement
- No React console warnings/errors

---

## Phase 4 — Testing

**Duration:** 2–3 days

**Objectives:**
- Unit tests for hooks and components
- E2E tests for critical user flows

**Deliverables:**
- `vitest.config.ts`
- `src/hooks/*.test.ts` (useScrollProgress, useIntersectionObserver, etc.)
- `src/components/sections/*.test.tsx` (rendering + props)
- `e2e/` Playwright tests:
  - Home page loads and redirects
  - All sections visible on scroll
  - Projects slider moves on scroll
  - Contact magnetic links hover
  - External links open in new tab

**Exit Criteria:**
- `npm run test` passes (unit)
- `npm run test:e2e` passes (Playwright)
- Coverage ≥ 70% for hooks and utilities

---

## Phase 5 — Polish & Optimization

**Duration:** 2–3 days

**Objectives:**
- Performance optimization (memoization, lazy loading)
- Accessibility audit (ARIA, keyboard nav, focus management)
- SEO meta tags
- 404.html fallback for GitHub Pages
- Favicon and OG images

**Deliverables:**
- `public/404.html` (SPA fallback)
- `src/components/SEO.tsx` (meta tags)
- Accessibility fixes (aria-labels, role, tabIndex)
- Performance: bundle size < 200 KB JS gzipped

**Exit Criteria:**
- Lighthouse score ≥ 90 (Performance, Accessibility, SEO)
- Keyboard navigation works end-to-end
- No axe-core accessibility violations

---

## Phase 6 — Deployment & Cutover

**Duration:** 1–2 days

**Objectives:**
- Final build and deploy to GitHub Pages
- Verify live site matches Angular functionality
- Decommission Angular build artifacts

**Deliverables:**
- Live site on `https://khinemyaezin.github.io/`
- Angular `angular.json`, `server.ts`, `*.spec.ts` removed from main branch
- Documentation updated (README.md reflects React stack)

**Exit Criteria:**
- Site accessible at GitHub Pages URL
- All features functional in production
- Angular CI/CD workflows removed/replaced

---

## Dependency Removal Checklist (post-migration)

Remove from repository:
- [ ] `angular.json`
- [ ] `package-lock.json` (regenerate)
- [ ] `server.ts`
- [ ] `src/main.server.ts`
- [ ] `src/app/app.config.server.ts`
- [ ] `src/app/layout/home/home.component.spec.ts`
- [ ] `next-env.d.ts`
- [ ] `.next/`
- [ ] `out/`
- [ ] `tsconfig.spec.json`
- [ ] `.github/workflows/webpack.yml` (if Angular-specific)
- [ ] `zone.js`, `@angular/*`, `rxjs` from package.json

---

## Rollback Plan

- Migration performed on feature branch `migrate/react-19`
- Angular `main` branch remains untouched until Phase 6
- If critical issues arise, merge can be aborted; Angular app remains deployable
- Rollback = delete feature branch, keep `main` as-is

---

## Daily Standup Checklist (during migration)

- [ ] Bun dev server running without errors (`bun run dev`)
- [ ] Tailwind classes compiling correctly
- [ ] React Router navigation working
- [ ] JSON data importing without type errors
- [ ] Animations at 60fps (no jank)
- [ ] Tests passing (`bun test`)
- [ ] Build output in `dist/` correct size (`bun run build`)
