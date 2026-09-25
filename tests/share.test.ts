import { describe, expect, it } from 'vitest';
import type { AssessmentDefinition, AssessmentRun } from '../src/app/models';
import {
  decodeSharedAnswers,
  encodeSharedAnswers,
  scopeToShareToken,
  shareTokenToScope
} from '../src/app/lib/share';

const assessment: AssessmentDefinition = {
  id: 'share-test',
  version: '1.0.0',
  title: { it: 'Test', en: 'Test' },
  shortDescription: { it: 'Test', en: 'Test' },
  longDescription: { it: 'Test', en: 'Test' },
  estimatedMinutes: 5,
  tags: [],
  accent: '#136de2',
  intro: [],
  questions: [
    {
      id: 'q1',
      area: { it: 'A', en: 'A' },
      track: 'essential',
      question: { it: 'Q1', en: 'Q1' },
      example: { it: 'E', en: 'E' },
      evidence: { it: 'E', en: 'E' },
      microsoft: 'Test',
      responseType: 'scale',
      owner: 'Owner',
      weight: 1
    },
    {
      id: 'q2',
      area: { it: 'A', en: 'A' },
      track: 'essential',
      question: { it: 'Q2', en: 'Q2' },
      example: { it: 'E', en: 'E' },
      evidence: { it: 'E', en: 'E' },
      microsoft: 'Test',
      responseType: 'binary',
      owner: 'Owner',
      weight: 1
    },
    {
      id: 'q3',
      area: { it: 'B', en: 'B' },
      track: 'advanced',
      question: { it: 'Q3', en: 'Q3' },
      example: { it: 'E', en: 'E' },
      evidence: { it: 'E', en: 'E' },
      microsoft: 'Test',
      responseType: 'scale',
      owner: 'Owner',
      weight: 1
    }
  ]
};

function run(scope: AssessmentRun['scope']): AssessmentRun {
  const now = new Date().toISOString();
  return {
    id: 'run-1',
    assessmentId: assessment.id,
    assessmentVersion: assessment.version,
    scope,
    locale: 'it',
    startedAt: now,
    updatedAt: now,
    context: {
      organization: 'Must not be shared'
    },
    answers: {
      q1: { value: 4, notes: 'Private note' },
      q2: { value: 'unknown', notes: 'Another private note' },
      q3: { value: 'na' }
    }
  };
}

describe('assessment answer sharing', () => {
  it('round-trips Essential answer values only', () => {
    const source = run('essential');
    const payload = encodeSharedAnswers(assessment, source);
    const decoded = decodeSharedAnswers(assessment, 'essential', payload);

    expect(payload).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decoded.answers).toEqual({
      q1: { value: 4 },
      q2: { value: 'unknown' }
    });
    expect(decoded.answeredCount).toBe(2);
    expect(decoded.totalCount).toBe(2);
    expect(decoded.complete).toBe(true);
    expect(JSON.stringify(decoded.answers)).not.toContain('Private');
    expect(JSON.stringify(decoded.answers)).not.toContain('organization');
  });

  it('preserves missing answers and finds the first unanswered question', () => {
    const source = run('all');
    delete source.answers.q2;
    const payload = encodeSharedAnswers(assessment, source);
    const decoded = decodeSharedAnswers(assessment, 'all', payload);

    expect(decoded.answers.q1.value).toBe(4);
    expect(decoded.answers.q2).toBeUndefined();
    expect(decoded.answers.q3.value).toBe('na');
    expect(decoded.firstUnansweredId).toBe('q2');
    expect(decoded.complete).toBe(false);
  });

  it('uses compact scope tokens', () => {
    expect(scopeToShareToken('essential')).toBe('e');
    expect(scopeToShareToken('all')).toBe('f');
    expect(shareTokenToScope('e')).toBe('essential');
    expect(shareTokenToScope('f')).toBe('all');
    expect(shareTokenToScope('other')).toBeUndefined();
  });
});
