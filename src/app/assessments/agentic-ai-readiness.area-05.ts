import type { AssessmentQuestion } from '../models';
import { agenticAreas, agenticQuestion as q } from './agentic-ai-readiness.shared';

export const agenticArea5Questions: AssessmentQuestion[] = [
  q({
    id: 'ai-024', area: agenticAreas.identity, track: 'essential', weight: 5,
    question: {
      it: 'Esiste un inventario degli agenti e delle identità non umane, con owner o sponsor umano chiaramente assegnato?',
      en: 'Is there an inventory of agents and non-human identities with a clearly assigned human owner or sponsor?'
    },
    example: {
      it: 'Agenti Copilot Studio, Foundry e soluzioni custom sono censiti insieme a identità, publisher, ambiente, owner e stato.',
      en: 'Copilot Studio, Foundry, and custom agents are inventoried with identity, publisher, environment, owner, and status.'
    },
    evidence: {
      it: 'Agent registry, Entra inventory, CMDB, sponsor assignment.',
      en: 'Agent registry, Entra inventory, CMDB, sponsor assignment.'
    },
    microsoft: 'Microsoft Agent 365 / Entra Agent ID',
    owner: 'Identity / AI CoE / Platform Team'
  }),
  q({
    id: 'ai-025', area: agenticAreas.identity, track: 'essential', weight: 5,
    question: {
      it: 'Gli agenti applicano least privilege e possono essere rapidamente disabilitati o privati degli accessi in caso di incidente?',
      en: 'Do agents follow least privilege and can they be rapidly disabled or stripped of access during an incident?'
    },
    example: {
      it: 'Un agente può leggere solo i repository o sistemi necessari; accessi e tool possono essere revocati senza attendere modifiche applicative.',
      en: 'An agent can read only required repositories or systems; access and tools can be revoked without waiting for application changes.'
    },
    evidence: {
      it: 'RBAC, access package, emergency disable procedure, access review.',
      en: 'RBAC, access package, emergency disable procedure, access review.'
    },
    microsoft: 'Entra Agent ID / Agent 365 / Conditional Access',
    owner: 'Identity / Security'
  }),
  q({
    id: 'ai-026', area: agenticAreas.identity, track: 'advanced', weight: 3,
    question: {
      it: 'L’architettura distingue correttamente quando l’agente agisce on-behalf-of dell’utente e quando opera autonomamente con una propria identità?',
      en: 'Does the architecture correctly distinguish when an agent acts on behalf of a user and when it operates autonomously with its own identity?'
    },
    example: {
      it: 'Le azioni interattive ereditano il contesto utente quando appropriato; i job autonomi non impersonano utenti in modo improprio.',
      en: 'Interactive actions inherit user context where appropriate; autonomous jobs do not improperly impersonate users.'
    },
    evidence: {
      it: 'Auth flow, token design, identity blueprint, architecture diagram.',
      en: 'Auth flow, token design, identity blueprint, architecture diagram.'
    },
    microsoft: 'Microsoft Entra Agent ID',
    owner: 'Identity Architect / Solution Architect'
  }),
  q({
    id: 'ai-027', area: agenticAreas.identity, track: 'advanced', weight: 3,
    question: {
      it: 'Secret e credenziali statiche sono minimizzati in favore di identità gestite, federazione e credenziali a breve durata?',
      en: 'Are static secrets and credentials minimized in favor of managed identities, federation, and short-lived credentials?'
    },
    example: {
      it: 'Le integrazioni Azure usano managed identity dove supportato e i secret residui hanno rotation e vaulting.',
      en: 'Azure integrations use managed identity where supported and remaining secrets have rotation and vaulting.'
    },
    evidence: {
      it: 'Managed identity inventory, Key Vault, secret rotation report.',
      en: 'Managed identity inventory, Key Vault, secret rotation report.'
    },
    microsoft: 'Microsoft Entra / Managed identities / Key Vault',
    owner: 'Cloud Platform / Security'
  }),
  q({
    id: 'ai-028', area: agenticAreas.identity, track: 'advanced', weight: 3,
    question: {
      it: 'Sono applicati controlli di rete, sessione, autenticazione e data exfiltration coerenti con il rischio dell’agente?',
      en: 'Are network, session, authentication, and data-exfiltration controls applied consistently with agent risk?'
    },
    example: {
      it: 'Agenti ad alto rischio usano endpoint privati, policy di accesso, DLP e allowlist di destinazioni/tool.',
      en: 'Higher-risk agents use private endpoints, access policies, DLP, and destination/tool allowlists.'
    },
    evidence: {
      it: 'Network architecture, Conditional Access, DLP, firewall or egress policy.',
      en: 'Network architecture, Conditional Access, DLP, firewall or egress policy.'
    },
    microsoft: 'Entra / Purview / Foundry network isolation',
    owner: 'Security Architecture / Cloud Platform'
  }),
  q({
    id: 'ai-029', area: agenticAreas.identity, track: 'advanced', weight: 3,
    question: {
      it: 'Accessi e sponsor degli agenti vengono ricertificati lungo il lifecycle e rimossi quando l’agente viene ritirato?',
      en: 'Are agent access and sponsors recertified through the lifecycle and removed when the agent is retired?'
    },
    example: {
      it: 'Cambio di owner, inattività o retirement avviano review e revoca degli accessi associati.',
      en: 'Owner changes, inactivity, or retirement trigger review and revocation of associated access.'
    },
    evidence: {
      it: 'Access review, lifecycle workflow, retirement checklist.',
      en: 'Access review, lifecycle workflow, retirement checklist.'
    },
    microsoft: 'Entra ID Governance / Agent lifecycle',
    owner: 'Identity Governance / AI CoE'
  })
];
