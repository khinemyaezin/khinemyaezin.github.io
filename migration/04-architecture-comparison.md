# Architecture Comparison: Angular 18 vs React 19.3

## Core Paradigm Shift

| Aspect | Angular 18 (Current) | React 19.3 (Target) |
|---|---|---|
| Component model | Class-based or functional `@Component` with decorators | Functional components, hooks, JSX |
| Templating | HTML templates with `*ngFor`, `*ngIf`, interpolation `{{ }}` | JSX with JavaScript expressions `{ }` |
| Styling | SCSS (component-scoped + global), Bootstrap 5 | Tailwind CSS utility classes |
| State management | RxJS `Subject`, `BehaviorStream`, services | React `useState`, `useReducer`, Context |
| Side effects | `ngOnInit`, `ngAfterViewInit`, RxJS subscriptions | `useEffect`, `useLayoutEffect` |
| DOM manipulation | `Renderer2`, `ElementRef`, `@ViewChild` | `ref`, `useRef`, direct DOM in effects |
| Change detection | Zone.js (automatic, runs on async events) | Automatic re-render on state/prop change |
| Lifecycle | `ngOnInit` → `ngAfterViewInit` → `ngOnDestroy` | `useEffect` (mount/update/unmount cleanup) |
| Dependency injection | `@Injectable`, `providers`, `InjectionToken` | Custom hooks, Context API |
| Routing | Angular Router (`provideRouter`, `withHashLocation`) | React Router (`BrowserRouter`, `createBrowserRouter`) |
| SSR | Angular SSR (Express `CommonEngine`) | Static SPA (no SSR), Vite build |
| Testing | Karma + Jasmine | Vitest + React Testing Library |
| Build tool | Angular CLI (`ng build`) | Vite |
| Package manager | npm | npm |

## Concept Mapping

### Components

**Angular (standalone):**
```ts
@Component({
  selector: 'section-hero',
  standalone: true,
  imports: [IntersectionDirective, TextRevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
```

**React 19.3:**
```tsx
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);
  return (
    <section id="hero" ref={ref} className={...}>
      <div className="hero__container">
        <div className="hero__title">
          <h1 className="hero__title__header">HELLO</h1>
        </div>
      </div>
    </section>
  );
}
```

### Directives → Hooks

Angular directives attach behavior to DOM elements via selectors. In React, this becomes custom hooks that return refs and state.

| Angular Directive | React Hook |
|---|---|
| `[intersection]` | `useIntersectionObserver(ref)` → `{ isVisible, entry }` |
| `[scrollEmitter]` | `useSmoothScroll(ref)` → `{ scrollProgress, scrollY }` |
| `[textReveal]` | `useTextReveal(ref, isVisible)` → animates char spans |
| `[cursor]` | `useCursor()` → creates/tracks cursor + trail elements |
| `[shrinkjump]` | `useShrinkJump(ref, active$: number)` → sequential char activation |
| `[window-resize]` | `useWindowSize()` or `window:resize` listener in `useEffect` |

### Services → Hooks

Angular services (if any) providing shared logic become custom React hooks. Data (JSON) is imported directly as modules.

### RxJS → React State

| RxJS Pattern | React Equivalent |
|---|---|
| `Subject` + `next()` | `useState` + setter |
| `combineLatest([a, b])` | `useMemo` or `useEffect` deriving from multiple state values |
| `takeUntil(destroy$)` | `useEffect` cleanup return |
| `filter(...)` | Conditional logic inside effect or early return |
| `debounceTime` / `throttleTime` | `useDebounce` / `useThrottle` custom hooks |
| `requestAnimationFrame` loop | `useAnimationFrame` or `useEffect` with RAF |

### Styling

**SCSS (current):** Component-scoped `.scss` files, BEM-like class names, Bootstrap utility classes (`gap-3`, `mb-5`, `text-center`, `d-flex`, `fade-in`, `gradient-text`).

**Tailwind (target):** Utility-first classes, responsive prefixes (`sm:`, `md:`, `lg:`), custom config for brand colors/fonts from `variables.scss`.

Color mapping from `variables.scss`:
- `$primary: #89f7fe` → `tailwind.config.js` theme.extend.colors.primary
- `$secondary: #66a6ff` → secondary
- `$black: #161616` → black/dark
- `$background-color: #161616` → background

Font mapping:
- `Ubuntu Mono` → primary font stack
- `Reenie Beanie` → hero font
- `Delicious Handrawn` → title font

### Routing

**Current:** Hash location, 2 routes:
- `''` → `HomeComponent` (shell)
- `home` → `PortfolioComponent` (main content with all sections)

**Target:** React Router `BrowserRouter`:
- `/` → Home (redirects to `/portfolio` or renders portfolio directly)
- `/portfolio` → Portfolio layout with all sections
- Single-page scrolling (anchor links to section IDs)

### Build & Deploy

**Current:** `ng build` → `dist/khinemyaezin/`, SSR via `server.ts`, deploy via `angular-cli-ghpages`.

**Target:** `vite build` → `dist/`, static SPA, deploy to GitHub Pages via GitHub Actions (`actions/upload-pages-artifact` + `actions/deploy-pages`).

### 404 Handling

GitHub Pages static SPA requires a `404.html` that redirects to `index.html` for client-side routing, or use hash-based routing to avoid 404s on direct URL access.

**Recommended:** Browser history + SPA fallback:
```html
<!-- 404.html -->
<script>
  sessionStorage.redirect = location.pathname;
  location.replace('index.html');
</script>
```
