import type {
  AnswerValue,
  AssessmentDefinition,
  AssessmentRun,
  Locale
} from '../models';
import { makeAssessmentPackage } from './assessment-package';
import { listEvidenceAttachmentsForRun } from './db';
import { localized } from './localize';
import { calculateResults } from './scoring';
import { serializeEvidenceAttachment } from './workspace';

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

export async function downloadResultJson(
  assessment: AssessmentDefinition,
  run: AssessmentRun,
  locale: Locale
): Promise<void> {
  const result = calculateResults(assessment, run, locale);
  const attachments = await listEvidenceAttachmentsForRun(run.id);
  const serializedAttachments = await Promise.all(
    attachments.map(serializeEvidenceAttachment)
  );

  downloadText(
    `${assessment.id}-${run.id}.result.json`,
    JSON.stringify(
      {
        format: 'selfassessment.tech/result',
        schemaVersion: 2,
        exportedAt: new Date().toISOString(),
        assessment: {
          id: assessment.id,
          version: assessment.version,
          title: localized(assessment.title, locale)
        },
        run,
        result,
        evidenceAttachments: serializedAttachments
      },
      null,
      2
    ),
    'application/json'
  );
}

export async function downloadResultCsv(
  assessment: AssessmentDefinition,
  run: AssessmentRun,
  locale: Locale
): Promise<void> {
  const result = calculateResults(assessment, run, locale);
  const attachments = await listEvidenceAttachmentsForRun(run.id);
  const attachmentsByQuestion = new Map<string, string[]>();

  for (const attachment of attachments) {
    const names = attachmentsByQuestion.get(attachment.questionId) ?? [];
    names.push(attachment.name);
    attachmentsByQuestion.set(attachment.questionId, names);
  }

  const header = [
    'Organization',
    'Session',
    'Participants',
    'Facilitator',
    'Area',
    'Track',
    'Question',
    'Response',
    'Score',
    'Weight',
    'Microsoft',
    'Owner',
    'Notes',
    'Attachments'
  ];

  const rows = result.scoredQuestions.map((item) => [
    run.context?.organization ?? '',
    run.context?.sessionName ?? '',
    run.context?.participants ?? '',
    run.context?.facilitator ?? '',
    localized(item.question.area, locale),
    item.question.track,
    localized(item.question.question, locale),
    answerLabel(item.answer.value, locale),
    item.score ?? '',
    item.question.weight,
    item.question.microsoft,
    item.question.owner,
    item.answer.notes ?? '',
    (attachmentsByQuestion.get(item.question.id) ?? []).join(' | ')
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

export async function downloadResultHtml(
  assessment: AssessmentDefinition,
  run: AssessmentRun,
  locale: Locale
): Promise<void> {
  const result = calculateResults(assessment, run, locale);
  const title = localized(assessment.title, locale);
  const attachments = await listEvidenceAttachmentsForRun(run.id);
  const attachmentsByQuestion = new Map<string, string[]>();

  for (const attachment of attachments) {
    const names = attachmentsByQuestion.get(attachment.questionId) ?? [];
    names.push(attachment.name);
    attachmentsByQuestion.set(attachment.questionId, names);
  }

  const rows = result.scoredQuestions
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(localized(item.question.area, locale))}</td>
          <td>${escapeHtml(localized(item.question.question, locale))}</td>
          <td>${escapeHtml(answerLabel(item.answer.value, locale))}</td>
          <td>${escapeHtml(item.score ?? '')}</td>
          <td>${escapeHtml(item.answer.notes ?? '')}</td>
          <td>${escapeHtml(
            (attachmentsByQuestion.get(item.question.id) ?? []).join(', ')
          )}</td>
        </tr>`
    )
    .join('');

  const contextSummary = run.context
    ? `<div class="context">
        ${run.context.organization ? `<div><strong>Organization:</strong> ${escapeHtml(run.context.organization)}</div>` : ''}
        ${run.context.sessionName ? `<div><strong>Session:</strong> ${escapeHtml(run.context.sessionName)}</div>` : ''}
        ${run.context.participants ? `<div><strong>Participants:</strong> ${escapeHtml(run.context.participants)}</div>` : ''}
        ${run.context.facilitator ? `<div><strong>Facilitator:</strong> ${escapeHtml(run.context.facilitator)}</div>` : ''}
      </div>`
    : '';

  const attachmentSummary =
    attachments.length > 0
      ? `<p>${attachments.length} evidence attachment(s) are referenced in this report. Binary files are included in the JSON result export and full workspace backup.</p>`
      : '';

  const html = `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)} — SelfAssessment</title>
<style>
body{font-family:Inter,Arial,sans-serif;margin:40px;color:#152238}
h1{margin-bottom:4px}.muted{color:#667085}.score{font-size:48px;font-weight:800;margin:24px 0}.context{margin:18px 0;padding:14px;background:#f5f7fa;border-radius:10px}.context div{margin:4px 0}
table{width:100%;border-collapse:collapse;margin-top:28px}th,td{border:1px solid #dfe3e8;padding:10px;text-align:left;vertical-align:top}th{background:#f5f7fa}
</style>
</head>
<body>
<h1>${escapeHtml(title)}</h1>
<div class="muted">SelfAssessment.tech · ${escapeHtml(run.updatedAt)}</div>
${contextSummary}
<div class="score">${result.overallScore?.toFixed(1) ?? '—'} / 5</div>
<p>${result.answeredCount}/${result.totalCount} answered · ${result.completionPercent}% complete · ${result.unknownCount} unknown</p>
${attachmentSummary}
<table>
<thead><tr><th>Area</th><th>Question</th><th>Response</th><th>Score</th><th>Notes</th><th>Attachments</th></tr></thead>
<tbody>${rows}</tbody>
</table>
</body>
</html>`;

  downloadText(`${assessment.id}-${run.id}.html`, html, 'text/html;charset=utf-8');
}
