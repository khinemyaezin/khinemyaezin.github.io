# Khinemyaezin - Personal Portfolio Website v3.0

A modern, responsive personal portfolio website built with **React 19.3**, showcasing professional experience, projects, and personal story.

## 🌟 Features

- **Modern Design**: Clean and professional UI with smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Sections**:
  - Hero section with dynamic text reveal animations
  - Professional experience timeline with scroll-activated overlays
  - Project showcase with horizontal scroll-synced slider
  - Personal story section with scale/rotate profile animation
  - Contact information with magnetic link hover effects
- **Performance Optimized**: Built with Vite, React 19.3, and Tailwind CSS
- **Custom Animations**: Smooth scroll, custom cursor, intersection-observer based triggers

## 🛠️ Technologies Used

- **React 19.3** - UI library
- **Vite 5** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety
- **Bun** - Package manager and runtime
- **Vitest + React Testing Library** - Unit testing
- **Playwright** - E2E testing

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.1.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/khinemyaezin/khinemyaezin.github.io.git
   ```

2. Navigate to the project directory:
   ```bash
   cd khinemyaezin.github.io
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

4. Start the development server:
   ```bash
   bun run dev
   ```

5. Open your browser and navigate to `http://localhost:5173/khinemyaezin.github.io/`

## 📜 Available Scripts

| Script | Description |
|---|---|
| `bun run dev` | Start Vite dev server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run test` | Run unit tests (Vitest) |
| `bun run test:e2e` | Run E2E tests (Playwright) |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | Run TypeScript type check |
| `bun run format` | Format code with Prettier |

## 📁 Project Structure

```
src/
├── main.tsx              # App entry point
├── App.tsx               # Router configuration
├── index.css             # Tailwind + global styles
├── data/                 # JSON content files
│   ├── projects.json
│   ├── experience.json
│   └── story.data.json
├── hooks/                # Custom React hooks
│   ├── useIntersectionObserver.ts
│   ├── useScrollProgress.ts
│   ├── useSmoothScroll.ts
│   ├── useCursor.ts
│   ├── useTextReveal.tsx
│   ├── useMagnetic.ts
│   ├── useThrottle.ts
│   ├── useAnimationFrame.ts
│   └── useWindowSize.ts
├── components/
│   ├── layout/           # Layout components
│   ├── ui/               # Reusable UI components
│   └── sections/         # Page sections (Hero, Story, etc.)
├── pages/                # Route pages (Home, Portfolio)
├── types/                # TypeScript interfaces
└── assets/               # Static assets (images, SVGs)
public/
└── 404.html              # SPA fallback for GitHub Pages
```

## 🚀 Deployment

Deployed to **GitHub Pages** via GitHub Actions.

On push to `main`:
1. Bun installs dependencies
2. Type check, lint, and tests run
3. Vite builds static output to `dist/`
4. GitHub Pages deploys the static site

## 👤 Author

Khinemyaezin
- GitHub: [@khinemyaezin](https://github.com/khinemyaezin)

## Migration Note

This project was migrated from Angular 18 to React 19.3 in version 3.0. See the `/migration/` directory for detailed migration documentation.
