# SelfAssessment

A local-first Progressive Web App for reusable self-assessments, evidence collection and maturity reporting.

## What is included

- React + TypeScript + Vite
- installable PWA with offline cache
- Italian / English UI and assessment content
- light / dark theme
- assessment catalog
- slide-like introductory narrative before each assessment
- Essential and Full assessment scopes
- IndexedDB autosave
- downloadable assessment packages
- import of assessment packages
- maturity scoring and per-area visualization
- priority gap extraction
- result export to JSON, CSV and HTML
- print / save-to-PDF
- GitHub Pages deployment
- first built-in assessment: **Microsoft Security & Data Governance** with 67 questions

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm test
npm run build
```

## Structure

```text
docs/                  Product and technical documentation
src/app/               React application
tests/                 Unit tests
.github/workflows/     CI and GitHub Pages deployment
```

See [`docs/PRODUCT.md`](docs/PRODUCT.md) and [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the product and architecture rationale.
