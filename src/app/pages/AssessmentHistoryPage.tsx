import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  History,
  Minus,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import type { AssessmentDefinition, AssessmentRun, Locale } from '../models';
import { resolveAssessment } from '../lib/assessment-resolver';
import { listRuns } from '../lib/db';
import { buildAssessmentHistory } from '../lib/history';
import { localized } from '../lib/localize';
import { maturityKey } from '../lib/scoring';

function DeltaValue({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <span className="delta neutral">
        <Minus size={15} />
        —
      </span>
    );
  }

  const rounded = Number(value.toFixed(2));
  if (Math.abs(rounded) < 0.01) {
    return (
      <span className="delta neutral">
        <Minus size={15} />0
      </span>
    );
  }

  return (
    <span className={`delta ${rounded > 0 ? 'positive' : 'negative'}`}>
      {rounded > 0 ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
      {rounded > 0 ? '+' : ''}
      {rounded.toFixed(2)}
    </span>
  );
}

export function AssessmentHistoryPage() {
  const { id = '' } = useParams();
  const { t, i18n } = useTranslation();
  const locale: Locale = i18n.language.startsWith('en') ? 'en' : 'it';
  const [assessment, setAssessment] = useState<AssessmentDefinition>();
  const [runs, setRuns] = useState<AssessmentRun[]>([]);

  useEffect(() => {
    void Promise.all([resolveAssessment(id), listRuns()]).then(
      ([definition, savedRuns]) => {
        setAssessment(definition);
        setRuns(savedRuns);
      }
    );
  }, [id]);

  const summary = useMemo(
    () =>
      assessment
        ? buildAssessmentHistory(assessment, runs, locale)
        : undefined,
    [assessment, runs, locale]
  );

  if (!assessment || !summary) {
    return <div className="page loading-state">{t('common.loading')}</div>;
  }

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });

  const trendData = summary.points.map((point) => ({
    ...point,
    date: formatDate(point.updatedAt),
    score:
      point.score === null ? null : Number(point.score.toFixed(2))
  }));

  const newestFirst = [...summary.points].reverse();

  return (
    <div className="page history-page">
      <div className="page-toolbar">
        <Link className="button ghost" to={`/assessment/${assessment.id}`}>
          <ArrowLeft size={17} />
          {t('actions.back')}
        </Link>
        <span className="pill">
          <History size={14} />
          {t('history.kicker')}
        </span>
      </div>

      <section className="results-hero">
        <span className="hero-kicker">{t('history.kicker')}</span>
        <h1>{localized(assessment.title, locale)}</h1>
        <p>{t('history.subtitle')}</p>
      </section>

      {summary.points.length === 0 ? (
        <div className="empty-state history-empty">
          <History size={30} />
          <strong>{t('history.empty')}</strong>
          <p>{t('history.emptyBody')}</p>
          <Link className="button primary" to={`/assessment/${assessment.id}`}>
            {t('assessment.begin')}
          </Link>
        </div>
      ) : (
        <>
          <div className="history-metrics">
            <article className="metric-card primary-metric">
              <span>{t('history.latestScore')}</span>
              <strong>
                {summary.latest?.score === null ||
                summary.latest?.score === undefined
                  ? '—'
                  : summary.latest.score.toFixed(1)}
                <small>/ 5</small>
              </strong>
              <em>{t(maturityKey(summary.latest?.score ?? null))}</em>
            </article>

            <article className="metric-card">
              <span>{t('history.change')}</span>
              <strong className="metric-delta">
                <DeltaValue value={summary.overallDelta} />
              </strong>
              <em>{t('history.comparableHint')}</em>
            </article>

            <article className="metric-card">
              <span>{t('history.runs')}</span>
              <strong>{summary.points.length}</strong>
              <em>
                {summary.latest?.scope === 'all'
                  ? t('assessment.full')
                  : t('assessment.essential')}
              </em>
            </article>

            <article className="metric-card">
              <span>{t('results.unknown')}</span>
              <strong>{summary.latest?.unknownCount ?? 0}</strong>
              <em>{t('history.latestRun')}</em>
            </article>
          </div>

          <section className="results-panel">
            <div className="panel-heading">
              <div>
                <h2>{t('history.trend')}</h2>
                <p>{t('history.trendHint')}</p>
              </div>
            </div>
            <div className="chart-wrap history-chart">
              <ResponsiveContainer width="100%" height={360}>
                <LineChart
                  data={trendData}
                  margin={{ top: 8, right: 20, bottom: 8, left: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="results-panel">
            <div className="panel-heading">
              <div>
                <h2>{t('history.areaChange')}</h2>
                <p>{t('history.areaChangeHint')}</p>
              </div>
            </div>

            {!summary.previousComparable ? (
              <div className="empty-state">
                {t('history.noComparableRun')}
              </div>
            ) : (
              <div className="area-delta-list">
                {summary.areaDeltas.map((item) => (
                  <article className="area-delta-row" key={item.area}>
                    <div>
                      <strong>{item.area}</strong>
                      <span>
                        {item.previous === null
                          ? '—'
                          : item.previous.toFixed(1)}
                        {' → '}
                        {item.current === null ? '—' : item.current.toFixed(1)}
                      </span>
                    </div>
                    <DeltaValue value={item.delta} />
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="results-panel">
            <div className="panel-heading">
              <div>
                <h2>{t('history.allRuns')}</h2>
                <p>{t('history.allRunsHint')}</p>
              </div>
            </div>

            <div className="history-run-list">
              {newestFirst.map((point) => (
                <article className="history-run" key={point.runId}>
                  <div className="history-run-date">
                    <CalendarClock size={18} />
                    <span>
                      {new Date(point.updatedAt).toLocaleString(locale)}
                    </span>
                  </div>
                  <div className="history-run-metrics">
                    <span>
                      <strong>
                        {point.score === null ? '—' : point.score.toFixed(1)}
                      </strong>
                      /5
                    </span>
                    <span>
                      {point.completionPercent}% {t('results.completion')}
                    </span>
                    <span>
                      {point.scope === 'all'
                        ? t('assessment.full')
                        : t('assessment.essential')}
                    </span>
                  </div>
                  <Link
                    className="button secondary"
                    to={`/results/${point.runId}`}
                  >
                    {t('actions.results')}
                    <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
