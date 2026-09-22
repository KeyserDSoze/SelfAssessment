import type { AssessmentQuestion } from '../models';
import { agenticAreas, agenticQuestion as q } from './agentic-ai-readiness.shared';

export const agenticArea6Questions: AssessmentQuestion[] = [
  q({
    id: 'ai-030', area: agenticAreas.governance, track: 'essential', weight: 5,
    question: {
      it: 'L’organizzazione sa classificare i propri sistemi e agenti AI per ruolo, finalità e rischio rispetto all’EU AI Act?',
      en: 'Can the organization classify its AI systems and agents by role, purpose, and risk under the EU AI Act?'
    },
    example: {
      it: 'Per ogni caso d’uso si valuta almeno se l’organizzazione è provider o deployer, se ricadono divieti, obblighi di trasparenza o scenari high-risk.',
      en: 'For each use case, the organization assesses at least whether it is a provider or deployer and whether prohibitions, transparency duties, or high-risk scenarios apply.'
    },
    evidence: {
      it: 'AI inventory, legal classification, risk tier, accountable owner.',
      en: 'AI inventory, legal classification, risk tier, accountable owner.'
    },
    microsoft: 'Responsible AI / Microsoft Purview / Agent governance',
    owner: 'Legal / Compliance / Responsible AI Lead'
  }),
  q({
    id: 'ai-031', area: agenticAreas.governance, track: 'essential', weight: 5,
    question: {
      it: 'Esiste un programma di AI literacy proporzionato ai ruoli di chi sviluppa, amministra, supervisiona o utilizza sistemi AI?',
      en: 'Is there an AI literacy program proportionate to the roles of people who build, administer, supervise, or use AI systems?'
    },
    example: {
      it: 'Maker, approver, sviluppatori, utenti business e amministratori ricevono contenuti diversi su limiti, rischio, dati e supervisione.',
      en: 'Makers, approvers, developers, business users, and administrators receive different content on limits, risk, data, and oversight.'
    },
    evidence: {
      it: 'Training plan, role matrix, attendance, assessment e aggiornamenti.',
      en: 'Training plan, role matrix, attendance, assessments, and refreshers.'
    },
    microsoft: 'Responsible AI / AI skilling',
    owner: 'HR / Compliance / AI CoE'
  }),
  q({
    id: 'ai-032', area: agenticAreas.governance, track: 'essential', weight: 5,
    question: {
      it: 'Le azioni con impatto rilevante su persone, denaro, diritti o compliance prevedono supervisione umana, escalation e possibilità di override?',
      en: 'Do actions materially affecting people, money, rights, or compliance include human oversight, escalation, and override capability?'
    },
    example: {
      it: 'Decisioni HR, pagamenti, accessi, comunicazioni legali o casi ambigui non vengono lasciati a un agente senza controllo proporzionato.',
      en: 'HR decisions, payments, access, legal communications, or ambiguous cases are not left to an agent without proportionate oversight.'
    },
    evidence: {
      it: 'Human-oversight design, approval flow, override and escalation procedure.',
      en: 'Human-oversight design, approval flow, override and escalation procedure.'
    },
    microsoft: 'Microsoft Responsible AI / Govern agents by risk',
    owner: 'Business Owner / Risk / Legal'
  }),
  q({
    id: 'ai-033', area: agenticAreas.governance, track: 'advanced', weight: 4,
    question: {
      it: 'Ogni nuovo caso d’uso viene sottoposto a screening per pratiche vietate o incompatibili con policy e principi di Responsible AI?',
      en: 'Is every new use case screened for prohibited practices or conflicts with policy and Responsible AI principles?'
    },
    example: {
      it: 'L’intake blocca scenari vietati e indirizza i casi ad alto impatto verso una review più approfondita.',
      en: 'Intake blocks prohibited scenarios and routes higher-impact cases to deeper review.'
    },
    evidence: {
      it: 'Risk intake, prohibited-use checklist, approval record.',
      en: 'Risk intake, prohibited-use checklist, approval record.'
    },
    microsoft: 'Responsible AI release gate',
    owner: 'Legal / Risk / Responsible AI Lead'
  }),
  q({
    id: 'ai-034', area: agenticAreas.governance, track: 'advanced', weight: 3,
    question: {
      it: 'Sono implementati gli obblighi di trasparenza applicabili, inclusa l’informazione agli utenti quando interagiscono con AI dove richiesto?',
      en: 'Are applicable transparency duties implemented, including informing users when they interact with AI where required?'
    },
    example: {
      it: 'Chatbot e agenti esterni dichiarano la natura AI; contenuti sintetici seguono le regole applicabili di disclosure e marcatura.',
      en: 'External chatbots and agents disclose their AI nature; synthetic content follows applicable disclosure and marking rules.'
    },
    evidence: {
      it: 'UX disclosure, communication standard, synthetic-content policy.',
      en: 'UX disclosure, communication standard, synthetic-content policy.'
    },
    microsoft: 'Responsible AI transparency / Copilot experiences',
    owner: 'Legal / UX / Communications'
  }),
  q({
    id: 'ai-035', area: agenticAreas.governance, track: 'advanced', weight: 4,
    question: {
      it: 'Per i casi potenzialmente high-risk esistono processi per documentazione, logging, qualità, rischio, supervisione e monitoraggio proporzionati?',
      en: 'For potentially high-risk cases, are there proportionate processes for documentation, logging, quality, risk, oversight, and monitoring?'
    },
    example: {
      it: 'Il team sa quali evidenze dovrà mantenere e non aspetta la deadline normativa per costruire tracciabilità e controlli.',
      en: 'The team knows which evidence it must retain and does not wait for the regulatory deadline to build traceability and controls.'
    },
    evidence: {
      it: 'Compliance plan, technical documentation, logs, risk file, monitoring plan.',
      en: 'Compliance plan, technical documentation, logs, risk file, monitoring plan.'
    },
    microsoft: 'Purview Audit / Responsible AI / Agent observability',
    owner: 'Compliance / Security / Product Owner'
  }),
  q({
    id: 'ai-036', area: agenticAreas.governance, track: 'advanced', weight: 4,
    question: {
      it: 'Privacy, security e Responsible AI sono trattate come release gate e come controllo continuo, non come verifica una tantum?',
      en: 'Are privacy, security, and Responsible AI treated as release gates and continuous controls rather than one-time checks?'
    },
    example: {
      it: 'Modifiche a modello, dati, tool o autonomia possono richiedere nuova valutazione e aggiornamento del rischio.',
      en: 'Changes to model, data, tools, or autonomy can trigger reassessment and risk updates.'
    },
    evidence: {
      it: 'DPIA/AI impact assessment, release checklist, periodic review, change trigger.',
      en: 'DPIA/AI impact assessment, release checklist, periodic review, change trigger.'
    },
    microsoft: 'Microsoft Responsible AI / Security governance',
    owner: 'DPO / Security / Responsible AI Lead'
  })
];
