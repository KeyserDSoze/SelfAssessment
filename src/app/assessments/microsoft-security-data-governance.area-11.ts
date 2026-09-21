import type { AssessmentQuestion } from '../models';

export const area11Questions: AssessmentQuestion[] = [
  {
    "id": "63",
    "area": {
      "it": "11. Awareness e miglioramento continuo",
      "en": "11. Awareness and continuous improvement"
    },
    "track": "essential",
    "question": {
      "it": "La formazione distingue i comportamenti richiesti per dati, phishing, condivisione e AI?",
      "en": "Does awareness training distinguish expected behaviors for data, phishing, sharing and AI?"
    },
    "example": {
      "it": "Esempi specifici: riconoscere phishing, applicare label, evitare link anonimi, non caricare dati sensibili in AI pubbliche.",
      "en": "Specific examples: recognize phishing, apply labels, avoid anonymous links and do not upload sensitive data to public AI tools."
    },
    "evidence": {
      "it": "Piano awareness, contenuti, test, comunicazioni.",
      "en": "Awareness plan, content, tests, communications."
    },
    "microsoft": "Microsoft Security / Purview",
    "responseType": "scale",
    "owner": "Security Awareness / HR",
    "weight": 3
  },
  {
    "id": "64",
    "area": {
      "it": "11. Awareness e miglioramento continuo",
      "en": "11. Awareness and continuous improvement"
    },
    "track": "essential",
    "question": {
      "it": "La formazione è differenziata per ruoli a maggiore rischio?",
      "en": "Is training differentiated for higher-risk roles?"
    },
    "example": {
      "it": "Dirigenti, amministratori, HR, Legal, chi gestisce minori o dati sanitari ricevono scenari mirati.",
      "en": "Executives, administrators, HR, Legal and staff handling minors or health data receive targeted scenarios."
    },
    "evidence": {
      "it": "Role-based training, attendance, assessment.",
      "en": "Role-based training, attendance, assessments."
    },
    "microsoft": "Purview / Defender / Entra",
    "responseType": "scale",
    "owner": "HR / Security / DPO",
    "weight": 3
  },
  {
    "id": "65",
    "area": {
      "it": "11. Awareness e miglioramento continuo",
      "en": "11. Awareness and continuous improvement"
    },
    "track": "essential",
    "question": {
      "it": "Gli utenti sanno dove chiedere supporto o segnalare un comportamento anomalo?",
      "en": "Do users know where to ask for support or report suspicious behavior?"
    },
    "example": {
      "it": "Pulsante report phishing, canale per DLP false positive, contatto per condivisioni esterne o classificazione.",
      "en": "Report-phishing button, channel for DLP false positives, contact for external sharing or classification questions."
    },
    "evidence": {
      "it": "Support process, mailbox/channel, ticket statistics.",
      "en": "Support process, mailbox/channel, ticket statistics."
    },
    "microsoft": "Defender for Office 365 / Purview",
    "responseType": "binary",
    "owner": "Service Desk / Security",
    "weight": 3
  },
  {
    "id": "66",
    "area": {
      "it": "11. Awareness e miglioramento continuo",
      "en": "11. Awareness and continuous improvement"
    },
    "track": "advanced",
    "question": {
      "it": "Sono utilizzati dati reali degli alert per migliorare l'awareness?",
      "en": "Is real alert data used to improve awareness?"
    },
    "example": {
      "it": "Le campagne si concentrano su reparti con più override DLP, phishing segnalato male o condivisioni esterne.",
      "en": "Campaigns focus on departments with more DLP overrides, poorly reported phishing or excessive external sharing."
    },
    "evidence": {
      "it": "KPI awareness, DLP trends, phishing simulation report.",
      "en": "Awareness KPIs, DLP trends, phishing simulation reports."
    },
    "microsoft": "Purview / Defender",
    "responseType": "scale",
    "owner": "Security Awareness",
    "weight": 2
  },
  {
    "id": "67",
    "area": {
      "it": "11. Awareness e miglioramento continuo",
      "en": "11. Awareness and continuous improvement"
    },
    "track": "advanced",
    "question": {
      "it": "Il self-assessment viene ripetuto e trasformato in un piano di miglioramento?",
      "en": "Is the self-assessment repeated and converted into an improvement plan?"
    },
    "example": {
      "it": "Riesame semestrale, owner per ogni gap, target di maturità e verifica delle evidenze.",
      "en": "Semiannual review, owner for each gap, target maturity and evidence verification."
    },
    "evidence": {
      "it": "Calendario review, action plan, score trend.",
      "en": "Review calendar, action plan, score trend."
    },
    "microsoft": "Governance trasversale",
    "responseType": "scale",
    "owner": "CIO / CISO",
    "weight": 2
  }
];
