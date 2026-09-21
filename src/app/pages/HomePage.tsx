import { Database, FileUp, HardDriveDownload, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AssessmentCard } from '../components/AssessmentCard';
import type { AssessmentDefinition, AssessmentRun, Locale } from '../models';
import { listAllAssessments } from '../lib/assessment-resolver';
import { listRuns, putImportedAssessment } from '../lib/db';
import { parseAssessmentPackage } from '../lib/assessment-package';
import { localized } from '../lib/localize';

interface CatalogItem {
  assessment: AssessmentDefinition;
  source: 'built-in' | 'imported';
}

export function HomePage() {
  const { t, i18n } = useTranslation();
  const locale: Locale = i18n.language.startsWith('en') ? 'en' : 'it';
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [runs, setRuns] = useState<AssessmentRun[]>([]);
  const [message, setMessage] = useState('');
  const importRef = useRef<HTMLInputElement>(null);

  const refresh = async () => {
    const [items, recentRuns] = await Promise.all([
      listAllAssessments(),
      listRuns()
    ]);
    setCatalog(items);
    setRuns(recentRuns.slice(0, 6));
  };

  useEffect(() => {
    void refresh();
  }, []);

  const onImport = async (file?: File) => {
    if (!file) return;
    try {
      const content = JSON.parse(await file.text()) as unknown;
      const assessment = parseAssessmentPackage(content);
      await putImportedAssessment(assessment);
      setMessage(t('import.success'));
      await refresh();
    } catch {
      setMessage(t('import.invalid'));
    } finally {
      if (importRef.current) importRef.current.value = '';
    }
  };

  const assessmentName = (id: string) => {
    const found = catalog.find((item) => item.assessment.id === id);
    return found ? localized(found.assessment.title, locale) : id;
  };

  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker">{t('home.kicker')}</span>
          <h1>{t('home.title')}</h1>
          <p>{t('home.subtitle')}</p>
          <div className="hero-actions">
            <button
              className="button secondary"
              onClick={() => importRef.current?.click()}
            >
              <FileUp size={18} />
              {t('actions.importAssessment')}
            </button>
            <input
              ref={importRef}
              hidden
              type="file"
              accept=".json,.assessment.json,application/json"
              onChange={(event) => void onImport(event.target.files?.[0])}
            />
            {message && <span className="inline-message">{message}</span>}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-shield">
            <ShieldCheck size={64} />
          </div>
          <div className="hero-node node-a">
            <Database size={20} />
          </div>
          <div className="hero-node node-b">
            <HardDriveDownload size={20} />
          </div>
        </div>
      </section>

      <section className="info-strip">
        <ShieldCheck size={20} />
        <div>
          <strong>{t('home.local')}</strong>
          <span>{t('home.localBody')}</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="section-kicker">{t('home.catalogKicker')}</span>
            <h2>{t('home.catalog')}</h2>
          </div>
          <p>{t('home.catalogHint')}</p>
        </div>
        <div className="assessment-grid">
          {catalog.map((item) => (
            <AssessmentCard
              assessment={item.assessment}
              source={item.source}
              key={item.assessment.id}
            />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading compact-heading">
          <div>
            <span className="section-kicker">IndexedDB</span>
            <h2>{t('home.recent')}</h2>
          </div>
        </div>

        {runs.length === 0 ? (
          <div className="empty-state">{t('home.noRecent')}</div>
        ) : (
          <div className="recent-list">
            {runs.map((run) => (
              <article className="recent-run" key={run.id}>
                <div>
                  <strong>{assessmentName(run.assessmentId)}</strong>
                  <span>
                    {new Date(run.updatedAt).toLocaleString(locale)}
                  </span>
                </div>
                <div className="recent-actions">
                  <Link
                    className="button ghost"
                    to={`/assessment/${run.assessmentId}/run/${run.id}`}
                  >
                    {t('actions.resume')}
                  </Link>
                  <Link className="button secondary" to={`/results/${run.id}`}>
                    {t('actions.results')}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
