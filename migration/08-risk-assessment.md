# Risk Assessment

## Risk Register

| ID | Risk | Likelihood | Impact | Severity | Mitigation | Owner |
|---|---|---|---|---|---|---|
| R1 | Scroll-driven animations (projects slider, title cycling) don't match Angular smoothness | High | High | High | Port `requestAnimationFrame` loops faithfully; test on multiple devices; use `requestAnimationFrame` not `setInterval` | Developer |
| R2 | Custom cursor + trail feels laggy or misaligned | Medium | Medium | Medium | Use `requestAnimationFrame` with lerp (0.15 factor); attach to `document.body` absolutely positioned | Developer |
| R3 | GitHub Pages 404 on direct URL access (client-side routing) | Medium | Medium | Medium | Add `404.html` SPA fallback OR use hash-based routing in React Router | Developer |
| R4 | Loss of Angular SSR SEO benefits | Medium | Medium | Low | Add static meta tags (title, description, Open Graph); consider `react-snap` or pre-rendering if needed | Developer |
| R5 | Tailwind CSS doesn't replicate complex SCSS (door effect, gradient text, sticky sections) | Medium | Medium | Medium | Use custom CSS in `index.css` for keyframes + complex utilities; verify against Angular screenshots | Developer |
| R6 | JSON data type mismatches between Angular and React | Low | Medium | Medium | Define strict TypeScript interfaces matching JSON schema; use `satisfies` or runtime validation | Developer |
| R7 | Browser compatibility (mobile Safari scroll behavior) | Medium | Medium | Medium | Test on iOS Safari and Android Chrome; use `-webkit-overflow-scrolling: touch` if needed | Developer |
| R8 | Bundle size exceeds target due to React Router + React 19 | Low | Low | Low | Code-split routes; tree-shake icons (`lucide-react`); analyze with `rollup-plugin-visualizer` | Developer |
| R9 | Team unfamiliarity with React 19 / hooks patterns | Medium | Medium | Medium | Pair programming; reference component mapping doc (`05-react-component-mapping.md`) | Team |
| R10 | GitHub Actions deployment failure | Low | High | Medium | Pin action versions; test workflow on feature branch before merge; keep `angular-cli-ghpages` as fallback | DevOps |

## Risk Details

### R1: Scroll Animation Smoothness

**Description:** The Angular app uses custom momentum-based smooth scroll (`SmoothScrollV1`) combined with `requestAnimationFrame` loops for the projects slider, title cycling, and introduction door effect. Porting these to React with `useEffect` + scroll listeners may introduce jank or desync.

**Mitigation:**
- Use a single `requestAnimationFrame` loop shared across animation components (not one per component)
- Read scroll position once per frame, derive all transforms from it
- Use `useCallback` with stable refs to avoid re-creating animation functions
- Test with Chrome DevTools Performance panel (target 60fps, < 16ms frame time)

**Contingency:** Fall back to CSS scroll-driven animations (`animation-timeline: scroll()`) where supported, with JS polyfill.

### R2: Custom Cursor

**Description:** The Angular `CursorDirective` creates two absolutely-positioned divs on `document.body` and updates them via `window:mousemove` + RAF loop. In React, direct DOM manipulation outside render cycle is required.

**Mitigation:**
- `useCursor()` hook creates elements on mount, removes on unmount
- Use `position: fixed`, `pointer-events: none` on cursor elements
- Hover detection: `event.target.closest('a, button, [role="button"]')`
- Trail lerp factor 0.15 matches Angular exactly

**Contingency:** Simplify to single cursor (no trail) if performance issues on low-end devices.

### R3: GitHub Pages 404 on Direct URL

**Description:** GitHub Pages serves static files. Direct access to `/portfolio` returns 404 because there's no `portfolio.html`. React Router uses browser history.

**Mitigation:**
- Option A: Add `404.html` that reads `sessionStorage.redirect` and loads `index.html`
- Option B: Use `createHashRouter` (URLs like `/#/portfolio`) — no 404 issue, less clean URLs
- Option C: GitHub Pages custom domain + rewrite rules (if available)

**Recommended:** Option A (clean URLs + SPA fallback).

### R4: Loss of SSR SEO

**Description:** Angular app had SSR via Express (`server.ts`). React static SPA has no server-side rendering.

**Mitigation:**
- Add `<meta>` tags for title, description, Open Graph, Twitter Card
- Use semantic HTML (`<section>`, `<nav>`, `<main>`, `<footer>`)
- Add `sitemap.xml` and `robots.txt` to `public/`
- If SEO becomes critical, evaluate `vite-plugin-ssr` or `react-snap` pre-rendering

**Contingency:** Accept reduced SEO for portfolio site (low traffic, personal brand).

### R5: Tailwind vs SCSS Complexity

**Description:** Angular uses SCSS with complex animations (door-closed, gradient-text, shrink-jump, sticky positioning). Tailwind utilities may not cover all cases.

**Mitigation:**
- Extract complex keyframes into `index.css` (`@keyframes fadeIn`, `@keyframes textReveal`, `@keyframes doorClose`)
- Use Tailwind for layout/spacing/typography; custom CSS for animations
- Map `variables.scss` colors to Tailwind config
- Use `arbitrary values` (`w-[{progress}%]`, `translate-x-[-{currentX}px]`) for dynamic styles

**Contingency:** Keep a small `src/app.scss` imported in `index.css` for legacy SCSS patterns that can't be ported.

### R6: JSON Data Type Safety

**Description:** Angular imports JSON with implicit types. React + TypeScript requires explicit interfaces.

**Mitigation:**
- Define `Project`, `ExperiencePost`, `StoryData` interfaces in `src/types/index.ts`
- Import JSON with `resolveJsonModule` (Vite handles this automatically)
- Add runtime validation with `zod` if data comes from external source (not needed for local JSON)

**Contingency:** Use `as Project[]` type assertion with thorough unit tests.

### R7: Mobile Scroll Behavior

**Description:** iOS Safari and Android Chrome have different scroll momentum and `scrollTop` behavior. The Angular app had mobile-scroll fixes (per git log: "fix mobile view scroll is barely moved").

**Mitigation:**
- Test on physical iOS and Android devices
- Use `overflow-y: scroll` + `-webkit-overflow-scrolling: touch` on scroll container
- Consider `touch-action: none` on scroll container to prevent pull-to-refresh interference

**Contingency:** Revert to native browser scroll on mobile if custom smooth scroll causes issues.

---

## Risk Matrix (Severity = Likelihood × Impact)

```
High ────────────────────────────── R1, R3
        R2, R5, R7, R10
Medium ────────────────────────── R4, R6, R9
        R8
Low  ────────────────────────────────────
             Impact ──────────────────▶
```

## Top 3 Risks to Monitor Weekly

1. **R1** — Scroll animation smoothness (blocker for feature parity)
2. **R3** — GitHub Pages 404 routing (blocker for deployment)
3. **R2** — Custom cursor feel (quality blocker)

## Risk Review Cadence

- Review risk register at end of each migration phase
- Re-assess likelihood/impact after Phase 3 (animations) completion
- Escalate any risk with severity "High" that isn't mitigated within 2 days
