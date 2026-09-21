import {
  Download,
  FilePlus2,
  Paperclip,
  Trash2
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { EvidenceAttachment } from '../models';
import {
  deleteEvidenceAttachment,
  listEvidenceAttachmentsForQuestion,
  putEvidenceAttachment
} from '../lib/db';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES_PER_QUESTION = 5;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface Props {
  runId: string;
  questionId: string;
}

export function EvidenceAttachments({ runId, questionId }: Props) {
  const { t } = useTranslation();
  const [attachments, setAttachments] = useState<EvidenceAttachment[]>([]);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const refresh = async () => {
    setAttachments(
      await listEvidenceAttachmentsForQuestion(runId, questionId)
    );
  };

  useEffect(() => {
    setMessage('');
    void refresh();
  }, [runId, questionId]);

  const addFiles = async (files?: FileList | null) => {
    if (!files || files.length === 0) return;
    setMessage('');

    const availableSlots = Math.max(
      0,
      MAX_FILES_PER_QUESTION - attachments.length
    );

    if (availableSlots === 0) {
      setMessage(t('evidence.maxFiles'));
      return;
    }

    const selected = [...files].slice(0, availableSlots);

    for (const file of selected) {
      if (file.size > MAX_FILE_SIZE) {
        setMessage(
          t('evidence.tooLarge', {
            name: file.name,
            size: formatBytes(MAX_FILE_SIZE)
          })
        );
        continue;
      }

      const attachment: EvidenceAttachment = {
        id: crypto.randomUUID(),
        runId,
        questionId,
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        createdAt: new Date().toISOString(),
        blob: file
      };

      await putEvidenceAttachment(attachment);
    }

    if (files.length > availableSlots) {
      setMessage(t('evidence.maxFiles'));
    }

    if (inputRef.current) inputRef.current.value = '';
    await refresh();
  };

  const remove = async (id: string) => {
    await deleteEvidenceAttachment(id);
    await refresh();
  };

  const download = (attachment: EvidenceAttachment) => {
    const url = URL.createObjectURL(attachment.blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = attachment.name;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="evidence-attachments">
      <div className="evidence-heading">
        <div>
          <span className="evidence-title">
            <Paperclip size={16} />
            {t('evidence.title')}
          </span>
          <small>{t('evidence.hint')}</small>
        </div>

        <button
          type="button"
          className="button ghost"
          onClick={() => inputRef.current?.click()}
          disabled={attachments.length >= MAX_FILES_PER_QUESTION}
        >
          <FilePlus2 size={16} />
          {t('evidence.add')}
        </button>

        <input
          ref={inputRef}
          hidden
          multiple
          type="file"
          onChange={(event) => void addFiles(event.target.files)}
        />
      </div>

      {attachments.length > 0 && (
        <div className="evidence-list">
          {attachments.map((attachment) => (
            <article className="evidence-file" key={attachment.id}>
              <div>
                <strong>{attachment.name}</strong>
                <span>
                  {formatBytes(attachment.size)} · {attachment.type}
                </span>
              </div>
              <div className="evidence-actions">
                <button
                  type="button"
                  className="icon-button compact"
                  title={t('actions.download')}
                  aria-label={t('actions.download')}
                  onClick={() => download(attachment)}
                >
                  <Download size={15} />
                </button>
                <button
                  type="button"
                  className="icon-button compact danger-button"
                  title={t('actions.delete')}
                  aria-label={t('actions.delete')}
                  onClick={() => void remove(attachment.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {message && <p className="evidence-message">{message}</p>}
    </div>
  );
}
