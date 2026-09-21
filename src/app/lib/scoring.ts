import type {
  AnswerValue,
  AssessmentDefinition,
  AssessmentResult,
  AssessmentRun,
  Locale,
  ScoredQuestion
} from '../models';
import { localized } from './localize';

export function answerToScore(value: AnswerValue | undefined): number | null {
  if (typeof value === 'number') {
    return Math.max(0, Math.min(5, value));
  }

  switch (value) {
    case 'yes':
      return 5;
    case 'no':
      return 0;
    case 'unknown':
      return 1;
    case 'na':
    case undefined:
      return null;
    default:
      return null;
  }
}

export function questionsForRun(assessment: AssessmentDefinition, run: AssessmentRun) {
  return assessment.questions.filter((question) =>
    run.scope === 'all' ? true : question.track === 'essential'
  );
}

export function calculateResults(
  assessment: AssessmentDefinition,
  run: AssessmentRun,
  locale: Locale
): AssessmentResult {
  const questions = questionsForRun(assessment, run);
  const scoredQuestions: ScoredQuestion[] = questions.map((question) => {
    const answer = run.answers[question.id] ?? {};
    return {
      question,
      answer,
      score: answerToScore(answer.value)
    };
  });

  const scoreable = scoredQuestions.filter((item) => item.score !== null);
  const weightedSum = scoreable.reduce(
    (sum, item) => sum + (item.score ?? 0) * item.question.weight,
    0
  );
  const weightTotal = scoreable.reduce((sum, item) => sum + item.question.weight, 0);
  const overallScore = weightTotal > 0 ? weightedSum / weightTotal : null;

  const answeredCount = scoredQuestions.filter(
    (item) => item.answer.value !== undefined
  ).length;

  const areaMap = new Map<
    string,
    { weightedSum: number; weightTotal: number; answered: number; total: number }
  >();

  scoredQuestions.forEach((item) => {
    const area = localized(item.question.area, locale);
    const bucket = areaMap.get(area) ?? {
      weightedSum: 0,
      weightTotal: 0,
      answered: 0,
      total: 0
    };

    bucket.total += 1;
    if (item.answer.value !== undefined) bucket.answered += 1;
    if (item.score !== null) {
      bucket.weightedSum += item.score * item.question.weight;
      bucket.weightTotal += item.question.weight;
    }
    areaMap.set(area, bucket);
  });

  const areaScores = [...areaMap.entries()].map(([area, value]) => ({
    area,
    score: value.weightTotal ? value.weightedSum / value.weightTotal : null,
    answered: value.answered,
    total: value.total
  }));

  const gaps = scoredQuestions
    .filter((item) => item.score !== null && (item.score ?? 5) <= 2)
    .sort(
      (a, b) =>
        b.question.weight - a.question.weight ||
        (a.score ?? 5) - (b.score ?? 5)
    );

  return {
    overallScore,
    completionPercent: questions.length
      ? Math.round((answeredCount / questions.length) * 100)
      : 0,
    answeredCount,
    totalCount: questions.length,
    unknownCount: scoredQuestions.filter((item) => item.answer.value === 'unknown')
      .length,
    areaScores,
    gaps,
    scoredQuestions
  };
}

export function maturityKey(score: number | null): string {
  if (score === null) return 'results.maturity.unscored';
  if (score <= 1) return 'results.maturity.critical';
  if (score <= 2) return 'results.maturity.low';
  if (score <= 3) return 'results.maturity.intermediate';
  if (score <= 4) return 'results.maturity.good';
  return 'results.maturity.advanced';
}
