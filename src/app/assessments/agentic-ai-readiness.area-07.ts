import type { AssessmentQuestion } from '../models';
import { agenticAreas, agenticQuestion as q } from './agentic-ai-readiness.shared';

export const agenticArea7Questions: AssessmentQuestion[] = [
  q({
    id: 'ai-037', area: agenticAreas.platform, track: 'essential', weight: 5,
    question: {
      it: 'Esistono criteri architetturali per scegliere tra Microsoft 365 Copilot/Agent Builder, Copilot Studio, Microsoft Foundry, Power Platform o una soluzione custom?',
      en: 'Are there architecture criteria for choosing between Microsoft 365 Copilot/Agent Builder, Copilot Studio, Microsoft Foundry, Power Platform, or a custom solution?'
    },
    example: {
      it: 'Agent Builder copre scenari semplici di knowledge; Copilot Studio scenari low-code con azioni; Foundry scenari pro-code e più personalizzati.',
      en: 'Agent Builder covers simpler knowledge scenarios; Copilot Studio low-code scenarios with actions; Foundry more customized pro-code scenarios.'
    },
    evidence: {
      it: 'Decision tree, reference architecture, golden path, platform standard.',
      en: 'Decision tree, reference architecture, golden path, platform standard.'
    },
    microsoft: 'Microsoft 365 Copilot / Copilot Studio / Microsoft Foundry',
    owner: 'Enterprise Architecture / AI Platform Team'
  }),
  q({
    id: 'ai-038', area: agenticAreas.platform, track: 'essential', weight: 4,
    question: {
      it: 'L’uso di Microsoft 365 Copilot e degli agenti creati dagli utenti è governato con policy, dati, condivisione e monitoraggio coerenti?',
      en: 'Is the use of Microsoft 365 Copilot and user-built agents governed with consistent policies, data controls, sharing, and monitoring?'
    },
    example: {
      it: 'Gli utenti possono creare agenti entro limiti noti; amministratori sanno quali agenti sono condivisi e quali fonti usano.',
      en: 'Users can create agents within known boundaries; administrators know which agents are shared and which sources they use.'
    },
    evidence: {
      it: 'Admin settings, agent inventory, sharing policy, audit.',
      en: 'Admin settings, agent inventory, sharing policy, audit.'
    },
    microsoft: 'Microsoft 365 Copilot / Agent Builder / Agent 365',
    owner: 'Microsoft 365 Admin / AI CoE'
  }),
  q({
    id: 'ai-039', area: agenticAreas.platform, track: 'advanced', weight: 3,
    question: {
      it: 'Copilot Studio è gestito con ambienti, data policy, connector governance e ALM coerenti con il rischio?',
      en: 'Is Copilot Studio managed with environments, data policies, connector governance, and ALM consistent with risk?'
    },
    example: {
      it: 'Dev/test/prod sono separati, connector sensibili sono governati e le modifiche seguono solution/ALM.',
      en: 'Dev/test/prod are separated, sensitive connectors are governed, and changes follow solution/ALM practices.'
    },
    evidence: {
      it: 'Power Platform environments, DLP/data policies, solution pipeline.',
      en: 'Power Platform environments, DLP/data policies, solution pipeline.'
    },
    microsoft: 'Microsoft Copilot Studio / Power Platform',
    owner: 'Power Platform Admin / Platform Team'
  }),
  q({
    id: 'ai-040', area: agenticAreas.platform, track: 'advanced', weight: 3,
    question: {
      it: 'Microsoft Foundry viene usato con versioning, identità, tool governance, evaluation e osservabilità per gli agenti pro-code?',
      en: 'Is Microsoft Foundry used with versioning, identity, tool governance, evaluation, and observability for pro-code agents?'
    },
    example: {
      it: 'Agent version, model, toolbox e acceptance threshold sono tracciati prima della pubblicazione.',
      en: 'Agent version, model, toolbox, and acceptance thresholds are tracked before publishing.'
    },
    evidence: {
      it: 'Foundry project, deployment record, evaluations, traces, RBAC.',
      en: 'Foundry project, deployment record, evaluations, traces, RBAC.'
    },
    microsoft: 'Microsoft Foundry Agent Service',
    owner: 'AI Engineering / Cloud Platform'
  }),
  q({
    id: 'ai-041', area: agenticAreas.platform, track: 'advanced', weight: 3,
    question: {
      it: 'L’organizzazione usa o pianifica un control plane/registry centralizzato per scoprire e governare agenti Microsoft e non Microsoft?',
      en: 'Does the organization use or plan a centralized control plane/registry to discover and govern Microsoft and non-Microsoft agents?'
    },
    example: {
      it: 'Agent 365 o un inventario equivalente espone agenti, owner, identità, connettori e telemetria.',
      en: 'Agent 365 or an equivalent inventory exposes agents, owners, identities, connectors, and telemetry.'
    },
    evidence: {
      it: 'Agent registry, governance dashboard, ownership telemetry.',
      en: 'Agent registry, governance dashboard, ownership telemetry.'
    },
    microsoft: 'Microsoft Agent 365 / Entra Agent ID',
    owner: 'AI CoE / Security / Platform Operations'
  }),
  q({
    id: 'ai-042', area: agenticAreas.platform, track: 'advanced', weight: 2,
    question: {
      it: 'Licenze, capacità e consumo Microsoft sono mappati rispetto alle funzionalità agentiche realmente usate?',
      en: 'Are Microsoft licenses, capacity, and consumption mapped against agentic capabilities actually in use?'
    },
    example: {
      it: 'Il team conosce licenze Copilot, capacità Copilot Studio, consumo Foundry e funzionalità acquistate ma non adottate.',
      en: 'The team understands Copilot licenses, Copilot Studio capacity, Foundry consumption, and purchased capabilities not yet adopted.'
    },
    evidence: {
      it: 'License inventory, capacity report, cost dashboard, adoption report.',
      en: 'License inventory, capacity report, cost dashboard, adoption report.'
    },
    microsoft: 'Microsoft 365 Copilot / Copilot Studio / Foundry',
    owner: 'IT Finance / Procurement / Platform Admin'
  })
];
