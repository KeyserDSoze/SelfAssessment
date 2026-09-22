import type { AssessmentQuestion } from '../models';
import { agenticAreas, agenticQuestion as q } from './agentic-ai-readiness.shared';

export const agenticArea3Questions: AssessmentQuestion[] = [
  q({
    id: 'ai-013', area: agenticAreas.process, track: 'essential', weight: 5,
    question: {
      it: 'I processi candidati agli agenti hanno input, output, eccezioni, regole e criteri di successo sufficientemente conosciuti?',
      en: 'Do processes considered for agents have sufficiently understood inputs, outputs, exceptions, rules, and success criteria?'
    },
    example: {
      it: 'Il team sa descrivere il happy path, le eccezioni frequenti e quando il caso deve passare a una persona.',
      en: 'The team can describe the happy path, common exceptions, and when the case must be handed to a person.'
    },
    evidence: {
      it: 'Process map, SOP, BPMN, exception log, service blueprint.',
      en: 'Process map, SOP, BPMN, exception log, service blueprint.'
    },
    microsoft: 'Copilot Studio / Power Automate / Foundry',
    owner: 'Process Owner / Business Analyst'
  }),
  q({
    id: 'ai-014', area: agenticAreas.process, track: 'essential', weight: 4,
    question: {
      it: 'Il processo separa i passaggi che richiedono reasoning probabilistico da quelli che devono restare deterministici e verificabili?',
      en: 'Does the process separate steps requiring probabilistic reasoning from steps that must remain deterministic and verifiable?'
    },
    example: {
      it: 'L’agente interpreta una richiesta, ma prezzi, calcoli e autorizzazioni critiche vengono eseguiti da servizi deterministici.',
      en: 'The agent interprets a request, while prices, calculations, and critical authorization are executed by deterministic services.'
    },
    evidence: {
      it: 'Solution design, workflow, tool contracts, architecture decision record.',
      en: 'Solution design, workflow, tool contracts, architecture decision record.'
    },
    microsoft: 'Copilot Studio orchestration / Power Automate',
    owner: 'Solution Architect / Process Owner'
  }),
  q({
    id: 'ai-015', area: agenticAreas.process, track: 'advanced', weight: 3,
    question: {
      it: 'I sistemi coinvolti espongono API, connector o tool governabili invece di dipendere solo da operazioni manuali o UI fragili?',
      en: 'Do involved systems expose governable APIs, connectors, or tools instead of depending only on manual operations or fragile UI automation?'
    },
    example: {
      it: 'CRM, ERP e ticketing sono accessibili tramite connector/API con autenticazione e permessi espliciti.',
      en: 'CRM, ERP, and ticketing are accessible through connectors/APIs with explicit authentication and permissions.'
    },
    evidence: {
      it: 'API catalog, connector inventory, integration diagram.',
      en: 'API catalog, connector inventory, integration diagram.'
    },
    microsoft: 'Copilot Studio connectors / Logic Apps / MCP',
    owner: 'Integration Team / Enterprise Architecture'
  }),
  q({
    id: 'ai-016', area: agenticAreas.process, track: 'advanced', weight: 3,
    question: {
      it: 'Le azioni automatizzate gestiscono retry, timeout, duplicazioni e idempotenza in modo prevedibile?',
      en: 'Do automated actions handle retries, timeouts, duplicates, and idempotency predictably?'
    },
    example: {
      it: 'Un retry non crea due ordini o due pagamenti; un timeout produce stato recuperabile e tracciabile.',
      en: 'A retry does not create two orders or payments; a timeout produces a recoverable and traceable state.'
    },
    evidence: {
      it: 'Error-handling design, run history, test di failure.',
      en: 'Error-handling design, run history, failure tests.'
    },
    microsoft: 'Power Automate / Logic Apps / Foundry tools',
    owner: 'Engineering / Operations'
  }),
  q({
    id: 'ai-017', area: agenticAreas.process, track: 'advanced', weight: 3,
    question: {
      it: 'I passaggi di handoff tra agente e persona preservano contesto, motivazione e azioni già eseguite?',
      en: 'Do handoffs between agent and person preserve context, rationale, and actions already taken?'
    },
    example: {
      it: 'L’operatore riceve il caso con fonti, tool call, stato e motivo dell’escalation, senza ricominciare da zero.',
      en: 'The operator receives the case with sources, tool calls, state, and escalation reason without starting from scratch.'
    },
    evidence: {
      it: 'Handoff design, transcript, ticket payload, support procedure.',
      en: 'Handoff design, transcript, ticket payload, support procedure.'
    },
    microsoft: 'Copilot Studio / Dynamics 365 / Teams',
    owner: 'Process Owner / Service Operations'
  }),
  q({
    id: 'ai-018', area: agenticAreas.process, track: 'advanced', weight: 2,
    question: {
      it: 'L’introduzione degli agenti porta a riprogettare il processo invece di aggiungere un layer AI sopra inefficienze esistenti?',
      en: 'Does introducing agents lead to process redesign rather than adding an AI layer on top of existing inefficiencies?'
    },
    example: {
      it: 'Si eliminano passaggi e approvazioni non necessarie prima di automatizzarli.',
      en: 'Unnecessary steps and approvals are removed before automating them.'
    },
    evidence: {
      it: 'Before/after process map, redesign workshop, value-stream analysis.',
      en: 'Before/after process map, redesign workshop, value-stream analysis.'
    },
    microsoft: 'Agentic AI business transformation',
    owner: 'Business Transformation / Process Owner'
  })
];
