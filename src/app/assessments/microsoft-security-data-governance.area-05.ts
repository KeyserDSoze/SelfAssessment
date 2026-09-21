import type { AssessmentQuestion } from '../models';

export const area5Questions: AssessmentQuestion[] = [
  {
    "id": "30",
    "area": {
      "it": "5. Ciclo di vita e condivisione",
      "en": "5. Lifecycle and sharing"
    },
    "track": "essential",
    "question": {
      "it": "Sono definite regole di conservazione e cancellazione per le principali categorie documentali?",
      "en": "Are retention and deletion rules defined for key document categories?"
    },
    "example": {
      "it": "Contratti, documenti del personale, documentazione fiscale e documenti operativi hanno tempi di conservazione distinti.",
      "en": "Contracts, HR documents, tax documentation and operational records have different retention periods."
    },
    "evidence": {
      "it": "Retention schedule, policy, approvazione Legal/DPO.",
      "en": "Retention schedule, policies, Legal/DPO approval."
    },
    "microsoft": "Purview Data Lifecycle / Records Management",
    "responseType": "scale",
    "owner": "Legal / DPO / Records",
    "weight": 3
  },
  {
    "id": "31",
    "area": {
      "it": "5. Ciclo di vita e condivisione",
      "en": "5. Lifecycle and sharing"
    },
    "track": "essential",
    "question": {
      "it": "La condivisione esterna di SharePoint, OneDrive e Teams è governata e monitorata?",
      "en": "Is external sharing in SharePoint, OneDrive and Teams governed and monitored?"
    },
    "example": {
      "it": "Link anonimi limitati, domini consentiti, scadenza link, blocco download per casi sensibili.",
      "en": "Anonymous links are limited, allowed domains are controlled, links expire and downloads can be blocked for sensitive cases."
    },
    "evidence": {
      "it": "Sharing settings, report link, audit, policy guest.",
      "en": "Sharing settings, link reports, audit records, guest policies."
    },
    "microsoft": "SharePoint / Teams / Purview",
    "responseType": "scale",
    "owner": "M365 Platform Owner",
    "weight": 3
  },
  {
    "id": "32",
    "area": {
      "it": "5. Ciclo di vita e condivisione",
      "en": "5. Lifecycle and sharing"
    },
    "track": "essential",
    "question": {
      "it": "Gli accessi guest e le condivisioni esterne vengono riesaminati periodicamente?",
      "en": "Are guest access and external sharing reviewed periodically?"
    },
    "example": {
      "it": "Un owner conferma ogni trimestre se fornitori e consulenti devono mantenere accesso a un Team.",
      "en": "An owner confirms quarterly whether suppliers and consultants should retain access to a Team."
    },
    "evidence": {
      "it": "Access review, elenco guest inattivi, evidenza revoche.",
      "en": "Access reviews, inactive guest lists, revocation evidence."
    },
    "microsoft": "Entra Access Reviews",
    "responseType": "binary",
    "owner": "Identity Governance",
    "weight": 3
  },
  {
    "id": "33",
    "area": {
      "it": "5. Ciclo di vita e condivisione",
      "en": "5. Lifecycle and sharing"
    },
    "track": "advanced",
    "question": {
      "it": "I siti e i workspace inattivi vengono archiviati o dismessi in modo controllato?",
      "en": "Are inactive sites and workspaces archived or retired in a controlled way?"
    },
    "example": {
      "it": "Un Team inattivo da 12 mesi viene riesaminato, archiviato e poi eliminato secondo policy.",
      "en": "A Team inactive for 12 months is reviewed, archived and later deleted according to policy."
    },
    "evidence": {
      "it": "Lifecycle policy, report attività, workflow owner.",
      "en": "Lifecycle policies, activity reports, owner workflows."
    },
    "microsoft": "M365 Groups / Purview Data Lifecycle",
    "responseType": "scale",
    "owner": "M365 Platform Owner",
    "weight": 2
  },
  {
    "id": "34",
    "area": {
      "it": "5. Ciclo di vita e condivisione",
      "en": "5. Lifecycle and sharing"
    },
    "track": "advanced",
    "question": {
      "it": "Esistono controlli per evitare conservazione eccessiva 'per sempre'?",
      "en": "Are there controls to avoid excessive 'keep forever' retention?"
    },
    "example": {
      "it": "Documenti senza obbligo legale non restano indefinitamente in share e mailbox.",
      "en": "Documents with no legal obligation are not kept indefinitely in shares and mailboxes."
    },
    "evidence": {
      "it": "Policy retention/deletion, eccezioni, report scadenze.",
      "en": "Retention/deletion policies, exceptions, expiry reports."
    },
    "microsoft": "Purview Data Lifecycle",
    "responseType": "scale",
    "owner": "Records / Legal",
    "weight": 2
  }
];
