import type {
  AnswerValue,
  AssessmentDefinition,
  AssessmentRun,
  Locale
} from '../models';
import { makeAssessmentPackage } from './assessment-package';
import {
  listActionItemsForRun,
  listEvidenceAttachmentsForRun
} from './db';
import { localized } from './localize';
import { calculateResults } from './scoring';
import { serializeEvidenceAttachment } from './workspace';

function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function downloadText(filename: string, content: string, type: string): void {
  downloadBlob(filename, new Blob([content], { type }));
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

function reportLabels(locale: Locale) {
  return locale === 'it'
    ? {
        updated: 'Aggiornato',
        organization: 'Organizzazione',
        session: 'Sessione',
        participants: 'Partecipanti',
        facilitator: 'Facilitatore',
        overall: 'Maturità complessiva',
        completion: 'Completamento',
        answered: 'risposte',
        unknown: 'Non so',
        areaScores: 'Maturità per area',
        area: 'Area',
        score: 'Punteggio',
        coverage: 'Copertura',
        priorityGaps: 'Gap prioritari',
        noGaps: 'Nessun gap con punteggio <= 2 tra le domande risposte.',
        questions: 'Risposte dettagliate',
        question: 'Domanda',
        response: 'Risposta',
        weight: 'Peso',
        notes: 'Note',
        attachments: 'Allegati',
        actionPlan: 'Piano d’azione',
        owner: 'Owner',
        priority: 'Priorità',
        status: 'Stato',
        targetDate: 'Data obiettivo',
        description: 'Descrizione',
        attachmentNote:
          'Gli allegati binari restano disponibili nell’export JSON e nel backup completo del workspace.'
      }
    : {
        updated: 'Updated',
        organization: 'Organization',
        session: 'Session',
        participants: 'Participants',
        facilitator: 'Facilitator',
        overall: 'Overall maturity',
        completion: 'Completion',
        answered: 'answered',
        unknown: 'Unknown',
        areaScores: 'Maturity by area',
        area: 'Area',
        score: 'Score',
        coverage: 'Coverage',
        priorityGaps: 'Priority gaps',
        noGaps: 'No answered question has a score <= 2.',
        questions: 'Detailed responses',
        question: 'Question',
        response: 'Response',
        weight: 'Weight',
        notes: 'Notes',
        attachments: 'Attachments',
        actionPlan: 'Action plan',
        owner: 'Owner',
        priority: 'Priority',
        status: 'Status',
        targetDate: 'Target date',
        description: 'Description',
        attachmentNote:
          'Binary evidence files remain available in the JSON result export and full workspace backup.'
      };
}

async function buildReportData(
  assessment: AssessmentDefinition,
  run: AssessmentRun,
  locale: Locale
) {
  const result = calculateResults(assessment, run, locale);
  const [attachments, actions] = await Promise.all([
    listEvidenceAttachmentsForRun(run.id),
    listActionItemsForRun(run.id)
  ]);
  const attachmentsByQuestion = new Map<string, string[]>();

  for (const attachment of attachments) {
    const names = attachmentsByQuestion.get(attachment.questionId) ?? [];
    names.push(attachment.name);
    attachmentsByQuestion.set(attachment.questionId, names);
  }

  return {
    title: localized(assessment.title, locale),
    labels: reportLabels(locale),
    result,
    attachments,
    actions,
    attachmentsByQuestion
  };
}

export function answerLabel(
  value: AnswerValue | undefined,
  locale: Locale
): string {
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
  const [attachments, actions] = await Promise.all([
    listEvidenceAttachmentsForRun(run.id),
    listActionItemsForRun(run.id)
  ]);
  const serializedAttachments = await Promise.all(
    attachments.map(serializeEvidenceAttachment)
  );

  downloadText(
    `${assessment.id}-${run.id}.result.json`,
    JSON.stringify(
      {
        format: 'selfassessment.tech/result',
        schemaVersion: 3,
        exportedAt: new Date().toISOString(),
        assessment: {
          id: assessment.id,
          version: assessment.version,
          title: localized(assessment.title, locale)
        },
        run,
        result,
        evidenceAttachments: serializedAttachments,
        actionPlan: actions
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
  const data = await buildReportData(assessment, run, locale);

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

  const rows = data.result.scoredQuestions.map((item) => [
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
    (data.attachmentsByQuestion.get(item.question.id) ?? []).join(' | ')
  ]);

  const actionHeader = [
    'ACTION PLAN',
    'Title',
    'Owner',
    'Priority',
    'Status',
    'Target Date',
    'Description',
    'Notes'
  ];
  const actionRows = data.actions.map((action) => [
    '',
    action.title,
    action.owner ?? '',
    action.priority,
    action.status,
    action.targetDate ?? '',
    action.description ?? '',
    action.notes ?? ''
  ]);

  const csv = [header, ...rows, [], actionHeader, ...actionRows]
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
  const data = await buildReportData(assessment, run, locale);
  const { labels, result } = data;

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
            (data.attachmentsByQuestion.get(item.question.id) ?? []).join(', ')
          )}</td>
        </tr>`
    )
    .join('');

  const contextSummary = run.context
    ? `<div class="context">
        ${run.context.organization ? `<div><strong>${labels.organization}:</strong> ${escapeHtml(run.context.organization)}</div>` : ''}
        ${run.context.sessionName ? `<div><strong>${labels.session}:</strong> ${escapeHtml(run.context.sessionName)}</div>` : ''}
        ${run.context.participants ? `<div><strong>${labels.participants}:</strong> ${escapeHtml(run.context.participants)}</div>` : ''}
        ${run.context.facilitator ? `<div><strong>${labels.facilitator}:</strong> ${escapeHtml(run.context.facilitator)}</div>` : ''}
      </div>`
    : '';

  const areaRows = result.areaScores
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.area)}</td>
        <td>${escapeHtml(item.score === null ? '—' : item.score.toFixed(1))}</td>
        <td>${item.answered}/${item.total}</td>
      </tr>`
    )
    .join('');

  const attachmentSummary =
    data.attachments.length > 0
      ? `<p>${data.attachments.length} ${escapeHtml(labels.attachments.toLowerCase())}. ${escapeHtml(labels.attachmentNote)}</p>`
      : '';

  const actionRows = data.actions
    .map(
      (action) => `
        <tr>
          <td>${escapeHtml(action.title)}</td>
          <td>${escapeHtml(action.owner ?? '')}</td>
          <td>${escapeHtml(action.priority)}</td>
          <td>${escapeHtml(action.status)}</td>
          <td>${escapeHtml(action.targetDate ?? '')}</td>
          <td>${escapeHtml(action.description ?? '')}</td>
          <td>${escapeHtml(action.notes ?? '')}</td>
        </tr>`
    )
    .join('');

  const actionPlanSection =
    data.actions.length > 0
      ? `<h2>${escapeHtml(labels.actionPlan)}</h2>
<table>
<thead><tr><th>Title</th><th>${labels.owner}</th><th>${labels.priority}</th><th>${labels.status}</th><th>${labels.targetDate}</th><th>${labels.description}</th><th>${labels.notes}</th></tr></thead>
<tbody>${actionRows}</tbody>
</table>`
      : '';

  const html = `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<title>${escapeHtml(data.title)} - SelfAssessment</title>
<style>
body{font-family:Inter,Arial,sans-serif;margin:40px;color:#152238}
h1{margin-bottom:4px}h2{margin-top:32px}.muted{color:#667085}.score{font-size:48px;font-weight:800;margin:24px 0}.context{margin:18px 0;padding:14px;background:#f5f7fa;border-radius:10px}.context div{margin:4px 0}
table{width:100%;border-collapse:collapse;margin:20px 0 28px}th,td{border:1px solid #dfe3e8;padding:9px;text-align:left;vertical-align:top}th{background:#f5f7fa}
</style>
</head>
<body>
<h1>${escapeHtml(data.title)}</h1>
<div class="muted">SelfAssessment.tech · ${escapeHtml(labels.updated)}: ${escapeHtml(new Date(run.updatedAt).toLocaleString(locale === 'it' ? 'it-IT' : 'en-US'))}</div>
${contextSummary}
<div class="score">${result.overallScore?.toFixed(1) ?? '—'} / 5</div>
<p>${result.answeredCount}/${result.totalCount} ${escapeHtml(labels.answered)} · ${result.completionPercent}% ${escapeHtml(labels.completion.toLowerCase())} · ${result.unknownCount} ${escapeHtml(labels.unknown.toLowerCase())}</p>
<h2>${escapeHtml(labels.areaScores)}</h2>
<table>
<thead><tr><th>${labels.area}</th><th>${labels.score}</th><th>${labels.coverage}</th></tr></thead>
<tbody>${areaRows}</tbody>
</table>
${attachmentSummary}
<h2>${escapeHtml(labels.questions)}</h2>
<table>
<thead><tr><th>${labels.area}</th><th>${labels.question}</th><th>${labels.response}</th><th>${labels.score}</th><th>${labels.notes}</th><th>${labels.attachments}</th></tr></thead>
<tbody>${rows}</tbody>
</table>
${actionPlanSection}
</body>
</html>`;

  downloadText(
    `${assessment.id}-${run.id}.html`,
    html,
    'text/html;charset=utf-8'
  );
}

export async function downloadResultPdf(
  assessment: AssessmentDefinition,
  run: AssessmentRun,
  locale: Locale
): Promise<void> {
  const data = await buildReportData(assessment, run, locale);
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });
  const margin = 46;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const normalize = (value: string) =>
    value
      .replaceAll('—', '-')
      .replaceAll('–', '-')
      .replaceAll('×', 'x')
      .replace(/[“”]/g, '"')
      .replace(/[’]/g, "'");

  const ensureSpace = (height: number) => {
    if (y + height <= pageHeight - margin) return;
    pdf.addPage();
    y = margin;
  };

  const write = (
    text: string,
    fontSize = 10,
    bold = false,
    after = 6
  ) => {
    pdf.setFont('helvetica', bold ? 'bold' : 'normal');
    pdf.setFontSize(fontSize);
    pdf.setLineHeightFactor(1.25);
    const lines = pdf.splitTextToSize(normalize(text), contentWidth) as string[];
    const blockHeight = Math.max(1, lines.length) * fontSize * 1.25 + after;
    ensureSpace(blockHeight);
    pdf.text(lines, margin, y);
    y += blockHeight;
  };

  const heading = (text: string) => {
    ensureSpace(28);
    y += 5;
    write(text, 14, true, 9);
  };

  pdf.setProperties({
    title: data.title,
    subject: 'SelfAssessment.tech result',
    creator: 'SelfAssessment.tech'
  });

  write(data.title, 20, true, 6);
  write(
    `SelfAssessment.tech · ${data.labels.updated}: ${new Date(run.updatedAt).toLocaleString(locale === 'it' ? 'it-IT' : 'en-US')}`,
    9,
    false,
    12
  );

  if (run.context?.organization) {
    write(`${data.labels.organization}: ${run.context.organization}`, 10, true, 2);
  }
  if (run.context?.sessionName) {
    write(`${data.labels.session}: ${run.context.sessionName}`, 10, false, 2);
  }
  if (run.context?.participants) {
    write(`${data.labels.participants}: ${run.context.participants}`, 10, false, 2);
  }
  if (run.context?.facilitator) {
    write(`${data.labels.facilitator}: ${run.context.facilitator}`, 10, false, 7);
  }

  write(
    `${data.labels.overall}: ${data.result.overallScore?.toFixed(1) ?? '-'} / 5`,
    18,
    true,
    4
  );
  write(
    `${data.labels.completion}: ${data.result.completionPercent}% · ${data.result.answeredCount}/${data.result.totalCount} ${data.labels.answered} · ${data.result.unknownCount} ${data.labels.unknown}`,
    10,
    false,
    10
  );

  heading(data.labels.areaScores);
  for (const area of data.result.areaScores) {
    write(
      `${area.area}: ${area.score === null ? '-' : area.score.toFixed(1)} / 5 · ${area.answered}/${area.total}`,
      10,
      false,
      3
    );
  }

  heading(data.labels.priorityGaps);
  if (data.result.gaps.length === 0) {
    write(data.labels.noGaps, 10, false, 4);
  } else {
    for (const gap of data.result.gaps.slice(0, 15)) {
      write(
        `${gap.score?.toFixed(0) ?? '-'} / 5 · ${localized(gap.question.area, locale)}`,
        10,
        true,
        2
      );
      write(localized(gap.question.question, locale), 10, false, 3);
    }
  }

  if (data.attachments.length > 0) {
    heading(data.labels.attachments);
    write(
      `${data.attachments.length} ${data.labels.attachments.toLowerCase()}. ${data.labels.attachmentNote}`,
      9,
      false,
      5
    );
  }

  heading(data.labels.questions);
  data.result.scoredQuestions.forEach((item, index) => {
    const attachments = data.attachmentsByQuestion.get(item.question.id) ?? [];
    write(
      `${index + 1}. ${localized(item.question.question, locale)}`,
      10,
      true,
      3
    );
    write(
      `${data.labels.area}: ${localized(item.question.area, locale)} · ${data.labels.response}: ${answerLabel(item.answer.value, locale) || '-'} · ${data.labels.score}: ${item.score ?? '-'} · ${data.labels.weight}: ${item.question.weight}`,
      9,
      false,
      2
    );
    if (item.answer.notes) {
      write(`${data.labels.notes}: ${item.answer.notes}`, 9, false, 2);
    }
    if (attachments.length > 0) {
      write(
        `${data.labels.attachments}: ${attachments.join(', ')}`,
        9,
        false,
        4
      );
    } else {
      y += 3;
    }
  });

  if (data.actions.length > 0) {
    heading(data.labels.actionPlan);
    data.actions.forEach((action, index) => {
      write(`${index + 1}. ${action.title}`, 10, true, 2);
      write(
        `${data.labels.owner}: ${action.owner ?? '-'} · ${data.labels.priority}: ${action.priority} · ${data.labels.status}: ${action.status}${action.targetDate ? ` · ${data.labels.targetDate}: ${action.targetDate}` : ''}`,
        9,
        false,
        2
      );
      if (action.description) {
        write(`${data.labels.description}: ${action.description}`, 9, false, 2);
      }
      if (action.notes) {
        write(`${data.labels.notes}: ${action.notes}`, 9, false, 4);
      }
    });
  }

  pdf.save(`${assessment.id}-${run.id}.pdf`);
}

export async function downloadResultWord(
  assessment: AssessmentDefinition,
  run: AssessmentRun,
  locale: Locale
): Promise<void> {
  const data = await buildReportData(assessment, run, locale);
  const {
    Document,
    Packer,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    TextRun,
    WidthType
  } = await import('docx');

  const children: any[] = [];
  const paragraph = (
    text: string,
    options: { bold?: boolean; size?: number; after?: number } = {}
  ) =>
    new Paragraph({
      children: [
        new TextRun({
          text,
          bold: options.bold,
          size: options.size ?? 20
        })
      ],
      spacing: { after: options.after ?? 100 }
    });

  const heading = (text: string) =>
    paragraph(text, { bold: true, size: 28, after: 120 });

  const table = (rows: string[][]) =>
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: rows.map(
        (row, rowIndex) =>
          new TableRow({
            children: row.map(
              (cell) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: cell,
                          bold: rowIndex === 0,
                          size: 18
                        })
                      ]
                    })
                  ]
                })
            )
          })
      )
    });

  children.push(paragraph(data.title, { bold: true, size: 38, after: 80 }));
  children.push(
    paragraph(
      `SelfAssessment.tech · ${data.labels.updated}: ${new Date(run.updatedAt).toLocaleString(locale === 'it' ? 'it-IT' : 'en-US')}`,
      { size: 18, after: 180 }
    )
  );

  if (run.context?.organization) {
    children.push(
      paragraph(`${data.labels.organization}: ${run.context.organization}`, {
        bold: true,
        after: 40
      })
    );
  }
  if (run.context?.sessionName) {
    children.push(
      paragraph(`${data.labels.session}: ${run.context.sessionName}`, {
        after: 40
      })
    );
  }
  if (run.context?.participants) {
    children.push(
      paragraph(`${data.labels.participants}: ${run.context.participants}`, {
        after: 40
      })
    );
  }
  if (run.context?.facilitator) {
    children.push(
      paragraph(`${data.labels.facilitator}: ${run.context.facilitator}`, {
        after: 140
      })
    );
  }

  children.push(
    paragraph(
      `${data.labels.overall}: ${data.result.overallScore?.toFixed(1) ?? '—'} / 5`,
      { bold: true, size: 30, after: 60 }
    )
  );
  children.push(
    paragraph(
      `${data.labels.completion}: ${data.result.completionPercent}% · ${data.result.answeredCount}/${data.result.totalCount} ${data.labels.answered} · ${data.result.unknownCount} ${data.labels.unknown}`,
      { after: 180 }
    )
  );

  children.push(heading(data.labels.areaScores));
  children.push(
    table([
      [data.labels.area, data.labels.score, data.labels.coverage],
      ...data.result.areaScores.map((area) => [
        area.area,
        area.score === null ? '—' : `${area.score.toFixed(1)} / 5`,
        `${area.answered}/${area.total}`
      ])
    ])
  );
  children.push(paragraph('', { after: 120 }));

  children.push(heading(data.labels.priorityGaps));
  if (data.result.gaps.length === 0) {
    children.push(paragraph(data.labels.noGaps));
  } else {
    data.result.gaps.slice(0, 15).forEach((gap, index) => {
      children.push(
        paragraph(
          `${index + 1}. ${gap.score?.toFixed(0) ?? '—'} / 5 · ${localized(gap.question.area, locale)}`,
          { bold: true, after: 30 }
        )
      );
      children.push(
        paragraph(localized(gap.question.question, locale), { after: 90 })
      );
    });
  }

  if (data.attachments.length > 0) {
    children.push(heading(data.labels.attachments));
    children.push(
      paragraph(
        `${data.attachments.length} ${data.labels.attachments.toLowerCase()}. ${data.labels.attachmentNote}`,
        { after: 160 }
      )
    );
  }

  children.push(heading(data.labels.questions));
  data.result.scoredQuestions.forEach((item, index) => {
    const attachments = data.attachmentsByQuestion.get(item.question.id) ?? [];
    children.push(
      paragraph(
        `${index + 1}. ${localized(item.question.question, locale)}`,
        { bold: true, after: 30 }
      )
    );
    children.push(
      paragraph(
        `${data.labels.area}: ${localized(item.question.area, locale)} | ${data.labels.response}: ${answerLabel(item.answer.value, locale) || '—'} | ${data.labels.score}: ${item.score ?? '—'} | ${data.labels.weight}: ${item.question.weight}`,
        { size: 18, after: 30 }
      )
    );
    if (item.answer.notes) {
      children.push(
        paragraph(`${data.labels.notes}: ${item.answer.notes}`, {
          size: 18,
          after: 30
        })
      );
    }
    if (attachments.length > 0) {
      children.push(
        paragraph(
          `${data.labels.attachments}: ${attachments.join(', ')}`,
          { size: 18, after: 90 }
        )
      );
    } else {
      children.push(paragraph('', { after: 70 }));
    }
  });

  if (data.actions.length > 0) {
    children.push(heading(data.labels.actionPlan));
    children.push(
      table([
        [
          'Title',
          data.labels.owner,
          data.labels.priority,
          data.labels.status,
          data.labels.targetDate
        ],
        ...data.actions.map((action) => [
          action.title,
          action.owner ?? '',
          action.priority,
          action.status,
          action.targetDate ?? ''
        ])
      ])
    );
    children.push(paragraph('', { after: 100 }));

    data.actions.forEach((action) => {
      if (!action.description && !action.notes) return;
      children.push(paragraph(action.title, { bold: true, after: 30 }));
      if (action.description) {
        children.push(
          paragraph(
            `${data.labels.description}: ${action.description}`,
            { size: 18, after: 30 }
          )
        );
      }
      if (action.notes) {
        children.push(
          paragraph(`${data.labels.notes}: ${action.notes}`, {
            size: 18,
            after: 80
          })
        );
      }
    });
  }

  const document = new Document({
    creator: 'SelfAssessment.tech',
    title: data.title,
    description: 'SelfAssessment.tech result report',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 900,
              right: 900,
              bottom: 900,
              left: 900
            }
          }
        },
        children
      }
    ]
  });

  const blob = await Packer.toBlob(document);
  downloadBlob(`${assessment.id}-${run.id}.docx`, blob);
}
