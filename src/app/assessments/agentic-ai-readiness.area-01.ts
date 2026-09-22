import type { AssessmentQuestion } from '../models';
import { agenticAreas, agenticQuestion as q } from './agentic-ai-readiness.shared';

export const agenticArea1Questions: AssessmentQuestion[] = [
  q({
    id: 'ai-001', area: agenticAreas.strategy, track: 'essential', weight: 5,
    question: {
      it: 'Gli use case di AI agentica sono collegati a outcome di business misurabili e a un owner responsabile del valore?',
      en: 'Are agentic AI use cases tied to measurable business outcomes and to an owner accountable for value?'
    },
    example: {
      it: 'Ridurre il tempo di gestione ticket del 30%, migliorare il first-contact resolution o diminuire attività manuali con target e baseline espliciti.',
      en: 'Reduce ticket handling time by 30%, improve first-contact resolution, or reduce manual work with explicit targets and baselines.'
    },
    evidence: {
      it: 'Business case, KPI, baseline, backlog use case, sponsor e owner.',
      en: 'Business case, KPIs, baseline, use-case backlog, sponsor and owner.'
    },
    microsoft: 'Agentic AI maturity model / Copilot / Foundry',
    owner: 'Business Owner / CIO / AI Lead'
  }),
  q({
    id: 'ai-002', area: agenticAreas.strategy, track: 'essential', weight: 4,
    question: {
      it: 'Esiste un processo condiviso per selezionare e prioritizzare i casi d’uso adatti a copiloti, agenti o automazione?',
      en: 'Is there a shared process to select and prioritize use cases suitable for copilots, agents, or automation?'
    },
    example: {
      it: 'La priorità considera valore, fattibilità, dati, rischio, autonomia richiesta, frequenza e costo operativo.',
      en: 'Prioritization considers value, feasibility, data, risk, required autonomy, frequency, and operating cost.'
    },
    evidence: {
      it: 'Intake form, criteri di scoring, portfolio review, roadmap.',
      en: 'Intake form, scoring criteria, portfolio review, roadmap.'
    },
    microsoft: 'Agentic AI adoption maturity model',
    owner: 'AI CoE / Business / Enterprise Architecture'
  }),
  q({
    id: 'ai-003', area: agenticAreas.strategy, track: 'advanced', weight: 3,
    question: {
      it: 'I pilot hanno criteri espliciti per passare in produzione, essere riprogettati o essere chiusi?',
      en: 'Do pilots have explicit criteria to move to production, be redesigned, or be stopped?'
    },
    example: {
      it: 'Un pilot non continua per inerzia: deve superare soglie di qualità, sicurezza, adozione e valore.',
      en: 'A pilot does not continue by inertia: it must pass quality, security, adoption, and value thresholds.'
    },
    evidence: {
      it: 'Exit criteria, release gate, decision log, post-pilot review.',
      en: 'Exit criteria, release gate, decision log, post-pilot review.'
    },
    microsoft: 'Microsoft agents Center of Excellence',
    owner: 'AI CoE / Product Owner'
  }),
  q({
    id: 'ai-004', area: agenticAreas.strategy, track: 'advanced', weight: 3,
    question: {
      it: 'L’organizzazione distingue quando usare AI assistiva, agente autonomo, workflow deterministico o software tradizionale?',
      en: 'Does the organization distinguish when to use assistive AI, an autonomous agent, deterministic workflow, or traditional software?'
    },
    example: {
      it: 'Un calcolo fiscale deterministico non viene affidato a reasoning probabilistico; un agente può orchestrare eccezioni e tool attorno al calcolo.',
      en: 'A deterministic tax calculation is not delegated to probabilistic reasoning; an agent may orchestrate exceptions and tools around it.'
    },
    evidence: {
      it: 'Architecture principles, decision tree, solution patterns.',
      en: 'Architecture principles, decision tree, solution patterns.'
    },
    microsoft: 'Copilot Studio / Microsoft Foundry / Power Automate',
    owner: 'Enterprise Architecture / Platform Team'
  }),
  q({
    id: 'ai-005', area: agenticAreas.strategy, track: 'advanced', weight: 2,
    question: {
      it: 'Il valore degli agenti viene misurato includendo anche costi di modello, capacità, integrazione, controllo e supporto?',
      en: 'Is agent value measured including model, capacity, integration, governance, and support costs?'
    },
    example: {
      it: 'Il ROI include consumo, licenze, engineering, human review, incidenti e manutenzione delle knowledge source.',
      en: 'ROI includes consumption, licenses, engineering, human review, incidents, and knowledge-source maintenance.'
    },
    evidence: {
      it: 'FinOps AI, cost dashboard, benefit tracking, TCO.',
      en: 'AI FinOps, cost dashboard, benefit tracking, TCO.'
    },
    microsoft: 'Microsoft 365 Copilot / Copilot Studio / Foundry',
    owner: 'Finance / CIO / AI Product Owner'
  }),
  q({
    id: 'ai-006', area: agenticAreas.strategy, track: 'advanced', weight: 2,
    question: {
      it: 'Esistono criteri per ritirare agenti che non producono più valore, sono duplicati o non hanno più un owner?',
      en: 'Are there criteria to retire agents that no longer create value, are duplicated, or no longer have an owner?'
    },
    example: {
      it: 'Agenti inutilizzati o senza sponsor vengono disabilitati e rimossi da cataloghi e autorizzazioni.',
      en: 'Unused agents or agents without a sponsor are disabled and removed from catalogs and permissions.'
    },
    evidence: {
      it: 'Lifecycle policy, usage report, retirement log.',
      en: 'Lifecycle policy, usage report, retirement log.'
    },
    microsoft: 'Agent lifecycle / Agent 365',
    owner: 'AI CoE / Platform Operations'
  })
];
