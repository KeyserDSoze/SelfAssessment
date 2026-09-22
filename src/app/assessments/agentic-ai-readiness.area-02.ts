import type { AssessmentQuestion } from '../models';
import { agenticAreas, agenticQuestion as q } from './agentic-ai-readiness.shared';

export const agenticArea2Questions: AssessmentQuestion[] = [
  q({
    id: 'ai-007', area: agenticAreas.mindset, track: 'essential', weight: 5,
    question: {
      it: 'Per ogni agente è identificata una persona o funzione umana che rimane accountable per comportamento, risultati e rischio?',
      en: 'For every agent, is a human person or function identified as accountable for behavior, outcomes, and risk?'
    },
    example: {
      it: 'Nel RACI l’AI può eseguire attività, ma non compare mai come soggetto finale a cui attribuire la responsabilità.',
      en: 'In the RACI, AI may execute tasks, but it is never the final party to whom accountability is assigned.'
    },
    evidence: {
      it: 'RACI, agent registry, owner e sponsor, policy di governance.',
      en: 'RACI, agent registry, owner and sponsor, governance policy.'
    },
    microsoft: 'Responsible AI / Agent 365 / Entra Agent ID',
    owner: 'Business Owner / AI CoE / Risk'
  }),
  q({
    id: 'ai-008', area: agenticAreas.mindset, track: 'essential', weight: 5,
    question: {
      it: 'Quando un agente sbaglia, l’organizzazione analizza processo, dati, istruzioni, modello, tool, permessi e supervisione invece di limitarsi a dire “è colpa dell’AI”?',
      en: 'When an agent fails, does the organization analyze process, data, instructions, model, tools, permissions, and oversight instead of simply saying “the AI was wrong”?'
    },
    example: {
      it: 'Un errore viene trattato come incidente di sistema con root-cause analysis e azioni correttive verificabili.',
      en: 'A failure is treated as a system incident with root-cause analysis and verifiable corrective actions.'
    },
    evidence: {
      it: 'Post-mortem, incident record, corrective action, change log.',
      en: 'Post-mortem, incident record, corrective action, change log.'
    },
    microsoft: 'Responsible AI accountability / Agent operations',
    owner: 'Business Owner / Operations / AI CoE'
  }),
  q({
    id: 'ai-009', area: agenticAreas.mindset, track: 'advanced', weight: 3,
    question: {
      it: 'Sono espliciti i decision rights: cosa può decidere un agente, cosa può solo proporre e cosa richiede approvazione umana?',
      en: 'Are decision rights explicit: what may an agent decide, what may it only propose, and what requires human approval?'
    },
    example: {
      it: 'Classificare una richiesta può essere autonomo; effettuare un pagamento o modificare un contratto richiede approvazione.',
      en: 'Classifying a request may be autonomous; making a payment or changing a contract requires approval.'
    },
    evidence: {
      it: 'Autonomy matrix, approval policy, workflow di escalation.',
      en: 'Autonomy matrix, approval policy, escalation workflow.'
    },
    microsoft: 'Responsible AI / Govern agents by risk',
    owner: 'Business / Risk / Legal'
  }),
  q({
    id: 'ai-010', area: agenticAreas.mindset, track: 'advanced', weight: 3,
    question: {
      it: 'Gli utenti sono formati a delegare lavoro all’AI senza delegare verifica, giudizio professionale e responsabilità?',
      en: 'Are users trained to delegate work to AI without delegating verification, professional judgment, and responsibility?'
    },
    example: {
      it: '“L’ha scritto Copilot” non è considerato un criterio sufficiente per accettare un deliverable.',
      en: '“Copilot wrote it” is not considered a sufficient acceptance criterion for a deliverable.'
    },
    evidence: {
      it: 'Training, acceptable-use policy, quality checklist.',
      en: 'Training, acceptable-use policy, quality checklist.'
    },
    microsoft: 'Microsoft Responsible AI',
    owner: 'HR / Business / Responsible AI Lead'
  }),
  q({
    id: 'ai-011', area: agenticAreas.mindset, track: 'advanced', weight: 3,
    question: {
      it: 'Le persone possono contestare, correggere, interrompere o fare escalation rispetto alle azioni dell’agente senza attriti organizzativi?',
      en: 'Can people challenge, correct, stop, or escalate agent actions without organizational friction?'
    },
    example: {
      it: 'Il processo non penalizza chi blocca un’automazione quando rileva rischio o contesto non previsto.',
      en: 'The process does not penalize someone who stops automation after detecting risk or an unforeseen context.'
    },
    evidence: {
      it: 'Escalation path, stop procedure, feedback channel.',
      en: 'Escalation path, stop procedure, feedback channel.'
    },
    microsoft: 'Human oversight / Responsible AI',
    owner: 'Business Owner / Operations'
  }),
  q({
    id: 'ai-012', area: agenticAreas.mindset, track: 'advanced', weight: 2,
    question: {
      it: 'I team distinguono chiaramente la responsabilità per contenuto generato, decisione finale, esecuzione tecnica e controllo del sistema?',
      en: 'Do teams clearly distinguish responsibility for generated content, final decisions, technical execution, and system control?'
    },
    example: {
      it: 'Maker, process owner, approver e platform owner hanno responsabilità diverse e documentate.',
      en: 'Maker, process owner, approver, and platform owner have different documented responsibilities.'
    },
    evidence: {
      it: 'RACI operativo, job description, operating model.',
      en: 'Operational RACI, job descriptions, operating model.'
    },
    microsoft: 'Agents Center of Excellence roles and responsibilities',
    owner: 'AI CoE / HR / Business'
  })
];
