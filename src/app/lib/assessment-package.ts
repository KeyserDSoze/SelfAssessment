import type { AssessmentDefinition } from '../models';

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

  const assessment = candidate.assessment;
  if (
    !assessment.id ||
    !assessment.version ||
    !assessment.title?.it ||
    !assessment.title?.en ||
    !Array.isArray(assessment.questions) ||
    assessment.questions.length === 0
  ) {
    throw new Error('Invalid assessment definition');
  }

  return assessment;
}
