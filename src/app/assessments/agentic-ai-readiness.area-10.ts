import type { AssessmentQuestion } from '../models';
import { agenticAreas, agenticQuestion as q } from './agentic-ai-readiness.shared';

export const agenticArea10Questions: AssessmentQuestion[] = [
  q({
    id: 'ai-053', area: agenticAreas.operations, track: 'essential', weight: 5,
    question: {
      it: 'Prima della produzione esistono dataset di test, evaluator e soglie di accettazione per qualità e sicurezza dell’agente?',
      en: 'Before production, are there test datasets, evaluators, and acceptance thresholds for agent quality and safety?'
    },
    example: {
      it: 'L’agente deve superare una baseline misurabile su task success, groundedness, tool selection e safety prima del rilascio.',
      en: 'The agent must pass a measurable baseline for task success, groundedness, tool selection, and safety before release.'
    },
    evidence: {
      it: 'Evaluation dataset, scorecard, acceptance threshold, release result.',
      en: 'Evaluation dataset, scorecard, acceptance threshold, release result.'
    },
    microsoft: 'Microsoft Foundry evaluations',
    owner: 'AI Engineering / Product Owner'
  }),
  q({
    id: 'ai-054', area: agenticAreas.operations, track: 'advanced', weight: 4,
    question: {
      it: 'È disponibile tracing end-to-end di richieste, reasoning operativo, tool call, errori e risultati sufficienti per investigare un comportamento?',
      en: 'Is end-to-end tracing available for requests, operational reasoning, tool calls, errors, and results sufficient to investigate behavior?'
    },
    example: {
      it: 'Da un incidente è possibile ricostruire quali tool sono stati chiamati, con quali input e quale stato è stato prodotto.',
      en: 'From an incident, teams can reconstruct which tools were called, with which inputs, and what state was produced.'
    },
    evidence: {
      it: 'Distributed traces, agent telemetry, audit log, correlation ID.',
      en: 'Distributed traces, agent telemetry, audit log, correlation ID.'
    },
    microsoft: 'Microsoft Foundry observability / Agent 365 / Application Insights',
    owner: 'SRE / AI Engineering / Security'
  }),
  q({
    id: 'ai-055', area: agenticAreas.operations, track: 'advanced', weight: 4,
    question: {
      it: 'Modifiche a prompt, istruzioni, modello, knowledge source o tool fanno partire regression test coerenti?',
      en: 'Do changes to prompts, instructions, models, knowledge sources, or tools trigger appropriate regression tests?'
    },
    example: {
      it: 'Un modello più nuovo non viene promosso solo perché disponibile: viene confrontato con la baseline del caso d’uso.',
      en: 'A newer model is not promoted merely because it is available: it is compared with the use-case baseline.'
    },
    evidence: {
      it: 'CI evaluation, version comparison, regression report.',
      en: 'CI evaluation, version comparison, regression report.'
    },
    microsoft: 'Microsoft Foundry evaluation / Agent versioning',
    owner: 'AI Engineering / MLOps'
  }),
  q({
    id: 'ai-056', area: agenticAreas.operations, track: 'advanced', weight: 3,
    question: {
      it: 'Gli agenti in produzione hanno SLI/SLO per disponibilità, latenza, qualità, costo e tasso di escalation?',
      en: 'Do production agents have SLIs/SLOs for availability, latency, quality, cost, and escalation rate?'
    },
    example: {
      it: 'Oltre all’uptime si controllano task success, costo per task e percentuale di casi passati a operatori.',
      en: 'Beyond uptime, teams monitor task success, cost per task, and the percentage of cases handed to operators.'
    },
    evidence: {
      it: 'Operations dashboard, SLO, cost alert, quality telemetry.',
      en: 'Operations dashboard, SLO, cost alert, quality telemetry.'
    },
    microsoft: 'Application Insights / Foundry / Agent 365',
    owner: 'Platform Operations / Product Owner'
  }),
  q({
    id: 'ai-057', area: agenticAreas.operations, track: 'advanced', weight: 4,
    question: {
      it: 'Esistono incident response, rollback e kill switch specifici per agenti e azioni automatizzate?',
      en: 'Are there agent-specific incident response, rollback, and kill-switch mechanisms for automated actions?'
    },
    example: {
      it: 'Un comportamento anomalo può disabilitare rapidamente agente, tool o identità e tornare a una versione precedente.',
      en: 'Abnormal behavior can quickly disable the agent, tool, or identity and roll back to a previous version.'
    },
    evidence: {
      it: 'Runbook, emergency stop, rollback test, incident exercise.',
      en: 'Runbook, emergency stop, rollback test, incident exercise.'
    },
    microsoft: 'Agent lifecycle / Entra / Foundry versioning',
    owner: 'Operations / Security / Platform Team'
  }),
  q({
    id: 'ai-058', area: agenticAreas.operations, track: 'advanced', weight: 4,
    question: {
      it: 'Gli agenti vengono testati contro prompt injection, tool misuse, data leakage e input avversariali coerenti con il proprio rischio?',
      en: 'Are agents tested against prompt injection, tool misuse, data leakage, and adversarial inputs consistent with their risk?'
    },
    example: {
      it: 'I test includono tentativi di far ignorare istruzioni, esfiltrare dati o usare tool oltre lo scopo consentito.',
      en: 'Tests include attempts to bypass instructions, exfiltrate data, or use tools beyond permitted scope.'
    },
    evidence: {
      it: 'Red-team report, adversarial test suite, remediation log.',
      en: 'Red-team report, adversarial test suite, remediation log.'
    },
    microsoft: 'Microsoft Foundry safety / Copilot Studio security',
    owner: 'Security Testing / AI Engineering'
  })
];
