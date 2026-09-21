import type { AssessmentDefinition } from '../models';
import { area1Questions } from './microsoft-security-data-governance.area-01';
import { area2Questions } from './microsoft-security-data-governance.area-02';
import { area3Questions } from './microsoft-security-data-governance.area-03';
import { area4Questions } from './microsoft-security-data-governance.area-04';
import { area5Questions } from './microsoft-security-data-governance.area-05';
import { area6Questions } from './microsoft-security-data-governance.area-06';
import { area7Questions } from './microsoft-security-data-governance.area-07';
import { area8Questions } from './microsoft-security-data-governance.area-08';
import { area9Questions } from './microsoft-security-data-governance.area-09';
import { area10Questions } from './microsoft-security-data-governance.area-10';
import { area11Questions } from './microsoft-security-data-governance.area-11';

const questions = [
  ...area1Questions,
  ...area2Questions,
  ...area3Questions,
  ...area4Questions,
  ...area5Questions,
  ...area6Questions,
  ...area7Questions,
  ...area8Questions,
  ...area9Questions,
  ...area10Questions,
  ...area11Questions
];

export const microsoftSecurityDataGovernance: AssessmentDefinition = {
  id: 'microsoft-security-data-governance',
  version: '1.1.0',
  title: {
    it: 'Microsoft Security & Data Governance',
    en: 'Microsoft Security & Data Governance'
  },
  shortDescription: {
    it: 'Self-assessment su governance del dato, Microsoft Purview, DLP, identità, Defender XDR, Sentinel, AI e awareness.',
    en: 'Self-assessment covering data governance, Microsoft Purview, DLP, identity, Defender XDR, Sentinel, AI and awareness.'
  },
  longDescription: {
    it: 'Un percorso di envisioning e assessment che parte dai principi Zero Trust e collega identità, dati, endpoint, applicazioni, operazioni SOC e adozione dell’AI. Prima delle domande, ogni componente Microsoft viene spiegato nel suo ruolo tecnico, nelle dipendenze principali e nelle evidenze che conviene verificare.',
    en: 'An envisioning and assessment journey grounded in Zero Trust principles that connects identity, data, endpoints, applications, SOC operations and AI adoption. Before the questionnaire, each Microsoft component is explained in terms of its technical role, main dependencies and the evidence worth validating.'
  },
  estimatedMinutes: 45,
  tags: [
    'Microsoft Purview',
    'DLP',
    'Defender XDR',
    'Sentinel',
    'Entra ID',
    'Zero Trust',
    'AI Security',
    'Data Governance'
  ],
  accent: '#18c8ff',
  intro: [
    {
      id: 'zero-trust-foundation',
      eyebrow: { it: '01 · Fondazione', en: '01 · Foundation' },
      title: {
        it: 'Zero Trust è il modello mentale che collega tutto il resto',
        en: 'Zero Trust is the mental model that connects everything else'
      },
      body: {
        it: 'La sicurezza moderna non può dipendere dal fatto che un utente o un dispositivo sia “dentro la rete”. Microsoft struttura Zero Trust attorno a tre principi: verificare esplicitamente ogni richiesta usando i segnali disponibili, applicare il privilegio minimo e progettare assumendo che una compromissione possa già essere avvenuta. L’assessment usa questa logica per leggere identità, dati, endpoint e operazioni come un unico sistema.',
        en: 'Modern security cannot depend on whether a user or device is “inside the network”. Microsoft structures Zero Trust around three principles: explicitly verify each request using available signals, enforce least privilege, and design while assuming compromise may already have occurred. This assessment uses that logic to read identity, data, endpoints and operations as one system.'
      },
      details: [
        {
          title: { it: 'Verificare esplicitamente', en: 'Verify explicitly' },
          body: {
            it: 'Autenticazione e autorizzazione devono considerare identità, rischio, dispositivo, applicazione, contesto e sensibilità della risorsa. Non basta sapere chi è l’utente: serve decidere se quella specifica richiesta è accettabile.',
            en: 'Authentication and authorization should consider identity, risk, device, application, context and resource sensitivity. Knowing who the user is is not enough: the specific request must also be judged acceptable.'
          }
        },
        {
          title: { it: 'Privilegio minimo', en: 'Least privilege' },
          body: {
            it: 'Accessi e ruoli privilegiati dovrebbero essere limitati per ambito e durata. Il principio guida è ridurre i privilegi permanenti e concedere solo ciò che serve, quando serve.',
            en: 'Access and privileged roles should be constrained by scope and duration. The guiding principle is to reduce standing privilege and grant only what is needed, when it is needed.'
          }
        },
        {
          title: { it: 'Assumere la violazione', en: 'Assume breach' },
          body: {
            it: 'I controlli devono limitare il raggio d’impatto di un account o dispositivo compromesso, produrre telemetria utile e consentire detection e risposta rapide.',
            en: 'Controls should limit the blast radius of a compromised account or device, produce useful telemetry, and enable rapid detection and response.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Zero Trust overview', en: 'Zero Trust overview' },
          url: 'https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview'
        },
        {
          label: { it: 'Best practice di sicurezza', en: 'Security best practices' },
          url: 'https://learn.microsoft.com/en-us/security/zero-trust/security-best-practices-overview'
        }
      ]
    },
    {
      id: 'entra-identity-access',
      eyebrow: { it: '02 · Identità', en: '02 · Identity' },
      title: {
        it: 'Microsoft Entra: l’identità diventa il piano di controllo dell’accesso',
        en: 'Microsoft Entra: identity becomes the access control plane'
      },
      body: {
        it: 'Microsoft Entra ID governa autenticazione e autorizzazione verso applicazioni e risorse. Conditional Access è il motore di policy Zero Trust: combina segnali come utente, gruppo, rischio, dispositivo, applicazione e contesto per decidere se consentire, bloccare o richiedere controlli aggiuntivi. Identity Protection aggiunge segnali di rischio; Identity Governance e PIM gestiscono il ciclo di vita degli accessi e dei privilegi.',
        en: 'Microsoft Entra ID governs authentication and authorization to applications and resources. Conditional Access is the Zero Trust policy engine: it combines signals such as user, group, risk, device, application and context to decide whether to allow, block or require additional controls. Identity Protection adds risk signals; Identity Governance and PIM manage access and privileged-access lifecycles.'
      },
      details: [
        {
          title: { it: 'Conditional Access', en: 'Conditional Access' },
          body: {
            it: 'Le policy funzionano come regole if/then applicate dopo il primo fattore: per esempio richiedere MFA, un dispositivo conforme o bloccare accessi in condizioni rischiose. La qualità del disegno delle policy è fondamentale quanto la loro presenza.',
            en: 'Policies work as if/then rules evaluated after first-factor authentication: for example requiring MFA, a compliant device, or blocking access under risky conditions. Policy design quality matters as much as policy existence.'
          }
        },
        {
          title: { it: 'Identity Protection', en: 'Identity Protection' },
          body: {
            it: 'Rileva segnali di rischio su utenti e accessi e può alimentarli nelle decisioni di accesso condizionale. L’obiettivo è rendere l’autenticazione adattiva al rischio, non statica.',
            en: 'It detects risk signals related to users and sign-ins and can feed them into Conditional Access decisions. The goal is risk-adaptive rather than static authentication.'
          }
        },
        {
          title: { it: 'Identity Governance', en: 'Identity Governance' },
          body: {
            it: 'Copre il ciclo di vita dell’identità e degli accessi: chi deve avere accesso, per quanto tempo, con quali approvazioni e con quali revisioni periodiche. Le access review sono centrali per evitare accessi storici non più necessari.',
            en: 'It covers identity and access lifecycles: who should have access, for how long, with what approvals, and with which recurring reviews. Access reviews are central to removing stale access.'
          }
        },
        {
          title: { it: 'Privileged Identity Management', en: 'Privileged Identity Management' },
          body: {
            it: 'PIM consente accessi privilegiati just-in-time e time-bound, con possibilità di approvazione, MFA, giustificazione, notifiche e revisioni. Riduce il rischio dei ruoli amministrativi permanentemente attivi.',
            en: 'PIM enables just-in-time and time-bound privileged access, with approval, MFA, justification, notifications and reviews. It reduces the risk of permanently active administrative roles.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Conditional Access', en: 'Conditional Access' },
          url: 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview'
        },
        {
          label: { it: 'Identity Governance', en: 'Identity Governance' },
          url: 'https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview'
        },
        {
          label: { it: 'Privileged Identity Management', en: 'Privileged Identity Management' },
          url: 'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/'
        }
      ]
    },
    {
      id: 'purview-data-governance',
      eyebrow: { it: '03 · Data Governance', en: '03 · Data Governance' },
      title: {
        it: 'Purview Data Map e Unified Catalog: sapere quali dati esistono prima di proteggerli',
        en: 'Purview Data Map and Unified Catalog: know what data exists before protecting it'
      },
      body: {
        it: 'La governance del dato parte dall’inventario e dai metadati. Microsoft Purview Data Map è il livello tecnico che raccoglie e mantiene metadati sugli asset individuati nelle sorgenti scansionate; Unified Catalog rende queste informazioni utilizzabili per ricerca, curatela, accesso e qualità del dato. È un dominio diverso dalla sola protezione Microsoft 365: qui il problema è capire quali asset esistono, dove sono, chi li governa e quanto sono affidabili.',
        en: 'Data governance starts with inventory and metadata. Microsoft Purview Data Map is the technical layer that captures and maintains metadata about assets discovered in scanned sources; Unified Catalog makes that information usable for search, curation, access and data quality. This is different from Microsoft 365 protection alone: the problem here is understanding which assets exist, where they live, who governs them and how trustworthy they are.'
      },
      details: [
        {
          title: { it: 'Data Map', en: 'Data Map' },
          body: {
            it: 'Le sorgenti vengono connesse e scansionate per creare un inventario tecnico degli asset e dei relativi metadati. La copertura reale dipende quindi da connettori, scansioni, credenziali, scope e frequenza di aggiornamento.',
            en: 'Sources are connected and scanned to create a technical inventory of assets and their metadata. Real coverage therefore depends on connectors, scans, credentials, scope and refresh cadence.'
          }
        },
        {
          title: { it: 'Unified Catalog', en: 'Unified Catalog' },
          body: {
            it: 'Porta la governance verso gli utenti del dato: ricerca, curatela, comprensione del significato degli asset, qualità e processi di accesso. Un catalogo utile non è solo “pieno”: deve avere owner, metadati e responsabilità mantenuti.',
            en: 'It brings governance to data consumers through search, curation, asset meaning, quality and access processes. A useful catalog is not merely “populated”: ownership, metadata and responsibilities must be maintained.'
          }
        },
        {
          title: { it: 'Cosa verificare', en: 'What to verify' },
          body: {
            it: 'Sorgenti effettivamente censite, scansioni funzionanti, asset senza owner, domini dati, qualità dei metadati e processi di manutenzione del catalogo.',
            en: 'Sources actually inventoried, functioning scans, ownerless assets, data domains, metadata quality and processes for maintaining the catalog.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Data governance con Purview', en: 'Data governance with Purview' },
          url: 'https://learn.microsoft.com/en-us/azure/purview/overview'
        },
        {
          label: { it: 'Pianificare Data Map e Unified Catalog', en: 'Plan Data Map and Unified Catalog' },
          url: 'https://learn.microsoft.com/en-us/purview/data-governance-plan'
        }
      ]
    },
    {
      id: 'purview-information-protection',
      eyebrow: { it: '04 · Protezione dati', en: '04 · Data protection' },
      title: {
        it: 'Information Protection: classificazione e sensitivity label rendono il dato comprensibile ai controlli',
        en: 'Information Protection: classification and sensitivity labels make data understandable to controls'
      },
      body: {
        it: 'Microsoft Purview Information Protection serve a classificare, etichettare e proteggere le informazioni in base alla sensibilità. Le sensitivity label possono essere applicate manualmente, per impostazione predefinita o automaticamente e possono guidare azioni di protezione come marcature, crittografia e controlli di accesso. La classificazione è la base che permette a DLP e ad altri controlli di distinguere il dato davvero sensibile dal rumore.',
        en: 'Microsoft Purview Information Protection classifies, labels and protects information based on sensitivity. Sensitivity labels can be applied manually, by default or automatically and can drive protection actions such as markings, encryption and access controls. Classification is the foundation that lets DLP and other controls distinguish truly sensitive data from noise.'
      },
      details: [
        {
          title: { it: 'Classificare', en: 'Classify' },
          body: {
            it: 'Sensitive Information Types, classificatori e altri segnali aiutano a riconoscere contenuti sensibili. La qualità del rilevamento va verificata sui dati reali, perché pattern troppo generici producono falsi positivi.',
            en: 'Sensitive Information Types, classifiers and other signals help identify sensitive content. Detection quality should be validated on real data because overly generic patterns create false positives.'
          }
        },
        {
          title: { it: 'Etichettare', en: 'Label' },
          body: {
            it: 'Una tassonomia di label deve essere comprensibile agli utenti e coerente con le policy. Troppe etichette o nomi poco chiari riducono l’adozione e spostano il problema sull’utente finale.',
            en: 'A label taxonomy should be understandable to users and aligned with policy. Too many labels or unclear names reduce adoption and push the problem onto end users.'
          }
        },
        {
          title: { it: 'Proteggere', en: 'Protect' },
          body: {
            it: 'La label può diventare un segnale utilizzato per applicare protezioni e policy. È importante verificare non solo che le label esistano, ma dove siano pubblicate, applicate e realmente usate.',
            en: 'The label can become a signal used by protection and policy controls. It is important to verify not only that labels exist, but where they are published, applied and actually used.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Information Protection', en: 'Information Protection' },
          url: 'https://learn.microsoft.com/en-us/purview/information-protection-solution'
        }
      ]
    },
    {
      id: 'purview-dlp',
      eyebrow: { it: '05 · Data Loss Prevention', en: '05 · Data Loss Prevention' },
      title: {
        it: 'DLP: trasformare la sensibilità del dato in regole applicabili nei canali di utilizzo',
        en: 'DLP: turn data sensitivity into enforceable rules across usage channels'
      },
      body: {
        it: 'Microsoft Purview Data Loss Prevention usa policy per riconoscere informazioni sensibili e intervenire quando un’attività rischia di esporle. Una policy DLP combina cosa cercare, dove cercarlo, condizioni e azioni. A seconda del perimetro e delle licenze, i controlli possono riguardare servizi Microsoft 365, endpoint e altri canali supportati. Il valore non è “avere DLP attivo”, ma coprire i dati importanti con policy testate, monitorate e sostenibili.',
        en: 'Microsoft Purview Data Loss Prevention uses policies to identify sensitive information and intervene when an activity risks exposing it. A DLP policy combines what to detect, where to detect it, conditions and actions. Depending on scope and licensing, controls can cover Microsoft 365 services, endpoints and other supported channels. The value is not merely “having DLP enabled”, but covering important data with tested, monitored and sustainable policies.'
      },
      details: [
        {
          title: { it: 'Detection', en: 'Detection' },
          body: {
            it: 'Le regole possono utilizzare tipi di informazioni sensibili, label e condizioni contestuali. Prima del blocco è utile misurare volume e qualità dei match per evitare una policy tecnicamente corretta ma operativamente ingestibile.',
            en: 'Rules can use sensitive information types, labels and contextual conditions. Before blocking, measure match volume and quality to avoid a technically correct but operationally unmanageable policy.'
          }
        },
        {
          title: { it: 'Enforcement', en: 'Enforcement' },
          body: {
            it: 'Le azioni possono andare dall’audit e dalle notifiche fino al blocco, con eventuali override dove previsti. La scelta deve riflettere rischio, processo e impatto sugli utenti.',
            en: 'Actions can range from audit and notifications to blocking, with overrides where supported. The choice should reflect risk, process and user impact.'
          }
        },
        {
          title: { it: 'Operationalizzazione', en: 'Operationalization' },
          body: {
            it: 'Serve un ciclo continuo: test, analisi dei match, tuning delle eccezioni, gestione degli incidenti, reporting e revisione delle policy quando cambiano dati e processi.',
            en: 'A continuous cycle is needed: testing, match analysis, exception tuning, incident handling, reporting and policy review as data and processes change.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Data Loss Prevention', en: 'Data Loss Prevention' },
          url: 'https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp'
        },
        {
          label: { it: 'Purview data security', en: 'Purview data security' },
          url: 'https://learn.microsoft.com/en-us/purview/purview-security'
        }
      ]
    },
    {
      id: 'purview-lifecycle-records',
      eyebrow: { it: '06 · Ciclo di vita', en: '06 · Lifecycle' },
      title: {
        it: 'Data Lifecycle e Records Management: conservare ciò che serve, eliminare ciò che non serve più',
        en: 'Data Lifecycle and Records Management: retain what is needed, dispose of what is not'
      },
      body: {
        it: 'Data Lifecycle Management governa conservazione ed eliminazione dei contenuti, con retention policy come meccanismo centrale per workload Microsoft 365 quali Exchange, SharePoint, OneDrive e Teams. Records Management aggiunge controlli specifici per contenuti di valore legale, regolatorio o business-critical, usando retention label e dichiarazione di record.',
        en: 'Data Lifecycle Management governs retention and deletion of content, with retention policies as a core mechanism for Microsoft 365 workloads such as Exchange, SharePoint, OneDrive and Teams. Records Management adds controls for content with legal, regulatory or business-critical value, using retention labels and record declaration.'
      },
      details: [
        {
          title: { it: 'Retention policy', en: 'Retention policy' },
          body: {
            it: 'Definisce in modo ampio se i contenuti devono essere conservati e/o eliminati dopo un periodo. La progettazione richiede di conoscere obblighi, valore operativo e rischio di mantenere dati non necessari.',
            en: 'Broadly defines whether content should be retained and/or deleted after a period. Design requires understanding obligations, operational value and the risk of keeping unnecessary data.'
          }
        },
        {
          title: { it: 'Retention label e record', en: 'Retention labels and records' },
          body: {
            it: 'Le label consentono governance a livello di elemento e possono essere usate per dichiarare record. Per i documenti di alto valore, il punto non è solo “quanto tempo”, ma quali azioni devono essere limitate e come dimostrare la conformità.',
            en: 'Labels enable item-level governance and can be used to declare records. For high-value content, the question is not only “how long”, but which actions must be restricted and how compliance can be demonstrated.'
          }
        },
        {
          title: { it: 'Rischio della sovra-conservazione', en: 'Over-retention risk' },
          body: {
            it: 'Conservare tutto per sempre aumenta superficie di attacco, costi e responsabilità. L’assessment verifica se retention e disposal sono decisioni governate oppure abitudini implicite.',
            en: 'Keeping everything forever increases attack surface, cost and liability. The assessment checks whether retention and disposal are governed decisions or implicit habits.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Data Lifecycle Management', en: 'Data Lifecycle Management' },
          url: 'https://learn.microsoft.com/en-us/purview/data-lifecycle-management'
        },
        {
          label: { it: 'Records Management', en: 'Records Management' },
          url: 'https://learn.microsoft.com/en-us/purview/records-management'
        }
      ]
    },
    {
      id: 'purview-audit-ediscovery',
      eyebrow: { it: '07 · Investigazione e compliance', en: '07 · Investigation and compliance' },
      title: {
        it: 'Audit ed eDiscovery: ricostruire cosa è successo e preservare ciò che conta',
        en: 'Audit and eDiscovery: reconstruct what happened and preserve what matters'
      },
      body: {
        it: 'Microsoft Purview Audit rende ricercabili le attività utente e amministrative registrate nel log di audit unificato, supportando indagini di sicurezza, IT, compliance e legal. eDiscovery costruisce sopra i dati e i processi di investigazione: casi, ricerche, origini dati, hold, review set, esportazioni e tracciamento delle attività. Sono capacità diverse ma strettamente collegate.',
        en: 'Microsoft Purview Audit makes user and administrator activities recorded in the unified audit log searchable, supporting security, IT, compliance and legal investigations. eDiscovery builds investigation workflows around data: cases, searches, data sources, holds, review sets, exports and activity tracking. They are distinct but closely connected capabilities.'
      },
      details: [
        {
          title: { it: 'Audit', en: 'Audit' },
          body: {
            it: 'Serve per cercare eventi e attività: chi ha fatto cosa, su quale servizio e quando. L’efficacia dipende da permessi, retention disponibile e conoscenza degli eventi realmente raccolti.',
            en: 'Used to search events and activities: who did what, in which service and when. Effectiveness depends on permissions, available retention and understanding which events are actually captured.'
          }
        },
        {
          title: { it: 'eDiscovery', en: 'eDiscovery' },
          body: {
            it: 'Serve a gestire un processo di ricerca e investigazione più strutturato, preservando contenuti quando necessario e organizzando materiale rilevante in casi e review set.',
            en: 'Used to manage a more structured search and investigation process, preserving content where required and organizing relevant material in cases and review sets.'
          }
        },
        {
          title: { it: 'Evidenze da cercare', en: 'Evidence to look for' },
          body: {
            it: 'Ruoli assegnati, log effettivamente consultabili, procedure di investigazione, casi precedenti, hold, retention e responsabilità tra Security, Legal e Compliance.',
            en: 'Assigned roles, logs actually searchable, investigation procedures, previous cases, holds, retention and responsibilities across Security, Legal and Compliance.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Purview Audit', en: 'Purview Audit' },
          url: 'https://learn.microsoft.com/en-us/purview/audit-solutions-overview'
        },
        {
          label: { it: 'Purview eDiscovery', en: 'Purview eDiscovery' },
          url: 'https://learn.microsoft.com/en-us/purview/edisc-features-components'
        }
      ]
    },
    {
      id: 'purview-insider-communication',
      eyebrow: { it: '08 · Rischio interno', en: '08 · Insider risk' },
      title: {
        it: 'Insider Risk e Communication Compliance: leggere il rischio umano senza perdere privacy e separazione dei ruoli',
        en: 'Insider Risk and Communication Compliance: understand human risk while preserving privacy and separation of duties'
      },
      body: {
        it: 'Insider Risk Management correla segnali per individuare potenziali attività interne rischiose, dolose o involontarie, e costruisce workflow di triage e investigazione. Communication Compliance applica policy alle comunicazioni per rilevare possibili violazioni regolatorie, di condotta o condivisione di informazioni sensibili. Microsoft documenta per queste soluzioni controlli privacy-by-design come pseudonimizzazione, RBAC e audit.',
        en: 'Insider Risk Management correlates signals to identify potentially risky internal activity, malicious or inadvertent, and provides triage and investigation workflows. Communication Compliance applies policies to communications to detect potential regulatory, conduct or sensitive-information violations. Microsoft documents privacy-by-design controls for these solutions such as pseudonymization, RBAC and auditing.'
      },
      details: [
        {
          title: { it: 'Insider Risk Management', en: 'Insider Risk Management' },
          body: {
            it: 'Le policy usano indicatori e condizioni per dare priorità a comportamenti potenzialmente rischiosi. Il risultato deve essere un processo di analisi governato, non una sorveglianza indiscriminata.',
            en: 'Policies use indicators and conditions to prioritize potentially risky behavior. The outcome should be a governed review process, not indiscriminate surveillance.'
          }
        },
        {
          title: { it: 'Communication Compliance', en: 'Communication Compliance' },
          body: {
            it: 'Può analizzare canali supportati e portare i match a reviewer autorizzati. Il disegno deve chiarire finalità, gruppi, criteri, reviewer, escalation e remediation.',
            en: 'It can analyze supported channels and route matches to authorized reviewers. Design should clarify purpose, populations, criteria, reviewers, escalation and remediation.'
          }
        },
        {
          title: { it: 'Governance necessaria', en: 'Required governance' },
          body: {
            it: 'Prima della tecnologia servono stakeholder, basi giuridiche e policy interne, segregazione dei ruoli, autorizzazioni, audit e procedure di gestione dei casi.',
            en: 'Before the technology, organizations need stakeholders, legal basis and internal policies, separation of duties, permissions, auditing and case-handling procedures.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Insider Risk Management', en: 'Insider Risk Management' },
          url: 'https://learn.microsoft.com/en-us/purview/insider-risk-management'
        },
        {
          label: { it: 'Communication Compliance', en: 'Communication Compliance' },
          url: 'https://learn.microsoft.com/en-us/purview/communication-compliance'
        }
      ]
    },
    {
      id: 'defender-xdr',
      eyebrow: { it: '09 · Threat Protection', en: '09 · Threat Protection' },
      title: {
        it: 'Microsoft Defender XDR: dagli alert isolati a un incidente correlato',
        en: 'Microsoft Defender XDR: from isolated alerts to a correlated incident'
      },
      body: {
        it: 'Defender XDR coordina prevenzione, detection, investigazione e risposta tra endpoint, identità, email e applicazioni. Il valore dell’XDR è la correlazione: un phishing, l’esecuzione su un endpoint, l’uso anomalo di un’identità e l’accesso a una cloud app possono essere letti come parti dello stesso attacco invece che come alert separati.',
        en: 'Defender XDR coordinates prevention, detection, investigation and response across endpoints, identities, email and applications. The value of XDR is correlation: phishing, endpoint execution, anomalous identity activity and access to a cloud app can be understood as parts of the same attack rather than isolated alerts.'
      },
      details: [
        {
          title: { it: 'Incidenti unificati', en: 'Unified incidents' },
          body: {
            it: 'Gli alert provenienti dai diversi workload vengono correlati in incidenti per aiutare il SOC a comprendere sequenza, entità coinvolte e impatto complessivo.',
            en: 'Alerts from different workloads are correlated into incidents to help the SOC understand sequence, involved entities and overall impact.'
          }
        },
        {
          title: { it: 'Advanced Hunting', en: 'Advanced Hunting' },
          body: {
            it: 'La telemetria dei workload supporta hunting e query per ricostruire attività, validare ipotesi e creare detection mirate. La copertura dipende dall’onboarding e dalla qualità dei segnali.',
            en: 'Workload telemetry supports hunting and queries to reconstruct activity, validate hypotheses and create targeted detections. Coverage depends on onboarding and signal quality.'
          }
        },
        {
          title: { it: 'Risposta e automazione', en: 'Response and automation' },
          body: {
            it: 'Le capacità di risposta possono intervenire su entità e artefatti, mentre l’automazione riduce il lavoro manuale. L’assessment verifica però anche governance, ownership, SLA e procedure del SOC.',
            en: 'Response capabilities can act on entities and artifacts, while automation reduces manual work. The assessment also checks SOC governance, ownership, SLAs and procedures.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Defender XDR overview', en: 'Defender XDR overview' },
          url: 'https://learn.microsoft.com/en-us/microsoft-365/security/defender/microsoft-365-defender'
        }
      ]
    },
    {
      id: 'defender-endpoint',
      eyebrow: { it: '10 · Endpoint', en: '10 · Endpoint' },
      title: {
        it: 'Defender for Endpoint: prevenzione, EDR, riduzione della superficie di attacco e risposta',
        en: 'Defender for Endpoint: prevention, EDR, attack-surface reduction and response'
      },
      body: {
        it: 'Microsoft Defender for Endpoint è la piattaforma di endpoint security della suite Defender. Combina protezione preventiva, riduzione della superficie di attacco, rilevamento e risposta endpoint, investigazione automatizzata e capacità di vulnerability management in base al piano disponibile. Per l’assessment è importante distinguere dispositivo “onboarded” da dispositivo realmente protetto con policy, sensori, update e response funzionanti.',
        en: 'Microsoft Defender for Endpoint is the endpoint-security platform within the Defender suite. It combines preventive protection, attack-surface reduction, endpoint detection and response, automated investigation, and vulnerability-management capabilities depending on the available plan. For the assessment it is important to distinguish a merely “onboarded” device from one actually protected by working policies, sensors, updates and response.'
      },
      details: [
        {
          title: { it: 'Attack Surface Reduction', en: 'Attack Surface Reduction' },
          body: {
            it: 'ASR, network protection, device control e altri hardening riducono le opportunità di esecuzione e abuso prima che l’attacco diventi un incidente EDR.',
            en: 'ASR, network protection, device control and other hardening reduce opportunities for execution and abuse before an attack becomes an EDR incident.'
          }
        },
        {
          title: { it: 'EDR e hunting', en: 'EDR and hunting' },
          body: {
            it: 'I segnali comportamentali consentono detection quasi real-time, investigazione, response e hunting. Un endpoint senza telemetria affidabile crea un punto cieco anche se l’antivirus è presente.',
            en: 'Behavioral signals enable near-real-time detection, investigation, response and hunting. An endpoint without reliable telemetry creates a blind spot even if antivirus is present.'
          }
        },
        {
          title: { it: 'AIR e remediation', en: 'AIR and remediation' },
          body: {
            it: 'Automated Investigation and Response può analizzare evidenze e applicare remediation in base al livello di automazione. Va verificato se l’automazione è effettivamente abilitata e governata.',
            en: 'Automated Investigation and Response can analyze evidence and apply remediation depending on automation level. Verify whether automation is actually enabled and governed.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Defender for Endpoint', en: 'Defender for Endpoint' },
          url: 'https://learn.microsoft.com/en-us/defender-endpoint/'
        }
      ]
    },
    {
      id: 'defender-office',
      eyebrow: { it: '11 · Email e collaboration', en: '11 · Email and collaboration' },
      title: {
        it: 'Defender for Office 365: proteggere il principale canale di ingresso del social engineering',
        en: 'Defender for Office 365: protect a primary social-engineering entry channel'
      },
      body: {
        it: 'Defender for Office 365 protegge email e strumenti di collaborazione con policy di threat protection, reporting, investigazione e risposta. Safe Links e Safe Attachments sono controlli centrali per URL e allegati, mentre le preset security policy aiutano a costruire baseline coerenti. La maturità non si misura dalla licenza: bisogna verificare copertura utenti, policy applicate, eccezioni, autenticazione email e capacità di investigazione.',
        en: 'Defender for Office 365 protects email and collaboration tools with threat-protection policies, reporting, investigation and response. Safe Links and Safe Attachments are core controls for URLs and attachments, while preset security policies help establish consistent baselines. Maturity is not measured by licensing: verify user coverage, applied policies, exceptions, email authentication and investigation capability.'
      },
      details: [
        {
          title: { it: 'Prevenzione', en: 'Prevention' },
          body: {
            it: 'La baseline comprende configurazioni anti-phishing/anti-spoof e protezioni su link e allegati. Eccezioni e allow-list troppo ampie possono annullare controlli altrimenti corretti.',
            en: 'The baseline includes anti-phishing/anti-spoof configuration and protections for links and attachments. Broad exceptions and allow lists can undermine otherwise sound controls.'
          }
        },
        {
          title: { it: 'Investigazione', en: 'Investigation' },
          body: {
            it: 'Il SOC deve poter ricostruire campagne, messaggi, URL, allegati e utenti coinvolti, collegando gli eventi al resto dell’incidente Defender XDR.',
            en: 'The SOC should be able to reconstruct campaigns, messages, URLs, attachments and impacted users, connecting them to the broader Defender XDR incident.'
          }
        },
        {
          title: { it: 'Metriche', en: 'Metrics' },
          body: {
            it: 'Copertura Safe Links/Safe Attachments, policy standard/strict, rischi dovuti ad allow, messaggi post-delivery e tempo di remediation sono esempi di evidenze utili.',
            en: 'Safe Links/Safe Attachments coverage, standard/strict policy adoption, risky allows, post-delivery activity and remediation time are useful evidence examples.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Defender for Office 365', en: 'Defender for Office 365' },
          url: 'https://learn.microsoft.com/en-us/defender-office-365/'
        },
        {
          label: { it: 'Overview dashboard e controlli', en: 'Overview dashboard and controls' },
          url: 'https://learn.microsoft.com/en-us/defender-office-365/reports-mdo-email-collaboration-dashboard'
        }
      ]
    },
    {
      id: 'defender-identity',
      eyebrow: { it: '12 · Identity Threat Detection', en: '12 · Identity Threat Detection' },
      title: {
        it: 'Defender for Identity: vedere attacchi che usano account, privilegi e movimento laterale',
        en: 'Defender for Identity: see attacks that use accounts, privilege and lateral movement'
      },
      body: {
        it: 'Microsoft Defender for Identity rileva e investiga attacchi basati sull’identità in ambienti on-premises, cloud e ibridi. Analizza segnali di Active Directory, Microsoft Entra ID e integrazioni supportate per evidenziare ricognizione, abuso di credenziali, escalation di privilegi e movimento laterale. I segnali confluiscono nel portale Defender e vengono correlati con endpoint, email, SaaS e altri workload.',
        en: 'Microsoft Defender for Identity detects and investigates identity-based attacks across on-premises, cloud and hybrid environments. It analyzes signals from Active Directory, Microsoft Entra ID and supported integrations to surface reconnaissance, credential abuse, privilege escalation and lateral movement. Signals flow into the Defender portal and are correlated with endpoint, email, SaaS and other workloads.'
      },
      details: [
        {
          title: { it: 'Posture', en: 'Posture' },
          body: {
            it: 'Oltre alla detection, evidenzia debolezze e configurazioni identitarie che possono facilitare un attacco, aiutando a ridurre la superficie di rischio prima dell’incidente.',
            en: 'Beyond detection, it highlights identity weaknesses and configurations that can facilitate attacks, helping reduce risk before an incident.'
          }
        },
        {
          title: { it: 'Detection', en: 'Detection' },
          body: {
            it: 'Profili comportamentali e intelligence aiutano a identificare attività anomale su utenti, account di servizio e altre identità, con contesto utile per la triage.',
            en: 'Behavioral profiles and threat intelligence help identify anomalous activity affecting users, service accounts and other identities, with context for triage.'
          }
        },
        {
          title: { it: 'Copertura', en: 'Coverage' },
          body: {
            it: 'Sensori, connettori e sorgenti devono essere effettivamente distribuiti e funzionanti. Una parte dell’infrastruttura identitaria non monitorata può lasciare buchi nella catena di detection.',
            en: 'Sensors, connectors and sources must actually be deployed and healthy. Unmonitored identity infrastructure can leave gaps in the detection chain.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Defender for Identity', en: 'Defender for Identity' },
          url: 'https://learn.microsoft.com/en-us/defender-for-identity/what-is'
        }
      ]
    },
    {
      id: 'defender-cloud-apps',
      eyebrow: { it: '13 · SaaS e Cloud Apps', en: '13 · SaaS and Cloud Apps' },
      title: {
        it: 'Defender for Cloud Apps: visibilità sul SaaS, Shadow IT, posture e controllo delle sessioni',
        en: 'Defender for Cloud Apps: SaaS visibility, Shadow IT, posture and session control'
      },
      body: {
        it: 'Microsoft Defender for Cloud Apps combina funzionalità CASB, SaaS Security Posture Management, threat protection e app-to-app protection. Può aiutare a scoprire uso di applicazioni cloud, valutare il rischio del SaaS, governare app OAuth e applicare controlli su dati e sessioni nei casi supportati. È particolarmente rilevante quando i dati aziendali escono dal perimetro delle sole applicazioni Microsoft.',
        en: 'Microsoft Defender for Cloud Apps combines CASB capabilities, SaaS Security Posture Management, threat protection and app-to-app protection. It can help discover cloud-app usage, assess SaaS risk, govern OAuth apps and apply data/session controls in supported scenarios. It is particularly relevant when business data moves beyond Microsoft-only applications.'
      },
      details: [
        {
          title: { it: 'Cloud Discovery', en: 'Cloud Discovery' },
          body: {
            it: 'L’analisi dei log di traffico può evidenziare applicazioni cloud utilizzate e relativo rischio, aiutando a rendere visibile lo Shadow IT.',
            en: 'Traffic-log analysis can reveal cloud applications in use and their risk, helping make Shadow IT visible.'
          }
        },
        {
          title: { it: 'SaaS posture e OAuth', en: 'SaaS posture and OAuth' },
          body: {
            it: 'Il rischio non riguarda solo l’utente: configurazioni deboli e applicazioni OAuth con privilegi eccessivi possono diventare vie di accesso ai dati.',
            en: 'Risk is not only about users: weak SaaS configuration and overprivileged OAuth applications can become paths to data.'
          }
        },
        {
          title: { it: 'Data protection', en: 'Data protection' },
          body: {
            it: 'Le integrazioni con Information Protection e DLP consentono di portare sensibilità del dato e controlli in scenari cloud supportati, anche durante l’uso.',
            en: 'Integrations with Information Protection and DLP can extend data sensitivity and controls to supported cloud scenarios, including data in use.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Defender for Cloud Apps', en: 'Defender for Cloud Apps' },
          url: 'https://learn.microsoft.com/en-us/defender-cloud-apps/'
        },
        {
          label: { it: 'Cloud Discovery', en: 'Cloud Discovery' },
          url: 'https://learn.microsoft.com/en-us/defender-cloud-apps/set-up-cloud-discovery'
        }
      ]
    },
    {
      id: 'sentinel',
      eyebrow: { it: '14 · SIEM e SOC', en: '14 · SIEM and SOC' },
      title: {
        it: 'Microsoft Sentinel: portare nel SOC segnali Microsoft, cloud, on-premises e terze parti',
        en: 'Microsoft Sentinel: bring Microsoft, cloud, on-premises and third-party signals into the SOC'
      },
      body: {
        it: 'Microsoft Sentinel è il SIEM cloud-native di Microsoft e una piattaforma di sicurezza unificata. Raccoglie dati tramite connettori, normalizza sorgenti eterogenee, applica analytics per produrre alert e incidenti, supporta hunting e automazione. Nel portale Defender converge con Defender XDR per ridurre la separazione tra incidenti XDR e telemetria SIEM.',
        en: 'Microsoft Sentinel is Microsoft’s cloud-native SIEM and unified security platform. It collects data through connectors, normalizes heterogeneous sources, applies analytics to produce alerts and incidents, and supports hunting and automation. In the Defender portal it converges with Defender XDR to reduce separation between XDR incidents and SIEM telemetry.'
      },
      details: [
        {
          title: { it: 'Ingestion e connettori', en: 'Ingestion and connectors' },
          body: {
            it: 'La copertura del SIEM dipende da quali sorgenti vengono realmente raccolte, con quali volumi e con quale qualità. Connettori mancanti o rumorosi impattano detection, costo e capacità di investigazione.',
            en: 'SIEM coverage depends on which sources are actually collected, at what volume and quality. Missing or noisy connectors affect detection, cost and investigation capability.'
          }
        },
        {
          title: { it: 'Analytics e incidenti', en: 'Analytics and incidents' },
          body: {
            it: 'Le regole analytics trasformano telemetria in segnali investigabili. La maturità richiede ownership delle regole, tuning, gestione dei falsi positivi e mapping a use case reali.',
            en: 'Analytics rules turn telemetry into investigable signals. Maturity requires rule ownership, tuning, false-positive management and mapping to real use cases.'
          }
        },
        {
          title: { it: 'Hunting e automazione', en: 'Hunting and automation' },
          body: {
            it: 'Query, playbook e automazioni devono ridurre tempo di risposta senza nascondere la logica al team. È essenziale sapere quali processi sono automatici e quali richiedono decisione umana.',
            en: 'Queries, playbooks and automations should reduce response time without hiding logic from the team. It is essential to know which processes are automated and which require human decisions.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Microsoft Sentinel SIEM', en: 'Microsoft Sentinel SIEM' },
          url: 'https://learn.microsoft.com/en-us/azure/sentinel/overview'
        },
        {
          label: { it: 'Sentinel platform overview', en: 'Sentinel platform overview' },
          url: 'https://learn.microsoft.com/en-us/azure/sentinel/sentinel-overview'
        }
      ]
    },
    {
      id: 'ai-data-security',
      eyebrow: { it: '15 · AI e Copilot', en: '15 · AI and Copilot' },
      title: {
        it: 'L’AI amplifica il valore dei dati e anche gli errori di governance già presenti',
        en: 'AI amplifies the value of data—and existing governance mistakes'
      },
      body: {
        it: 'Microsoft 365 Copilot eredita i controlli di sicurezza, compliance e privacy di Microsoft 365, ma può rendere molto più evidente un problema di oversharing già esistente. Microsoft Purview estende classificazione, DLP, audit, eDiscovery, retention e altri controlli alle interazioni AI supportate; DSPM e DSPM for AI aiutano a osservare postura, attività e rischi dati legati all’adozione dell’AI. La readiness AI è quindi prima di tutto readiness del dato e dell’identità.',
        en: 'Microsoft 365 Copilot inherits Microsoft 365 security, compliance and privacy controls, but can make existing oversharing much more visible. Microsoft Purview extends classification, DLP, audit, eDiscovery, retention and other controls to supported AI interactions; DSPM and DSPM for AI help observe posture, activity and data risks related to AI adoption. AI readiness is therefore first and foremost data and identity readiness.'
      },
      details: [
        {
          title: { it: 'Oversharing', en: 'Oversharing' },
          body: {
            it: 'Se un utente ha accesso legittimo ma eccessivo a contenuti, un assistente AI può rendere più semplice trovare e usare quel contenuto. Prima del rollout vanno quindi ridotti accessi e condivisioni non necessari.',
            en: 'If a user has legitimate but excessive access to content, an AI assistant can make that content easier to find and use. Unnecessary access and sharing should therefore be reduced before rollout.'
          }
        },
        {
          title: { it: 'Purview per AI', en: 'Purview for AI' },
          body: {
            it: 'Le capacità Purview supportate possono aiutare a classificare dati, applicare DLP, ricercare attività nel log di audit, gestire retention e investigazioni relative alle interazioni AI.',
            en: 'Supported Purview capabilities can help classify data, enforce DLP, search activity in audit logs, manage retention and investigate AI interactions.'
          }
        },
        {
          title: { it: 'DSPM', en: 'DSPM' },
          body: {
            it: 'Data Security Posture Management centralizza insight e raccomandazioni sui rischi del dato; le esperienze per AI aggiungono visibilità su utilizzo di applicazioni generative e rischi come la sovra-condivisione.',
            en: 'Data Security Posture Management centralizes insights and recommendations for data risk; AI-focused experiences add visibility into generative-AI usage and risks such as oversharing.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Security for Microsoft Copilot', en: 'Security for Microsoft Copilot' },
          url: 'https://learn.microsoft.com/en-us/microsoft-365/copilot/security-microsoft-365-copilot'
        },
        {
          label: { it: 'Purview e Microsoft 365 Copilot', en: 'Purview and Microsoft 365 Copilot' },
          url: 'https://learn.microsoft.com/en-us/purview/ai-m365-copilot'
        },
        {
          label: { it: 'DSPM for AI', en: 'DSPM for AI' },
          url: 'https://learn.microsoft.com/en-us/purview/dspm-for-ai'
        }
      ]
    },
    {
      id: 'security-copilot',
      eyebrow: { it: '16 · AI per Security', en: '16 · AI for Security' },
      title: {
        it: 'Microsoft Security Copilot: accelerare il lavoro degli specialisti, non sostituire il processo',
        en: 'Microsoft Security Copilot: accelerate specialists, not replace the process'
      },
      body: {
        it: 'Security Copilot porta capacità generative nei workflow di security, identity e data protection e si integra con esperienze Microsoft come Defender, Sentinel, Entra e Purview. Può supportare sintesi, triage, investigazione, query, remediation e automazioni/agent in scenari supportati. Il beneficio dipende però dalla qualità dei segnali, dai permessi, dalle procedure e dalla capacità del team di validare l’output.',
        en: 'Security Copilot brings generative capabilities into security, identity and data-protection workflows and integrates with Microsoft experiences such as Defender, Sentinel, Entra and Purview. It can support summarization, triage, investigation, queries, remediation and agents/automation in supported scenarios. Its value still depends on signal quality, permissions, procedures and the team’s ability to validate output.'
      },
      details: [
        {
          title: { it: 'Copilot embedded', en: 'Embedded Copilot' },
          body: {
            it: 'Le funzionalità possono comparire direttamente nei prodotti e portare il contesto del workload nell’esperienza di analisi, riducendo passaggi manuali tra strumenti.',
            en: 'Capabilities can appear directly in products and bring workload context into the analysis experience, reducing manual switching between tools.'
          }
        },
        {
          title: { it: 'Agenti', en: 'Agents' },
          body: {
            it: 'Gli agenti possono automatizzare attività ripetitive ad alto volume. Le funzionalità agentiche evolvono rapidamente e vanno trattate con governance, monitoraggio e chiarezza sulle azioni consentite.',
            en: 'Agents can automate repetitive high-volume tasks. Agentic capabilities evolve quickly and should be governed, monitored and constrained by clear action boundaries.'
          }
        },
        {
          title: { it: 'Prerequisito operativo', en: 'Operational prerequisite' },
          body: {
            it: 'Copilot non corregge una telemetria mancante o un processo SOC non definito. Prima va resa affidabile la base: dati, ruoli, detection, runbook ed escalation.',
            en: 'Copilot does not fix missing telemetry or an undefined SOC process. The foundation—data, roles, detections, runbooks and escalation—must be reliable first.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Security Copilot', en: 'Security Copilot' },
          url: 'https://learn.microsoft.com/en-us/copilot/security/'
        },
        {
          label: { it: 'Security Copilot in Purview', en: 'Security Copilot in Purview' },
          url: 'https://learn.microsoft.com/en-us/purview/copilot-in-purview-overview'
        }
      ]
    },
    {
      id: 'ecosystem-integration',
      eyebrow: { it: '17 · Architettura', en: '17 · Architecture' },
      title: {
        it: 'Come si incastrano i pezzi: identità decide, il dato porta contesto, XDR rileva, SIEM estende, il SOC risponde',
        en: 'How the pieces fit: identity decides, data adds context, XDR detects, SIEM extends, the SOC responds'
      },
      body: {
        it: 'Le tecnologie non vanno valutate come silos. Entra determina chi può accedere e con quali condizioni; Purview descrive e protegge il dato; Defender raccoglie segnali e rileva comportamenti malevoli su endpoint, identità, email e applicazioni; Sentinel estende raccolta, analytics e automazione a sorgenti più ampie. La maturità nasce quando policy, telemetria, incidenti e remediation sono collegati in un processo operativo.',
        en: 'The technologies should not be assessed as silos. Entra determines who can access and under which conditions; Purview describes and protects data; Defender collects signals and detects malicious behavior across endpoints, identities, email and applications; Sentinel extends collection, analytics and automation to broader sources. Maturity emerges when policies, telemetry, incidents and remediation are connected into an operating process.'
      },
      bullets: [
        {
          it: 'Accesso: Entra ID, Conditional Access, Identity Protection, Governance e PIM riducono rischio e privilegi eccessivi.',
          en: 'Access: Entra ID, Conditional Access, Identity Protection, Governance and PIM reduce risk and excessive privilege.'
        },
        {
          it: 'Dato: Data Map/Unified Catalog, Information Protection, DLP, lifecycle, records e compliance danno contesto e controllo alle informazioni.',
          en: 'Data: Data Map/Unified Catalog, Information Protection, DLP, lifecycle, records and compliance provide context and control for information.'
        },
        {
          it: 'Detection: Defender XDR correla segnali di endpoint, identità, email e SaaS; Sentinel amplia la visibilità del SOC.',
          en: 'Detection: Defender XDR correlates endpoint, identity, email and SaaS signals; Sentinel broadens SOC visibility.'
        },
        {
          it: 'Response: persone, runbook, automazioni, SLA e action plan trasformano la tecnologia in capacità operativa misurabile.',
          en: 'Response: people, runbooks, automation, SLAs and action plans turn technology into measurable operational capability.'
        }
      ]
    },
    {
      id: 'evidence-first',
      eyebrow: { it: '18 · Metodo', en: '18 · Method' },
      title: {
        it: 'Non chiediamo “avete il prodotto?”: chiediamo “qual è l’evidenza che il controllo funziona?”',
        en: 'We do not ask “do you own the product?”: we ask “what evidence shows the control works?”'
      },
      body: {
        it: 'Una licenza acquistata, un portale accessibile o una policy creata non dimostrano maturità. Per ogni domanda l’assessment propone un esempio e un’evidenza da cercare: screenshot di configurazione, copertura utenti/dispositivi, log, report, incidenti, procedure, RACI, eccezioni, review e metriche. Se l’evidenza non è disponibile, la risposta deve rifletterlo.',
        en: 'A purchased license, an accessible portal or a created policy does not prove maturity. For each question the assessment proposes an example and evidence to look for: configuration screenshots, user/device coverage, logs, reports, incidents, procedures, RACI, exceptions, reviews and metrics. If evidence is unavailable, the answer should reflect that.'
      },
      details: [
        {
          title: { it: 'Configurato', en: 'Configured' },
          body: {
            it: 'Esiste una configurazione coerente con l’obiettivo, con scope e dipendenze note.',
            en: 'A configuration exists that aligns with the objective, with known scope and dependencies.'
          }
        },
        {
          title: { it: 'Coperto', en: 'Covered' },
          body: {
            it: 'Il controllo raggiunge realmente utenti, dispositivi, dati e workload previsti; le esclusioni sono conosciute.',
            en: 'The control actually reaches the intended users, devices, data and workloads; exclusions are known.'
          }
        },
        {
          title: { it: 'Operato', en: 'Operated' },
          body: {
            it: 'Alert, eccezioni, incidenti e richieste vengono gestiti da persone con responsabilità e tempi definiti.',
            en: 'Alerts, exceptions, incidents and requests are handled by people with defined responsibilities and timelines.'
          }
        },
        {
          title: { it: 'Misurato', en: 'Measured' },
          body: {
            it: 'KPI, trend, review e test dimostrano se il controllo migliora nel tempo e se produce il risultato atteso.',
            en: 'KPIs, trends, reviews and tests demonstrate whether the control improves over time and delivers the expected outcome.'
          }
        }
      ]
    },
    {
      id: 'how-to-answer',
      eyebrow: { it: '19 · Compilazione', en: '19 · Answering' },
      title: {
        it: '“Non so” è una risposta utile: segnala un punto cieco che va trasformato in un’azione',
        en: '“Unknown” is useful: it identifies a blind spot that should become an action'
      },
      body: {
        it: 'Quando una funzione è gestita da un fornitore, da un altro team o semplicemente non è visibile ai partecipanti, non bisogna stimare. “Non so” indica un gap di visibilità, ownership o knowledge transfer. Dopo il questionario questi punti vengono separati dai gap tecnici e possono entrare direttamente nel piano d’azione.',
        en: 'When a capability is managed by a supplier, another team or is simply not visible to participants, do not guess. “Unknown” indicates a visibility, ownership or knowledge-transfer gap. After the questionnaire these points are separated from technical gaps and can flow directly into the action plan.'
      },
      bullets: [
        {
          it: '0–1: controllo assente, ad hoc o non verificabile.',
          en: '0–1: control absent, ad hoc or not verifiable.'
        },
        {
          it: '2–3: controllo parziale, non uniforme o ancora dipendente da attività manuali.',
          en: '2–3: partial or inconsistent control, still dependent on manual activity.'
        },
        {
          it: '4–5: controllo esteso, governato, misurato e mantenuto nel tempo.',
          en: '4–5: broadly deployed, governed, measured and maintained over time.'
        },
        {
          it: 'N/A: il requisito non appartiene al perimetro concordato; va usato consapevolmente, non come risposta di comodo.',
          en: 'N/A: the requirement is outside the agreed scope; use it deliberately, not as an easy fallback.'
        }
      ]
    },
    {
      id: 'journey',
      eyebrow: { it: '20 · Percorso', en: '20 · Journey' },
      title: {
        it: 'Envision → Assess → Prioritize → Act → Measure',
        en: 'Envision → Assess → Prioritize → Act → Measure'
      },
      body: {
        it: 'Il questionario non è il punto di arrivo. L’envisioning crea un linguaggio comune; l’assessment misura lo stato attuale; i risultati distinguono gap tecnici, copertura e visibilità; l’Action Plan assegna owner e priorità; le compilazioni successive mostrano il trend. In questo modo una conversazione sulla tecnologia diventa una roadmap verificabile.',
        en: 'The questionnaire is not the end state. Envisioning creates a shared language; the assessment measures current state; results distinguish technical, coverage and visibility gaps; the Action Plan assigns owners and priorities; later runs show the trend. This turns a technology conversation into a verifiable roadmap.'
      }
    }
  ],
  questions
};
