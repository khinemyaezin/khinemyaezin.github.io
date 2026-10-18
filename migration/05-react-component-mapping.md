# React Component Mapping

## Directory Structure (Target)

```
src/
├── main.tsx              # Vite entry, React Router boot
├── App.tsx               # Root app with Router + routes
├── index.css             # Tailwind directives + global styles
├── data/
│   ├── projects.json     # (copied from Angular)
│   ├── experience.json   # (copied from Angular)
│   └── story.data.json   # (copied from Angular)
├── hooks/
│   ├── useIntersectionObserver.ts
│   ├── useScrollProgress.ts
│   ├── useSmoothScroll.ts
│   ├── useCursor.ts
│   ├── useTextReveal.ts
│   ├── useMagnetic.ts
│   ├── useThrottle.ts
│   └── useAnimationFrame.ts
├── components/
│   ├── layout/
│   │   ├── Layout.tsx        # Shell wrapper, scroll progress bar
│   │   └── ScrollProgress.tsx
│   ├── ui/
│   │   ├── Cursor.tsx        # Custom cursor + trail elements
│   │   └── TextReveal.tsx    # Per-char reveal wrapper
│   └── sections/
│       ├── Hero.tsx
│       ├── Introduction.tsx
│       ├── Story.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── ProjectCard.tsx
│       ├── Title.tsx
│       └── Contact.tsx
├── pages/
│   ├── Home.tsx            # Redirect to /portfolio
│   └── Portfolio.tsx       # Main page with all sections
├── types/
│   └── index.ts            # TypeScript interfaces
└── assets/                 # (images copied from public/)
```

## TypeScript Interfaces

```ts
// types/index.ts

export interface ProjectLink {
  icon: string;
  url: string;
}

export interface Project {
  languages: string[];
  published_year: string;
  subtitle: string;
  links: ProjectLink[];
  title: string;
  desc: string;
  imgSrc: string;
  active: boolean;
}

export interface ExperiencePost {
  title: string;
  company: string;
  duration: string;
  languages: string[];
  image: string;
  desc: string;
}

export interface StoryParagraph {
  text: string;
  classes: string;
}

export interface StoryData {
  profileImage: string;
  paragraphs: StoryParagraph[];
}
```

## Component Mapping Table

| Angular Component | React Component | File | Props | Notes |
|---|---|---|---|---|
| `AppComponent` | `App` | `App.tsx` | — | Router provider |
| `HomeComponent` | `Home` | `pages/Home.tsx` | — | Redirects to /portfolio |
| `PortfolioComponent` | `Portfolio` | `pages/Portfolio.tsx` | — | Main layout, scroll progress, `<main>` |
| `HeroComponent` | `Hero` | `components/sections/Hero.tsx` | — | Text reveal on "HELLO" |
| `IntroductionComponent` | `Introduction` | `components/sections/Introduction.tsx` | — | Split-char door effect |
| `StoryComponent` | `Story` | `components/sections/Story.tsx` | — | JSON-driven, scale/rotate profile |
| `ExperienceComponent` | `Experience` | `components/sections/Experience.tsx` | — | Timeline, overlays |
| `ProjectComponent` | `Projects` | `components/sections/Projects.tsx` | — | Horizontal slider |
| `ProjectWrapperComponent` | (merged into Projects) | — | — | offsetTop not needed in React |
| `TitleComponent` | `Title` | `components/sections/Title.tsx` | `message: string` | Sticky cycling words |
| `ContactComponent` | `Contact` | `components/sections/Contact.tsx` | — | Magnetic links, footer year |
| `DadComponent` (abstract base) | (hook-based cleanup) | — | — | `useEffect` cleanup replaces `destroy$` |

## Directive → Hook Mapping

| Angular Directive | React Hook | File | Returns |
|---|---|---|---|
| `IntersectionDirective` | `useIntersectionObserver` | `hooks/useIntersectionObserver.ts` | `{ ref, isVisible }` |
| `ScrollEmitterDirective` | `useSmoothScroll` | `hooks/useSmoothScroll.ts` | `{ ref, scrollProgress, scrollY }` |
| `TextRevealDirective` | `useTextReveal` | `hooks/useTextReveal.ts` | `{ ref, spans: JSX[] }` |
| `CursorDirective` | `useCursor` | `hooks/useCursor.ts` | mounts cursor/trail DOM |
| `ShrinkjumpDirective` | `useShrinkJump` | `hooks/useShrinkJump.ts` | activates char spans sequentially |
| `WindowResizeDirective` | `useWindowSize` | `hooks/useWindowSize.ts` | `{ width, height }` |

## Hook Signatures

```ts
// hooks/useIntersectionObserver.ts
function useIntersectionObserver(options?: IntersectionObserverInit): [RefObject<HTMLDivElement>, boolean]

// hooks/useScrollProgress.ts
function useScrollProgress(ref: RefObject<HTMLElement>): number  // 0-100

// hooks/useSmoothScroll.ts
function useSmoothScroll(ref: RefObject<HTMLElement>): { scrollY: number; scrollProgress: number }

// hooks/useCursor.ts
function useCursor(): void  // side effect: creates cursor/trail elements

// hooks/useTextReveal.ts
function useTextReveal(text: string, isVisible: boolean): JSX.Element[]  // char spans

// hooks/useMagnetic.ts
function useMagnetic(ref: RefObject<HTMLElement>): void  // mousemove transform

// hooks/useThrottle.ts
function useThrottle<T>(callback: () => T, delay: number): () => void
```

## Example: Ported Components

### Portfolio (main layout)

```tsx
// pages/Portfolio.tsx
import { useRef, useState } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useCursor } from '@/hooks/useCursor';
import Hero from '@/components/sections/Hero';
import Introduction from '@/components/sections/Introduction';
import Story from '@/components/sections/Story';
import Experience from '@/components/sections/Experience';
import Title from '@/components/sections/Title';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import ScrollProgress from '@/components/layout/ScrollProgress';

export default function Portfolio() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const el = mainRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
  };

  useCursor();

  return (
    <>
      <ScrollProgress progress={scrollProgress} />
      <main ref={mainRef} onScroll={handleScroll} className="scroll-container">
        <div className="scroll__container">
          <Hero />
          <Introduction />
          <Story />
          <Experience />
          <Title message="STUFFS" />
          <Projects />
          <Title message="Find me!" />
          <Contact />
        </div>
      </main>
    </>
  );
}
```

### Hook Example: useSmoothScroll

```ts
// hooks/useSmoothScroll.ts
import { useEffect, useRef, useState, useCallback } from 'react';

export function useSmoothScroll(ref: RefObject<HTMLElement>) {
  const [scrollY, setScrollY] = useState(0);
  const targetPos = useRef(0);
  const moving = useRef(false);

  const speed = 0.7;
  const smooth = 30;
  const momentumFactor = 0.85;
  const minDelta = 0.5;

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el || !moving.current) return;
    const currentScroll = el.scrollTop;
    const delta = (targetPos.current - currentScroll) * momentumFactor;
    const newPos = currentScroll + delta / smooth;
    el.scrollTop = newPos;
    setScrollY(newPos);
    if (Math.abs(delta) > minDelta) {
      requestAnimationFrame(animate);
    } else {
      moving.current = false;
    }
  }, [ref]);

  const updateTarget = useCallback((delta: number) => {
    const el = ref.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    targetPos.current += delta * speed;
    targetPos.current = Math.max(0, Math.min(targetPos.current, maxScroll));
    if (!moving.current) {
      moving.current = true;
      requestAnimationFrame(animate);
    }
  }, [ref, animate]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      let wheelDelta = e.deltaY;
      if (e.deltaMode === e.DOM_DELTA_LINE) wheelDelta *= 40 * 0.4;
      updateTarget(wheelDelta);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [ref, updateTarget]);

  return { scrollY, scrollProgress: (scrollY / (ref.current?.scrollHeight || 1)) * 100 };
}
```

### Hook Example: useTextReveal

```ts
// hooks/useTextReveal.ts
import { useMemo } from 'react';

export function useTextReveal(text: string, isVisible: boolean) {
  return useMemo(() => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(110%)',
          transitionDelay: `${(i + 1) * 50}ms`,
          transition: 'transform 0.5s ease',
          display: 'inline-block',
        }}
      >
        {char}
      </span>
    ));
  }, [text, isVisible]);
}
```

## Routes Configuration

```tsx
// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/portfolio" replace />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/portfolio" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Data Loading Pattern

JSON files are imported directly (Vite handles JSON imports):

```ts
// data/projects.json — copied as-is from Angular
import projectsData from '@/data/projects.json';
const projects: Project[] = projectsData.projects;
```

## CSS Strategy

- **Tailwind CSS** for layout, typography, spacing, responsive utilities
- **Custom CSS** in `index.css` for animations not easily done in Tailwind (keyframes: fade-in, door-closed, cursor hover)
- **Brand colors** from `variables.scss` mapped to `tailwind.config.js`
- **Google Fonts** imported in `index.css` (same fonts as Angular)

## Migration Notes per Component

- **Hero:** Simple port. Text reveal via `useTextReveal` hook.
- **Introduction:** Most complex. Requires char-span arrays, `requestAnimationFrame` loop, refs to section/hero/media/footer.
- **Story:** JSON mapping + scroll-driven scale/rotate on profile image + threshold-based fade-in on paragraphs.
- **Experience:** `IntersectionObserver` + throttled scroll handler for active/inactive overlay toggling.
- **Projects:** Slider ref, scroll-driven `translate3d`, `window:resize` for `toX` recalculation.
- **Title:** Sticky container, scroll percentage → active index cycling.
- **Contact:** Magnetic link hook, social anchors, dynamic footer year.
- **Layout:** Scroll progress bar, `<main>` scroll container, custom cursor initialization.
