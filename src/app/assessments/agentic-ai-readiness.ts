import type { AssessmentDefinition } from '../models';
import { agenticArea1Questions } from './agentic-ai-readiness.area-01';
import { agenticArea2Questions } from './agentic-ai-readiness.area-02';
import { agenticArea3Questions } from './agentic-ai-readiness.area-03';
import { agenticArea4Questions } from './agentic-ai-readiness.area-04';
import { agenticArea5Questions } from './agentic-ai-readiness.area-05';
import { agenticArea6Questions } from './agentic-ai-readiness.area-06';
import { agenticArea7Questions } from './agentic-ai-readiness.area-07';
import { agenticArea8Questions } from './agentic-ai-readiness.area-08';
import { agenticArea9Questions } from './agentic-ai-readiness.area-09';
import { agenticArea10Questions } from './agentic-ai-readiness.area-10';
import { agenticArea11Questions } from './agentic-ai-readiness.area-11';

const questions = [
  ...agenticArea1Questions,
  ...agenticArea2Questions,
  ...agenticArea3Questions,
  ...agenticArea4Questions,
  ...agenticArea5Questions,
  ...agenticArea6Questions,
  ...agenticArea7Questions,
  ...agenticArea8Questions,
  ...agenticArea9Questions,
  ...agenticArea10Questions,
  ...agenticArea11Questions
];

export const agenticAiReadiness: AssessmentDefinition = {
  id: 'agentic-ai-readiness',
  version: '1.0.0',
  title: {
    it: 'Microsoft Agentic AI Readiness',
    en: 'Microsoft Agentic AI Readiness'
  },
  shortDescription: {
    it: 'Readiness assessment su agenti AI, automazione, Microsoft Copilot, Foundry, governance, Responsible AI, EU AI Act e agentic development.',
    en: 'Readiness assessment covering AI agents, automation, Microsoft Copilot, Foundry, governance, Responsible AI, EU AI Act, and agentic development.'
  },
  longDescription: {
    it: 'Un percorso di envisioning e assessment per capire se l’organizzazione è pronta a passare dall’AI assistiva ad agenti che usano dati, tool e automazioni per svolgere lavoro. Misura strategia, processo, accountability umana, dati, identità, sicurezza, Responsible AI, EU AI Act, stack Microsoft, interoperabilità, GitHub Copilot, evaluation e operations. La modalità Essential usa 18 domande chiave; la modalità Full estende la valutazione a 62 domande.',
    en: 'An envisioning and assessment journey to understand whether the organization is ready to move from assistive AI to agents that use data, tools, and automation to perform work. It measures strategy, process, human accountability, data, identity, security, Responsible AI, EU AI Act, Microsoft platforms, interoperability, GitHub Copilot, evaluation, and operations. Essential mode uses 18 key questions; Full mode expands the assessment to 62 questions.'
  },
  estimatedMinutes: 50,
  tags: [
    'Agentic AI',
    'Microsoft 365 Copilot',
    'Copilot Studio',
    'Microsoft Foundry',
    'Agent 365',
    'Entra Agent ID',
    'EU AI Act',
    'GitHub Copilot'
  ],
  accent: '#8b5cf6',
  intro: [
    {
      id: 'agentic-maturity',
      eyebrow: { it: '01 · Envisioning', en: '01 · Envisioning' },
      title: {
        it: 'Da AI assistiva a organizzazione agentica',
        en: 'From assistive AI to an agentic organization'
      },
      body: {
        it: 'Un copilota aiuta una persona a produrre o comprendere informazioni. Un agente aggiunge capacità di pianificare attività, scegliere strumenti, usare conoscenza e compiere azioni. La readiness non dipende quindi dal numero di chatbot o licenze acquistate, ma dalla capacità di collegare valore, processo, tecnologia, sicurezza, governance e responsabilità umana.',
        en: 'A copilot helps a person create or understand information. An agent adds the ability to plan work, select tools, use knowledge, and take actions. Readiness therefore depends not on the number of chatbots or licenses purchased, but on the organization’s ability to connect value, process, technology, security, governance, and human accountability.'
      },
      details: [
        {
          title: { it: 'Maturità multidimensionale', en: 'Multidimensional maturity' },
          body: {
            it: 'Microsoft descrive la maturità agentica attraverso strategia ed esperienza, trasformazione dei processi, governance e sicurezza, tecnologia e dati, organizzazione e cultura. Un’area forte non compensa automaticamente una debolezza critica nelle altre.',
            en: 'Microsoft describes agentic maturity across strategy and experience, business-process transformation, governance and security, technology and data, and organization and culture. Strength in one area does not automatically compensate for a critical weakness in another.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Agentic AI adoption maturity model', en: 'Agentic AI adoption maturity model' },
          url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/maturity-model-overview'
        },
        {
          label: { it: 'Agents hub Microsoft', en: 'Microsoft Agents hub' },
          url: 'https://learn.microsoft.com/en-us/agents/'
        }
      ]
    },
    {
      id: 'agent-anatomy',
      eyebrow: { it: '02 · Concetti', en: '02 · Concepts' },
      title: {
        it: 'Un agente è più di un modello linguistico',
        en: 'An agent is more than a language model'
      },
      body: {
        it: 'Un agente combina modello, istruzioni, conoscenza, stato o memoria, tool e identità. L’orchestrazione decide come interpretare la richiesta, pianificare i passaggi e scegliere quali capability invocare. Ogni elemento aggiunge valore ma anche failure mode, dipendenze e superficie di rischio.',
        en: 'An agent combines a model, instructions, knowledge, state or memory, tools, and identity. Orchestration decides how to interpret a request, plan steps, and select which capabilities to invoke. Each element adds value but also failure modes, dependencies, and risk surface.'
      },
      details: [
        {
          title: { it: 'Reasoning e azione', en: 'Reasoning and action' },
          body: {
            it: 'Il modello può scegliere un tool o una fonte; il tool esegue invece un’azione reale. Questa separazione è fondamentale per progettare controlli, permessi e test.',
            en: 'The model may choose a tool or source; the tool performs a real action. This separation is fundamental when designing controls, permissions, and tests.'
          }
        },
        {
          title: { it: 'Stato e memoria', en: 'State and memory' },
          body: {
            it: 'Conservare contesto rende l’agente più utile, ma introduce esigenze di retention, privacy, qualità e cancellazione.',
            en: 'Retaining context makes the agent more useful, but introduces retention, privacy, quality, and deletion requirements.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Agents for Microsoft 365 Copilot', en: 'Agents for Microsoft 365 Copilot' },
          url: 'https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agents-overview'
        },
        {
          label: { it: 'Microsoft Foundry Agent Service', en: 'Microsoft Foundry Agent Service' },
          url: 'https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview'
        }
      ]
    },
    {
      id: 'accountability-autonomy',
      eyebrow: { it: '03 · Mindset', en: '03 · Mindset' },
      title: {
        it: 'Delegare lavoro non significa delegare accountability',
        en: 'Delegating work does not mean delegating accountability'
      },
      body: {
        it: 'Più autonomia viene concessa a un agente, più devono essere chiari owner, decision rights, supervisione ed escalation. “È colpa dell’AI” non è un modello operativo: errori e incidenti vanno analizzati come risultato di un sistema composto da processo, dati, istruzioni, modello, tool, permessi e persone.',
        en: 'The more autonomy an agent receives, the clearer ownership, decision rights, oversight, and escalation must become. “The AI was wrong” is not an operating model: failures and incidents must be analyzed as outcomes of a system made of process, data, instructions, model, tools, permissions, and people.'
      },
      details: [
        {
          title: { it: 'Accountability nominativa', en: 'Named accountability' },
          body: {
            it: 'Microsoft raccomanda che un owner nominato risponda del comportamento e dei risultati dell’agente. Il RACI continua a essere umano anche quando l’esecuzione viene automatizzata.',
            en: 'Microsoft recommends that a named owner be answerable for an agent’s behavior and outcomes. The RACI remains human even when execution is automated.'
          }
        },
        {
          title: { it: 'Human oversight', en: 'Human oversight' },
          body: {
            it: 'Azioni difficili da invertire o che incidono su persone, denaro o compliance devono avere un livello di controllo umano proporzionato.',
            en: 'Actions that are hard to reverse or affect people, money, or compliance need proportionate human control.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Responsible AI per agenti', en: 'Responsible AI for agents' },
          url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai'
        },
        {
          label: { it: 'Ruoli e decision rights', en: 'Roles and decision rights' },
          url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/roles-responsibilities'
        }
      ]
    },
    {
      id: 'process-first',
      eyebrow: { it: '04 · Processo', en: '04 · Process' },
      title: {
        it: 'Process first, agent second',
        en: 'Process first, agent second'
      },
      body: {
        it: 'Un agente non rende automaticamente buono un processo confuso. Prima di automatizzare serve conoscere input, output, eccezioni, autorizzazioni e criteri di successo. I passaggi deterministici dovrebbero rimanere deterministici; il reasoning è utile dove servono interpretazione, pianificazione o adattamento.',
        en: 'An agent does not automatically improve a confused process. Before automating, teams need to understand inputs, outputs, exceptions, authorization, and success criteria. Deterministic steps should remain deterministic; reasoning is useful where interpretation, planning, or adaptation is required.'
      },
      references: [
        {
          label: { it: 'Generative orchestration in Copilot Studio', en: 'Generative orchestration in Copilot Studio' },
          url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/generative-orchestration'
        }
      ]
    },
    {
      id: 'data-grounding',
      eyebrow: { it: '05 · Dati', en: '05 · Data' },
      title: {
        it: 'Gli agenti sono affidabili quanto le fonti e i permessi che ricevono',
        en: 'Agents are only as reliable as the sources and permissions they receive'
      },
      body: {
        it: 'Grounding e retrieval collegano il modello alla conoscenza aziendale, ma non correggono automaticamente dati obsoleti, duplicati o mal governati. Ogni knowledge source dovrebbe avere owner, qualità, freshness e access boundaries. Il principio permission-aware è essenziale: l’agente non deve diventare una scorciatoia per vedere dati che l’utente non potrebbe consultare direttamente.',
        en: 'Grounding and retrieval connect the model to enterprise knowledge, but they do not automatically fix stale, duplicated, or poorly governed data. Each knowledge source should have ownership, quality, freshness, and access boundaries. Permission-aware access is essential: an agent must not become a shortcut to data the user could not access directly.'
      },
      references: [
        {
          label: { it: 'Agent Builder in Microsoft 365 Copilot', en: 'Agent Builder in Microsoft 365 Copilot' },
          url: 'https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/agent-builder'
        },
        {
          label: { it: 'Responsible AI e groundedness', en: 'Responsible AI and groundedness' },
          url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai'
        }
      ]
    },
    {
      id: 'm365-copilot',
      eyebrow: { it: '06 · Microsoft 365', en: '06 · Microsoft 365' },
      title: {
        it: 'Microsoft 365 Copilot e Agent Builder: agenti nel flusso di lavoro',
        en: 'Microsoft 365 Copilot and Agent Builder: agents in the flow of work'
      },
      body: {
        it: 'Microsoft 365 Copilot porta l’AI nel contesto di Teams, Outlook, Word e delle altre esperienze Microsoft 365. Agent Builder consente di creare rapidamente agenti dichiarativi focalizzati su knowledge e casi d’uso specifici. È una superficie adatta a scenari semplici e vicini al lavoro quotidiano; quando servono azioni e integrazioni più avanzate entra in gioco Copilot Studio.',
        en: 'Microsoft 365 Copilot brings AI into Teams, Outlook, Word, and other Microsoft 365 experiences. Agent Builder enables rapid creation of declarative agents focused on knowledge and specific use cases. It fits simpler scenarios close to daily work; when more advanced actions and integrations are required, Copilot Studio becomes relevant.'
      },
      references: [
        {
          label: { it: 'Agent Builder', en: 'Agent Builder' },
          url: 'https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/agent-builder'
        },
        {
          label: { it: 'Agents for Microsoft 365 Copilot', en: 'Agents for Microsoft 365 Copilot' },
          url: 'https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agents-overview'
        }
      ]
    },
    {
      id: 'copilot-studio',
      eyebrow: { it: '07 · Low-code', en: '07 · Low-code' },
      title: {
        it: 'Copilot Studio: knowledge, workflow, tool e orchestrazione',
        en: 'Copilot Studio: knowledge, workflow, tools, and orchestration'
      },
      body: {
        it: 'Copilot Studio è la piattaforma low-code Microsoft per creare e gestire agenti e workflow. Può collegare dati e sistemi tramite connector, API e MCP, usare orchestrazione generativa, invocare workflow e altri agenti e pubblicare su diversi canali. La governance deve includere ambienti, data policy, connector e ALM.',
        en: 'Copilot Studio is Microsoft’s low-code platform for building and managing agents and workflows. It can connect data and systems through connectors, APIs, and MCP, use generative orchestration, invoke workflows and other agents, and publish across channels. Governance should include environments, data policies, connectors, and ALM.'
      },
      references: [
        {
          label: { it: 'Copilot Studio overview', en: 'Copilot Studio overview' },
          url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio'
        },
        {
          label: { it: 'Security and governance', en: 'Security and governance' },
          url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-and-governance'
        }
      ]
    },
    {
      id: 'foundry',
      eyebrow: { it: '08 · Pro-code', en: '08 · Pro-code' },
      title: {
        it: 'Microsoft Foundry: engineering, runtime, tool ed evaluation',
        en: 'Microsoft Foundry: engineering, runtime, tools, and evaluation'
      },
      body: {
        it: 'Microsoft Foundry Agent Service offre un percorso più pro-code e personalizzabile: runtime gestito, model catalog, tool, MCP, identità Entra, versioning, publishing, tracing ed evaluation. È particolarmente adatto quando l’agente richiede architettura custom, integrazioni profonde o controllo fine su ciclo di sviluppo e operation.',
        en: 'Microsoft Foundry Agent Service provides a more pro-code and customizable path: managed runtime, model catalog, tools, MCP, Entra identity, versioning, publishing, tracing, and evaluation. It is especially relevant when an agent requires custom architecture, deep integrations, or fine control over development and operations.'
      },
      references: [
        {
          label: { it: 'Microsoft Foundry Agent Service', en: 'Microsoft Foundry Agent Service' },
          url: 'https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview'
        },
        {
          label: { it: 'Evaluate your AI agents', en: 'Evaluate your AI agents' },
          url: 'https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/evaluate-agent'
        }
      ]
    },
    {
      id: 'agent-identity',
      eyebrow: { it: '09 · Identity', en: '09 · Identity' },
      title: {
        it: 'Agent 365 ed Entra Agent ID: gli agenti diventano identità governabili',
        en: 'Agent 365 and Entra Agent ID: agents become governable identities'
      },
      body: {
        it: 'Quando un agente agisce sui sistemi aziendali serve sapere chi è, per chi agisce e quali privilegi possiede. Entra Agent ID rappresenta identità agentiche e distingue scenari interattivi e autonomi. Agent 365 aggiunge un control plane e un registry per osservare e governare agenti lungo il lifecycle, inclusi scenari costruiti fuori dallo stack Microsoft.',
        en: 'When an agent acts on enterprise systems, teams need to know who it is, on whose behalf it acts, and which privileges it holds. Entra Agent ID represents agent identities and distinguishes interactive and autonomous patterns. Agent 365 adds a control plane and registry to observe and govern agents through their lifecycle, including scenarios built outside the Microsoft stack.'
      },
      details: [
        {
          title: { it: 'Sponsor umano', en: 'Human sponsor' },
          body: {
            it: 'La governance dell’identità agentica collega accessi e lifecycle a un owner o sponsor umano, così l’identità non rimane senza responsabilità quando persone o strutture cambiano.',
            en: 'Agent-identity governance connects access and lifecycle to a human owner or sponsor so the identity does not become orphaned as people or structures change.'
          }
        }
      ],
      references: [
        {
          label: { it: 'Agent identities in Microsoft Entra', en: 'Agent identities in Microsoft Entra' },
          url: 'https://learn.microsoft.com/en-us/entra/agent-id/agent-identities'
        },
        {
          label: { it: 'Agent 365 integration with Foundry', en: 'Agent 365 integration with Foundry' },
          url: 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-365-integration'
        }
      ]
    },
    {
      id: 'agent-security',
      eyebrow: { it: '10 · Security', en: '10 · Security' },
      title: {
        it: 'Zero Trust per gli agenti: identity, least privilege e blast radius',
        en: 'Zero Trust for agents: identity, least privilege, and blast radius'
      },
      body: {
        it: 'Un agente può amplificare rapidamente un errore perché opera con velocità e scala maggiori di una persona. Servono least privilege, segmentazione, controllo dei tool, protezione da prompt injection, limiti di rete e capacità di revoca rapida. Sicurezza e operations devono essere progettate insieme al livello di autonomia.',
        en: 'An agent can amplify an error quickly because it operates at greater speed and scale than a person. Least privilege, segmentation, tool control, prompt-injection defenses, network boundaries, and rapid revocation are required. Security and operations must be designed together with the autonomy level.'
      },
      references: [
        {
          label: { it: 'Govern agents by risk', en: 'Govern agents by risk' },
          url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/govern-agents-risk'
        },
        {
          label: { it: 'AI governance and security maturity', en: 'AI governance and security maturity' },
          url: 'https://learn.microsoft.com/en-us/agents/adoption-maturity-model/maturity-model-security-governance'
        }
      ]
    },
    {
      id: 'responsible-ai',
      eyebrow: { it: '11 · Responsible AI', en: '11 · Responsible AI' },
      title: {
        it: 'Responsible AI è un requisito di design e un release gate',
        en: 'Responsible AI is a design requirement and a release gate'
      },
      body: {
        it: 'Microsoft struttura Responsible AI attorno a fairness, reliability and safety, privacy and security, inclusiveness, transparency e accountability. Per gli agenti questi principi devono diventare controlli verificabili: fonti affidabili, disclosure, test, human oversight, escalation e owner nominato. La review deve essere proporzionata al rischio e continuare anche dopo il go-live.',
        en: 'Microsoft structures Responsible AI around fairness, reliability and safety, privacy and security, inclusiveness, transparency, and accountability. For agents these principles must become verifiable controls: trusted sources, disclosure, testing, human oversight, escalation, and a named owner. Review should be proportional to risk and continue after go-live.'
      },
      references: [
        {
          label: { it: 'Apply Responsible AI', en: 'Apply Responsible AI' },
          url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai'
        },
        {
          label: { it: 'Responsible AI for agent design', en: 'Responsible AI for agent design' },
          url: 'https://learn.microsoft.com/en-us/agents/design-guidelines/responsible-ai'
        }
      ]
    },
    {
      id: 'eu-ai-act',
      eyebrow: { it: '12 · Regolatorio', en: '12 · Regulation' },
      title: {
        it: 'EU AI Act: la readiness normativa è già una capability operativa',
        en: 'EU AI Act: regulatory readiness is already an operating capability'
      },
      body: {
        it: 'Questa versione dell’assessment riflette il quadro disponibile a settembre 2026. AI literacy e alcune disposizioni sono applicabili dal 2 febbraio 2025; governance e obblighi GPAI dal 2 agosto 2025; dal 2 agosto 2026 si applica gran parte del quadro e sono operative, tra le altre, disposizioni di trasparenza. Le regole per molti sistemi high-risk dell’Allegato III sono previste dal 2 dicembre 2027 e per high-risk incorporati in prodotti regolamentati dal 2 agosto 2028. L’assessment misura readiness e capacità di produrre evidenze: non sostituisce una valutazione legale sul singolo caso.',
        en: 'This assessment version reflects the framework available in September 2026. AI literacy and some provisions have applied since 2 February 2025; governance and GPAI obligations since 2 August 2025; from 2 August 2026 much of the framework applies, including transparency provisions. Rules for many Annex III high-risk systems are scheduled from 2 December 2027 and for high-risk systems embedded in regulated products from 2 August 2028. The assessment measures readiness and evidence capability; it does not replace legal analysis of a specific use case.'
      },
      bullets: [
        {
          it: 'Classificare ruolo e caso d’uso prima di parlare di compliance.',
          en: 'Classify role and use case before discussing compliance.'
        },
        {
          it: 'Mantenere un inventario AI sufficiente a identificare rischi, owner e obblighi.',
          en: 'Maintain an AI inventory sufficient to identify risks, owners, and obligations.'
        },
        {
          it: 'Preparare AI literacy, human oversight, trasparenza e documentazione prima delle deadline rilevanti.',
          en: 'Prepare AI literacy, human oversight, transparency, and documentation before relevant deadlines.'
        }
      ],
      references: [
        {
          label: { it: 'Commissione europea · Enforcement framework AI Act', en: 'European Commission · AI Act enforcement framework' },
          url: 'https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act'
        },
        {
          label: { it: 'Commissione europea · Navigating the AI Act', en: 'European Commission · Navigating the AI Act' },
          url: 'https://digital-strategy.ec.europa.eu/en/faqs/navigating-ai-act'
        },
        {
          label: { it: 'Commissione europea · AI literacy FAQ', en: 'European Commission · AI literacy FAQ' },
          url: 'https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers'
        }
      ]
    },
    {
      id: 'mcp-multi-agent',
      eyebrow: { it: '13 · Interoperabilità', en: '13 · Interoperability' },
      title: {
        it: 'MCP, tool e multi-agent: interoperabilità con confini espliciti',
        en: 'MCP, tools, and multi-agent: interoperability with explicit boundaries'
      },
      body: {
        it: 'MCP standardizza il modo in cui agenti e applicazioni espongono tool e contesto. Riduce integrazioni custom ma non elimina la necessità di autenticazione, autorizzazione, inventory e allowlist. Anche i pattern multi-agent vanno introdotti solo quando specializzazione e separazione delle responsabilità compensano la maggiore complessità.',
        en: 'MCP standardizes how agents and applications expose tools and context. It reduces custom integration work but does not remove the need for authentication, authorization, inventory, and allowlists. Multi-agent patterns should also be introduced only when specialization and separation of responsibilities justify the added complexity.'
      },
      references: [
        {
          label: { it: 'Copilot Studio generative orchestration', en: 'Copilot Studio generative orchestration' },
          url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/generative-orchestration'
        },
        {
          label: { it: 'GitHub · MCP enterprise management', en: 'GitHub · MCP enterprise management' },
          url: 'https://docs.github.com/en/copilot/concepts/enterprise/mcp-management'
        }
      ]
    },
    {
      id: 'github-copilot',
      eyebrow: { it: '14 · Engineering', en: '14 · Engineering' },
      title: {
        it: 'GitHub Copilot: lo sviluppo software diventa agentico',
        en: 'GitHub Copilot: software development becomes agentic'
      },
      body: {
        it: 'Agent mode, cloud agent e custom agent possono lavorare su attività multi-step, repository e pull request. L’aumento di autonomia non deve bypassare secure SDLC, branch protection, test e review. Le organizzazioni possono governare agenti, modelli e MCP attraverso AI Controls e policy enterprise.',
        en: 'Agent mode, cloud agents, and custom agents can work across multi-step tasks, repositories, and pull requests. Increased autonomy must not bypass secure SDLC, branch protection, tests, and review. Organizations can govern agents, models, and MCP through AI Controls and enterprise policies.'
      },
      references: [
        {
          label: { it: 'GitHub · Agent management for enterprises', en: 'GitHub · Agent management for enterprises' },
          url: 'https://docs.github.com/en/copilot/concepts/enterprise/agent-management'
        },
        {
          label: { it: 'GitHub · Copilot enterprise policies', en: 'GitHub · Copilot enterprise policies' },
          url: 'https://docs.github.com/en/copilot/concepts/enterprise/policies'
        }
      ]
    },
    {
      id: 'evaluation-operations',
      eyebrow: { it: '15 · Quality & Ops', en: '15 · Quality & Ops' },
      title: {
        it: 'Evaluation e osservabilità trasformano una demo in un servizio',
        en: 'Evaluation and observability turn a demo into a service'
      },
      body: {
        it: 'Un agente non dovrebbe entrare in produzione perché “sembra funzionare”. Servono dataset rappresentativi, evaluator, baseline e soglie di accettazione. Dopo il rilascio servono tracing, audit, SLO, cost monitoring, incident response e regression test quando cambiano modello, prompt, dati o tool.',
        en: 'An agent should not enter production because it “seems to work.” Representative datasets, evaluators, baselines, and acceptance thresholds are needed. After release, teams need tracing, audit, SLOs, cost monitoring, incident response, and regression tests when model, prompts, data, or tools change.'
      },
      references: [
        {
          label: { it: 'Evaluate your AI agents', en: 'Evaluate your AI agents' },
          url: 'https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/evaluate-agent'
        },
        {
          label: { it: 'Manage the agent lifecycle', en: 'Manage the agent lifecycle' },
          url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/agent-lifecycle'
        }
      ]
    },
    {
      id: 'operating-model',
      eyebrow: { it: '16 · Operating model', en: '16 · Operating model' },
      title: {
        it: 'CoE, business e platform team: chi decide cosa',
        en: 'CoE, business, and platform teams: who decides what'
      },
      body: {
        it: 'Scalare agenti richiede un operating model. Il CoE può definire standard, risk tier, architetture e release gate; i domain owner mantengono valore, knowledge e operation del proprio agente. Security, Responsible AI, Privacy, Data Governance e Platform Operations devono entrare nel processo senza trasformare ogni esperimento in un progetto burocratico.',
        en: 'Scaling agents requires an operating model. A CoE can define standards, risk tiers, architectures, and release gates; domain owners retain responsibility for value, knowledge, and operations of their agents. Security, Responsible AI, Privacy, Data Governance, and Platform Operations should be part of the process without turning every experiment into a bureaucratic project.'
      },
      references: [
        {
          label: { it: 'Roles and responsibilities', en: 'Roles and responsibilities' },
          url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/roles-responsibilities'
        },
        {
          label: { it: 'Govern agents by risk', en: 'Govern agents by risk' },
          url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/govern-agents-risk'
        }
      ]
    },
    {
      id: 'assessment-method',
      eyebrow: { it: '17 · Assessment', en: '17 · Assessment' },
      title: {
        it: 'Essential per il segnale rapido, Full per la roadmap',
        en: 'Essential for a rapid signal, Full for the roadmap'
      },
      body: {
        it: 'La modalità Essential usa 18 domande chiave e serve a individuare velocemente readiness e red flag. La modalità Full usa tutte le 62 domande per costruire una baseline più completa. Le risposte 0–5 misurano maturità reale e verificabile; Unknown è un segnale di mancanza di visibilità, mentre N/A va usato solo quando il requisito è realmente fuori perimetro.',
        en: 'Essential mode uses 18 key questions to identify readiness and red flags quickly. Full mode uses all 62 questions to build a more complete baseline. Scores from 0–5 measure real, verifiable maturity; Unknown signals a visibility gap, while N/A should be used only when the requirement is genuinely out of scope.'
      },
      bullets: [
        { it: '0–1: assente, ad hoc o non verificabile.', en: '0–1: absent, ad hoc, or not verifiable.' },
        { it: '2–3: parziale o ripetibile, ma non ancora governato in modo uniforme.', en: '2–3: partial or repeatable, but not yet consistently governed.' },
        { it: '4–5: capability governata, misurata e mantenuta nel tempo.', en: '4–5: governed, measured capability maintained over time.' },
        { it: 'Le domande con peso maggiore rappresentano prerequisiti o guardrail importanti.', en: 'Higher-weight questions represent important prerequisites or guardrails.' }
      ]
    }
  ],
  questions
};
