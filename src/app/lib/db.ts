import type {
  AssessmentRun,
  EvidenceAttachment,
  StoredAssessment
} from '../models';

const DB_NAME = 'selfassessment-tech';
const DB_VERSION = 2;
const RUNS_STORE = 'runs';
const ASSESSMENTS_STORE = 'assessments';
const ATTACHMENTS_STORE = 'attachments';
const ATTACHMENTS_RUN_INDEX = 'runId';
const ATTACHMENTS_QUESTION_INDEX = 'runQuestion';

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

async function openDb(): Promise<IDBDatabase> {
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onupgradeneeded = () => {
    const db = request.result;

    if (!db.objectStoreNames.contains(RUNS_STORE)) {
      db.createObjectStore(RUNS_STORE, { keyPath: 'id' });
    }

    if (!db.objectStoreNames.contains(ASSESSMENTS_STORE)) {
      db.createObjectStore(ASSESSMENTS_STORE, { keyPath: 'id' });
    }

    if (!db.objectStoreNames.contains(ATTACHMENTS_STORE)) {
      const store = db.createObjectStore(ATTACHMENTS_STORE, {
        keyPath: 'id'
      });
      store.createIndex(ATTACHMENTS_RUN_INDEX, 'runId', { unique: false });
      store.createIndex(
        ATTACHMENTS_QUESTION_INDEX,
        ['runId', 'questionId'],
        { unique: false }
      );
    }
  };

  return requestToPromise(request);
}

export async function putRun(run: AssessmentRun): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(RUNS_STORE, 'readwrite');
  tx.objectStore(RUNS_STORE).put(run);
  await transactionDone(tx);
  db.close();
}

export async function getRun(id: string): Promise<AssessmentRun | undefined> {
  const db = await openDb();
  const tx = db.transaction(RUNS_STORE, 'readonly');
  const value = await requestToPromise(
    tx.objectStore(RUNS_STORE).get(id) as IDBRequest<AssessmentRun | undefined>
  );
  await transactionDone(tx);
  db.close();
  return value;
}

export async function listRuns(): Promise<AssessmentRun[]> {
  const db = await openDb();
  const tx = db.transaction(RUNS_STORE, 'readonly');
  const values = await requestToPromise(
    tx.objectStore(RUNS_STORE).getAll() as IDBRequest<AssessmentRun[]>
  );
  await transactionDone(tx);
  db.close();
  return values.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function deleteRun(id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction([RUNS_STORE, ATTACHMENTS_STORE], 'readwrite');

  tx.objectStore(RUNS_STORE).delete(id);

  const attachmentStore = tx.objectStore(ATTACHMENTS_STORE);
  const cursorRequest = attachmentStore
    .index(ATTACHMENTS_RUN_INDEX)
    .openCursor(IDBKeyRange.only(id));

  cursorRequest.onsuccess = () => {
    const cursor = cursorRequest.result;
    if (!cursor) return;
    cursor.delete();
    cursor.continue();
  };

  await transactionDone(tx);
  db.close();
}

export async function putImportedAssessment(
  definition: StoredAssessment['definition']
): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(ASSESSMENTS_STORE, 'readwrite');
  const payload: StoredAssessment = {
    id: definition.id,
    definition,
    importedAt: new Date().toISOString()
  };
  tx.objectStore(ASSESSMENTS_STORE).put(payload);
  await transactionDone(tx);
  db.close();
}

export async function listImportedAssessments(): Promise<StoredAssessment[]> {
  const db = await openDb();
  const tx = db.transaction(ASSESSMENTS_STORE, 'readonly');
  const values = await requestToPromise(
    tx.objectStore(ASSESSMENTS_STORE).getAll() as IDBRequest<StoredAssessment[]>
  );
  await transactionDone(tx);
  db.close();
  return values.sort((a, b) => b.importedAt.localeCompare(a.importedAt));
}

export async function deleteImportedAssessment(id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(ASSESSMENTS_STORE, 'readwrite');
  tx.objectStore(ASSESSMENTS_STORE).delete(id);
  await transactionDone(tx);
  db.close();
}

export async function getImportedAssessment(
  id: string
): Promise<StoredAssessment | undefined> {
  const db = await openDb();
  const tx = db.transaction(ASSESSMENTS_STORE, 'readonly');
  const value = await requestToPromise(
    tx.objectStore(ASSESSMENTS_STORE).get(id) as IDBRequest<
      StoredAssessment | undefined
    >
  );
  await transactionDone(tx);
  db.close();
  return value;
}

export async function putEvidenceAttachment(
  attachment: EvidenceAttachment
): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(ATTACHMENTS_STORE, 'readwrite');
  tx.objectStore(ATTACHMENTS_STORE).put(attachment);
  await transactionDone(tx);
  db.close();
}

export async function getEvidenceAttachment(
  id: string
): Promise<EvidenceAttachment | undefined> {
  const db = await openDb();
  const tx = db.transaction(ATTACHMENTS_STORE, 'readonly');
  const value = await requestToPromise(
    tx.objectStore(ATTACHMENTS_STORE).get(id) as IDBRequest<
      EvidenceAttachment | undefined
    >
  );
  await transactionDone(tx);
  db.close();
  return value;
}

export async function listEvidenceAttachments(): Promise<EvidenceAttachment[]> {
  const db = await openDb();
  const tx = db.transaction(ATTACHMENTS_STORE, 'readonly');
  const values = await requestToPromise(
    tx.objectStore(ATTACHMENTS_STORE).getAll() as IDBRequest<
      EvidenceAttachment[]
    >
  );
  await transactionDone(tx);
  db.close();
  return values.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function listEvidenceAttachmentsForRun(
  runId: string
): Promise<EvidenceAttachment[]> {
  const db = await openDb();
  const tx = db.transaction(ATTACHMENTS_STORE, 'readonly');
  const values = await requestToPromise(
    tx
      .objectStore(ATTACHMENTS_STORE)
      .index(ATTACHMENTS_RUN_INDEX)
      .getAll(IDBKeyRange.only(runId)) as IDBRequest<EvidenceAttachment[]>
  );
  await transactionDone(tx);
  db.close();
  return values.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function listEvidenceAttachmentsForQuestion(
  runId: string,
  questionId: string
): Promise<EvidenceAttachment[]> {
  const db = await openDb();
  const tx = db.transaction(ATTACHMENTS_STORE, 'readonly');
  const values = await requestToPromise(
    tx
      .objectStore(ATTACHMENTS_STORE)
      .index(ATTACHMENTS_QUESTION_INDEX)
      .getAll(IDBKeyRange.only([runId, questionId])) as IDBRequest<
      EvidenceAttachment[]
    >
  );
  await transactionDone(tx);
  db.close();
  return values.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function deleteEvidenceAttachment(id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(ATTACHMENTS_STORE, 'readwrite');
  tx.objectStore(ATTACHMENTS_STORE).delete(id);
  await transactionDone(tx);
  db.close();
}
