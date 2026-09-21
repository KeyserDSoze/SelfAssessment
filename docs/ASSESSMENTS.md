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
