import { ArrowRight, Clock3, FileCheck2, Pencil } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { AssessmentDefinition, Locale } from '../models';
import { localized } from '../lib/localize';

interface Props {
  assessment: AssessmentDefinition;
  source: 'built-in' | 'imported';
}

export function AssessmentCard({ assessment, source }: Props) {
  const { t, i18n } = useTranslation();
  const locale: Locale = i18n.language.startsWith('en') ? 'en' : 'it';

  return (
    <article className="assessment-card">
      <div className="assessment-card-top">
        <span className="pill">
          {source === 'built-in' ? t('assessment.builtIn') : t('assessment.custom')}
        </span>
        <span className="version">
          {t('common.version')} {assessment.version}
        </span>
      </div>

      <div>
        <h3>{localized(assessment.title, locale)}</h3>
        <p>{localized(assessment.shortDescription, locale)}</p>
      </div>

      <div className="tag-row">
        {assessment.tags.slice(0, 4).map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="assessment-card-footer">
        <div className="meta-row">
          <span>
            <FileCheck2 size={16} />
            {assessment.questions.length} {t('assessment.questions')}
          </span>
          <span>
            <Clock3 size={16} />
            ~{assessment.estimatedMinutes} {t('assessment.minutes')}
          </span>
        </div>

        <div className="card-actions">
          {source === 'imported' && (
            <Link className="button ghost" to={`/builder/${assessment.id}`}>
              <Pencil size={16} />
              {t('actions.edit')}
            </Link>
          )}
          <Link className="button primary" to={`/assessment/${assessment.id}`}>
            {t('actions.start')}
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}
