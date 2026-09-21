import type {
  AssessmentDefinition,
  AssessmentRun,
  Locale,
  RunScope
} from '../models';
import { calculateResults } from './scoring';

export interface AssessmentHistoryPoint {
  runId: string;
  updatedAt: string;
  scope: RunScope;
  score: number | null;
  completionPercent: number;
  unknownCount: number;
}

export interface AreaDelta {
  area: string;
  current: number | null;
  previous: number | null;
  delta: number | null;
}

export interface AssessmentHistorySummary {
  points: AssessmentHistoryPoint[];
  latest?: AssessmentHistoryPoint;
  previousComparable?: AssessmentHistoryPoint;
  overallDelta: number | null;
  areaDeltas: AreaDelta[];
}

export function buildAssessmentHistory(
  assessment: AssessmentDefinition,
  runs: AssessmentRun[],
  locale: Locale
): AssessmentHistorySummary {
  const relevantRuns = runs
    .filter((run) => run.assessmentId === assessment.id)
    .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));

  const points = relevantRuns.map((run) => {
    const result = calculateResults(assessment, run, locale);
    return {
      runId: run.id,
      updatedAt: run.updatedAt,
      scope: run.scope,
      score: result.overallScore,
      completionPercent: result.completionPercent,
      unknownCount: result.unknownCount
    };
  });

  const latestRun = relevantRuns.at(-1);
  const latest = points.at(-1);

  if (!latestRun || !latest) {
    return {
      points,
      overallDelta: null,
      areaDeltas: []
    };
  }

  const previousRun = [...relevantRuns]
    .slice(0, -1)
    .reverse()
    .find((run) => run.scope === latestRun.scope);

  const previousComparable = previousRun
    ? points.find((point) => point.runId === previousRun.id)
    : undefined;

  const overallDelta =
    latest.score !== null &&
    previousComparable?.score !== null &&
    previousComparable?.score !== undefined
      ? latest.score - previousComparable.score
      : null;

  const latestResult = calculateResults(assessment, latestRun, locale);
  const previousResult = previousRun
    ? calculateResults(assessment, previousRun, locale)
    : undefined;

  const previousAreas = new Map(
    previousResult?.areaScores.map((item) => [item.area, item.score]) ?? []
  );

  const areaDeltas = latestResult.areaScores.map((item) => {
    const previous = previousAreas.get(item.area) ?? null;
    return {
      area: item.area,
      current: item.score,
      previous,
      delta:
        item.score !== null && previous !== null ? item.score - previous : null
    };
  });

  return {
    points,
    latest,
    previousComparable,
    overallDelta,
    areaDeltas
  };
}
