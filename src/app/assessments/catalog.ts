import type { AssessmentDefinition } from '../models';
import { agenticAiReadiness } from './agentic-ai-readiness';
import { microsoftSecurityDataGovernance } from './microsoft-security-data-governance';

export const builtInAssessments: AssessmentDefinition[] = [
  microsoftSecurityDataGovernance,
  agenticAiReadiness
];

export function getBuiltInAssessment(id: string): AssessmentDefinition | undefined {
  return builtInAssessments.find((assessment) => assessment.id === id);
}
