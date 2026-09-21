import type { AssessmentQuestion } from '../models';

export const area6Questions: AssessmentQuestion[] = [
  {
    "id": "35",
    "area": {
      "it": "6. AI e Copilot",
      "en": "6. AI and Copilot"
    },
    "track": "essential",
    "question": {
      "it": "È noto quali strumenti di AI generativa vengono utilizzati dagli utenti?",
      "en": "Is it known which generative AI tools users are using?"
    },
    "example": {
      "it": "Microsoft 365 Copilot, ChatGPT, Copilot web, plugin, agenti e applicazioni AI di terze parti.",
      "en": "Microsoft 365 Copilot, ChatGPT, Copilot web, plugins, agents and third-party AI applications."
    },
    "evidence": {
      "it": "Survey, Cloud Discovery, app inventory, policy aziendale.",
      "en": "Surveys, Cloud Discovery, app inventory, corporate policy."
    },
    "microsoft": "Purview Data Security Posture Management / Defender for Cloud Apps",
    "responseType": "binary",
    "owner": "CIO / Security / DPO",
    "weight": 3
  },
  {
    "id": "36",
    "area": {
      "it": "6. AI e Copilot",
      "en": "6. AI and Copilot"
    },
    "track": "essential",
    "question": {
      "it": "Esiste una policy chiara su quali dati possono essere inseriti negli strumenti AI?",
      "en": "Is there a clear policy on which data may be entered into AI tools?"
    },
    "example": {
      "it": "È vietato incollare dati di minori, sanitari, disciplinari o credenziali in strumenti non autorizzati.",
      "en": "Users must not paste minors' data, health data, disciplinary data or credentials into unauthorized tools."
    },
    "evidence": {
      "it": "AI acceptable use policy, comunicazioni, training.",
      "en": "AI acceptable-use policy, communications, training."
    },
    "microsoft": "Purview / Compliance",
    "responseType": "scale",
    "owner": "DPO / Legal / Security",
    "weight": 3
  },
  {
    "id": "37",
    "area": {
      "it": "6. AI e Copilot",
      "en": "6. AI and Copilot"
    },
    "track": "essential",
    "question": {
      "it": "I dati sovraesposti vengono corretti prima di estendere Copilot?",
      "en": "Is overexposed data remediated before Copilot is expanded?"
    },
    "example": {
      "it": "Un utente non deve trovare tramite Copilot documenti SharePoint che già oggi risultano accessibili per errore.",
      "en": "A user should not discover through Copilot SharePoint documents that are already incorrectly accessible today."
    },
    "evidence": {
      "it": "Permission analysis, oversharing report, remediation backlog.",
      "en": "Permission analysis, oversharing reports, remediation backlog."
    },
    "microsoft": "Purview Data Security Posture Management / SharePoint",
    "responseType": "scale",
    "owner": "M365 / Data Owner",
    "weight": 3
  },
  {
    "id": "38",
    "area": {
      "it": "6. AI e Copilot",
      "en": "6. AI and Copilot"
    },
    "track": "advanced",
    "question": {
      "it": "Sono disponibili alert o controlli sull'uso rischioso dell'AI?",
      "en": "Are alerts or controls available for risky AI usage?"
    },
    "example": {
      "it": "Rilevare prompt con dati sensibili, upload verso app AI non autorizzate o condivisione di contenuti protetti.",
      "en": "Detect prompts containing sensitive data, uploads to unauthorized AI apps or sharing of protected content."
    },
    "evidence": {
      "it": "DSPM for AI, DLP policy, activity explorer.",
      "en": "DSPM for AI, DLP policies, Activity Explorer."
    },
    "microsoft": "Purview Data Security Posture Management / DLP",
    "responseType": "binary",
    "owner": "Security / DPO",
    "weight": 2
  },
  {
    "id": "39",
    "area": {
      "it": "6. AI e Copilot",
      "en": "6. AI and Copilot"
    },
    "track": "advanced",
    "question": {
      "it": "L'adozione di Copilot include misure di governance, ownership e misurazione?",
      "en": "Does Copilot adoption include governance, ownership and measurement?"
    },
    "example": {
      "it": "Pilot con gruppi selezionati, criteri di successo, gestione agenti, revisione permessi e training.",
      "en": "Pilot with selected groups, success criteria, agent management, permission reviews and training."
    },
    "evidence": {
      "it": "Pilot plan, adoption report, agent inventory, RACI.",
      "en": "Pilot plan, adoption report, agent inventory, RACI."
    },
    "microsoft": "Microsoft 365 Copilot / Purview",
    "responseType": "scale",
    "owner": "CIO / M365 Owner",
    "weight": 2
  }
];
