import type { AssessmentQuestion } from '../models';

export const area2Questions: AssessmentQuestion[] = [
  {
    "id": "7",
    "area": {
      "it": "2. Inventario dati e repository",
      "en": "2. Data inventory and repositories"
    },
    "track": "essential",
    "question": {
      "it": "È disponibile un inventario aggiornato dei repository dove risiedono i documenti?",
      "en": "Is there an up-to-date inventory of repositories where documents are stored?"
    },
    "example": {
      "it": "SharePoint, Teams, OneDrive, file server, NAS, share dipartimentali, Azure Storage, applicazioni verticali.",
      "en": "SharePoint, Teams, OneDrive, file servers, NAS, departmental shares, Azure Storage and line-of-business applications."
    },
    "evidence": {
      "it": "CMDB, elenco siti e share, data map, report storage.",
      "en": "CMDB, site/share inventory, data map, storage reports."
    },
    "microsoft": "Purview Data Governance / M365",
    "responseType": "scale",
    "owner": "Data Owner / IT Infrastructure",
    "weight": 3
  },
  {
    "id": "8",
    "area": {
      "it": "2. Inventario dati e repository",
      "en": "2. Data inventory and repositories"
    },
    "track": "essential",
    "question": {
      "it": "Le share legacy e i file server hanno owner, scopo e data di revisione?",
      "en": "Do legacy shares and file servers have an owner, purpose and review date?"
    },
    "example": {
      "it": "Una share chiamata 'Archivio' ha un responsabile, un perimetro noto e una revisione periodica degli accessi.",
      "en": "A share named 'Archive' has an accountable owner, a known scope and periodic access reviews."
    },
    "evidence": {
      "it": "Elenco share con owner, permessi, ultima revisione.",
      "en": "Share inventory with owner, permissions and last review date."
    },
    "microsoft": "Purview / Entra",
    "responseType": "scale",
    "owner": "IT Infrastructure / Business Owner",
    "weight": 3
  },
  {
    "id": "9",
    "area": {
      "it": "2. Inventario dati e repository",
      "en": "2. Data inventory and repositories"
    },
    "track": "essential",
    "question": {
      "it": "È noto quali repository contengono documentazione non indicizzata o difficilmente ricercabile?",
      "en": "Is it known which repositories contain unindexed or hard-to-search documentation?"
    },
    "example": {
      "it": "PDF scansionati, cartelle annidate, file senza metadati, archivi storici, duplicati e documenti orfani.",
      "en": "Scanned PDFs, nested folders, files without metadata, historical archives, duplicates and orphaned documents."
    },
    "evidence": {
      "it": "Report di scansione, campionamento cartelle, analisi ricerca.",
      "en": "Scan reports, folder sampling, search analysis."
    },
    "microsoft": "Purview Data Governance / SharePoint",
    "responseType": "binary",
    "owner": "Data Governance / IT",
    "weight": 3
  },
  {
    "id": "10",
    "area": {
      "it": "2. Inventario dati e repository",
      "en": "2. Data inventory and repositories"
    },
    "track": "essential",
    "question": {
      "it": "Sono identificati dati sensibili presenti fuori da Microsoft 365?",
      "en": "Is sensitive data stored outside Microsoft 365 identified?"
    },
    "example": {
      "it": "Dati personali o contratti in file server, applicazioni gestionali, database, storage cloud o PC locali.",
      "en": "Personal data or contracts in file servers, business applications, databases, cloud storage or local PCs."
    },
    "evidence": {
      "it": "Data discovery, interviste, scansioni, registro trattamenti.",
      "en": "Data discovery, interviews, scans, records of processing activities."
    },
    "microsoft": "Purview Data Map / DLP",
    "responseType": "scale",
    "owner": "DPO / Data Governance",
    "weight": 3
  },
  {
    "id": "11",
    "area": {
      "it": "2. Inventario dati e repository",
      "en": "2. Data inventory and repositories"
    },
    "track": "advanced",
    "question": {
      "it": "Esiste una tassonomia comune di domini, dataset e documenti?",
      "en": "Is there a common taxonomy for domains, datasets and documents?"
    },
    "example": {
      "it": "Categorie come Clienti, Vendite, Finance, Risorse Umane, Legale, Ricerca e Sviluppo, Fornitori.",
      "en": "Categories such as Customers, Sales, Finance, Human Resources, Legal, Research and Development, and Suppliers."
    },
    "evidence": {
      "it": "Glossario, catalogo dati, struttura metadati.",
      "en": "Glossary, data catalog, metadata structure."
    },
    "microsoft": "Purview Data Catalog",
    "responseType": "scale",
    "owner": "Data Governance / Business",
    "weight": 2
  },
  {
    "id": "12",
    "area": {
      "it": "2. Inventario dati e repository",
      "en": "2. Data inventory and repositories"
    },
    "track": "advanced",
    "question": {
      "it": "I contenuti duplicati, obsoleti o senza owner vengono individuati e gestiti?",
      "en": "Are duplicate, obsolete or ownerless contents identified and managed?"
    },
    "example": {
      "it": "Vecchie versioni di contratti, cartelle di ex dipendenti, siti Teams inattivi, copie multiple dello stesso file.",
      "en": "Old contract versions, former employee folders, inactive Teams sites and multiple copies of the same file."
    },
    "evidence": {
      "it": "Report duplicati/obsoleti, regole di archiviazione, backlog bonifica.",
      "en": "Duplicate/obsolete-content reports, archiving rules, remediation backlog."
    },
    "microsoft": "Purview Data Lifecycle",
    "responseType": "scale",
    "owner": "Data Owner / Records",
    "weight": 2
  },
  {
    "id": "13",
    "area": {
      "it": "2. Inventario dati e repository",
      "en": "2. Data inventory and repositories"
    },
    "track": "advanced",
    "question": {
      "it": "La creazione di nuovi siti, Teams e share segue standard di naming, owner e classificazione?",
      "en": "Does creation of new sites, Teams and shares follow naming, ownership and classification standards?"
    },
    "example": {
      "it": "Ogni nuovo Team nasce con owner, finalità, durata, livello di riservatezza e regole per gli ospiti.",
      "en": "Every new Team is created with an owner, purpose, lifecycle, confidentiality level and guest rules."
    },
    "evidence": {
      "it": "Template provisioning, policy naming, workflow approvativo.",
      "en": "Provisioning templates, naming policies, approval workflow."
    },
    "microsoft": "SharePoint / Teams / Entra",
    "responseType": "scale",
    "owner": "M365 Platform Owner",
    "weight": 2
  }
];
