import type { AssessmentQuestion } from '../models';
import { agenticAreas, agenticQuestion as q } from './agentic-ai-readiness.shared';

export const agenticArea4Questions: AssessmentQuestion[] = [
  q({
    id: 'ai-019', area: agenticAreas.data, track: 'essential', weight: 5,
    question: {
      it: 'Gli agenti si basano su fonti autorevoli, aggiornate e permission-aware, coerenti con ciò che l’utente è autorizzato a vedere?',
      en: 'Are agents grounded on authoritative, current, permission-aware sources consistent with what the user is authorized to see?'
    },
    example: {
      it: 'Un agente HR usa policy approvate e non restituisce documenti o dati a cui l’utente non avrebbe accesso direttamente.',
      en: 'An HR agent uses approved policies and does not return documents or data the user could not access directly.'
    },
    evidence: {
      it: 'Knowledge-source inventory, ACL test, source owner, freshness SLA.',
      en: 'Knowledge-source inventory, ACL test, source owner, freshness SLA.'
    },
    microsoft: 'Microsoft Graph / SharePoint / Copilot / Foundry',
    owner: 'Data Owner / Knowledge Owner / Security'
  }),
  q({
    id: 'ai-020', area: agenticAreas.data, track: 'advanced', weight: 3,
    question: {
      it: 'Le knowledge source hanno owner, criteri di qualità e frequenza di aggiornamento definiti?',
      en: 'Do knowledge sources have defined owners, quality criteria, and refresh cadence?'
    },
    example: {
      it: 'Policy obsolete e duplicati vengono rimossi; la fonte ufficiale è identificata e mantenuta.',
      en: 'Obsolete policies and duplicates are removed; the official source is identified and maintained.'
    },
    evidence: {
      it: 'Content governance, data owner, review calendar, quality KPI.',
      en: 'Content governance, data owner, review calendar, quality KPIs.'
    },
    microsoft: 'SharePoint / Microsoft Purview / Foundry',
    owner: 'Data Governance / Business'
  }),
  q({
    id: 'ai-021', area: agenticAreas.data, track: 'advanced', weight: 3,
    question: {
      it: 'La qualità del retrieval e del grounding viene valutata con casi di test rappresentativi?',
      en: 'Is retrieval and grounding quality evaluated with representative test cases?'
    },
    example: {
      it: 'Si misura se l’agente recupera la fonte corretta, evita contenuti obsoleti e cita evidenze pertinenti.',
      en: 'Teams measure whether the agent retrieves the correct source, avoids stale content, and cites relevant evidence.'
    },
    evidence: {
      it: 'Retrieval test set, groundedness evaluation, benchmark.',
      en: 'Retrieval test set, groundedness evaluation, benchmark.'
    },
    microsoft: 'Microsoft Foundry evaluation / Azure AI Search',
    owner: 'AI Engineering / Data Team'
  }),
  q({
    id: 'ai-022', area: agenticAreas.data, track: 'advanced', weight: 3,
    question: {
      it: 'Sono definiti dati che gli agenti non possono usare, memorizzare o inviare a determinati modelli o tool?',
      en: 'Are data categories defined that agents must not use, retain, or send to certain models or tools?'
    },
    example: {
      it: 'Dati personali, segreti industriali o informazioni regolamentate hanno policy di trattamento e destinazioni consentite.',
      en: 'Personal data, trade secrets, or regulated information have handling policies and approved destinations.'
    },
    evidence: {
      it: 'Data classification, DLP policy, model/tool allowlist, privacy requirements.',
      en: 'Data classification, DLP policy, model/tool allowlist, privacy requirements.'
    },
    microsoft: 'Microsoft Purview / Copilot Studio data policies',
    owner: 'DPO / Security / Data Governance'
  }),
  q({
    id: 'ai-023', area: agenticAreas.data, track: 'advanced', weight: 2,
    question: {
      it: 'Memoria, conversation state e dati temporanei degli agenti hanno regole di retention, cancellazione e accesso?',
      en: 'Do agent memory, conversation state, and temporary data have retention, deletion, and access rules?'
    },
    example: {
      it: 'Lo stato persistente non conserva indefinitamente dati sensibili solo perché utili alla conversazione.',
      en: 'Persistent state does not retain sensitive data indefinitely merely because it is useful to the conversation.'
    },
    evidence: {
      it: 'Retention policy, storage design, deletion process, privacy review.',
      en: 'Retention policy, storage design, deletion process, privacy review.'
    },
    microsoft: 'Microsoft Purview / Foundry storage / Copilot',
    owner: 'Privacy / Platform Team'
  })
];
