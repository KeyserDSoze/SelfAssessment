import {
  ArrowLeft,
  Download,
  Plus,
  Save,
  Sparkles,
  Trash2
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type {
  AssessmentDefinition,
  AssessmentQuestion,
  IntroSection
} from '../models';
import {
  deleteImportedAssessment,
  getImportedAssessment,
  putImportedAssessment
} from '../lib/db';
import { downloadAssessment } from '../lib/export';

const emptyIntro = (): IntroSection => ({
  id: crypto.randomUUID(),
  eyebrow: { it: '', en: '' },
  title: { it: '', en: '' },
  body: { it: '', en: '' },
  bullets: []
});

const emptyQuestion = (): AssessmentQuestion => ({
  id: crypto.randomUUID(),
  area: { it: '', en: '' },
  track: 'essential',
  question: { it: '', en: '' },
  example: { it: '', en: '' },
  evidence: { it: '', en: '' },
  microsoft: '',
  responseType: 'scale',
  owner: '',
  weight: 3
});

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function AssessmentBuilderPage() {
  const { id: editId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [titleIt, setTitleIt] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [id, setId] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [shortIt, setShortIt] = useState('');
  const [shortEn, setShortEn] = useState('');
  const [longIt, setLongIt] = useState('');
  const [longEn, setLongEn] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [tags, setTags] = useState('');
  const [intro, setIntro] = useState<IntroSection[]>([emptyIntro()]);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([
    emptyQuestion()
  ]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!editId) return;

    void getImportedAssessment(editId).then((stored) => {
      if (!stored) {
        setError(t('builder.editMissing'));
        return;
      }

      const current = stored.definition;
      setTitleIt(current.title.it);
      setTitleEn(current.title.en);
      setId(current.id);
      setVersion(current.version);
      setShortIt(current.shortDescription.it);
      setShortEn(current.shortDescription.en);
      setLongIt(current.longDescription.it);
      setLongEn(current.longDescription.en);
      setEstimatedMinutes(current.estimatedMinutes);
      setTags(current.tags.join(', '));
      setIntro(current.intro);
      setQuestions(current.questions);
      setMessage(t('builder.editLoaded'));
    });
  }, [editId]);

  const resolvedId = useMemo(
    () => slugify(id || titleEn || titleIt),
    [id, titleEn, titleIt]
  );

  const definition = (): AssessmentDefinition => ({
    id: resolvedId,
    version: version.trim() || '1.0.0',
    title: { it: titleIt.trim(), en: titleEn.trim() },
    shortDescription: { it: shortIt.trim(), en: shortEn.trim() },
    longDescription: { it: longIt.trim(), en: longEn.trim() },
    estimatedMinutes: Math.max(1, estimatedMinutes || 1),
    tags: tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    accent: '#136de2',
    intro,
    questions
  });

  const validate = (): AssessmentDefinition | undefined => {
    setError('');
    setMessage('');

    if (!resolvedId || !titleIt.trim() || !titleEn.trim()) {
      setError(t('builder.errorMetadata'));
      return;
    }

    if (
      !shortIt.trim() ||
      !shortEn.trim() ||
      !longIt.trim() ||
      !longEn.trim()
    ) {
      setError(t('builder.errorDescriptions'));
      return;
    }

    if (
      intro.length === 0 ||
      intro.some(
        (section) =>
          !section.title.it.trim() ||
          !section.title.en.trim() ||
          !section.body.it.trim() ||
          !section.body.en.trim()
      )
    ) {
      setError(t('builder.errorIntro'));
      return;
    }

    if (
      questions.length === 0 ||
      questions.some(
        (question) =>
          !question.area.it.trim() ||
          !question.area.en.trim() ||
          !question.question.it.trim() ||
          !question.question.en.trim() ||
          !question.example.it.trim() ||
          !question.example.en.trim() ||
          !question.evidence.it.trim() ||
          !question.evidence.en.trim()
      )
    ) {
      setError(t('builder.errorQuestions'));
      return;
    }

    return definition();
  };

  const save = async () => {
    const assessment = validate();
    if (!assessment) return;

    await putImportedAssessment(assessment);
    setMessage(t('builder.saved'));
  };

  const saveAndOpen = async () => {
    const assessment = validate();
    if (!assessment) return;

    await putImportedAssessment(assessment);
    navigate(`/assessment/${assessment.id}`);
  };

  const download = () => {
    const assessment = validate();
    if (!assessment) return;
    downloadAssessment(assessment);
    setMessage(t('builder.downloaded'));
  };

  const removeImportedAssessment = async () => {
    if (!editId) return;
    if (!window.confirm(t('builder.deleteConfirm'))) return;

    await deleteImportedAssessment(editId);
    navigate('/');
  };

  const updateIntro = (
    index: number,
    updater: (current: IntroSection) => IntroSection
  ) => {
    setIntro((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? updater(item) : item
      )
    );
  };

  const updateQuestion = (
    index: number,
    updater: (current: AssessmentQuestion) => AssessmentQuestion
  ) => {
    setQuestions((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? updater(item) : item
      )
    );
  };

  return (
    <div className="page builder-page">
      <div className="page-toolbar">
        <Link className="button ghost" to="/">
          <ArrowLeft size={17} />
          {t('actions.back')}
        </Link>
        <span className="pill">
          <Sparkles size={14} />
          {t('builder.kicker')}
        </span>
      </div>

      <section className="builder-hero">
        <span className="hero-kicker">{t('builder.kicker')}</span>
        <h1>{editId ? t('builder.editTitle') : t('builder.title')}</h1>
        <p>{editId ? t('builder.editSubtitle') : t('builder.subtitle')}</p>
      </section>

      <section className="builder-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">01</span>
            <h2>{t('builder.metadata')}</h2>
          </div>
        </div>

        <div className="form-grid">
          <label>
            <span>{t('builder.titleIt')}</span>
            <input
              value={titleIt}
              onChange={(event) => setTitleIt(event.target.value)}
            />
          </label>
          <label>
            <span>{t('builder.titleEn')}</span>
            <input
              value={titleEn}
              onChange={(event) => setTitleEn(event.target.value)}
            />
          </label>
          <label>
            <span>{t('builder.id')}</span>
            <input
              value={id}
              placeholder={resolvedId || 'security-assessment'}
              onChange={(event) => setId(event.target.value)}
            />
            <small>
              {t('builder.resolvedId')}: {resolvedId || '—'}
            </small>
          </label>
          <label>
            <span>{t('common.version')}</span>
            <input
              value={version}
              onChange={(event) => setVersion(event.target.value)}
            />
          </label>
          <label>
            <span>{t('builder.minutes')}</span>
            <input
              type="number"
              min={1}
              value={estimatedMinutes}
              onChange={(event) =>
                setEstimatedMinutes(Number(event.target.value))
              }
            />
          </label>
          <label>
            <span>{t('builder.tags')}</span>
            <input
              value={tags}
              placeholder="Purview, Security, Governance"
              onChange={(event) => setTags(event.target.value)}
            />
          </label>
          <label className="full-span">
            <span>{t('builder.shortIt')}</span>
            <textarea
              rows={2}
              value={shortIt}
              onChange={(event) => setShortIt(event.target.value)}
            />
          </label>
          <label className="full-span">
            <span>{t('builder.shortEn')}</span>
            <textarea
              rows={2}
              value={shortEn}
              onChange={(event) => setShortEn(event.target.value)}
            />
          </label>
          <label className="full-span">
            <span>{t('builder.longIt')}</span>
            <textarea
              rows={4}
              value={longIt}
              onChange={(event) => setLongIt(event.target.value)}
            />
          </label>
          <label className="full-span">
            <span>{t('builder.longEn')}</span>
            <textarea
              rows={4}
              value={longEn}
              onChange={(event) => setLongEn(event.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="builder-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">02</span>
            <h2>{t('builder.intro')}</h2>
            <p>{t('builder.introHint')}</p>
          </div>
          <button
            className="button secondary"
            onClick={() => setIntro((current) => [...current, emptyIntro()])}
          >
            <Plus size={17} />
            {t('builder.addSection')}
          </button>
        </div>

        <div className="builder-stack">
          {intro.map((section, index) => (
            <article className="editable-card" key={section.id}>
              <div className="editable-card-heading">
                <strong>
                  {t('builder.section')} {index + 1}
                </strong>
                {intro.length > 1 && (
                  <button
                    className="button ghost danger-button"
                    onClick={() =>
                      setIntro((current) =>
                        current.filter((_, itemIndex) => itemIndex !== index)
                      )
                    }
                  >
                    <Trash2 size={16} />
                    {t('actions.delete')}
                  </button>
                )}
              </div>

              <div className="form-grid">
                <label>
                  <span>{t('builder.eyebrowIt')}</span>
                  <input
                    value={section.eyebrow?.it ?? ''}
                    onChange={(event) =>
                      updateIntro(index, (item) => ({
                        ...item,
                        eyebrow: {
                          it: event.target.value,
                          en: item.eyebrow?.en ?? ''
                        }
                      }))
                    }
                  />
                </label>
                <label>
                  <span>{t('builder.eyebrowEn')}</span>
                  <input
                    value={section.eyebrow?.en ?? ''}
                    onChange={(event) =>
                      updateIntro(index, (item) => ({
                        ...item,
                        eyebrow: {
                          it: item.eyebrow?.it ?? '',
                          en: event.target.value
                        }
                      }))
                    }
                  />
                </label>
                <label>
                  <span>{t('builder.titleIt')}</span>
                  <input
                    value={section.title.it}
                    onChange={(event) =>
                      updateIntro(index, (item) => ({
                        ...item,
                        title: { ...item.title, it: event.target.value }
                      }))
                    }
                  />
                </label>
                <label>
                  <span>{t('builder.titleEn')}</span>
                  <input
                    value={section.title.en}
                    onChange={(event) =>
                      updateIntro(index, (item) => ({
                        ...item,
                        title: { ...item.title, en: event.target.value }
                      }))
                    }
                  />
                </label>
                <label className="full-span">
                  <span>{t('builder.bodyIt')}</span>
                  <textarea
                    rows={4}
                    value={section.body.it}
                    onChange={(event) =>
                      updateIntro(index, (item) => ({
                        ...item,
                        body: { ...item.body, it: event.target.value }
                      }))
                    }
                  />
                </label>
                <label className="full-span">
                  <span>{t('builder.bodyEn')}</span>
                  <textarea
                    rows={4}
                    value={section.body.en}
                    onChange={(event) =>
                      updateIntro(index, (item) => ({
                        ...item,
                        body: { ...item.body, en: event.target.value }
                      }))
                    }
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="builder-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">03</span>
            <h2>{t('builder.questions')}</h2>
            <p>{t('builder.questionsHint')}</p>
          </div>
          <button
            className="button secondary"
            onClick={() =>
              setQuestions((current) => [...current, emptyQuestion()])
            }
          >
            <Plus size={17} />
            {t('builder.addQuestion')}
          </button>
        </div>

        <div className="builder-stack">
          {questions.map((question, index) => (
            <article className="editable-card" key={question.id}>
              <div className="editable-card-heading">
                <strong>
                  {t('builder.question')} {index + 1}
                </strong>
                {questions.length > 1 && (
                  <button
                    className="button ghost danger-button"
                    onClick={() =>
                      setQuestions((current) =>
                        current.filter((_, itemIndex) => itemIndex !== index)
                      )
                    }
                  >
                    <Trash2 size={16} />
                    {t('actions.delete')}
                  </button>
                )}
              </div>

              <div className="form-grid">
                <label>
                  <span>{t('builder.areaIt')}</span>
                  <input
                    value={question.area.it}
                    onChange={(event) =>
                      updateQuestion(index, (item) => ({
                        ...item,
                        area: { ...item.area, it: event.target.value }
                      }))
                    }
                  />
                </label>
                <label>
                  <span>{t('builder.areaEn')}</span>
                  <input
                    value={question.area.en}
                    onChange={(event) =>
                      updateQuestion(index, (item) => ({
                        ...item,
                        area: { ...item.area, en: event.target.value }
                      }))
                    }
                  />
                </label>
                <label>
                  <span>{t('builder.track')}</span>
                  <select
                    value={question.track}
                    onChange={(event) => {
                      const track = event.target.value as AssessmentQuestion['track'];
                      updateQuestion(index, (item) => ({
                        ...item,
                        track,
                        weight: track === 'essential' ? 3 : 2
                      }));
                    }}
                  >
                    <option value="essential">{t('common.essential')}</option>
                    <option value="advanced">{t('common.advanced')}</option>
                  </select>
                </label>
                <label>
                  <span>{t('builder.responseType')}</span>
                  <select
                    value={question.responseType}
                    onChange={(event) =>
                      updateQuestion(index, (item) => ({
                        ...item,
                        responseType: event.target
                          .value as AssessmentQuestion['responseType']
                      }))
                    }
                  >
                    <option value="scale">{t('builder.scale')}</option>
                    <option value="binary">{t('builder.binary')}</option>
                  </select>
                </label>

                <label className="full-span">
                  <span>{t('builder.questionIt')}</span>
                  <textarea
                    rows={2}
                    value={question.question.it}
                    onChange={(event) =>
                      updateQuestion(index, (item) => ({
                        ...item,
                        question: { ...item.question, it: event.target.value }
                      }))
                    }
                  />
                </label>
                <label className="full-span">
                  <span>{t('builder.questionEn')}</span>
                  <textarea
                    rows={2}
                    value={question.question.en}
                    onChange={(event) =>
                      updateQuestion(index, (item) => ({
                        ...item,
                        question: { ...item.question, en: event.target.value }
                      }))
                    }
                  />
                </label>
                <label className="full-span">
                  <span>{t('builder.exampleIt')}</span>
                  <textarea
                    rows={2}
                    value={question.example.it}
                    onChange={(event) =>
                      updateQuestion(index, (item) => ({
                        ...item,
                        example: { ...item.example, it: event.target.value }
                      }))
                    }
                  />
                </label>
                <label className="full-span">
                  <span>{t('builder.exampleEn')}</span>
                  <textarea
                    rows={2}
                    value={question.example.en}
                    onChange={(event) =>
                      updateQuestion(index, (item) => ({
                        ...item,
                        example: { ...item.example, en: event.target.value }
                      }))
                    }
                  />
                </label>
                <label className="full-span">
                  <span>{t('builder.evidenceIt')}</span>
                  <textarea
                    rows={2}
                    value={question.evidence.it}
                    onChange={(event) =>
                      updateQuestion(index, (item) => ({
                        ...item,
                        evidence: { ...item.evidence, it: event.target.value }
                      }))
                    }
                  />
                </label>
                <label className="full-span">
                  <span>{t('builder.evidenceEn')}</span>
                  <textarea
                    rows={2}
                    value={question.evidence.en}
                    onChange={(event) =>
                      updateQuestion(index, (item) => ({
                        ...item,
                        evidence: { ...item.evidence, en: event.target.value }
                      }))
                    }
                  />
                </label>
                <label>
                  <span>{t('builder.technology')}</span>
                  <input
                    value={question.microsoft}
                    onChange={(event) =>
                      updateQuestion(index, (item) => ({
                        ...item,
                        microsoft: event.target.value
                      }))
                    }
                  />
                </label>
                <label>
                  <span>{t('builder.owner')}</span>
                  <input
                    value={question.owner}
                    onChange={(event) =>
                      updateQuestion(index, (item) => ({
                        ...item,
                        owner: event.target.value
                      }))
                    }
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="builder-actions">
        <div>
          {error && <strong className="form-error">{error}</strong>}
          {message && <strong className="form-success">{message}</strong>}
        </div>
        <div>
          {editId && (
            <button
              className="button ghost danger-button"
              onClick={() => void removeImportedAssessment()}
            >
              <Trash2 size={17} />
              {t('builder.deleteAssessment')}
            </button>
          )}
          <button className="button secondary" onClick={download}>
            <Download size={17} />
            {t('actions.downloadAssessment')}
          </button>
          <button className="button secondary" onClick={() => void save()}>
            <Save size={17} />
            {t('builder.saveLocal')}
          </button>
          <button className="button primary" onClick={() => void saveAndOpen()}>
            <Sparkles size={17} />
            {t('builder.saveAndOpen')}
          </button>
        </div>
      </section>
    </div>
  );
}
