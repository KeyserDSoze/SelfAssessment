import { describe, expect, it } from 'vitest';
import { microsoftSecurityDataGovernance } from '../src/app/assessments/microsoft-security-data-governance';
import {
  makeAssessmentPackage,
  parseAssessmentPackage
} from '../src/app/lib/assessment-package';

describe('assessment package', () => {
  it('round-trips a built-in assessment package', () => {
    const payload = makeAssessmentPackage(microsoftSecurityDataGovernance);
    const parsed = parseAssessmentPackage(payload);

    expect(parsed.id).toBe('microsoft-security-data-governance');
    expect(parsed.questions).toHaveLength(67);
  });

  it('rejects unknown package formats', () => {
    expect(() => parseAssessmentPackage({ format: 'other' })).toThrow();
  });
});
