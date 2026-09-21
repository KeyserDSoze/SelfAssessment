import type {
  AnswerValue,
  AssessmentDefinition,
  AssessmentRun,
  Locale
} from '../models';
import { localized } from './localize';
import { calculateResults } from './scoring';
import { makeAssessmentPackage } from './assessment-package';

function downloadText(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function escapeCsv(value: unknown): string {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function answerLabel(value: AnswerValue | undefined, locale: Locale): string {
  const map = {
    it: { yes: 'Sì', no: 'No', unknown: 'Non so', na: 'N/A' },
    en: { yes: 'Yes', no: 'No', unknown: 'Unknown', na: 'N/A' }
  } as const;

  if (typeof value === 'number') return String(value);
  if (!value) return '';
  return map[locale][value];
}

export function downloadAssessment(
  assessment: AssessmentDefinition
): void {
  downloadText(
    `${assessment.id}-${assessment.version}.assessment.json`,
    JSON.stringify(makeAssessmentPackage(assessment), null, 2),
    'application/json'
  );
}

export function downloadResultJson(
  assessment: AssessmentDefinition,
  run: AssessmentRun,
  locale: Locale
): void {
  const result = calculateResults(assessment, run, locale);
  downloadText(
    `${assessment.id}-${run.id}.result.json`,
    JSON.stringify(
      {
        format: 'selfassessment.tech/result',
        schemaVersion: 1,
        exportedAt: new Date().toISOString(),
        assessment: {
          id: assessment.id,
          version: assessment.version,
          title: localized(assessment.title, locale)
        },
        run,
        result
      },
      null,
      2
    ),
    'application/json'
  );
}

export function downloadResultCsv(
  assessment: AssessmentDefinition,
  run: AssessmentRun,
  locale: Locale
): void {
  const result = calculateResults(assessment, run, locale);
  const header = [
    'Area',
    'Track',
    'Question',
    'Response',
    'Score',
    'Weight',
    'Microsoft',
    'Owner',
    'Notes'
  ];

  const rows = result.scoredQuestions.map((item) => [
    localized(item.question.area, locale),
    item.question.track,
    localized(item.question.question, locale),
    answerLabel(item.answer.value, locale),
    item.score ?? '',
    item.question.weight,
    item.question.microsoft,
    item.question.owner,
    item.answer.notes ?? ''
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map(escapeCsv).join(','))
    .join('\n');

  downloadText(
    `${assessment.id}-${run.id}.csv`,
    csv,
    'text/csv;charset=utf-8'
  );
}

export function downloadResultHtml(
  assessment: AssessmentDefinition,
  run: AssessmentRun,
  locale: Locale
): void {
  const result = calculateResults(assessment, run, locale);
  const title = localized(assessment.title, locale);
  const rows = result.scoredQuestions
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(localized(item.question.area, locale))}</td>
          <td>${escapeHtml(localized(item.question.question, locale))}</td>
          <td>${escapeHtml(answerLabel(item.answer.value, locale))}</td>
          <td>${escapeHtml(item.score ?? '')}</td>
          <td>${escapeHtml(item.answer.notes ?? '')}</td>
        </tr>`
    )
    .join('');

  const html = `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)} — SelfAssessment</title>
<style>
body{font-family:Inter,Arial,sans-serif;margin:40px;color:#152238}
h1{margin-bottom:4px}.muted{color:#667085}.score{font-size:48px;font-weight:800;margin:24px 0}
table{width:100%;border-collapse:collapse;margin-top:28px}th,td{border:1px solid #dfe3e8;padding:10px;text-align:left;vertical-align:top}th{background:#f5f7fa}
</style>
</head>
<body>
<h1>${escapeHtml(title)}</h1>
<div class="muted">SelfAssessment.tech · ${escapeHtml(run.updatedAt)}</div>
<div class="score">${result.overallScore?.toFixed(1) ?? '—'} / 5</div>
<p>${result.answeredCount}/${result.totalCount} answered · ${result.completionPercent}% complete · ${result.unknownCount} unknown</p>
<table>
<thead><tr><th>Area</th><th>Question</th><th>Response</th><th>Score</th><th>Notes</th></tr></thead>
<tbody>${rows}</tbody>
</table>
</body>
</html>`;

  downloadText(`${assessment.id}-${run.id}.html`, html, 'text/html;charset=utf-8');
}
