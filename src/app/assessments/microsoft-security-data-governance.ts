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
  version: '1.0.0',
  title: {
    it: 'Microsoft Security & Data Governance',
    en: 'Microsoft Security & Data Governance'
  },
  shortDescription: {
    it: 'Self-assessment su governance del dato, Purview, DLP, identità, Defender XDR, Sentinel e awareness.',
    en: 'Self-assessment covering data governance, Purview, DLP, identity, Defender XDR, Sentinel and awareness.'
  },
  longDescription: {
    it: 'Pensato per creare una fotografia condivisa dello stato attuale, far emergere ciò che è attivo, ciò che non viene utilizzato e ciò che non è ancora conosciuto, e trasformare i gap in priorità di adozione concrete.',
    en: 'Designed to create a shared view of the current state, surface what is active, unused or not yet understood, and turn gaps into concrete adoption priorities.'
  },
  estimatedMinutes: 45,
  tags: [
    'Microsoft Purview',
    'DLP',
    'Defender XDR',
    'Sentinel',
    'Entra ID',
    'Data Governance'
  ],
  accent: '#18c8ff',
  intro: [
    {
      id: 'purpose',
      eyebrow: { it: 'Envisioning', en: 'Envisioning' },
      title: {
        it: 'Partire dal dato, senza perdere la visione d’insieme',
        en: 'Start from the data without losing the big picture'
      },
      body: {
        it: 'L’obiettivo non è verificare una lista di prodotti Microsoft, ma capire come identità, dati, endpoint e operazioni di sicurezza lavorano insieme e dove serve aumentare governance, visibilità e capacità decisionale.',
        en: 'The goal is not to check a list of Microsoft products, but to understand how identity, data, endpoints and security operations work together and where governance, visibility and decision-making need to improve.'
      }
    },
    {
      id: 'ecosystem',
      eyebrow: { it: 'Ecosistema', en: 'Ecosystem' },
      title: {
        it: 'Entra, Purview, Defender XDR e Sentinel hanno ruoli diversi ma complementari',
        en: 'Entra, Purview, Defender XDR and Sentinel have different but complementary roles'
      },
      body: {
        it: 'Entra governa identità e accessi. Purview scopre, classifica e protegge i dati. Defender XDR correla segnali e incidenti nell’ecosistema Microsoft. Sentinel estende la visione SIEM a log e sorgenti eterogenee.',
        en: 'Entra governs identities and access. Purview discovers, classifies and protects data. Defender XDR correlates signals and incidents across the Microsoft ecosystem. Sentinel extends SIEM visibility to heterogeneous logs and data sources.'
      },
      bullets: [
        {
          it: 'Purview: classificazione, DLP, ciclo di vita, insider risk e protezione nell’uso dell’AI.',
          en: 'Purview: classification, DLP, lifecycle, insider risk and protection when using AI.'
        },
        {
          it: 'Defender XDR: incidenti correlati tra email, identità, endpoint e cloud app.',
          en: 'Defender XDR: correlated incidents across email, identity, endpoints and cloud apps.'
        },
        {
          it: 'Sentinel: telemetria, correlazione e automazione su sorgenti Microsoft e non Microsoft.',
          en: 'Sentinel: telemetry, correlation and automation across Microsoft and non-Microsoft sources.'
        }
      ]
    },
    {
      id: 'data-focus',
      eyebrow: { it: 'Focus dati', en: 'Data focus' },
      title: {
        it: 'Il valore emerge sui casi reali: share legacy, oversharing e Data Loss Prevention',
        en: 'Value emerges from real cases: legacy shares, oversharing and Data Loss Prevention'
      },
      body: {
        it: 'Repository non indicizzati, documenti senza owner, condivisioni esterne, dati sensibili e nuovi strumenti AI richiedono controlli che vadano oltre il semplice governo degli accessi. L’assessment serve a capire quali controlli esistono davvero e quanto sono conosciuti.',
        en: 'Unindexed repositories, ownerless documents, external sharing, sensitive data and new AI tools require controls beyond access governance alone. The assessment helps determine which controls really exist and how well they are understood.'
      }
    },
    {
      id: 'journey',
      eyebrow: { it: 'Percorso', en: 'Journey' },
      title: {
        it: 'Envision → Assess → Prioritize → Pilot → Adopt → Measure',
        en: 'Envision → Assess → Prioritize → Pilot → Adopt → Measure'
      },
      body: {
        it: 'Il questionario non è il punto di arrivo. È uno strumento per selezionare le aree da approfondire, costruire pilot mirati, accompagnare l’adozione e misurare nel tempo il miglioramento.',
        en: 'The questionnaire is not the end state. It is a tool to select areas for deeper investigation, design targeted pilots, support adoption and measure improvement over time.'
      }
    },
    {
      id: 'how-to-answer',
      eyebrow: { it: 'Come usarlo', en: 'How to use it' },
      title: {
        it: '“Non so” è una risposta utile',
        en: '“Unknown” is a useful answer'
      },
      body: {
        it: 'Quando una funzione è affidata a consulenti o non è visibile internamente, non serve indovinare. Una risposta “Non so” evidenzia un gap di governance o knowledge transfer. Per ogni domanda sono disponibili un esempio concreto e le evidenze da cercare.',
        en: 'When a capability is managed by consultants or is not visible internally, do not guess. An “Unknown” answer exposes a governance or knowledge-transfer gap. Every question includes a concrete example and evidence to look for.'
      }
    }
  ],
  questions
};
