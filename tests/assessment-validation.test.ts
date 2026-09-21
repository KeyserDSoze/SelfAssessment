import { describe, expect, it } from 'vitest';
import { microsoftSecurityDataGovernance } from '../src/app/assessments/microsoft-security-data-governance';
import {
  assertValidAssessmentDefinition,
  validateAssessmentDefinition
} from '../src/app/lib/assessment-validation';

describe('assessment definition validation', () => {
  it('accepts the built-in Microsoft Security & Data Governance assessment', () => {
    expect(
      validateAssessmentDefinition(microsoftSecurityDataGovernance)
    ).toEqual([]);

    expect(
      assertValidAssessmentDefinition(microsoftSecurityDataGovernance)
    ).toBe(microsoftSecurityDataGovernance);
  });

  it('detects duplicate question IDs and missing essential questions', () => {
    const invalid = structuredClone(microsoftSecurityDataGovernance);
    invalid.questions = invalid.questions
      .filter((question) => question.track === 'advanced')
      .slice(0, 2);
    invalid.questions[1].id = invalid.questions[0].id;

    const issues = validateAssessmentDefinition(invalid);
    expect(issues.some((issue) => issue.code === 'duplicate_question_id')).toBe(
      true
    );
    expect(
      issues.some((issue) => issue.code === 'missing_essential_question')
    ).toBe(true);
  });

  it('rejects invalid weights', () => {
    const invalid = structuredClone(microsoftSecurityDataGovernance);
    invalid.questions[0].weight = 0;

    expect(
      validateAssessmentDefinition(invalid).some(
        (issue) => issue.code === 'invalid_weight'
      )
    ).toBe(true);
  });
});
