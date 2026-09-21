import type { AssessmentQuestion } from '../models';

export const area3Questions: AssessmentQuestion[] = [
  {
    "id": "14",
    "area": {
      "it": "3. Classificazione e protezione",
      "en": "3. Classification and protection"
    },
    "track": "essential",
    "question": {
      "it": "Sono definiti livelli di classificazione semplici e comprensibili?",
      "en": "Are simple and understandable classification levels defined?"
    },
    "example": {
      "it": "Pubblico, Interno, Riservato, Altamente Riservato con criteri ed esempi per ciascun livello.",
      "en": "Public, Internal, Confidential and Highly Confidential, with criteria and examples for each level."
    },
    "evidence": {
      "it": "Policy di classificazione, guida utenti, esempi documentali.",
      "en": "Classification policy, user guide, document examples."
    },
    "microsoft": "Purview Information Protection",
    "responseType": "binary",
    "owner": "DPO / Security / Legal",
    "weight": 3
  },
  {
    "id": "15",
    "area": {
      "it": "3. Classificazione e protezione",
      "en": "3. Classification and protection"
    },
    "track": "essential",
    "question": {
      "it": "Le sensitivity label sono configurate e pubblicate agli utenti?",
      "en": "Are sensitivity labels configured and published to users?"
    },
    "example": {
      "it": "In Word, Excel, PowerPoint e Outlook l'utente può applicare un'etichetta coerente al contenuto.",
      "en": "In Word, Excel, PowerPoint and Outlook, users can apply a consistent label to content."
    },
    "evidence": {
      "it": "Elenco label, publishing policy, screenshot client.",
      "en": "Label list, publishing policies, client screenshots."
    },
    "microsoft": "Purview Information Protection",
    "responseType": "binary",
    "owner": "M365 Security Admin",
    "weight": 3
  },
  {
    "id": "16",
    "area": {
      "it": "3. Classificazione e protezione",
      "en": "3. Classification and protection"
    },
    "track": "essential",
    "question": {
      "it": "Le etichette applicano protezioni reali oltre al semplice testo visibile?",
      "en": "Do labels apply real protections beyond visible markings?"
    },
    "example": {
      "it": "Crittografia, watermark, limitazione di stampa/copia, restrizioni ai destinatari esterni.",
      "en": "Encryption, watermarking, print/copy restrictions and limitations for external recipients."
    },
    "evidence": {
      "it": "Configurazione label, test su file ed email.",
      "en": "Label configuration, file and email tests."
    },
    "microsoft": "Purview Information Protection",
    "responseType": "scale",
    "owner": "Security / M365 Admin",
    "weight": 3
  },
  {
    "id": "17",
    "area": {
      "it": "3. Classificazione e protezione",
      "en": "3. Classification and protection"
    },
    "track": "essential",
    "question": {
      "it": "Sono definiti tipi di informazioni sensibili pertinenti al contesto organizzativo?",
      "en": "Are sensitive information types relevant to the organization defined?"
    },
    "example": {
      "it": "Identificativi personali, dati sanitari, coordinate bancarie, credenziali, numeri di documento, dati fiscali e proprietà intellettuale.",
      "en": "Personal identifiers, health data, bank details, credentials, identity document numbers, tax data and intellectual property."
    },
    "evidence": {
      "it": "Sensitive Information Types standard/custom, test match.",
      "en": "Standard/custom Sensitive Information Types and match testing."
    },
    "microsoft": "Purview Information Protection",
    "responseType": "scale",
    "owner": "DPO / Security",
    "weight": 3
  },
  {
    "id": "18",
    "area": {
      "it": "3. Classificazione e protezione",
      "en": "3. Classification and protection"
    },
    "track": "advanced",
    "question": {
      "it": "La classificazione automatica o raccomandata è utilizzata sui contenuti?",
      "en": "Is automatic or recommended classification used on content?"
    },
    "example": {
      "it": "Un documento con dati sanitari riceve una raccomandazione o viene etichettato automaticamente.",
      "en": "A document containing health data receives a recommendation or is automatically labeled."
    },
    "evidence": {
      "it": "Auto-labeling policy, simulation result, audit log.",
      "en": "Auto-labeling policies, simulation results, audit logs."
    },
    "microsoft": "Purview Information Protection",
    "responseType": "binary",
    "owner": "M365 Security Admin",
    "weight": 2
  },
  {
    "id": "19",
    "area": {
      "it": "3. Classificazione e protezione",
      "en": "3. Classification and protection"
    },
    "track": "advanced",
    "question": {
      "it": "Le etichette sono applicate anche a container come Teams, gruppi e siti SharePoint?",
      "en": "Are labels also applied to containers such as Teams, groups and SharePoint sites?"
    },
    "example": {
      "it": "Un Team 'Riservato' limita guest, privacy e condivisione in base alla label del container.",
      "en": "A 'Confidential' Team restricts guests, privacy and sharing according to the container label."
    },
    "evidence": {
      "it": "Container label policy, test su Team/sito.",
      "en": "Container label policies, Team/site tests."
    },
    "microsoft": "Purview Information Protection",
    "responseType": "binary",
    "owner": "M365 Platform Owner",
    "weight": 2
  },
  {
    "id": "20",
    "area": {
      "it": "3. Classificazione e protezione",
      "en": "3. Classification and protection"
    },
    "track": "advanced",
    "question": {
      "it": "Esiste un processo per correggere classificazioni errate e gestire eccezioni?",
      "en": "Is there a process to correct incorrect classifications and manage exceptions?"
    },
    "example": {
      "it": "L'utente può motivare un downgrade e Security può verificare chi rimuove una label riservata.",
      "en": "A user can justify a downgrade and Security can review who removes a confidential label."
    },
    "evidence": {
      "it": "Policy justification, audit, processo di escalation.",
      "en": "Justification policies, audit records, escalation process."
    },
    "microsoft": "Purview Audit / Information Protection",
    "responseType": "scale",
    "owner": "Security / Compliance",
    "weight": 2
  }
];
