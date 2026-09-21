import type {
  ActionItem,
  AssessmentDefinition,
  AssessmentRun,
  EvidenceAttachment,
  StoredAssessment
} from '../models';
import { assertValidAssessmentDefinition } from './assessment-validation';
import {
  listActionItems,
  listEvidenceAttachments,
  listImportedAssessments,
  listRuns,
  putActionItem,
  putEvidenceAttachment,
  putImportedAssessment,
  putRun
} from './db';

export interface SerializedEvidenceAttachment {
  id: string;
  runId: string;
  questionId: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  dataUrl: string;
}

export interface WorkspaceBackup {
  format: 'selfassessment.tech/workspace';
  schemaVersion: 3;
  exportedAt: string;
  runs: AssessmentRun[];
  assessments: AssessmentDefinition[];
  attachments: SerializedEvidenceAttachment[];
  actions: ActionItem[];
}

interface LegacyWorkspaceBackupV1 {
  format: 'selfassessment.tech/workspace';
  schemaVersion: 1;
  exportedAt: string;
  runs: AssessmentRun[];
  assessments: AssessmentDefinition[];
}

export function makeWorkspaceBackup(
  runs: AssessmentRun[],
  importedAssessments: StoredAssessment[],
  attachments: SerializedEvidenceAttachment[] = [],
  actions: ActionItem[] = []
): WorkspaceBackup {
  return {
    format: 'selfassessment.tech/workspace',
    schemaVersion: 3,
    exportedAt: new Date().toISOString(),
    runs,
    assessments: importedAssessments.map((item) => item.definition),
    attachments,
    actions
  };
}

function validateRuns(runs: AssessmentRun[]): void {
  for (const run of runs) {
    if (
      !run ||
      typeof run !== 'object' ||
      !run.id ||
      !run.assessmentId ||
      !run.assessmentVersion ||
      !run.startedAt ||
      !run.updatedAt ||
      !run.answers ||
      !['essential', 'all'].includes(run.scope)
    ) {
      throw new Error('Invalid assessment run in workspace backup');
    }
  }
}

function validateAttachments(
  attachments: SerializedEvidenceAttachment[]
): void {
  for (const attachment of attachments) {
    if (
      !attachment ||
      typeof attachment !== 'object' ||
      !attachment.id ||
      !attachment.runId ||
      !attachment.questionId ||
      !attachment.name ||
      !attachment.type ||
      !Number.isFinite(attachment.size) ||
      attachment.size < 0 ||
      !attachment.createdAt ||
      !attachment.dataUrl.startsWith('data:')
    ) {
      throw new Error('Invalid evidence attachment in workspace backup');
    }
  }
}

export function parseWorkspaceBackup(value: unknown): WorkspaceBackup {
  if (!value || typeof value !== 'object') {
    throw new Error('Invalid workspace backup');
  }

  const candidate = value as {
    format?: string;
    schemaVersion?: number;
    exportedAt?: string;
    runs?: AssessmentRun[];
    assessments?: AssessmentDefinition[];
    attachments?: SerializedEvidenceAttachment[];
    actions?: ActionItem[];
  };

  if (
    candidate.format !== 'selfassessment.tech/workspace' ||
    !Array.isArray(candidate.runs) ||
    !Array.isArray(candidate.assessments)
  ) {
    throw new Error('Invalid workspace backup');
  }

  validateRuns(candidate.runs);

  for (const assessment of candidate.assessments) {
    assertValidAssessmentDefinition(assessment);
  }

  if (candidate.schemaVersion === 1) {
    return {
      format: 'selfassessment.tech/workspace',
      schemaVersion: 3,
      exportedAt: candidate.exportedAt ?? new Date().toISOString(),
      runs: candidate.runs,
      assessments: candidate.assessments,
      attachments: [],
      actions: []
    };
  }

  if (candidate.schemaVersion === 2) {
    if (!Array.isArray(candidate.attachments)) {
      throw new Error('Invalid workspace backup');
    }
    validateAttachments(candidate.attachments);
    return {
      format: 'selfassessment.tech/workspace',
      schemaVersion: 3,
      exportedAt: candidate.exportedAt ?? new Date().toISOString(),
      runs: candidate.runs,
      assessments: candidate.assessments,
      attachments: candidate.attachments,
      actions: []
    };
  }

  if (
    candidate.schemaVersion !== 3 ||
    !Array.isArray(candidate.attachments) ||
    !Array.isArray(candidate.actions)
  ) {
    throw new Error('Unsupported workspace backup version');
  }

  validateAttachments(candidate.attachments);

  return {
    format: 'selfassessment.tech/workspace',
    schemaVersion: 3,
    exportedAt: candidate.exportedAt ?? new Date().toISOString(),
    runs: candidate.runs,
    assessments: candidate.assessments,
    attachments: candidate.attachments,
    actions: candidate.actions
  };
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

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(blob);
  });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, encoded = ''] = dataUrl.split(',', 2);
  const match = /^data:([^;]*);base64$/i.exec(header);
  if (!match) {
    throw new Error('Unsupported evidence attachment encoding');
  }

  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Blob([bytes], {
    type: match[1] || 'application/octet-stream'
  });
}

export async function serializeEvidenceAttachment(
  attachment: EvidenceAttachment
): Promise<SerializedEvidenceAttachment> {
  return {
    id: attachment.id,
    runId: attachment.runId,
    questionId: attachment.questionId,
    name: attachment.name,
    type: attachment.type,
    size: attachment.size,
    createdAt: attachment.createdAt,
    dataUrl: await blobToDataUrl(attachment.blob)
  };
}

export async function downloadWorkspaceBackup(): Promise<void> {
  const [runs, imported, evidenceAttachments, actions] = await Promise.all([
    listRuns(),
    listImportedAssessments(),
    listEvidenceAttachments(),
    listActionItems()
  ]);

  const serializedAttachments = await Promise.all(
    evidenceAttachments.map(serializeEvidenceAttachment)
  );

  const backup = makeWorkspaceBackup(
    runs,
    imported,
    serializedAttachments,
    actions
  );
  const date = new Date().toISOString().slice(0, 10);
  downloadJson(`selfassessment-workspace-${date}.json`, backup);
}

export async function restoreWorkspaceBackup(
  value: unknown
): Promise<WorkspaceBackup> {
  const backup = parseWorkspaceBackup(value);

  for (const assessment of backup.assessments) {
    await putImportedAssessment(assessment);
  }

  for (const run of backup.runs) {
    await putRun(run);
  }

  for (const action of backup.actions) {
    await putActionItem(action);
  }

  for (const attachment of backup.attachments) {
    await putEvidenceAttachment({
      id: attachment.id,
      runId: attachment.runId,
      questionId: attachment.questionId,
      name: attachment.name,
      type: attachment.type,
      size: attachment.size,
      createdAt: attachment.createdAt,
      blob: dataUrlToBlob(attachment.dataUrl)
    });
  }

  return backup;
}
