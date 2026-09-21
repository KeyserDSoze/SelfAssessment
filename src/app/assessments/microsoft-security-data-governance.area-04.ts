import type { AssessmentQuestion } from '../models';

export const area4Questions: AssessmentQuestion[] = [
  {
    "id": "21",
    "area": {
      "it": "4. Data Loss Prevention",
      "en": "4. Data Loss Prevention"
    },
    "track": "essential",
    "question": {
      "it": "Sono attive policy DLP su Exchange, SharePoint, OneDrive e Teams?",
      "en": "Are DLP policies active across Exchange, SharePoint, OneDrive and Teams?"
    },
    "example": {
      "it": "Un'email o un file con dati personali inviato a un destinatario esterno genera avviso o blocco.",
      "en": "An email or file containing personal data sent to an external recipient triggers a warning or block."
    },
    "evidence": {
      "it": "Elenco DLP policy, workload coperti, test policy.",
      "en": "DLP policy list, covered workloads, policy tests."
    },
    "microsoft": "Purview Data Loss Prevention",
    "responseType": "binary",
    "owner": "M365 Security Admin",
    "weight": 3
  },
  {
    "id": "22",
    "area": {
      "it": "4. Data Loss Prevention",
      "en": "4. Data Loss Prevention"
    },
    "track": "essential",
    "question": {
      "it": "Le policy DLP sono costruite su scenari di rischio reali e non solo su template generici?",
      "en": "Are DLP policies built around real risk scenarios rather than only generic templates?"
    },
    "example": {
      "it": "Condivisione di dati personali, documenti HR, informazioni finanziarie o contratti riservati verso domini esterni.",
      "en": "Sharing personal data, HR documents, financial information or confidential contracts with external domains."
    },
    "evidence": {
      "it": "Use case, criteri policy, stakeholder approval.",
      "en": "Use cases, policy criteria, stakeholder approval."
    },
    "microsoft": "Purview DLP",
    "responseType": "scale",
    "owner": "Security / DPO / Business",
    "weight": 3
  },
  {
    "id": "23",
    "area": {
      "it": "4. Data Loss Prevention",
      "en": "4. Data Loss Prevention"
    },
    "track": "essential",
    "question": {
      "it": "Le policy vengono prima testate in simulazione o audit prima del blocco?",
      "en": "Are DLP policies first tested in simulation or audit mode before blocking?"
    },
    "example": {
      "it": "Si misura il numero di falsi positivi e l'impatto sugli utenti prima di rendere la regola bloccante.",
      "en": "False positives and user impact are measured before a rule becomes blocking."
    },
    "evidence": {
      "it": "Simulation report, periodo di tuning, change record.",
      "en": "Simulation reports, tuning period, change records."
    },
    "microsoft": "Purview DLP",
    "responseType": "scale",
    "owner": "Security Operations",
    "weight": 3
  },
  {
    "id": "24",
    "area": {
      "it": "4. Data Loss Prevention",
      "en": "4. Data Loss Prevention"
    },
    "track": "essential",
    "question": {
      "it": "Gli utenti ricevono policy tip comprensibili e indicazioni su come comportarsi?",
      "en": "Do users receive understandable policy tips and guidance on what to do?"
    },
    "example": {
      "it": "Un messaggio spiega perché un allegato non può uscire e quale canale autorizzato usare.",
      "en": "A message explains why an attachment cannot leave the organization and which approved channel should be used instead."
    },
    "evidence": {
      "it": "Test policy tip, testo messaggi, feedback utenti.",
      "en": "Policy tip tests, message text, user feedback."
    },
    "microsoft": "Purview DLP",
    "responseType": "scale",
    "owner": "Security / Awareness",
    "weight": 3
  },
  {
    "id": "25",
    "area": {
      "it": "4. Data Loss Prevention",
      "en": "4. Data Loss Prevention"
    },
    "track": "essential",
    "question": {
      "it": "Gli alert DLP hanno un owner, una priorità e tempi di gestione definiti?",
      "en": "Do DLP alerts have an owner, priority and defined handling times?"
    },
    "example": {
      "it": "Un alert su invio massivo di dati riservati viene assegnato, investigato e chiuso entro SLA.",
      "en": "An alert for bulk sending of confidential data is assigned, investigated and closed within SLA."
    },
    "evidence": {
      "it": "Coda alert, ticket, playbook, SLA.",
      "en": "Alert queue, tickets, playbooks, SLAs."
    },
    "microsoft": "Purview DLP / Defender portal",
    "responseType": "scale",
    "owner": "SOC / Security",
    "weight": 3
  },
  {
    "id": "26",
    "area": {
      "it": "4. Data Loss Prevention",
      "en": "4. Data Loss Prevention"
    },
    "track": "essential",
    "question": {
      "it": "È controllata l'uscita dei dati dagli endpoint gestiti?",
      "en": "Is data leaving managed endpoints controlled?"
    },
    "example": {
      "it": "Copia su USB, stampa, clipboard, upload via browser, trasferimento verso cloud personali o app non autorizzate.",
      "en": "Copy to USB, printing, clipboard, browser upload, transfer to personal cloud services or unauthorized apps."
    },
    "evidence": {
      "it": "Endpoint DLP policy, dispositivi onboarded, test eventi.",
      "en": "Endpoint DLP policies, onboarded devices, event tests."
    },
    "microsoft": "Purview Endpoint DLP / Defender for Endpoint",
    "responseType": "binary",
    "owner": "Endpoint Security",
    "weight": 3
  },
  {
    "id": "27",
    "area": {
      "it": "4. Data Loss Prevention",
      "en": "4. Data Loss Prevention"
    },
    "track": "advanced",
    "question": {
      "it": "La DLP distingue utenti, gruppi, dispositivi, sedi e livelli di rischio?",
      "en": "Does DLP differentiate by users, groups, devices, locations and risk levels?"
    },
    "example": {
      "it": "Regole più restrittive per utenti privilegiati o dispositivi non conformi, eccezioni motivate per ruoli specifici.",
      "en": "Stricter rules for privileged users or non-compliant devices, with justified exceptions for specific roles."
    },
    "evidence": {
      "it": "Scope policy, gruppi, adaptive protection, eccezioni.",
      "en": "Policy scopes, groups, adaptive protection, exceptions."
    },
    "microsoft": "Purview DLP / Adaptive Protection",
    "responseType": "scale",
    "owner": "Security / Identity",
    "weight": 2
  },
  {
    "id": "28",
    "area": {
      "it": "4. Data Loss Prevention",
      "en": "4. Data Loss Prevention"
    },
    "track": "advanced",
    "question": {
      "it": "Sono monitorati i canali SaaS e cloud non Microsoft rilevanti?",
      "en": "Are relevant non-Microsoft SaaS and cloud channels monitored?"
    },
    "example": {
      "it": "Upload di documenti sensibili su servizi di file sharing personali o applicazioni AI non autorizzate.",
      "en": "Upload of sensitive documents to personal file-sharing services or unauthorized AI applications."
    },
    "evidence": {
      "it": "Cloud Discovery, app catalog, session policies.",
      "en": "Cloud Discovery, app catalog, session policies."
    },
    "microsoft": "Defender for Cloud Apps / Purview",
    "responseType": "scale",
    "owner": "Cloud Security",
    "weight": 2
  },
  {
    "id": "29",
    "area": {
      "it": "4. Data Loss Prevention",
      "en": "4. Data Loss Prevention"
    },
    "track": "advanced",
    "question": {
      "it": "L'efficacia della DLP viene misurata e migliorata nel tempo?",
      "en": "Is DLP effectiveness measured and improved over time?"
    },
    "example": {
      "it": "Trend degli incidenti, falsi positivi, override, reparti più esposti e riduzione delle violazioni.",
      "en": "Trends in incidents, false positives, overrides, exposed departments and reduction of violations."
    },
    "evidence": {
      "it": "Dashboard KPI, review mensile, backlog tuning.",
      "en": "KPI dashboards, monthly reviews, tuning backlog."
    },
    "microsoft": "Purview DLP / DSPM",
    "responseType": "scale",
    "owner": "Security Governance",
    "weight": 2
  }
];
