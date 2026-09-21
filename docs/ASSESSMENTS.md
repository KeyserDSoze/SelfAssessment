# Assessment model

An assessment is a versioned definition containing:

- localized title and descriptions;
- a slide-like introductory narrative;
- one or more tags;
- Essential and Advanced questions;
- concrete examples;
- evidence to look for;
- Microsoft or technology scope;
- suggested owner/stakeholder;
- response type;
- scoring weight.

## Response types

### Scale 0–5

- `0` absent / unmanaged
- `1` very limited
- `2` partial / inconsistent
- `3` established but not complete
- `4` well adopted and governed
- `5` fully adopted, measured and improved

`N/A` is excluded from scoring.

### Yes / No / Unknown / N/A

- Yes → score `5`
- No → score `0`
- Unknown → score `1`
- N/A → excluded from scoring

`Unknown` intentionally has a low score because the absence of internal visibility is itself a governance or knowledge-transfer signal.

## Weighted maturity

Essential questions have weight `3`; Advanced questions have weight `2` in the initial Microsoft Security & Data Governance assessment.

The overall score is the weighted average of answered, scoreable questions. Area scores use the same calculation.

## Portable package

Built-in or imported assessments can be exported as:

```json
{
  "format": "selfassessment.tech/assessment",
  "schemaVersion": 1,
  "assessment": {}
}
```

This format is deliberately explicit and versioned so future migrations can be implemented safely.

## Assessment Builder

Custom assessments can be created directly in the PWA without editing JSON.

The builder supports:

- bilingual metadata and descriptions;
- slide-like bilingual introduction sections;
- Essential and Advanced questions;
- scale or binary response types;
- examples and evidence guidance;
- technology scope and suggested owner;
- local save to IndexedDB;
- edit and delete for imported/custom assessments;
- export to the portable assessment package.

Built-in assessments remain code-managed and cannot be overwritten by a custom definition with the same ID.

## History and comparison

Every saved run contributes to the local history for its assessment.

The history view shows:

- overall maturity trend over time;
- latest score and change against the previous run with the same depth;
- per-area score deltas;
- completion percentage and Unknown count;
- links back to each historical result.

Comparisons intentionally use the previous run with the same `scope` (Essential or Full) so the score denominator stays comparable.
