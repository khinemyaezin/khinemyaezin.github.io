# Core Features Inventory

## Feature List with Angular → React Mapping

| # | Feature | Angular Implementation | React 19 Implementation |
|---|---|---|---|
| 1 | App shell + routing | `AppComponent` + `RouterOutlet`, hash routes | `BrowserRouter` + `Routes`/`Route`, layout wrapper |
| 2 | Scroll progress bar | `scrollProgress` % bound to `[style.width.%]` | `useScrollProgress` hook + Tailwind `w-[{progress}%]` |
| 3 | Custom smooth scroll | `ScrollEmitterDirective` + `SmoothScrollV1` (momentum) | `useSmoothScroll` hook (`requestAnimationFrame`, `scrollTo`) |
| 4 | Custom cursor + trail | `CursorDirective` (mousemove, hover state, RAF loop) | `useCursor` hook (global refs, RAF, hover detection) |
| 5 | Intersection observer | `IntersectionDirective` (10% threshold, `visible` output) | `useIntersectionObserver` hook |
| 6 | Hero section | `section-hero` + `TextRevealDirective` | `Hero` component + `useTextReveal` hook |
| 7 | Introduction | Split-char span animation, door-closed effect | `Introduction` component + refs + RAF animation loop |
| 8 | Story section | Profile scale/rotate + fade-in paragraphs on scroll | `Story` component + scroll-driven transform + class toggling |
| 9 | Experience timeline | Scroll-activated overlays (inactive class, throttled) | `Experience` component + `IntersectionObserver` + throttle |
| 10 | Projects slider | Horizontal slider synced to scroll (`translate3d`) | `Projects` component + scroll-driven `transform: translate3d` |
| 11 | Title section | Sticky cycling words based on scroll percentage | `Title` component + scroll percentage → active index |
| 12 | Contact section | Magnetic links (mousemove transform), social links, footer year | `Contact` component + refs + `onMouseMove` magnetic effect |
| 13 | JSON-driven content | `projects.json`, `experience.json`, `story.data.json` | Import JSON as data, map to components |
| 14 | Responsive layout | Bootstrap 5 grid + utility classes | Tailwind CSS (responsive prefixes: `sm:`, `md:`, `lg:`) |

## Detailed Feature Specifications

### 1. Scroll Progress Bar
- **Location:** `portfolio.component.html` line 2, `portfolio.component.ts` line 47-53
- **Behavior:** `<div class="scroll-progress" [style.width.%]="scrollProgress">` at top of page
- **Logic:** `scrollTop / (scrollHeight - clientHeight) * 100` on `<main>` scroll event
- **React:** `useScrollProgress(ref)` returns percentage; render `<div className="fixed top-0 left-0 h-1 bg-primary w-[{progress}%]">`

### 2. Custom Smooth Scroll
- **Location:** `scroll-emitter.directive.ts`, `smooth-scroll-1.0.ts`
- **Behavior:** Prevents default wheel/touch, applies momentum-based scrolling to `<main scrollEmitter>`
- **Config:** speed=0.7, smooth=30, momentumFactor=0.85, minDelta=0.5, touchSensitivity=2.6
- **React:** Custom hook managing `scrollTop` via `requestAnimationFrame`, exposes `scrollChange` value

### 3. Custom Cursor
- **Location:** `cursor.directive.ts`, `cursor.scss`
- **Behavior:** Two divs (`.custom-cursor`, `.cursor-trail`) follow mouse; trail lags with 0.15 lerp; hover state on links/buttons
- **React:** `useCursor()` creates elements on mount, RAF loop for trail, removes on unmount

### 4. Text Reveal (Hero)
- **Location:** `text-reveal.directive.ts`, `hero.component.html`
- **Behavior:** Splits text into spans, each translates from `translateY(110%)` to `0` on intersection with 50ms stagger
- **React:** `useTextReveal(ref, isVisible)` splits text into `<span>` elements, animates via CSS or inline styles

### 5. Introduction (Door Effect)
- **Location:** `introduction.component.ts/html`
- **Behavior:** Splits "Khine" / "Myae" into char spans; on intersection + scroll, chars translateX outward; hero gets `door-closed` class at minScroll; footer toggles `show`
- **React:** `useIntroductionAnimation(refs)` with `requestAnimationFrame`, char span arrays, transform styles

### 6. Story Section
- **Location:** `story.component.ts/html`, `story.data.json`
- **Behavior:** Profile image scales (1→0.2) and rotates based on scroll; 3 paragraphs fade in at scroll percentage thresholds [100, 70, 50]
- **React:** `Story` component mapping JSON paragraphs, scroll-based scale/rotate transform, `show` class toggling

### 7. Experience Timeline
- **Location:** `exp.component.ts/html`, `experience.json`
- **Behavior:** Section height = `posts.length * 100 + 50`%; on scroll, marks current post active, next post inactive based on viewport position; throttled at 100ms
- **React:** `Experience` component, `IntersectionObserver` + scroll listener, `useThrottle`, active/inactive class toggling

### 8. Projects Slider
- **Location:** `project.component.ts/html`, `project-wrapper.component.ts`, `projects.json`
- **Behavior:** Horizontal slider `translate3d(-currentX, 0, 0)` synced to scroll percentage; section height adapts to portrait/landscape; `setTargetX` = sliderWidth - windowWidth
- **React:** `Projects` component + slider ref, scroll-driven `currentX = lerp(0, toX, percentage)`, `useResizeObserver` or `window:resize`

### 9. Title Section (Sticky Words)
- **Location:** `title.component.ts/html`
- **Behavior:** Section height = `texts.length * 100vh`; words cycle `active` class based on scroll percentage; messages: "STUFFS", "Find me!"
- **React:** `Title` component accepting `message` prop, scroll percentage → active index, sticky positioning

### 10. Contact Section
- **Location:** `contact.component.ts/html`
- **Behavior:** Magnetic links (email, linkedin, github) translate/scale on mousemove; resume link; footer year from `new Date().getFullYear()`
- **React:** `Contact` component, `useMagnetic(ref)` hook, social links as `<a>` targets

### 11. JSON Data
- **Projects:** 2 items with title, subtitle, languages[], links[{icon, url}], imgSrc, desc, active
- **Experience:** 3 items with title, company, duration, languages[], image, desc
- **Story:** profileImage + 3 paragraphs[{text (HTML), classes}]

## Content Sections Order (from portfolio.component.html)

1. `section-hero` — Hero
2. `section-introduction` — Introduction ("Khine Myae")
3. `section-story` — Story (About)
4. `section-exp` — Experience (Timeline)
5. `section-title message="STUFFS"` — Title divider
6. `section-project` — Projects (Slider)
7. `section-title message="Find me!"` — Title divider
8. `section-contact` — Contact

## Non-Functional Requirements

- **Responsive:** Mobile-first, works on all devices (per README)
- **Performance:** Scroll progress, smooth scroll, animations at 60fps
- **Accessibility:** ARIA labels on links, `rel="noopener noreferrer" target="_blank"` on external links, keyboard navigable
- **SEO:** Meta tags (title, description), Open Graph tags (static SPA)
