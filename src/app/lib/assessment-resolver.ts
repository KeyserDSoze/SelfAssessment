import type { AssessmentDefinition } from '../models';
import { getBuiltInAssessment } from '../assessments/catalog';
import { getImportedAssessment, listImportedAssessments } from './db';

export async function resolveAssessment(
  id: string
): Promise<AssessmentDefinition | undefined> {
  return getBuiltInAssessment(id) ?? (await getImportedAssessment(id))?.definition;
}

export async function listAllAssessments(): Promise<
  { assessment: AssessmentDefinition; source: 'built-in' | 'imported' }[]
> {
  const { builtInAssessments } = await import('../assessments/catalog');
  const imported = await listImportedAssessments();
  return [
    ...builtInAssessments.map((assessment) => ({
      assessment,
      source: 'built-in' as const
    })),
    ...imported.map((item) => ({
      assessment: item.definition,
      source: 'imported' as const
    }))
  ];
}
