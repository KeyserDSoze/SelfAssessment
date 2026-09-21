import { CheckCircle2, ListTodo, Plus, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  ActionItem,
  ActionPriority,
  ActionStatus,
  AssessmentDefinition,
  AssessmentResult,
  AssessmentRun,
  Locale
} from '../models';
import {
  deleteActionItem,
  listActionItemsForRun,
  putActionItem
} from '../lib/db';
import { localized } from '../lib/localize';

interface Props {
  assessment: AssessmentDefinition;
  run: AssessmentRun;
  result: AssessmentResult;
  locale: Locale;
}

export function ActionPlanPanel({
  assessment,
  run,
  result,
  locale
}: Props) {
  const { t } = useTranslation();
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [manualTitle, setManualTitle] = useState('');

  const refresh = async () => {
    setActions(await listActionItemsForRun(run.id));
  };

  useEffect(() => {
    void refresh();
  }, [run.id]);

  const actionQuestionIds = useMemo(
    () => new Set(actions.map((action) => action.questionId).filter(Boolean)),
    [actions]
  );

  const suggested = useMemo(() => {
    const byId = new Map<string, (typeof result.scoredQuestions)[number]>();
    for (const item of [...result.gaps, ...result.scoredQuestions]) {
      if (!byId.has(item.question.id)) byId.set(item.question.id, item);
    }

    return [...byId.values()]
      .filter(
        (item) =>
          (item.score !== null && item.score <= 2) ||
          item.answer.value === 'unknown'
      )
      .filter((item) => !actionQuestionIds.has(item.question.id))
      .slice(0, 12);
  }, [result, actionQuestionIds]);

  const createFromQuestion = async (
    item: (typeof result.scoredQuestions)[number]
  ) => {
    const now = new Date().toISOString();
    const action: ActionItem = {
      id: crypto.randomUUID(),
      runId: run.id,
      questionId: item.question.id,
      title: localized(item.question.question, locale),
      description:
        item.answer.value === 'unknown'
          ? t('actionsPlan.defaultUnknownDescription', {
              evidence: localized(item.question.evidence, locale)
            })
          : t('actionsPlan.defaultGapDescription', {
              evidence: localized(item.question.evidence, locale)
            }),
      owner: item.question.owner,
      priority: item.question.weight >= 3 ? 'high' : 'medium',
      status: 'open',
      createdAt: now,
      updatedAt: now
    };
    await putActionItem(action);
    await refresh();
  };

  const createManual = async () => {
    const title = manualTitle.trim();
    if (!title) return;
    const now = new Date().toISOString();
    await putActionItem({
      id: crypto.randomUUID(),
      runId: run.id,
      title,
      priority: 'medium',
      status: 'open',
      createdAt: now,
      updatedAt: now
    });
    setManualTitle('');
    await refresh();
  };

  const updateAction = async (
    action: ActionItem,
    patch: Partial<ActionItem>
  ) => {
    await putActionItem({
      ...action,
      ...patch,
      updatedAt: new Date().toISOString()
    });
    await refresh();
  };

  const remove = async (id: string) => {
    await deleteActionItem(id);
    await refresh();
  };

  return (
    <section className="results-panel action-plan-panel">
      <div className="panel-heading">
        <div>
          <h2>{t('actionsPlan.title')}</h2>
          <p>{t('actionsPlan.subtitle')}</p>
        </div>
        <span className="pill">{actions.length}</span>
      </div>

      {suggested.length > 0 && (
        <div className="action-suggestions">
          <div className="action-subheading">
            <ListTodo size={18} />
            <div>
              <strong>{t('actionsPlan.suggestions')}</strong>
              <span>{t('actionsPlan.suggestionsHint')}</span>
            </div>
          </div>
          <div className="action-suggestion-list">
            {suggested.map((item) => (
              <article className="action-suggestion" key={item.question.id}>
                <div>
                  <span>{localized(item.question.area, locale)}</span>
                  <strong>{localized(item.question.question, locale)}</strong>
                  <small>{localized(item.question.evidence, locale)}</small>
                </div>
                <button
                  className="button secondary"
                  onClick={() => void createFromQuestion(item)}
                >
                  <Plus size={16} />
                  {t('actionsPlan.add')}
                </button>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="manual-action">
        <input
          value={manualTitle}
          placeholder={t('actionsPlan.manualPlaceholder')}
          onChange={(event) => setManualTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') void createManual();
          }}
        />
        <button className="button secondary" onClick={() => void createManual()}>
          <Plus size={16} />
          {t('actionsPlan.addManual')}
        </button>
      </div>

      {actions.length === 0 ? (
        <div className="empty-state">{t('actionsPlan.empty')}</div>
      ) : (
        <div className="action-list">
          {actions.map((action) => (
            <article className="action-item" key={action.id}>
              <div className="action-item-main">
                <div className="action-title-row">
                  <CheckCircle2
                    size={18}
                    className={action.status === 'done' ? 'done-icon' : ''}
                  />
                  <input
                    className="action-title-input"
                    value={action.title}
                    onChange={(event) =>
                      setActions((current) =>
                        current.map((item) =>
                          item.id === action.id
                            ? { ...item, title: event.target.value }
                            : item
                        )
                      )
                    }
                    onBlur={(event) =>
                      void updateAction(action, { title: event.target.value })
                    }
                  />
                </div>

                <textarea
                  className="action-description"
                  rows={2}
                  value={action.description ?? ''}
                  placeholder={t('actionsPlan.descriptionPlaceholder')}
                  onChange={(event) =>
                    setActions((current) =>
                      current.map((item) =>
                        item.id === action.id
                          ? { ...item, description: event.target.value }
                          : item
                      )
                    )
                  }
                  onBlur={(event) =>
                    void updateAction(action, {
                      description: event.target.value
                    })
                  }
                />

                <div className="action-fields">
                  <label>
                    <span>{t('actionsPlan.owner')}</span>
                    <input
                      value={action.owner ?? ''}
                      onChange={(event) =>
                        setActions((current) =>
                          current.map((item) =>
                            item.id === action.id
                              ? { ...item, owner: event.target.value }
                              : item
                          )
                        )
                      }
                      onBlur={(event) =>
                        void updateAction(action, { owner: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span>{t('actionsPlan.priority')}</span>
                    <select
                      value={action.priority}
                      onChange={(event) =>
                        void updateAction(action, {
                          priority: event.target.value as ActionPriority
                        })
                      }
                    >
                      <option value="high">{t('actionsPlan.priorityHigh')}</option>
                      <option value="medium">{t('actionsPlan.priorityMedium')}</option>
                      <option value="low">{t('actionsPlan.priorityLow')}</option>
                    </select>
                  </label>
                  <label>
                    <span>{t('actionsPlan.status')}</span>
                    <select
                      value={action.status}
                      onChange={(event) =>
                        void updateAction(action, {
                          status: event.target.value as ActionStatus
                        })
                      }
                    >
                      <option value="open">{t('actionsPlan.statusOpen')}</option>
                      <option value="in_progress">
                        {t('actionsPlan.statusInProgress')}
                      </option>
                      <option value="done">{t('actionsPlan.statusDone')}</option>
                    </select>
                  </label>
                  <label>
                    <span>{t('actionsPlan.targetDate')}</span>
                    <input
                      type="date"
                      value={action.targetDate ?? ''}
                      onChange={(event) =>
                        void updateAction(action, {
                          targetDate: event.target.value || undefined
                        })
                      }
                    />
                  </label>
                </div>

                <textarea
                  className="action-notes"
                  rows={2}
                  value={action.notes ?? ''}
                  placeholder={t('actionsPlan.notesPlaceholder')}
                  onChange={(event) =>
                    setActions((current) =>
                      current.map((item) =>
                        item.id === action.id
                          ? { ...item, notes: event.target.value }
                          : item
                      )
                    )
                  }
                  onBlur={(event) =>
                    void updateAction(action, { notes: event.target.value })
                  }
                />
              </div>

              <button
                className="icon-button compact danger-button"
                title={t('actions.delete')}
                aria-label={t('actions.delete')}
                onClick={() => void remove(action.id)}
              >
                <Trash2 size={16} />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
