import type { AssessmentDefinition } from '../models';

export interface AssessmentValidationIssue {
  code:
    | 'missing_id'
    | 'missing_version'
    | 'missing_localized_text'
    | 'missing_intro'
    | 'missing_questions'
    | 'duplicate_intro_id'
    | 'duplicate_question_id'
    | 'invalid_question'
    | 'invalid_weight'
    | 'missing_essential_question';
  path: string;
}

function hasLocalizedText(value: unknown): value is { it: string; en: string } {
  if (!value || typeof value !== 'object') return false;
  const text = value as { it?: unknown; en?: unknown };
  return (
    typeof text.it === 'string' &&
    text.it.trim().length > 0 &&
    typeof text.en === 'string' &&
    text.en.trim().length > 0
  );
}

function duplicateIds(items: { id: string }[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    if (seen.has(item.id)) duplicates.add(item.id);
    seen.add(item.id);
  }

  return [...duplicates];
}

export function validateAssessmentDefinition(
  assessment: AssessmentDefinition
): AssessmentValidationIssue[] {
  const issues: AssessmentValidationIssue[] = [];

  if (!assessment.id?.trim()) {
    issues.push({ code: 'missing_id', path: 'id' });
  }

  if (!assessment.version?.trim()) {
    issues.push({ code: 'missing_version', path: 'version' });
  }

  const localizedFields = [
    ['title', assessment.title],
    ['shortDescription', assessment.shortDescription],
    ['longDescription', assessment.longDescription]
  ] as const;

  for (const [path, value] of localizedFields) {
    if (!hasLocalizedText(value)) {
      issues.push({ code: 'missing_localized_text', path });
    }
  }

  if (!Array.isArray(assessment.intro) || assessment.intro.length === 0) {
    issues.push({ code: 'missing_intro', path: 'intro' });
  } else {
    for (const [index, section] of assessment.intro.entries()) {
      if (
        !section.id?.trim() ||
        !hasLocalizedText(section.title) ||
        !hasLocalizedText(section.body)
      ) {
        issues.push({
          code: 'missing_localized_text',
          path: `intro[${index}]`
        });
      }
    }

    for (const id of duplicateIds(assessment.intro)) {
      issues.push({ code: 'duplicate_intro_id', path: `intro.${id}` });
    }
  }

  if (!Array.isArray(assessment.questions) || assessment.questions.length === 0) {
    issues.push({ code: 'missing_questions', path: 'questions' });
    return issues;
  }

  for (const id of duplicateIds(assessment.questions)) {
    issues.push({ code: 'duplicate_question_id', path: `questions.${id}` });
  }

  if (!assessment.questions.some((question) => question.track === 'essential')) {
    issues.push({
      code: 'missing_essential_question',
      path: 'questions'
    });
  }

  for (const [index, question] of assessment.questions.entries()) {
    if (
      !question.id?.trim() ||
      !hasLocalizedText(question.area) ||
      !hasLocalizedText(question.question) ||
      !hasLocalizedText(question.example) ||
      !hasLocalizedText(question.evidence) ||
      !['essential', 'advanced'].includes(question.track) ||
      !['scale', 'binary'].includes(question.responseType)
    ) {
      issues.push({
        code: 'invalid_question',
        path: `questions[${index}]`
      });
    }

    if (
      !Number.isFinite(question.weight) ||
      question.weight <= 0 ||
      question.weight > 10
    ) {
      issues.push({
        code: 'invalid_weight',
        path: `questions[${index}].weight`
      });
    }
  }

  return issues;
}

export function assertValidAssessmentDefinition(
  assessment: AssessmentDefinition
): AssessmentDefinition {
  const issues = validateAssessmentDefinition(assessment);
  if (issues.length > 0) {
    const error = new Error('Invalid assessment definition');
    Object.assign(error, { issues });
    throw error;
  }
  return assessment;
}
