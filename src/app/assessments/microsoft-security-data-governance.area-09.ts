import type { AssessmentQuestion } from '../models';

export const area9Questions: AssessmentQuestion[] = [
  {
    "id": "53",
    "area": {
      "it": "9. Sentinel e Unified SecOps",
      "en": "9. Sentinel and Unified SecOps"
    },
    "track": "essential",
    "question": {
      "it": "È stata valutata la necessità di un SIEM per log e segnali oltre l'ecosistema Microsoft?",
      "en": "Has the need for a SIEM been assessed for logs and signals beyond the Microsoft ecosystem?"
    },
    "example": {
      "it": "Firewall, VPN, sistemi on-premises, applicazioni verticali, database e apparati di rete non confluiscono oggi in XDR.",
      "en": "Firewall, VPN, on-premises systems, line-of-business applications, databases and network devices may not currently flow into XDR."
    },
    "evidence": {
      "it": "Log source inventory, use case workshop, gap assessment.",
      "en": "Log-source inventory, use-case workshop, gap assessment."
    },
    "microsoft": "Microsoft Sentinel",
    "responseType": "scale",
    "owner": "CISO / Infrastructure / SOC",
    "weight": 3
  },
  {
    "id": "54",
    "area": {
      "it": "9. Sentinel e Unified SecOps",
      "en": "9. Sentinel and Unified SecOps"
    },
    "track": "essential",
    "question": {
      "it": "Sono identificati i casi d'uso che richiederebbero correlazione tra sorgenti diverse?",
      "en": "Are use cases identified that require correlation across different sources?"
    },
    "example": {
      "it": "Account compromesso correlato a VPN, firewall, applicazione gestionale e download di documenti.",
      "en": "A compromised account is correlated with VPN, firewall, a business application and document downloads."
    },
    "evidence": {
      "it": "Use case catalog, attack scenarios, detection matrix.",
      "en": "Use-case catalog, attack scenarios, detection matrix."
    },
    "microsoft": "Microsoft Sentinel / Defender XDR",
    "responseType": "scale",
    "owner": "SOC / Application Owner",
    "weight": 3
  },
  {
    "id": "55",
    "area": {
      "it": "9. Sentinel e Unified SecOps",
      "en": "9. Sentinel and Unified SecOps"
    },
    "track": "essential",
    "question": {
      "it": "È chiaro come Defender XDR e Sentinel si integrano nel portale Defender?",
      "en": "Is it clear how Defender XDR and Sentinel integrate in the Defender portal?"
    },
    "example": {
      "it": "Gli incidenti XDR e i log SIEM possono essere investigati in un'esperienza unificata senza duplicare il lavoro.",
      "en": "XDR incidents and SIEM logs can be investigated in a unified experience without duplicating work."
    },
    "evidence": {
      "it": "Architettura target, demo, workflow operativo.",
      "en": "Target architecture, demo, operational workflow."
    },
    "microsoft": "Unified Security Operations",
    "responseType": "binary",
    "owner": "Security / Partner SOC",
    "weight": 3
  },
  {
    "id": "56",
    "area": {
      "it": "9. Sentinel e Unified SecOps",
      "en": "9. Sentinel and Unified SecOps"
    },
    "track": "advanced",
    "question": {
      "it": "Sono stati stimati volumi, retention e costi dei log da inviare a Sentinel?",
      "en": "Have log volumes, retention and Sentinel costs been estimated?"
    },
    "example": {
      "it": "Si distingue tra log ad alto valore, log di audit e dati costosi ma poco utili alle detection.",
      "en": "High-value logs, audit logs and expensive low-value data are distinguished from one another."
    },
    "evidence": {
      "it": "Sizing, ingestion estimate, retention plan, cost model.",
      "en": "Sizing, ingestion estimate, retention plan, cost model."
    },
    "microsoft": "Microsoft Sentinel",
    "responseType": "scale",
    "owner": "Cloud / SOC / Finance",
    "weight": 2
  },
  {
    "id": "57",
    "area": {
      "it": "9. Sentinel e Unified SecOps",
      "en": "9. Sentinel and Unified SecOps"
    },
    "track": "advanced",
    "question": {
      "it": "Sono previsti playbook di automazione per incidenti ripetitivi?",
      "en": "Are automation playbooks planned for repetitive incidents?"
    },
    "example": {
      "it": "Arricchimento IP, apertura ticket, notifica, blocco account o isolamento endpoint tramite workflow approvato.",
      "en": "IP enrichment, ticket creation, notification, account blocking or endpoint isolation through an approved workflow."
    },
    "evidence": {
      "it": "Automation rules, Logic Apps, runbook, approval flow.",
      "en": "Automation rules, Logic Apps, runbooks, approval flows."
    },
    "microsoft": "Microsoft Sentinel SOAR",
    "responseType": "scale",
    "owner": "SOC / Cloud Automation",
    "weight": 2
  }
];
