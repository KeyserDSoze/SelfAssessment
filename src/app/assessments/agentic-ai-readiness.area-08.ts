import type { AssessmentQuestion } from '../models';
import { agenticAreas, agenticQuestion as q } from './agentic-ai-readiness.shared';

export const agenticArea8Questions: AssessmentQuestion[] = [
  q({
    id: 'ai-043', area: agenticAreas.architecture, track: 'essential', weight: 4,
    question: {
      it: 'Esistono standard per come gli agenti accedono a tool, API e MCP server, inclusi autenticazione, autorizzazione e confini di fiducia?',
      en: 'Are there standards for how agents access tools, APIs, and MCP servers, including authentication, authorization, and trust boundaries?'
    },
    example: {
      it: 'Un nuovo tool non viene collegato a un agente solo perché tecnicamente disponibile: deve rispettare un contratto e controlli approvati.',
      en: 'A new tool is not connected to an agent merely because it is technically available: it must meet an approved contract and controls.'
    },
    evidence: {
      it: 'Tool standard, MCP policy, API security standard, allowlist.',
      en: 'Tool standard, MCP policy, API security standard, allowlist.'
    },
    microsoft: 'MCP / Copilot Studio / Microsoft Foundry',
    owner: 'Enterprise Architecture / Security'
  }),
  q({
    id: 'ai-044', area: agenticAreas.architecture, track: 'advanced', weight: 3,
    question: {
      it: 'Le soluzioni evitano lock-in non necessario separando business logic, tool contract, dati e dipendenze specifiche del modello?',
      en: 'Do solutions avoid unnecessary lock-in by separating business logic, tool contracts, data, and model-specific dependencies?'
    },
    example: {
      it: 'Cambiare modello o provider non richiede riscrivere l’intero processo quando non è necessario.',
      en: 'Changing model or provider does not require rewriting the entire process when unnecessary.'
    },
    evidence: {
      it: 'Architecture layers, model abstraction, API contracts.',
      en: 'Architecture layers, model abstraction, API contracts.'
    },
    microsoft: 'Microsoft Foundry model catalog / Open standards',
    owner: 'Enterprise Architecture / AI Engineering'
  }),
  q({
    id: 'ai-045', area: agenticAreas.architecture, track: 'advanced', weight: 3,
    question: {
      it: 'Le architetture multi-agent vengono usate solo quando la specializzazione o la separazione di responsabilità porta un beneficio misurabile?',
      en: 'Are multi-agent architectures used only when specialization or separation of responsibilities delivers measurable benefit?'
    },
    example: {
      it: 'Non si crea una rete di agenti per moda: ogni agente aggiuntivo ha uno scopo, contratto e failure mode chiari.',
      en: 'A network of agents is not created for fashion: every additional agent has a clear purpose, contract, and failure mode.'
    },
    evidence: {
      it: 'Architecture decision record, benchmark single vs multi-agent.',
      en: 'Architecture decision record, single-vs-multi-agent benchmark.'
    },
    microsoft: 'Copilot Studio connected agents / Foundry agent protocols',
    owner: 'Solution Architect / AI Engineering'
  }),
  q({
    id: 'ai-046', area: agenticAreas.architecture, track: 'advanced', weight: 3,
    question: {
      it: 'MCP server e tool esterni sono inventariati, approvati e limitati per ambito, dati e comandi eseguibili?',
      en: 'Are MCP servers and external tools inventoried, approved, and constrained by scope, data, and executable commands?'
    },
    example: {
      it: 'Il catalogo distingue MCP approvati, owner, capability esposte e dati accessibili; tool rischiosi richiedono controlli più forti.',
      en: 'The catalog distinguishes approved MCP servers, owners, exposed capabilities, and accessible data; riskier tools require stronger controls.'
    },
    evidence: {
      it: 'MCP registry, allowlist, tool permission matrix, review record.',
      en: 'MCP registry, allowlist, tool permission matrix, review record.'
    },
    microsoft: 'GitHub Copilot MCP governance / Foundry MCP',
    owner: 'Developer Platform / Security'
  }),
  q({
    id: 'ai-047', area: agenticAreas.architecture, track: 'advanced', weight: 2,
    question: {
      it: 'Le dipendenze tra agenti e tool hanno contratti, timeout, fallback e isolamento dei guasti definiti?',
      en: 'Do dependencies between agents and tools have defined contracts, timeouts, fallbacks, and fault isolation?'
    },
    example: {
      it: 'Il fallimento di un agente specializzato non provoca loop indefiniti o azioni parziali non recuperabili.',
      en: 'Failure of a specialized agent does not cause endless loops or unrecoverable partial actions.'
    },
    evidence: {
      it: 'Sequence diagram, timeout/retry policy, failure tests.',
      en: 'Sequence diagram, timeout/retry policy, failure tests.'
    },
    microsoft: 'Foundry Agent Service / Copilot Studio orchestration',
    owner: 'Engineering / SRE'
  })
];
