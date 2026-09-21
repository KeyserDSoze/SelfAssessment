import { describe, expect, it } from 'vitest';
import { microsoftSecurityDataGovernance } from '../src/app/assessments/microsoft-security-data-governance';
import { buildAssessmentHistory } from '../src/app/lib/history';
import type { AssessmentRun } from '../src/app/models';

function run(
  id: string,
  updatedAt: string,
  score: number,
  scope: 'essential' | 'all' = 'essential'
): AssessmentRun {
  return {
    id,
    assessmentId: microsoftSecurityDataGovernance.id,
    assessmentVersion: microsoftSecurityDataGovernance.version,
    scope,
    locale: 'it',
    startedAt: updatedAt,
    updatedAt,
    answers: {
      '1': { value: score }
    }
  };
}

describe('assessment history', () => {
  it('sorts runs and compares the latest run with the previous run of the same scope', () => {
    const summary = buildAssessmentHistory(
      microsoftSecurityDataGovernance,
      [
        run('latest', '2026-09-21T12:00:00.000Z', 5),
        run('full', '2026-09-21T11:00:00.000Z', 4, 'all'),
        run('older', '2026-09-21T10:00:00.000Z', 2)
      ],
      'it'
    );

    expect(summary.points.map((point) => point.runId)).toEqual([
      'older',
      'full',
      'latest'
    ]);
    expect(summary.latest?.runId).toBe('latest');
    expect(summary.previousComparable?.runId).toBe('older');
    expect(summary.overallDelta).not.toBeNull();
    expect(summary.overallDelta ?? 0).toBeGreaterThan(0);
  });

  it('returns no delta when there is no comparable previous run', () => {
    const summary = buildAssessmentHistory(
      microsoftSecurityDataGovernance,
      [run('only', '2026-09-21T10:00:00.000Z', 3)],
      'en'
    );

    expect(summary.previousComparable).toBeUndefined();
    expect(summary.overallDelta).toBeNull();
  });
});
