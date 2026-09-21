import { ArrowLeft, Download, History, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type {
  AssessmentDefinition,
  AssessmentRun,
  Locale,
  RunScope
} from '../models';
import { resolveAssessment } from '../lib/assessment-resolver';
import { downloadAssessment } from '../lib/export';
import { localized } from '../lib/localize';
import { putRun } from '../lib/db';

export function AssessmentIntroPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const locale: Locale = i18n.language.startsWith('en') ? 'en' : 'it';
  const [assessment, setAssessment] = useState<AssessmentDefinition>();
  const [scope, setScope] = useState<RunScope>('essential');
  const [organization, setOrganization] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [participants, setParticipants] = useState('');
  const [facilitator, setFacilitator] = useState('');

  useEffect(() => {
    void resolveAssessment(id).then(setAssessment);
  }, [id]);

  if (!assessment) {
    return <div className="page loading-state">{t('common.loading')}</div>;
  }

  const start = async () => {
    const now = new Date().toISOString();
    const run: AssessmentRun = {
      id: crypto.randomUUID(),
      assessmentId: assessment.id,
      assessmentVersion: assessment.version,
      scope,
      locale,
      startedAt: now,
      updatedAt: now,
      context:
        organization.trim() ||
        sessionName.trim() ||
        participants.trim() ||
        facilitator.trim()
          ? {
              organization: organization.trim() || undefined,
              sessionName: sessionName.trim() || undefined,
              participants: participants.trim() || undefined,
              facilitator: facilitator.trim() || undefined
            }
          : undefined,
      answers: {}
    };
    await putRun(run);
    navigate(`/assessment/${assessment.id}/run/${run.id}`);
  };

  return (
    <div className="page intro-page">
      <div className="page-toolbar">
        <Link className="button ghost" to="/">
          <ArrowLeft size={17} />
          {t('actions.back')}
        </Link>
        <div className="toolbar-actions">
          <Link
            className="button secondary"
            to={`/assessment/${assessment.id}/history`}
          >
            <History size={17} />
            {t('actions.history')}
          </Link>
          <button
            className="button secondary"
            onClick={() => downloadAssessment(assessment)}
          >
            <Download size={17} />
            {t('actions.downloadAssessment')}
          </button>
        </div>
      </div>

      <section className="intro-hero">
        <span className="hero-kicker">{t('assessment.introTitle')}</span>
        <h1>{localized(assessment.title, locale)}</h1>
        <p>{localized(assessment.longDescription, locale)}</p>
      </section>

      <div className="intro-sections">
        {assessment.intro.map((section, index) => (
          <article className="intro-section" key={section.id}>
            <span className="intro-index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              {section.eyebrow && (
                <span className="section-kicker">
                  {localized(section.eyebrow, locale)}
                </span>
              )}
              <h2>{localized(section.title, locale)}</h2>
              <p>{localized(section.body, locale)}</p>
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet.it}>{localized(bullet, locale)}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>

      <section className="scope-panel">
        <div>
          <span className="section-kicker">
            <Sparkles size={15} /> {t('assessment.chooseScope')}
          </span>
          <h2>{t('assessment.chooseScope')}</h2>
        </div>

        <div className="session-context">
          <div className="session-context-heading">
            <h3>{t('assessment.sessionContext')}</h3>
            <p>{t('assessment.sessionContextHint')}</p>
          </div>
          <div className="session-context-grid">
            <label>
              <span>{t('assessment.organization')}</span>
              <input
                value={organization}
                placeholder={t('assessment.organizationPlaceholder')}
                onChange={(event) => setOrganization(event.target.value)}
              />
            </label>
            <label>
              <span>{t('assessment.sessionName')}</span>
              <input
                value={sessionName}
                placeholder={t('assessment.sessionNamePlaceholder')}
                onChange={(event) => setSessionName(event.target.value)}
              />
            </label>
            <label>
              <span>{t('assessment.participants')}</span>
              <input
                value={participants}
                placeholder={t('assessment.participantsPlaceholder')}
                onChange={(event) => setParticipants(event.target.value)}
              />
            </label>
            <label>
              <span>{t('assessment.facilitator')}</span>
              <input
                value={facilitator}
                placeholder={t('assessment.facilitatorPlaceholder')}
                onChange={(event) => setFacilitator(event.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="scope-grid">
          <button
            className={`scope-card ${scope === 'essential' ? 'active' : ''}`}
            onClick={() => setScope('essential')}
          >
            <strong>{t('assessment.essential')}</strong>
            <span>{t('assessment.essentialBody')}</span>
            <small>
              {
                assessment.questions.filter((question) => question.track === 'essential')
                  .length
              }{' '}
              {t('assessment.questions')}
            </small>
          </button>

          <button
            className={`scope-card ${scope === 'all' ? 'active' : ''}`}
            onClick={() => setScope('all')}
          >
            <strong>{t('assessment.full')}</strong>
            <span>{t('assessment.fullBody')}</span>
            <small>
              {assessment.questions.length} {t('assessment.questions')}
            </small>
          </button>
        </div>

        <button className="button primary large" onClick={() => void start()}>
          {t('assessment.begin')}
        </button>
      </section>
    </div>
  );
}
