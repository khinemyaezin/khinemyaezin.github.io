# Source Code Analysis

## Repository Structure (Angular)

```
khinemyaezin.github.io/
├── angular.json              # Angular CLI build config (SSR, prerender, ghpages deploy)
├── package.json              # Angular 18 deps, ng serve/build/test scripts
├── tsconfig.json             # TypeScript config (ES2022, strict, experimentalDecorators)
├── server.ts                 # Express SSR server (to be removed)
├── src/
│   ├── index.html            # Shell HTML with <app-root>
│   ├── main.ts               # Angular bootstrap entry
│   ├── main.server.ts        # SSR bootstrap entry (to be removed)
│   ├── app/
│   │   ├── app.component.ts          # Root component (<router-outlet />)
│   │   ├── app.component.html        # <router-outlet />
│   │   ├── app.component.scss
│   │   ├── app.routes.ts             # Routes: '' → home → portfolio (hash location)
│   │   ├── app.config.ts             # provideRouter(withHashLocation), provideClientHydration
│   │   ├── app.config.server.ts      # SSR config
│   │   ├── dad-component.ts          # Abstract base with destroy$ Subject (OnDestroy)
│   │   ├── layout/
│   │   │   ├── home/                 # Shell layout (<router-outlet />)
│   │   │   └── portfolio/            # Main layout: scroll progress, <main>, all sections
│   │   ├── section/
│   │   │   ├── hero/                 # HELLO title with textReveal
│   │   │   ├── introduction/         # Split-char animation, door effect
│   │   │   ├── story/                # Profile scale/rotate, fade-in paragraphs
│   │   │   ├── experience/           # Timeline with scroll-activated overlays
│   │   │   ├── project/              # Horizontal slider synced to scroll
│   │   │   ├── project-wrapper/      # Wrapper + offsetTop tracking
│   │   │   ├── title/                # Sticky cycling words ("STUFFS", "Find me!")
│   │   │   └── contact/              # Magnetic social links, footer year
│   │   ├── directive/
│   │   │   ├── scroll-emitter.directive.ts   # Custom smooth scroll (SmoothScrollV1)
│   │   │   ├── intersection.directive.ts     # IntersectionObserver wrapper
│   │   │   ├── text-reveal.directive.ts      # Per-char translateY reveal
│   │   │   ├── cursor.directive.ts           # Custom cursor + trail
│   │   │   ├── shrinkjump.directive.ts       # Per-char sequential active class
│   │   │   └── window-resize.directive.ts    # window:resize emitter
│   │   ├── lb/
│   │   │   ├── smooth-scroll.ts          # SmoothScroll interface
│   │   │   └── smooth-scroll-1.0.ts      # Momentum-based smooth scroll impl
│   │   └── scss/                     # Utility SCSS (cursor, shrink-jump, text-reveal, theme)
│   ├── styles.scss             # Global styles entry (bootstrap + scrollbar)
│   ├── bootstrap.scss          # Bootstrap customizations
│   ├── variables.scss          # Fonts, colors, Bootstrap partial imports
│   └── assets/                 # (none; public/ used instead)
├── public/                     # Static assets
│   ├── cablelocator.png, exp-hero.png, hero.png, hi.png
│   ├── merlion.svg, tokyoskyline.png, unicode-typing-master.png
│   └── favicon.ico
├── .next/                      # Leftover Next.js build artifacts (to be removed)
├── out/                        # Leftover Next.js static output (to be removed)
└── .github/workflows/
    ├── static.yml              # GitHub Pages deploy workflow
    └── webpack.yml             # (leftover)
```

## Key Angular Concepts to Replace

| Angular Concept | File(s) | React Replacement |
|---|---|---|
| Standalone `@Component` | All `*.component.ts` | Functional React components |
| Component templates (`templateUrl`) | All `*.component.html` | JSX in `.tsx` files |
| `Renderer2` DOM manipulation | introduction, title, project, story, experience | React `ref` + direct DOM or class toggling |
| RxJS `Subject`/`combineLatest`/`takeUntil` | introduction, title, project, story, experience, contact | React state + `useEffect`, `useCallback` |
| `ngOnDestroy` cleanup | DadComponent (base class) | `useEffect` return cleanup function |
| `@Input()` / `@Output()` | title (`message`), project-wrapper (`offsetTop`) | Props |
| `@ViewChild()` / `@ViewChildren()` | introduction, title, project, story, experience, contact | `useRef` / `useRef` arrays |
| `zone.js` change detection | Global (main.ts) | Automatic React re-rendering |
| Angular directives (`[intersection]`, `[scrollEmitter]`, `[textReveal]`, `[cursor]`, `[shrinkjump]`, `[window-resize]`) | directive/ folder | Custom React hooks (`useIntersectionObserver`, `useScroll`, `useCursor`, etc.) |
| SCSS component styles | `*.component.scss` | Tailwind utility classes + CSS Modules / global CSS |
| `provideClientHydration` | app.config.ts | React 19 `hydrateRoot` (not needed for static SPA) |
| Hash routing (`withHashLocation`) | app.routes.ts, app.config.ts | React Router `createBrowserRouter` or `BrowserRouter` |

## Data Files (to be preserved)

| File | Path | Content |
|---|---|---|
| Projects | `src/app/section/project/projects.json` | 2 projects (title, subtitle, languages, links, imgSrc, desc) |
| Experience | `src/app/section/experience/experience.json` | 3 exp posts (title, company, duration, languages, image, desc) |
| Story | `src/app/section/story/story.data.json` | profileImage + 3 paragraphs (text with HTML, classes) |

## Public Assets (to be copied to `public/`)

- `cablelocator.png`, `exp-hero.png`, `hero.png`, `hi.png`
- `merlion.svg`, `tokyoskyline.png`, `unicode-typing-master.png`
- `favicon.ico`

## Files to Remove / Not Migrate

- `angular.json`, `server.ts`, `main.server.ts`, `app.config.server.ts` (Angular SSR/CLI)
- `*.spec.ts` test files (Karma/Jasmine — replaced by Vitest)
- `next-env.d.ts`, `.next/`, `out/` (leftover Next.js artifacts)
- `zone.js`, `@angular/*`, `rxjs` from `package.json`
- `tsconfig.spec.json`, `karma.conf.js` (if exists)
