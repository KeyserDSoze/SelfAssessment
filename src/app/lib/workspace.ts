import type { AssessmentDefinition, AssessmentRun, StoredAssessment } from '../models';
import {
  listImportedAssessments,
  listRuns,
  putImportedAssessment,
  putRun
} from './db';

export interface WorkspaceBackup {
  format: 'selfassessment.tech/workspace';
  schemaVersion: 1;
  exportedAt: string;
  runs: AssessmentRun[];
  assessments: AssessmentDefinition[];
}

export function makeWorkspaceBackup(
  runs: AssessmentRun[],
  importedAssessments: StoredAssessment[]
): WorkspaceBackup {
  return {
    format: 'selfassessment.tech/workspace',
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    runs,
    assessments: importedAssessments.map((item) => item.definition)
  };
}

export function parseWorkspaceBackup(value: unknown): WorkspaceBackup {
  if (!value || typeof value !== 'object') {
    throw new Error('Invalid workspace backup');
  }

  const candidate = value as Partial<WorkspaceBackup>;
  if (
    candidate.format !== 'selfassessment.tech/workspace' ||
    candidate.schemaVersion !== 1 ||
    !Array.isArray(candidate.runs) ||
    !Array.isArray(candidate.assessments)
  ) {
    throw new Error('Invalid workspace backup');
  }

  for (const run of candidate.runs) {
    if (
      !run ||
      typeof run !== 'object' ||
      !run.id ||
      !run.assessmentId ||
      !run.assessmentVersion ||
      !run.startedAt ||
      !run.updatedAt ||
      !run.answers
    ) {
      throw new Error('Invalid assessment run in workspace backup');
    }
  }

  for (const assessment of candidate.assessments) {
    if (
      !assessment ||
      typeof assessment !== 'object' ||
      !assessment.id ||
      !assessment.version ||
      !assessment.title?.it ||
      !assessment.title?.en ||
      !Array.isArray(assessment.questions)
    ) {
      throw new Error('Invalid assessment in workspace backup');
    }
  }

  return candidate as WorkspaceBackup;
}

function downloadJson(filename: string, value: unknown): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function downloadWorkspaceBackup(): Promise<void> {
  const [runs, imported] = await Promise.all([
    listRuns(),
    listImportedAssessments()
  ]);
  const backup = makeWorkspaceBackup(runs, imported);
  const date = new Date().toISOString().slice(0, 10);
  downloadJson(`selfassessment-workspace-${date}.json`, backup);
}

export async function restoreWorkspaceBackup(value: unknown): Promise<WorkspaceBackup> {
  const backup = parseWorkspaceBackup(value);

  for (const assessment of backup.assessments) {
    await putImportedAssessment(assessment);
  }

  for (const run of backup.runs) {
    await putRun(run);
  }

  return backup;
}
