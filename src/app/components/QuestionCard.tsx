import { Database, Lightbulb, SearchCheck, UserRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type {
  AnswerValue,
  AssessmentQuestion,
  Locale,
  QuestionAnswer
} from '../models';
import { localized } from '../lib/localize';
import { EvidenceAttachments } from './EvidenceAttachments';

interface Props {
  runId: string;
  question: AssessmentQuestion;
  answer: QuestionAnswer;
  onChange: (answer: QuestionAnswer) => void;
}

export function QuestionCard({ runId, question, answer, onChange }: Props) {
  const { t, i18n } = useTranslation();
  const locale: Locale = i18n.language.startsWith('en') ? 'en' : 'it';

  const setValue = (value: AnswerValue) =>
    onChange({ ...answer, value });

  return (
    <section className="question-card">
      <div className="question-heading">
        <div>
          <div className="question-kicker">
            <span className="pill subtle">
              {question.track === 'essential'
                ? t('common.essential')
                : t('common.advanced')}
            </span>
            <span>{localized(question.area, locale)}</span>
          </div>
          <h2>{localized(question.question, locale)}</h2>
        </div>
        <span className="question-weight">×{question.weight}</span>
      </div>

      <div className="context-grid">
        <div className="context-card">
          <Lightbulb size={18} />
          <div>
            <strong>{t('runner.example')}</strong>
            <p>{localized(question.example, locale)}</p>
          </div>
        </div>
        <div className="context-card">
          <SearchCheck size={18} />
          <div>
            <strong>{t('runner.evidence')}</strong>
            <p>{localized(question.evidence, locale)}</p>
          </div>
        </div>
        <div className="context-card compact-card">
          <Database size={18} />
          <div>
            <strong>{t('runner.microsoft')}</strong>
            <p>{question.microsoft}</p>
          </div>
        </div>
        <div className="context-card compact-card">
          <UserRound size={18} />
          <div>
            <strong>{t('runner.owner')}</strong>
            <p>{question.owner}</p>
          </div>
        </div>
      </div>

      <div className="answer-panel">
        {question.responseType === 'scale' ? (
          <>
            <div className="scale-grid" role="radiogroup">
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`score-button ${answer.value === value ? 'active' : ''}`}
                  onClick={() => setValue(value)}
                  type="button"
                  aria-pressed={answer.value === value}
                >
                  {value}
                </button>
              ))}
              <button
                className={`score-button text ${answer.value === 'na' ? 'active' : ''}`}
                onClick={() => setValue('na')}
                type="button"
                aria-pressed={answer.value === 'na'}
              >
                {t('response.na')}
              </button>
            </div>
            <p className="help-text">{t('runner.scaleHelp')}</p>
          </>
        ) : (
          <>
            <div className="binary-grid" role="radiogroup">
              {(['yes', 'no', 'unknown', 'na'] as const).map((value) => (
                <button
                  key={value}
                  className={`choice-button ${answer.value === value ? 'active' : ''}`}
                  onClick={() => setValue(value)}
                  type="button"
                  aria-pressed={answer.value === value}
                >
                  {t(`response.${value}`)}
                </button>
              ))}
            </div>
            <p className="help-text">{t('runner.binaryHelp')}</p>
          </>
        )}

        <label className="notes-field">
          <span>{t('runner.notes')}</span>
          <textarea
            value={answer.notes ?? ''}
            onChange={(event) =>
              onChange({ ...answer, notes: event.target.value })
            }
            placeholder={t('runner.notesPlaceholder')}
            rows={4}
          />
        </label>

        <EvidenceAttachments runId={runId} questionId={question.id} />
      </div>
    </section>
  );
}
