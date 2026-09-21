import { describe, expect, it } from 'vitest';
import type {
  ActionItem,
  AssessmentRun,
  StoredAssessment
} from '../src/app/models';
import {
  makeWorkspaceBackup,
  parseWorkspaceBackup
} from '../src/app/lib/workspace';
import { microsoftSecurityDataGovernance } from '../src/app/assessments/microsoft-security-data-governance';

describe('workspace backup', () => {
  const run: AssessmentRun = {
    id: 'run-1',
    assessmentId: microsoftSecurityDataGovernance.id,
    assessmentVersion: microsoftSecurityDataGovernance.version,
    scope: 'essential',
    locale: 'it',
    startedAt: '2026-09-21T10:00:00.000Z',
    updatedAt: '2026-09-21T10:10:00.000Z',
    answers: {
      '1': { value: 'yes', notes: 'Evidence checked' }
    }
  };

  const imported: StoredAssessment[] = [
    {
      id: microsoftSecurityDataGovernance.id,
      definition: microsoftSecurityDataGovernance,
      importedAt: '2026-09-21T09:00:00.000Z'
    }
  ];

  it('creates and parses a portable workspace backup', () => {
    const action: ActionItem = {
      id: 'action-1',
      runId: run.id,
      questionId: '1',
      title: 'Review governance',
      priority: 'high',
      status: 'open',
      createdAt: '2026-09-21T10:06:00.000Z',
      updatedAt: '2026-09-21T10:06:00.000Z'
    };
    const backup = makeWorkspaceBackup([run], imported, [
      {
        id: 'attachment-1',
        runId: run.id,
        questionId: '1',
        name: 'evidence.txt',
        type: 'text/plain',
        size: 8,
        createdAt: '2026-09-21T10:05:00.000Z',
        dataUrl: 'data:text/plain;base64,ZXZpZGVuY2U='
      }
    ], [action]);
    const parsed = parseWorkspaceBackup(backup);

    expect(parsed.format).toBe('selfassessment.tech/workspace');
    expect(parsed.schemaVersion).toBe(3);
    expect(parsed.runs).toHaveLength(1);
    expect(parsed.assessments).toHaveLength(1);
    expect(parsed.attachments).toHaveLength(1);
    expect(parsed.actions).toHaveLength(1);
    expect(parsed.runs[0].answers['1'].value).toBe('yes');
  });

  it('migrates legacy schema v1 backups without attachments', () => {
    const parsed = parseWorkspaceBackup({
      format: 'selfassessment.tech/workspace',
      schemaVersion: 1,
      exportedAt: '2026-09-21T10:00:00.000Z',
      runs: [run],
      assessments: [microsoftSecurityDataGovernance]
    });

    expect(parsed.schemaVersion).toBe(3);
    expect(parsed.attachments).toEqual([]);
    expect(parsed.actions).toEqual([]);
  });

  it('rejects malformed workspace backups', () => {
    expect(() =>
      parseWorkspaceBackup({
        format: 'selfassessment.tech/workspace',
        schemaVersion: 1,
        runs: [{ id: 'broken' }],
        assessments: []
      })
    ).toThrow();
  });
});
