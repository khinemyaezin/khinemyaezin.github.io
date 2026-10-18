# Migration Plan: Angular 18 → React 19.3

**Project:** Khinemyaezin Personal Portfolio (`khinemyaezin.github.io`)
**Version:** v2.1
**Target Stack:** Vite + React Router + React 19.3 + Tailwind CSS + TypeScript
**Deployment:** GitHub Pages (static SPA)

## Contents

| File | Description |
|---|---|
| `01-executive-summary.md` | Stakeholder summary, timeline, effort estimate |
| `02-source-code-analysis.md` | File-by-file Angular inventory |
| `03-core-features-inventory.md` | Feature list + React mapping table |
| `04-architecture-comparison.md` | Angular vs React 19 concepts side-by-side |
| `05-react-component-mapping.md` | 1:1 component mapping (Angular → React) |
| `06-technology-stack.md` | React 19.3 + tooling recommendations |
| `07-migration-phases-plan.md` | Phased rollout (6 phases) |
| `08-risk-assessment.md` | Risks + mitigations |
| `09-testing-strategy.md` | Vitest + React Testing Library + E2E |
| `10-deployment-plan.md` | Build, CI/CD, GitHub Pages |

## Goals

- Fully replace Angular 18 frontend with React 19.3 SPA
- Preserve all existing content (JSON data files, public assets)
- Preserve all animations (scroll-based, text reveal, cursor, smooth scroll, magnetic links)
- Deploy as static site to GitHub Pages
- Zero runtime Angular dependencies after migration

## Constraints

- No Angular CLI, no Zone.js, no RxJS in the new codebase
- No server-side rendering (static SPA only)
- Hash-based or browser router history (React Router)
- Tailwind CSS replaces SCSS + Bootstrap component styles
