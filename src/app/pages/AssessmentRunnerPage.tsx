import { ArrowLeft, ArrowRight, BarChart3, CloudOff } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard';
import type {
  AssessmentDefinition,
  AssessmentRun,
  QuestionAnswer
} from '../models';
import { resolveAssessment } from '../lib/assessment-resolver';
import { getRun, putRun } from '../lib/db';
import { questionsForRun } from '../lib/scoring';

export function AssessmentRunnerPage() {
  const { assessmentId = '', runId = '' } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const [assessment, setAssessment] = useState<AssessmentDefinition>();
  const [run, setRun] = useState<AssessmentRun>();
  const [index, setIndex] = useState(0);
  const appliedQuestionLink = useRef(false);
  const autoAdvanceInFlight = useRef(false);

  useEffect(() => {
    void Promise.all([resolveAssessment(assessmentId), getRun(runId)]).then(
      ([definition, savedRun]) => {
        setAssessment(definition);
        setRun(savedRun);
      }
    );
  }, [assessmentId, runId]);

  const questions = useMemo(
    () => (assessment && run ? questionsForRun(assessment, run) : []),
    [assessment, run]
  );

  useEffect(() => {
    if (appliedQuestionLink.current || questions.length === 0) return;
    appliedQuestionLink.current = true;

    const questionId = searchParams.get('question');
    if (!questionId) return;

    const linkedIndex = questions.findIndex((item) => item.id === questionId);
    if (linkedIndex >= 0) {
      setIndex(linkedIndex);
    }
  }, [questions, searchParams]);

  if (!assessment || !run || questions.length === 0) {
    return <div className="page loading-state">{t('common.loading')}</div>;
  }

  const question = questions[Math.min(index, questions.length - 1)];
  const answered = questions.filter(
    (item) => run.answers[item.id]?.value !== undefined
  ).length;
  const progress = Math.round((answered / questions.length) * 100);

  const goNext = async (sourceRun: AssessmentRun = run) => {
    if (index === questions.length - 1) {
      const completedRun: AssessmentRun = {
        ...sourceRun,
        updatedAt: new Date().toISOString(),
        completedAt: sourceRun.completedAt ?? new Date().toISOString()
      };
      setRun(completedRun);
      await putRun(completedRun);
      navigate(`/results/${sourceRun.id}`);
      return;
    }

    setIndex((value) => Math.min(questions.length - 1, value + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateAnswer = (answer: QuestionAnswer) => {
    const previousValue = run.answers[question.id]?.value;
    const next: AssessmentRun = {
      ...run,
      updatedAt: new Date().toISOString(),
      answers: {
        ...run.answers,
        [question.id]: answer
      }
    };

    setRun(next);

    const shouldAutoAdvance =
      Boolean(next.autoAdvance) &&
      answer.value !== undefined &&
      answer.value !== previousValue &&
      !autoAdvanceInFlight.current;

    if (!shouldAutoAdvance) {
      void putRun(next);
      return;
    }

    autoAdvanceInFlight.current = true;
    void (async () => {
      try {
        await putRun(next);
        await goNext(next);
      } finally {
        autoAdvanceInFlight.current = false;
      }
    })();
  };

  const setAutoAdvance = (enabled: boolean) => {
    const next: AssessmentRun = {
      ...run,
      autoAdvance: enabled,
      updatedAt: new Date().toISOString()
    };
    setRun(next);
    void putRun(next);
  };

  return (
    <div className="page runner-page">
      <div className="runner-top">
        <Link className="button ghost" to={`/assessment/${assessment.id}`}>
          <ArrowLeft size={17} />
          {t('actions.back')}
        </Link>
        <div className="runner-status">
          <span>
            <CloudOff size={15} />
            {t('runner.autosave')}
          </span>
          <strong>
            {index + 1} / {questions.length}
          </strong>
        </div>
      </div>

      <div className="progress-shell">
        <div className="progress-meta">
          <span>{t('runner.progress')}</span>
          <strong>{progress}%</strong>
        </div>
        <div className="progress-track">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <section className="question-map-shell" aria-label={t('runner.questionMap')}>
        <div className="question-map-heading">
          <strong>{t('runner.questionMap')}</strong>
          <div className="question-map-legend">
            <span><i className="legend-dot answered" />{t('runner.statusAnswered')}</span>
            <span><i className="legend-dot unknown" />{t('runner.statusUnknown')}</span>
            <span><i className="legend-dot unanswered" />{t('runner.statusUnanswered')}</span>
          </div>
        </div>
        <div className="question-map">
          {questions.map((item, itemIndex) => {
            const value = run.answers[item.id]?.value;
            const status =
              value === 'unknown'
                ? 'unknown'
                : value === undefined
                  ? 'unanswered'
                  : 'answered';

            return (
              <button
                key={item.id}
                type="button"
                className={`question-map-button ${status} ${itemIndex === index ? 'current' : ''}`}
                onClick={() => {
                  setIndex(itemIndex);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                title={`${t('runner.jumpTo')} ${itemIndex + 1} · ${t(`runner.status${status[0].toUpperCase()}${status.slice(1)}`)}`}
                aria-current={itemIndex === index ? 'step' : undefined}
              >
                {itemIndex + 1}
              </button>
            );
          })}
        </div>
      </section>

      <QuestionCard
        runId={run.id}
        question={question}
        answer={run.answers[question.id] ?? {}}
        onChange={updateAnswer}
      />

      <div className="runner-nav">
        <button
          className="button secondary"
          disabled={index === 0}
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
        >
          <ArrowLeft size={17} />
          {t('actions.previous')}
        </button>

        <div className="runner-nav-actions">
          <label
            className={`auto-advance-toggle ${run.autoAdvance ? 'active' : ''}`}
            title={t('runner.autoAdvanceHint')}
          >
            <input
              type="checkbox"
              checked={Boolean(run.autoAdvance)}
              onChange={(event) => setAutoAdvance(event.target.checked)}
            />
            <span>{t('runner.autoAdvance')}</span>
          </label>

          <button className="button primary" onClick={() => void goNext()}>
            {index === questions.length - 1 ? (
              <>
                <BarChart3 size={17} />
                {t('actions.results')}
              </>
            ) : (
              <>
                {t('actions.next')}
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
