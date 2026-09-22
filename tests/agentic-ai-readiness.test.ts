import { describe, expect, it } from 'vitest';
import { agenticAiReadiness } from '../src/app/assessments/agentic-ai-readiness';
import { builtInAssessments } from '../src/app/assessments/catalog';
import { validateAssessmentDefinition } from '../src/app/lib/assessment-validation';

describe('Microsoft Agentic AI Readiness assessment', () => {
  it('is a valid bilingual built-in assessment', () => {
    expect(validateAssessmentDefinition(agenticAiReadiness)).toEqual([]);
    expect(builtInAssessments.some((assessment) => assessment.id === agenticAiReadiness.id)).toBe(true);
  });

  it('offers a minimal Essential scope and a comprehensive Full scope', () => {
    expect(agenticAiReadiness.questions).toHaveLength(62);
    expect(agenticAiReadiness.questions.filter((question) => question.track === 'essential')).toHaveLength(18);
    expect(new Set(agenticAiReadiness.questions.map((question) => question.area.it)).size).toBe(11);
  });

  it('keeps accountability, identity, regulation and evaluation as high-weight guardrails', () => {
    const criticalIds = ['ai-007', 'ai-008', 'ai-024', 'ai-025', 'ai-030', 'ai-031', 'ai-032', 'ai-053'];
    for (const id of criticalIds) {
      const question = agenticAiReadiness.questions.find((item) => item.id === id);
      expect(question?.track).toBe('essential');
      expect(question?.weight).toBeGreaterThanOrEqual(5);
    }
  });

  it('includes technology envisioning and authoritative regulatory references', () => {
    expect(agenticAiReadiness.intro.length).toBeGreaterThanOrEqual(15);
    const urls = agenticAiReadiness.intro.flatMap((section) =>
      section.references?.map((reference) => reference.url) ?? []
    );
    expect(urls.some((url) => url.includes('learn.microsoft.com'))).toBe(true);
    expect(urls.some((url) => url.includes('digital-strategy.ec.europa.eu'))).toBe(true);
  });
});
