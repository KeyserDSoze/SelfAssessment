import type { AssessmentQuestion } from '../models';

export const area10Questions: AssessmentQuestion[] = [
  {
    "id": "58",
    "area": {
      "it": "10. Incident response e fornitori",
      "en": "10. Incident response and suppliers"
    },
    "track": "essential",
    "question": {
      "it": "Esistono playbook testati per phishing, account compromesso e fuga di dati?",
      "en": "Are tested playbooks available for phishing, compromised accounts and data leakage?"
    },
    "example": {
      "it": "Per ogni scenario sono definiti rilevazione, triage, contenimento, comunicazione, privacy e ripristino.",
      "en": "For each scenario, detection, triage, containment, communication, privacy and recovery are defined."
    },
    "evidence": {
      "it": "Incident response plan, tabletop, evidenza test.",
      "en": "Incident response plan, tabletop exercises, test evidence."
    },
    "microsoft": "Defender XDR / Purview / Sentinel",
    "responseType": "scale",
    "owner": "CISO / DPO / IT",
    "weight": 3
  },
  {
    "id": "59",
    "area": {
      "it": "10. Incident response e fornitori",
      "en": "10. Incident response and suppliers"
    },
    "track": "essential",
    "question": {
      "it": "FIGC mantiene visibilità e capacità decisionale anche quando il servizio è gestito da consulenti?",
      "en": "Does the organization retain visibility and decision-making capability when services are managed by consultants?"
    },
    "example": {
      "it": "Accesso ai portali, report comprensibili, knowledge transfer e diritto di verificare configurazioni e incidenti.",
      "en": "Access to portals, understandable reporting, knowledge transfer and the right to review configurations and incidents."
    },
    "evidence": {
      "it": "Access model, reporting pack, RACI, service review.",
      "en": "Access model, reporting pack, RACI, service reviews."
    },
    "microsoft": "Defender XDR / Managed SOC",
    "responseType": "scale",
    "owner": "CIO / Vendor Manager",
    "weight": 3
  },
  {
    "id": "60",
    "area": {
      "it": "10. Incident response e fornitori",
      "en": "10. Incident response and suppliers"
    },
    "track": "essential",
    "question": {
      "it": "Gli incidenti che coinvolgono dati sensibili includono subito Privacy e Legal?",
      "en": "Do incidents involving sensitive data immediately include Privacy and Legal?"
    },
    "example": {
      "it": "Un potenziale data breach attiva valutazione del dato impattato, obblighi e comunicazioni.",
      "en": "A potential data breach triggers an assessment of impacted data, obligations and communications."
    },
    "evidence": {
      "it": "Escalation matrix, breach procedure, ticket evidence.",
      "en": "Escalation matrix, breach procedure, ticket evidence."
    },
    "microsoft": "Purview / Compliance",
    "responseType": "scale",
    "owner": "DPO / Legal / Security",
    "weight": 3
  },
  {
    "id": "61",
    "area": {
      "it": "10. Incident response e fornitori",
      "en": "10. Incident response and suppliers"
    },
    "track": "advanced",
    "question": {
      "it": "Gli incidenti vengono analizzati per correggere controlli e non solo chiusi?",
      "en": "Are incidents analyzed to improve controls rather than only closed?"
    },
    "example": {
      "it": "Dopo un phishing riuscito si aggiornano policy, training, DLP, Conditional Access o protezioni endpoint.",
      "en": "After a successful phishing attack, policies, training, DLP, Conditional Access or endpoint protections are updated."
    },
    "evidence": {
      "it": "Post-incident review, lessons learned, action tracking.",
      "en": "Post-incident reviews, lessons learned, action tracking."
    },
    "microsoft": "Defender XDR / Sentinel / Purview",
    "responseType": "scale",
    "owner": "Security Governance",
    "weight": 2
  },
  {
    "id": "62",
    "area": {
      "it": "10. Incident response e fornitori",
      "en": "10. Incident response and suppliers"
    },
    "track": "advanced",
    "question": {
      "it": "I fornitori critici sono valutati anche per accessi, dati e capacità di risposta?",
      "en": "Are critical suppliers assessed for access, data handling and response capability?"
    },
    "example": {
      "it": "Consulenti, cloud provider e società con account guest hanno requisiti di sicurezza, logging e revoca.",
      "en": "Consultants, cloud providers and organizations with guest accounts have security, logging and revocation requirements."
    },
    "evidence": {
      "it": "Security clauses, supplier assessment, access review.",
      "en": "Security clauses, supplier assessments, access reviews."
    },
    "microsoft": "Entra / Purview / Defender",
    "responseType": "scale",
    "owner": "Procurement / Vendor Risk",
    "weight": 2
  }
];
