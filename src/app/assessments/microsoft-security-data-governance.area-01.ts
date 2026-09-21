import type { AssessmentQuestion } from '../models';

export const area1Questions: AssessmentQuestion[] = [
  {
    "id": "1",
    "area": {
      "it": "1. Governance e strategia",
      "en": "1. Governance and strategy"
    },
    "track": "essential",
    "question": {
      "it": "Esiste un responsabile chiaramente identificato per la sicurezza e la governance dei dati?",
      "en": "Is there a clearly identified owner for data security and governance?"
    },
    "example": {
      "it": "Una persona o un comitato decide priorità, policy, eccezioni e investimenti su dati sensibili, DLP e condivisione esterna.",
      "en": "A person or committee decides priorities, policies, exceptions and investments for sensitive data, DLP and external sharing."
    },
    "evidence": {
      "it": "Organigramma, RACI, verbali del comitato, deleghe formali.",
      "en": "Organization chart, RACI, committee minutes, formal delegations."
    },
    "microsoft": "Purview / Entra / Defender",
    "responseType": "binary",
    "owner": "CIO / CISO / DPO",
    "weight": 3
  },
  {
    "id": "2",
    "area": {
      "it": "1. Governance e strategia",
      "en": "1. Governance and strategy"
    },
    "track": "essential",
    "question": {
      "it": "Sono definiti obiettivi misurabili per la protezione dei dati e le operazioni di sicurezza?",
      "en": "Are measurable objectives defined for data protection and security operations?"
    },
    "example": {
      "it": "Ridurre condivisioni anonime, coprire il 90% degli endpoint con DLP, chiudere gli incidenti critici entro un SLA.",
      "en": "Reduce anonymous sharing, cover 90% of endpoints with DLP, close critical incidents within an agreed SLA."
    },
    "evidence": {
      "it": "KPI, dashboard, piano sicurezza, obiettivi annuali.",
      "en": "KPIs, dashboards, security plan, annual objectives."
    },
    "microsoft": "Purview / Defender XDR / Sentinel",
    "responseType": "scale",
    "owner": "CIO / CISO",
    "weight": 3
  },
  {
    "id": "3",
    "area": {
      "it": "1. Governance e strategia",
      "en": "1. Governance and strategy"
    },
    "track": "essential",
    "question": {
      "it": "Il perimetro delle informazioni critiche è stato concordato con le funzioni di business?",
      "en": "Has the scope of critical information been agreed with business functions?"
    },
    "example": {
      "it": "Dati clienti, personale, informazioni finanziarie, contratti, proprietà intellettuale, credenziali e dati di fornitori.",
      "en": "Customer data, workforce data, financial information, contracts, intellectual property, credentials and supplier data."
    },
    "evidence": {
      "it": "Elenco dati critici, workshop con Legal/Privacy/HR/Business.",
      "en": "Critical-data list, workshops with Legal/Privacy/HR/Business."
    },
    "microsoft": "Purview Information Protection",
    "responseType": "scale",
    "owner": "DPO / Legal / Business",
    "weight": 3
  },
  {
    "id": "4",
    "area": {
      "it": "1. Governance e strategia",
      "en": "1. Governance and strategy"
    },
    "track": "essential",
    "question": {
      "it": "Esiste una roadmap integrata tra identità, endpoint, dati e SOC?",
      "en": "Is there an integrated roadmap across identity, endpoints, data and the SOC?"
    },
    "example": {
      "it": "Le iniziative Entra, Defender XDR, Purview e l'eventuale Sentinel hanno dipendenze, priorità e tempi coordinati.",
      "en": "Entra, Defender XDR, Purview and any future Sentinel initiatives have coordinated dependencies, priorities and timelines."
    },
    "evidence": {
      "it": "Roadmap, piano progetti, architettura target.",
      "en": "Roadmap, project plan, target architecture."
    },
    "microsoft": "Unified Security Operations",
    "responseType": "scale",
    "owner": "CIO / Security",
    "weight": 3
  },
  {
    "id": "5",
    "area": {
      "it": "1. Governance e strategia",
      "en": "1. Governance and strategy"
    },
    "track": "advanced",
    "question": {
      "it": "Licenze e funzionalità Microsoft disponibili sono mappate rispetto a quelle realmente utilizzate?",
      "en": "Are available Microsoft licenses and capabilities mapped against what is actually used?"
    },
    "example": {
      "it": "Si conosce quali componenti E3/E5, Defender, Purview, Entra e Intune sono acquistati ma non configurati.",
      "en": "The organization knows which E3/E5, Defender, Purview, Entra and Intune capabilities are licensed but not configured."
    },
    "evidence": {
      "it": "Inventario licenze, report di utilizzo, gap analysis.",
      "en": "License inventory, usage reports, gap analysis."
    },
    "microsoft": "Microsoft 365 Security & Compliance",
    "responseType": "binary",
    "owner": "IT Operations / Procurement",
    "weight": 2
  },
  {
    "id": "6",
    "area": {
      "it": "1. Governance e strategia",
      "en": "1. Governance and strategy"
    },
    "track": "advanced",
    "question": {
      "it": "Esiste un processo formale per valutare nuove funzionalità Microsoft e passare da pilot a produzione?",
      "en": "Is there a formal process to evaluate new Microsoft capabilities and move from pilot to production?"
    },
    "example": {
      "it": "Una funzione viene testata, misurata, approvata, documentata e affidata a un owner operativo.",
      "en": "A capability is tested, measured, approved, documented and assigned to an operational owner."
    },
    "evidence": {
      "it": "Criteri di pilot, change record, acceptance criteria.",
      "en": "Pilot criteria, change records, acceptance criteria."
    },
    "microsoft": "Microsoft 365 / Azure",
    "responseType": "scale",
    "owner": "IT Governance",
    "weight": 2
  }
];
