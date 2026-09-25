import type {
  AnswerValue,
  AssessmentDefinition,
  AssessmentRun,
  QuestionAnswer,
  RunScope
} from '../models';

export const SHARE_SCHEMA_VERSION = '1';

const TOKEN_BY_VALUE = new Map<AnswerValue, string>([
  [0, '0'],
  [1, '1'],
  [2, '2'],
  [3, '3'],
  [4, '4'],
  [5, '5'],
  ['yes', 'y'],
  ['no', 'n'],
  ['unknown', 'u'],
  ['na', 'x']
]);

const VALUE_BY_TOKEN = new Map<string, AnswerValue>(
  [...TOKEN_BY_VALUE.entries()].map(([value, token]) => [token, value])
);

function questionsForScope(
  assessment: AssessmentDefinition,
  scope: RunScope
) {
  return assessment.questions.filter((question) =>
    scope === 'all' ? true : question.track === 'essential'
  );
}

function base64UrlEncode(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);

  return btoa(binary)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(value: string): string {
  if (!/^[A-Za-z0-9_-]*$/.test(value)) {
    throw new Error('Invalid Base64URL payload');
  }

  const normalized = value.replaceAll('-', '+').replaceAll('_', '/');
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    '='
  );
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeSharedAnswers(
  assessment: AssessmentDefinition,
  run: AssessmentRun
): string {
  const questions = questionsForScope(assessment, run.scope);
  const tokens = questions.map((question) => {
    const value = run.answers[question.id]?.value;
    if (value === undefined) return '';

    const token = TOKEN_BY_VALUE.get(value);
    if (token === undefined) {
      throw new Error(`Unsupported answer value for ${question.id}`);
    }
    return token;
  });

  return base64UrlEncode(tokens.join('|'));
}

export interface DecodedSharedAnswers {
  answers: Record<string, QuestionAnswer>;
  answeredCount: number;
  totalCount: number;
  complete: boolean;
  firstUnansweredId?: string;
}

export function decodeSharedAnswers(
  assessment: AssessmentDefinition,
  scope: RunScope,
  payload: string
): DecodedSharedAnswers {
  const questions = questionsForScope(assessment, scope);
  const decoded = base64UrlDecode(payload);
  const tokens = decoded.split('|');

  if (tokens.length !== questions.length) {
    throw new Error(
      `Shared answer count mismatch: expected ${questions.length}, got ${tokens.length}`
    );
  }

  const answers: Record<string, QuestionAnswer> = {};
  let answeredCount = 0;
  let firstUnansweredId: string | undefined;

  questions.forEach((question, index) => {
    const token = tokens[index];

    if (token === '') {
      firstUnansweredId ??= question.id;
      return;
    }

    const value = VALUE_BY_TOKEN.get(token);
    if (value === undefined) {
      throw new Error(`Invalid shared answer token at position ${index + 1}`);
    }

    answers[question.id] = { value };
    answeredCount += 1;
  });

  return {
    answers,
    answeredCount,
    totalCount: questions.length,
    complete: answeredCount === questions.length,
    firstUnansweredId
  };
}

export function scopeToShareToken(scope: RunScope): 'e' | 'f' {
  return scope === 'essential' ? 'e' : 'f';
}

export function shareTokenToScope(value: string | null): RunScope | undefined {
  if (value === 'e') return 'essential';
  if (value === 'f') return 'all';
  return undefined;
}

export function buildAssessmentShareUrl(
  assessment: AssessmentDefinition,
  run: AssessmentRun
): string {
  const base = window.location.href.split('#')[0];
  const params = new URLSearchParams({
    sv: SHARE_SCHEMA_VERSION,
    v: assessment.version,
    s: scopeToShareToken(run.scope),
    a: encodeSharedAnswers(assessment, run)
  });

  return `${base}#/share/${encodeURIComponent(assessment.id)}?${params.toString()}`;
}
