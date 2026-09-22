import type { AssessmentQuestion, LocalizedText } from '../models';

export const agenticAreas = {
  strategy: { it: '1. Strategia AI e valore', en: '1. AI strategy and value' },
  mindset: { it: '2. Mindset e accountability agentica', en: '2. Agentic mindset and accountability' },
  process: { it: '3. Processi e automazione', en: '3. Process and automation' },
  data: { it: '4. Dati, knowledge e grounding', en: '4. Data, knowledge and grounding' },
  identity: { it: '5. Identità, accessi e sicurezza degli agenti', en: '5. Agent identity, access and security' },
  governance: { it: '6. Responsible AI ed EU AI Act', en: '6. Responsible AI and EU AI Act' },
  platform: { it: '7. Microsoft Copilot e piattaforma agentica', en: '7. Microsoft Copilot and agent platform' },
  architecture: { it: '8. Architettura, multi-agent e interoperabilità', en: '8. Architecture, multi-agent and interoperability' },
  development: { it: '9. Agentic software development', en: '9. Agentic software development' },
  operations: { it: '10. Evaluation, osservabilità e operations', en: '10. Evaluation, observability and operations' },
  adoption: { it: '11. Adoption, competenze e miglioramento continuo', en: '11. Adoption, skills and continuous improvement' }
} satisfies Record<string, LocalizedText>;

interface AgenticQuestionInput {
  id: string;
  area: LocalizedText;
  track: AssessmentQuestion['track'];
  question: LocalizedText;
  example: LocalizedText;
  evidence: LocalizedText;
  microsoft: string;
  responseType?: AssessmentQuestion['responseType'];
  owner: string;
  weight: number;
}

export function agenticQuestion(input: AgenticQuestionInput): AssessmentQuestion {
  return {
    ...input,
    responseType: input.responseType ?? 'scale'
  };
}
