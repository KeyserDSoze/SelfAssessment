# Product vision

## Goal

SelfAssessment is a local-first Progressive Web App for structured assessment journeys.

It must support three moments:

1. **Envision** — explain the topic and create a common language before asking questions.
2. **Assess** — collect structured answers, notes and evidence with concrete examples.
3. **Act** — turn the result into maturity indicators, priority gaps and an exportable artifact.

The application deliberately has no mandatory backend. A browser is enough to install the PWA, run assessments and retain data locally.

## Core principles

- **Local-first:** assessment runs, custom definitions and evidence attachments are stored in IndexedDB.
- **Portable:** assessment definitions and results can be exported as open JSON; results can also be exported as CSV and HTML.
- **Recoverable:** a complete workspace backup can move runs, imported assessments and evidence files to another browser.
- **Bilingual:** the UI and assessment content support Italian and English.
- **Reusable:** every assessment is a package with metadata, introductory narrative, questions and scoring.
- **Evidence-oriented:** each question includes a concrete example, the evidence to look for, notes and optional local file attachments.
- **Progressive depth:** an assessment can expose an Essential first pass and an Advanced layer.
- **Comparable:** repeated runs can be compared over time when they use the same assessment depth.
- **PWA:** installable and usable offline after the first load.
- **Static hosting:** deployable to GitHub Pages and `selfassessment.tech`.

## Data ownership

The default product architecture intentionally avoids a server-side data store. Assessment content remains on the device unless the user explicitly exports a package, result or workspace backup.

Evidence attachments are stored as binary blobs in IndexedDB. Portable JSON backups serialize those files as data URLs so a complete local workspace can be restored elsewhere.
