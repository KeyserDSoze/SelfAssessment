import {
  ArchiveRestore,
  Database,
  DatabaseBackup,
  FileUp,
  HardDriveDownload,
  PencilRuler,
  ShieldCheck,
  Trash2
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AssessmentCard } from '../components/AssessmentCard';
import type { AssessmentDefinition, AssessmentRun, Locale } from '../models';
import { listAllAssessments } from '../lib/assessment-resolver';
import {
  deleteRun,
  listRuns,
  putImportedAssessment
} from '../lib/db';
import { parseAssessmentPackage } from '../lib/assessment-package';
import { localized } from '../lib/localize';
import {
  downloadWorkspaceBackup,
  restoreWorkspaceBackup
} from '../lib/workspace';

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
  const restoreRef = useRef<HTMLInputElement>(null);

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

  const onRestore = async (file?: File) => {
    if (!file) return;
    try {
      const content = JSON.parse(await file.text()) as unknown;
      const backup = await restoreWorkspaceBackup(content);
      setMessage(
        t('backup.restored', {
          runs: backup.runs.length,
          assessments: backup.assessments.length
        })
      );
      await refresh();
    } catch {
      setMessage(t('backup.invalid'));
    } finally {
      if (restoreRef.current) restoreRef.current.value = '';
    }
  };

  const onBackup = async () => {
    await downloadWorkspaceBackup();
    setMessage(t('backup.exported'));
  };

  const onDeleteRun = async (runId: string) => {
    if (!window.confirm(t('home.deleteRunConfirm'))) return;
    await deleteRun(runId);
    await refresh();
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
            <Link className="button primary" to="/builder">
              <PencilRuler size={18} />
              {t('actions.createAssessment')}
            </Link>

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

            <button className="button secondary" onClick={() => void onBackup()}>
              <DatabaseBackup size={18} />
              {t('actions.backupWorkspace')}
            </button>

            <button
              className="button secondary"
              onClick={() => restoreRef.current?.click()}
            >
              <ArchiveRestore size={18} />
              {t('actions.restoreWorkspace')}
            </button>
            <input
              ref={restoreRef}
              hidden
              type="file"
              accept=".json,application/json"
              onChange={(event) => void onRestore(event.target.files?.[0])}
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
                  <button
                    className="button ghost danger-button"
                    onClick={() => void onDeleteRun(run.id)}
                    title={t('actions.delete')}
                    aria-label={t('actions.delete')}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
