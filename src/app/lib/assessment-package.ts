import type { AssessmentDefinition } from '../models';
import { assertValidAssessmentDefinition } from './assessment-validation';

export interface AssessmentPackage {
  format: 'selfassessment.tech/assessment';
  schemaVersion: 1;
  assessment: AssessmentDefinition;
}

export function makeAssessmentPackage(
  assessment: AssessmentDefinition
): AssessmentPackage {
  return {
    format: 'selfassessment.tech/assessment',
    schemaVersion: 1,
    assessment
  };
}

export function parseAssessmentPackage(value: unknown): AssessmentDefinition {
  if (!value || typeof value !== 'object') {
    throw new Error('Invalid assessment package');
  }

  const candidate = value as Partial<AssessmentPackage>;
  if (
    candidate.format !== 'selfassessment.tech/assessment' ||
    candidate.schemaVersion !== 1 ||
    !candidate.assessment
  ) {
    throw new Error('Invalid assessment package');
  }

  return assertValidAssessmentDefinition(candidate.assessment);
}
