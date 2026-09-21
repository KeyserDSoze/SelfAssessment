# Architecture

## Repository layout

```text
.
├── .github/workflows/       GitHub Actions CI and GitHub Pages deployment
├── docs/                    Product and technical documentation in Markdown
├── public/                  Static PWA assets and CNAME
├── src/app/                 React application
│   ├── assessments/         Built-in assessment definitions
│   ├── components/          Reusable UI components
│   ├── hooks/               Theme and PWA install hooks
│   ├── i18n/                UI translations
│   ├── lib/                 IndexedDB, scoring, import/export and resolvers
│   ├── pages/               Route-level screens
│   └── styles/              Application theme and responsive CSS
└── tests/                   Unit tests
```

## Runtime

- React + TypeScript + Vite
- `react-i18next` for UI localization
- native IndexedDB for local persistence
- Recharts for result visualizations
- `vite-plugin-pwa` for service worker and installability
- `HashRouter` so static GitHub Pages hosting does not require server-side route rewrites

## Persistence

The IndexedDB database `selfassessment-tech` currently contains:

- `runs`: user assessment runs
- `assessments`: imported custom assessment definitions

Theme and selected language are small UI preferences and remain in `localStorage`.

## No backend by design

No answer, note or evidence is transmitted outside the browser. A future sync service can be added as an optional adapter, but it must not become a prerequisite for local usage.
