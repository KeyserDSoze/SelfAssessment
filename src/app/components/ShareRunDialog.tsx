import { Check, Copy, QrCode, Share2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  AssessmentDefinition,
  AssessmentRun,
  Locale
} from '../models';
import { localized } from '../lib/localize';
import { buildAssessmentShareUrl } from '../lib/share';

interface ShareRunDialogProps {
  assessment: AssessmentDefinition;
  run: AssessmentRun;
  locale: Locale;
  open: boolean;
  onClose: () => void;
}

async function copyText(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export function ShareRunDialog({
  assessment,
  run,
  locale,
  open,
  onClose
}: ShareRunDialogProps) {
  const { t } = useTranslation();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(
    () => buildAssessmentShareUrl(assessment, run),
    [assessment, run]
  );

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setQrDataUrl('');
    setCopied(false);

    void import('qrcode').then(async ({ toDataURL }) => {
      const dataUrl = await toDataURL(shareUrl, {
        errorCorrectionLevel: 'M',
        margin: 1,
        width: 280
      });
      if (!cancelled) setQrDataUrl(dataUrl);
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      cancelled = true;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose, shareUrl]);

  if (!open) return null;

  const handleCopy = async () => {
    await copyText(shareUrl);
    setCopied(true);
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;
    await navigator.share({
      title: localized(assessment.title, locale),
      text: t('share.nativeText'),
      url: shareUrl
    });
  };

  return (
    <div
      className="share-dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="share-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-dialog-title"
      >
        <div className="share-dialog-heading">
          <div className="share-dialog-icon">
            <Share2 size={20} />
          </div>
          <div>
            <span>{t('share.kicker')}</span>
            <h2 id="share-dialog-title">{t('share.title')}</h2>
            <p>{t('share.subtitle')}</p>
          </div>
          <button
            className="icon-button compact"
            type="button"
            onClick={onClose}
            aria-label={t('share.close')}
          >
            <X size={18} />
          </button>
        </div>

        <div className="share-dialog-grid">
          <div className="share-qr-panel">
            <div className="share-qr">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt={t('share.qrAlt')} />
              ) : (
                <QrCode size={72} />
              )}
            </div>
            <strong>{t('share.qrTitle')}</strong>
            <p>{t('share.qrHint')}</p>
          </div>

          <div className="share-link-panel">
            <div className="share-summary">
              <span>
                <small>{t('share.scope')}</small>
                <strong>
                  {run.scope === 'essential'
                    ? t('assessment.essential')
                    : t('assessment.full')}
                </strong>
              </span>
              <span>
                <small>{t('common.version')}</small>
                <strong>{assessment.version}</strong>
              </span>
            </div>

            <label className="share-url-field">
              <span>{t('share.link')}</span>
              <textarea readOnly value={shareUrl} rows={4} />
            </label>

            <div className="share-dialog-actions">
              <button
                className="button primary"
                type="button"
                onClick={() => void handleCopy()}
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? t('share.copied') : t('share.copy')}
              </button>
              {typeof navigator.share === 'function' && (
                <button
                  className="button secondary"
                  type="button"
                  onClick={() => void handleNativeShare()}
                >
                  <Share2 size={17} />
                  {t('share.native')}
                </button>
              )}
            </div>

            <div className="share-privacy-note">
              <strong>{t('share.privacyTitle')}</strong>
              <p>{t('share.privacyBody')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
