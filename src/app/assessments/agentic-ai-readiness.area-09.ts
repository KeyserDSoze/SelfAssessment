import type { AssessmentQuestion } from '../models';
import { agenticAreas, agenticQuestion as q } from './agentic-ai-readiness.shared';

export const agenticArea9Questions: AssessmentQuestion[] = [
  q({
    id: 'ai-048', area: agenticAreas.development, track: 'essential', weight: 5,
    question: {
      it: 'Codice e pull request prodotti o modificati da coding agent passano comunque da test, code review e branch protection adeguati al rischio?',
      en: 'Do code and pull requests produced or modified by coding agents still pass tests, code review, and branch protection appropriate to risk?'
    },
    example: {
      it: 'GitHub Copilot può implementare una issue, ma non bypassa required checks o approvazioni per arrivare in produzione.',
      en: 'GitHub Copilot may implement an issue, but it cannot bypass required checks or approvals to reach production.'
    },
    evidence: {
      it: 'Branch rules, required checks, PR review policy, CI results.',
      en: 'Branch rules, required checks, PR review policy, CI results.'
    },
    microsoft: 'GitHub Copilot / GitHub Actions',
    owner: 'Engineering Leadership / DevSecOps'
  }),
  q({
    id: 'ai-049', area: agenticAreas.development, track: 'advanced', weight: 3,
    question: {
      it: 'Le policy enterprise controllano disponibilità di agenti, modelli e capability GitHub Copilot in modo coerente?',
      en: 'Do enterprise policies consistently control the availability of GitHub Copilot agents, models, and capabilities?'
    },
    example: {
      it: 'Agent mode, cloud agents e modelli vengono abilitati intenzionalmente per organizzazioni o repository appropriati.',
      en: 'Agent mode, cloud agents, and models are intentionally enabled for appropriate organizations or repositories.'
    },
    evidence: {
      it: 'GitHub AI controls, Copilot policy export, audit log.',
      en: 'GitHub AI controls, Copilot policy export, audit log.'
    },
    microsoft: 'GitHub Copilot enterprise policies',
    owner: 'GitHub Enterprise Admin / Security'
  }),
  q({
    id: 'ai-050', area: agenticAreas.development, track: 'advanced', weight: 3,
    question: {
      it: 'Custom agent, instruction file e prompt di sviluppo hanno owner, versioning e review come altri asset di engineering?',
      en: 'Do custom agents, instruction files, and development prompts have owners, versioning, and review like other engineering assets?'
    },
    example: {
      it: 'Le istruzioni repository-wide sono in source control e le modifiche sono revisionate.',
      en: 'Repository-wide instructions are in source control and changes are reviewed.'
    },
    evidence: {
      it: 'Repository files, CODEOWNERS, review history, custom-agent catalog.',
      en: 'Repository files, CODEOWNERS, review history, custom-agent catalog.'
    },
    microsoft: 'GitHub Copilot custom agents',
    owner: 'Developer Platform / Engineering'
  }),
  q({
    id: 'ai-051', area: agenticAreas.development, track: 'advanced', weight: 3,
    question: {
      it: 'L’accesso dei coding agent a MCP server, shell, repository e tool esterni è governato e limitato?',
      en: 'Is coding-agent access to MCP servers, shell, repositories, and external tools governed and constrained?'
    },
    example: {
      it: 'Tool sensibili non sono disponibili globalmente; vengono approvati per contesto e privilegi necessari.',
      en: 'Sensitive tools are not globally available; they are approved for the required context and privileges.'
    },
    evidence: {
      it: 'MCP policy, managed settings, repository permissions, tool allowlist.',
      en: 'MCP policy, managed settings, repository permissions, tool allowlist.'
    },
    microsoft: 'GitHub Copilot agent management / MCP',
    owner: 'Developer Platform / Security'
  }),
  q({
    id: 'ai-052', area: agenticAreas.development, track: 'advanced', weight: 3,
    question: {
      it: 'Il software generato con AI è sottoposto agli stessi controlli di secure SDLC, secret scanning, dependency e vulnerability management?',
      en: 'Is AI-generated software subject to the same secure SDLC, secret scanning, dependency, and vulnerability-management controls?'
    },
    example: {
      it: 'La maggiore velocità di generazione non riduce qualità, SAST/DAST, dependency review o gestione dei secret.',
      en: 'Higher generation speed does not reduce quality, SAST/DAST, dependency review, or secret management.'
    },
    evidence: {
      it: 'CI security checks, code scanning, dependency review, secret scanning.',
      en: 'CI security checks, code scanning, dependency review, secret scanning.'
    },
    microsoft: 'GitHub Advanced Security / GitHub Copilot',
    owner: 'AppSec / DevSecOps'
  })
];
