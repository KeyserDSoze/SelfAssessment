import type { AssessmentQuestion } from '../models';
import { agenticAreas, agenticQuestion as q } from './agentic-ai-readiness.shared';

export const agenticArea11Questions: AssessmentQuestion[] = [
  q({
    id: 'ai-059', area: agenticAreas.adoption, track: 'essential', weight: 4,
    question: {
      it: 'Adozione e formazione sono differenziate per ruolo e includono limiti, supervisione, dati, sicurezza e comportamenti attesi con gli agenti?',
      en: 'Are adoption and training tailored by role and do they cover limits, oversight, data, security, and expected behaviors with agents?'
    },
    example: {
      it: 'Manager, maker, developer, approver e utente finale ricevono percorsi diversi e sanno dove chiedere supporto.',
      en: 'Managers, makers, developers, approvers, and end users receive different learning paths and know where to get support.'
    },
    evidence: {
      it: 'Role-based curriculum, adoption plan, support channel, completion metrics.',
      en: 'Role-based curriculum, adoption plan, support channel, completion metrics.'
    },
    microsoft: 'Microsoft Copilot adoption / Responsible AI',
    owner: 'HR / Adoption Lead / AI CoE'
  }),
  q({
    id: 'ai-060', area: agenticAreas.adoption, track: 'advanced', weight: 3,
    question: {
      it: 'Esiste un operating model, centralizzato o federato, che assegna decision rights a CoE/AI Council, business, security e platform team?',
      en: 'Is there a centralized or federated operating model assigning decision rights across the CoE/AI Council, business, security, and platform teams?'
    },
    example: {
      it: 'Il CoE definisce standard e guardrail; i domain owner governano valore e operation entro quei limiti.',
      en: 'The CoE defines standards and guardrails; domain owners govern value and operations within those boundaries.'
    },
    evidence: {
      it: 'Operating model, governance charter, RACI, decision rights.',
      en: 'Operating model, governance charter, RACI, decision rights.'
    },
    microsoft: 'Agents Center of Excellence',
    owner: 'CIO / AI CoE / Enterprise Architecture'
  }),
  q({
    id: 'ai-061', area: agenticAreas.adoption, track: 'advanced', weight: 3,
    question: {
      it: 'L’organizzazione misura adozione, fiducia, qualità percepita e valore reale, evitando metriche di vanità come il solo numero di prompt?',
      en: 'Does the organization measure adoption, trust, perceived quality, and realized value while avoiding vanity metrics such as prompt count alone?'
    },
    example: {
      it: 'Si osservano utenti attivi, task completati, tempo risparmiato validato, NPS/feedback, escalation e outcome di business.',
      en: 'Teams track active users, completed tasks, validated time saved, NPS/feedback, escalations, and business outcomes.'
    },
    evidence: {
      it: 'Adoption dashboard, survey, value realization report, telemetry.',
      en: 'Adoption dashboard, survey, value-realization report, telemetry.'
    },
    microsoft: 'Microsoft 365 Copilot adoption / Agent analytics',
    owner: 'Adoption Lead / Business Owner'
  }),
  q({
    id: 'ai-062', area: agenticAreas.adoption, track: 'advanced', weight: 2,
    question: {
      it: 'La readiness agentica viene riesaminata periodicamente e trasformata in un piano di miglioramento con owner e target?',
      en: 'Is agentic readiness reassessed periodically and converted into an improvement plan with owners and targets?'
    },
    example: {
      it: 'Il self-assessment viene ripetuto dopo 6–12 mesi e i gap prioritari entrano in una roadmap verificabile.',
      en: 'The self-assessment is repeated after 6–12 months and priority gaps enter a verifiable roadmap.'
    },
    evidence: {
      it: 'Assessment history, action plan, target maturity, review calendar.',
      en: 'Assessment history, action plan, target maturity, review calendar.'
    },
    microsoft: 'Agentic AI maturity model / Continuous improvement',
    owner: 'AI CoE / CIO'
  })
];
