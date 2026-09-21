export type Locale = 'it' | 'en';

export interface LocalizedText {
  it: string;
  en: string;
}

export type AssessmentTrack = 'essential' | 'advanced';
export type RunScope = 'essential' | 'all';
export type ResponseType = 'scale' | 'binary';
export type AnswerValue = number | 'yes' | 'no' | 'unknown' | 'na';

export interface IntroSection {
  id: string;
  eyebrow?: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  bullets?: LocalizedText[];
}

export interface AssessmentQuestion {
  id: string;
  area: LocalizedText;
  track: AssessmentTrack;
  question: LocalizedText;
  example: LocalizedText;
  evidence: LocalizedText;
  microsoft: string;
  responseType: ResponseType;
  owner: string;
  weight: number;
}

export interface AssessmentDefinition {
  id: string;
  version: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  longDescription: LocalizedText;
  estimatedMinutes: number;
  tags: string[];
  accent: string;
  intro: IntroSection[];
  questions: AssessmentQuestion[];
}

export interface QuestionAnswer {
  value?: AnswerValue;
  notes?: string;
}

export interface AssessmentRun {
  id: string;
  assessmentId: string;
  assessmentVersion: string;
  scope: RunScope;
  locale: Locale;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
  answers: Record<string, QuestionAnswer>;
}

export interface AreaScore {
  area: string;
  score: number | null;
  answered: number;
  total: number;
}

export interface ScoredQuestion {
  question: AssessmentQuestion;
  answer: QuestionAnswer;
  score: number | null;
}

export interface AssessmentResult {
  overallScore: number | null;
  completionPercent: number;
  answeredCount: number;
  totalCount: number;
  unknownCount: number;
  areaScores: AreaScore[];
  gaps: ScoredQuestion[];
  scoredQuestions: ScoredQuestion[];
}

export interface StoredAssessment {
  id: string;
  definition: AssessmentDefinition;
  importedAt: string;
}

export interface EvidenceAttachment {
  id: string;
  runId: string;
  questionId: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  blob: Blob;
}
