import { describe, expect, it } from 'vitest';
import type { AssessmentDefinition, AssessmentRun } from '../src/app/models';
import { answerToScore, calculateResults } from '../src/app/lib/scoring';

const assessment: AssessmentDefinition = {
  id: 'test',
  version: '1.0.0',
  title: { it: 'Test', en: 'Test' },
  shortDescription: { it: 'Test', en: 'Test' },
  longDescription: { it: 'Test', en: 'Test' },
  estimatedMinutes: 5,
  tags: [],
  accent: '#000',
  intro: [],
  questions: [
    {
      id: '1',
      area: { it: '1. Area', en: '1. Area' },
      track: 'essential',
      question: { it: 'Q1', en: 'Q1' },
      example: { it: 'E1', en: 'E1' },
      evidence: { it: 'V1', en: 'V1' },
      microsoft: 'Test',
      responseType: 'binary',
      owner: 'Owner',
      weight: 3
    },
    {
      id: '2',
      area: { it: '1. Area', en: '1. Area' },
      track: 'advanced',
      question: { it: 'Q2', en: 'Q2' },
      example: { it: 'E2', en: 'E2' },
      evidence: { it: 'V2', en: 'V2' },
      microsoft: 'Test',
      responseType: 'scale',
      owner: 'Owner',
      weight: 2
    }
  ]
};

function makeRun(scope: AssessmentRun['scope']): AssessmentRun {
  return {
    id: 'run',
    assessmentId: 'test',
    assessmentVersion: '1.0.0',
    scope,
    locale: 'it',
    startedAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    answers: {}
  };
}

describe('scoring', () => {
  it('maps binary values to expected scores', () => {
    expect(answerToScore('yes')).toBe(5);
    expect(answerToScore('no')).toBe(0);
    expect(answerToScore('unknown')).toBe(1);
    expect(answerToScore('na')).toBeNull();
  });

  it('filters advanced questions in essential runs', () => {
    const run = makeRun('essential');
    run.answers['1'] = { value: 'yes' };

    const result = calculateResults(assessment, run, 'it');

    expect(result.totalCount).toBe(1);
    expect(result.overallScore).toBe(5);
    expect(result.completionPercent).toBe(100);
  });

  it('uses question weights in full runs', () => {
    const run = makeRun('all');
    run.answers['1'] = { value: 'yes' };
    run.answers['2'] = { value: 0 };

    const result = calculateResults(assessment, run, 'it');

    expect(result.overallScore).toBe(3);
    expect(result.gaps).toHaveLength(1);
  });
});
