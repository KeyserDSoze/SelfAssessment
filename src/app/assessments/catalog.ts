import type { AssessmentDefinition } from '../models';
import { microsoftSecurityDataGovernance } from './microsoft-security-data-governance';

export const builtInAssessments: AssessmentDefinition[] = [
  microsoftSecurityDataGovernance
];

export function getBuiltInAssessment(id: string): AssessmentDefinition | undefined {
  return builtInAssessments.find((assessment) => assessment.id === id);
}
