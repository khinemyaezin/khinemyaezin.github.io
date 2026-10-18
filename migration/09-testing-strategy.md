# Testing Strategy

## Test Pyramid

```
        /\
       /E2E\    (Playwright) — 10% of tests
      /------\
     /  INT   \  (Integration) — 20% of tests
    /----------\
   /   UNIT    \  (Vitest + RTL) — 70% of tests
  /--------------\
```

## Unit Testing (Vitest + React Testing Library)

**Scope:**
- Custom hooks (`useScrollProgress`, `useIntersectionObserver`, `useMagnetic`, `useSmoothScroll`, `useTextReveal`)
- Pure utility functions (`lerp`, `clamp`, scroll percentage calculations)
- Component rendering with props
- Event handlers (click, mouse move, scroll)

**Tools:**
- `vitest` — test runner
- `@testing-library/react` — component rendering
- `@testing-library/jest-dom` — DOM assertions
- `jsdom` — DOM environment

**Config:** `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
```

**Test File Examples:**

```tsx
// src/hooks/useScrollProgress.test.ts
import { renderHook, act } from '@testing-library/react';
import { useScrollProgress } from './useScrollProgress';

describe('useScrollProgress', () => {
  it('calculates scroll percentage correctly', () => {
    const { result } = renderHook(() => useScrollProgress(mockRef));
    // simulate scroll event
    act(() => {
      mockRef.current.scrollTop = 500;
      mockRef.current.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBeCloseTo(50, 1);
  });
});
```

```tsx
// src/components/sections/Hero.test.tsx
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('renders HELLO title', () => {
    render(<Hero />);
    expect(screen.getByText('HELLO')).toBeInTheDocument();
  });

  it('applies text-reveal class when visible', () => {
    // mock IntersectionObserver
    render(<Hero />);
    // ...
  });
});
```

**Coverage Target:** ≥ 70% on hooks and utilities.

---

## Integration Testing

**Scope:**
- Component + hook interactions (e.g., Projects section + scroll hook)
- Route navigation (Home → Portfolio)
- JSON data → component rendering
- Form/link interactions

**Tools:** React Testing Library + Vitest

**Test Scenarios:**
1. Portfolio page renders all 8 sections in order
2. Projects section renders cards from `projects.json`
3. Experience section renders timeline posts from `experience.json`
4. Contact section renders 3 social links + resume link
5. Title section accepts `message` prop and renders it

---

## E2E Testing (Playwright)

**Scope:** Critical user flows on production-like build

**Config:** `playwright.config.ts`

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'mobile', use: devices['Pixel 7'] },
  ],
  webServer: {
    command: 'npm run preview',
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
});
```

**E2E Test Scenarios (`e2e/portfolio.spec.ts`):**

```ts
import { test, expect } from '@playwright/test';

test('portfolio loads all sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero')).toBeVisible();
  await expect(page.locator('#media')).toBeVisible();
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.locator('#exp')).toBeVisible();
  await expect(page.locator('#projects')).toBeVisible();
  await expect(page.locator('#contact')).toBeVisible();
});

test('projects slider moves on scroll', async ({ page }) => {
  await page.goto('/portfolio');
  const slider = page.locator('.projects__slider');
  const initialX = await slider.evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);
  const afterX = await slider.evaluate(el => getComputedStyle(el).transform);
  expect(initialX).not.toBe(afterX);
});

test('contact magnetic links respond to hover', async ({ page }) => {
  await page.goto('/portfolio');
  const emailLink = page.locator('a[href*="mailto"]').first();
  await emailLink.hover();
  // verify transform applied
  await expect(emailLink).toHaveCSS(/transform/);
});

test('external links open in new tab', async ({ page }) => {
  const githubLink = page.locator('a[href*="github.com"]').first();
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    githubLink.click({ modifiers: ['ctrl'] }),
  ]);
  await expect(newPage).toHaveURL(/github.com/);
});

test('footer shows current year', async ({ page }) => {
  await page.goto('/portfolio');
  const currentYear = new Date().getFullYear().toString();
  await expect(page.locator('footer')).toContainText(currentYear);
});

test('404 fallback works on direct URL', async ({ page }) => {
  await page.goto('/portfolio');
  await expect(page.locator('#hero')).toBeVisible();
});
```

**E2E Coverage Target:** All critical user journeys pass on Chrome + Mobile.

---

## Accessibility Testing

**Tools:**
- `axe-core` / `@axe-core/react` (unit integration)
- Playwright axe reporter (E2E)
- Manual keyboard navigation audit

**Checklist:**
- [ ] All images have `alt` text
- [ ] External links have `rel="noopener noreferrer" target="_blank"`
- [ ] ARIA labels on icon-only links (email, linkedin, github)
- [ ] Keyboard navigable (Tab order logical)
- [ ] Focus visible on interactive elements
- [ ] Color contrast ≥ 4.5:1 (primary color #89f7fe on #161616 background)
- [ ] Section headings hierarchy (`<h1>` → `<h2>` → `<h4>`)

---

## Performance Testing

**Tools:**
- Lighthouse CI (GitHub Action)
- Chrome DevTools Performance panel

**Benchmarks:**
- Lighthouse Performance ≥ 90
- Lighthouse Accessibility ≥ 90
- Lighthouse SEO ≥ 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Bundle JS < 200 KB gzipped

---

## CI/CD Test Pipeline

`.github/workflows/test.yml`:

```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run test -- --run        # Vitest
      - run: bun run lint                 # ESLint
      - run: bun run typecheck            # tsc --noEmit
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bunx playwright install --with-deps chromium
      - run: bun run test:e2e             # Playwright
```

---

## Test Data

JSON data files are used directly in tests (no mocking needed for content):

- `src/data/projects.json` — 2 projects
- `src/data/experience.json` — 3 experience posts
- `src/data/story.data.json` — 3 story paragraphs

Tests verify components render correct counts and content from these files.

---

## What Is NOT Tested

- Angular SSR (removed in migration)
- Service workers (not used)
- Backend APIs (portfolio is static, no API)
- Internet Explorer (not supported)
