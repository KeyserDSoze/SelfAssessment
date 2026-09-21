import type { AssessmentQuestion } from '../models';

export const area7Questions: AssessmentQuestion[] = [
  {
    "id": "40",
    "area": {
      "it": "7. Identità e accessi",
      "en": "7. Identity and access"
    },
    "track": "essential",
    "question": {
      "it": "L'autenticazione multifattore è applicata a tutti gli utenti e in modo più forte agli amministratori?",
      "en": "Is multi-factor authentication applied to all users, with stronger controls for administrators?"
    },
    "example": {
      "it": "MFA per tutti; metodi phishing-resistant o controlli aggiuntivi per ruoli privilegiati.",
      "en": "MFA for everyone; phishing-resistant methods or additional controls for privileged roles."
    },
    "evidence": {
      "it": "Authentication methods report, Conditional Access policy.",
      "en": "Authentication methods report, Conditional Access policies."
    },
    "microsoft": "Microsoft Entra ID",
    "responseType": "scale",
    "owner": "Identity Team",
    "weight": 3
  },
  {
    "id": "41",
    "area": {
      "it": "7. Identità e accessi",
      "en": "7. Identity and access"
    },
    "track": "essential",
    "question": {
      "it": "Le policy di Conditional Access tengono conto di rischio, dispositivo e contesto?",
      "en": "Do Conditional Access policies consider risk, device and context?"
    },
    "example": {
      "it": "Accesso bloccato o rafforzato per device non conformi, località anomale o rischio elevato.",
      "en": "Access is blocked or strengthened for non-compliant devices, unusual locations or high-risk sign-ins."
    },
    "evidence": {
      "it": "Conditional Access policy, report-only results, sign-in logs.",
      "en": "Conditional Access policies, report-only results, sign-in logs."
    },
    "microsoft": "Microsoft Entra Conditional Access",
    "responseType": "scale",
    "owner": "Identity / Endpoint",
    "weight": 3
  },
  {
    "id": "42",
    "area": {
      "it": "7. Identità e accessi",
      "en": "7. Identity and access"
    },
    "track": "essential",
    "question": {
      "it": "Gli account privilegiati usano privilegi just-in-time e separazione degli account?",
      "en": "Do privileged accounts use just-in-time privileges and separate admin accounts?"
    },
    "example": {
      "it": "Un amministratore attiva il ruolo solo per il tempo necessario e usa un account admin separato.",
      "en": "An administrator activates a role only when needed and uses a separate admin account."
    },
    "evidence": {
      "it": "PIM configuration, role assignments, activation logs.",
      "en": "PIM configuration, role assignments, activation logs."
    },
    "microsoft": "Microsoft Entra PIM",
    "responseType": "binary",
    "owner": "Identity Security",
    "weight": 3
  },
  {
    "id": "43",
    "area": {
      "it": "7. Identità e accessi",
      "en": "7. Identity and access"
    },
    "track": "essential",
    "question": {
      "it": "Gli accessi a gruppi, applicazioni e risorse critiche vengono revisionati?",
      "en": "Are access rights to groups, applications and critical resources reviewed?"
    },
    "example": {
      "it": "Owner di un'applicazione confermano o revocano accessi di dipendenti, guest e consulenti.",
      "en": "Application owners confirm or revoke access for employees, guests and consultants."
    },
    "evidence": {
      "it": "Access review schedule, decision report, revoche.",
      "en": "Access review schedules, decision reports, revocations."
    },
    "microsoft": "Microsoft Entra Access Reviews",
    "responseType": "scale",
    "owner": "Identity Governance / App Owner",
    "weight": 3
  },
  {
    "id": "44",
    "area": {
      "it": "7. Identità e accessi",
      "en": "7. Identity and access"
    },
    "track": "advanced",
    "question": {
      "it": "Il ciclo joiner-mover-leaver rimuove rapidamente accessi non più necessari?",
      "en": "Does the joiner-mover-leaver lifecycle quickly remove access that is no longer needed?"
    },
    "example": {
      "it": "Cambio ruolo o cessazione aggiorna gruppi, app, Teams, VPN e privilegi senza passaggi manuali dimenticati.",
      "en": "A role change or termination updates groups, apps, Teams, VPN and privileges without forgotten manual steps."
    },
    "evidence": {
      "it": "Workflow HR-IT, provisioning logs, SLA deprovisioning.",
      "en": "HR-IT workflow, provisioning logs, deprovisioning SLA."
    },
    "microsoft": "Microsoft Entra ID Governance",
    "responseType": "scale",
    "owner": "HR / Identity",
    "weight": 2
  },
  {
    "id": "45",
    "area": {
      "it": "7. Identità e accessi",
      "en": "7. Identity and access"
    },
    "track": "advanced",
    "question": {
      "it": "Account di servizio, emergenza e non interattivi sono inventariati e monitorati?",
      "en": "Are service, emergency and non-interactive accounts inventoried and monitored?"
    },
    "example": {
      "it": "Break-glass testati, service principal con owner, secret in scadenza e privilegi minimi.",
      "en": "Break-glass accounts are tested, service principals have owners, secrets have expiry dates and least privilege is enforced."
    },
    "evidence": {
      "it": "Inventory, credential expiry, sign-in alert, owner review.",
      "en": "Inventory, credential expiry, sign-in alerts, owner reviews."
    },
    "microsoft": "Microsoft Entra Workload ID / PIM",
    "responseType": "scale",
    "owner": "Identity / Cloud",
    "weight": 2
  }
];
