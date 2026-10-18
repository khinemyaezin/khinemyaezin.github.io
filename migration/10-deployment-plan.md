# Deployment Plan

## Target Environment

- **Platform:** GitHub Pages (static hosting)
- **Repository:** `khinemyaezin/khinemyaezin.github.io`
- **URL:** `https://khinemyaezin.github.io/` (or custom domain)
- **Build Output:** `dist/` (Vite)
- **CI/CD:** GitHub Actions

## Prerequisites

- GitHub repository with Pages enabled (Settings → Pages → Source: GitHub Actions)
- `NODE_VERSION` = 20 (in workflow)
- `base` path in `vite.config.ts` set to `/khinemyaezin.github.io/` (unless custom domain)

## Build Configuration

`vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  base: process.env.VITE_BASE || '/khinemyaezin.github.io/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
  },
});
```

> If using a custom domain (e.g., `khinemyaezin.com`), set `base: '/'` and add `CNAME` file to `public/`.

## Package.json Scripts (Bun)

See `migration/package.json.bun` for the full `package.json` with `"packageManager": "bun@1.1.0"`.

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "lint": "eslint src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write src/"
  }
}
```

Run scripts with `bun run <script>` (e.g., `bun run dev`, `bun run build`, `bun test`).

## GitHub Actions Workflow

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2

      - name: Install dependencies
        run: bun install

      - name: Type check
        run: bun run typecheck

      - name: Lint
        run: bun run lint

      - name: Run tests
        run: bun run test

      - name: Build
        run: bun run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 404 Fallback for Client-Side Routing

React Router uses browser history. Direct URL access to `/portfolio` on GitHub Pages returns 404. Solution: `public/404.html`

```html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Khinemyaezin</title>
  <script type="text/javascript">
    // SPA fallback: redirect to index.html and preserve path
    sessionStorage.redirect = location.pathname;
    location.replace('index.html');
  </script>
</head>
<body></body>
</html>
```

In `App.tsx`, read `sessionStorage.redirect` on mount to restore route:

```tsx
useEffect(() => {
  const redirect = sessionStorage.redirect;
  if (redirect) {
    sessionStorage.removeItem('redirect');
    // React Router handles the route automatically on index.html load
  }
}, []);
```

Alternative: Use `createHashRouter` (URLs like `/#/portfolio`) to avoid 404 entirely.

## CNAME (Custom Domain)

If using `khinemyaezin.com`:

1. Add `public/CNAME` file with content: `khinemyaezin.com`
2. Configure DNS A records pointing to GitHub Pages IPs:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Enable HTTPS in GitHub Pages settings

## Assets Handling

Public assets (copied from Angular `public/`):

| Asset | Source | Destination |
|---|---|---|
| `favicon.ico` | `public/favicon.ico` | `public/favicon.ico` (Vite auto-copies) |
| `cablelocator.png` | `public/cablelocator.png` | `public/cablelocator.png` |
| `exp-hero.png` | `public/exp-hero.png` | `public/exp-hero.png` |
| `hero.png` | `public/hero.png` | `public/hero.png` |
| `hi.png` | `public/hi.png` | `public/hi.png` |
| `merlion.svg` | `public/merlion.svg` | `public/merlion.svg` |
| `tokyoskyline.png` | `public/tokyoskyline.png` | `public/tokyoskyline.png` |
| `unicode-typing-master.png` | `public/unicode-typing-master.png` | `public/unicode-typing-master.png` |

Vite copies `public/` contents to `dist/` root at build time. Reference in components as `/cablelocator.png` etc.

## Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `VITE_BASE` | `/khinemyaezin.github.io/` | Vite base path for GitHub Pages subpath |
| `VITE_ANALYTICS_ID` | (none) | Optional Google Analytics / Plausible ID |

Create `.env.example`:

```env
VITE_BASE=/khinemyaezin.github.io/
```

## Rollback Plan

1. Revert the GitHub Actions workflow to previous version (or disable Pages)
2. The Angular `main` branch remains intact until Phase 6 cutover
3. DNS can be pointed back to previous hosting if needed
4. GitHub Pages keeps previous deployment until new one succeeds

## Post-Deployment Checklist

- [ ] Site loads at `https://khinemyaezin.github.io/`
- [ ] All 8 sections visible and scrollable
- [ ] Images load correctly (404 check in DevTools Network tab)
- [ ] External links open in new tab
- [ ] Custom cursor works on desktop
- [ ] Mobile layout responsive (test on device)
- [ ] 404 fallback works on direct URL (e.g., `/portfolio`)
- [ ] Lighthouse score ≥ 90
- [ ] GitHub Pages shows latest deployment
- [ ] Old Angular CI/CD workflows removed

## Monitoring

- GitHub Pages deployment status (Actions tab)
- Lighthouse CI (optional, via GitHub Action)
- Uptime monitoring (optional, e.g., GitHub Status or external service)
