import { ArrowLeft, CircleHelp, Download, FileText, History, ListChecks, Printer, RotateCcw, Share2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import type { AssessmentDefinition, AssessmentRun, Locale } from '../models';
import { resolveAssessment } from '../lib/assessment-resolver';
import { getRun } from '../lib/db';
import {
  downloadResultCsv,
  downloadResultHtml,
  downloadResultJson,
  downloadResultPdf,
  downloadResultWord
} from '../lib/export';
import { localized } from '../lib/localize';
import { calculateResults, maturityKey } from '../lib/scoring';
import { ActionPlanPanel } from '../components/ActionPlanPanel';
import { ShareRunDialog } from '../components/ShareRunDialog';

export function ResultsPage() {
  const { runId = '' } = useParams();
  const { t, i18n } = useTranslation();
  const locale: Locale = i18n.language.startsWith('en') ? 'en' : 'it';
  const [run, setRun] = useState<AssessmentRun>();
  const [assessment, setAssessment] = useState<AssessmentDefinition>();
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    void getRun(runId).then(async (savedRun) => {
      setRun(savedRun);
      if (savedRun) {
        setAssessment(await resolveAssessment(savedRun.assessmentId));
      }
    });
  }, [runId]);

  const result = useMemo(
    () =>
      assessment && run
        ? calculateResults(assessment, run, locale)
        : undefined,
    [assessment, run, locale]
  );

  if (!assessment || !run || !result) {
    return <div className="page loading-state">{t('common.loading')}</div>;
  }

  const chartData = result.areaScores.map((item) => ({
    area: item.area.replace(/^\d+\.\s*/, ''),
    score: item.score === null ? 0 : Number(item.score.toFixed(2))
  }));

  const unknownQuestions = result.scoredQuestions.filter(
    (item) => item.answer.value === 'unknown'
  );
  const unansweredQuestions = result.scoredQuestions.filter(
    (item) => item.answer.value === undefined
  );

  return (
    <div className="page results-page">
      <div className="page-toolbar">
        <Link
          className="button ghost"
          to={`/assessment/${assessment.id}/run/${run.id}`}
        >
          <ArrowLeft size={17} />
          {t('actions.back')}
        </Link>
        <div className="toolbar-actions">
          <button
            className="button secondary"
            type="button"
            onClick={() => setShareOpen(true)}
          >
            <Share2 size={17} />
            {t('actions.share')}
          </button>
          <Link
            className="button secondary"
            to={`/assessment/${assessment.id}/history`}
          >
            <History size={17} />
            {t('actions.history')}
          </Link>
          <Link className="button secondary" to={`/assessment/${assessment.id}`}>
            <RotateCcw size={17} />
            {t('actions.restart')}
          </Link>
        </div>
      </div>

      <section className="results-hero">
        <span className="hero-kicker">{t('results.title')}</span>
        <h1>{localized(assessment.title, locale)}</h1>
        <p>{t('results.subtitle')}</p>
        {run.context && (
          <div className="result-context">
            {run.context.organization && (
              <span>
                <small>{t('assessment.organization')}</small>
                <strong>{run.context.organization}</strong>
              </span>
            )}
            {run.context.sessionName && (
              <span>
                <small>{t('assessment.sessionName')}</small>
                <strong>{run.context.sessionName}</strong>
              </span>
            )}
            {run.context.participants && (
              <span>
                <small>{t('assessment.participants')}</small>
                <strong>{run.context.participants}</strong>
              </span>
            )}
            {run.context.facilitator && (
              <span>
                <small>{t('assessment.facilitator')}</small>
                <strong>{run.context.facilitator}</strong>
              </span>
            )}
          </div>
        )}
      </section>

      <div className="metric-grid">
        <article className="metric-card primary-metric">
          <span>{t('results.overall')}</span>
          <strong>
            {result.overallScore === null ? '—' : result.overallScore.toFixed(1)}
            <small>/ 5</small>
          </strong>
          <em>{t(maturityKey(result.overallScore))}</em>
        </article>
        <article className="metric-card">
          <span>{t('results.completion')}</span>
          <strong>{result.completionPercent}%</strong>
          <em>
            {result.answeredCount}/{result.totalCount}
          </em>
        </article>
        <article className="metric-card">
          <span>{t('results.unknown')}</span>
          <strong>{result.unknownCount}</strong>
          <em>knowledge / governance signal</em>
        </article>
      </div>

      {(unknownQuestions.length > 0 || unansweredQuestions.length > 0) && (
        <section className="results-panel">
          <div className="panel-heading">
            <div>
              <h2>{t('results.visibility')}</h2>
              <p>{t('results.visibilityHint')}</p>
            </div>
          </div>

          <div className="visibility-grid">
            <article className="visibility-card">
              <div className="visibility-card-heading">
                <CircleHelp size={20} />
                <div>
                  <strong>{t('results.unknownItems')}</strong>
                  <span>{unknownQuestions.length}</span>
                </div>
              </div>
              <p>{t('results.unknownItemsHint')}</p>
              {unknownQuestions.length > 0 ? (
                <div className="visibility-list">
                  {unknownQuestions.slice(0, 10).map((item) => (
                    <Link
                      key={item.question.id}
                      to={`/assessment/${assessment.id}/run/${run.id}?question=${encodeURIComponent(item.question.id)}`}
                    >
                      <span>{localized(item.question.area, locale)}</span>
                      <strong>{localized(item.question.question, locale)}</strong>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="visibility-empty">{t('results.none')}</div>
              )}
            </article>

            <article className="visibility-card">
              <div className="visibility-card-heading">
                <ListChecks size={20} />
                <div>
                  <strong>{t('results.unansweredItems')}</strong>
                  <span>{unansweredQuestions.length}</span>
                </div>
              </div>
              <p>{t('results.unansweredItemsHint')}</p>
              {unansweredQuestions.length > 0 ? (
                <div className="visibility-list">
                  {unansweredQuestions.slice(0, 10).map((item) => (
                    <Link
                      key={item.question.id}
                      to={`/assessment/${assessment.id}/run/${run.id}?question=${encodeURIComponent(item.question.id)}`}
                    >
                      <span>{localized(item.question.area, locale)}</span>
                      <strong>{localized(item.question.question, locale)}</strong>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="visibility-empty">{t('results.none')}</div>
              )}
            </article>
          </div>
        </section>
      )}

      <section className="results-panel">
        <div className="panel-heading">
          <h2>{t('results.byArea')}</h2>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={420}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 8, right: 20, bottom: 8, left: 28 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis type="category" dataKey="area" width={170} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="score" fill="var(--accent)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="results-panel">
        <div className="panel-heading">
          <h2>{t('results.gaps')}</h2>
          <span className="pill">{result.gaps.length}</span>
        </div>

        {result.gaps.length === 0 ? (
          <div className="empty-state">{t('results.noGaps')}</div>
        ) : (
          <div className="gap-list">
            {result.gaps.slice(0, 15).map((gap) => (
              <article className="gap-item" key={gap.question.id}>
                <div className="gap-score">
                  {gap.score?.toFixed(0) ?? '—'}
                  <small>/5</small>
                </div>
                <div>
                  <span>{localized(gap.question.area, locale)}</span>
                  <strong>{localized(gap.question.question, locale)}</strong>
                  <p>{gap.answer.notes || localized(gap.question.example, locale)}</p>
                </div>
                <span className="pill subtle">×{gap.question.weight}</span>
              </article>
            ))}
          </div>
        )}
      </section>

      <ActionPlanPanel
        assessment={assessment}
        run={run}
        result={result}
        locale={locale}
      />

      <ShareRunDialog
        assessment={assessment}
        run={run}
        locale={locale}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
      />

      <section className="export-panel">
        <div>
          <h2>{t('actions.download')}</h2>
          <p>{t('results.exportBody')}</p>
        </div>
        <div className="export-actions">
          <button
            className="button secondary"
            onClick={() => void downloadResultJson(assessment, run, locale)}
          >
            <Download size={17} />
            {t('actions.exportJson')}
          </button>
          <button
            className="button secondary"
            onClick={() => void downloadResultCsv(assessment, run, locale)}
          >
            <FileText size={17} />
            {t('actions.exportCsv')}
          </button>
          <button
            className="button secondary"
            onClick={() => void downloadResultHtml(assessment, run, locale)}
          >
            <FileText size={17} />
            {t('actions.exportHtml')}
          </button>
          <button
            className="button secondary"
            onClick={() => void downloadResultWord(assessment, run, locale)}
          >
            <FileText size={17} />
            {t('actions.exportWord')}
          </button>
          <button
            className="button secondary"
            onClick={() => void downloadResultPdf(assessment, run, locale)}
          >
            <FileText size={17} />
            {t('actions.exportPdf')}
          </button>
          <button className="button primary" onClick={() => window.print()}>
            <Printer size={17} />
            {t('actions.print')}
          </button>
        </div>
      </section>
    </div>
  );
}
