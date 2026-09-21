# Product vision

## Goal

SelfAssessment is a local-first Progressive Web App for structured assessment journeys.

It must support three moments:

1. **Envision** — explain the topic and create a common language before asking questions.
2. **Assess** — collect structured answers, notes and evidence with concrete examples.
3. **Act** — turn the result into maturity indicators, priority gaps and an exportable artifact.

The application deliberately has no mandatory backend. A browser is enough to install the PWA, run assessments and retain data locally.

## Core principles

- **Local-first:** assessment runs are stored in IndexedDB.
- **Portable:** assessment definitions and results can be exported as open JSON; results can also be exported as CSV and HTML.
- **Bilingual:** the UI and assessment content support Italian and English.
- **Reusable:** every assessment is a package with metadata, introductory narrative, questions and scoring.
- **Evidence-oriented:** each question includes a concrete example and the evidence to look for.
- **Progressive depth:** an assessment can expose an Essential first pass and an Advanced layer.
- **PWA:** installable and usable offline after the first load.
- **Static hosting:** deployable to GitHub Pages and `selfassessment.tech`.
