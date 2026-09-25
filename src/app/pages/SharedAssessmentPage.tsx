import { AlertTriangle, ArrowRight, Link2, ShieldCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import type {
  AssessmentDefinition,
  AssessmentRun,
  Locale,
  RunScope
} from '../models';
import { resolveAssessment } from '../lib/assessment-resolver';
import { putRun } from '../lib/db';
import { localized } from '../lib/localize';
import {
  decodeSharedAnswers,
  SHARE_SCHEMA_VERSION,
  shareTokenToScope
} from '../lib/share';

interface SharedPreview {
  scope: RunScope;
  answeredCount: number;
  totalCount: number;
  complete: boolean;
  firstUnansweredId?: string;
  answers: AssessmentRun['answers'];
}

export function SharedAssessmentPage() {
  const { assessmentId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const locale: Locale = i18n.language.startsWith('en') ? 'en' : 'it';
  const [assessment, setAssessment] = useState<AssessmentDefinition>();
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [resolutionError, setResolutionError] = useState('');

  const shareVersion = searchParams.get('sv');
  const assessmentVersion = searchParams.get('v');
  const scope = shareTokenToScope(searchParams.get('s'));
  const payload = searchParams.get('a');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    void resolveAssessment(assessmentId).then((definition) => {
      if (cancelled) return;
      if (!definition) {
        setResolutionError(t('share.assessmentUnavailable'));
      } else {
        setAssessment(definition);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [assessmentId, t]);

  const preview = useMemo<SharedPreview | undefined>(() => {
    if (
      !assessment ||
      shareVersion !== SHARE_SCHEMA_VERSION ||
      !assessmentVersion ||
      !scope ||
      payload === null
    ) {
      return undefined;
    }

    if (assessment.version !== assessmentVersion) return undefined;

    try {
      return {
        scope,
        ...decodeSharedAnswers(assessment, scope, payload)
      };
    } catch {
      return undefined;
    }
  }, [
    assessment,
    assessmentVersion,
    payload,
    scope,
    shareVersion
  ]);

  const error = useMemo(() => {
    if (resolutionError) return resolutionError;
    if (loading) return '';
    if (!assessment) return t('share.assessmentUnavailable');
    if (
      shareVersion !== SHARE_SCHEMA_VERSION ||
      !assessmentVersion ||
      !scope ||
      payload === null
    ) {
      return t('share.invalid');
    }
    if (assessment.version !== assessmentVersion) {
      return t('share.versionMismatch', {
        shared: assessmentVersion,
        current: assessment.version
      });
    }
    if (!preview) return t('share.invalid');
    return '';
  }, [
    assessment,
    assessmentVersion,
    loading,
    payload,
    preview,
    resolutionError,
    scope,
    shareVersion,
    t
  ]);

  const importSharedRun = async () => {
    if (!assessment || !preview) return;

    setImporting(true);
    const now = new Date().toISOString();
    const run: AssessmentRun = {
      id: crypto.randomUUID(),
      assessmentId: assessment.id,
      assessmentVersion: assessment.version,
      scope: preview.scope,
      locale,
      startedAt: now,
      updatedAt: now,
      completedAt: preview.complete ? now : undefined,
      answers: preview.answers
    };

    await putRun(run);

    if (preview.complete) {
      navigate(`/results/${run.id}`);
      return;
    }

    const questionQuery = preview.firstUnansweredId
      ? `?question=${encodeURIComponent(preview.firstUnansweredId)}`
      : '';
    navigate(
      `/assessment/${assessment.id}/run/${run.id}${questionQuery}`
    );
  };

  if (loading) {
    return <div className="page loading-state">{t('common.loading')}</div>;
  }

  return (
    <div className="page shared-assessment-page">
      <section className="shared-hero">
        <div className="shared-hero-icon">
          <Link2 size={24} />
        </div>
        <span>{t('share.receivedKicker')}</span>
        <h1>
          {assessment
            ? localized(assessment.title, locale)
            : t('share.receivedTitle')}
        </h1>
        <p>{t('share.receivedSubtitle')}</p>
      </section>

      {error ? (
        <section className="shared-error-card">
          <AlertTriangle size={22} />
          <div>
            <strong>{t('share.cannotOpen')}</strong>
            <p>{error}</p>
          </div>
          <Link className="button secondary" to="/">
            {t('nav.home')}
          </Link>
        </section>
      ) : (
        assessment &&
        preview && (
          <>
            <section className="shared-preview-card">
              <div className="shared-preview-heading">
                <div>
                  <span>{t('share.preview')}</span>
                  <h2>{t('share.previewTitle')}</h2>
                </div>
                <ShieldCheck size={26} />
              </div>

              <div className="shared-preview-metrics">
                <span>
                  <small>{t('share.scope')}</small>
                  <strong>
                    {preview.scope === 'essential'
                      ? t('assessment.essential')
                      : t('assessment.full')}
                  </strong>
                </span>
                <span>
                  <small>{t('share.answers')}</small>
                  <strong>
                    {preview.answeredCount}/{preview.totalCount}
                  </strong>
                </span>
                <span>
                  <small>{t('common.version')}</small>
                  <strong>{assessment.version}</strong>
                </span>
              </div>

              <div className="shared-import-note">
                <strong>
                  {preview.complete
                    ? t('share.completeTitle')
                    : t('share.partialTitle')}
                </strong>
                <p>
                  {preview.complete
                    ? t('share.completeHint')
                    : t('share.partialHint')}
                </p>
              </div>

              <button
                className="button primary large"
                type="button"
                disabled={importing}
                onClick={() => void importSharedRun()}
              >
                {t('share.import')}
                <ArrowRight size={18} />
              </button>
            </section>

            <section className="share-privacy-note shared-privacy">
              <strong>{t('share.privacyTitle')}</strong>
              <p>{t('share.privacyBody')}</p>
            </section>
          </>
        )
      )}
    </div>
  );
}
