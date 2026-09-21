import type { AssessmentQuestion } from '../models';

export const area8Questions: AssessmentQuestion[] = [
  {
    "id": "46",
    "area": {
      "it": "8. Defender XDR ed endpoint",
      "en": "8. Defender XDR and endpoints"
    },
    "track": "essential",
    "question": {
      "it": "È chiaro quali componenti alimentano oggi Defender XDR?",
      "en": "Is it clear which components currently feed Defender XDR?"
    },
    "example": {
      "it": "Defender for Endpoint, Office 365, Identity e Cloud Apps sono attivi e integrati nel portale Defender.",
      "en": "Defender for Endpoint, Office 365, Identity and Cloud Apps are active and integrated in the Defender portal."
    },
    "evidence": {
      "it": "Service status, connectors, onboarding report, license map.",
      "en": "Service status, connectors, onboarding reports, license map."
    },
    "microsoft": "Microsoft Defender XDR",
    "responseType": "binary",
    "owner": "Security / Partner SOC",
    "weight": 3
  },
  {
    "id": "47",
    "area": {
      "it": "8. Defender XDR ed endpoint",
      "en": "8. Defender XDR and endpoints"
    },
    "track": "essential",
    "question": {
      "it": "Il personale interno comprende come Defender XDR correla gli incidenti?",
      "en": "Does internal staff understand how Defender XDR correlates incidents?"
    },
    "example": {
      "it": "Phishing, credenziali compromesse, endpoint e accesso anomalo vengono mostrati come un unico incidente.",
      "en": "Phishing, compromised credentials, endpoint activity and anomalous access are shown as one incident."
    },
    "evidence": {
      "it": "Sessioni di knowledge transfer, runbook, incident review.",
      "en": "Knowledge-transfer sessions, runbooks, incident reviews."
    },
    "microsoft": "Microsoft Defender XDR",
    "responseType": "scale",
    "owner": "Security / IT Operations",
    "weight": 3
  },
  {
    "id": "48",
    "area": {
      "it": "8. Defender XDR ed endpoint",
      "en": "8. Defender XDR and endpoints"
    },
    "track": "essential",
    "question": {
      "it": "Tutti gli endpoint e server rilevanti sono onboarded e visibili?",
      "en": "Are all relevant endpoints and servers onboarded and visible?"
    },
    "example": {
      "it": "PC, notebook, server e dispositivi remoti inviano telemetria e hanno stato di salute monitorato.",
      "en": "PCs, laptops, servers and remote devices send telemetry and have monitored health status."
    },
    "evidence": {
      "it": "Device inventory, onboarding status, sensor health.",
      "en": "Device inventory, onboarding status, sensor health."
    },
    "microsoft": "Defender for Endpoint",
    "responseType": "scale",
    "owner": "Endpoint Security",
    "weight": 3
  },
  {
    "id": "49",
    "area": {
      "it": "8. Defender XDR ed endpoint",
      "en": "8. Defender XDR and endpoints"
    },
    "track": "essential",
    "question": {
      "it": "Le configurazioni di protezione endpoint sono gestite e verificate centralmente?",
      "en": "Are endpoint protection settings centrally managed and verified?"
    },
    "example": {
      "it": "Antivirus, EDR, attack surface reduction, firewall e tamper protection hanno baseline e report conformità.",
      "en": "Antivirus, EDR, attack-surface reduction, firewall and tamper protection have baselines and compliance reporting."
    },
    "evidence": {
      "it": "Security baseline, policy Intune, exposure report.",
      "en": "Security baselines, Intune policies, exposure reports."
    },
    "microsoft": "Defender for Endpoint / Intune",
    "responseType": "scale",
    "owner": "Endpoint / Security",
    "weight": 3
  },
  {
    "id": "50",
    "area": {
      "it": "8. Defender XDR ed endpoint",
      "en": "8. Defender XDR and endpoints"
    },
    "track": "essential",
    "question": {
      "it": "Gli incidenti XDR hanno triage, owner e SLA concordati con i consulenti?",
      "en": "Do XDR incidents have agreed triage, ownership and SLAs with consultants?"
    },
    "example": {
      "it": "È chiaro chi prende in carico un incidente, chi autorizza il contenimento e quando viene informata FIGC.",
      "en": "It is clear who takes ownership of an incident, who authorizes containment and when the organization is informed."
    },
    "evidence": {
      "it": "Contratto/SLA, escalation matrix, ticket, post-incident review.",
      "en": "Contract/SLA, escalation matrix, tickets, post-incident reviews."
    },
    "microsoft": "Defender XDR / MDR",
    "responseType": "scale",
    "owner": "CISO / Partner SOC",
    "weight": 3
  },
  {
    "id": "51",
    "area": {
      "it": "8. Defender XDR ed endpoint",
      "en": "8. Defender XDR and endpoints"
    },
    "track": "advanced",
    "question": {
      "it": "Sono utilizzate investigazione e risposta automatizzate dove appropriate?",
      "en": "Are automated investigation and response capabilities used where appropriate?"
    },
    "example": {
      "it": "Isolamento dispositivo, blocco file, disabilitazione account o remediation automatica con approvazioni definite.",
      "en": "Device isolation, file blocking, account disablement or automated remediation with defined approvals."
    },
    "evidence": {
      "it": "AIR configuration, action center, playbook approvativi.",
      "en": "AIR configuration, Action Center, approval playbooks."
    },
    "microsoft": "Defender XDR",
    "responseType": "scale",
    "owner": "SOC / Endpoint / Identity",
    "weight": 2
  },
  {
    "id": "52",
    "area": {
      "it": "8. Defender XDR ed endpoint",
      "en": "8. Defender XDR and endpoints"
    },
    "track": "advanced",
    "question": {
      "it": "Secure Score ed Exposure Management sono usati per prioritizzare riduzioni del rischio?",
      "en": "Are Secure Score and Exposure Management used to prioritize risk reduction?"
    },
    "example": {
      "it": "Le raccomandazioni vengono valutate per impatto, assegnate a owner e chiuse con evidenza.",
      "en": "Recommendations are assessed by impact, assigned to owners and closed with evidence."
    },
    "evidence": {
      "it": "Secure Score trend, initiatives, remediation tickets.",
      "en": "Secure Score trends, initiatives, remediation tickets."
    },
    "microsoft": "Microsoft Security Exposure Management",
    "responseType": "scale",
    "owner": "Security Governance",
    "weight": 2
  }
];
