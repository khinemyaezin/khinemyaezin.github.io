# Technology Stack

## Core Framework

| Package | Version | Purpose |
|---|---|---|
| `react` | `^19.3.0` | UI library |
| `react-dom` | `^19.3.0` | DOM rendering (client-side) |
| `react-router-dom` | `^7.0.0` | Client-side routing (browser history) |
| `typescript` | `^5.8.0` | Type safety |
| `vite` | `^6.0.0` | Build tool, dev server, HMR |

## Styling

| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | `^3.4.0` / `^4.0.0` | Utility-first CSS |
| `postcss` | `^8.4.0` | CSS processing |
| `autoprefixer` | `^10.4.0` | Vendor prefixes |

*(Bootstrap 5 and SCSS are removed entirely.)*

## Testing

| Package | Version | Purpose |
|---|---|---|
| `vitest` | `^2.0.0` | Unit test runner |
| `@testing-library/react` | `^16.0.0` | React component testing |
| `@testing-library/jest-dom` | `^6.0.0` | DOM assertions |
| `jsdom` | `^25.0.0` | Test DOM environment |
| `playwright` | `^1.48.0` | E2E browser testing |

## Development Tooling

| Package | Version | Purpose |
|---|---|---|
| `eslint` | `^9.0.0` | Linting |
| `eslint-plugin-react` | `^7.37.0` | React lint rules |
| `eslint-plugin-react-hooks` | `^5.0.0` | Hooks rules |
| `prettier` | `^3.3.0` | Code formatting |
| `husky` | `^9.0.0` | Git hooks |
| `lint-staged` | `^15.0.0` | Lint staged files |

## Package Manager: Bun

This migration targets **Bun** instead of npm. Bun is a Drop-in replacement for the npm registry and `package.json`, with a built-in test runner, bundler, and TypeScript support.

**Why Bun:**
- Faster installs (`bun install` vs `npm ci`)
- Built-in test runner (`bun test`) and script runner (`bun run dev`)
- TypeScript support out of the box (no separate `tsc` step needed for dev)

**Considerations:**
- Generates `bun.lockb` instead of `package-lock.json`
- GitHub Actions uses `oven-sh/setup-bun` instead of `actions/setup-node`
- Team needs Bun installed locally (`curl -fsSL https://bun.sh/install | bash`)

**Removed Dependencies (from Angular package.json):**

- `@angular/*` (all)
- `zone.js`
- `rxjs`
- `bootstrap` (replaced by Tailwind)
- `bootstrap-icons` (icons via inline SVG or `lucide-react`)
- `@angular-devkit/*`, `@angular/cli`, `@angular/compiler-cli`
- `jasmine`, `karma`, `karma-*`
- `express`, `@types/express`
- `angular-cli-ghpages`

## New Dependencies to Add

See `migration/package.json.bun` for the full `package.json` with `"packageManager": "bun@1.1.0"`.

```json
{
  "name": "khinemyaezin",
  "version": "2.1",
  "private": true,
  "packageManager": "bun@1.1.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "lint": "eslint src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "react-router-dom": "^7.0.0",
    "lucide-react": "^0.450.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^9.0.0",
    "eslint-plugin-react": "^7.37.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "postcss": "^8.4.0",
    "prettier": "^3.3.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.8.0",
    "vite": "^6.0.0",
    "vitest": "^2.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^25.0.0",
    "playwright": "^1.48.0"
  }
}
```

## React 19 Specific Features to Leverage

| Feature | Usage |
|---|---|
| `React 19` automatic batching | All state updates batched by default |
| Improved `use` hook | Not needed (no Suspense data fetching in static SPA) |
| `hydrateRoot` improvements | Not applicable (static SPA, no SSR) |
| Actions / Form actions | Not needed (no form submissions) |
| Metadata | Not applicable (static SPA) |

## Tailwind Configuration

`tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#89f7fe',
        secondary: '#66a6ff',
        black: '#161616',
        dark: '#000000',
        background: '#161616',
      },
      fontFamily: {
        primary: ['"Ubuntu Mono"', 'monospace'],
        hero: ['"Reenie Beanie"', 'sans-serif'],
        title: ['"Delicious Handrawn"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'text-reveal': 'textReveal 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        textReveal: {
          '0%': { transform: 'translateY(110%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
```

## Vite Configuration

`vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/khinemyaezin.github.io/',  // GitHub Pages subpath
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: true,
  },
});
```

> Note: `base` is set to the repository name for GitHub Pages deployment. For local development, this can be overridden via `VITE_BASE=/` or use a GitHub Pages custom domain.

## GitHub Pages Deployment

- **Provider:** GitHub Pages (static site)
- **Build command:** `vite build`
- **Output directory:** `dist/`
- **CI/CD:** GitHub Actions workflow (`.github/workflows/deploy.yml`)
  1. Install dependencies
  2. Run `vite build`
  3. Upload `dist/` as artifact
  4. Deploy to `gh-pages` branch
- **404 fallback:** `404.html` redirecting to `index.html` for client-side routing

## Icons

Bootstrap Icons (`bi-*`) are removed. Replacement options:
- **`lucide-react`** — lightweight, tree-shakable icons (recommended)
- **Inline SVG** — copy Bootstrap Icon SVGs directly

Bi icon mapping (from project data):
- `bi-box-arrow-up-right` → `ExternalLink` or `ArrowUpRight`
- `bi-github` → `Github`
- `bi-linkedin` → `Linkedin`
- `bi-envelope` → `Mail`
- `bi-file-earmark-arrow-down` → `Download`
- `bi-download` → `Download`

## Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Mobile Safari / Chrome
- No IE11 support (Angular 18 also dropped IE)

## Bundle Size Target

- Initial JS: < 200 KB gzipped
- CSS: < 20 KB gzipped
- Lighthouse Performance: ≥ 90
